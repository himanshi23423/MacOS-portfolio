import React, { useState, useEffect } from "react";
import windowWrapper from "@hoc/windowWrapper";
import useWindowsStore from "@store/window";
import useWeather from "../../hooks/useWeather";
import WeatherHeader from "./WeatherHeader";
import WeatherSection from "../section/WeatherSection";
import WeatherAboutModal from "./WeatherAboutModal";

const Weather = () => {
  const { windows, setWindowData } = useWindowsStore();
  const [showAbout, setShowAbout] = useState(false);
  const allProps = useWeather();

  useEffect(() => {
    if (windows.weather?.data?.openAbout) {
      setShowAbout(true);
      setWindowData("weather", { ...windows.weather.data, openAbout: false });
    }
  }, [windows.weather?.data?.openAbout, windows.weather?.data, setWindowData]);

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
      <WeatherAboutModal show={showAbout} onClose={() => setShowAbout(false)} />
    </div>
  );
};

const WeatherWindow = windowWrapper(Weather, "weather");
export default WeatherWindow;
