import React, { useState, useEffect, useRef } from "react";
import useWindowsStore from "#store/window";
import { Mic, X, Send, Volume2, VolumeX } from "lucide-react";

const Siri = () => {
  const { isSiriOpen, setSiriOpen, openWindow, setMusicState, music } = useWindowsStore();
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, I'm Siri. How can I help you today?" }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-US";

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript.trim()) {
          handleSend(transcript);
        }
      };

      rec.onerror = (e) => {
        console.error("Speech Recognition Error:", e);
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSiriOpen]);

  // Siri speak helper
  const speakText = (text) => {
    if (isMuted || !synthRef.current) return;
    synthRef.current.cancel(); // Stop any previous speech
    const cleanText = text.replace(/[*#`_\-[\]()]/g, ""); // Strip markdown
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Attempt to find an English female voice or standard voice
    const voices = synthRef.current.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith("en") && v.name.includes("Google")) || 
                         voices.find(v => v.lang.startsWith("en"));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    synthRef.current.speak(utterance);
  };

  // Perform client-side portfolio commands based on speech/text
  const parseSystemCommands = (text) => {
    const query = text.toLowerCase();
    
    if (query.includes("open finder")) {
      openWindow("finder");
      return "Opening Finder.";
    }
    if (query.includes("open weather")) {
      openWindow("weather");
      return "Opening Weather.";
    }
    if (query.includes("open safari") || query.includes("open internet") || query.includes("open browser")) {
      openWindow("safari");
      return "Opening Safari.";
    }
    if (query.includes("open terminal") || query.includes("open bash") || query.includes("open shell")) {
      openWindow("terminal");
      return "Opening Terminal.";
    }
    if (query.includes("open resume") || query.includes("view resume")) {
      openWindow("resume");
      return "Opening Resume.";
    }
    if (query.includes("open music") || query.includes("open jiosaavn")) {
      openWindow("music");
      return "Opening Music app.";
    }
    if (query.includes("play music") || query.includes("resume song") || query.includes("play song")) {
      setMusicState({ isPlaying: true });
      return "Playing music.";
    }
    if (query.includes("pause music") || query.includes("stop music") || query.includes("pause song")) {
      setMusicState({ isPlaying: false });
      return "Pausing playback.";
    }
    if (query.includes("open chrome")) {
      openWindow("chrome");
      return "Opening Google Chrome.";
    }
    if (query.includes("open code") || query.includes("open vscode") || query.includes("open editor")) {
      openWindow("vscode");
      return "Opening Visual Studio Code.";
    }
    if (query.includes("open calculator")) {
      openWindow("calculator");
      return "Opening Calculator.";
    }
    if (query.includes("open map")) {
      openWindow("map");
      return "Opening Maps.";
    }
    if (query.includes("open messages")) {
      openWindow("messages");
      return "Opening Messages.";
    }
    if (query.includes("open notes")) {
      openWindow("notes");
      return "Opening Notes.";
    }
    if (query.includes("open launchpad")) {
      openWindow("launchpad");
      return "Opening Launchpad.";
    }
    if (query.includes("close siri") || query.includes("bye siri") || query.includes("goodbye siri")) {
      setTimeout(() => setSiriOpen(false), 1000);
      return "Goodbye!";
    }
    
    return null;
  };

  const handleSend = async (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInputVal("");
    setIsLoading(true);

    // Check system action command
    const systemResponse = parseSystemCommands(text);
    if (systemResponse) {
      setIsLoading(false);
      setMessages((prev) => [...prev, { role: "assistant", content: systemResponse }]);
      speakText(systemResponse);
      return;
    }

    // Call Groq API
    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) {
        throw new Error("Groq API Key is missing. Please configure VITE_GROQ_API_KEY in your environment.");
      }

      const systemPrompt = "You are Siri, a helpful voice assistant on Kuldeep Rajput's macOS Portfolio. Keep your answers conversational, concise, witty, and under 3-4 sentences. You can guide users to open apps like Music, Weather, Safari, Finder, VSCode, Terminal, and Resume. You are running on Kuldeep's portfolio (a web representation of macOS). Kuldeep is a talented Full-Stack developer.";

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
            ...messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: text }
          ],
          temperature: 0.7,
          max_tokens: 150
        })
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that request.";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      speakText(reply);
    } catch (err) {
      console.error("Groq API Call failed:", err);
      const errMsg = "Sorry, I am having trouble connecting to the network right now.";
      setMessages((prev) => [...prev, { role: "assistant", content: errMsg }]);
      speakText(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please type your query.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      if (synthRef.current) synthRef.current.cancel(); // Stop talking
      recognitionRef.current.start();
    }
  };

  if (!isSiriOpen) return null;

  return (
    <div className="siri-container">
      {/* Header */}
      <div className="siri-header">
        <div className="siri-title">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span>Siri</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="text-zinc-400 hover:text-white transition-colors"
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? "Unmute Siri" : "Mute Siri"}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
          <button className="siri-close" onClick={() => setSiriOpen(false)}>
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Body / Dialog */}
      <div className="siri-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`siri-chat-bubble ${msg.role === "user" ? "user" : "assistant"}`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="siri-chat-bubble assistant flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer / Siri Sphere */}
      <div className="siri-footer">
        <div className="siri-orb-wrapper" onClick={toggleListening}>
          <div className="siri-orb-glow" />
          <div className={`siri-orb ${isListening ? "siri-orb-listening" : ""}`} />
          <Mic size={18} className="absolute text-white pointer-events-none" />
        </div>
        
        <form
          className="siri-input-wrapper"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            className="siri-input"
            placeholder={isListening ? "Listening..." : "Ask Siri anything..."}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isListening}
          />
          <button type="submit" className="siri-send-btn" disabled={isListening}>
            <Send size={12} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Siri;
