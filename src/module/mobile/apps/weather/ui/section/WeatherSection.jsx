import React from "react";
import WeatherSidebarSection from "./WeatherSidebarSection";
import WeatherDashboardSection from "./WeatherDashboardSection";

const WeatherSection = (props) => {
  const {
    citiesData,
    activeCityId,
    setActiveCityId,
    loading,
    unitMode,
    setUnitMode,
    activeCity,
    handleSearch,
    viewMode,
    setViewMode,
  } = props;

  return (
    <div className="flex-1 flex min-h-0 relative bg-black">
      {viewMode === "list" ? (
        <WeatherSidebarSection
          cities={citiesData}
          activeCity={activeCityId}
          onSelectCity={setActiveCityId}
          onAddCity={handleSearch}
          isLoading={loading}
          isSidebarOpen={true}
          onToggleSidebar={() => setViewMode("dashboard")}
          unitMode={unitMode}
          setViewMode={setViewMode}
        />
      ) : (
        <WeatherDashboardSection
          activeCity={activeCity}
          weatherData={activeCity}
          isLoading={loading}
          unit={unitMode}
          onToggleUnit={() =>
            setUnitMode((prev) => (prev === "c" ? "f" : prev === "f" ? "both" : "c"))
          }
          setViewMode={setViewMode}
          cities={citiesData}
          setActiveCityId={setActiveCityId}
          activeCityId={activeCityId}
        />
      )}
    </div>
  );
};

export default WeatherSection;
