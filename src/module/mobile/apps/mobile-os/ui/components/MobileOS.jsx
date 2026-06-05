import { dockApps } from "@constants";
import useWindowsStore from "@store/window";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import MobileOSStatusBar from "./MobileOSStatusBar";
import MobileOSControlCenter from "./MobileOSControlCenter";
import MobileOSAppGrid from "./MobileOSAppGrid";
import MobileOSDock from "./MobileOSDock";

const MobileOS = () => {
  const { openWindow, windows } = useWindowsStore();
  const [now, setNow] = useState(dayjs());
  const [isControlOpen, setIsControlOpen] = useState(false);
  const [settings, setSettings] = useState({
    wifi: true,
    bluetooth: true,
    darkMode: false,
    lowPower: false,
    flashlight: false,
    airplane: false,
  });
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(50);
  const controlCenterRef = useRef(null);

  const anyWindowOpen = Object.values(windows).some((w) => w.isOpen);

  useEffect(() => {
    const timer = setInterval(() => setNow(dayjs()), 30_000);
    return () => clearInterval(timer);
  }, []);

  const toggle = (key) => setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="mobile-os-container text-white font-sans select-none fixed top-0 left-0 w-dvw h-dvh overflow-hidden z-[1]">
      <MobileOSStatusBar
        now={now}
        anyWindowOpen={anyWindowOpen}
        setIsControlOpen={setIsControlOpen}
        settings={settings}
      />

      {/* iPhone 17 Pro Dynamic Island cutout */}
      <div className="w-28 h-[26px] bg-[#0a0a0a] rounded-full border border-neutral-900/60 flex items-center justify-between px-3.5 absolute top-[9px] left-1/2 -translate-x-1/2 shadow-[inset_0_1px_2px_rgba(255,255,255,0.04),0_2px_6px_rgba(0,0,0,0.6)] z-[80] pointer-events-none">
        {/* FaceID Sensor / TrueDepth Array */}
        <div className="w-2.5 h-2.5 rounded-full bg-[#080808] border border-neutral-950 flex-shrink-0" />
        {/* Front Camera Lens with blue AR glass element reflection */}
        <div className="w-3.5 h-3.5 rounded-full bg-[#030307] border border-[#1a1a24] shadow-inner flex items-center justify-center flex-shrink-0 relative overflow-hidden">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0d2d4d] opacity-90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] flex items-center justify-center">
            <div className="w-0.5 h-0.5 rounded-full bg-cyan-400 opacity-60" />
          </div>
        </div>
      </div>

      <MobileOSControlCenter
        isControlOpen={isControlOpen}
        setIsControlOpen={setIsControlOpen}
        settings={settings}
        now={now}
        toggle={toggle}
        brightness={brightness}
        setBrightness={setBrightness}
        volume={volume}
        setVolume={setVolume}
        controlCenterRef={controlCenterRef}
      />

      <MobileOSAppGrid
        dockApps={dockApps.filter(
          (app) =>
            app.id !== "launchpad" &&
            app.id !== "trash" &&
            !["safari", "messages", "call", "music", "vscode", "postman", "folder"].includes(
              app.id,
            ),
        )}
        openWindow={openWindow}
      />

      <MobileOSDock
        dockApps={["call", "safari", "messages", "music"]
          .map((id) => dockApps.find((app) => app.id === id))
          .filter(Boolean)}
        openWindow={openWindow}
      />

      <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 rounded-full z-50 w-[134px] h-[5px] bg-white/55" />
    </div>
  );
};

export default MobileOS;
