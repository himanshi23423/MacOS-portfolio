import React from "react";
import { Search } from "lucide-react";
import { getSafeTemp, renderIcon } from "../../data/weatherUtils";

const WeatherSidebar = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  filteredCityKeys,
  citiesData,
  activeCityId,
  setActiveCityId,
  setIsSidebarOpen,
  isSidebarOpen,
  isNarrow,
  unitMode,
}) => {
  return (
    <aside
      className={`
      absolute inset-y-0 left-0 bg-gray-50 flex flex-col z-20 transition-all duration-300 shrink-0 h-full
      ${isNarrow ? "absolute bg-gray-50/95 shadow-lg" : "relative"}
      ${
        isSidebarOpen
          ? "w-56 min-w-[224px] max-w-[224px] p-3.5 border-r border-[#d1d1d1] translate-x-0 opacity-100"
          : "w-0 min-w-0 max-w-0 p-0 border-r-0 -translate-x-full opacity-0 overflow-hidden pointer-events-none"
      }
    `}
    >
      <div className="relative flex items-center bg-gray-200/60 border border-gray-300/40 rounded-lg px-2.5 py-1.5 shrink-0 mb-4">
        <button
          onClick={() => searchQuery.trim() && handleSearch(searchQuery)}
          className="focus:outline-none cursor-pointer text-gray-400 hover:text-blue-500 transition-colors mr-2 flex items-center justify-center"
          aria-label="Search"
        >
          <Search className="w-4 h-4 shrink-0" />
        </button>
        <input
          type="text"
          placeholder="Search City (Press Enter)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchQuery.trim()) {
              handleSearch(searchQuery);
            }
          }}
          className="w-full bg-transparent text-xs focus:outline-none border-none outline-none text-gray-800 placeholder-gray-400"
        />
      </div>

      <div className="flex-1 overflow-y-auto thin-scrollbar space-y-2">
        {filteredCityKeys.map((key) => {
          const city = citiesData[key];
          const isActive = activeCityId === key;
          const temps = getSafeTemp(city);

          return (
            <button
              key={key}
              onClick={() => {
                setActiveCityId(key);
                if (isNarrow) {
                  setIsSidebarOpen(false);
                }
              }}
              className={`w-full p-3 rounded-xl text-left transition-all duration-200 relative flex items-center justify-between text-white overflow-hidden shadow-sm hover:shadow-md cursor-pointer ${
                isActive ? "ring-2 ring-blue-500/50" : ""
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${city.bgClass} opacity-90 z-0`}
              />
              <div className="relative z-10 space-y-0.5">
                <h4 className="font-bold text-xs leading-none">{city.name}</h4>
                <p className="text-[10px] text-white/70 leading-none">{city.condition}</p>
              </div>
              <div className="relative z-10 flex items-center gap-2">
                {renderIcon(city.hourly?.[0]?.icon || "sunny", "w-5 h-5")}
                <div className="text-right flex flex-col justify-center">
                  {unitMode === "both" && (
                    <>
                      <span className="font-bold text-base tracking-tighter leading-none">
                        {temps.tempC}°C
                      </span>
                      <span className="text-[10px] opacity-75 font-semibold leading-none mt-0.5">
                        {temps.tempF}°F
                      </span>
                    </>
                  )}
                  {unitMode === "c" && (
                    <span className="font-bold text-base tracking-tighter leading-none">
                      {temps.tempC}°C
                    </span>
                  )}
                  {unitMode === "f" && (
                    <span className="font-bold text-base tracking-tighter leading-none">
                      {temps.tempF}°F
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
        {filteredCityKeys.length === 0 && (
          <p className="text-xs text-gray-400 italic text-center pt-4">No cities match query.</p>
        )}
      </div>
    </aside>
  );
};

export default WeatherSidebar;
