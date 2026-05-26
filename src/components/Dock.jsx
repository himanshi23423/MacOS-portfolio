import { dockApps } from "#constants";
import useWindowsStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Tooltip } from "react-tooltip";

const Dock = () => {
  const { openWindow, closeWindow, focusWindow, unminimizeWindow, windows } =
    useWindowsStore();
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
        }),
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
              {id === "calendar" ? (
                <div className="w-full h-full bg-white rounded-[13px] border border-black/10 shadow-sm overflow-hidden flex flex-col items-center select-none scale-[0.76] relative aspect-square transition-all duration-200 hover:scale-[0.82]">
                  {/* Red Header Bar */}
                  <div className="w-full bg-[#ff3b30] text-white text-[9px] font-extrabold py-0.5 text-center leading-none tracking-wider uppercase">
                    {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][new Date().getDay()]}
                  </div>
                  {/* Date Number */}
                  <div className="flex-1 flex items-center justify-center text-gray-800 font-bold text-2xl leading-none font-sans -mt-0.5">
                    {new Date().getDate()}
                  </div>
                </div>
              ) : (
                <img
                  src={`/images/${icon}`}
                  alt={name}
                  loading="lazy"
                  className={`${canOpen ? "" : "opacity-60"} ${id === "settings" ? "p-[3px]" : ""} ${id === "appletv" ? "scale-[0.87]" : ""} ${id === "calculator" ? "scale-[0.90]" : ""} ${id === "call" ? "scale-[0.80]" : ""} ` }
                />
              )}
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
