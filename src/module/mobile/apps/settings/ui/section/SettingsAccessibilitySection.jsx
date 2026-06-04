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
  const [speechText, setSpeechText] = useState("Welcome to iPhone accessibility controls.");

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
    <div className="w-full px-4 py-6 space-y-6 select-none animate-in fade-in slide-in-from-bottom-2 duration-300 relative">
      {/* Alert Screen Flash Overlay */}
      {flashTriggered && (
        <div className="fixed inset-0 bg-white/80 z-[9999] pointer-events-none transition-opacity animate-pulse" />
      )}

      {/* Vision Group */}
      <div>
        <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider ml-3 mb-2">
          Vision
        </h3>
        <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] divide-y divide-zinc-100">
          {/* VoiceOver Cell */}
          <div className="flex items-center justify-between p-4 gap-3.5">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-md bg-zinc-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Eye size={15} />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold text-gray-800 leading-tight">
                  VoiceOver
                </span>
                <span className="text-[11px] text-gray-450 mt-0.5 leading-tight">
                  Spoken descriptions of items on screen
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              {voiceOver && (
                <button
                  onClick={() => speakText("You have VoiceOver enabled on your iPhone 16.")}
                  className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all shadow-sm active:scale-95 border-none cursor-pointer"
                >
                  <Play size={10} fill="currentColor" /> Speak
                </button>
              )}
              <button
                onClick={() => handleToggleVoiceOver(!voiceOver)}
                className={`w-[51px] h-[31px] rounded-full transition-colors relative flex items-center px-0.5 border-none outline-none cursor-pointer ${
                  voiceOver ? "bg-blue-500" : "bg-zinc-200"
                }`}
              >
                <div
                  className={`w-[27px] h-[27px] rounded-full bg-white shadow-md transition-transform duration-200 ${
                    voiceOver ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Reduce Transparency Cell */}
          <div className="flex items-center justify-between p-4 gap-3.5">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-md bg-zinc-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles size={15} />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold text-gray-800 leading-tight">
                  Reduce Transparency
                </span>
                <span className="text-[11px] text-gray-450 mt-0.5 leading-tight">
                  Remove background blur overlays
                </span>
              </div>
            </div>
            <button
              onClick={() => setReduceTransparency(!reduceTransparency)}
              className={`w-[51px] h-[31px] rounded-full transition-colors relative flex items-center px-0.5 border-none outline-none cursor-pointer ${
                reduceTransparency ? "bg-blue-500" : "bg-zinc-200"
              }`}
            >
              <div
                className={`w-[27px] h-[27px] rounded-full bg-white shadow-md transition-transform duration-200 ${
                  reduceTransparency ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Increase Contrast Cell */}
          <div className="flex items-center justify-between p-4 gap-3.5">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-md bg-zinc-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Sliders size={15} />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold text-gray-800 leading-tight">
                  Increase Contrast
                </span>
                <span className="text-[11px] text-gray-450 mt-0.5 leading-tight">
                  Sharpen border and color contrasts
                </span>
              </div>
            </div>
            <button
              onClick={() => setIncreaseContrast(!increaseContrast)}
              className={`w-[51px] h-[31px] rounded-full transition-colors relative flex items-center px-0.5 border-none outline-none cursor-pointer ${
                increaseContrast ? "bg-blue-500" : "bg-zinc-200"
              }`}
            >
              <div
                className={`w-[27px] h-[27px] rounded-full bg-white shadow-md transition-transform duration-200 ${
                  increaseContrast ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Text Size / Pointer size */}
          <div className="flex flex-col p-4 gap-3">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-md bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Search size={15} />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold text-gray-800 leading-tight">
                  Pointer Size
                </span>
                <span className="text-[11px] text-gray-450 mt-0.5 leading-tight">
                  Enlarge cursor dimensions on screen
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3.5 pl-10 pr-2 w-full">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Min</span>
              <div className="relative flex-1 h-1.5 bg-zinc-150 rounded-full">
                <div
                  className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                  style={{ width: `${((cursorSize - 1) / 3) * 100}%` }}
                />
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={cursorSize}
                  onChange={(e) => setCursorSize(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase">Max</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hearing Group */}
      <div>
        <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider ml-3 mb-2">
          Hearing
        </h3>
        <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] divide-y divide-zinc-100">
          {/* Flash Alert Cell */}
          <div className="flex items-center justify-between p-4 gap-3.5">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-md bg-pink-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Ear size={15} />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold text-gray-800 leading-tight">
                  LED Flash for Alerts
                </span>
                <span className="text-[11px] text-gray-450 mt-0.5 leading-tight">
                  Flash screen when notifications trigger
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {screenFlash && (
                <button
                  onClick={triggerAlertFlash}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all shadow-sm active:scale-95 border-none cursor-pointer"
                >
                  Test
                </button>
              )}
              <button
                onClick={() => handleToggleScreenFlash(!screenFlash)}
                className={`w-[51px] h-[31px] rounded-full transition-colors relative flex items-center px-0.5 border-none outline-none cursor-pointer ${
                  screenFlash ? "bg-blue-500" : "bg-zinc-200"
                }`}
              >
                <div
                  className={`w-[27px] h-[27px] rounded-full bg-white shadow-md transition-transform duration-200 ${
                    screenFlash ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Subtitles cell */}
          <div className="flex flex-col p-4 gap-2">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-md bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Hand size={15} />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold text-gray-800 leading-tight">
                  Subtitles & Captioning
                </span>
                <span className="text-[11px] text-gray-455 mt-0.5 leading-tight">
                  Preferred visual captions styles
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 pl-10 mt-2">
              {["Transparent", "Classic", "Large Text"].map((style) => (
                <div
                  key={style}
                  className="border border-zinc-150 bg-zinc-50 rounded-xl p-2 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-500 hover:bg-white transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                >
                  <span className="text-[10px] font-bold text-gray-700">{style}</span>
                  <div className="w-7 h-3 rounded mt-1.5 flex items-center justify-center text-[7px] text-white font-bold bg-black/60">
                    Aa
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Speech Synthesizer Synthesize box */}
      <div>
        <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider ml-3 mb-2">
          Speech Reader
        </h3>
        <div className="bg-white rounded-2xl border border-black/5 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-3.5">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-md bg-green-500 text-white flex items-center justify-center shrink-0 mt-0.5">
              <MessageSquare size={15} />
            </div>
            <div className="flex-1">
              <span className="text-[15px] font-semibold text-gray-800 leading-tight">
                Text to Speech
              </span>
              <span className="text-[11px] text-gray-450 mt-0.5 leading-tight">
                Speak entered phrases using voice synthesizer
              </span>
            </div>
          </div>

          <div className="flex gap-2 w-full pl-10">
            <input
              type="text"
              value={speechText}
              onChange={(e) => setSpeechText(e.target.value)}
              className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-1.5 text-xs text-gray-805 focus:border-blue-500 focus:bg-white outline-none"
              placeholder="Type to speak..."
            />
            <button
              onClick={() => speakText(speechText)}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all shadow flex items-center gap-1 active:scale-95 cursor-pointer shrink-0 border-none"
            >
              <Volume2 size={13} /> Speak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsAccessibilitySection;
