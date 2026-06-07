import useWindowsStore from "@store/window";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import useTimeStore from "@store/time";

const useNavbar = () => {
  const {
    windows,
    openWindow,
    music,
    setMusicState,
    systemSettings: settings,
    toggleSystemSetting,
    updateSystemSetting,
  } = useWindowsStore();
  const [isControlOpen, setIsControlOpen] = useState(false);
  const [isAppleMenuOpen, setIsAppleMenuOpen] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [isPowerMenuOpen, setIsPowerMenuOpen] = useState(false);
  const [isAsleep, setIsAsleep] = useState(false);
  const time = useTimeStore((state) => state.time);
  const now = dayjs(time);
  const appleMenuRef = useRef(null);
  const controlCenterRef = useRef(null);

  const [battery, setBattery] = useState({
    level: null,
    charging: false,
    supported: false,
  });

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

  const activeAppKey = getActiveApp();

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
    updateSystemSetting("soundLevel", currentVolume);
    document.documentElement.style.setProperty("--system-volume", currentVolume);
  }, [music.volume, music.isMuted, updateSystemSetting]);

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
      if (isAppleMenuOpen && appleMenuRef.current && !appleMenuRef.current.contains(event.target)) {
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
  }, [isControlOpen, isAppleMenuOpen]);

  const toggleSetting = (key) => {
    toggleSystemSetting(key);
  };

  const updateSlider = (key, value) => {
    updateSystemSetting(key, Number(value));
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

  return {
    windows,
    now,
    settings,
    battery,
    music,
    isControlOpen,
    isAppleMenuOpen,
    isShuttingDown,
    isAsleep,
    isPowerMenuOpen,
    activeAppKey,
    appleMenuRef,
    controlCenterRef,
    setIsControlOpen,
    setIsAppleMenuOpen,
    setIsShuttingDown,
    setIsAsleep,
    setIsPowerMenuOpen,
    openWindow,
    setMusicState,
    toggleSetting,
    updateSlider,
    takeScreenshot,
    openControlCenterFromNavbar,
  };
};

export default useNavbar;
