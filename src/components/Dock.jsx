import { dockApps } from "#constants";
import useWindowsStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Tooltip } from "react-tooltip";

const Dock = () => {
  const { openWindow, closeWindow, focusWindow, unminimizeWindow, windows } = useWindowsStore();
  const dockRef = useRef(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const animateIcons = (mouseX) => {
      const icons = dock.querySelectorAll(".dock-icon");
      const { left } = dock.getBoundingClientRect();
      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);
        const intensity = Math.exp(-(distance ** 2.8) / 20000);

        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();
      animateIcons(e.clientX - left);
    };
    const resetIcons = () => {
      const icons = dock.querySelectorAll(".dock-icon");
      icons.forEach((icon) =>
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        })
      );
    };
    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  }, []);

  const toggleApp = (app, e) => {
    if (!app.canOpen) return;

    const window = windows[app.id];
    if (window?.isOpen) {
      if (window.isMinimized) {
        unminimizeWindow(app.id);
      } else {
        closeWindow(app.id);
      }
    } else {
      openWindow(app.id);
    }
  };
  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={(e) => toggleApp({ id, canOpen }, e)}
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={`${canOpen ? "" : "opacity-60"} ${id === "settings" ? "p-[3px]" : ""}`}
              />
            </button>
            {windows[id]?.isOpen && (
              <div className="absolute -bottom-1.5 w-1 h-1 bg-white rounded-full" />
            )}
          </div>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
