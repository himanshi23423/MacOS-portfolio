import { useState, useRef } from "react";

const MobileOSAppGrid = ({ dockApps, openWindow }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentPage === 0) {
      setCurrentPage(1);
    } else if (isRightSwipe && currentPage === 1) {
      setCurrentPage(0);
    }
    touchStart.current = 0;
    touchEnd.current = 0;
  };

  // Divide apps between primary screen (Page 1) and secondary (Page 2)
  // Page 1 gets 8 apps to accommodate the widgets at the top.
  const page1Apps = dockApps.slice(0, 8);
  const page2Apps = dockApps.slice(8);

  return (
    <section
      className="absolute inset-0 pt-[55px] pb-[135px] flex flex-col justify-between overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider Container */}
      <div
        className="flex-1 flex transition-transform duration-350 ease-out"
        style={{ transform: `translateX(-${currentPage * 100}%)` }}
      >
        {/* PAGE 1: Widgets + Primary App Grid */}
        <div className="w-full flex-shrink-0 px-5 flex flex-col gap-6">
          {/* Widgets Container */}
          <div className="grid grid-cols-2 gap-4 mt-2">
            {/* Weather Widget */}
            <div className="aspect-square bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 rounded-[22px] p-3.5 flex flex-col justify-between shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-white/10 text-white select-none">
              <div>
                <p className="text-[12px] font-semibold tracking-wide">Cupertino</p>
                <h3 className="text-4xl font-light tracking-tighter mt-1">72°</h3>
              </div>
              <div>
                <span className="text-[20px]">☀️</span>
                <p className="text-[10px] font-medium text-white/90 mt-1">Sunny</p>
                <p className="text-[9px] text-white/70">H:75° L:58°</p>
              </div>
            </div>

            {/* Battery Widget */}
            <div className="aspect-square bg-black/25 backdrop-blur-md rounded-[22px] p-3.5 flex flex-col justify-between shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-white/[0.06] select-none text-white">
              <span className="text-[10px] font-semibold text-white/50 tracking-wider uppercase">
                Batteries
              </span>

              <div className="grid grid-cols-2 gap-2 my-auto">
                <div className="flex flex-col items-center">
                  <div className="relative w-11 h-11 flex items-center justify-center">
                    <svg className="absolute w-full h-full transform -rotate-90">
                      <circle
                        cx="22"
                        cy="22"
                        r="18"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="3"
                        fill="transparent"
                      />
                      <circle
                        cx="22"
                        cy="22"
                        r="18"
                        stroke="#30d158"
                        strokeWidth="3"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 18}
                        strokeDashoffset={2 * Math.PI * 18 * (1 - 0.88)}
                      />
                    </svg>
                    <span className="text-[10px] font-bold">88%</span>
                  </div>
                  <span className="text-[8px] text-white/60 mt-1">iPhone</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="relative w-11 h-11 flex items-center justify-center">
                    <svg className="absolute w-full h-full transform -rotate-90">
                      <circle
                        cx="22"
                        cy="22"
                        r="18"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="3"
                        fill="transparent"
                      />
                      <circle
                        cx="22"
                        cy="22"
                        r="18"
                        stroke="#30d158"
                        strokeWidth="3"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 18}
                        strokeDashoffset={2 * Math.PI * 18 * (1 - 0.94)}
                      />
                    </svg>
                    <span className="text-[10px] font-bold">94%</span>
                  </div>
                  <span className="text-[8px] text-white/60 mt-1">Watch</span>
                </div>
              </div>
            </div>
          </div>

          {/* App Grid */}
          <div className="grid grid-cols-4 gap-y-6 gap-x-3">
            {page1Apps.map((app) => (
              <button
                key={app.id}
                disabled={!app.canOpen}
                onClick={() => app.canOpen && openWindow(app.id)}
                className="flex flex-col items-center gap-[6px] active:scale-[0.85] transition-transform duration-150"
              >
                <div
                  className="overflow-hidden w-[60px] h-[60px] rounded-[16px] shadow-[0_3px_10px_rgba(0,0,0,0.2),0_0_0_0.5px_rgba(255,255,255,0.12)]"
                  style={{
                    opacity: app.canOpen ? 1 : 0.4,
                    background: app.canOpen ? "transparent" : "rgba(255,255,255,0.1)",
                  }}
                >
                  {app.id === "calendar" ? (
                    <div className="w-full h-full bg-white flex flex-col items-center justify-between select-none pb-1">
                      <div className="text-[#ff3b30] text-[9px] font-bold mt-1 uppercase tracking-tight leading-none">
                        {
                          [
                            "Sunday",
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                          ][new Date().getDay()]
                        }
                      </div>
                      <div className="text-gray-900 font-semibold text-[26px] leading-none -mt-1 font-sans">
                        {new Date().getDate()}
                      </div>
                    </div>
                  ) : (
                    <img
                      src={`/images/${app.icon}`}
                      alt={app.name}
                      className="w-full h-full object-cover rounded-[16px]"
                    />
                  )}
                </div>
                <span className="text-[10.5px] font-medium text-center text-white leading-tight max-w-[70px] drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)]">
                  {app.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* PAGE 2: Secondary App Grid */}
        <div className="w-full flex-shrink-0 px-5 flex flex-col gap-6 pt-2">
          <div className="grid grid-cols-4 gap-y-6 gap-x-3">
            {page2Apps.map((app) => (
              <button
                key={app.id}
                disabled={!app.canOpen}
                onClick={() => app.canOpen && openWindow(app.id)}
                className="flex flex-col items-center gap-[6px] active:scale-[0.85] transition-transform duration-150"
              >
                <div
                  className="overflow-hidden w-[60px] h-[60px] rounded-[16px] shadow-[0_3px_10px_rgba(0,0,0,0.2),0_0_0_0.5px_rgba(255,255,255,0.12)]"
                  style={{
                    opacity: app.canOpen ? 1 : 0.4,
                    background: app.canOpen ? "transparent" : "rgba(255,255,255,0.1)",
                  }}
                >
                  <img
                    src={`/images/${app.icon}`}
                    alt={app.name}
                    className="w-full h-full object-cover rounded-[16px]"
                  />
                </div>
                <span className="text-[10.5px] font-medium text-center text-white leading-tight max-w-[70px] drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)]">
                  {app.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Dot / Search Indicator Bar */}
      <div className="flex flex-col items-center gap-2 mb-2 select-none">
        {/* Search Pill */}
        <button
          onClick={() => setCurrentPage(currentPage === 0 ? 1 : 0)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/25 active:scale-95 transition-all text-white text-[10.5px] font-semibold shadow-inner border border-white/10"
        >
          <span className="text-[9px]">🔍</span> Search
        </button>

        {/* Page dots indicator */}
        <div className="flex justify-center gap-1.5">
          {[0, 1].map((idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className="h-2 rounded-full transition-all duration-200"
              style={{
                width: idx === currentPage ? 16 : 8,
                background:
                  idx === currentPage ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileOSAppGrid;
