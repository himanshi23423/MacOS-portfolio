import { navIcons } from "@constants/index";
import NavbarBatteryMenu from "../components/NavbarBatteryMenu";
import NavbarDateTime from "../components/NavbarDateTime";
import NavbarControlCenter from "../components/NavbarControlCenter";
import { useState, useEffect, useRef } from "react";

const NavbarControlCenterSection = ({
  now,
  battery,
  music,
  settings,
  isControlOpen,
  controlCenterRef,
  toggleSetting,
  updateSlider,
  setMusicState,
  openWindow,
}) => {
  const [activeMenu, setActiveMenu] = useState(null); // 'wifi' | 'bluetooth' | 'user' | 'battery' | 'spotlight' | 'control' | null
  const [spotlightQuery, setSpotlightQuery] = useState("");
  const containerRef = useRef(null);
  const spotlightInputRef = useRef(null);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Focus spotlight input when active
  useEffect(() => {
    if (activeMenu === "spotlight" && spotlightInputRef.current) {
      setTimeout(() => {
        spotlightInputRef.current?.focus();
      }, 50);
    } else {
      setSpotlightQuery("");
    }
  }, [activeMenu]);

  const toggleMenu = (menuName, e) => {
    e.stopPropagation();
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  const searchableApps = [
    { name: "Finder", key: "finder", icon: "📁", desc: "System File Explorer" },
    { name: "Projects", key: "finder", icon: "💻", desc: "View Portfolio Projects" },
    { name: "VS Code", key: "vscode", icon: "📝", desc: "Visual Studio Code Workspace" },
    { name: "Safari Browser", key: "safari", icon: "🌐", desc: "Apple Safari Web Browser" },
    { name: "Chrome", key: "chrome", icon: "🌐", desc: "Google Chrome Browser" },
    { name: "Calculator", key: "calculator", icon: "🧮", desc: "System Calculator App" },
    { name: "Terminal", key: "terminal", icon: "💻", desc: "Command Line Shell" },
    { name: "Music Player", key: "music", icon: "🎵", desc: "Apple Music Streamer" },
    {
      name: "System Settings",
      key: "settings",
      icon: "⚙️",
      desc: "Portfolio System Configuration",
    },
    { name: "Resume Viewer", key: "resume", icon: "📄", desc: "Curriculum Vitae" },
    { name: "Contact Form", key: "contact", icon: "✉️", desc: "Get In Touch" },
    { name: "Launchpad", key: "launchpad", icon: "🚀", desc: "App Launcher Overview" },
    { name: "Weather Forecast", key: "weather", icon: "☀️", desc: "Local Weather Report" },
    { name: "Notes Pad", key: "notes", icon: "📝", desc: "Quick Notes Manager" },
  ];

  const filteredApps = spotlightQuery.trim()
    ? searchableApps.filter(
        (app) =>
          app.name.toLowerCase().includes(spotlightQuery.toLowerCase()) ||
          app.desc.toLowerCase().includes(spotlightQuery.toLowerCase()),
      )
    : [];

  const handleLaunchApp = (appKey) => {
    setActiveMenu(null);
    openWindow(appKey);
  };

  const handleSpotlightKeyDown = (e) => {
    if (e.key === "Enter" && filteredApps.length > 0) {
      handleLaunchApp(filteredApps[0].key);
    }
  };

  // Status Icons with conditional filtering/Bluetooth injection
  const visibleIcons = [];
  if (settings.bluetooth) {
    visibleIcons.push({ id: "bluetooth", img: "/icons/bluetooth.svg", type: "bluetooth" });
  }

  navIcons.forEach((icon) => {
    if (icon.img.includes("wifi")) {
      if (settings.wifi) {
        visibleIcons.push({ ...icon, type: "wifi" });
      }
    } else if (icon.img.includes("search")) {
      visibleIcons.push({ ...icon, type: "spotlight" });
    } else if (icon.img.includes("user")) {
      visibleIcons.push({ ...icon, type: "user" });
    } else if (icon.img.includes("mode")) {
      visibleIcons.push({ ...icon, type: "control" });
    } else {
      visibleIcons.push(icon);
    }
  });

  return (
    <div className="flex items-center h-full gap-2 relative" ref={containerRef}>
      <ul className="status-icons flex items-center h-full">
        {visibleIcons.map(({ id, img, type }) => (
          <li
            key={id}
            className={`h-full flex items-center relative cursor-pointer transition-colors ${
              activeMenu === type ? "bg-white/20" : "hover:bg-white/10"
            }`}
            onClick={(e) => toggleMenu(type, e)}
          >
            <img
              src={img}
              className={`icon-hover ${id === "bluetooth" ? "scale-[1.55]" : ""}`}
              alt={`icon-${id}`}
            />

            {/* Wi-Fi Dropdown */}
            {type === "wifi" && activeMenu === "wifi" && (
              <div className="mac-dropdown right-0 w-[260px] text-white" role="menu">
                <div className="apple-menu-section flex items-center justify-between px-3 py-1">
                  <span className="font-semibold">Wi-Fi</span>
                  <input
                    type="checkbox"
                    checked={settings.wifi}
                    onChange={() => toggleSetting("wifi")}
                    className="accent-[#007aff] cursor-pointer w-4 h-4"
                  />
                </div>
                {settings.wifi ? (
                  <>
                    <div className="apple-menu-section">
                      <div className="text-[11px] text-white/40 px-3 py-0.5 font-bold">
                        KNOWN NETWORKS
                      </div>
                      <button className="apple-menu-item" type="button">
                        <span className="flex items-center gap-2">
                          <svg
                            className="w-3.5 h-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path d="M12 19.5a1.5 1.5 0 0 1 0-3" />
                            <path d="M8.5 16a5.8 5.8 0 0 1 7 0" />
                            <path d="M5 12.5a10.8 10.8 0 0 1 14 0" />
                          </svg>
                          Home_5G (Active)
                        </span>
                        <span className="text-[11px] text-[#007aff] font-semibold">Connected</span>
                      </button>
                      <button className="apple-menu-item" type="button">
                        <span className="flex items-center gap-2">
                          <svg
                            className="w-3.5 h-3.5 text-white/60"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path d="M12 19.5a1.5 1.5 0 0 1 0-3" />
                            <path d="M8.5 16a5.8 5.8 0 0 1 7 0" />
                          </svg>
                          Starlink_Ultra
                        </span>
                      </button>
                    </div>
                    <div className="apple-menu-section">
                      <div className="text-[11px] text-white/40 px-3 py-0.5 font-bold">
                        OTHER NETWORKS
                      </div>
                      <button className="apple-menu-item" type="button">
                        <span className="flex items-center gap-2">
                          <svg
                            className="w-3.5 h-3.5 text-white/40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path d="M12 19.5a1.5 1.5 0 0 1 0-3" />
                          </svg>
                          Office_WiFi_Guest
                        </span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="px-3 py-3 text-white/40 text-center text-[12px]">
                    Wi-Fi is Disabled
                  </div>
                )}
                <div className="apple-menu-section">
                  <button
                    className="apple-menu-item font-medium"
                    type="button"
                    onClick={() => handleLaunchApp("settings")}
                  >
                    Wi-Fi Settings...
                  </button>
                </div>
              </div>
            )}

            {/* Bluetooth Dropdown */}
            {type === "bluetooth" && activeMenu === "bluetooth" && (
              <div className="mac-dropdown right-0 w-[260px] text-white" role="menu">
                <div className="apple-menu-section flex items-center justify-between px-3 py-1">
                  <span className="font-semibold">Bluetooth</span>
                  <input
                    type="checkbox"
                    checked={settings.bluetooth}
                    onChange={() => toggleSetting("bluetooth")}
                    className="accent-[#007aff] cursor-pointer w-4 h-4"
                  />
                </div>
                {settings.bluetooth ? (
                  <div className="apple-menu-section">
                    <div className="text-[11px] text-white/40 px-3 py-0.5 font-bold">
                      MY DEVICES
                    </div>
                    <button className="apple-menu-item" type="button">
                      <span className="flex items-center gap-2">⌨️ Magic Keyboard</span>
                      <span className="text-[11px] text-white/40">Connected</span>
                    </button>
                    <button className="apple-menu-item" type="button">
                      <span className="flex items-center gap-2">🎧 AirPods Pro</span>
                      <span className="text-[11px] text-white/40">Connected</span>
                    </button>
                    <button className="apple-menu-item" type="button">
                      <span className="flex items-center gap-2">🖱️ Magic Mouse</span>
                      <span className="text-[11px] text-white/40">Connected</span>
                    </button>
                  </div>
                ) : (
                  <div className="px-3 py-3 text-white/40 text-center text-[12px]">
                    Bluetooth is Disabled
                  </div>
                )}
                <div className="apple-menu-section">
                  <button
                    className="apple-menu-item font-medium"
                    type="button"
                    onClick={() => handleLaunchApp("settings")}
                  >
                    Bluetooth Settings...
                  </button>
                </div>
              </div>
            )}

            {/* User Profile Dropdown */}
            {type === "user" && activeMenu === "user" && (
              <div className="mac-dropdown right-0 w-[230px] text-white" role="menu">
                <div className="apple-menu-section flex items-center gap-3 px-3 py-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-[16px] text-white shadow-md">
                    K
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[13px] text-white/95 leading-tight">
                      Kuldeep Rajput
                    </span>
                    <span className="text-[10px] text-white/50 leading-tight mt-0.5">
                      Developer Account
                    </span>
                  </div>
                </div>
                <div className="apple-menu-section">
                  <button
                    className="apple-menu-item"
                    type="button"
                    onClick={() => handleLaunchApp("settings")}
                  >
                    Users & Groups Settings...
                  </button>
                </div>
                <div className="apple-menu-section">
                  <button
                    className="apple-menu-item"
                    type="button"
                    onClick={() => {
                      setActiveMenu(null);
                      toggleSetting("focusMode");
                    }}
                  >
                    Enter Focus Mode
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}

        {/* Battery Dropdown */}
        <li
          className={`h-full flex items-center relative cursor-pointer transition-colors ${
            activeMenu === "battery" ? "bg-white/20" : "hover:bg-white/10"
          }`}
          onClick={(e) => toggleMenu("battery", e)}
        >
          <NavbarBatteryMenu battery={battery} />

          {activeMenu === "battery" && (
            <div className="mac-dropdown right-0 w-[240px] text-white" role="menu">
              <div className="apple-menu-section px-3 py-1">
                <span className="font-semibold text-white/90">Battery</span>
              </div>
              <div className="apple-menu-section px-3 py-1 flex flex-col gap-1">
                <div className="flex justify-between items-center text-[12.5px]">
                  <span className="text-white/60">Power Source:</span>
                  <span className="font-medium">
                    {battery.charging ? "Power Adapter" : "Battery"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[12.5px]">
                  <span className="text-white/60">Current Charge:</span>
                  <span className="font-bold text-[#34c759]">{battery.level}%</span>
                </div>
              </div>
              <div className="apple-menu-section">
                <button
                  className="apple-menu-item"
                  type="button"
                  onClick={() => handleLaunchApp("settings")}
                >
                  Battery Settings...
                </button>
              </div>
            </div>
          )}
        </li>
      </ul>

      <NavbarDateTime now={now} />

      {/* Control Center Toggle Dropdown */}
      {activeMenu === "control" && (
        <NavbarControlCenter
          isControlOpen={true}
          settings={settings}
          music={music}
          controlCenterRef={controlCenterRef}
          toggleSetting={toggleSetting}
          updateSlider={updateSlider}
          setMusicState={setMusicState}
          openWindow={openWindow}
        />
      )}

      {/* Spotlight Search Overlay Popup Panel */}
      {activeMenu === "spotlight" && (
        <div
          className="fixed inset-0 bg-black/15 z-[999999] flex justify-center items-start pt-[12dvh] backdrop-blur-[1px]"
          onClick={() => setActiveMenu(null)}
        >
          <div
            className="w-[600px] border border-white/20 rounded-2xl flex flex-col overflow-hidden text-white transition-all shadow-[0_30px_70px_rgba(0,0,0,0.55),_0_0_0_1px_rgba(255,255,255,0.08)_inset]"
            style={{
              background: "rgba(35, 35, 37, 0.72)",
              backdropFilter: "blur(40px) saturate(210%)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3.5 px-4 py-3.5 border-b border-white/10">
              <svg
                className="w-5 h-5 text-white/55 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={spotlightInputRef}
                type="text"
                value={spotlightQuery}
                onChange={(e) => setSpotlightQuery(e.target.value)}
                onKeyDown={handleSpotlightKeyDown}
                placeholder="Spotlight Search"
                className="bg-transparent text-white border-0 outline-none w-full text-[17px] font-light placeholder-white/35"
              />
            </div>

            {/* Results */}
            {filteredApps.length > 0 ? (
              <div className="max-h-[350px] overflow-y-auto p-2 flex flex-col gap-0.5">
                {filteredApps.map((app, idx) => (
                  <div
                    key={app.key}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg cursor-pointer transition-colors ${
                      idx === 0 ? "bg-[#007aff] text-white" : "hover:bg-white/5 text-white"
                    }`}
                    onClick={() => handleLaunchApp(app.key)}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-[20px] shrink-0">{app.icon}</span>
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium text-[14.5px] leading-tight">{app.name}</span>
                        <span
                          className={`text-[11px] truncate leading-tight mt-0.5 ${idx === 0 ? "text-white/70" : "text-white/40"}`}
                        >
                          {app.desc}
                        </span>
                      </div>
                    </div>
                    {idx === 0 && (
                      <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded text-white/90">
                        ↩ Launch
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : spotlightQuery.trim() ? (
              <div className="p-8 text-center text-white/30 text-[13.5px]">No Results Found</div>
            ) : (
              <div className="p-3.5 flex flex-col gap-1 text-[12px] text-white/35">
                <div className="font-semibold uppercase tracking-wider text-[10px] px-2 text-white/25">
                  SUGGESTED APPS
                </div>
                <div className="grid grid-cols-2 gap-1 mt-1">
                  {searchableApps.slice(0, 6).map((app) => (
                    <div
                      key={app.key}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/5 text-white/70 hover:text-white"
                      onClick={() => handleLaunchApp(app.key)}
                    >
                      <span>{app.icon}</span>
                      <span className="font-medium text-[13px]">{app.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarControlCenterSection;
