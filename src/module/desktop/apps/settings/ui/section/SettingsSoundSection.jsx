import React, { useState } from "react";
import { Volume, Volume1, Volume2, VolumeX, Info, Check } from "lucide-react";
import useWindowsStore from "@store/window";

const SettingsSoundSection = () => {
  const { music, setMusicState, systemSettings } = useWindowsStore();
  const { volume, isMuted } = music;
  const { bluetoothDevices } = systemSettings;

  // Local configurations
  const [activeOutput, setActiveOutput] = useState("MacBook Pro Speakers");
  const [uiSoundEffects, setUiSoundEffects] = useState(true);
  const [soundBalance, setSoundBalance] = useState(50); // Left 0 - Right 100
  const [selectedAlertSound, setSelectedAlertSound] = useState("Boop");

  const alertSounds = ["Boop", "Breeze", "Crystal", "Submarine", "Basso"];

  const handleVolumeChange = (e) => {
    const val = Number(e.target.value);
    setMusicState({
      volume: val,
      isMuted: val === 0,
    });
  };

  const toggleMute = () => {
    setMusicState({
      isMuted: !isMuted,
    });
  };

  // Compile active outputs dynamically based on Bluetooth connection states
  const outputDevices = [{ name: "MacBook Pro Speakers", type: "Built-in", available: true }];

  if (bluetoothDevices?.airpods) {
    outputDevices.push({ name: "AirPods Pro", type: "Bluetooth", available: true });
  }
  if (bluetoothDevices?.headphones) {
    outputDevices.push({ name: "Sony WH-1000XM5", type: "Bluetooth", available: true });
  }

  return (
    <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
      {/* Volume Control Card */}
      <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2">
        Volume & Output
      </h3>
      <div className="w-full bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
        {/* Slider row */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMute}
            className="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none p-1 rounded hover:bg-gray-100"
          >
            {isMuted || volume === 0 ? (
              <VolumeX size={18} className="text-red-500" />
            ) : volume < 40 ? (
              <Volume1 size={18} />
            ) : (
              <Volume2 size={18} />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            style={{ outline: "none" }}
          />

          <span className="text-[12px] font-mono text-gray-500 w-8 text-right font-semibold">
            {isMuted ? "Mute" : `${volume}%`}
          </span>
        </div>

        {/* Output Device list */}
        <div className="border-t border-gray-100 pt-3">
          <span className="text-[10px] font-bold text-gray-400 uppercase block mb-2">
            Select Output Device
          </span>
          <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100 bg-gray-50/40">
            {outputDevices.map((device) => {
              const isSelected = activeOutput === device.name;
              return (
                <div
                  key={device.name}
                  onClick={() => setActiveOutput(device.name)}
                  className={`flex justify-between items-center p-3 px-4 transition-all duration-150 cursor-pointer ${
                    isSelected ? "bg-blue-50/30" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Volume size={14} className={isSelected ? "text-[#007aff]" : "text-gray-400"} />
                    <span
                      className={`text-[12.5px] font-semibold ${isSelected ? "text-[#007aff]" : "text-gray-800"}`}
                    >
                      {device.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-400 font-semibold">{device.type}</span>
                    {isSelected && <Check size={14} className="text-[#007aff] font-bold" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Balance Control Card */}
      <div className="w-full bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col gap-3">
        <div className="flex justify-between items-center text-[13px] font-bold text-gray-800">
          <span>Output Balance</span>
          <span className="text-[10px] text-gray-400 font-bold uppercase">
            {soundBalance === 50 ? "Center" : soundBalance < 50 ? "Left" : "Right"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-gray-400">L</span>
          <input
            type="range"
            min="0"
            max="100"
            value={soundBalance}
            onChange={(e) => setSoundBalance(Number(e.target.value))}
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <span className="text-[10px] font-bold text-gray-400">R</span>
        </div>
      </div>

      {/* Alert Sound Picker */}
      <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2">
        Alert Sounds
      </h3>
      <div className="w-full bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-4">
        <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100 max-h-36 overflow-y-auto">
          {alertSounds.map((sound) => {
            const isSelected = selectedAlertSound === sound;
            return (
              <div
                key={sound}
                onClick={() => setSelectedAlertSound(sound)}
                className={`flex items-center justify-between p-2.5 px-4 cursor-pointer transition-colors duration-150 ${
                  isSelected ? "bg-blue-50/20" : "hover:bg-gray-50"
                }`}
              >
                <span
                  className={`text-[12px] font-semibold ${isSelected ? "text-[#007aff]" : "text-gray-700"}`}
                >
                  {sound}
                </span>
                {isSelected && <Check size={14} className="text-[#007aff] font-bold" />}
              </div>
            );
          })}
        </div>

        {/* Play interface sound effect switch */}
        <div className="flex justify-between items-center text-[12.5px] border-t border-gray-100 pt-3.5">
          <div>
            <span className="text-gray-900 font-bold block">Play user interface sound effects</span>
            <span className="text-[10.5px] text-gray-400 font-semibold block mt-0.5">
              Hear sound effects when executing interface actions
            </span>
          </div>
          <button onClick={() => setUiSoundEffects(!uiSoundEffects)} className="focus:outline-none">
            {uiSoundEffects ? (
              <ToggleRightActive size={32} className="text-[#007aff] cursor-pointer" />
            ) : (
              <ToggleRightInactive size={32} className="text-gray-300 cursor-pointer" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ToggleRightActive = () => (
  <div className="w-10 h-6 rounded-full transition-colors relative shrink-0 cursor-pointer bg-[#007aff]">
    <span className="w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-md transition-all left-[18px]" />
  </div>
);

const ToggleRightInactive = () => (
  <div className="w-10 h-6 rounded-full transition-colors relative shrink-0 cursor-pointer bg-gray-300">
    <span className="w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-md transition-all left-0.5" />
  </div>
);

export default SettingsSoundSection;
