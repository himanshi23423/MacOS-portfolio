import React, { useState, useEffect, useRef } from "react";
import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/windowWrapper";
import useWindowsStore from "#store/window";
import { 
  Search, Send, Phone, Video, Info, ChevronLeft, Smile, 
  PhoneOff, Mic, MicOff, VideoOff, ExternalLink, Bell, BellOff, X 
} from "lucide-react";

const INITIAL_CONVERSATIONS = [
  {
    id: "kuldeep",
    name: "Kuldeep (Developer)",
    avatarColor: "bg-gradient-to-tr from-blue-500 to-indigo-500",
    initials: "K",
    unread: true,
    email: "kuldeeprajput.dev@gmail.com",
    github: "https://github.com/kuldeeprajput-dev",
    messages: [
      { id: 1, text: "Hey there! Welcome to my macOS portfolio.", sender: "them", time: "10:00 AM" },
      { id: 2, text: "Feel free to ask me anything here. I have automated some quick replies!", sender: "them", time: "10:01 AM" },
      { id: 3, text: "Try asking about: 'projects', 'skills', or 'contact'.", sender: "them", time: "10:01 AM" },
    ],
  },
  {
    id: "john",
    name: "John Doe",
    avatarColor: "bg-gradient-to-tr from-green-400 to-teal-600",
    initials: "JD",
    unread: false,
    email: "john.doe@example.com",
    github: "https://github.com",
    messages: [
      { id: 1, text: "Hey Kuldeep, did you check the new desktop mockup?", sender: "them", time: "Yesterday" },
      { id: 2, text: "Yeah, it looks super clean! The glassmorphism fits perfectly.", sender: "me", time: "Yesterday" },
      { id: 3, text: "Awesome! Let's get it deployed soon.", sender: "them", time: "Yesterday" },
    ],
  },
  {
    id: "apple",
    name: "Apple Support",
    avatarColor: "bg-gradient-to-tr from-gray-700 to-slate-900",
    initials: "",
    unread: false,
    email: "developer@apple.com",
    github: "https://developer.apple.com",
    messages: [
      { id: 1, text: "Your Apple Developer Membership has been renewed.", sender: "them", time: "2 days ago" },
      { id: 2, text: "Thank you for being a part of the Apple Developer Program.", sender: "them", time: "2 days ago" },
    ],
  },
];

const Messages = () => {
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem("macos_portfolio_messages");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_CONVERSATIONS;
  });

  const [activeChatId, setActiveChatId] = useState("kuldeep");
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Mute status for chats
  const [mutedChats, setMutedChats] = useState({});

  // FaceTime Call State
  const [callState, setCallState] = useState({
    isOpen: false,
    type: "audio", // "audio" | "video"
    status: "ringing", // "ringing" | "connected"
    micMuted: false,
    cameraOff: false,
  });
  const [callDuration, setCallDuration] = useState(0);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("macos_portfolio_messages", JSON.stringify(conversations));
  }, [conversations]);

  const activeChat = conversations.find((c) => c.id === activeChatId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages, isTyping]);

  useEffect(() => {
    if (activeChat?.unread) {
      setConversations((prev) =>
        prev.map((c) => (c.id === activeChat.id ? { ...c, unread: false } : c))
      );
    }
  }, [activeChatId]);

  // FaceTime Call Ringing / Timer Simulation
  useEffect(() => {
    let ringTimer;
    if (callState.isOpen && callState.status === "ringing") {
      ringTimer = setTimeout(() => {
        setCallState((prev) => ({ ...prev, status: "connected" }));
      }, 2500); // answer after 2.5 seconds
    }
    return () => clearTimeout(ringTimer);
  }, [callState.isOpen, callState.status]);

  useEffect(() => {
    let callTimer;
    if (callState.isOpen && callState.status === "connected") {
      callTimer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(callTimer);
  }, [callState.isOpen, callState.status]);

  const triggerCall = (type) => {
    setCallState({
      isOpen: true,
      type,
      status: "ringing",
      micMuted: false,
      cameraOff: false,
    });
  };

  const endCall = () => {
    setCallState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeChat.id
          ? { ...c, messages: [...c.messages, newMessage] }
          : c
      )
    );

    const userMsg = inputText.toLowerCase();
    setInputText("");

    if (activeChat.id === "kuldeep") {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        let replyText = "That's cool! Feel free to explore other apps in the dock too.";

        if (userMsg.includes("project")) {
          replyText = "I have built several cool projects! You can check them out in the 'Portfolio' Finder app, or view 'NewTube', 'Snsta', and 'Docs Editor'.";
        } else if (userMsg.includes("skill") || userMsg.includes("tech") || userMsg.includes("stack")) {
          replyText = "My primary tech stack includes React, Next.js, TypeScript, Node.js, Express, Bun, Tailwind CSS, PostgreSQL, and MongoDB. Open the 'Skills' Terminal app to see the complete list!";
        } else if (userMsg.includes("contact") || userMsg.includes("mail") || userMsg.includes("hire")) {
          replyText = "You can contact me via email at kuldeeprajput.dev@gmail.com, or check out my socials (Github, LinkedIn) in the Safari app!";
        } else if (userMsg.includes("hello") || userMsg.includes("hi") || userMsg.includes("hey")) {
          replyText = "Hey there! Hope you are enjoying the macOS portfolio. How can I help you today?";
        }

        const replyMessage = {
          id: Date.now() + 1,
          text: replyText,
          sender: "them",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setConversations((prev) =>
          prev.map((c) =>
            c.id === "kuldeep"
              ? { ...c, messages: [...c.messages, replyMessage] }
              : c
          )
        );
      }, 1200);
    }
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.messages.some((m) => m.text.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatCallTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl overflow-hidden shadow-2xl border border-black/10 select-none text-gray-800 relative">
      {/* Window Title Bar */}
      <div id="window-header" className="window-header shrink-0 flex items-center justify-between !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2">
        <div className="flex items-center gap-4">
          <WindowControls target="messages" />
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-1 rounded hover:bg-gray-200"
            aria-label="Toggle Sidebar"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform ${isSidebarOpen ? "rotate-0" : "rotate-180"}`} />
          </button>
        </div>
        <div className="flex-1 text-center font-semibold text-gray-700 text-sm hidden md:block">
          {activeChat ? activeChat.name : "Messages"}
        </div>
        <div className="w-14" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Sidebar */}
        <div className={`
          absolute md:relative inset-y-0 left-0 w-64 md:w-60 lg:w-64 bg-gray-50 border-r border-[#d1d1d1] flex flex-col z-20 transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
          {/* Search bar */}
          <div className="p-2.5">
            <div className="relative flex items-center bg-gray-200/60 rounded-md px-2 py-1.5">
              <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm focus:outline-none border-none outline-none text-gray-800"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto min-h-0 divide-y divide-gray-150">
            {filteredConversations.map((chat) => {
              const isSelected = activeChat.id === chat.id;
              const lastMsg = chat.messages[chat.messages.length - 1];
              const isMuted = mutedChats[chat.id];

              return (
                <div
                  key={chat.id}
                  onClick={() => {
                    setActiveChatId(chat.id);
                    if (window.innerWidth < 768) {
                      setIsSidebarOpen(false);
                    }
                  }}
                  className={`p-3 flex items-center gap-3 cursor-pointer select-none transition-colors relative ${
                    isSelected ? "bg-blue-100/70" : "hover:bg-gray-150/50"
                  }`}
                >
                  {chat.unread && (
                    <div className="absolute left-1.5 w-2 h-2 bg-blue-500 rounded-full" />
                  )}

                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm relative ${chat.avatarColor}`}>
                    {chat.initials}
                    {isMuted && (
                      <div className="absolute -bottom-1 -right-1 bg-gray-400 text-white rounded-full p-0.5 border border-white">
                        <BellOff className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm truncate text-gray-900">{chat.name}</h4>
                      <span className="text-[10px] text-gray-400 shrink-0 font-medium">{lastMsg?.time}</span>
                    </div>
                    <p className={`text-xs truncate mt-0.5 ${chat.unread ? "text-gray-900 font-semibold" : "text-gray-500"}`}>
                      {lastMsg?.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Pane */}
        <div className="flex-1 flex flex-col bg-white min-w-0 relative">
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="px-5 py-3 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
                <div>
                  <h3 className="font-semibold text-sm text-gray-900">{activeChat.name}</h3>
                  <span className="text-[10px] text-green-500 font-medium">iMessage</span>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => triggerCall("audio")}
                    className="p-1.5 rounded hover:bg-gray-100 text-blue-500"
                    title="Audio FaceTime"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => triggerCall("video")}
                    className="p-1.5 rounded hover:bg-gray-100 text-blue-500"
                    title="Video FaceTime"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setShowInfo(!showInfo)}
                    className={`p-1.5 rounded transition-colors ${showInfo ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-blue-500"}`}
                    title="Contact Details"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Split View (Messages + Info drawer) */}
              <div className="flex-1 flex min-h-0 overflow-hidden relative">
                {/* Messages Body */}
                <div className="flex-1 flex flex-col min-w-0 bg-white">
                  {/* Message History */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white min-h-0">
                    {activeChat.messages.map((msg) => {
                      const isMe = msg.sender === "me";
                      return (
                        <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[70%] rounded-2xl px-3.5 py-1.5 text-sm leading-relaxed shadow-sm ${
                              isMe
                                ? "bg-blue-500 text-white rounded-br-sm"
                                : "bg-gray-100 text-gray-800 rounded-bl-sm"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      );
                    })}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 text-gray-500 rounded-2xl px-4 py-2 text-sm rounded-bl-sm flex items-center gap-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Bar */}
                  <div className="p-3.5 bg-white border-t border-gray-100 shrink-0">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                      }}
                      className="flex items-center gap-2"
                    >
                      <button type="button" className="p-1.5 rounded hover:bg-gray-100 text-gray-400 shrink-0">
                        <Smile className="w-5 h-5" />
                      </button>
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="iMessage"
                        className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none border border-transparent focus:border-gray-200 outline-none text-gray-800"
                      />
                      <button
                        type="submit"
                        disabled={!inputText.trim()}
                        className="p-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-30 disabled:pointer-events-none text-white rounded-full transition-all shrink-0 active:scale-95 shadow-md flex items-center justify-center"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                </div>

                {/* ================= INFO DRAWER ================= */}
                {showInfo && (
                  <div className={`
                    absolute md:relative inset-y-0 right-0 w-64 bg-gray-50 border-l border-gray-200 p-5 overflow-y-auto flex flex-col items-center text-center shrink-0 z-30 transition-transform duration-300
                  `}>
                    {/* Mobile close button */}
                    <button
                      onClick={() => setShowInfo(false)}
                      className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 md:hidden"
                      aria-label="Close details"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>

                    {/* Big Avatar */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md mt-4 ${activeChat.avatarColor}`}>
                      {activeChat.initials}
                    </div>
                    
                    <h3 className="font-bold text-gray-900 text-base mt-3 leading-tight">{activeChat.name}</h3>
                    <span className="text-xs text-gray-500 mt-1 truncate w-full">{activeChat.email || "No email info"}</span>

                    {/* Quick call triggers */}
                    <div className="flex justify-center gap-4 my-5 w-full">
                      <button
                        onClick={() => triggerCall("audio")}
                        className="flex flex-col items-center gap-1 select-none"
                      >
                        <div className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 text-blue-600 flex items-center justify-center active:scale-95 transition-all">
                          <Phone className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] text-gray-500 font-medium">call</span>
                      </button>

                      <button
                        onClick={() => triggerCall("video")}
                        className="flex flex-col items-center gap-1 select-none"
                      >
                        <div className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 text-blue-600 flex items-center justify-center active:scale-95 transition-all">
                          <Video className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] text-gray-500 font-medium">video</span>
                      </button>
                    </div>

                    <hr className="w-full border-gray-200 my-1" />

                    {/* Controls / Options */}
                    <div className="w-full py-2 space-y-3">
                      {/* Toggle alerts/mute */}
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2 text-left">
                          {mutedChats[activeChat.id] ? (
                            <BellOff className="w-4 h-4 text-gray-400" />
                          ) : (
                            <Bell className="w-4 h-4 text-gray-400" />
                          )}
                          <span className="text-xs font-semibold text-gray-700">Hide Alerts</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!mutedChats[activeChat.id]}
                            onChange={() => setMutedChats(prev => ({
                              ...prev,
                              [activeChat.id]: !prev[activeChat.id]
                            }))}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    <hr className="w-full border-gray-200 my-1" />

                    {/* Links & Shared files mock */}
                    <div className="w-full py-3 text-left">
                      <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Links</h4>
                      {activeChat.github ? (
                        <a
                          href={activeChat.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2 bg-gray-100 hover:bg-gray-200 rounded text-xs text-blue-600 transition-colors w-full font-medium"
                        >
                          <span className="truncate max-w-[150px]">{activeChat.github.replace("https://", "")}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400 italic">No links shared</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <p className="text-sm">Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>

      {/* ================= FACETIME OVERLAY ================= */}
      {callState.isOpen && (
        <div className="absolute inset-0 bg-neutral-950/98 text-white z-40 flex flex-col items-center justify-between py-10 px-6 animate-fade-in">
          {/* Call Header */}
          <div className="text-center mt-4">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              FaceTime {callState.type === "video" ? "Video" : "Audio"}
            </span>
            <h2 className="text-2xl font-bold mt-1 text-white">{activeChat.name}</h2>
            <p className="text-sm text-neutral-300 mt-1">
              {callState.status === "ringing" ? "Ringing..." : formatCallTime(callDuration)}
            </p>
          </div>

          {/* Call Body (Avatar/Video Feed simulation) */}
          <div className="flex-1 flex items-center justify-center w-full relative">
            {callState.type === "video" ? (
              <div className="w-full h-full max-h-[260px] max-w-[400px] bg-neutral-900 rounded-2xl relative overflow-hidden border border-white/10 shadow-inner flex items-center justify-center">
                {callState.cameraOff ? (
                  <div className="text-neutral-500 flex flex-col items-center gap-2">
                    <VideoOff className="w-10 h-10" />
                    <span className="text-sm">Camera Off</span>
                  </div>
                ) : (
                  <>
                    {/* Simulated stream background */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-neutral-800 via-indigo-950 to-neutral-900 animate-pulse opacity-60" />
                    {/* Pulsing Avatar */}
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl z-10 shadow-lg ${activeChat.avatarColor} ${callState.status === "ringing" ? "animate-ping opacity-75 absolute" : ""}`}>
                      {activeChat.initials}
                    </div>
                    {callState.status !== "ringing" && (
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl z-10 shadow-lg ${activeChat.avatarColor}`}>
                        {activeChat.initials}
                      </div>
                    )}
                    {/* Picture-in-picture box */}
                    <div className="absolute bottom-3 right-3 w-20 h-28 bg-neutral-800 rounded-lg border border-white/20 shadow-md flex flex-col items-center justify-center overflow-hidden">
                      <span className="text-[10px] text-neutral-400 absolute bottom-1">You</span>
                      <Smile className="w-6 h-6 text-neutral-400 opacity-60" />
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* Audio call simulation */
              <div className="relative col-center">
                <div className={`w-28 h-28 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-xl ${activeChat.avatarColor} ${callState.status === "ringing" ? "animate-pulse" : ""}`}>
                  {activeChat.initials}
                </div>
                {callState.status === "connected" && (
                  <div className="flex gap-1.5 items-center justify-center mt-6">
                    <span className="w-1.5 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-7 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    <span className="w-1.5 h-5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "450ms" }} />
                    <span className="w-1.5 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "600ms" }} />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Call Actions */}
          <div className="flex items-center gap-6 mb-4">
            {/* Mic Mute */}
            <button
              onClick={() => setCallState(prev => ({ ...prev, micMuted: !prev.micMuted }))}
              className={`p-4 rounded-full border border-white/10 transition-colors ${
                callState.micMuted ? "bg-red-600 text-white" : "bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200"
              }`}
              title={callState.micMuted ? "Unmute Mic" : "Mute Mic"}
            >
              {callState.micMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* End Call Button */}
            <button
              onClick={endCall}
              className="p-5 bg-red-600 hover:bg-red-700 active:scale-95 transition-all text-white rounded-full shadow-lg"
              title="End Call"
            >
              <PhoneOff className="w-6 h-6" />
            </button>

            {/* Toggle Camera (Video call only) */}
            {callState.type === "video" && (
              <button
                onClick={() => setCallState(prev => ({ ...prev, cameraOff: !prev.cameraOff }))}
                className={`p-4 rounded-full border border-white/10 transition-colors ${
                  callState.cameraOff ? "bg-red-600 text-white" : "bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200"
                }`}
                title={callState.cameraOff ? "Turn Camera On" : "Turn Camera Off"}
              >
                {callState.cameraOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const MessagesWindow = windowWrapper(Messages, "messages");
export default MessagesWindow;
