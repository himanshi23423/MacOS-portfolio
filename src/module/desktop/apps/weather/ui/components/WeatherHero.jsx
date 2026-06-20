import React from "react";
import { getSafeTemp } from "../../data/weatherUtils";

const WeatherHero = ({ activeCity, unitMode }) => {
  const activeTemps = getSafeTemp(activeCity);

  return (
    <div className="text-center space-y-1.5 py-4 shrink-0">
      <h2 className="text-2xl font-bold tracking-tight drop-shadow-sm">{activeCity.name}</h2>
      <div className="flex items-baseline justify-center gap-2 drop-shadow-sm">
        {unitMode === "both" && (
          <>
            <span className="text-6xl font-extralight tracking-tighter">{activeTemps.tempC}°C</span>
            <span className="text-2xl font-light text-white/70">/ {activeTemps.tempF}°F</span>
          </>
        )}
        {unitMode === "c" && (
          <span className="text-6xl font-extralight tracking-tighter">{activeTemps.tempC}°C</span>
        )}
        {unitMode === "f" && (
          <span className="text-6xl font-extralight tracking-tighter">{activeTemps.tempF}°F</span>
        )}
      </div>
      <p className="text-sm font-semibold tracking-wide drop-shadow-xs">{activeCity.condition}</p>
      <div className="flex justify-center gap-3 text-xs font-semibold opacity-85">
        {unitMode === "both" && (
          <>
            <span>
              H: {activeTemps.highC}°C / {activeTemps.highF}°F
            </span>
            <span>
              L: {activeTemps.lowC}°C / {activeTemps.lowF}°F
            </span>
          </>
        )}
        {unitMode === "c" && (
          <>
            <span>H: {activeTemps.highC}°C</span>
            <span>L: {activeTemps.lowC}°C</span>
          </>
        )}
        {unitMode === "f" && (
          <>
            <span>H: {activeTemps.highF}°F</span>
            <span>L: {activeTemps.lowF}°F</span>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherHero;
