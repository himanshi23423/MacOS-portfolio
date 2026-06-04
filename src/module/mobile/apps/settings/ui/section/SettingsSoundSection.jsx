import React from "react";
import { Volume1, Volume2, VolumeX, BellOff } from "lucide-react";
import useWindowsStore from "@store/window";

const SettingsSoundSection = () => {
  const { systemSettings, updateSystemSetting } = useWindowsStore();
  const { soundLevel } = systemSettings;

  // Track if sound is effectively muted
  const [silentMode, setSilentMode] = React.useState(soundLevel === 0);

  const handleVolumeChange = (e) => {
    const level = parseInt(e.target.value);
    updateSystemSetting("soundLevel", level);
    if (level > 0 && silentMode) {
      setSilentMode(false);
    }
  };

  const toggleSilentMode = () => {
    const nextSilent = !silentMode;
    setSilentMode(nextSilent);
    updateSystemSetting("soundLevel", nextSilent ? 0 : 50);
  };

  return (
    <div className="w-full px-4 py-6 space-y-6 select-none animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Volume Slider Section */}
      <div>
        <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider ml-3 mb-2">
          Ringtone and Alert Volume
        </h3>
        <div className="bg-white rounded-2xl border border-black/5 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex items-center gap-3.5">
            {soundLevel === 0 ? (
              <VolumeX size={18} className="text-gray-450 shrink-0" />
            ) : (
              <Volume1 size={18} className="text-gray-450 shrink-0" />
            )}

            <div className="relative flex-1 h-1.5 bg-zinc-100 rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                style={{ width: `${soundLevel}%` }}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={soundLevel}
                onChange={handleVolumeChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            <Volume2 size={18} className="text-gray-450 shrink-0" />
          </div>

          <div className="flex justify-between items-center text-xs text-gray-400 font-semibold pt-1">
            <span>Level</span>
            <span className="font-mono text-gray-700">{soundLevel}%</span>
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div>
        <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider ml-3 mb-2">
          Haptics & Mode
        </h3>
        <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] divide-y divide-zinc-100">
          {/* Silent Mode Cell */}
          <div className="flex items-center justify-between p-3.5 pl-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-md bg-red-500 text-white flex items-center justify-center shrink-0">
                <BellOff size={15} />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold text-gray-800 leading-tight">
                  Silent Mode
                </span>
                <span className="text-[11px] text-gray-400 mt-0.5">Mutes ringtones and alerts</span>
              </div>
            </div>

            {/* iOS style toggle */}
            <button
              onClick={toggleSilentMode}
              className={`w-[51px] h-[31px] rounded-full transition-colors relative flex items-center px-0.5 border-none outline-none cursor-pointer ${
                silentMode ? "bg-red-500" : "bg-zinc-200"
              }`}
            >
              <div
                className={`w-[27px] h-[27px] rounded-full bg-white shadow-md transition-transform duration-200 ${
                  silentMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Haptics Cell */}
          <div className="flex items-center justify-between p-3.5 pl-4">
            <span className="text-[15px] font-semibold text-gray-800">
              Play Haptics in Silent Mode
            </span>
            <button className="w-[51px] h-[31px] rounded-full bg-blue-500 relative flex items-center px-0.5 border-none outline-none cursor-pointer">
              <div className="w-[27px] h-[27px] rounded-full bg-white shadow-md translate-x-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSoundSection;
