import { useEffect, useState, useMemo, useRef } from "react";
import useWindowsStore from "@store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import useTimeStore from "@store/time";

// Combined Time & Calendar Widget
const ClockCalendarWidget = () => {
  const time = useTimeStore((state) => state.time);

  // Time formatting (HH:mm) — 24-hour format, synced with lock screen
  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const timeString = `${hours}:${minutes}`;

  // Date formatting (e.g., JUNE 6, SATURDAY) — synced with lock screen
  const monthName = time.toLocaleDateString("en-US", { month: "long" });
  const dayName = time.toLocaleDateString("en-US", { weekday: "long" });
  const dateNum = time.getDate();
  const dateHeader = `${monthName.toUpperCase()} ${dateNum}, ${dayName.toUpperCase()}`;

  const month = time.getMonth();
  const year = time.getFullYear();

  // Calendar calculations
  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }
    return days;
  }, [month, year]);

  const weekHeaders = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="widget-card-frameless flex flex-col items-center select-none text-white text-center font-sans">
      {/* Date Header (e.g. JUNE 6, SATURDAY) */}
      <div className="text-[12px] font-semibold tracking-wider text-white/80 uppercase">
        {dateHeader}
      </div>

      {/* Large Digital Clock (e.g. 23:12) */}
      <div className="text-[56px] font-extralight tracking-tight mt-1 text-white leading-none">
        {timeString}
      </div>

      {/* Month Label (e.g. JUNE) */}
      <div className="text-[12px] font-bold tracking-wider text-white/50 uppercase mt-4">
        {monthName}
      </div>

      {/* Weekday initial headers */}
      <div className="grid grid-cols-7 gap-x-2.5 gap-y-2 w-full mt-2.5 text-[11px] font-semibold text-white/40">
        {weekHeaders.map((day, idx) => (
          <div key={idx} className="w-7 text-center">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-x-2.5 gap-y-2 w-full mt-2 text-[13px]">
        {calendarDays.map((day, idx) => {
          const isToday = day === dateNum;
          return (
            <div key={idx} className="w-7 h-7 flex items-center justify-center relative">
              {day && (
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold transition-all ${
                    isToday
                      ? "bg-white text-zinc-900 font-bold shadow-md scale-105"
                      : "text-white/80"
                  }`}
                >
                  {day}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Main DesktopWidgets Container — draggable, initial position top-right
const DesktopWidgets = () => {
  const { windows } = useWindowsStore();
  const widgetRef = useRef(null);

  const isAnyWindowOpen = useMemo(() => {
    return Object.values(windows).some((win) => win.isOpen && !win.isMinimized);
  }, [windows]);

  useGSAP(() => {
    if (!widgetRef.current) return;

    const dragInstance = Draggable.create(widgetRef.current, {
      bounds: "#desktop-area",
      cursor: "default",
      activeCursor: "grabbing",
    });

    return () => {
      dragInstance.forEach((ins) => ins.kill());
    };
  }, []);

  return (
    <div
      className={`absolute inset-0 pointer-events-none z-0 ${isAnyWindowOpen ? "desktop-dimmed" : ""}`}
    >
      <div
        ref={widgetRef}
        className="widget-container widget-large"
        style={{
          top: "135px",
          right: "60px",
          left: "auto",
          position: "absolute",
        }}
      >
        <ClockCalendarWidget />
      </div>
    </div>
  );
};

export default DesktopWidgets;
export { DesktopWidgets };
