import React, { useState, useEffect } from "react";
import {
  Eye,
  Search,
  Ear,
  Hand,
  MessageSquare,
  Volume2,
  Play,
  Sparkles,
  Sliders,
} from "lucide-react";

const SettingsAccessibilitySection = () => {
  // Vision states
  const [voiceOver, setVoiceOver] = useState(false);
  const [reduceTransparency, setReduceTransparency] = useState(false);
  const [increaseContrast, setIncreaseContrast] = useState(false);
  const [cursorSize, setCursorSize] = useState(1); // 1 = Normal, 2 = Medium, 3 = Large, 4 = Extra Large

  // Hearing states
  const [screenFlash, setScreenFlash] = useState(false);
  const [flashTriggered, setFlashTriggered] = useState(false);

  // Speech states
  const [speechText, setSpeechText] = useState("Welcome to macOS accessibility controls.");

  // Sync Transparency & Contrast classes on document.body
  useEffect(() => {
    document.body.classList.toggle("reduce-transparency", reduceTransparency);
  }, [reduceTransparency]);

  useEffect(() => {
    document.body.classList.toggle("increase-contrast", increaseContrast);
  }, [increaseContrast]);

  // Sync Cursor sizes on document.body
  useEffect(() => {
    document.body.classList.remove("cursor-scaled-2x", "cursor-scaled-3x", "cursor-scaled-4x");
    if (cursorSize === 2) {
      document.body.classList.add("cursor-scaled-2x");
    } else if (cursorSize === 3) {
      document.body.classList.add("cursor-scaled-3x");
    } else if (cursorSize === 4) {
      document.body.classList.add("cursor-scaled-4x");
    }
  }, [cursorSize]);

  // Function to run VoiceOver TTS
  const speakText = (textToSpeak) => {
    if ("speechSynthesis" in window) {
      // Cancel active speech
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Toggle VoiceOver
  const handleToggleVoiceOver = (val) => {
    setVoiceOver(val);
    if (val) {
      speakText("VoiceOver on. Accessibility pane active.");
    } else {
      speakText("VoiceOver off.");
    }
  };

  // Trigger alert flash
  const triggerAlertFlash = () => {
    setFlashTriggered(true);
    setTimeout(() => {
      setFlashTriggered(false);
    }, 350);
  };

  const handleToggleScreenFlash = (val) => {
    setScreenFlash(val);
    if (val) {
      triggerAlertFlash();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 @sm:p-8 animate-in fade-in slide-in-from-bottom-2 duration-300 relative select-none">
      {/* Alert Screen Flash Overlay */}
      {flashTriggered && <div className="accessibility-screen-flash" />}

      {/* Header section */}
      <div className="flex items-center gap-3 mb-6">
        <Sliders size={20} className="text-blue-500" />
        <div>
          <h2 className="text-[17px] font-bold text-gray-900 leading-tight">Accessibility</h2>
          <p className="text-[11px] text-gray-400 font-semibold mt-0.5">
            Customize display, hearing, and control features
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Category: Vision */}
        <div>
          <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2">
            Vision
          </h3>
          <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {/* VoiceOver option */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 gap-4">
              <div className="flex items-start gap-3">
                <Eye size={16} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[13px] font-bold text-gray-900 block">VoiceOver</span>
                  <span className="text-[10.5px] text-gray-400 font-semibold block mt-0.5">
                    Spoken descriptions of items on the screen
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {voiceOver && (
                  <button
                    onClick={() =>
                      speakText(
                        "You have VoiceOver enabled. This is your portfolio dashboard running macOS Sequoia Settings.",
                      )
                    }
                    className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md px-2.5 py-1 text-[11px] font-bold transition-all shadow-sm active:scale-95"
                  >
                    <Play size={10} fill="currentColor" /> Speak View
                  </button>
                )}
                <button
                  onClick={() => handleToggleVoiceOver(!voiceOver)}
                  className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${voiceOver ? "bg-[#007aff]" : "bg-gray-300"}`}
                >
                  <span
                    className={`w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-md transition-all ${voiceOver ? "left-[18px]" : "left-0.5"}`}
                  />
                </button>
              </div>
            </div>

            {/* Reduce Transparency */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 gap-4">
              <div className="flex items-start gap-3">
                <Sparkles size={16} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[13px] font-bold text-gray-900 block">
                    Reduce Transparency
                  </span>
                  <span className="text-[10.5px] text-gray-400 font-semibold block mt-0.5">
                    Remove background glass blur styling on panel overlays
                  </span>
                </div>
              </div>
              <button
                onClick={() => setReduceTransparency(!reduceTransparency)}
                className={`w-10 h-6 rounded-full transition-colors relative shrink-0 cursor-pointer ${reduceTransparency ? "bg-[#007aff]" : "bg-gray-300"}`}
              >
                <span
                  className={`w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-md transition-all ${reduceTransparency ? "left-[18px]" : "left-0.5"}`}
                />
              </button>
            </div>

            {/* Increase Contrast */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 gap-4">
              <div className="flex items-start gap-3">
                <Sliders size={16} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[13px] font-bold text-gray-900 block">
                    Increase Contrast
                  </span>
                  <span className="text-[10.5px] text-gray-400 font-semibold block mt-0.5">
                    Sharpen layout borders and darken visual contrasts
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIncreaseContrast(!increaseContrast)}
                className={`w-10 h-6 rounded-full transition-colors relative shrink-0 cursor-pointer ${increaseContrast ? "bg-[#007aff]" : "bg-gray-300"}`}
              >
                <span
                  className={`w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-md transition-all ${increaseContrast ? "left-[18px]" : "left-0.5"}`}
                />
              </button>
            </div>

            {/* Cursor Size slider */}
            <div className="flex flex-col p-4 gap-3">
              <div className="flex items-start gap-3">
                <Search size={16} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[13px] font-bold text-gray-900 block">Pointer Size</span>
                  <span className="text-[10.5px] text-gray-400 font-semibold block mt-0.5">
                    Increase the cursor dimensions across the portfolio workspace
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 pl-7 pr-2 w-full">
                <span className="text-[10px] font-semibold text-gray-400">Normal</span>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={cursorSize}
                  onChange={(e) => setCursorSize(Number(e.target.value))}
                  className="flex-1 h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <span className="text-[10px] font-semibold text-gray-400">Large</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category: Hearing */}
        <div>
          <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2">
            Hearing
          </h3>
          <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Flash Screen option */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 gap-4">
              <div className="flex items-start gap-3">
                <Ear size={16} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[13px] font-bold text-gray-900 block">
                    Screen Flash for Alerts
                  </span>
                  <span className="text-[10.5px] text-gray-400 font-semibold block mt-0.5">
                    Flash the display window when notification events trigger
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {screenFlash && (
                  <button
                    onClick={triggerAlertFlash}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-2 py-1 text-[11px] font-bold transition-all shadow-sm active:scale-95"
                  >
                    Test Flash
                  </button>
                )}
                <button
                  onClick={() => handleToggleScreenFlash(!screenFlash)}
                  className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${screenFlash ? "bg-[#007aff]" : "bg-gray-300"}`}
                >
                  <span
                    className={`w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-md transition-all ${screenFlash ? "left-[18px]" : "left-0.5"}`}
                  />
                </button>
              </div>
            </div>

            {/* Captions custom styles selection list */}
            <div className="flex flex-col p-4 gap-2">
              <div className="flex items-start gap-3">
                <Hand size={16} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[13px] font-bold text-gray-900 block">
                    Subtitles & Captioning
                  </span>
                  <span className="text-[10.5px] text-gray-400 font-semibold block mt-0.5">
                    Configure preferred visual captions style defaults
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 pl-7 mt-2">
                {["Transparent", "Classic", "Large Text"].map((style) => (
                  <div
                    key={style}
                    className="border border-gray-200 bg-white rounded-lg p-2.5 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-500 transition-all shadow-sm"
                  >
                    <span className="text-[11px] font-bold text-gray-800">{style}</span>
                    <div className="w-8 h-4 rounded mt-1.5 flex items-center justify-center text-[7px] text-white font-bold bg-black/60">
                      Aa
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category: Speech (TTS text synthesizer box) */}
        <div>
          <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2">
            Speech Synthesizer
          </h3>
          <div className="w-full bg-gray-50 rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-start gap-3 mb-3">
              <MessageSquare size={16} className="text-blue-500 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <span className="text-[13px] font-bold text-gray-900 block">
                  Text to Speech Reader
                </span>
                <span className="text-[10.5px] text-gray-400 font-semibold block mt-0.5">
                  Input text phrases below and synthesize using voice synthesis
                </span>
              </div>
            </div>

            <div className="flex gap-2 w-full mt-3 pl-7">
              <input
                type="text"
                value={speechText}
                onChange={(e) => setSpeechText(e.target.value)}
                className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 shadow-inner"
                placeholder="Type something to speak..."
              />
              <button
                onClick={() => speakText(speechText)}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-1.5 text-xs font-bold transition-all shadow flex items-center gap-1.5 active:scale-95 cursor-pointer shrink-0"
              >
                <Volume2 size={13} /> Speak
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsAccessibilitySection;
