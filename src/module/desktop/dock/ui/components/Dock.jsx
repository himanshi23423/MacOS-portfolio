import { dockApps } from "#constants";
import useWindowsStore from "#store/window";
import { Fragment, useMemo, useState } from "react";
import DockIcon from "./DockIcon";
import useDockAnimation from "./useDockAnimation";

const Dock = () => {
  const { openWindow, closeWindow, unminimizeWindow, windows } =
    useWindowsStore();
  const [hoveredAppId, setHoveredAppId] = useState(null);
  const dockRef = useDockAnimation();

  const focusedWindowId = useMemo(() => {
    return Object.entries(windows).reduce((focusedId, [id, win]) => {
      if (!win.isOpen || win.isMinimized) return focusedId;
      if (!focusedId) return id;
      return win.zIndex > windows[focusedId].zIndex ? id : focusedId;
    }, null);
  }, [windows]);

  const toggleApp = (app) => {
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
    <section
      id="dock"
      className={isAnyWindowMaximized ? "dock-hidden" : ""}
      aria-label="Dock"
    >
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <Fragment key={id}>
            {id === "folder" && (
              <div className="dock-separator-wrap" aria-hidden="true">
                <span className="dock-separator" />
              </div>
            )}
            <DockIcon
              app={{ id, name, icon, canOpen }}
              state={windows[id === "folder" ? "finder" : id]}
              isFocused={focusedWindowId === (id === "folder" ? "finder" : id)}
              isHovered={hoveredAppId === id}
              onMouseEnter={() => setHoveredAppId(id)}
              onMouseLeave={() => setHoveredAppId(null)}
              onClick={() => toggleApp({ id, canOpen })}
            />
          </Fragment>
        ))}
      </div>
    </section>
  );
};

export default Dock;
