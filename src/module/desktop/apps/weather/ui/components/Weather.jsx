import React from "react";
import windowWrapper from "@hoc/windowWrapper";
import useWeather from "./useWeather";
import WeatherHeader from "./WeatherHeader";
import WeatherSection from "../section/WeatherSection";

const Weather = () => {
  const allProps = useWeather();

  return (
    <div className="flex flex-col h-full w-full bg-[#f6f6f6] rounded-xl overflow-hidden shadow-2xl border border-black/10 select-none text-gray-800 relative font-sans">
      <WeatherHeader
        activeCity={allProps.activeCity}
        unitMode={allProps.unitMode}
        setUnitMode={allProps.setUnitMode}
        isSidebarOpen={allProps.isSidebarOpen}
        setIsSidebarOpen={allProps.setIsSidebarOpen}
      />

      <WeatherSection {...allProps} />
    </div>
  );
};

const WeatherWindow = windowWrapper(Weather, "weather");
export default WeatherWindow;
