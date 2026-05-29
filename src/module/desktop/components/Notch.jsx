import React, { useState, useRef, useEffect } from "react";
import useWindowsStore from "#store/window";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Mic, ExternalLink, Star, Cloud, Settings, Camera, Trash2, FileText } from "lucide-react";

const Notch = () => {
  const { music, setMusicState, isSiriOpen, setSiriOpen, openWindow } = useWindowsStore();
  const { activeTrack, isPlaying, volume, isMuted } = music;

  const [dragProgress, setDragProgress] = useState(0);
  const [isMusicExpanded, setIsMusicExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const [activeTab, setActiveTab] = useState("nook"); // "nook" or "tray"
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [cameraFlash, setCameraFlash] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const videoRef = useRef(null);
  const cameraStreamRef = useRef(null);

  const notchRef = useRef(null);

  // Siri specific states
  const [userQuestion, setUserQuestion] = useState("");
  const [siriResponse, setSiriResponse] = useState("Hi, I'm Siri. How can I help you today?");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [siriStatus, setSiriStatus] = useState("IDLE");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, I'm Siri. How can I help you today?" }
  ]);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);
  const audioPlaybackRef = useRef(new Audio());

  const isSiriOpenRef = useRef(isSiriOpen);
  useEffect(() => {
    isSiriOpenRef.current = isSiriOpen;
  }, [isSiriOpen]);

  // Click outside listener to collapse popups
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notchRef.current && !notchRef.current.contains(event.target)) {
        setIsMusicExpanded(false);
        setSiriOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopRecording();
      if (synthRef.current) synthRef.current.cancel();
    };
  }, []);

  const stopAudio = () => {
    if (audioPlaybackRef.current) {
      try {
        audioPlaybackRef.current.pause();
        audioPlaybackRef.current.currentTime = 0;
      } catch (e) {
        console.error("Error stopping audio:", e);
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
    }
    stopAudio();
    setIsListening(false);
  };

  const startRecording = async () => {
    try {
      stopAudio();
      if (synthRef.current) synthRef.current.cancel();
      setIsSpeaking(false);
      audioChunksRef.current = [];
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // Check if Siri was closed while waiting for user to allow permission
      if (!isSiriOpenRef.current) {
        stream.getTracks().forEach(track => track.stop());
        return;
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        if (!isSiriOpenRef.current) return;
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        if (audioBlob.size > 1000) {
          transcribeAudio(audioBlob);
        } else {
          setIsListening(false);
          setSiriStatus("IDLE");
        }
      };

      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      analyserRef.current = analyser;
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      let lastLoudTime = Date.now();
      setIsListening(true);
      setSiriStatus("LISTENING");

      const checkSilence = () => {
        if (!mediaRecorderRef.current || mediaRecorder.state !== "recording") return;
        
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const averageVolume = sum / bufferLength;

        // Silence threshold
        if (averageVolume > 15) {
          lastLoudTime = Date.now();
        }

        // If silent for 1.8 seconds, stop recording
        if (Date.now() - lastLoudTime > 1800) {
          stopRecording();
        } else {
          requestAnimationFrame(checkSilence);
        }
      };

      mediaRecorder.start();
      requestAnimationFrame(checkSilence);

    } catch (err) {
      console.error("Error accessing microphone:", err);
      setIsListening(false);
      setUserQuestion("");
      setSiriResponse("Microphone access denied. Please allow microphone permission in your browser settings.");
    }
  };

  const transcribeAudio = async (audioBlob) => {
    try {
      if (!isSiriOpenRef.current) return;

      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) {
        throw new Error("Groq API Key is missing.");
      }

      setSiriStatus("TRANSCRIBING");
      
      const formData = new FormData();
      formData.append("file", audioBlob, "recording.webm");
      formData.append("model", "whisper-large-v3");
      formData.append("language", "en");

      const response = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Whisper API error: ${response.statusText}`);
      }

      const data = await response.json();
      const transcript = data.text;

      if (!isSiriOpenRef.current) return;

      if (transcript && transcript.trim()) {
        setUserQuestion(transcript);
        setSiriStatus("THINKING");
        handleSendToGroq(transcript);
      } else {
        setSiriStatus("IDLE");
      }
    } catch (err) {
      console.error("Transcription error:", err);
      setSiriStatus("IDLE");
    }
  };

  const playSiriLaunchSound = () => {
    return new Promise((resolve) => {
      const sound = new Audio("/sound/siri.mp3");
      sound.volume = 0.5;
      sound.onended = () => resolve();
      sound.onerror = () => resolve();
      sound.play().catch((err) => {
        console.error("Failed to play launch sound:", err);
        resolve(); // Continue even if blocked
      });
    });
  };

  // When Siri opens, start listening
  useEffect(() => {
    if (isSiriOpen) {
      setUserQuestion("");
      const greeting = "Hello sir, how can I assist you today?";
      setSiriResponse(greeting);
      setSiriStatus("SPEAKING");
      const timer = setTimeout(async () => {
        await playSiriLaunchSound();
        if (isSiriOpenRef.current) {
          speakText(greeting, true);
        }
      }, 300);
      return () => clearTimeout(timer);
    } else {
      stopRecording();
      if (synthRef.current) synthRef.current.cancel();
      setIsListening(false);
      setIsSpeaking(false);
      setSiriStatus("IDLE");
    }
  }, [isSiriOpen]);

  const fallbackSpeakText = (text) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    
    setIsSpeaking(true);
    const cleanText = text.replace(/[*#`_\-[\]()]/g, ""); 
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utteranceRef.current = utterance; // Prevent garbage collection
    utterance.rate = 1.0;
    
    const voices = synthRef.current.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith("en") && v.name.includes("Google")) || 
                         voices.find(v => v.lang.startsWith("en"));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onend = () => {
      setIsSpeaking(false);
      setSiriStatus("LISTENING");
      if (isSiriOpenRef.current) {
        startRecording();
      }
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setSiriStatus("LISTENING");
      if (isSiriOpenRef.current) {
        startRecording();
      }
    };
    
    if (window.speechSynthesis) {
      window.speechSynthesis.resume();
    }
    synthRef.current.speak(utterance);
  };

  const speakText = async (text, shouldStartRecordingAfter = false) => {
    stopAudio();
    setIsSpeaking(true);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) {
        throw new Error("Groq API Key is missing.");
      }

      const response = await fetch("https://api.groq.com/openai/v1/audio/speech", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "canopylabs/orpheus-v1-english",
          input: text,
          voice: "troy",
          response_format: "mp3"
        })
      });

      if (!response.ok) {
        throw new Error(`Groq TTS API error: ${response.statusText}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audio = audioPlaybackRef.current || new Audio();
      audioPlaybackRef.current = audio;
      audio.src = audioUrl;

      audio.onended = () => {
        setIsSpeaking(false);
        if (shouldStartRecordingAfter && isSiriOpenRef.current) {
          startRecording();
        } else {
          setSiriStatus("IDLE");
        }
      };

      audio.onerror = (e) => {
        console.error("Audio playback error:", e);
        setIsSpeaking(false);
        setSiriStatus("IDLE");
      };

      await audio.play();

    } catch (err) {
      console.error("Groq TTS failed, falling back to Web Speech API:", err);
      fallbackSpeakText(text);
    }
  };

  const parseSystemCommands = (text) => {
    const query = text.toLowerCase();
    
    if (query.includes("open newtube")) {
      openWindow("chrome", { url: "https://newtube-ruddy.vercel.app/" });
      return "Opening NewTube project in Chrome.";
    }
    if (query.includes("open snsta") || query.includes("open free course finder") || query.includes("open course finder")) {
      openWindow("chrome", { url: "https://snsta.vercel.app/" });
      return "Opening Free Course Finder project in Chrome.";
    }
    if (query.includes("open resume ats") || query.includes("open ats scanner") || query.includes("open resume scanner")) {
      openWindow("chrome", { url: "https://resume-ats-omega.vercel.app/" });
      return "Opening Resume ATS Scanner project in Chrome.";
    }
    if (query.includes("open docs editor") || query.includes("open document editor") || query.includes("open collaborative editor")) {
      openWindow("chrome", { url: "https://docs-editor-ashen.vercel.app/" });
      return "Opening Docs Editor project in Chrome.";
    }
    if (query.includes("open my github") || query.includes("open github")) {
      openWindow("chrome", { url: "https://github.com/kuldeeprajput-dev" });
      return "Opening GitHub profile in Chrome.";
    }
    if (query.includes("open my linkedin") || query.includes("open linkedin")) {
      openWindow("chrome", { url: "https://www.linkedin.com/in/kuldeepdotcom/" });
      return "Opening LinkedIn profile in Chrome.";
    }
    if (query.includes("open my twitter") || query.includes("open twitter") || query.includes("open my x") || query.includes("open x")) {
      openWindow("chrome", { url: "https://x.com/kuldeepdotcom" });
      return "Opening Twitter profile in Chrome.";
    }

    if (query.includes("open settings") || query.includes("open system settings") || query.includes("open preference")) { openWindow("settings"); return "Opening Settings."; }
    if (query.includes("open finder")) { openWindow("finder"); return "Opening Finder."; }
    if (query.includes("open weather")) { openWindow("weather"); return "Opening Weather."; }
    if (query.includes("open safari") || query.includes("open internet") || query.includes("open browser")) { openWindow("safari"); return "Opening Safari."; }
    if (query.includes("open terminal") || query.includes("open bash") || query.includes("open shell")) { openWindow("terminal"); return "Opening Terminal."; }
    if (query.includes("open resume") || query.includes("view resume")) { openWindow("resume"); return "Opening Resume."; }
    if (query.includes("open music") || query.includes("open jiosaavn")) { openWindow("music"); return "Opening Music app."; }
    if (query.includes("play music") || query.includes("resume song") || query.includes("play song")) { setMusicState({ isPlaying: true }); return "Playing music."; }
    if (query.includes("pause music") || query.includes("stop music") || query.includes("pause song")) { setMusicState({ isPlaying: false }); return "Pausing playback."; }
    if (query.includes("open chrome")) { openWindow("chrome"); return "Opening Google Chrome."; }
    if (query.includes("open code") || query.includes("open vscode") || query.includes("open editor")) { openWindow("vscode"); return "Opening Visual Studio Code."; }
    if (query.includes("open calculator")) { openWindow("calculator"); return "Opening Calculator."; }
    if (query.includes("open map")) { openWindow("map"); return "Opening Maps."; }
    if (query.includes("open messages")) { openWindow("messages"); return "Opening Messages."; }
    if (query.includes("open notes")) { openWindow("notes"); return "Opening Notes."; }
    if (query.includes("open launchpad")) { openWindow("launchpad"); return "Opening Launchpad."; }
    if (query.includes("close siri") || query.includes("bye siri") || query.includes("goodbye siri")) { 
      setTimeout(() => setSiriOpen(false), 1500); 
      return "Goodbye!"; 
    }
    return null;
  };

  const handleSendToGroq = async (text) => {
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    
    const systemResponse = parseSystemCommands(text);
    if (systemResponse) {
      setSiriResponse(systemResponse);
      setMessages((prev) => [...prev, { role: "assistant", content: systemResponse }]);
      setSiriStatus("SPEAKING");
      speakText(systemResponse, false); // Do not start listening again for system commands
      return;
    }

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) {
        throw new Error("Groq API Key is missing.");
      }
      
      setSiriStatus("THINKING");

      const systemPrompt = "You are Siri on Kuldeep Rajput's macOS Portfolio. Keep answers conversational, witty, and under 3 sentences.";
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.slice(-4),
            { role: "user", content: text }
          ],
          temperature: 0.7,
          max_tokens: 150
        })
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that.";

      if (!isSiriOpenRef.current) return;

      setSiriResponse(reply);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setSiriStatus("SPEAKING");
      speakText(reply, false); // Wait for manual click to listen again
    } catch (err) {
      console.error(err);
      const errMsg = "Sorry, I am having trouble connecting.";
      setSiriResponse(errMsg);
      setSiriStatus("SPEAKING");
      speakText(errMsg, false);
    }
  };

  // Music Handlers
  const hasSong = activeTrack && activeTrack.id !== 0;

  const togglePlay = (e) => {
    e.stopPropagation();
    if (activeTrack.url) {
      setMusicState({ isPlaying: !isPlaying });
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent("macos-portfolio-next-track"));
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent("macos-portfolio-prev-track"));
  };

  const getCalendarDays = () => {
    const days = [];
    const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
    const today = new Date();
    for (let i = -3; i <= 3; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      days.push({
        dayName: weekdays[date.getDay()],
        dayNum: String(date.getDate()).padStart(2, '0'),
        isToday: i === 0,
      });
    }
    return days;
  };

  const getMonthName = () => {
    const today = new Date();
    return today.toLocaleString('default', { month: 'long' });
  };

  const openCamera = async (e) => {
    e.stopPropagation();
    setCameraError("");
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      cameraStreamRef.current = stream;
      // videoRef may not be mounted yet; the useEffect below will wire it once rendered
    } catch (err) {
      setCameraError("Camera access denied. Please allow camera permission.");
    }
  };

  // Wire the webcam stream to the <video> element once camera overlay is rendered
  useEffect(() => {
    if (isCameraOpen && videoRef.current && cameraStreamRef.current) {
      videoRef.current.srcObject = cameraStreamRef.current;
      videoRef.current.play().catch(() => {});
    }
  }, [isCameraOpen]);

  const closeCamera = (e) => {
    if (e) e.stopPropagation();
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach(t => t.stop());
      cameraStreamRef.current = null;
    }
    setIsCameraOpen(false);
    setCameraError("");
  };

  const takeSnapshot = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    try {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
      const link = document.createElement("a");
      link.download = `snapshot-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      // Flash animation
      setCameraFlash(true);
      try {
        const sound = new Audio("/sound/shutter.mp3");
        sound.volume = 0.4;
        sound.play().catch(() => {});
      } catch(err) {}
      setTimeout(() => setCameraFlash(false), 180);
    } catch(err) {
      console.error("Snapshot failed:", err);
    }
  };

  // Close camera stream on unmount or isMusicExpanded change
  useEffect(() => {
    if (!isMusicExpanded) closeCamera(null);
  }, [isMusicExpanded]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files).map(file => ({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB",
        url: URL.createObjectURL(file),
        type: file.type
      }));
      setDroppedFiles(prev => [...prev, ...files]);
    }
  };

  const handleRemoveFile = (e, index) => {
    e.stopPropagation();
    setDroppedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatTime = (sec) => {
    if (isNaN(sec) || sec === Infinity) return "0:00";
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const updateTime = () => {
      const audioEl = document.querySelector("audio");
      if (audioEl) {
        setCurrentTime(audioEl.currentTime || 0);
        setDuration(audioEl.duration || 0);
        const progress = (audioEl.currentTime / audioEl.duration) * 100;
        setDragProgress(isNaN(progress) ? 0 : progress);
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 500);
    return () => clearInterval(interval);
  }, [isSiriOpen, isMusicExpanded]);

  const handleProgressClick = (e) => {
    e.stopPropagation();
    const audioEl = document.querySelector("audio");
    if (!audioEl) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickPercent = clickX / width;
    audioEl.currentTime = clickPercent * audioEl.duration;
    setDragProgress(clickPercent * 100);
    setCurrentTime(clickPercent * audioEl.duration);
  };

  let notchClass = "macos-notch compact";
  if (isSiriOpen) {
    notchClass = "macos-notch siri-active";
  } else if (isMusicExpanded) {
    notchClass = "macos-notch expanded";
  } else if (isPlaying && hasSong) {
    notchClass = "macos-notch active-music";
  }

  // Handle clicking notch: middle -> Siri, sides -> Music popup
  const handleNotchClick = (e) => {
    if (isSiriOpen) {
      if (!isListening && !isSpeaking) {
        startRecording();
      } else {
        stopRecording();
        setSiriStatus("IDLE");
      }
      return;
    }

    if (isMusicExpanded) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickPercent = clickX / width;

    if (clickPercent >= 0.35 && clickPercent <= 0.65) {
      setSiriOpen(true);
      setIsMusicExpanded(false);
      if (audioPlaybackRef.current) {
        audioPlaybackRef.current.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
        audioPlaybackRef.current.play().catch(e => console.log("Audio unlock failed:", e));
      }
      if (window.speechSynthesis) {
        const u = new SpeechSynthesisUtterance("");
        window.speechSynthesis.speak(u);
      }
    } else {
      setIsMusicExpanded(true);
      setSiriOpen(false);
    }
  };

  return (
    <div
      ref={notchRef}
      className="macos-notch-container"
      onClick={handleNotchClick}
    >
      <div className={notchClass}>
        
        {/* Compact Default State */}
        {notchClass === "macos-notch compact" && (
          <div className="w-3 h-3 rounded-full bg-zinc-900 border border-zinc-800" />
        )}

        {/* Active Music Playing Mini State */}
        {notchClass === "macos-notch active-music" && (
          <div className="notch-music-compact">
            <div className="flex items-center gap-1.5 overflow-hidden w-28">
              {activeTrack.coverUrl ? (
                <img
                  src={activeTrack.coverUrl}
                  alt="art"
                  className="w-4 h-4 rounded-sm object-cover flex-shrink-0 animate-spin [animation-duration:8s]"
                />
              ) : (
                <span className="text-[10px] flex-shrink-0">{activeTrack.coverText || "🎵"}</span>
              )}
              <span className="truncate text-white text-[10px] select-none font-medium">
                {activeTrack.title}
              </span>
            </div>
            <div className="notch-wave">
              <div className="notch-wave-bar" />
              <div className="notch-wave-bar" />
              <div className="notch-wave-bar" />
              <div className="notch-wave-bar" />
              <div className="notch-wave-bar" />
            </div>
          </div>
        )}

        {/* Fully Expanded Media Player State */}
        {notchClass === "macos-notch expanded" && (
          <div className="notch-nook-expanded w-full h-full flex flex-col justify-between relative">
            <div className="notch-ambient-glow" />
            
            {/* Header section */}
            <div className="notch-nook-header flex justify-between items-center w-full select-none" onClick={(e) => e.stopPropagation()}>
              <div className="notch-nook-tabs flex items-center gap-4">
                <button 
                  className={`notch-nook-tab flex items-center gap-1.5 text-xs font-semibold transition-all ${activeTab === 'nook' ? 'text-white active' : 'text-zinc-400 hover:text-zinc-200'}`}
                  onClick={() => setActiveTab('nook')}
                >
                  <Star size={11} fill={activeTab === 'nook' ? "currentColor" : "none"} />
                  Nook
                </button>
                <button 
                  className={`notch-nook-tab flex items-center gap-1.5 text-xs font-semibold transition-all ${activeTab === 'tray' ? 'text-white active' : 'text-zinc-400 hover:text-zinc-200'}`}
                  onClick={() => setActiveTab('tray')}
                >
                  <Cloud size={11} />
                  Tray
                </button>
              </div>

              <button 
                className="notch-nook-settings text-zinc-400 hover:text-white transition-all"
                onClick={() => {
                  openWindow("settings");
                  setIsMusicExpanded(false);
                }}
                title="System Settings"
              >
                <Settings size={14} />
              </button>
            </div>

            {/* Divider line under header */}
            <div className="w-full h-[1px] bg-zinc-800/60 my-1" />

            {/* Camera flash screen animation */}
            {cameraFlash && (
              <div className="absolute inset-0 bg-white z-50 pointer-events-none rounded-[22px] animate-flash-shutter" />
            )}

            {/* Camera Live Feed Overlay */}
            {isCameraOpen && (
              <div className="absolute inset-0 z-40 bg-zinc-950/95 backdrop-blur-sm rounded-[22px] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {cameraError ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center px-6">
                    <Camera size={24} className="text-zinc-500" />
                    <p className="text-zinc-400 text-[11px]">{cameraError}</p>
                    <button
                      className="mt-1 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-semibold rounded-full transition-all"
                      onClick={closeCamera}
                    >Close</button>
                  </div>
                ) : (
                  <>
                    {/* Live video feed */}
                    <div className="relative flex-1 overflow-hidden rounded-t-[24px] bg-black">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover scale-x-[-1]"
                      />
                      {/* Green live indicator */}
                      <div className="absolute top-2 left-3 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[8px] text-white/70 font-medium tracking-widest">LIVE</span>
                      </div>
                    </div>
                    {/* Controls bar */}
                    <div className="flex items-center justify-between px-5 py-2 bg-zinc-950">
                      <button
                        className="text-zinc-400 hover:text-white text-[10px] font-semibold tracking-wide transition-colors"
                        onClick={closeCamera}
                      >✕ Close</button>
                      {/* Shutter button */}
                      <button
                        className="w-10 h-10 rounded-full border-2 border-white bg-transparent flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all group"
                        onClick={takeSnapshot}
                        title="Take snapshot"
                      >
                        <div className="w-7 h-7 rounded-full bg-white group-active:scale-90 transition-transform" />
                      </button>
                      <span className="text-[10px] text-zinc-500 w-14 text-right">Snapshot</span>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Tab content area */}
            <div className="flex-1 w-full overflow-hidden flex flex-col justify-center">
              {activeTab === 'nook' ? (
                /* Nook Tab: Music | Calendar | Camera */
                <div className="notch-nook-grid grid grid-cols-[1.2fr_1.5fr_0.9fr] items-center h-full w-full gap-2">
                  
                  {/* Column 1: Music */}
                  <div className="nook-music-section flex items-center gap-2 pr-2 border-r border-zinc-800/40 h-[80%] min-w-0" onClick={(e) => e.stopPropagation()}>
                    <div className={`nook-album-art w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center relative overflow-hidden bg-zinc-800 ${isPlaying ? 'playing' : ''}`}>
                      {hasSong && activeTrack.coverUrl ? (
                        <img src={activeTrack.coverUrl} alt="album art" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-lg">{activeTrack.coverText || "🎵"}</span>
                      )}
                    </div>
                    <div className="nook-music-info flex-1 min-w-0 flex flex-col justify-center gap-0.5">
                      <span className="text-[11px] text-white font-semibold truncate block">
                        {hasSong ? activeTrack.title : "Select a Song"}
                      </span>
                      <span className="text-[9px] text-zinc-400 truncate block">
                        {hasSong ? formatTime(currentTime) : "JioSaavn"}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <button className="text-zinc-400 hover:text-white transition-all" onClick={handlePrev}>
                          <SkipBack size={10} fill="currentColor" />
                        </button>
                        <button className="text-zinc-400 hover:text-white transition-all" onClick={togglePlay}>
                          {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
                        </button>
                        <button className="text-zinc-400 hover:text-white transition-all" onClick={handleNext}>
                          <SkipForward size={10} fill="currentColor" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Calendar */}
                  <div className="nook-calendar-section px-2 border-r border-zinc-800/40 h-[80%] flex flex-col justify-center select-none" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] text-white font-bold">{getMonthName()}</span>
                      <div className="flex-1 flex justify-between text-[8px] font-bold text-zinc-500">
                        {getCalendarDays().map((day, idx) => (
                          <span key={idx} className={day.isToday ? "text-[#3b82f6]" : ""}>{day.dayName}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[9px] text-zinc-400 mb-1">
                      <div className="flex-1 flex justify-between">
                        {getCalendarDays().map((day, idx) => (
                          <span 
                            key={idx} 
                            className={`w-4 h-4 flex items-center justify-center rounded-full font-medium ${day.isToday ? 'bg-[#3b82f6] text-white font-bold shadow-md shadow-blue-500/20' : 'text-zinc-300'}`}
                          >
                            {day.dayNum}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 justify-center mt-1 text-[8px] text-zinc-500">
                      <div className="w-1.5 h-1.5 rounded-sm border border-zinc-600 bg-zinc-800 flex-shrink-0" />
                      <span>Nothing for today</span>
                    </div>
                  </div>

                  {/* Column 3: Camera */}
                  <div className="nook-camera-section flex justify-center items-center h-[80%] pl-2">
                    <button 
                      className="nook-camera-button w-14 h-14 rounded-full border border-zinc-700 bg-gradient-to-b from-zinc-700 to-zinc-900 flex items-center justify-center shadow-lg transition-all hover:scale-105 hover:border-zinc-500 active:scale-95 text-zinc-400 hover:text-white"
                      onClick={openCamera}
                      title="Open camera"
                    >
                      <div className="w-11 h-11 rounded-full border border-zinc-700 bg-zinc-950 flex items-center justify-center">
                        <Camera size={16} className="opacity-80" />
                      </div>
                    </button>
                  </div>

                </div>
              ) : (
                /* Tray Tab: Drag & Drop files storage area */
                <div 
                  className="notch-tray-container flex flex-col h-full w-full overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {droppedFiles.length === 0 ? (
                    <div 
                      className={`notch-tray-dropzone flex-1 border border-dashed rounded-lg flex flex-col items-center justify-center gap-1.5 transition-all text-zinc-500 p-2 ${isDragOver ? 'border-[#3b82f6] bg-[#3b82f6]/5 text-white scale-[0.98]' : 'border-zinc-800/80 hover:border-zinc-700'}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <Cloud size={16} className={`transition-transform ${isDragOver ? 'translate-y-[-2px] text-[#3b82f6]' : ''}`} />
                      <span className="text-[10px] font-medium tracking-wide">Drop files to store temporarily</span>
                    </div>
                  ) : (
                    <div className="notch-tray-files flex-1 overflow-x-auto flex items-center gap-3 py-1 px-2 scrollbar-none">
                      {droppedFiles.map((file, idx) => (
                        <div key={idx} className="notch-tray-file-card relative group flex flex-col items-center justify-center p-1.5 bg-zinc-900/60 border border-zinc-800/40 rounded-lg w-16 h-16 flex-shrink-0 select-none">
                          <FileText size={16} className="text-zinc-400 mb-0.5" />
                          <span className="text-[7px] text-white truncate w-full text-center font-medium">{file.name}</span>
                          <span className="text-[6px] text-zinc-500">{file.size}</span>
                          
                          <button 
                            className="absolute -top-1 -right-1 p-0.5 bg-red-500/90 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => handleRemoveFile(e, idx)}
                            title="Remove file"
                          >
                            <Trash2 size={7} />
                          </button>
                        </div>
                      ))}
                      
                      {/* Dropzone Mini to add more files if files are already dropped */}
                      <div 
                        className={`w-16 h-16 flex-shrink-0 border border-dashed rounded-lg flex flex-col items-center justify-center gap-1 transition-all text-zinc-500 cursor-pointer ${isDragOver ? 'border-[#3b82f6] bg-[#3b82f6]/5 text-white' : 'border-zinc-800/80 hover:border-zinc-700'}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <Cloud size={10} />
                        <span className="text-[6px] font-medium">Add Files</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        )}

        {/* Siri Active Dropdown State */}
        {notchClass === "macos-notch siri-active" && (
          <>
            <div className="notch-siri-gif-container">
              <img src="/images/siri.gif" alt="Siri" className="notch-siri-gif" />
            </div>
            <div className="notch-siri-content">
              <div className="notch-siri-text">
                {userQuestion && <div className="notch-siri-user-question">{userQuestion}</div>}
                <div className="notch-siri-response">{siriResponse}</div>
              </div>
              <div className="notch-siri-footer">
                <div className="notch-siri-status">
                  <div 
                     className="notch-siri-status-dot" 
                     style={{ 
                       background: siriStatus === "LISTENING" ? "#ef4444" : siriStatus === "SPEAKING" ? "#10b981" : "#f59e0b", 
                       boxShadow: `0 0 6px ${siriStatus === "LISTENING" ? "#ef4444" : siriStatus === "SPEAKING" ? "#10b981" : "#f59e0b"}` 
                     }} 
                  />
                  {siriStatus === "LISTENING" ? "LISTENING..." : 
                   siriStatus === "TRANSCRIBING" ? "TRANSCRIBING..." : 
                   siriStatus === "THINKING" ? "THINKING..." : 
                   siriStatus === "SPEAKING" ? "SPEAKING..." : "IDLE"}
                </div>
                <button 
                  className="notch-siri-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSiriOpen(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Notch;
