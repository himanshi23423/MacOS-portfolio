import { dockApps } from "#constants";
import useWindowsStore from "#store/window";
import { Fragment, useState } from "react";
import DockIcon from "./DockIcon";
import useDockAnimation from "./useDockAnimation";

const Dock = () => {
  const { openWindow, closeWindow, unminimizeWindow, windows } =
    useWindowsStore();
  const [hoveredAppId, setHoveredAppId] = useState(null);
  const dockRef = useDockAnimation();

  const toggleApp = (app, e) => {
    if (!app.canOpen) return;

    const appId = app.id === "folder" ? "finder" : app.id;
    const window = windows[appId];
    if (window?.isOpen) {
      if (window.isMinimized) {
        unminimizeWindow(appId);
      } else {
        closeWindow(appId);
      }
    } else {
      openWindow(appId);
    }
  };

  const isAnyWindowMaximized = Object.values(windows).some(
    (win) => win.isOpen && win.isMaximized && !win.isMinimized
  );

  return (
    <section id="dock" className={isAnyWindowMaximized ? "dock-hidden" : ""}>
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <Fragment key={id}>
            {id === "folder" && (
              <div className="w-[1px] h-9 bg-white/20 self-center mx-1 shrink-0" />
            )}
            <DockIcon
              app={{ id, name, icon, canOpen }}
              isHovered={hoveredAppId === id}
              onMouseEnter={() => setHoveredAppId(id)}
              onMouseLeave={() => setHoveredAppId(null)}
              onClick={(e) => toggleApp({ id, canOpen }, e)}
            />
          </Fragment>
        ))}
      </div>
    </section>
  );
};

export default Dock;
