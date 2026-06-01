import { navIcons } from "@constants/index";
import NavbarBatteryMenu from "../components/NavbarBatteryMenu";
import NavbarDateTime from "../components/NavbarDateTime";
import NavbarControlCenter from "../components/NavbarControlCenter";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useWindowsStore from "@store/window";

const CalendarIcon = ({ sizeClass = "w-[26px] h-[26px] rounded-[5px]" }) => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const today = new Date();
  return (
    <div
      className={`${sizeClass} bg-white border border-black/10 shadow-sm overflow-hidden flex flex-col items-center select-none aspect-square shrink-0`}
    >
      <div className="w-full bg-[#ff3b30] text-white text-[5px] font-extrabold py-0.5 text-center leading-none tracking-wider uppercase">
        {days[today.getDay()]}
      </div>
      <div className="flex-1 flex items-center justify-center text-gray-800 font-bold text-[12px] leading-none font-sans -mt-0.5">
        {today.getDate()}
      </div>
    </div>
  );
};

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
  const { updateSystemSetting } = useWindowsStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const [activeMenu, setActiveMenu] = useState(null); // 'wifi' | 'bluetooth' | 'user' | 'battery' | 'spotlight' | 'control' | null
  const [spotlightQuery, setSpotlightQuery] = useState("");
  const [connectingDevice, setConnectingDevice] = useState(null);
  const [connectingWifi, setConnectingWifi] = useState(null);
  const [promptingWifiNetwork, setPromptingWifiNetwork] = useState(null);
  const [wifiPasswordInput, setWifiPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const wifiNetworksList = [
    { name: "Home Network", locked: true, strength: "strong" },
    { name: "Coffee Shop 5G", locked: true, strength: "medium" },
    { name: "iPhone (Kuldeep)", locked: true, strength: "strong" },
    { name: "Airport Free WiFi", locked: false, strength: "weak" },
  ];

  const handleWifiNetworkClick = (net) => {
    if (settings.activeWifiNetwork === net.name) {
      updateSystemSetting("activeWifiNetwork", "");
    } else {
      if (connectingWifi) return;
      if (net.locked) {
        setPromptingWifiNetwork(net);
        setWifiPasswordInput("");
      } else {
        setConnectingWifi(net.name);
        setTimeout(() => {
          updateSystemSetting("activeWifiNetwork", net.name);
          setConnectingWifi(null);
        }, 1200);
      }
    }
  };

  const handleWifiPasswordSubmit = (e) => {
    e.preventDefault();
    if (!promptingWifiNetwork) return;
    const targetName = promptingWifiNetwork.name;
    setPromptingWifiNetwork(null);
    setConnectingWifi(targetName);
    setTimeout(() => {
      updateSystemSetting("activeWifiNetwork", targetName);
      setConnectingWifi(null);
    }, 1200);
  };

  const bluetoothDevicesList = [
    { key: "keyboard", name: "Magic Keyboard", icon: "⌨️" },
    { key: "airpods", name: "AirPods Pro", icon: "🎧" },
    { key: "mouse", name: "Magic Mouse", icon: "🖱️" },
    { key: "headphones", name: "Sony WH", icon: "🎧" },
  ];

  const handleBluetoothDeviceClick = (device) => {
    const isConnected = settings.bluetoothDevices?.[device.key] ?? false;
    if (isConnected) {
      const updated = { ...settings.bluetoothDevices, [device.key]: false };
      updateSystemSetting("bluetoothDevices", updated);
    } else {
      if (connectingDevice) return;
      setConnectingDevice(device.key);
      setTimeout(() => {
        const updated = { ...settings.bluetoothDevices, [device.key]: true };
        updateSystemSetting("bluetoothDevices", updated);
        setConnectingDevice(null);
      }, 1200);
    }
  };
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
    {
      name: "Finder",
      key: "finder",
      image: "finder.png",
      icon: "📁",
      desc: "System File Explorer",
    },
    {
      name: "Projects",
      key: "finder",
      image: "folder.png",
      icon: "💻",
      desc: "View Portfolio Projects",
    },
    {
      name: "VS Code",
      key: "vscode",
      image: "vscode.png",
      icon: "📝",
      desc: "Visual Studio Code Workspace",
    },
    {
      name: "Safari Browser",
      key: "safari",
      image: "safari.png",
      icon: "🌐",
      desc: "Apple Safari Web Browser",
    },
    {
      name: "Chrome",
      key: "chrome",
      image: "chromee.png",
      icon: "🌐",
      desc: "Google Chrome Browser",
    },
    {
      name: "Calculator",
      key: "calculator",
      image: "calculator.png",
      icon: "🧮",
      desc: "System Calculator App",
    },
    {
      name: "Terminal",
      key: "terminal",
      image: "terminal.png",
      icon: "💻",
      desc: "Command Line Shell",
    },
    { name: "Music", key: "music", image: "music.png", icon: "🎵", desc: "Apple Music Streamer" },
    {
      name: "System Settings",
      key: "settings",
      image: "settings.png",
      icon: "⚙️",
      desc: "Portfolio System Configuration",
    },
    {
      name: "Contact Form",
      key: "contact",
      image: "contact.png",
      icon: "✉️",
      desc: "Get In Touch",
    },
    {
      name: "Gallery",
      key: "photos",
      image: "photos.png",
      icon: "🖼️",
      desc: "Photo & Media Album",
    },
    {
      name: "Calendar",
      key: "calendar",
      image: "calendar.png",
      icon: "📅",
      desc: "Calendar & Schedule Planner",
    },
    {
      name: "App Store",
      key: "appstore",
      image: "appstore.png",
      icon: "🛍️",
      desc: "Search & Install Applications",
    },
    {
      name: "Postman",
      key: "postman",
      image: "postman.png",
      icon: "🚀",
      desc: "API Development & Testing Workspace",
    },
    {
      name: "Telegram",
      key: "telegram",
      image: "telegram.png",
      icon: "💬",
      desc: "Cloud Messaging & Chat",
    },
    { name: "Maps", key: "map", image: "map.png", icon: "🗺️", desc: "World Maps & Navigation" },
    {
      name: "Font Book",
      key: "font",
      image: "font.png",
      icon: "🔤",
      desc: "System Fonts Catalogue",
    },
    {
      name: "Weather Forecast",
      key: "weather",
      image: "weather.png",
      icon: "☀️",
      desc: "Local Weather Report",
    },
    {
      name: "Notes Pad",
      key: "notes",
      image: "notes.png",
      icon: "📝",
      desc: "Quick Notes Manager",
    },
  ];

  const filteredApps = spotlightQuery.trim()
    ? searchableApps.filter(
        (app) =>
          app.name.toLowerCase().includes(spotlightQuery.toLowerCase()) ||
          app.desc.toLowerCase().includes(spotlightQuery.toLowerCase()),
      )
    : [];

  const handleLaunchApp = (appKey, data = null) => {
    setActiveMenu(null);
    openWindow(appKey, data);
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
              <div
                className="mac-dropdown left-auto right-0 w-[260px] text-white"
                role="menu"
                onClick={(e) => e.stopPropagation()}
              >
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
                        AVAILABLE NETWORKS
                      </div>
                      {wifiNetworksList.map((net) => {
                        const isConnected = settings.activeWifiNetwork === net.name;
                        const isConnecting = connectingWifi === net.name;
                        return (
                          <button
                            key={net.name}
                            className="apple-menu-item flex items-center justify-between w-full group"
                            type="button"
                            onClick={() => handleWifiNetworkClick(net)}
                          >
                            <span className="flex items-center gap-2">
                              <svg
                                className={`w-3.5 h-3.5 ${isConnected ? "text-white opacity-100" : "text-white/60 group-hover:text-white"}`}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path d="M12 19.5a1.5 1.5 0 0 1 0-3" />
                                <path d="M8.5 16a5.8 5.8 0 0 1 7 0" />
                                <path d="M5 12.5a10.8 10.8 0 0 1 14 0" />
                              </svg>
                              <span className={`text-white ${isConnected ? "font-semibold" : ""}`}>
                                {net.name}
                              </span>
                            </span>
                            <span className="text-[11px] text-white/40 flex items-center justify-end gap-2.5 min-w-[20px] group-hover:text-white">
                              {net.locked && (
                                <svg
                                  className="w-3 h-3 opacity-60 group-hover:text-white group-hover:opacity-100 transition-opacity"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                >
                                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                              )}
                              {isConnecting ? (
                                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                              ) : isConnected ? (
                                <span className="text-white/60 group-hover:text-white font-semibold">
                                  Connected
                                </span>
                              ) : (
                                ""
                              )}
                            </span>
                          </button>
                        );
                      })}
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
                    onClick={() => handleLaunchApp("settings", { tab: "Wi-Fi" })}
                  >
                    Wi-Fi Settings...
                  </button>
                </div>
              </div>
            )}

            {/* Bluetooth Dropdown */}
            {type === "bluetooth" && activeMenu === "bluetooth" && (
              <div
                className="mac-dropdown left-auto right-0 w-[260px] text-white"
                role="menu"
                onClick={(e) => e.stopPropagation()}
              >
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
                    {bluetoothDevicesList.map((device) => {
                      const isConnected = settings.bluetoothDevices?.[device.key] ?? false;
                      const isConnecting = connectingDevice === device.key;
                      return (
                        <button
                          key={device.key}
                          className="apple-menu-item flex items-center justify-between w-full"
                          type="button"
                          onClick={() => handleBluetoothDeviceClick(device)}
                        >
                          <span className="flex items-center gap-2">
                            <span>{device.icon}</span>
                            <span>{device.name}</span>
                          </span>
                          <span className="text-[11px] text-white/40 flex items-center justify-end min-w-[20px]">
                            {isConnecting ? (
                              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : isConnected ? (
                              "Connected"
                            ) : (
                              "Not Connected"
                            )}
                          </span>
                        </button>
                      );
                    })}
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
                    onClick={() => handleLaunchApp("settings", { tab: "Bluetooth" })}
                  >
                    Bluetooth Settings...
                  </button>
                </div>
              </div>
            )}

            {/* User Profile Dropdown */}
            {type === "user" && activeMenu === "user" && (
              <div className="mac-dropdown left-auto right-0 w-[230px] text-white" role="menu">
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
            <div className="mac-dropdown left-auto right-0 w-[240px] text-white" role="menu">
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
          className="fixed inset-0 bg-transparent z-[999999] flex justify-center items-start pt-[12dvh]"
          onClick={() => setActiveMenu(null)}
        >
          <div
            className="w-[600px] border border-white/20 rounded-2xl flex flex-col overflow-hidden text-white transition-all shadow-[0_30px_70px_rgba(0,0,0,0.55),_0_0_0_1px_rgba(255,255,255,0.08)_inset]"
            style={{
              background: "rgba(30, 30, 30, 0.55)",
              backdropFilter: "blur(40px) saturate(210%)",
              WebkitBackdropFilter: "blur(40px) saturate(210%)",
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
                    key={app.name}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg cursor-pointer transition-colors ${
                      idx === 0 ? "bg-[#007aff] text-white" : "hover:bg-white/5 text-white"
                    }`}
                    onClick={() => handleLaunchApp(app.key)}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {app.key === "calendar" ? (
                        <CalendarIcon sizeClass="w-[28px] h-[28px] rounded-[6px]" />
                      ) : app.image ? (
                        <img
                          src={`/images/${app.image}`}
                          className={`w-[28px] h-[28px] object-contain shrink-0 ${app.key === "font" ? "scale-[3]" : ""}`}
                          alt={app.name}
                        />
                      ) : (
                        <span className="text-[20px] shrink-0">{app.icon}</span>
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-[14.5px] leading-tight text-white">
                          {app.name}
                        </span>
                        <span
                          className={`text-[11px] truncate leading-tight mt-0.5 ${idx === 0 ? "text-white/80" : "text-white/50"}`}
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
              <div className="p-3.5 flex flex-col gap-1.5 text-[12px] text-white/35">
                <div className="font-semibold uppercase tracking-wider text-[10px] px-2 text-white/30">
                  SUGGESTED APPS
                </div>
                <div className="grid grid-cols-2 gap-1.5 mt-1">
                  {searchableApps.slice(0, 6).map((app) => (
                    <div
                      key={app.name}
                      className="flex items-center gap-3.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/10 text-white transition-colors group"
                      onClick={() => handleLaunchApp(app.key)}
                    >
                      {app.key === "calendar" ? (
                        <CalendarIcon sizeClass="w-[26px] h-[26px] rounded-[5px]" />
                      ) : app.image ? (
                        <img
                          src={`/images/${app.image}`}
                          className={`w-[26px] h-[26px] object-contain shrink-0 ${app.key === "font" ? "scale-[3]" : ""}`}
                          alt={app.name}
                        />
                      ) : (
                        <span className="text-[18px] shrink-0">{app.icon}</span>
                      )}
                      <span className="font-semibold text-[13.5px] text-white/90 group-hover:text-white transition-colors">
                        {app.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Wi-Fi Password Prompt overlay */}
      {mounted &&
        promptingWifiNetwork &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/45 backdrop-blur-[1.5px] z-[999999] flex items-center justify-center p-4"
            onClick={() => setPromptingWifiNetwork(null)}
          >
            <div
              className="rounded-xl p-5 w-[440px] max-w-full select-none animate-in zoom-in-95 duration-200 text-white"
              style={{
                background: "rgba(30, 30, 30, 0.55)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow:
                  "0 12px 30px rgba(0, 0, 0, 0.35), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
                backdropFilter: "blur(40px) saturate(210%)",
                WebkitBackdropFilter: "blur(40px) saturate(210%)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex gap-5 items-start text-left">
                {/* Left Column: Premium Vector Wi-Fi Icon */}
                <svg
                  className="w-14 h-14 text-white opacity-95 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 19.5a1.5 1.5 0 0 1 0-3" />
                  <path d="M8.5 16a5.8 5.8 0 0 1 7 0" />
                  <path d="M5 12.5a10.8 10.8 0 0 1 14 0" />
                  <path d="M1.5 9a15.8 15.8 0 0 1 21 0" />
                </svg>

                {/* Right Column: Title, Subtitle, and Form */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-[14px] font-bold text-white leading-tight">
                    Enter the password for &ldquo;{promptingWifiNetwork.name}&rdquo;.
                  </h4>
                  <p className="text-[11.5px] text-white/60 mt-1 font-normal leading-normal">
                    This network requires a WPA2 password.
                  </p>

                  <form onSubmit={handleWifiPasswordSubmit} className="mt-4 space-y-3">
                    {/* Side-by-Side Label and Input */}
                    <div className="flex items-center gap-3">
                      <span className="text-[12px] text-white/70 w-16 text-right shrink-0">
                        Password:
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder=""
                        required
                        value={wifiPasswordInput}
                        onChange={(e) => setWifiPasswordInput(e.target.value)}
                        className="flex-1 bg-[#252526] border border-white/10 rounded px-2.5 py-1 text-[13px] text-white focus:outline-none focus:border-[#007aff] focus:ring-1 focus:ring-[#007aff]/50 font-normal transition-all"
                        autoFocus
                      />
                    </div>

                    {/* Checkboxes stacked */}
                    <div className="pl-[76px] flex flex-col gap-2 text-[11px] text-white/70">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={showPassword}
                          onChange={() => setShowPassword(!showPassword)}
                          className="accent-[#007aff] rounded w-3.5 h-3.5 bg-white/10 border-white/20 cursor-pointer"
                        />
                        Show password
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="accent-[#007aff] rounded w-3.5 h-3.5 bg-white/10 border-white/20 cursor-pointer"
                        />
                        Remember this network
                      </label>
                    </div>

                    {/* Join / Cancel buttons */}
                    <div className="flex gap-2.5 justify-end mt-4 text-[12px] pt-1">
                      <button
                        type="button"
                        onClick={() => setPromptingWifiNetwork(null)}
                        className="px-4 py-1 rounded bg-[#2c2c2e] hover:bg-[#3a3a3c] border border-white/5 text-white font-medium transition-colors cursor-default shadow-sm min-w-[76px] text-center"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-1 rounded bg-[#007aff] hover:bg-[#1a85ff] text-white font-medium transition-colors cursor-default shadow-sm min-w-[76px] text-center"
                      >
                        Join
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default NavbarControlCenterSection;
