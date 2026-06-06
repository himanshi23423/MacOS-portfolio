import { dockApps } from "@constants";
import useWindowsStore from "@store/window";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import useTimeStore from "@store/time";
import MobileOSStatusBar from "./MobileOSStatusBar";
import MobileOSControlCenter from "./MobileOSControlCenter";
import MobileOSAppGrid from "./MobileOSAppGrid";
import MobileOSDock from "./MobileOSDock";
import MobileNotch from "./MobileNotch";

const MobileOS = () => {
  const { openWindow, windows } = useWindowsStore();
  const time = useTimeStore((state) => state.time);
  const now = dayjs(time);
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

  const toggle = (key) => setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="mobile-os-container text-white font-sans select-none fixed top-0 left-0 w-dvw h-dvh overflow-hidden z-[1]">
      <MobileOSStatusBar
        now={now}
        anyWindowOpen={anyWindowOpen}
        setIsControlOpen={setIsControlOpen}
        settings={settings}
      />

      {/* iPhone 15/16/17 Interactive Dynamic Island */}
      <MobileNotch />

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
