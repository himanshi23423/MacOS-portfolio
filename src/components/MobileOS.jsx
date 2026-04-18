import { dockApps } from "#constants";
import useWindowsStore from "#store/window";
import dayjs from "dayjs";
import { useEffect, useState, useRef } from "react";
import { Battery, Wifi, Signal, X, Sun, Moon, Bluetooth } from "lucide-react";
import gsap from "gsap";

const MobileOS = () => {
  const { openWindow, windows } = useWindowsStore();
  const [now, setNow] = useState(dayjs());
  const [isControlOpen, setIsControlOpen] = useState(false);
  const [settings, setSettings] = useState({
    wifi: true,
    bluetooth: true,
    darkMode: false,
    lowPower: false,
  });
  const controlCenterRef = useRef(null);
  const statusBarRef = useRef(null);

  // Has any window open?
  const anyWindowOpen = Object.values(windows).some((w) => w.isOpen);

  useEffect(() => {
    const timer = setInterval(() => setNow(dayjs()), 30_000);
    return () => clearInterval(timer);
  }, []);

  // Animate control center
  useEffect(() => {
    if (!controlCenterRef.current) return;
    if (isControlOpen) {
      gsap.fromTo(
        controlCenterRef.current,
        { y: "-110%", opacity: 0 },
        { y: 0, opacity: 1, duration: 0.38, ease: "power3.out" }
      );
    } else {
      gsap.to(controlCenterRef.current, {
        y: "-110%",
        opacity: 0,
        duration: 0.28,
        ease: "power3.in",
      });
    }
  }, [isControlOpen]);

  // Close control center on outside click
  useEffect(() => {
    if (!isControlOpen) return;
    const handleOutside = (e) => {
      if (
        controlCenterRef.current &&
        !controlCenterRef.current.contains(e.target) &&
        statusBarRef.current &&
        !statusBarRef.current.contains(e.target)
      ) {
        setIsControlOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [isControlOpen]);

  const toggle = (key) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="mobile-os-container text-white font-sans select-none"
      style={{ 
        position: "fixed",
        top: 0, left: 0,
        width: "100dvw", 
        height: "100dvh",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {/* Status Bar */}
      <header
        ref={statusBarRef}
        className="flex justify-between items-center px-5 pt-3 pb-2 absolute top-0 w-full z-[70]"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)" }}
        onClick={() => !anyWindowOpen && setIsControlOpen((p) => !p)}
      >
        <time className="text-[15px] font-bold tracking-tight">{now.format("h:mm")}</time>
        <div className="flex items-center gap-[6px]">
          <Signal size={15} strokeWidth={2.5} />
          <Wifi size={15} strokeWidth={2.5} />
          <Battery size={18} strokeWidth={2.5} />
          <span className="text-[11px] font-bold">100%</span>
        </div>
      </header>

      {/* Control Center Panel */}
      <aside
        ref={controlCenterRef}
        className="absolute top-0 left-0 w-full z-[65] rounded-b-[36px] overflow-hidden"
        style={{ transform: "translateY(-110%)", opacity: 0 }}
      >
        <div
          className="p-6 pt-12 flex flex-col gap-5"
          style={{
            background: "rgba(20,20,28,0.82)",
            backdropFilter: "blur(40px) saturate(1.8)",
          }}
        >
          {/* Date + close */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-2xl font-bold leading-none">{now.format("h:mm")}</p>
              <p className="text-sm opacity-60 mt-1">{now.format("dddd, MMMM D")}</p>
            </div>
            <button
              onClick={() => setIsControlOpen(false)}
              className="bg-white/10 rounded-full p-2 active:bg-white/20"
            >
              <X size={18} />
            </button>
          </div>

          {/* Toggles Grid */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => toggle("wifi")}
              className={`rounded-[22px] p-4 flex items-center gap-3 transition-colors ${settings.wifi ? "bg-white text-black" : "bg-white/10 text-white"}`}
            >
              <Wifi size={22} />
              <div className="text-left">
                <p className="text-xs font-bold leading-none">Wi-Fi</p>
                <p className={`text-[10px] mt-0.5 ${settings.wifi ? "text-black/60" : "opacity-50"}`}>
                  {settings.wifi ? "On" : "Off"}
                </p>
              </div>
            </button>

            <button
              onClick={() => toggle("bluetooth")}
              className={`rounded-[22px] p-4 flex items-center gap-3 transition-colors ${settings.bluetooth ? "bg-white text-black" : "bg-white/10 text-white"}`}
            >
              <Bluetooth size={22} />
              <div className="text-left">
                <p className="text-xs font-bold leading-none">Bluetooth</p>
                <p className={`text-[10px] mt-0.5 ${settings.bluetooth ? "text-black/60" : "opacity-50"}`}>
                  {settings.bluetooth ? "On" : "Off"}
                </p>
              </div>
            </button>

            <button
              onClick={() => toggle("darkMode")}
              className={`rounded-[22px] p-4 flex items-center gap-3 transition-colors ${settings.darkMode ? "bg-white text-black" : "bg-white/10 text-white"}`}
            >
              {settings.darkMode ? <Moon size={22} /> : <Sun size={22} />}
              <div className="text-left">
                <p className="text-xs font-bold leading-none">Appearance</p>
                <p className={`text-[10px] mt-0.5 ${settings.darkMode ? "text-black/60" : "opacity-50"}`}>
                  {settings.darkMode ? "Dark" : "Light"}
                </p>
              </div>
            </button>

            <button
              onClick={() => toggle("lowPower")}
              className={`rounded-[22px] p-4 flex items-center gap-3 transition-colors ${settings.lowPower ? "bg-yellow-400 text-black" : "bg-white/10 text-white"}`}
            >
              <Battery size={22} />
              <div className="text-left">
                <p className="text-xs font-bold leading-none">Low Power</p>
                <p className={`text-[10px] mt-0.5 ${settings.lowPower ? "text-black/60" : "opacity-50"}`}>
                  {settings.lowPower ? "On" : "Off"}
                </p>
              </div>
            </button>
          </div>

          {/* Swipe-down handle */}
          <div className="flex justify-center pt-1">
            <div className="w-10 h-1 bg-white/30 rounded-full" onClick={() => setIsControlOpen(false)} />
          </div>
        </div>
      </aside>

      {/* App Grid — Home Screen */}
      <section
        className="absolute inset-0 overflow-y-auto"
        style={{ paddingTop: "56px", paddingBottom: "112px" }}
      >
        <div className="grid grid-cols-4 px-4 py-4"
          style={{ gap: "24px 8px" }}
        >
          {dockApps.map((app) => (
            <button
              key={app.id}
              disabled={!app.canOpen}
              onClick={() => app.canOpen && openWindow(app.id)}
              className="flex flex-col items-center gap-[6px] active:scale-90 transition-transform duration-150"
            >
              <div
                className="rounded-[20px] overflow-hidden shadow-xl"
                style={{
                  width: 60,
                  height: 60,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
                  opacity: app.canOpen ? 1 : 0.45,
                }}
              >
                <img
                  src={`/images/${app.icon}`}
                  alt={app.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className="text-[11px] font-medium text-center text-white leading-tight"
                style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)", maxWidth: 68 }}
              >
                {app.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Dock */}
      <footer
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center justify-around px-4"
        style={{
          width: "90%",
          height: 82,
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(28px) saturate(1.5)",
          borderRadius: 28,
          border: "1px solid rgba(255,255,255,0.22)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
        }}
      >
        {dockApps.filter(a => a.canOpen).slice(0, 4).map((app) => (
          <button
            key={app.id}
            onClick={() => openWindow(app.id)}
            className="active:scale-90 transition-transform duration-150"
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            <img
              src={`/images/${app.icon}`}
              alt={app.name}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </footer>

      {/* Home Indicator */}
      <div
        className="absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-full z-50"
        style={{ width: 120, height: 5, background: "rgba(255,255,255,0.5)" }}
      />
    </div>
  );
};

export default MobileOS;
