import React, { useState } from "react";
import {
  Wifi,
  Bluetooth,
  AppWindow,
  Airplay,
  Moon,
  Monitor,
  Volume2,
  Music,
  Accessibility,
  Battery,
  Users,
  Sliders,
} from "lucide-react";

const MenuSelect = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="bg-transparent border border-gray-300 rounded-md text-[11px] px-2 py-1 outline-none focus:border-blue-500 cursor-pointer text-gray-700 bg-white shadow-sm"
  >
    {options.map((opt) => (
      <option key={opt} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);

const Toggle = ({ active, onChange }) => (
  <button
    onClick={() => onChange(!active)}
    className={`w-10 h-6 rounded-full transition-colors relative shrink-0 cursor-pointer ${active ? "bg-[#007aff]" : "bg-gray-300"}`}
  >
    <span
      className={`w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-md transition-all ${active ? "left-[18px]" : "left-0.5"}`}
    />
  </button>
);

const SettingsControlCenterSection = () => {
  // States for toggles / selects
  const [wifiMenu, setWifiMenu] = useState("Show");
  const [bluetoothMenu, setBluetoothMenu] = useState("Show");
  const [airdropMenu, setAirdropMenu] = useState("Don't Show");
  const [focusMenu, setFocusMenu] = useState("When Active");
  const [screenMirroringMenu, setScreenMirroringMenu] = useState("Show");
  const [displayMenu, setDisplayMenu] = useState("When Active");
  const [soundMenu, setSoundMenu] = useState("Show");
  const [nowPlayingMenu, setNowPlayingMenu] = useState("When Active");

  // Toggles for other modules
  const [accessibilityCC, setAccessibilityCC] = useState(false);
  const [accessibilityMenu, setAccessibilityMenu] = useState(false);

  const [batteryCC, setBatteryCC] = useState(false);
  const [batteryMenu, setBatteryMenu] = useState(true);

  return (
    <div className="max-w-2xl mx-auto p-6 @sm:p-8 animate-in fade-in slide-in-from-bottom-2 duration-300 relative select-none">
      {/* Header section */}
      <div className="flex items-center gap-3 mb-6">
        <Sliders size={20} className="text-blue-500" />
        <div>
          <h2 className="text-[17px] font-bold text-gray-900 leading-tight">Control Center</h2>
          <p className="text-[11px] text-gray-400 font-semibold mt-0.5">
            Modules always show in Control Center. You can also show them in the menu bar.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Control Center Modules */}
        <div>
          <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2">
            Control Center Modules
          </h3>
          <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Wi-Fi */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  <Wifi size={16} className="text-blue-500" />
                </div>
                <span className="text-[13px] font-bold text-gray-900 block">Wi-Fi</span>
              </div>
              <MenuSelect
                value={wifiMenu}
                onChange={setWifiMenu}
                options={["Show", "Don't Show"]}
              />
            </div>

            {/* Bluetooth */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  <Bluetooth size={16} className="text-blue-500" />
                </div>
                <span className="text-[13px] font-bold text-gray-900 block">Bluetooth</span>
              </div>
              <MenuSelect
                value={bluetoothMenu}
                onChange={setBluetoothMenu}
                options={["Show", "Don't Show"]}
              />
            </div>

            {/* AirDrop */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  <Airplay size={16} className="text-blue-500" />
                </div>
                <span className="text-[13px] font-bold text-gray-900 block">AirDrop</span>
              </div>
              <MenuSelect
                value={airdropMenu}
                onChange={setAirdropMenu}
                options={["Show", "Don't Show"]}
              />
            </div>

            {/* Focus */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  <Moon size={16} className="text-blue-500" />
                </div>
                <span className="text-[13px] font-bold text-gray-900 block">Focus</span>
              </div>
              <MenuSelect
                value={focusMenu}
                onChange={setFocusMenu}
                options={["Show", "When Active", "Don't Show"]}
              />
            </div>

            {/* Screen Mirroring */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  <AppWindow size={16} className="text-blue-500" />
                </div>
                <span className="text-[13px] font-bold text-gray-900 block">Stage Manager</span>
              </div>
              <MenuSelect
                value={screenMirroringMenu}
                onChange={setScreenMirroringMenu}
                options={["Show", "When Active", "Don't Show"]}
              />
            </div>

            {/* Display */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  <Monitor size={16} className="text-blue-500" />
                </div>
                <span className="text-[13px] font-bold text-gray-900 block">Display</span>
              </div>
              <MenuSelect
                value={displayMenu}
                onChange={setDisplayMenu}
                options={["Show", "When Active", "Don't Show"]}
              />
            </div>

            {/* Sound */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  <Volume2 size={16} className="text-blue-500" />
                </div>
                <span className="text-[13px] font-bold text-gray-900 block">Sound</span>
              </div>
              <MenuSelect
                value={soundMenu}
                onChange={setSoundMenu}
                options={["Show", "When Active", "Don't Show"]}
              />
            </div>

            {/* Now Playing */}
            <div className="flex items-center justify-between p-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  <Music size={16} className="text-blue-500" />
                </div>
                <span className="text-[13px] font-bold text-gray-900 block">Now Playing</span>
              </div>
              <MenuSelect
                value={nowPlayingMenu}
                onChange={setNowPlayingMenu}
                options={["Show", "When Active", "Don't Show"]}
              />
            </div>
          </div>
        </div>

        {/* Other Modules */}
        <div>
          <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2">
            Other Modules
          </h3>
          <p className="text-[11px] text-gray-400 font-semibold mb-3 ml-1">
            You can choose to show these modules in Control Center or the menu bar.
          </p>

          <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Accessibility Shortcuts */}
            <div className="flex flex-col p-4 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  <Accessibility size={16} className="text-blue-500" />
                </div>
                <span className="text-[13px] font-bold text-gray-900 block">
                  Accessibility Shortcuts
                </span>
              </div>
              <div className="flex items-center justify-between pl-11 pr-2 mb-4">
                <span className="text-[12px] text-gray-700">Show in Menu Bar</span>
                <Toggle active={accessibilityMenu} onChange={setAccessibilityMenu} />
              </div>
              <div className="flex items-center justify-between pl-11 pr-2">
                <span className="text-[12px] text-gray-700">Show in Control Center</span>
                <Toggle active={accessibilityCC} onChange={setAccessibilityCC} />
              </div>
            </div>

            {/* Battery */}
            <div className="flex flex-col p-4 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  <Battery size={16} className="text-blue-500" />
                </div>
                <span className="text-[13px] font-bold text-gray-900 block">Battery</span>
              </div>
              <div className="flex items-center justify-between pl-11 pr-2 mb-4">
                <span className="text-[12px] text-gray-700">Show in Menu Bar</span>
                <Toggle active={batteryMenu} onChange={setBatteryMenu} />
              </div>
              <div className="flex items-center justify-between pl-11 pr-2">
                <span className="text-[12px] text-gray-700">Show in Control Center</span>
                <Toggle active={batteryCC} onChange={setBatteryCC} />
              </div>
            </div>

            {/* Fast User Switching */}
            <div className="flex flex-col p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  <Users size={16} className="text-blue-500" />
                </div>
                <span className="text-[13px] font-bold text-gray-900 block">
                  Fast User Switching
                </span>
              </div>
              <div className="flex items-center justify-between pl-11 pr-2">
                <span className="text-[12px] text-gray-700">Show in Control Center</span>
                <Toggle active={false} onChange={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsControlCenterSection;
