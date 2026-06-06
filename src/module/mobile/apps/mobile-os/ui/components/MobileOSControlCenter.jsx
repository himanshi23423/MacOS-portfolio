import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import useWindowsStore from "@store/window";
import {
  X,
  Wifi,
  Bluetooth,
  Flashlight,
  Sun,
  Moon,
  Battery,
  Calculator,
  Camera,
  Search,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Tv,
} from "lucide-react";

const MobileOSControlCenter = ({
  isControlOpen,
  setIsControlOpen,
  settings,
  now,
  toggle,
  brightness,
  setBrightness,
  volume,
  setVolume,
  controlCenterRef,
}) => {
  const { systemSettings, updateSystemSetting, music, setMusicState } = useWindowsStore();
  const isLowPowerActive = systemSettings.lowPowerMode === "Always";
  const isPlaying = music.isPlaying;
  const brightnessSliderRef = useRef(null);
  const volumeSliderRef = useRef(null);

  const handleControlCenterNext = (e) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent("macos-portfolio-next-track"));
  };

  const handleControlCenterPrev = (e) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent("macos-portfolio-prev-track"));
  };

  const handleControlCenterPlayPause = (e) => {
    e.stopPropagation();
    setMusicState({ isPlaying: !music.isPlaying });
  };

  useEffect(() => {
    if (!controlCenterRef.current) return;
    if (isControlOpen) {
      gsap.fromTo(
        controlCenterRef.current,
        { y: "-100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.42, ease: "power3.out" },
      );
    } else {
      gsap.to(controlCenterRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [isControlOpen, controlCenterRef]);

  useEffect(() => {
    if (!isControlOpen) return;
    const handleOutside = (e) => {
      if (controlCenterRef.current && !controlCenterRef.current.contains(e.target)) {
        setIsControlOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [isControlOpen, setIsControlOpen, controlCenterRef]);

  const handleVerticalSlider = (e, ref, setValue) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const updateValue = (clientY) => {
      const height = rect.height;
      const relativeY = rect.bottom - clientY;
      const percentage = Math.max(0, Math.min(100, Math.round((relativeY / height) * 100)));
      setValue(percentage);
    };

    updateValue(e.clientY || (e.touches && e.touches[0].clientY));

    const handlePointerMove = (moveEvent) => {
      const clientY = moveEvent.clientY || (moveEvent.touches && moveEvent.touches[0].clientY);
      updateValue(clientY);
    };

    const handlePointerUp = () => {
      document.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseup", handlePointerUp);
      document.removeEventListener("touchmove", handlePointerMove);
      document.removeEventListener("touchend", handlePointerUp);
    };

    document.addEventListener("mousemove", handlePointerMove);
    document.addEventListener("mouseup", handlePointerUp);
    document.addEventListener("touchmove", handlePointerMove, { passive: false });
    document.addEventListener("touchend", handlePointerUp);
  };

  return (
    <aside
      ref={controlCenterRef}
      className="absolute top-0 left-0 w-full z-[75] overflow-hidden -translate-y-full opacity-0"
    >
      <div className="bg-[rgba(20,20,22,0.92)] backdrop-blur-[55px] backdrop-saturate-[2.1] min-h-dvh pt-[55px] pb-10 px-5 flex flex-col gap-5 select-none">
        {/* Header Area with Date / Close */}
        <div className="flex items-center justify-between mt-2 mb-1">
          <div>
            <p className="text-[12px] font-medium text-white/50 tracking-wide uppercase">
              {now.format("dddd, MMMM D")}
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-white mt-0.5">
              Control Center
            </h2>
          </div>
          <button
            onClick={() => setIsControlOpen(false)}
            className="flex items-center justify-center w-[34px] h-[34px] rounded-full bg-white/10 hover:bg-white/15 transition-colors active:scale-95"
          >
            <X size={16} strokeWidth={2.5} className="text-white" />
          </button>
        </div>

        {/* 2x2 Widgets Container */}
        <div className="grid grid-cols-2 gap-4">
          {/* Connectivity Widget (2x2 Grid inside a single Card) */}
          <div className="bg-white/[0.08] border border-white/[0.05] rounded-[24px] p-4 grid grid-cols-2 gap-3 aspect-square items-center justify-center">
            {/* Airplane Mode Toggle */}
            <button
              onClick={() => toggle("airplane")}
              className="flex flex-col items-center justify-center w-full aspect-square rounded-full transition-all duration-300 active:scale-90"
              style={{
                background: settings.airplane ? "#ff9500" : "rgba(255,255,255,0.08)",
              }}
            >
              <span className="text-xl leading-none">✈︎</span>
            </button>

            {/* Wi-Fi Toggle */}
            <button
              onClick={() => toggle("wifi")}
              className="flex flex-col items-center justify-center w-full aspect-square rounded-full transition-all duration-300 active:scale-90"
              style={{
                background: settings.wifi ? "#007aff" : "rgba(255,255,255,0.08)",
              }}
            >
              <Wifi size={20} className={settings.wifi ? "text-white" : "text-white/80"} />
            </button>

            {/* Bluetooth Toggle */}
            <button
              onClick={() => toggle("bluetooth")}
              className="flex flex-col items-center justify-center w-full aspect-square rounded-full transition-all duration-300 active:scale-90"
              style={{
                background: settings.bluetooth ? "#007aff" : "rgba(255,255,255,0.08)",
              }}
            >
              <Bluetooth
                size={20}
                className={settings.bluetooth ? "text-white" : "text-white/80"}
              />
            </button>

            {/* Flashlight/Torch Toggle */}
            <button
              onClick={() => toggle("flashlight")}
              className="flex flex-col items-center justify-center w-full aspect-square rounded-full transition-all duration-300 active:scale-90"
              style={{
                background: settings.flashlight ? "#007aff" : "rgba(255,255,255,0.08)",
              }}
            >
              <Flashlight
                size={20}
                className={settings.flashlight ? "text-white" : "text-white/80"}
              />
            </button>
          </div>

          {/* Music / Now Playing Widget */}
          <div className="bg-white/[0.08] border border-white/[0.05] rounded-[24px] p-4 flex flex-col justify-between aspect-square">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-tr ${music.activeTrack?.coverColor || "from-pink-500 via-purple-600 to-indigo-500"} flex items-center justify-center shadow-md ${isPlaying ? "animate-pulse" : ""}`}
              >
                {music.activeTrack?.coverUrl ? (
                  <img
                    src={music.activeTrack.coverUrl}
                    alt="art"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-white text-base font-bold">
                    {music.activeTrack?.coverText || "🎵"}
                  </span>
                )}
              </div>
              <div className="overflow-hidden flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-white truncate leading-snug">
                  {music.activeTrack?.title || "Not Playing"}
                </p>
                <p className="text-[10px] text-white/50 truncate">
                  {music.activeTrack?.artist || "Select a Song"}
                </p>
              </div>
            </div>

            {/* Waveform / Static Visualizer indicator */}
            <div className="flex items-end justify-center gap-0.5 h-6 my-2">
              <span
                className={`w-0.5 bg-pink-500 rounded-full transition-all duration-300 ${isPlaying ? "h-4 animate-[bounce_0.8s_infinite_100ms]" : "h-1"}`}
              />
              <span
                className={`w-0.5 bg-pink-500 rounded-full transition-all duration-300 ${isPlaying ? "h-6 animate-[bounce_0.8s_infinite_300ms]" : "h-1.5"}`}
              />
              <span
                className={`w-0.5 bg-pink-500 rounded-full transition-all duration-300 ${isPlaying ? "h-3 animate-[bounce_0.8s_infinite_200ms]" : "h-1"}`}
              />
              <span
                className={`w-0.5 bg-pink-500 rounded-full transition-all duration-300 ${isPlaying ? "h-5 animate-[bounce_0.8s_infinite_400ms]" : "h-2"}`}
              />
              <span
                className={`w-0.5 bg-pink-500 rounded-full transition-all duration-300 ${isPlaying ? "h-2 animate-[bounce_0.8s_infinite_150ms]" : "h-1"}`}
              />
            </div>

            {/* Media Controls */}
            <div className="flex items-center justify-around">
              <button
                onClick={handleControlCenterPrev}
                className="text-white/60 hover:text-white active:scale-90 transition-transform"
              >
                <SkipBack size={18} fill="currentColor" />
              </button>
              <button
                onClick={handleControlCenterPlayPause}
                className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center active:scale-90 transition-transform shadow"
              >
                {isPlaying ? (
                  <Pause size={14} fill="currentColor" />
                ) : (
                  <Play size={14} fill="currentColor" className="ml-0.5" />
                )}
              </button>
              <button
                onClick={handleControlCenterNext}
                className="text-white/60 hover:text-white active:scale-90 transition-transform"
              >
                <SkipForward size={18} fill="currentColor" />
              </button>
            </div>
          </div>
        </div>

        {/* Sliders & Secondary Toggles */}
        <div className="grid grid-cols-2 gap-4">
          {/* Vertical Capsule Sliders Side-by-Side */}
          <div className="grid grid-cols-2 gap-4 bg-white/[0.08] border border-white/[0.05] rounded-[24px] p-4 h-[180px]">
            {/* Brightness Slider */}
            <div className="flex flex-col items-center justify-between h-full">
              <div
                ref={brightnessSliderRef}
                onMouseDown={(e) => handleVerticalSlider(e, brightnessSliderRef, setBrightness)}
                onTouchStart={(e) => handleVerticalSlider(e, brightnessSliderRef, setBrightness)}
                className="relative w-full h-[120px] bg-white/[0.08] rounded-2xl overflow-hidden cursor-pointer select-none"
              >
                <div
                  className="absolute bottom-0 left-0 w-full bg-white/30 transition-all duration-75"
                  style={{ height: `${brightness}%` }}
                />
                <div className="absolute inset-0 flex flex-col justify-end items-center pb-2.5 pointer-events-none">
                  <Sun size={18} className="text-white" />
                </div>
              </div>
              <span className="text-[10px] font-medium text-white/65 mt-1">{brightness}%</span>
            </div>

            {/* Volume Slider */}
            <div className="flex flex-col items-center justify-between h-full">
              <div
                ref={volumeSliderRef}
                onMouseDown={(e) => handleVerticalSlider(e, volumeSliderRef, setVolume)}
                onTouchStart={(e) => handleVerticalSlider(e, volumeSliderRef, setVolume)}
                className="relative w-full h-[120px] bg-white/[0.08] rounded-2xl overflow-hidden cursor-pointer select-none"
              >
                <div
                  className="absolute bottom-0 left-0 w-full bg-white/30 transition-all duration-75"
                  style={{ height: `${volume}%` }}
                />
                <div className="absolute inset-0 flex flex-col justify-end items-center pb-2.5 pointer-events-none">
                  <Volume2 size={18} className="text-white" />
                </div>
              </div>
              <span className="text-[10px] font-medium text-white/65 mt-1">{volume}%</span>
            </div>
          </div>

          {/* Quick Settings: Screen Mirroring, Dark Mode, Low Power */}
          <div className="grid grid-rows-2 gap-3 h-[180px]">
            {/* Dark Mode & Screen Mirroring Row */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => toggle("darkMode")}
                className="flex flex-col items-center justify-center rounded-[20px] transition-all border border-white/[0.05]"
                style={{
                  background: settings.darkMode
                    ? "rgba(255,255,255,0.18)"
                    : "rgba(255,255,255,0.08)",
                }}
              >
                <Moon
                  size={18}
                  className={settings.darkMode ? "text-[#30d158]" : "text-white/80"}
                />
                <span className="text-[9px] text-white/50 mt-1 font-medium">Dark Mode</span>
              </button>

              <button className="flex flex-col items-center justify-center rounded-[20px] bg-white/[0.08] border border-white/[0.05] transition-all active:scale-95">
                <Tv size={18} className="text-white/80" />
                <span className="text-[9px] text-white/50 mt-1 font-medium">Mirroring</span>
              </button>
            </div>

            {/* Low Power Mode Card */}
            <button
              onClick={() =>
                updateSystemSetting("lowPowerMode", isLowPowerActive ? "Never" : "Always")
              }
              className="flex items-center gap-3.5 px-4 rounded-[20px] transition-all border border-white/[0.05] text-left"
              style={{
                background: isLowPowerActive ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="flex items-center justify-center w-8 h-8 rounded-full"
                style={{
                  background: isLowPowerActive ? "#ff9500" : "rgba(255,255,255,0.08)",
                }}
              >
                <Battery size={16} className="text-white" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-white">Low Power</p>
                <p className="text-[9px] text-white/45">
                  {isLowPowerActive ? "Enabled" : "Disabled"}
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Utility Grid */}
        <div className="grid grid-cols-4 gap-3 mt-1.5">
          {[
            { icon: <Calculator size={18} />, label: "Calculator" },
            { icon: <Camera size={18} />, label: "Camera" },
            { icon: <Search size={18} />, label: "Search" },
            { icon: <Sun size={18} />, label: "Bright Settings" },
          ].map((item, i) => (
            <button
              key={i}
              className="flex flex-col items-center justify-center aspect-square bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.05] rounded-[20px] transition-all active:scale-90"
            >
              <div className="text-white/80">{item.icon}</div>
              <span className="text-[9px] text-white/40 mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default MobileOSControlCenter;
