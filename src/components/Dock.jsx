import { dockApps } from "#constants";
import useWindowsStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, Fragment, useState } from "react";

const Dock = () => {
  const { openWindow, closeWindow, focusWindow, unminimizeWindow, windows } =
    useWindowsStore();
  const [hoveredAppId, setHoveredAppId] = useState(null);
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
          scale: 1 + 0.38 * intensity,
          y: -28 * intensity,
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

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <Fragment key={id}>
            {id === "folder" && (
              <div className="w-[1px] h-9 bg-white/20 self-center mx-1 shrink-0" />
            )}
            <div className="relative flex justify-center">
              <button
                type="button"
                className="dock-icon relative flex justify-center items-center"
                aria-label={name}
                disabled={!canOpen}
                onClick={(e) => toggleApp({ id, canOpen }, e)}
                onMouseEnter={() => setHoveredAppId(id)}
                onMouseLeave={() => setHoveredAppId(null)}
              >
                {hoveredAppId === id && (
                  <span className="dock-tooltip-custom animate-tooltip">
                    {name}
                  </span>
                )}
                {id === "calendar" ? (
                  <div className="w-full h-full bg-white rounded-[13px] border border-black/10 shadow-sm overflow-hidden flex flex-col items-center select-none scale-[0.76] relative aspect-square transition-all duration-200 hover:scale-[0.82]">
                    {/* Red Header Bar */}
                    <div className="w-full bg-[#ff3b30] text-white text-[9px] font-extrabold py-0.5 text-center leading-none tracking-wider uppercase">
                      {
                        ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][
                          new Date().getDay()
                        ]
                      }
                    </div>
                    {/* Date Number */}
                    <div className="flex-1 flex items-center justify-center text-gray-855 font-bold text-2xl leading-none font-sans -mt-0.5">
                      {new Date().getDate()}
                    </div>
                  </div>
                ) : (
                  <img
                    src={`/images/${icon}`}
                    alt={name}
                    loading="lazy"
                    className={`${canOpen ? "" : "opacity-60"} ${
                      {
                        finder: "scale-[0.90]",
                        launchpad: "scale-[0.90]",
                        safari: "scale-[0.90]",
                        photos: "scale-[0.90]",
                        contact: "scale-[0.90]",
                        terminal: "scale-[0.90]",
                        settings: "scale-[0.83]",
                        calculator: "scale-[0.83]",
                        notes: "scale-[0.90]",
                        messages: "scale-[0.90]",
                        appletv: "scale-[0.80]",
                        call: "scale-[0.71]",
                        appstore: "scale-[0.90]",
                        weather: "scale-[0.81]",
                        chrome: "scale-[0.95]",
                        vscode: "scale-[0.95]",
                        postman: "scale-[0.95]",
                        map: "scale-[0.72]",
                        font: "scale-[2.8]",
                        telegram: "scale-[0.90]",
                        music: "scale-[0.90]",
                        folder: "scale-[0.90]",
                        trash: "scale-[0.80]",
                      }[id] || ""
                    }`}
                  />
                )}
              </button>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
};

export default Dock;
