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
    <nav>
      <div>
        <img src="/icons/logo.svg" alt="logo" />

        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative" onClick={openControlCenterFromNavbar}>
        <ul>
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
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.5 2 7 13h4l-1.5 9L17 11h-4l1.5-9Z" />
                </svg>
              )}
            </div>
          </li>
        </ul>
        <time>{now.format("ddd MMM D h:mm A")}</time>

        <aside
          ref={controlCenterRef}
          className={`control-center ${isControlOpen ? "is-open" : ""}`}
          aria-hidden={!isControlOpen}
        >
          <header>
            <div className="datetime">
              <p>{now.format("h:mm A")}</p>
              <span>{now.format("dddd, MMMM D")}</span>
            </div>
            <div className="identity">
              <img src="/icons/logo.svg" alt="Kunal" />
              <div>
                <p>Kunal</p>
                <span className="-ml-3.5">Available</span>
              </div>
            </div>
          </header>

          <section className="toggle-grid">
            <button
              type="button"
              className={`setting-tile ${settings.darkMode ? "active" : ""}`}
              onClick={() => toggleSetting("darkMode")}
            >
              <div className="tile-head">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3.25A8.75 8.75 0 1 0 20.75 12 6.9 6.9 0 0 1 12 3.25Z" />
                </svg>
                <span>Dark Mode</span>
              </div>
              <p>{settings.darkMode ? "Enabled" : "Disabled"}</p>
            </button>

            <button
              type="button"
              className={`setting-tile ${settings.wifi ? "active" : ""}`}
              onClick={() => toggleSetting("wifi")}
            >
              <div className="tile-head">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 18.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5Z" />
                  <path d="M4.2 12.35a1 1 0 0 1-.15-1.4 10.5 10.5 0 0 1 15.9 0 1 1 0 1 1-1.55 1.27 8.5 8.5 0 0 0-12.8 0 1 1 0 0 1-1.4.13Z" />
                  <path d="M7.5 15.05a1 1 0 0 1-.15-1.4 6.5 6.5 0 0 1 9.3 0 1 1 0 1 1-1.5 1.32 4.5 4.5 0 0 0-6.3 0 1 1 0 0 1-1.35.08Z" />
                </svg>
                <span>Wi-Fi</span>
              </div>
              <p>{settings.wifi ? "Connected" : "Offline"}</p>
            </button>

            <button
              type="button"
              className={`setting-tile ${settings.volume ? "active" : ""}`}
              onClick={() => toggleSetting("volume")}
            >
              <div className="tile-head">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M10.2 6.2 6.7 9.1H4a1 1 0 0 0-1 1v3.8a1 1 0 0 0 1 1h2.7l3.5 2.9a1 1 0 0 0 1.6-.77V7a1 1 0 0 0-1.6-.8Z" />
                  <path d="M15.2 9.2a1 1 0 0 1 1.4.14 4.4 4.4 0 0 1 0 5.32 1 1 0 1 1-1.56-1.26 2.4 2.4 0 0 0 0-2.8 1 1 0 0 1 .2-1.4Z" />
                  <path d="M17.9 6.85a1 1 0 0 1 1.4.15 8.4 8.4 0 0 1 0 10 1 1 0 0 1-1.56-1.26 6.4 6.4 0 0 0 0-7.5 1 1 0 0 1 .16-1.4Z" />
                </svg>
                <span>Volume</span>
              </div>
              <p>{settings.volume ? "Enabled" : "Muted"}</p>
            </button>

            <button
              type="button"
              className={`setting-tile ${settings.focusMode ? "active" : ""}`}
              onClick={() => toggleSetting("focusMode")}
            >
              <div className="tile-head">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 12 2.5Zm0 4.25a1 1 0 0 1 1 1V11h3.25a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1V7.75a1 1 0 0 1 1-1Z" />
                </svg>
                <span>Focus</span>
              </div>
              <p>{settings.focusMode ? "On" : "Off"}</p>
            </button>
          </section>

          <section className="slider-stack">
            <label htmlFor="ui-effects">
              <div>
                <p>Brightness</p>
                <span>{settings.brightness}%</span>
              </div>
              <input
                id="ui-effects"
                type="range"
                min="0"
                max="100"
                value={settings.brightness}
                onChange={(event) =>
                  updateSlider("brightness", event.target.value)
                }
              />
            </label>

            <label htmlFor="sound-level">
              <div>
                <p>Sound Level</p>
                <span>{settings.soundLevel}%</span>
              </div>
              <input
                id="sound-level"
                type="range"
                min="0"
                max="100"
                value={settings.soundLevel}
                onChange={(event) =>
                  updateSlider("soundLevel", event.target.value)
                }
              />
            </label>
          </section>
        </aside>
      </div>
    </nav>
  );
};

export default Navbar;
