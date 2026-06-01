import { useState, useEffect } from "react";
import { Battery, Zap, Info, ShieldAlert, Sliders, ChevronDown } from "lucide-react";
import useWindowsStore from "@store/window";

const SettingsBatterySection = () => {
  const { systemSettings, updateSystemSetting } = useWindowsStore();

  const [battery, setBattery] = useState({
    level: 88,
    charging: false,
    supported: true,
  });

  const [timeView, setTimeView] = useState("24h"); // "24h" | "10d"
  const [showHealthModal, setShowHealthModal] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  // Sync with actual browser battery manager
  useEffect(() => {
    let batteryManager;
    const updateBattery = () => {
      if (!batteryManager) return;
      setBattery({
        level: Math.round(batteryManager.level * 100),
        charging: batteryManager.charging,
        supported: true,
      });
    };

    if ("getBattery" in navigator) {
      navigator.getBattery().then((manager) => {
        batteryManager = manager;
        updateBattery();
        manager.addEventListener("levelchange", updateBattery);
        manager.addEventListener("chargingchange", updateBattery);
      });
    }

    return () => {
      if (batteryManager) {
        batteryManager.removeEventListener("levelchange", updateBattery);
        batteryManager.removeEventListener("chargingchange", updateBattery);
      }
    };
  }, []);

  // Make Low Power Mode functional by dimming display and updating global settings
  const isLowPowerActive =
    systemSettings.lowPowerMode === "Always" ||
    (systemSettings.lowPowerMode === "Battery" && !battery.charging) ||
    (systemSettings.lowPowerMode === "Adapter" && battery.charging);

  useEffect(() => {
    // If low power mode is active, slightly dim display (65%), otherwise restore full brightness (100%)
    if (isLowPowerActive) {
      updateSystemSetting("brightness", 65);
    } else {
      updateSystemSetting("brightness", 100);
    }
  }, [isLowPowerActive, updateSystemSetting]);

  // SVG Chart Data Mock
  const hourlyData = [
    { label: "12 AM", level: 98 },
    { label: "", level: 94 },
    { label: "", level: 90 },
    { label: "4 AM", level: 85 },
    { label: "", level: 80 },
    { label: "", level: 78 },
    { label: "8 AM", level: 75 },
    { label: "", level: 74 },
    { label: "", level: 72 },
    { label: "12 PM", level: 92 },
    { label: "", level: 96 },
    { label: "", level: 100 },
    { label: "4 PM", level: 98 },
    { label: "", level: 92 },
    { label: "", level: 88 },
    { label: "8 PM", level: 85 },
    { label: "", level: 84 },
    { label: "", level: 82 },
  ];

  const dailyData = [
    { label: "Mon", level: 90 },
    { label: "Tue", level: 85 },
    { label: "Wed", level: 88 },
    { label: "Thu", level: 92 },
    { label: "Fri", level: 95 },
    { label: "Sat", level: 100 },
    { label: "Sun", level: 98 },
    { label: "Mon", level: 92 },
    { label: "Tue", level: 89 },
    { label: "Wed", level: 88 },
  ];

  const activeChartData = timeView === "24h" ? hourlyData : dailyData;

  return (
    <div className="w-full max-w-2xl mx-auto p-5 animate-in fade-in duration-300 text-gray-900 relative">
      {/* Header Area */}
      <div className="flex flex-col items-center mb-6 text-center select-none">
        <div className="relative flex items-center justify-center w-20 h-20 mb-3">
          <div
            className={`absolute inset-0 rounded-full animate-pulse opacity-20 ${battery.charging ? "bg-green-500" : "bg-emerald-500"}`}
          />
          <div className="relative bg-gradient-to-tr from-emerald-500 to-green-600 rounded-full w-16 h-16 flex items-center justify-center text-white shadow-md shadow-emerald-500/10">
            <div className="w-[32px] h-[17px] rounded-[4px] border-[1.5px] border-white relative flex items-center p-[1px] shrink-0">
              <div
                className="h-full rounded-[1.5px] bg-white transition-all duration-500"
                style={{ width: `${battery.level}%` }}
              />
              <div className="w-[2px] h-[6px] bg-white rounded-r-[1px] absolute -right-[3px] top-1/2 -translate-y-1/2" />
              {battery.charging && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap
                    size={11}
                    className="text-[#10b981] fill-[#10b981] stroke-white stroke-[1px]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <h2 className="text-[24px] font-bold tracking-tight">{battery.level}%</h2>
        <p className="text-[11.5px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
          {battery.charging ? "Power Adapter Charging" : "On Battery Power"}
        </p>
      </div>

      {/* Settings Grid */}
      <div className="space-y-4">
        {/* Low Power Mode Dropdown */}
        <div className="bg-white rounded-xl border border-gray-200/90 shadow-sm p-3.5 flex items-center justify-between">
          <div className="flex flex-col min-w-0 pr-4">
            <span className="text-[13px] font-bold text-gray-800 leading-normal">
              Low Power Mode
            </span>
            <span className="text-[11px] text-gray-400 leading-normal mt-0.5">
              Reduces energy usage to increase battery life by dimming the display and optimizing
              background activity.
            </span>
          </div>
          <div className="relative shrink-0 select-none">
            <select
              value={systemSettings.lowPowerMode || "Never"}
              onChange={(e) => updateSystemSetting("lowPowerMode", e.target.value)}
              className="appearance-none bg-gray-50 border border-gray-200 hover:bg-gray-100/70 text-gray-700 text-[12.5px] font-medium py-1 px-3.5 pr-8 rounded-lg outline-none cursor-pointer transition-colors"
            >
              <option value="Never">Never</option>
              <option value="Always">Always</option>
              <option value="Battery">Only on Battery</option>
              <option value="Adapter">Only on Power Adapter</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        {/* Battery Health Row & Options Row */}
        <div className="bg-white rounded-xl border border-gray-200/90 shadow-sm divide-y divide-gray-100">
          {/* Health Row */}
          <div
            className="flex items-center justify-between p-3.5 px-4 cursor-pointer hover:bg-black/[0.02] transition-colors"
            onClick={() => setShowHealthModal(true)}
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="text-emerald-600" size={17} />
              <span className="text-[13px] font-bold text-gray-800">Battery Health</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <span className="text-[12.5px] text-gray-500 font-medium">Normal</span>
              <Info size={15} className="text-gray-400" />
            </div>
          </div>

          {/* Options Row */}
          <div
            className="flex items-center justify-between p-3.5 px-4 cursor-pointer hover:bg-black/[0.02] transition-colors"
            onClick={() => setShowOptionsModal(true)}
          >
            <div className="flex items-center gap-3">
              <Sliders className="text-indigo-600" size={17} />
              <span className="text-[13px] font-bold text-gray-800">Options...</span>
            </div>
            <ChevronDown className="-rotate-90 text-gray-400" size={15} />
          </div>
        </div>

        {/* Custom Usage History Graph */}
        <div className="bg-white rounded-xl border border-gray-200/90 shadow-sm p-4">
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
            <span className="text-[13px] font-bold text-gray-800">Usage History</span>
            <div className="bg-gray-100 rounded-lg p-0.5 flex gap-0.5 select-none">
              <button
                onClick={() => setTimeView("24h")}
                className={`text-[11.5px] font-medium py-1 px-3.5 rounded-md transition-all ${timeView === "24h" ? "bg-white text-gray-800 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
              >
                Last 24 Hours
              </button>
              <button
                onClick={() => setTimeView("10d")}
                className={`text-[11.5px] font-medium py-1 px-3.5 rounded-md transition-all ${timeView === "10d" ? "bg-white text-gray-800 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
              >
                Last 10 Days
              </button>
            </div>
          </div>

          {/* Chart Graphic Area */}
          <div className="w-full bg-gray-50/50 rounded-xl border border-gray-100 p-4 pb-2">
            <div className="relative h-28 w-full flex items-end justify-between px-2.5">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-[0.06]">
                <div className="w-full border-t border-gray-900" />
                <div className="w-full border-t border-gray-900" />
                <div className="w-full border-t border-gray-900" />
              </div>

              {/* Chart Bars */}
              {activeChartData.map((data, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center flex-1 h-full justify-end group relative px-0.5"
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-[calc(100%+8px)] bg-gray-900 text-white text-[10px] font-bold py-1 px-2 rounded-md shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 shrink-0">
                    {data.level}%
                  </div>
                  {/* Bar */}
                  <div
                    className="w-full rounded-t-[3px] bg-gradient-to-t from-green-500 to-emerald-400 group-hover:from-green-600 group-hover:to-emerald-500 transition-all shadow-inner"
                    style={{ height: `${data.level * 0.9}%` }}
                  />
                  {/* Label */}
                  {data.label && (
                    <span className="text-[9.5px] text-gray-400 font-semibold mt-1.5 select-none leading-none">
                      {data.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 1. macOS Battery Health Modal (Dialog) */}
      {showHealthModal && (
        <div className="fixed inset-0 z-[99999] bg-black/15 backdrop-blur-[3px] flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl shadow-2xl w-[320px] p-5 text-gray-900 animate-in zoom-in-95 duration-200">
            <h3 className="text-[14px] font-bold text-gray-800 mb-1">Battery Health</h3>
            <p className="text-[11.5px] text-gray-400 mb-4 pb-2 border-b border-gray-100 font-medium">
              Battery Condition & Capacity
            </p>

            <div className="space-y-3 text-[12.5px] mb-5">
              <div className="flex justify-between">
                <span className="text-gray-500">Condition</span>
                <span className="font-bold text-green-600">Normal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Maximum Capacity</span>
                <span className="font-bold text-gray-800">88%</span>
              </div>
              <p className="text-[10px] text-gray-400 leading-normal mt-1">
                This is a measure of battery capacity relative to when it was new. Lower capacity
                may result in fewer hours of usage.
              </p>
            </div>

            <button
              onClick={() => setShowHealthModal(false)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-[12.5px] py-1.5 rounded-lg shadow transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* 2. macOS Battery Options Modal (Dialog) */}
      {showOptionsModal && (
        <div className="fixed inset-0 z-[99999] bg-black/15 backdrop-blur-[3px] flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl shadow-2xl w-[360px] p-5 text-gray-900 animate-in zoom-in-95 duration-200">
            <h3 className="text-[14px] font-bold text-gray-800 mb-1">Battery Options</h3>
            <p className="text-[11.5px] text-gray-400 mb-4 pb-2 border-b border-gray-100 font-medium">
              Configure advanced energy preferences
            </p>

            <div className="space-y-4 mb-6">
              {[
                { id: "opt-dim", label: "Slightly dim display on battery", checked: true },
                {
                  id: "opt-video",
                  label: "Optimize video streaming while on battery",
                  checked: false,
                },
                { id: "opt-nap", label: "Enable Power Nap on battery power", checked: true },
                { id: "opt-wake", label: "Wake for network access", checked: true },
              ].map((item) => (
                <div key={item.id} className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id={item.id}
                    defaultChecked={item.checked}
                    className="mt-0.5 accent-[#007aff] cursor-pointer"
                  />
                  <label
                    htmlFor={item.id}
                    className="text-[12.5px] font-medium text-gray-700 leading-tight cursor-pointer select-none"
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowOptionsModal(false)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-[12.5px] py-1.5 rounded-lg shadow transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsBatterySection;
