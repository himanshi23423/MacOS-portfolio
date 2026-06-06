import React, { useState, useEffect } from "react";
import {
  Battery,
  BatteryCharging,
  ChevronRight,
  ChevronLeft,
  Activity,
  Zap,
  ShieldAlert,
} from "lucide-react";
import useWindowsStore from "@store/window";

const SettingsBatteryPane = () => {
  const { systemSettings, updateSystemSetting, toggleSystemSetting } = useWindowsStore();
  const [batteryLevel, setBatteryLevel] = useState(88);
  const [isCharging, setIsCharging] = useState(false);
  const [subPage, setSubPage] = useState(null);
  const [showUsageTime, setShowUsageTime] = useState(false);

  const lowPowerMode = systemSettings.lowPowerMode === "Always";
  const showPercentage = systemSettings.showBatteryPercentage;
  const optimizedCharging = systemSettings.optimizedBatteryCharging;

  useEffect(() => {
    let batteryObj;
    const handleLevelChange = () => {
      if (batteryObj) {
        setBatteryLevel(Math.round(batteryObj.level * 100));
        setIsCharging(batteryObj.charging);
      }
    };

    if ("getBattery" in navigator) {
      navigator.getBattery().then((battery) => {
        batteryObj = battery;
        handleLevelChange();
        battery.addEventListener("levelchange", handleLevelChange);
        battery.addEventListener("chargingchange", handleLevelChange);
      });
    }

    return () => {
      if (batteryObj) {
        batteryObj.removeEventListener("levelchange", handleLevelChange);
        batteryObj.removeEventListener("chargingchange", handleLevelChange);
      }
    };
  }, []);

  if (subPage === "health") {
    return (
      <div className="w-full px-4 py-6 space-y-6 select-none animate-in fade-in slide-in-from-left-2 duration-200">
        <button
          onClick={() => setSubPage(null)}
          className="flex items-center gap-1 text-[13px] font-bold text-blue-500 hover:text-blue-600 transition-colors focus:outline-none bg-transparent border-none cursor-pointer p-0"
        >
          <ChevronLeft size={16} strokeWidth={2.5} />
          <span>Battery</span>
        </button>

        <div className="flex items-center gap-3.5 pb-2">
          <div className="w-9 h-9 bg-emerald-500/10 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
            <ShieldAlert size={18} strokeWidth={2.2} />
          </div>
          <div>
            <h2 className="text-[16px] font-bold text-gray-900 leading-tight">Battery Health</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">Condition & Capacity</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] divide-y divide-zinc-100">
          <div className="flex justify-between items-center p-3.5 pl-4">
            <span className="text-[15px] font-medium text-gray-800">Condition</span>
            <span className="text-[15px] font-medium text-gray-500 mr-2">Normal</span>
          </div>
          <div className="flex justify-between items-center p-3.5 pl-4">
            <span className="text-[15px] font-medium text-gray-800">Maximum Capacity</span>
            <span className="text-[15px] font-medium text-gray-500 mr-2">88%</span>
          </div>
        </div>
        <p className="text-[11px] text-gray-400 font-medium px-4 -mt-3">
          This is a measure of battery capacity relative to when it was new. Lower capacity may
          result in fewer hours of usage between charges.
        </p>

        <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-center p-3.5 pl-4 hover:bg-zinc-50 transition-colors">
            <div className="flex flex-col">
              <span className="text-[15px] font-medium text-gray-800">
                Optimized Battery Charging
              </span>
            </div>
            <button
              onClick={() => toggleSystemSetting("optimizedBatteryCharging")}
              className={`w-[51px] h-[31px] rounded-full transition-colors relative flex items-center px-0.5 border-none outline-none cursor-pointer shrink-0 ${
                optimizedCharging ? "bg-green-500" : "bg-zinc-200"
              }`}
            >
              <div
                className={`w-[27px] h-[27px] rounded-full bg-white shadow-md transition-transform duration-200 ${
                  optimizedCharging ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
        <p className="text-[11px] text-gray-400 font-medium px-4 -mt-3 leading-tight">
          To reduce battery aging, iPhone learns from your daily charging routine so it can wait to
          finish charging past 80% until you need to use it.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6 space-y-5 select-none animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Realtime Battery Header Card */}
      <div className="bg-white rounded-2xl border border-black/5 p-5 flex flex-col items-center shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <h2 className="text-[32px] font-bold text-gray-900 tracking-tight leading-none mb-1">
          {batteryLevel}%
        </h2>
        <p className="text-[13px] text-gray-500 font-medium flex items-center gap-1.5">
          {isCharging ? (
            <>
              <BatteryCharging size={14} className="text-green-500" />
              Charging
            </>
          ) : (
            <>
              <Battery size={14} className="text-gray-400" />
              Last charged to 100%
            </>
          )}
        </p>
      </div>

      {/* Toggles Group */}
      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] divide-y divide-zinc-100">
        {/* Battery Percentage Toggle */}
        <div className="flex justify-between items-center p-3.5 pl-4 hover:bg-zinc-50 transition-colors">
          <span className="text-[15px] font-medium text-gray-800">Battery Percentage</span>
          <button
            onClick={() => toggleSystemSetting("showBatteryPercentage")}
            className={`w-[51px] h-[31px] rounded-full transition-colors relative flex items-center px-0.5 border-none outline-none cursor-pointer shrink-0 ${
              showPercentage ? "bg-green-500" : "bg-zinc-200"
            }`}
          >
            <div
              className={`w-[27px] h-[27px] rounded-full bg-white shadow-md transition-transform duration-200 ${
                showPercentage ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Low Power Mode Toggle */}
        <div className="flex justify-between items-center p-3.5 pl-4 hover:bg-zinc-50 transition-colors">
          <div className="flex flex-col">
            <span className="text-[15px] font-medium text-gray-800">Low Power Mode</span>
            <span className="text-[11px] text-gray-400 mt-0.5 leading-tight pr-4">
              Low Power Mode temporarily reduces background activity like downloads and mail fetch
              until you can fully charge your iPhone.
            </span>
          </div>
          <button
            onClick={() => updateSystemSetting("lowPowerMode", lowPowerMode ? "Never" : "Always")}
            className={`w-[51px] h-[31px] rounded-full transition-colors relative flex items-center px-0.5 border-none outline-none cursor-pointer shrink-0 ${
              lowPowerMode ? "bg-yellow-500" : "bg-zinc-200"
            }`}
          >
            <div
              className={`w-[27px] h-[27px] rounded-full bg-white shadow-md transition-transform duration-200 ${
                lowPowerMode ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Battery Health Navigation */}
      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div
          onClick={() => setSubPage("health")}
          className="flex justify-between items-center p-3.5 pl-4 hover:bg-zinc-50 cursor-pointer active:bg-zinc-50 transition-colors"
        >
          <span className="text-[15px] font-medium text-gray-800">Battery Health & Charging</span>
          <ChevronRight size={16} className="text-gray-300 shrink-0" />
        </div>
      </div>

      {/* Usage Mockup */}
      <div className="pt-2">
        <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider ml-4 mb-2">
          Battery Usage By App (Last 24 Hours)
        </h3>

        <div
          className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] divide-y divide-zinc-100 cursor-pointer active:bg-zinc-50/50 transition-colors"
          onClick={() => setShowUsageTime(!showUsageTime)}
        >
          <div className="flex items-center justify-between p-3.5 pl-4 pointer-events-none">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white shrink-0">
                <Zap size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-semibold text-gray-800">Safari</span>
                <span className="text-[11px] text-gray-400">Browser</span>
              </div>
            </div>
            <span className="text-[15px] font-medium text-gray-500 w-[55px] text-right">
              {showUsageTime ? "3h 12m" : "34%"}
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 pl-4 pointer-events-none">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center text-white shrink-0">
                <Activity size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-semibold text-gray-800">Terminal</span>
                <span className="text-[11px] text-gray-400">Developer</span>
              </div>
            </div>
            <span className="text-[15px] font-medium text-gray-500 w-[55px] text-right">
              {showUsageTime ? "2h 05m" : "22%"}
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 pl-4 pointer-events-none">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center text-white shrink-0">
                <Zap size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-semibold text-gray-800">Settings</span>
                <span className="text-[11px] text-gray-400">System</span>
              </div>
            </div>
            <span className="text-[15px] font-medium text-gray-500 w-[55px] text-right">
              {showUsageTime ? "1h 14m" : "14%"}
            </span>
          </div>
        </div>
      </div>

      <p className="text-center text-[11px] text-gray-400 px-4 pt-2">
        Battery usage data is simulated since web browsers do not grant access to per-app physical
        battery consumption.
      </p>
    </div>
  );
};

export default SettingsBatteryPane;
