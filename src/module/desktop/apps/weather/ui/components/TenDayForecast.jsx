import React from "react";
import { renderIcon } from "../../data/weatherUtils";

const TenDayForecast = ({ activeCity, unitMode }) => {
  return (
    <section className="bg-white/10 backdrop-blur-md rounded-2xl p-4 space-y-3.5 border border-white/10 shadow-sm">
      <h3 className="text-[10px] font-bold uppercase tracking-wider text-white/50 leading-none">
        10-Day Forecast
      </h3>
      <div className="space-y-3 text-xs">
        {activeCity.forecast?.map((f, i) => {
          const minC =
            f.tempMinC !== undefined
              ? f.tempMinC
              : f.tempMin !== undefined
                ? f.tempMin <= 45
                  ? f.tempMin
                  : Math.round(((f.tempMin - 32) * 5) / 9)
                : "--";
          const minF =
            f.tempMinF !== undefined
              ? f.tempMinF
              : f.tempMin !== undefined
                ? f.tempMin > 45
                  ? f.tempMin
                  : Math.round((f.tempMin * 9) / 5 + 32)
                : "--";
          const maxC =
            f.tempMaxC !== undefined
              ? f.tempMaxC
              : f.tempMax !== undefined
                ? f.tempMax <= 45
                  ? f.tempMax
                  : Math.round(((f.tempMax - 32) * 5) / 9)
                : "--";
          const maxF =
            f.tempMaxF !== undefined
              ? f.tempMaxF
              : f.tempMax !== undefined
                ? f.tempMax > 45
                  ? f.tempMax
                  : Math.round((f.tempMax * 9) / 5 + 32)
                : "--";
          return (
            <div key={i} className="flex items-center justify-between gap-1.5 font-semibold">
              <span className="text-left opacity-80" style={{ width: "40px", minWidth: "40px" }}>
                {f.day}
              </span>
              <div className="flex justify-center" style={{ width: "24px", minWidth: "24px" }}>
                {renderIcon(f.icon, "w-4 h-4")}
              </div>
              <div
                className="flex-1 flex items-center justify-between gap-2"
                style={{ maxWidth: "110px", minWidth: "80px" }}
              >
                <div
                  className="flex flex-col items-end leading-none text-[9px] opacity-65"
                  style={{ width: "32px", minWidth: "32px" }}
                >
                  {unitMode === "both" && (
                    <>
                      <span>{minC}°C</span>
                      <span className="text-[8px] text-white/60 mt-0.5">{minF}°F</span>
                    </>
                  )}
                  {unitMode === "c" && <span>{minC}°C</span>}
                  {unitMode === "f" && <span>{minF}°F</span>}
                </div>
                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden relative">
                  <div
                    className="absolute h-full bg-gradient-to-r from-orange-400 to-amber-300 rounded-full"
                    style={{ left: "20%", right: "15%" }}
                  />
                </div>
                <div
                  className="flex flex-col items-end leading-none text-[9px]"
                  style={{ width: "32px", minWidth: "32px" }}
                >
                  {unitMode === "both" && (
                    <>
                      <span>{maxC}°C</span>
                      <span className="text-[8px] text-white/60 mt-0.5">{maxF}°F</span>
                    </>
                  )}
                  {unitMode === "c" && <span>{maxC}°C</span>}
                  {unitMode === "f" && <span>{maxF}°F</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TenDayForecast;
