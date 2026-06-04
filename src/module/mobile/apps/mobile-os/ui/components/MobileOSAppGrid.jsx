import { useState, useRef } from "react";
import {
  Search,
  Smartphone,
  Watch,
  Headphones,
  Laptop,
  Wind,
  Droplets,
  Sun,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import useWeather from "@module/desktop/apps/weather/ui/components/useWeather";

const MobileOSAppGrid = ({ dockApps, openWindow }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);
  const { activeCity } = useWeather();

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

  // Partition apps explicitly based on user preference
  const page1Ids = ["finder", "photos", "contact", "terminal"];
  const page1Apps = page1Ids.map((id) => dockApps.find((app) => app.id === id)).filter(Boolean);
  const page2Apps = dockApps.filter((app) => !page1Ids.includes(app.id));

  // Weather styling helper based on condition
  const getWeatherConditionEmoji = (cond) => {
    const c = cond.toLowerCase();
    if (c.includes("rain") || c.includes("drizzle") || c.includes("shower")) return "🌧️";
    if (c.includes("cloud") || c.includes("overcast")) return "☁️";
    if (c.includes("snow") || c.includes("ice") || c.includes("flurry")) return "❄️";
    if (c.includes("thunder") || c.includes("storm")) return "⛈️";
    if (c.includes("wind") || c.includes("breeze")) return "💨";
    if (c.includes("fog") || c.includes("mist") || c.includes("haze")) return "🌫️";
    return "☀️";
  };

  return (
    <section
      className="absolute inset-0 pt-[68px] pb-[125px] flex flex-col justify-between overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider Container */}
      <div
        className="flex-1 flex transition-transform duration-350 ease-out"
        style={{ transform: `translateX(-${currentPage * 100}%)` }}
      >
        {/* PAGE 1: Widgets (Top) + Premium Mid Widget + Primary App Grid (Bottom-aligned) */}
        <div className="w-full flex-shrink-0 px-5 flex flex-col justify-between h-full pb-4">
          {/* Enhanced Widgets Container (Top) */}
          <div className="flex flex-col gap-3">
            {/* Top row widgets (2x2 each) */}
            <div className="grid grid-cols-2 gap-3 mt-1">
              {/* iOS 17 Weather Widget */}
              <div className="bg-gradient-to-b from-[#3a86f5] via-[#2068e6] to-[#0d4eb5] rounded-[22px] p-3 flex flex-col justify-between shadow-[0_6px_20px_rgba(0,0,0,0.22)] border border-white/12 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[11px] font-bold tracking-tight opacity-90">
                      {activeCity.name}
                    </p>
                    <h3 className="text-3xl font-light tracking-tighter mt-1 leading-none">
                      {activeCity.tempC}°
                    </h3>
                  </div>
                  <div className="bg-white/12 p-1 rounded-full backdrop-blur-md">
                    <span className="text-[16px] leading-none">
                      {getWeatherConditionEmoji(activeCity.condition)}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-semibold tracking-wide">{activeCity.condition}</p>
                  <p className="text-[8.5px] text-white/70 mt-0.5">
                    H: {activeCity.highC}° L: {activeCity.lowC}°
                  </p>

                  {/* Weather Stats Grid */}
                  <div className="grid grid-cols-2 gap-x-1 gap-y-1 mt-1.5 pt-1.5 border-t border-white/10 text-[8px] text-white/80 font-medium">
                    <div className="flex items-center gap-1">
                      <Wind size={8} className="opacity-75" />
                      <span>{activeCity.windSpeed} km/h</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Droplets size={8} className="opacity-75" />
                      <span>{activeCity.humidity}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* iOS 17 Premium Battery Widget */}
              <div className="bg-white rounded-[22px] p-3 flex flex-col justify-between shadow-[0_6px_20px_rgba(0,0,0,0.08)] border border-neutral-100 text-slate-800">
                <span className="text-[8.5px] font-bold text-slate-400 tracking-wider uppercase">
                  Batteries
                </span>

                <div className="grid grid-cols-2 gap-y-2 gap-x-1.5 my-auto">
                  {/* 1. iPhone */}
                  <div className="flex items-center gap-1.5 pl-0.5 min-w-0">
                    <div className="relative w-[28px] h-[28px] xs:w-[32px] xs:h-[32px] flex items-center justify-center flex-shrink-0">
                      <svg
                        className="absolute w-full h-full transform -rotate-90"
                        viewBox="0 0 32 32"
                      >
                        <circle
                          cx="16"
                          cy="16"
                          r="13.5"
                          stroke="rgba(0,0,0,0.05)"
                          strokeWidth="2.5"
                          fill="transparent"
                        />
                        <circle
                          cx="16"
                          cy="16"
                          r="13.5"
                          stroke="#30d158"
                          strokeWidth="2.5"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 13.5}
                          strokeDashoffset={2 * Math.PI * 13.5 * (1 - 0.88)}
                          strokeLinecap="round"
                        />
                      </svg>
                      <Smartphone size={9} className="text-slate-500 xs:size-[10px]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[8px] xs:text-[9.5px] font-bold leading-none text-slate-900">
                        88%
                      </p>
                      <p className="text-[7px] xs:text-[8px] text-slate-400 font-medium truncate mt-0.5">
                        iPhone
                      </p>
                    </div>
                  </div>

                  {/* 2. Apple Watch */}
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="relative w-[28px] h-[28px] xs:w-[32px] xs:h-[32px] flex items-center justify-center flex-shrink-0">
                      <svg
                        className="absolute w-full h-full transform -rotate-90"
                        viewBox="0 0 32 32"
                      >
                        <circle
                          cx="16"
                          cy="16"
                          r="13.5"
                          stroke="rgba(0,0,0,0.05)"
                          strokeWidth="2.5"
                          fill="transparent"
                        />
                        <circle
                          cx="16"
                          cy="16"
                          r="13.5"
                          stroke="#30d158"
                          strokeWidth="2.5"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 13.5}
                          strokeDashoffset={2 * Math.PI * 13.5 * (1 - 0.94)}
                          strokeLinecap="round"
                        />
                      </svg>
                      <Watch size={9} className="text-slate-500 xs:size-[10px]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[8px] xs:text-[9.5px] font-bold leading-none text-slate-900">
                        94%
                      </p>
                      <p className="text-[7px] xs:text-[8px] text-slate-400 font-medium truncate mt-0.5">
                        Watch
                      </p>
                    </div>
                  </div>

                  {/* 3. AirPods */}
                  <div className="flex items-center gap-1.5 pl-0.5 min-w-0">
                    <div className="relative w-[28px] h-[28px] xs:w-[32px] xs:h-[32px] flex items-center justify-center flex-shrink-0">
                      <svg
                        className="absolute w-full h-full transform -rotate-90"
                        viewBox="0 0 32 32"
                      >
                        <circle
                          cx="16"
                          cy="16"
                          r="13.5"
                          stroke="rgba(0,0,0,0.05)"
                          strokeWidth="2.5"
                          fill="transparent"
                        />
                        <circle
                          cx="16"
                          cy="16"
                          r="13.5"
                          stroke="#30d158"
                          strokeWidth="2.5"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 13.5}
                          strokeDashoffset={2 * Math.PI * 13.5 * (1 - 1.0)}
                          strokeLinecap="round"
                        />
                      </svg>
                      <Headphones size={9} className="text-slate-500 xs:size-[10px]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[8px] xs:text-[9.5px] font-bold leading-none text-slate-900">
                        100%
                      </p>
                      <p className="text-[7px] xs:text-[8px] text-slate-400 font-medium truncate mt-0.5">
                        AirPods
                      </p>
                    </div>
                  </div>

                  {/* 4. MacBook */}
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="relative w-[28px] h-[28px] xs:w-[32px] xs:h-[32px] flex items-center justify-center flex-shrink-0">
                      <svg
                        className="absolute w-full h-full transform -rotate-90"
                        viewBox="0 0 32 32"
                      >
                        <circle
                          cx="16"
                          cy="16"
                          r="13.5"
                          stroke="rgba(0,0,0,0.05)"
                          strokeWidth="2.5"
                          fill="transparent"
                        />
                        <circle
                          cx="16"
                          cy="16"
                          r="13.5"
                          stroke="#ff9500"
                          strokeWidth="2.5"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 13.5}
                          strokeDashoffset={2 * Math.PI * 13.5 * (1 - 0.65)}
                          strokeLinecap="round"
                        />
                      </svg>
                      <Laptop size={9} className="text-slate-500 xs:size-[10px]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[8px] xs:text-[9.5px] font-bold leading-none text-slate-900">
                        65%
                      </p>
                      <p className="text-[7px] xs:text-[8px] text-slate-400 font-medium truncate mt-0.5">
                        MacBook
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* iOS 17 Premium Wide Smart Calendar & Reminders Stack Widget (2x4) */}
            <div className="w-full bg-white border border-neutral-100 rounded-[22px] p-3 flex shadow-[0_6px_20px_rgba(0,0,0,0.08)] text-slate-800 gap-3 items-center">
              {/* Date Card (Left Side) */}
              <div className="w-[30%] border-r border-neutral-200 pr-2.5 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">
                  {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][new Date().getDay()]}
                </span>
                <span className="text-3xl font-bold leading-none mt-0.5 tracking-tight text-slate-905">
                  {new Date().getDate()}
                </span>
              </div>

              {/* Upcoming Event / Reminders (Right Side) */}
              <div className="flex-1 flex flex-col justify-center min-w-0 pl-0.5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Calendar size={11} className="text-slate-400" />
                  <span className="text-[9px] font-bold text-slate-400 tracking-wide uppercase">
                    Up Next
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-7 rounded-full bg-[#007aff] mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-slate-900 leading-tight truncate">
                      Portfolio Presentation
                    </p>
                    <p className="text-[9px] text-slate-400 mt-0.5">2:30 PM - 3:30 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom-Aligned App Grid */}
          <div className="grid grid-cols-4 gap-y-5 gap-x-2.5 mt-auto">
            {page1Apps.map((app) => (
              <button
                key={app.id}
                disabled={!app.canOpen}
                onClick={() => app.canOpen && openWindow(app.id)}
                className="flex flex-col items-center gap-[5px] active:scale-[0.85] transition-transform duration-150"
              >
                <div
                  className="overflow-hidden w-[56px] h-[56px] xs:w-[60px] xs:h-[60px] rounded-[16px] shadow-[0_3px_10px_rgba(0,0,0,0.22),0_0_0_0.5px_rgba(255,255,255,0.12)]"
                  style={{
                    opacity: app.canOpen ? 1 : 0.4,
                    background: app.canOpen ? "transparent" : "rgba(255,255,255,0.1)",
                  }}
                >
                  {app.id === "calendar" ? (
                    <div className="w-full h-full bg-white flex flex-col items-center select-none">
                      {/* Top Day Header Area with Red Background */}
                      <div className="w-full bg-[#ff3b30] py-1 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[8px] font-bold uppercase tracking-wide leading-none">
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
                        </span>
                      </div>
                      {/* Bottom Date Area */}
                      <div className="flex-1 flex items-center justify-center -mt-0.5">
                        <span className="text-gray-900 font-semibold text-[22px] leading-none font-sans">
                          {new Date().getDate()}
                        </span>
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
                <span className="text-[10px] font-medium text-center text-white leading-tight max-w-[68px] drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)]">
                  {app.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* PAGE 2: Secondary App Grid (Also bottom-aligned to look clean) */}
        <div className="w-full flex-shrink-0 px-5 flex flex-col justify-end h-full pb-4">
          <div className="grid grid-cols-4 gap-y-5 gap-x-2.5">
            {page2Apps.map((app) => (
              <button
                key={app.id}
                disabled={!app.canOpen}
                onClick={() => app.canOpen && openWindow(app.id)}
                className="flex flex-col items-center gap-[5px] active:scale-[0.85] transition-transform duration-150"
              >
                <div
                  className="overflow-hidden w-[56px] h-[56px] xs:w-[60px] xs:h-[60px] rounded-[16px] shadow-[0_3px_10px_rgba(0,0,0,0.22),0_0_0_0.5px_rgba(255,255,255,0.12)]"
                  style={{
                    opacity: app.canOpen ? 1 : 0.4,
                    background: app.canOpen ? "transparent" : "rgba(255,255,255,0.1)",
                  }}
                >
                  {app.id === "calendar" ? (
                    <div className="w-full h-full bg-white flex flex-col items-center select-none">
                      {/* Top Day Header Area with Red Background */}
                      <div className="w-full bg-[#ff3b30] py-1 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[8px] font-bold uppercase tracking-wide leading-none">
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
                        </span>
                      </div>
                      {/* Bottom Date Area */}
                      <div className="flex-1 flex items-center justify-center -mt-0.5">
                        <span className="text-gray-900 font-semibold text-[22px] leading-none font-sans">
                          {new Date().getDate()}
                        </span>
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
                <span className="text-[10px] font-medium text-center text-white leading-tight max-w-[68px] drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)]">
                  {app.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Dot / iOS Search Indicator Bar */}
      <div className="flex flex-col items-center gap-2 mb-1 select-none">
        {/* iOS 17 style Search Pill */}
        <button
          onClick={() => setCurrentPage(currentPage === 0 ? 1 : 0)}
          className="flex items-center gap-1.5 px-3 py-[3px] rounded-full bg-black/20 backdrop-blur-xl hover:bg-black/30 active:scale-95 transition-all text-white/90 text-[10.5px] font-medium shadow-[0_1px_3px_rgba(0,0,0,0.2)] border border-white/[0.08]"
        >
          <Search size={10.5} strokeWidth={2.8} className="text-white/80" />
          <span className="tracking-wide">Search</span>
        </button>

        {/* Page dots indicator */}
        <div className="flex justify-center gap-1.5">
          {[0, 1].map((idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className="h-1.5 rounded-full transition-all duration-200"
              style={{
                width: idx === currentPage ? 14 : 6,
                background: idx === currentPage ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileOSAppGrid;
