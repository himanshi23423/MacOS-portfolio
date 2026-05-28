import React from "react";
import WeatherSidebarSection from "./WeatherSidebarSection";
import WeatherDashboardSection from "./WeatherDashboardSection";

const WeatherSection = (props) => {
  const {
    citiesData,
    activeCityId,
    setActiveCityId,
    isSidebarOpen,
    setIsSidebarOpen,
    loading,
    unitMode,
    setUnitMode,
    activeCity,
    handleSearch,
  } = props;

  return (
    <div className="flex-1 flex min-h-0 relative">
      <WeatherSidebarSection
        cities={citiesData}
        activeCity={activeCityId}
        onSelectCity={setActiveCityId}
        onAddCity={handleSearch}
        isLoading={loading}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={setIsSidebarOpen}
        unitMode={unitMode}
      />
      <WeatherDashboardSection
        activeCity={activeCity}
        weatherData={activeCity}
        isLoading={loading}
        unit={unitMode}
        onToggleUnit={() => setUnitMode(prev => prev === "c" ? "f" : prev === "f" ? "both" : "c")}
      />
    </div>
  );
};

export default WeatherSection;
