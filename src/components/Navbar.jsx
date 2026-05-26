import { navIcons, navLinks } from "#constants/index";
import useWindowsStore from "#store/window";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const { openWindow } = useWindowsStore();
  const [isControlOpen, setIsControlOpen] = useState(false);
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
  }, [settings.darkMode]);

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

    if (!("getBattery" in navigator)) return;

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
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsControlOpen(false);
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

  const openControlCenterFromNavbar = (event) => {
    if (controlCenterRef.current?.contains(event.target)) return;
    setIsControlOpen(true);
  };

  return (
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
          className={`control-center gnome-panel ${isControlOpen ? "is-open" : ""}`}
          aria-hidden={!isControlOpen}
        >
          {/* Top Row */}
          <div className="gnome-top-row">
            <div className="gnome-battery">
              <img
                src="/icons/battery-full.svg"
                alt="Battery"
                className="w-4 h-4 invert opacity-90"
              />
              <span>
                {battery.level !== null ? `${battery.level}%` : "37%"}
              </span>
            </div>
            <div className="gnome-actions">
              <button className="gnome-circle-btn">
                <img
                  src="/icons/capture.svg"
                  alt="Capture"
                  className="w-[15px] h-[15px] invert opacity-90"
                />
              </button>
              <button className="gnome-circle-btn">
                <img
                  src="/icons/settings.svg"
                  alt="Settings"
                  className="w-[15px] h-[15px] invert opacity-90"
                />
              </button>
              <button className="gnome-circle-btn">
                <img
                  src="/icons/lock.svg"
                  alt="Lock"
                  className="w-[15px] h-[15px] invert opacity-90"
                />
              </button>
              <button className="gnome-circle-btn">
                <img
                  src="/icons/power.svg"
                  alt="Power"
                  className="w-[15px] h-[15px] invert opacity-90"
                />
              </button>
            </div>
          </div>

          {/* Sliders */}
          <div className="gnome-sliders">
            <div className="gnome-slider-row">
              <img
                src="/icons/sound.svg"
                alt="Sound"
                className="w-4 h-4 invert opacity-90"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={settings.soundLevel}
                onChange={(e) => updateSlider("soundLevel", e.target.value)}
                style={{ "--val": `${settings.soundLevel}%` }}
              />
              <button className="slider-arrow">
                <img
                  src="/icons/chevron-right.svg"
                  alt="More"
                  className="w-4 h-4 invert opacity-90"
                />
              </button>
            </div>
            <div className="gnome-slider-row">
              <img
                src="/icons/brightness.svg"
                alt="Brightness"
                className="w-4 h-4 invert opacity-90"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={settings.brightness}
                onChange={(e) => updateSlider("brightness", e.target.value)}
                style={{
                  marginRight: "24px",
                  "--val": `${settings.brightness}%`,
                }}
              />
            </div>
          </div>

          {/* Grid */}
          <div className="gnome-grid">
            {/* Wi-Fi */}
            <button
              className={`gnome-pill split ${settings.wifi ? "active" : ""}`}
            >
              <div
                className="pill-content"
                onClick={() => toggleSetting("wifi")}
              >
                <img
                  src="/icons/wifi.svg"
                  alt="Wi-Fi"
                  className="w-[18px] invert"
                />
                <div className="pill-text">
                  <span className="title">Wi-Fi</span>
                  <span className="subtitle">
                    {settings.wifi ? "Randome......" : "Off"}
                  </span>
                </div>
              </div>
              <div className="pill-arrow">
                <img
                  src="/icons/chevron-right.svg"
                  alt="More"
                  className="w-4 h-4 invert opacity-80"
                />
              </div>
            </button>

            {/* Bluetooth */}
            <button
              className={`gnome-pill split ${settings.bluetooth ? "active" : ""}`}
            >
              <div
                className="pill-content"
                onClick={() => toggleSetting("bluetooth")}
              >
                <img
                  src="/icons/bluetooth.svg"
                  alt="Bluetooth"
                  className="w-[18px] invert opacity-90"
                />
                <div className="pill-text">
                  <span className="title">Bluetooth</span>
                </div>
              </div>
              <div className="pill-arrow">
                <img
                  src="/icons/chevron-right.svg"
                  alt="More"
                  className="w-4 h-4 invert opacity-80"
                />
              </div>
            </button>

            {/* Power Mode */}
            <button
              className="gnome-pill split"
              onClick={() =>
                setSettings((s) => ({
                  ...s,
                  powerMode:
                    s.powerMode === "Balanced" ? "Power Saver" : "Balanced",
                }))
              }
            >
              <div className="pill-content">
                <img
                  src="/icons/power-mode.svg"
                  alt="Power Mode"
                  className="w-[18px] invert opacity-90"
                />
                <div className="pill-text">
                  <span className="title">Power Mode</span>
                  <span className="subtitle">
                    {settings.powerMode || "Balanced"}
                  </span>
                </div>
              </div>
              <div className="pill-arrow">
                <img
                  src="/icons/chevron-right.svg"
                  alt="More"
                  className="w-4 h-4 invert opacity-80"
                />
              </div>
            </button>

            {/* Night Light */}
            <button
              className={`gnome-pill ${settings.nightLight ? "active" : ""}`}
              onClick={() => toggleSetting("nightLight")}
            >
              <div className="pill-content">
                <img
                  src="/icons/night-light.svg"
                  alt="Night Light"
                  className="w-[18px] invert opacity-90"
                />
                <div className="pill-text">
                  <span className="title">Night Light</span>
                </div>
              </div>
            </button>

            {/* Dark Style */}
            <button
              className={`gnome-pill ${settings.darkMode ? "active" : ""}`}
              onClick={() => toggleSetting("darkMode")}
            >
              <div className="pill-content">
                <img
                  src="/icons/dark-style.svg"
                  alt="Dark Style"
                  className="w-[18px] invert opacity-90"
                />
                <div className="pill-text">
                  <span className="title">Dark Style</span>
                </div>
              </div>
            </button>

            {/* Airplane Mode */}
            <button
              className={`gnome-pill ${settings.airplaneMode ? "active" : ""}`}
              onClick={() => toggleSetting("airplaneMode")}
            >
              <div className="pill-content">
                <img
                  src="/icons/airplane-mode.svg"
                  alt="Airplane Mode"
                  className="w-[18px] invert opacity-90"
                />
                <div className="pill-text">
                  <span className="title">Airplane Mode</span>
                </div>
              </div>
            </button>
          </div>
        </aside>
      </div>
    </nav>
  );
};

export default Navbar;
