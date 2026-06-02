import React, { useState, useEffect } from "react";

const IOSSignalIcon = () => (
  <svg width="17" height="11" viewBox="0 0 17 11" fill="none" className="text-white shrink-0">
    <rect x="0.5" y="8" width="2.5" height="3" rx="0.75" fill="currentColor" />
    <rect x="4.5" y="6" width="2.5" height="5" rx="0.75" fill="currentColor" />
    <rect x="8.5" y="3.5" width="2.5" height="7.5" rx="0.75" fill="currentColor" />
    <rect x="12.5" y="0.5" width="2.5" height="10.5" rx="0.75" fill="currentColor" />
  </svg>
);

const IOSWifiIcon = () => (
  <svg
    width="16"
    height="12"
    viewBox="0 0 16 12"
    fill="currentColor"
    className="text-white shrink-0"
  >
    <path d="M8 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-3.693-3.693a5.215 5.215 0 0 1 7.386 0 1 1 0 1 0 1.414-1.414 7.215 7.215 0 0 0-10.214 0 1 1 0 1 0 1.414 1.414zm-2.828-2.828a9.212 9.212 0 0 1 13.042 0 1 1 0 1 0 1.415-1.415 11.212 11.212 0 0 0-15.872 0 1 1 0 1 0 1.415 1.415z" />
  </svg>
);

const IOSBatteryIcon = ({ level, isCharging, lowPower }) => (
  <div className="flex items-center gap-[4.5px] select-none shrink-0">
    <span className="text-[11.5px] font-semibold tracking-tight">{level}%</span>
    <div className="w-[24.5px] h-[11.5px] rounded-[3px] border border-white/70 p-[1.5px] relative flex items-center bg-transparent">
      <div
        className="h-full rounded-[1px] transition-all duration-300"
        style={{
          width: `${level}%`,
          backgroundColor: isCharging
            ? "#30d158"
            : lowPower
              ? "#f59e0b"
              : level <= 20
                ? "#ff453a"
                : "#ffffff",
        }}
      />
      {isCharging && (
        <div className="absolute inset-0 flex items-center justify-center shadow-sm">
          <svg width="5" height="8" viewBox="0 0 6 9" fill="currentColor" className="text-white">
            <path d="M3.5 0L0 5h2.5v4L6 4H3.5V0z" />
          </svg>
        </div>
      )}
      <div className="absolute right-[-3px] top-1/2 -translate-y-1/2 w-[1.5px] h-[3.5px] rounded-r-[0.75px] bg-white/70" />
    </div>
  </div>
);

const MobileOSStatusBar = ({ now, anyWindowOpen, setIsControlOpen, settings }) => {
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.getBattery) {
      navigator.getBattery().then((bat) => {
        const updateBattery = () => {
          setBatteryLevel(Math.round(bat.level * 100));
          setIsCharging(bat.charging);
        };
        updateBattery();
        bat.addEventListener("levelchange", updateBattery);
        bat.addEventListener("chargingchange", updateBattery);
      });
    }
  }, []);

  return (
    <header
      className="absolute top-0 left-0 w-full z-[70] flex justify-between items-center h-[44px] pl-[16px] pr-[16px] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.15)_70%,transparent_100%)] select-none"
      onClick={() => !anyWindowOpen && setIsControlOpen((p) => !p)}
    >
      <time className="text-sm font-semibold tracking-tight text-white mt-1">
        {now.format("h:mm")}
      </time>
      <div className="flex items-center gap-[6px] text-white mt-1">
        <IOSSignalIcon />
        <IOSWifiIcon />
        <IOSBatteryIcon level={batteryLevel} isCharging={isCharging} lowPower={settings.lowPower} />
      </div>
    </header>
  );
};

export default MobileOSStatusBar;
