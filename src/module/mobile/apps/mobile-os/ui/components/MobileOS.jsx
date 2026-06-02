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
      <div className="w-24 h-5 bg-[#0a0a0a] rounded-full border border-neutral-900/60 flex items-center justify-center absolute top-[11px] left-1/2 -translate-x-1/2 shadow-[inset_0_1px_2px_rgba(255,255,255,0.04),0_2px_6px_rgba(0,0,0,0.6)] z-[80] pointer-events-none">
        {/* Camera lens reflection */}
        <div className="absolute right-3.5 w-1.5 h-1.5 rounded-full bg-[#050505] border border-neutral-850 flex items-center justify-center">
          <div className="w-0.5 h-0.5 rounded-full bg-blue-900/20" />
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

      <MobileOSAppGrid dockApps={dockApps} openWindow={openWindow} />

      <MobileOSDock dockApps={dockApps} openWindow={openWindow} />

      <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 rounded-full z-50 w-[134px] h-[5px] bg-white/55" />
    </div>
  );
};

export default MobileOS;
