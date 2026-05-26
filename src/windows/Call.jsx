import React, { useState, useEffect, useRef } from "react";
import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/windowWrapper";
import useWindowsStore from "#store/window";
import { 
  Phone, Video, Search, User, X, ChevronLeft, Mic, MicOff, 
  VideoOff, Volume2, VolumeX, PhoneOff, Grid, Users, Trash2, ArrowLeftRight
} from "lucide-react";

// Force Tailwind compile:
// bg-gradient-to-tr from-gray-600 to-zinc-800
// bg-gradient-to-tr from-blue-500 to-indigo-600
// bg-gradient-to-tr from-purple-500 to-pink-600
// bg-gradient-to-tr from-emerald-500 to-teal-600
// bg-gradient-to-tr from-amber-500 to-orange-600
// bg-green-100 hover:bg-green-200 text-green-600 fill-green-600 bg-green-500 hover:bg-green-600 text-green-500 text-green-400 bg-green-50

// Mock Contacts List
const CONTACTS = [
  { id: "steve", name: "Steve Jobs", status: "Think Different", available: false, avatarColor: "bg-gradient-to-tr from-gray-600 to-zinc-800" },
  { id: "kuldeep", name: "Kuldeep", status: "Working on MacOS Portfolio", available: true, avatarColor: "bg-gradient-to-tr from-blue-500 to-indigo-600" },
  { id: "antigravity", name: "Antigravity AI", status: "Coding assistant online", available: true, avatarColor: "bg-gradient-to-tr from-purple-500 to-pink-600" },
  { id: "kunal", name: "Kunal", status: "Building beautiful React apps", available: true, avatarColor: "bg-gradient-to-tr from-emerald-500 to-teal-600" },
  { id: "woz", name: "Steve Wozniak", status: "Tinkering in the garage", available: false, avatarColor: "bg-gradient-to-tr from-amber-500 to-orange-600" },
];

const DIALPAD_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

const Call = () => {
  const { windows } = useWindowsStore();
  const [sidebarTab, setSidebarTab] = useState("contacts"); // contacts | dialpad
  const [searchQuery, setSearchQuery] = useState("");
  const [dialNumber, setDialNumber] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Helper to determine if the FaceTime window is currently focused
  const isWindowFocused = () => {
    const callWin = windows.call;
    if (!callWin || !callWin.isOpen || callWin.isMinimized) return false;
    let maxZ = -1;
    let focusedKey = "";
    Object.keys(windows).forEach((key) => {
      const win = windows[key];
      if (win.isOpen && !win.isMinimized && win.zIndex > maxZ) {
        maxZ = win.zIndex;
        focusedKey = key;
      }
    });
    return focusedKey === "call";
  };
  
  // Call States
  const [activeCall, setActiveCall] = useState(null); // { name, type: 'audio'|'video', status: 'ringing'|'connected' }
  const [callTimer, setCallTimer] = useState(0);
  const [micMuted, setMicMuted] = useState(false);
  const [cameraMuted, setCameraMuted] = useState(false);
  const [speakerMuted, setSpeakerMuted] = useState(false);

  // Audio Context Refs for Ringing & Beeps
  const ringbackAudioCtxRef = useRef(null);
  const ringIntervalRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // Keyboard support for dialer and active calls
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Return early if the window is not open or not focused
      if (!isWindowFocused()) return;

      const key = e.key;
      
      // If there is an active call, check if user presses Escape to hang up
      if (activeCall) {
        if (key === "Escape") {
          e.preventDefault();
          endCall();
        }
        return;
      }
      
      // Ignore dialer keyboard intercept if user is typing in a non-readonly search/input field
      if (document.activeElement && document.activeElement.tagName === 'INPUT' && !document.activeElement.readOnly) {
        if (key === "Enter" && dialNumber) {
          e.preventDefault();
          initiateCall(dialNumber, "video");
          setIsSidebarOpen(false);
        }
        return;
      }
      
      // Otherwise, handle dialer inputs if on dialpad tab
      if (sidebarTab === "dialpad") {
        if (/[0-9*#]/.test(key)) {
          e.preventDefault();
          handleDialPress(key);
        } else if (key === "Backspace") {
          e.preventDefault();
          handleBackspace();
        } else if (key === "Enter" && dialNumber) {
          e.preventDefault();
          initiateCall(dialNumber, "video");
          setIsSidebarOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sidebarTab, activeCall, dialNumber, windows]);

  // DTMF Tone Generator (Dial Pad keys sound)
  const playDTMFTone = (digit) => {
    try {
      const dtmfFrequencies = {
        '1': [697, 1209], '2': [697, 1336], '3': [697, 1477],
        '4': [770, 1209], '5': [770, 1336], '6': [770, 1477],
        '7': [852, 1209], '8': [852, 1336], '9': [852, 1477],
        '*': [941, 1209], '0': [941, 1336], '#': [941, 1477]
      };
      const freqs = dtmfFrequencies[digit];
      if (!freqs) return;
      
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.frequency.value = freqs[0];
      osc2.frequency.value = freqs[1];
      
      osc1.type = 'sine';
      osc2.type = 'sine';
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.01);
      gain.gain.setValueAtTime(0.08, ctx.currentTime + 0.12);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      osc1.start();
      osc2.start();
      
      osc1.stop(ctx.currentTime + 0.16);
      osc2.stop(ctx.currentTime + 0.16);
    } catch (e) {
      console.error("DTMF Tone Error", e);
    }
  };

  // Ringback Tone Generator (Ringing Sound Loop)
  const startRingbackSound = () => {
    try {
      ringbackAudioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      
      const playRingCycle = () => {
        const ctx = ringbackAudioCtxRef.current;
        if (!ctx || ctx.state === 'closed') return;
        
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc1.frequency.value = 440;
        osc2.frequency.value = 480;
        
        osc1.type = 'sine';
        osc2.type = 'sine';
        
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.05, ctx.currentTime + 1.5);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.6);
        
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        
        osc1.start();
        osc2.start();
        
        osc1.stop(ctx.currentTime + 1.7);
        osc2.stop(ctx.currentTime + 1.7);
      };
      
      playRingCycle();
      ringIntervalRef.current = setInterval(playRingCycle, 4000);
    } catch (e) {
      console.error("Ringback error", e);
    }
  };

  const stopRingbackSound = () => {
    if (ringIntervalRef.current) {
      clearInterval(ringIntervalRef.current);
      ringIntervalRef.current = null;
    }
    if (ringbackAudioCtxRef.current) {
      try { ringbackAudioCtxRef.current.close(); } catch(e){}
      ringbackAudioCtxRef.current = null;
    }
  };

  // Handle dial button click
  const handleDialPress = (val) => {
    playDTMFTone(val);
    setDialNumber((prev) => prev + val);
  };

  const handleBackspace = () => {
    setDialNumber((prev) => prev.slice(0, -1));
  };

  // Calling flow
  const initiateCall = (name, type = "video") => {
    setActiveCall({ name, type, status: "ringing" });
    setCallTimer(0);
    startRingbackSound();

    // Auto connect after 4 seconds
    setTimeout(() => {
      setActiveCall((prev) => {
        if (!prev || prev.status !== "ringing") return prev;
        stopRingbackSound();
        
        // Start duration counter
        timerIntervalRef.current = setInterval(() => {
          setCallTimer((t) => t + 1);
        }, 1000);

        return { ...prev, status: "connected" };
      });
    }, 4500);
  };

  const endCall = () => {
    stopRingbackSound();
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setActiveCall(null);
    setCallTimer(0);
    setMicMuted(false);
    setCameraMuted(false);
    setSpeakerMuted(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRingbackSound();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60).toString().padStart(2, "0");
    const seconds = (secs % 60).toString().padStart(2, "0");
    return `${mins}:${seconds}`;
  };

  const filteredContacts = CONTACTS.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl overflow-hidden shadow-2xl border border-black/10 select-none text-gray-800 relative">
      
      {/* ================= WINDOW HEADER ================= */}
      <div id="window-header" className="window-header shrink-0 flex items-center justify-between !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2.5">
        <div className="flex items-center gap-4">
          <WindowControls target="call" />
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="sm:hidden p-1 rounded hover:bg-gray-200 text-gray-600 transition-colors"
            aria-label="Toggle Sidebar"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform duration-200 ${isSidebarOpen ? "rotate-0" : "rotate-180"}`} />
          </button>
        </div>
        <div className="flex-1 text-center font-bold text-gray-700 text-sm hidden sm:block">
          FaceTime
        </div>
        <div className="w-14" />
      </div>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-20 sm:hidden"
          />
        )}

        {/* Sidebar */}
        <aside className={`
          absolute sm:relative inset-y-0 left-0 w-64 bg-gray-100 border-r border-[#d1d1d1] flex flex-col z-30 transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
        `}>
          
          {/* Tab Mode Buttons */}
          <div className="p-3.5 flex justify-center border-b border-gray-200/60 bg-gray-100 shrink-0">
            <div className="flex bg-gray-200/80 p-0.5 rounded-lg w-full max-w-[200px]">
              <button
                onClick={() => setSidebarTab("contacts")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1 text-[11px] font-bold rounded-md transition-all ${
                  sidebarTab === "contacts" 
                    ? "bg-white text-gray-800 shadow-sm" 
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                Contacts
              </button>
              <button
                onClick={() => setSidebarTab("dialpad")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1 text-[11px] font-bold rounded-md transition-all ${
                  sidebarTab === "dialpad" 
                    ? "bg-white text-gray-800 shadow-sm" 
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                Keypad
              </button>
            </div>
          </div>

          {/* Tab: Contacts List */}
          {sidebarTab === "contacts" && (
            <div className="flex-1 flex flex-col min-h-0">
              {/* Search contacts */}
              <div className="p-3 shrink-0">
                <div className="relative flex items-center bg-gray-200/60 border border-gray-300/40 rounded-lg px-2.5 py-1.5">
                  <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search contacts"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs focus:outline-none border-none outline-none text-gray-800 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Contacts Scroll container */}
              <div className="flex-1 overflow-y-auto thin-scrollbar p-2 space-y-1">
                {filteredContacts.map((contact) => (
                  <div 
                    key={contact.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-200/60 group transition-all"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Avatar */}
                      <div className={`w-9 h-9 rounded-full ${contact.avatarColor} text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm shrink-0`}>
                        {contact.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-gray-800 truncate">{contact.name}</h4>
                        <p className="text-[10px] text-gray-400 truncate">{contact.status}</p>
                      </div>
                    </div>

                    {/* Calling trigger buttons */}
                    <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => {
                          initiateCall(contact.name, "audio");
                          setIsSidebarOpen(false);
                        }}
                        className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-600 transition-colors"
                        title="Voice Call"
                      >
                        <Phone className="w-3.5 h-3.5 fill-gray-600 text-transparent" />
                      </button>
                      <button 
                        onClick={() => {
                          initiateCall(contact.name, "video");
                          setIsSidebarOpen(false);
                        }}
                        className="p-1.5 bg-green-100 hover:bg-green-200 rounded-md text-green-600 transition-colors"
                        title="FaceTime Video"
                      >
                        <Video className="w-3.5 h-3.5 fill-green-600 text-transparent" />
                      </button>
                    </div>
                  </div>
                ))}
                {filteredContacts.length === 0 && (
                  <div className="text-center py-8 text-xs text-gray-400 italic">No contacts found</div>
                )}
              </div>
            </div>
          )}

          {/* Tab: Dialpad */}
          {sidebarTab === "dialpad" && (
            <div className="flex-1 flex flex-col p-4 justify-between min-h-0 overflow-y-auto thin-scrollbar">
              {/* Dial number preview input */}
              <div className="flex items-center justify-between bg-gray-200/50 border border-gray-300/20 rounded-xl p-3 mb-4 shrink-0">
                <input 
                  type="text" 
                  value={dialNumber}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^[0-9*#+]*$/.test(val)) {
                      setDialNumber(val);
                    }
                  }}
                  placeholder="Enter number"
                  className="w-full bg-transparent font-bold text-base text-center outline-none border-none text-gray-800 tracking-wide"
                />
                {dialNumber && (
                  <button 
                    onClick={handleBackspace}
                    className="p-1 hover:bg-gray-200 rounded-full text-gray-500"
                    title="Backspace"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Grid 3x4 layout */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-[200px] mx-auto">
                {DIALPAD_KEYS.map((key) => (
                  <button
                    key={key}
                    onClick={() => handleDialPress(key)}
                    className="aspect-square rounded-full bg-white hover:bg-gray-50 active:bg-gray-200 flex items-center justify-center transition-all select-none border border-gray-200/60 shadow-sm text-lg font-bold text-gray-800"
                  >
                    {key}
                  </button>
                ))}
              </div>

              {/* Dial Call Buttons */}
              <div className="flex items-center justify-center gap-3 pt-6 shrink-0">
                <button
                  onClick={() => {
                    if (!dialNumber) return;
                    initiateCall(dialNumber, "audio");
                    setIsSidebarOpen(false);
                  }}
                  disabled={!dialNumber}
                  className="w-12 h-12 bg-gray-200 hover:bg-gray-300 active:scale-95 disabled:bg-gray-150 disabled:text-gray-400 disabled:pointer-events-none rounded-full flex items-center justify-center text-gray-600 transition-all shadow-md"
                  title="Audio FaceTime"
                >
                  <Phone className={`w-5 h-5 ${dialNumber ? "fill-gray-600 text-transparent" : "fill-gray-300 text-transparent"}`} />
                </button>
                <button
                  onClick={() => {
                    if (!dialNumber) return;
                    initiateCall(dialNumber, "video");
                    setIsSidebarOpen(false);
                  }}
                  disabled={!dialNumber}
                  className="w-12 h-12 bg-green-500 hover:bg-green-600 active:scale-95 disabled:bg-gray-150 disabled:text-gray-400 disabled:pointer-events-none rounded-full flex items-center justify-center text-white transition-all shadow-md"
                  title="Video FaceTime"
                >
                  <Video className={`w-5 h-5 ${dialNumber ? "fill-white text-transparent" : "fill-gray-300 text-transparent"}`} />
                </button>
                {dialNumber && (
                  <button
                    onClick={() => setDialNumber("")}
                    className="p-3 bg-red-100 hover:bg-red-200 rounded-full text-red-500 transition-colors"
                    title="Clear All"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

        </aside>

        {/* Content Pane */}
        <main className="flex-1 bg-gray-50 flex flex-col h-full min-h-0 relative select-none">
          
          {/* Default Camera Preview / FaceTime Lobby */}
          {!activeCall && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 relative overflow-hidden h-full">
              {/* Abstract Camera Feed Placeholder */}
              <div className="relative w-64 h-44 md:w-80 md:h-56 rounded-2xl bg-gradient-to-tr from-indigo-950 via-slate-900 to-emerald-950 shadow-inner flex items-center justify-center border border-black/10 overflow-hidden group">
                {/* Simulated Lens flare & pulse */}
                <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />
                <div className="absolute w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                
                {/* Camera dot */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-green-500/80 rounded-full animate-ping" />
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-green-500 rounded-full" />
                
                {/* Centered Icon */}
                <div className="flex flex-col items-center justify-center space-y-2 z-10">
                  <div className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                    <Video className="w-8 h-8 text-white fill-white/10" />
                  </div>
                  <span className="text-[10px] text-white/50 tracking-widest uppercase font-bold">Camera Standby</span>
                </div>
              </div>

              {/* Lobby Titles */}
              <div className="space-y-2 max-w-sm">
                <h3 className="text-sm font-bold text-gray-800">FaceTime</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Call developers, assistants, and colleagues using high-fidelity FaceTime audio or video directly from your browser.
                </p>
              </div>

              {/* Status Info Footer */}
              <div className="text-[10px] text-gray-400 font-semibold flex items-center gap-1 bg-gray-200/50 px-3 py-1 rounded-full border border-gray-300/20">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                System ready for calls
              </div>
            </div>
          )}

          {/* ================= ACTIVE CALL PANEL OVERLAY ================= */}
          {activeCall && (
            <div className="absolute inset-0 bg-neutral-900 text-white z-40 flex flex-col items-center justify-between p-6 md:p-8 animate-fade-in h-full">
              
              {/* Call Top Details */}
              <div className="text-center space-y-2 pt-4">
                <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase">
                  FaceTime {activeCall.type === "video" ? "Video" : "Audio"}
                </span>
                <h2 className="text-xl font-bold tracking-tight">{activeCall.name}</h2>
                <div className="flex items-center justify-center gap-1.5">
                  {activeCall.status === "ringing" ? (
                    <>
                      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" />
                      <span className="text-xs text-neutral-400 font-medium animate-pulse">Ringing...</span>
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-xs text-neutral-400 font-bold tabular-nums">
                        {formatTimer(callTimer)}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Main Visualizer Area */}
              <div className="relative w-full max-w-[400px] aspect-video md:aspect-[4/3] bg-neutral-950 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
                {activeCall.type === "video" && !cameraMuted ? (
                  // Video call screen (simulated with pulsating colors)
                  <div className="absolute inset-0 bg-gradient-to-tr from-neutral-800 via-indigo-950 to-neutral-900 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    
                    {/* Animated sound waves */}
                    {activeCall.status === "connected" && !micMuted && (
                      <div className="flex items-end gap-1 w-20 h-10 z-10">
                        {[0, 150, 300, 450, 600].map((delay) => (
                          <span 
                            key={delay} 
                            className="flex-1 w-1.5 bg-blue-400 rounded-full animate-bounce"
                            style={{ animationDelay: `${delay}ms`, height: "60%" }} 
                          />
                        ))}
                      </div>
                    )}

                    {/* Big Caller Avatar */}
                    {activeCall.status === "ringing" && (
                      <div className="w-20 h-20 rounded-full bg-blue-600/30 border border-blue-400/30 animate-pulse flex items-center justify-center z-10">
                        <User className="w-10 h-10 text-blue-400" />
                      </div>
                    )}
                  </div>
                ) : (
                  // Audio Call Screen or Camera Muted Screen
                  <div className="absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 text-white flex items-center justify-center font-bold text-xl uppercase shadow-md border border-white/10">
                      {activeCall.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    {cameraMuted && activeCall.type === "video" && (
                      <span className="text-[10px] text-red-400 bg-red-950/40 border border-red-500/20 px-2.5 py-0.5 rounded-full font-bold">
                        Camera Paused
                      </span>
                    )}

                    {/* Animated voice bar for Audio */}
                    {activeCall.status === "connected" && !micMuted && (
                      <div className="flex items-center gap-1.5 h-8">
                        {[1, 2, 3, 4, 5].map((idx) => (
                          <span 
                            key={idx}
                            className={`w-1 bg-blue-500 rounded-full animate-pulse`}
                            style={{ 
                              height: `${Math.sin(idx) * 20 + 24}px`,
                              animationDelay: `${idx * 100}ms`
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Sub corner user preview (FaceTime standard picture-in-picture) */}
                {activeCall.status === "connected" && activeCall.type === "video" && (
                  <div className="absolute bottom-3 right-3 w-16 h-24 bg-neutral-800 rounded-lg border border-white/20 shadow-md flex flex-col items-center justify-center overflow-hidden">
                    {cameraMuted ? (
                      <VideoOff className="w-4 h-4 text-neutral-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-emerald-950 to-slate-900 flex items-center justify-center">
                        <span className="text-[8px] text-white/40 uppercase font-bold">Me</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Call Controls Panel */}
              <div className="flex items-center gap-4 md:gap-6 bg-neutral-800/80 border border-white/10 backdrop-blur-md px-6 py-3.5 rounded-full shadow-lg mb-4 shrink-0">
                {/* Mute Mic */}
                <button
                  onClick={() => setMicMuted(!micMuted)}
                  disabled={activeCall.status !== "connected"}
                  className={`p-3 rounded-full transition-all active:scale-95 disabled:opacity-30 ${
                    micMuted ? "bg-red-600 text-white" : "bg-neutral-700/80 hover:bg-neutral-600 text-neutral-200"
                  }`}
                  title={micMuted ? "Unmute Microphone" : "Mute Microphone"}
                >
                  {micMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                {/* Toggle Camera */}
                <button
                  onClick={() => setCameraMuted(!cameraMuted)}
                  disabled={activeCall.type !== "video" || activeCall.status !== "connected"}
                  className={`p-3 rounded-full transition-all active:scale-95 disabled:opacity-30 ${
                    cameraMuted ? "bg-red-600 text-white" : "bg-neutral-700/80 hover:bg-neutral-600 text-neutral-200"
                  }`}
                  title={cameraMuted ? "Start Camera" : "Pause Camera"}
                >
                  {cameraMuted ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                </button>

                {/* Mute Speaker */}
                <button
                  onClick={() => setSpeakerMuted(!speakerMuted)}
                  className={`p-3 rounded-full transition-all active:scale-95 ${
                    speakerMuted ? "bg-red-600 text-white" : "bg-neutral-700/80 hover:bg-neutral-600 text-neutral-200"
                  }`}
                  title={speakerMuted ? "Unmute Sound" : "Mute Sound"}
                >
                  {speakerMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                {/* Decline/End Call */}
                <button
                  onClick={endCall}
                  className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all active:scale-95 shadow-md flex items-center justify-center"
                  title="End Call"
                >
                  <PhoneOff className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </main>
      </div>
    </div>
  );
};

const CallWindow = windowWrapper(Call, "call");
export default CallWindow;
