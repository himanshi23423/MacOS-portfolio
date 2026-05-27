import { navIcons, navLinks } from "#constants/index";
import useWindowsStore from "#store/window";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";

const Navbar = () => {
  const { windows, openWindow, music, setMusicState } = useWindowsStore();
  const [isControlOpen, setIsControlOpen] = useState(false);
  const [isAppleMenuOpen, setIsAppleMenuOpen] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [isPowerMenuOpen, setIsPowerMenuOpen] = useState(false);
  const [isAsleep, setIsAsleep] = useState(false);
  const [now, setNow] = useState(dayjs());
  const appleMenuRef = useRef(null);
  const appNames = {
    finder: "Finder",
    safari: "Safari",
    photos: "Photos",
    contact: "Contact",
    terminal: "Terminal",
    settings: "Settings",
    calculator: "Calculator",
    notes: "Notes",
    messages: "Messages",
    appletv: "Apple TV",
    call: "FaceTime",
    appstore: "App Store",
    calendar: "Calendar",
    weather: "Weather",
    chrome: "Chrome",
    vscode: "VS Code",
    postman: "Postman",
    map: "Maps",
    font: "Font Book",
    telegram: "Telegram",
    music: "Music",
    launchpad: "Launchpad",
    resume: "Resume",
  };

  const getActiveApp = () => {
    let activeKey = null;
    let maxZ = -1;

    Object.entries(windows).forEach(([key, win]) => {
      if (win.isOpen && !win.isMinimized && win.zIndex > maxZ) {
        maxZ = win.zIndex;
        activeKey = key;
      }
    });

    return activeKey;
  };

  const getAppMenus = (appId) => {
    const defaultMenus = ["File", "Edit", "View", "Window", "Help"];
    switch (appId) {
      case "finder":
        return ["File", "Edit", "View", "Go", "Window", "Help"];
      case "safari":
        return ["File", "Edit", "View", "History", "Bookmarks", "Window", "Help"];
      case "chrome":
        return ["File", "Edit", "View", "History", "Bookmarks", "Window", "Help"];
      case "vscode":
        return ["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Window", "Help"];
      case "music":
        return ["File", "Edit", "Song", "View", "Controls", "Window", "Help"];
      case "photos":
        return ["File", "Edit", "Image", "View", "Window", "Help"];
      case "terminal":
        return ["Shell", "Edit", "View", "Window", "Help"];
      default:
        return defaultMenus;
    }
  };

  const activeAppKey = getActiveApp();
  const activeAppName = activeAppKey ? (appNames[activeAppKey] || "Finder") : "Kuldeep's Portfolio";

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
    const currentVolume = music.isMuted ? 0 : music.volume;
    setSettings((current) => ({ ...current, soundLevel: currentVolume }));
    document.documentElement.style.setProperty("--system-volume", currentVolume);
  }, [music.volume, music.isMuted]);

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
      if (
        isAppleMenuOpen &&
        appleMenuRef.current &&
        !appleMenuRef.current.contains(event.target)
      ) {
        setIsAppleMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsControlOpen(false);
        setIsPowerMenuOpen(false);
        setIsAppleMenuOpen(false);
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
      {isShuttingDown && (
        <div className="fixed inset-0 bg-black z-[9999999] flex flex-col items-center justify-center select-none cursor-none animate-fade-in">
          <img src="/icons/logo.svg" alt="logo" className="w-14 h-14 invert opacity-95 animate-pulse mb-8" />
          <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}
      <nav className="mac-navbar">
        <div className="nav-left relative" ref={appleMenuRef}>
          <img 
            src="/icons/logo.svg" 
            alt="logo" 
            className="apple-logo hover:bg-black/5 rounded px-2" 
            onClick={(e) => {
              e.stopPropagation();
              setIsAppleMenuOpen(!isAppleMenuOpen);
            }} 
          />

          {isAppleMenuOpen && (
            <div className="absolute left-2.5 top-[28px] w-56 bg-[#2a2a2a]/90 backdrop-blur-3xl border border-white/10 rounded-lg shadow-2xl py-1 z-[99999] select-none text-[13.5px] text-white/95">
              <button 
                className="w-full text-left px-4 py-1 hover:bg-[#007aff] hover:text-white transition-colors cursor-default text-[13px] font-sans"
                onClick={() => {
                  setIsAppleMenuOpen(false);
                  openWindow("settings", { tab: "General", time: Date.now() });
                }}
              >
                About This Mac
              </button>
              <div className="h-[1px] bg-white/10 my-1 mx-2" />
              <button 
                className="w-full text-left px-4 py-1 hover:bg-[#007aff] hover:text-white transition-colors cursor-default text-[13px] font-sans"
                onClick={() => {
                  setIsAppleMenuOpen(false);
                  openWindow("settings");
                }}
              >
                System Settings...
              </button>
              <button 
                className="w-full text-left px-4 py-1 hover:bg-[#007aff] hover:text-white transition-colors cursor-default text-[13px] font-sans"
                onClick={() => {
                  setIsAppleMenuOpen(false);
                  openWindow("appstore");
                }}
              >
                App Store...
              </button>
              <div className="h-[1px] bg-white/10 my-1 mx-2" />
              <button 
                className="w-full text-left px-4 py-1 hover:bg-[#007aff] hover:text-white transition-colors cursor-default text-[13px] font-sans"
                onClick={() => {
                  setIsAppleMenuOpen(false);
                  setIsAsleep(true);
                }}
              >
                Sleep
              </button>
              <button 
                className="w-full text-left px-4 py-1 hover:bg-[#007aff] hover:text-white transition-colors cursor-default text-[13px] font-sans"
                onClick={() => {
                  setIsAppleMenuOpen(false);
                  window.location.reload();
                }}
              >
                Restart...
              </button>
              <button 
                className="w-full text-left px-4 py-1 hover:bg-[#007aff] hover:text-white transition-colors cursor-default text-[13px] font-sans"
                onClick={() => {
                  setIsAppleMenuOpen(false);
                  setIsShuttingDown(true);
                  setTimeout(() => {
                    window.location.href = "about:blank";
                  }, 2000);
                }}
              >
                Shut Down...
              </button>
            </div>
          )}

        <ul className="nav-links max-sm:hidden">
          <li className="font-bold cursor-default">{activeAppName}</li>
          <li onClick={() => openWindow("finder")}>Projects</li>
          <li onClick={() => openWindow("contact")}>Contact</li>
          <li onClick={() => openWindow("resume")}>Resume</li>
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
                value={music.isMuted ? 0 : music.volume}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setMusicState({ volume: val, isMuted: val === 0 });
                }}
                className="mac-slider flex-1"
                style={{ "--val": `${music.isMuted ? 0 : music.volume}%` }}
              />
              <div className="absolute left-3.5 pointer-events-none flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-black/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5 6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              </div>
              <div 
                className="flex items-center shrink-0 cursor-pointer"
                onClick={() => setMusicState({ isMuted: !music.isMuted })}
              >
                {music.isMuted ? (
                  <svg className="w-[18px] h-[18px] text-red-500 hover:text-red-650" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="22" y1="9" x2="16" y2="15" />
                    <line x1="16" y1="9" x2="22" y2="15" />
                  </svg>
                ) : (
                  <svg className="w-[18px] h-[18px] text-white/80 hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Card: Now Playing / Media Player */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {music.activeTrack.coverUrl ? (
                <img
                  src={music.activeTrack.coverUrl}
                  alt="Track Art"
                  className="w-11 h-11 rounded-lg object-cover bg-white/10 border border-white/10 shrink-0"
                />
              ) : (
                <div className={`w-11 h-11 rounded-lg bg-gradient-to-tr ${music.activeTrack.coverColor || 'from-zinc-500 to-zinc-700'} flex items-center justify-center text-lg shadow-md shrink-0 text-white`}>
                  {music.activeTrack.coverText || '🎵'}
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-[12.5px] font-semibold text-white/95 truncate leading-tight">
                  {music.activeTrack.title || 'Select a Song'}
                </span>
                <span className="text-[10px] text-white/50 truncate leading-tight mt-0.5">
                  {music.activeTrack.artist || 'JioSaavn Music'}
                </span>
              </div>
            </div>

            {/* Media Controls */}
            <div className="flex items-center gap-3.5 pr-2">
              <button 
                className="text-white/80 hover:text-white transition-colors"
                onClick={() => setMusicState({ isPlaying: !music.isPlaying })}
              >
                {music.isPlaying ? (
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
