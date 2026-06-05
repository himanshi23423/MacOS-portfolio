import React, { useRef, useEffect } from "react";
import { Map, List } from "lucide-react";
import WeatherHero from "./WeatherHero";
import HourlyForecast from "./HourlyForecast";
import TenDayForecast from "./TenDayForecast";
import {
  UvIndexCard,
  WindCard,
  SunriseSunsetCard,
  AirQualityCard,
  HumidityCard,
  VisibilityCard,
} from "./WeatherMetricCard";

const WeatherDashboard = ({
  _activeCity,
  unitMode,
  loading,
  error,
  setError,
  setViewMode,
  cities = {},
  setActiveCityId,
  activeCityId,
}) => {
  const cityKeys = Object.keys(cities);
  const containerRef = useRef(null);
  const lastScrolledId = useRef(activeCityId);
  const isFirstRender = useRef(true);

  // Sync scroll position when activeCityId changes (e.g. dot clicks or list select)
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const activeIndex = cityKeys.indexOf(activeCityId);
      if (activeIndex !== -1) {
        const width = container.clientWidth;
        if (width > 0) {
          const targetScrollLeft = activeIndex * width;
          if (isFirstRender.current || activeCityId !== lastScrolledId.current) {
            if (isFirstRender.current) {
              isFirstRender.current = false;
              container.scrollLeft = targetScrollLeft;
            } else {
              container.scrollTo({
                left: targetScrollLeft,
                behavior: "smooth",
              });
            }
            lastScrolledId.current = activeCityId;
          }
        } else {
          // If container has no width yet (e.g. during initial layout), defer alignment
          const rAF = requestAnimationFrame(() => {
            const widthRetry = container.clientWidth;
            if (widthRetry > 0) {
              container.scrollLeft = activeIndex * widthRetry;
            }
          });
          isFirstRender.current = false;
          return () => cancelAnimationFrame(rAF);
        }
      }
    }
  }, [activeCityId, cityKeys]);

  // Adjust scroll alignment when window is resized or orientation changes
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const activeIndex = cityKeys.indexOf(activeCityId);
        if (activeIndex !== -1) {
          const container = containerRef.current;
          container.scrollLeft = activeIndex * container.clientWidth;
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeCityId, cityKeys]);

  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const width = container.clientWidth;
      if (width === 0) return;
      const scrollLeft = container.scrollLeft;

      const newIndex = Math.round(scrollLeft / width);
      const targetKey = cityKeys[newIndex];

      if (targetKey && targetKey !== activeCityId) {
        lastScrolledId.current = targetKey;
        setActiveCityId(targetKey);
      }
    }
  };

  return (
    <main className="flex-1 h-full min-h-0 flex flex-col justify-between relative bg-black select-none text-white">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-30 transition-all duration-300">
          <div className="flex flex-col items-center gap-3 bg-white/10 p-6 rounded-2xl border border-white/20 shadow-lg">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            <p className="text-xs font-semibold text-white tracking-wider">
              Fetching live weather...
            </p>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {error && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500/90 backdrop-blur-md text-white text-xs px-4 py-2.5 rounded-xl shadow-lg border border-red-400/20 z-30 flex items-center gap-2 animate-bounce">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-2 font-bold hover:text-gray-200 cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      {/* Horizontal Page Slider */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none z-10"
      >
        {cityKeys.map((key) => {
          const city = cities[key];
          return (
            <div key={key} className="w-full h-full shrink-0 snap-start relative flex flex-col">
              {/* Background gradient for this city (slides with the page, fixed vertically) */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${city.bgClass || "from-sky-400 to-blue-600"} z-0`}
              />

              {/* Scrollable Weather Content for this city */}
              <div className="absolute inset-0 overflow-y-auto thin-scrollbar p-4 space-y-4 pb-8 z-10">
                <WeatherHero activeCity={city} unitMode={unitMode} />
                <HourlyForecast activeCity={city} unitMode={unitMode} />

                <div className="space-y-4">
                  <TenDayForecast activeCity={city} unitMode={unitMode} />

                  <div className="grid grid-cols-2 gap-4">
                    <UvIndexCard uv={city.uv} uvLabel={city.uvLabel} />
                    <WindCard
                      windSpeed={city.windSpeed}
                      windDir={city.windDir}
                      windAngle={city.windAngle}
                    />
                    <SunriseSunsetCard sunrise={city.sunrise} sunset={city.sunset} />
                    <AirQualityCard aqi={city.aqi} aqiLabel={city.aqiLabel} />
                    <HumidityCard humidity={city.humidity} />
                    <VisibilityCard visibility={city.visibility} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* iOS Style Bottom Navigation Bar */}
      <div className="z-10 bg-white/90 backdrop-blur-md border-t border-black/10 h-[50px] flex justify-between items-center px-6 text-gray-800 shrink-0">
        <button className="opacity-80 hover:opacity-100 transition-opacity active:scale-90 duration-200 cursor-pointer">
          <Map className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div className="flex items-center gap-1.5">
          {cityKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveCityId(key)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeCityId === key ? "bg-gray-800 scale-125" : "bg-gray-800/35"
              }`}
              title={cities[key]?.name}
            />
          ))}
        </div>

        <button
          onClick={() => setViewMode("list")}
          className="opacity-80 hover:opacity-100 transition-opacity active:scale-90 duration-200 cursor-pointer"
        >
          <List className="w-5 h-5 stroke-[1.5]" />
        </button>
      </div>
    </main>
  );
};

export default WeatherDashboard;
