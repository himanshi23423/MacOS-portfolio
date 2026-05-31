import { useEffect } from "react";
import gsap from "gsap";
import {
  X,
  Wifi,
  Bluetooth,
  Flashlight,
  Clock,
  Sun,
  Moon,
  Battery,
  Calculator,
  Camera,
  Search,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isControlOpen]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isControlOpen, setIsControlOpen]);

  return (
    <aside
      ref={controlCenterRef}
      className="absolute top-0 left-0 w-full z-[75] overflow-hidden -translate-y-full opacity-0"
    >
      <div className="bg-[rgba(28,28,30,0.94)] backdrop-blur-[50px] backdrop-saturate-[2] min-h-dvh pt-[60px] pb-10 px-4">
        <button
          onClick={() => setIsControlOpen(false)}
          className="absolute top-[14px] right-4 z-10 flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white/12"
        >
          <X size={15} strokeWidth={2.5} />
        </button>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-white/8 rounded-[18px] p-[14px] flex flex-col gap-[10px]">
            <div className="flex gap-2">
              <button
                onClick={() => toggle("airplane")}
                className="flex items-center justify-center transition-all w-[46px] h-[46px] rounded-full"
                style={{
                  background: settings.airplane ? "#f59e0b" : "rgba(255,255,255,0.12)",
                }}
              >
                <span className="text-xl">✈︎</span>
              </button>
              <button
                onClick={() => toggle("wifi")}
                className="flex items-center justify-center transition-all w-[46px] h-[46px] rounded-full"
                style={{
                  background: settings.wifi ? "#007AFF" : "rgba(255,255,255,0.12)",
                }}
              >
                <Wifi size={20} />
              </button>
              <button
                onClick={() => toggle("bluetooth")}
                className="flex items-center justify-center transition-all w-[46px] h-[46px] rounded-full"
                style={{
                  background: settings.bluetooth ? "#007AFF" : "rgba(255,255,255,0.12)",
                }}
              >
                <Bluetooth size={20} />
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggle("flashlight")}
                className="flex items-center justify-center transition-all w-[46px] h-[46px] rounded-full"
                style={{
                  background: settings.flashlight ? "#007AFF" : "rgba(255,255,255,0.12)",
                }}
              >
                <Flashlight size={20} />
              </button>
            </div>
          </div>

          <div className="bg-white/8 rounded-[18px] p-[14px] flex flex-col items-center justify-center gap-2">
            <div className="w-[46px] h-[46px] rounded-full bg-white/12 flex items-center justify-center">
              <Clock size={20} />
            </div>
            <p className="text-[11px] text-white/60 text-center leading-tight">
              {now.format("dddd")}
            </p>
            <p className="text-[22px] font-bold text-white leading-none">{now.format("h:mm")}</p>
            <p className="text-[11px] text-white/50">{now.format("MMMM D")}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-white/8 rounded-[18px] p-[14px]">
            <div className="flex items-center justify-between mb-2">
              <Sun size={14} className="text-white/70" />
              <Moon size={14} className="text-white/70" />
            </div>
            <div className="h-1 rounded-[2px] bg-white/15 relative">
              <div
                className="h-full rounded-[2px] bg-white transition-[width] duration-200 ease-out"
                style={{ width: `${brightness}%` }}
              />
              <input
                type="range"
                min={0}
                max={100}
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="absolute -top-2 left-0 w-full h-5 opacity-0 cursor-pointer"
              />
            </div>
            <button
              onClick={() => toggle("darkMode")}
              className="flex items-center gap-2 mt-3 w-full"
            >
              <div
                className="flex items-center justify-center w-8 h-8 rounded-2xl"
                style={{
                  background: settings.darkMode ? "#007AFF" : "rgba(255,255,255,0.12)",
                }}
              >
                {settings.darkMode ? <Moon size={15} /> : <Sun size={15} />}
              </div>
              <div className="text-left">
                <p className="text-[11px] font-semibold text-white">
                  {settings.darkMode ? "Dark" : "Light"}
                </p>
                <p className="text-[9px] text-white/40">Appearance</p>
              </div>
            </button>
          </div>

          <div className="bg-white/8 rounded-[18px] p-[14px]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] text-white/70">🔈</span>
              <span className="text-[10px] text-white/70">🔊</span>
            </div>
            <div className="h-1 rounded-[2px] bg-white/15 relative">
              <div
                className="h-full rounded-[2px] bg-white transition-[width] duration-200 ease-out"
                style={{ width: `${volume}%` }}
              />
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="absolute -top-2 left-0 w-full h-5 opacity-0 cursor-pointer"
              />
            </div>
            <button
              onClick={() => toggle("lowPower")}
              className="flex items-center gap-2 mt-3 w-full"
            >
              <div
                className="flex items-center justify-center w-8 h-8 rounded-2xl"
                style={{
                  background: settings.lowPower ? "#f59e0b" : "rgba(255,255,255,0.12)",
                }}
              >
                <Battery size={15} />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-semibold text-white">
                  {settings.lowPower ? "On" : "Off"}
                </p>
                <p className="text-[9px] text-white/40">Low Power Mode</p>
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: <Calculator size={20} />, label: "Calculator" },
            { icon: <Camera size={20} />, label: "Camera" },
            { icon: <Clock size={20} />, label: "Timer" },
            { icon: <Search size={20} />, label: "Search" },
          ].map((item, i) => (
            <button
              key={i}
              className="flex flex-col items-center gap-1 bg-white/8 rounded-2xl py-[14px] px-2"
            >
              <div className="text-white/80">{item.icon}</div>
              <span className="text-[9px] text-white/50">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default MobileOSControlCenter;
