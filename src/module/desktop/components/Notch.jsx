import React, { useState, useRef, useEffect } from "react";
import useWindowsStore from "#store/window";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

const Notch = () => {
  const { music, setMusicState, isSiriOpen, setSiriOpen, openWindow } = useWindowsStore();
  const { activeTrack, isPlaying } = music;

  const [dragProgress, setDragProgress] = useState(0);

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

  useEffect(() => {
    if (isSiriOpen) return;
    const interval = setInterval(() => {
      const audioEl = document.querySelector("audio");
      if (audioEl && !audioEl.paused) {
        const progress = (audioEl.currentTime / audioEl.duration) * 100;
        setDragProgress(isNaN(progress) ? 0 : progress);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isSiriOpen]);

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
  };

  let notchClass = "macos-notch compact";
  if (isSiriOpen) {
    notchClass = "macos-notch siri-active";
  } else if (isPlaying && hasSong) {
    notchClass = "macos-notch active-music";
  }

  // Handle clicking compact notch to open Siri
  const handleNotchClick = () => {
    if (!isSiriOpen) {
      setSiriOpen(true);
      // Unlock Web Audio/Audio playback in Chrome/Safari (User Gesture requirement)
      if (audioPlaybackRef.current) {
        audioPlaybackRef.current.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
        audioPlaybackRef.current.play().catch(e => console.log("Audio unlock failed:", e));
      }
      // Unlock SpeechSynthesis
      if (window.speechSynthesis) {
        const u = new SpeechSynthesisUtterance("");
        window.speechSynthesis.speak(u);
      }
    } else {
      // Toggle listening on click when Siri is active and not speaking
      if (!isListening && !isSpeaking) {
        startRecording();
      } else {
        stopRecording();
        setSiriStatus("IDLE");
      }
    }
  };

  return (
    <div
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
          <div className="notch-music-expanded">
            <div className="flex justify-between items-start w-full">
              <div className="notch-media-info">
                <div className="notch-album-art flex items-center justify-center">
                  {activeTrack.coverUrl ? (
                    <img src={activeTrack.coverUrl} alt="album art" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl">{activeTrack.coverText || "🎵"}</span>
                  )}
                </div>
                <div className="notch-track-details">
                  <span className="notch-track-title">{activeTrack.title}</span>
                  <span className="notch-track-artist">{activeTrack.artist}</span>
                </div>
              </div>
              <div
                className="notch-siri-trigger"
                onClick={(e) => {
                  e.stopPropagation();
                  setSiriOpen(true);
                }}
                title="Ask Siri"
              >
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              </div>
            </div>
            <div className="notch-progress-container">
              <div className="notch-progress-bar" onClick={handleProgressClick}>
                <div className="notch-progress-fill" style={{ width: `${dragProgress}%` }} />
              </div>
            </div>
            <div className="notch-controls">
              <button className="notch-btn" onClick={handlePrev}><SkipBack size={14} fill="currentColor" /></button>
              <button className="notch-btn" onClick={togglePlay}>
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              </button>
              <button className="notch-btn" onClick={handleNext}><SkipForward size={14} fill="currentColor" /></button>
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
