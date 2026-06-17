import React, { useState, useEffect, useRef } from "react";
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

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(800);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const isNarrow = containerWidth < 700;

  useEffect(() => {
    if (isNarrow) {
      allProps.setIsSidebarOpen(false);
    } else {
      allProps.setIsSidebarOpen(true);
    }
  }, [isNarrow, allProps.setIsSidebarOpen]);

  useEffect(() => {
    if (windows.weather?.data?.openAbout) {
      setShowAbout(true);
      setWindowData("weather", { ...windows.weather.data, openAbout: false });
    }
  }, [windows.weather?.data?.openAbout, windows.weather?.data, setWindowData]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full w-full bg-[#f6f6f6] rounded-xl overflow-hidden shadow-2xl border border-black/10 select-none text-gray-800 relative font-sans"
    >
      <WeatherHeader
        activeCity={allProps.activeCity}
        unitMode={allProps.unitMode}
        setUnitMode={allProps.setUnitMode}
        isSidebarOpen={allProps.isSidebarOpen}
        setIsSidebarOpen={allProps.setIsSidebarOpen}
        isNarrow={isNarrow}
      />

      <WeatherSection {...allProps} isNarrow={isNarrow} />
      <WeatherAboutModal show={showAbout} onClose={() => setShowAbout(false)} />
    </div>
  );
};

const WeatherWindow = windowWrapper(Weather, "weather");
export default WeatherWindow;
