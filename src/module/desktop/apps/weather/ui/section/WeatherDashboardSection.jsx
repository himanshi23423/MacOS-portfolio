import React, { useState } from "react";
import WeatherDashboard from "../components/WeatherDashboard";

const WeatherDashboardSection = ({
  activeCity,
  weatherData,
  isLoading,
  unit: unitMode = "both",
  _onToggleUnit,
  isNarrow,
}) => {
  const city = weatherData || activeCity;
  const [error, setError] = useState(null);

  if (!city) {
    return (
      <main className="flex-1 overflow-y-auto thin-scrollbar bg-gradient-to-b from-sky-400 to-blue-600 text-white p-6 flex items-center justify-center">
        <p className="text-sm opacity-70">Select a city to view weather</p>
      </main>
    );
  }

  return (
    <WeatherDashboard
      activeCity={city}
      unitMode={unitMode}
      loading={isLoading}
      error={error}
      setError={setError}
      isNarrow={isNarrow}
    />
  );
};

export default WeatherDashboardSection;
