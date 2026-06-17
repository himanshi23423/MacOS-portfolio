import React, { useState } from "react";
import WeatherSidebar from "../components/WeatherSidebar";

const WeatherSidebarSection = ({
  cities = {},
  activeCity: activeCityId,
  onSelectCity,
  onAddCity,
  _onRemoveCity,
  isLoading,
  isSidebarOpen,
  onToggleSidebar,
  unitMode = "both",
  isNarrow,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const filteredCityKeys = Object.keys(cities).filter((key) => {
    const city = cities[key];
    if (!city) return false;
    return (
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.condition.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    setLocalLoading(true);
    try {
      await onAddCity(query.trim());
      setSearchQuery("");
    } catch {
      // handled by parent
    } finally {
      setLocalLoading(false);
    }
  };

  const showLoading = isLoading || localLoading;

  return (
    <>
      {showLoading && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-30 transition-all duration-300">
          <div className="flex flex-col items-center gap-3 bg-white/10 p-6 rounded-2xl border border-white/20 shadow-lg">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            <p className="text-xs font-semibold text-white tracking-wider">Fetching weather...</p>
          </div>
        </div>
      )}
      {isNarrow && isSidebarOpen && (
        <div
          onClick={() => onToggleSidebar(false)}
          className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-10 animate-fade-in cursor-pointer"
        />
      )}
      <WeatherSidebar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        filteredCityKeys={filteredCityKeys}
        citiesData={cities}
        activeCityId={activeCityId}
        setActiveCityId={onSelectCity}
        setIsSidebarOpen={onToggleSidebar}
        isSidebarOpen={isSidebarOpen}
        isNarrow={isNarrow}
        unitMode={unitMode}
      />
    </>
  );
};

export default WeatherSidebarSection;
