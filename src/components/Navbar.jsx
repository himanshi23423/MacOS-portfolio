import { navIcons, navLinks } from "#constants/index";
import useWindowsStore from "#store/window";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";

const Navbar = () => {
  const { openWindow } = useWindowsStore();
  const [isControlOpen, setIsControlOpen] = useState(false);
  const [isPowerMenuOpen, setIsPowerMenuOpen] = useState(false);
  const [isAsleep, setIsAsleep] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [now, setNow] = useState(dayjs());
  const [settings, setSettings] = useState({
    darkMode: true,
    wifi: true,
    bluetooth: true,
    airdrop: false,
    volume: true,
    focusMode: false,
    brightness: 75,
    soundLevel: 45,
    nightLight: false,
  });
  const [battery, setBattery] = useState({
    level: null,
    charging: false,
    supported: false,
  });
  const controlCenterRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(dayjs());
    }, 30_000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("theme-light", !settings.darkMode);
    document.body.classList.toggle("theme-dark", settings.darkMode);
    document.body.classList.toggle("night-light-active", settings.nightLight);
  }, [settings.darkMode, settings.nightLight]);

  useEffect(() => {
    document.documentElement.style.setProperty("--system-brightness", settings.brightness);
  }, [settings.brightness]);

  useEffect(() => {
    document.documentElement.style.setProperty("--system-volume", settings.soundLevel);
  }, [settings.soundLevel]);

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

    if (!("getBattery" in navigator)) {
      setBattery({
        level: 88,
        charging: false,
        supported: true,
      });
      return;
    }

    navigator.getBattery().then((manager) => {
      batteryManager = manager;
      updateBattery();

      manager.addEventListener("levelchange", updateBattery);
      manager.addEventListener("chargingchange", updateBattery);
    });

    return () => {
      if (!batteryManager) return;
      batteryManager.removeEventListener("levelchange", updateBattery);
      batteryManager.removeEventListener("chargingchange", updateBattery);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isControlOpen &&
        controlCenterRef.current &&
        !controlCenterRef.current.contains(event.target)
      ) {
        setIsControlOpen(false);
        setIsPowerMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsControlOpen(false);
        setIsPowerMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isControlOpen]);

  const toggleSetting = (key) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  };

  const updateSlider = (key, value) => {
    setSettings((current) => ({ ...current, [key]: Number(value) }));
  };

  const takeScreenshot = () => {
    setIsControlOpen(false);
    setTimeout(async () => {
      try {
        const canvas = await html2canvas(document.body, {
          backgroundColor: null,
          useCORS: true,
          scale: window.devicePixelRatio || 2,
        });
        const image = canvas.toDataURL("image/png", 1.0);
        const link = document.createElement("a");
        link.download = `Screenshot_${dayjs().format("YYYY-MM-DD_HH-mm-ss")}.png`;
        link.href = image;
        link.click();
      } catch (err) {
        console.error("Screenshot failed:", err);
      }
    }, 300);
  };

  const openControlCenterFromNavbar = (event) => {
    if (controlCenterRef.current?.contains(event.target)) return;
    setIsControlOpen(true);
  };

  return (
    <>
      {isAsleep && (
        <div
          className="fixed inset-0 z-[999999] bg-black cursor-pointer"
          onClick={() => setIsAsleep(false)}
        ></div>
      )}
      <nav className="mac-navbar">
        <div className="nav-left">
        <img  src="/icons/logo.svg" alt="logo" className="apple-logo" />

        <ul className="nav-links max-sm:hidden">
          {navLinks.map(({ id, name, type }) => (
            <li className="font-sans text-zinc-800 hover:text-zinc-950" key={id} onClick={() => openWindow(type)}>
              {name}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="nav-right relative max-sm:hidden"
        onClick={openControlCenterFromNavbar}
      >
        <ul className="status-icons">
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} className="icon-hover" alt={`icon-${id}`} />
            </li>
          ))}

          <li>
            <div className="battery-indicator" title="Battery status">
              <span className="battery-text">
                {battery.supported && battery.level !== null
                  ? `${battery.level}%`
                  : "--"}
              </span>
              <div className="battery-icon-shell">
                <div
                  className="battery-level"
                  style={{
                    width: `${battery.supported && battery.level !== null ? battery.level : 0}%`,
                  }}
                />
                <i />
              </div>
              {battery.charging && (
                <img
                  src="/icons/battery-charging.svg"
                  alt="Charging"
                  aria-hidden="true"
                  className="w-[14px]"
                />
              )}
            </div>
          </li>
        </ul>
        <time>{now.format("ddd MMM D h:mm A")}</time>

        <aside
          ref={controlCenterRef}
          className={`control-center-mac ${isControlOpen ? "is-open" : ""}`}
          aria-hidden={!isControlOpen}
        >
          {/* Top Panel Grid */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            
            {/* Left Card: WiFi / Bluetooth / AirDrop */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-3 flex flex-col gap-3.5">
              
              {/* WiFi Option */}
              <div 
                className="flex items-center gap-2.5 cursor-pointer select-none"
                onClick={() => toggleSetting("wifi")}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  settings.wifi ? "bg-[#007aff] text-white" : "bg-white/10 text-white/70"
                }`}>
                  <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5a10.8 10.8 0 0 1 14 0" />
                    <path d="M8.5 16a5.8 5.8 0 0 1 7 0" />
                    <path d="M12 19.5a1.5 1.5 0 0 1 0-3" />
                    <path d="M2 9a16 16 0 0 1 20 0" />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[12.5px] font-semibold text-white/95 leading-tight">Wi-Fi</span>
                  <span className="text-[10px] text-white/50 leading-tight truncate">
                    {settings.wifi ? "Home" : "Off"}
                  </span>
                </div>
              </div>

              {/* Bluetooth Option */}
              <div 
                className="flex items-center gap-2.5 cursor-pointer select-none"
                onClick={() => toggleSetting("bluetooth")}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  settings.bluetooth ? "bg-[#007aff] text-white" : "bg-white/10 text-white/70"
                }`}>
                  <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m7 7 10 10-5 5V2l5 5L7 17" />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[12.5px] font-semibold text-white/95 leading-tight">Bluetooth</span>
                  <span className="text-[10px] text-white/50 leading-tight truncate">
                    {settings.bluetooth ? "On" : "Off"}
                  </span>
                </div>
              </div>

              {/* AirDrop Option */}
              <div 
                className="flex items-center gap-2.5 cursor-pointer select-none"
                onClick={() => toggleSetting("airdrop")}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  settings.airdrop ? "bg-[#007aff] text-white" : "bg-white/10 text-white/70"
                }`}>
                  <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
                    <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[12.5px] font-semibold text-white/95 leading-tight">AirDrop</span>
                  <span className="text-[10px] text-white/50 leading-tight truncate">
                    {settings.airdrop ? "Contacts Only" : "Off"}
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column Grid */}
            <div className="flex flex-col gap-3">
              
              {/* Do Not Disturb Option */}
              <div 
                className={`bg-white/5 border border-white/5 rounded-2xl p-3 flex items-center gap-3 cursor-pointer select-none transition-all ${
                  settings.focusMode ? "bg-white/12" : ""
                }`}
                onClick={() => toggleSetting("focusMode")}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  settings.focusMode ? "bg-[#ffcc00] text-black" : "bg-white/10 text-white/70"
                }`}>
                  <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[12.5px] font-semibold text-white/95 leading-tight">Do Not Disturb</span>
                  <span className="text-[10px] text-white/50 leading-tight">
                    {settings.focusMode ? "On" : "Off"}
                  </span>
                </div>
              </div>

              {/* Keyboard Brightness & AirPlay Row */}
              <div className="grid grid-cols-2 gap-3 flex-1">
                
                {/* Night Shift */}
                <div 
                  className="bg-white/5 border border-white/5 rounded-2xl p-3 flex flex-col justify-between cursor-pointer hover:bg-white/8 select-none"
                  onClick={() => toggleSetting("nightLight")}
                >
                  <div className={`w-[26px] h-[26px] rounded-full flex items-center justify-center transition-all ${
                    settings.nightLight ? "bg-[#ff9500] text-white" : "bg-white/10 text-white/70"
                  }`}>
                    <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                    </svg>
                  </div>
                  <span className="text-[10.5px] font-medium text-white/90 leading-tight mt-2">Night<br/>Light</span>
                </div>

                {/* System Settings launcher */}
                <div 
                  className="bg-white/5 border border-white/5 rounded-2xl p-3 flex flex-col justify-between cursor-pointer hover:bg-white/8 select-none"
                  onClick={() => openWindow("settings")}
                >
                  <div className="w-[26px] h-[26px] rounded-full bg-white/10 flex items-center justify-center text-white/70">
                    <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.54 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  </div>
                  <span className="text-[10.5px] font-medium text-white/90 leading-tight mt-2">System<br/>Settings</span>
                </div>

              </div>

            </div>

          </div>

          {/* Display Slider Block */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5 mb-3 flex flex-col gap-1.5">
            <span className="text-[12.5px] font-semibold text-white/95 leading-tight">Display</span>
            <div className="flex items-center gap-3 w-full relative">
              <input
                type="range"
                min="10"
                max="100"
                value={settings.brightness}
                onChange={(e) => updateSlider("brightness", e.target.value)}
                className="mac-slider flex-1"
                style={{ "--val": `${settings.brightness}%` }}
              />
              <div className="absolute left-3.5 pointer-events-none flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-black/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              </div>
            </div>
          </div>

          {/* Sound Slider Block */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5 mb-3 flex flex-col gap-1.5">
            <span className="text-[12.5px] font-semibold text-white/95 leading-tight">Sound</span>
            <div className="flex items-center gap-3 w-full relative">
              <input
                type="range"
                min="0"
                max="100"
                value={settings.soundLevel}
                onChange={(e) => updateSlider("soundLevel", e.target.value)}
                className="mac-slider flex-1"
                style={{ "--val": `${settings.soundLevel}%` }}
              />
              <div className="absolute left-3.5 pointer-events-none flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-black/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5 6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              </div>
              <div className="flex items-center text-white/60 hover:text-white shrink-0">
                <svg className="w-[15px] h-[15px] cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
                  <polygon points="12 15 17 21 7 21 12 15" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Card: Now Playing / Media Player */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src="/images/gal1.png"
                alt="Track Art"
                className="w-11 h-11 rounded-lg object-cover bg-white/10 border border-white/10 shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-[12.5px] font-semibold text-white/95 truncate leading-tight">Dragonball Durag</span>
                <span className="text-[10px] text-white/50 truncate leading-tight mt-0.5">Thundercat - It Is What It Is</span>
              </div>
            </div>

            {/* Media Controls */}
            <div className="flex items-center gap-3.5 pr-2">
              <button 
                className="text-white/80 hover:text-white transition-colors"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <svg className="w-3.5 h-3.5 fill-white text-white" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5 fill-white text-white" viewBox="0 0 24 24">
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                )}
              </button>
              <button className="text-white/80 hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5 fill-white text-white" viewBox="0 0 24 24">
                  <polygon points="5 4 15 12 5 20 5 4" />
                  <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="3" />
                </svg>
              </button>
            </div>
          </div>

        </aside>

      </div>
      </nav>
    </>
  );
};

export default Navbar;
