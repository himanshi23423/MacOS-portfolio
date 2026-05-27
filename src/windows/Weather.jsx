import React, { useState, useEffect } from "react";
import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/windowWrapper";
import useWindowsStore from "#store/window";
import { 
  Search, ChevronLeft, Sun, Cloud, CloudRain, CloudFog, 
  Wind, Compass, Sunrise, Sunset, Eye, Droplets, Thermometer, ShieldAlert, Clock
} from "lucide-react";

// Mock Weather Data mapped by City ID
const WEATHER_DATA = {
  delhi: {
    name: "Delhi",
    tempC: 29,
    tempF: 85,
    condition: "Sunny",
    bgClass: "from-sky-400 to-blue-600",
    highC: 32,
    highF: 90,
    lowC: 24,
    lowF: 75,
    aqi: 120,
    aqiLabel: "Poor",
    uv: 8,
    uvLabel: "Very High",
    windSpeed: 10,
    windDir: "W",
    windAngle: 270,
    humidity: 50,
    visibility: 5,
    sunrise: "05:25 AM",
    sunset: "07:12 PM",
    hourly: [
      { time: "Now", tempC: 29, tempF: 85, icon: "sunny" },
      { time: "11 PM", tempC: 28, tempF: 82, icon: "clear" },
      { time: "12 AM", tempC: 26, tempF: 79, icon: "clear" },
      { time: "1 AM", tempC: 25, tempF: 77, icon: "clear" },
      { time: "2 AM", tempC: 24, tempF: 75, icon: "clear" },
      { time: "3 AM", tempC: 23, tempF: 74, icon: "clear" },
      { time: "4 AM", tempC: 23, tempF: 73, icon: "clear" },
      { time: "5 AM", tempC: 22, tempF: 72, icon: "clear" },
      { time: "6 AM", tempC: 23, tempF: 74, icon: "sunny" },
      { time: "7 AM", tempC: 26, tempF: 78, icon: "sunny" },
      { time: "8 AM", tempC: 28, tempF: 82, icon: "sunny" },
      { time: "9 AM", tempC: 29, tempF: 85, icon: "sunny" },
    ],
    forecast: [
      { day: "Today", tempMinC: 24, tempMinF: 75, tempMaxC: 32, tempMaxF: 90, icon: "sunny", label: "Sunny" },
      { day: "Wed", tempMinC: 24, tempMinF: 76, tempMaxC: 33, tempMaxF: 91, icon: "sunny", label: "Sunny" },
      { day: "Thu", tempMinC: 23, tempMinF: 74, tempMaxC: 32, tempMaxF: 89, icon: "mostly-sunny", label: "Mostly Sunny" },
      { day: "Fri", tempMinC: 24, tempMinF: 75, tempMaxC: 32, tempMaxF: 90, icon: "sunny", label: "Sunny" },
      { day: "Sat", tempMinC: 23, tempMinF: 73, tempMaxC: 31, tempMaxF: 88, icon: "cloudy", label: "Partly Cloudy" },
      { day: "Sun", tempMinC: 24, tempMinF: 75, tempMaxC: 32, tempMaxF: 90, icon: "sunny", label: "Sunny" },
      { day: "Mon", tempMinC: 24, tempMinF: 76, tempMaxC: 33, tempMaxF: 91, icon: "sunny", label: "Sunny" },
      { day: "Tue", tempMinC: 23, tempMinF: 74, tempMaxC: 32, tempMaxF: 89, icon: "mostly-sunny", label: "Mostly Sunny" },
      { day: "Wed", tempMinC: 24, tempMinF: 75, tempMaxC: 32, tempMaxF: 90, icon: "sunny", label: "Sunny" },
      { day: "Thu", tempMinC: 23, tempMinF: 73, tempMaxC: 31, tempMaxF: 88, icon: "cloudy", label: "Partly Cloudy" },
    ]
  },
  uttarpradesh: {
    name: "Uttar Pradesh",
    tempC: 28,
    tempF: 82,
    condition: "Haze",
    bgClass: "from-amber-600/70 to-orange-700/80",
    highC: 31,
    highF: 88,
    lowC: 22,
    lowF: 72,
    aqi: 110,
    aqiLabel: "Poor",
    uv: 7,
    uvLabel: "High",
    windSpeed: 8,
    windDir: "NW",
    windAngle: 315,
    humidity: 55,
    visibility: 4,
    sunrise: "05:22 AM",
    sunset: "07:08 PM",
    hourly: [
      { time: "Now", tempC: 28, tempF: 82, icon: "haze" },
      { time: "11 PM", tempC: 27, tempF: 80, icon: "haze" },
      { time: "12 AM", tempC: 26, tempF: 78, icon: "haze" },
      { time: "1 AM", tempC: 24, tempF: 76, icon: "haze" },
      { time: "2 AM", tempC: 23, tempF: 74, icon: "haze" },
      { time: "3 AM", tempC: 23, tempF: 73, icon: "haze" },
      { time: "4 AM", tempC: 22, tempF: 72, icon: "haze" },
      { time: "5 AM", tempC: 22, tempF: 71, icon: "haze" },
      { time: "6 AM", tempC: 23, tempF: 73, icon: "haze" },
      { time: "7 AM", tempC: 24, tempF: 75, icon: "haze" },
      { time: "8 AM", tempC: 26, tempF: 78, icon: "haze" },
      { time: "9 AM", tempC: 28, tempF: 82, icon: "haze" },
    ],
    forecast: [
      { day: "Today", tempMinC: 22, tempMinF: 72, tempMaxC: 31, tempMaxF: 88, icon: "haze", label: "Haze" },
      { day: "Wed", tempMinC: 23, tempMinF: 73, tempMaxC: 32, tempMaxF: 89, icon: "haze", label: "Haze" },
      { day: "Thu", tempMinC: 22, tempMinF: 71, tempMaxC: 30, tempMaxF: 86, icon: "mostly-sunny", label: "Mostly Sunny" },
      { day: "Fri", tempMinC: 22, tempMinF: 72, tempMaxC: 31, tempMaxF: 87, icon: "sunny", label: "Sunny" },
      { day: "Sat", tempMinC: 21, tempMinF: 70, tempMaxC: 29, tempMaxF: 85, icon: "cloudy", label: "Partly Cloudy" },
      { day: "Sun", tempMinC: 22, tempMinF: 72, tempMaxC: 31, tempMaxF: 88, icon: "haze", label: "Haze" },
      { day: "Mon", tempMinC: 23, tempMinF: 73, tempMaxC: 32, tempMaxF: 89, icon: "haze", label: "Haze" },
      { day: "Tue", tempMinC: 22, tempMinF: 71, tempMaxC: 30, tempMaxF: 86, icon: "mostly-sunny", label: "Mostly Sunny" },
      { day: "Wed", tempMinC: 22, tempMinF: 72, tempMaxC: 31, tempMaxF: 87, icon: "sunny", label: "Sunny" },
      { day: "Thu", tempMinC: 21, tempMinF: 70, tempMaxC: 29, tempMaxF: 85, icon: "cloudy", label: "Partly Cloudy" },
    ]
  },
  jaipur: {
    name: "Jaipur",
    tempC: 32,
    tempF: 90,
    condition: "Sunny",
    bgClass: "from-sky-400 to-blue-600",
    highC: 35,
    highF: 95,
    lowC: 26,
    lowF: 78,
    aqi: 95,
    aqiLabel: "Moderate",
    uv: 9,
    uvLabel: "Very High",
    windSpeed: 12,
    windDir: "W",
    windAngle: 270,
    humidity: 40,
    visibility: 6,
    sunrise: "05:32 AM",
    sunset: "07:18 PM",
    hourly: [
      { time: "Now", tempC: 32, tempF: 90, icon: "sunny" },
      { time: "11 PM", tempC: 31, tempF: 87, icon: "clear" },
      { time: "12 AM", tempC: 29, tempF: 84, icon: "clear" },
      { time: "1 AM", tempC: 28, tempF: 82, icon: "clear" },
      { time: "2 AM", tempC: 27, tempF: 80, icon: "clear" },
      { time: "3 AM", tempC: 26, tempF: 79, icon: "clear" },
      { time: "4 AM", tempC: 26, tempF: 78, icon: "clear" },
      { time: "5 AM", tempC: 25, tempF: 77, icon: "clear" },
      { time: "6 AM", tempC: 26, tempF: 79, icon: "sunny" },
      { time: "7 AM", tempC: 28, tempF: 82, icon: "sunny" },
      { time: "8 AM", tempC: 30, tempF: 86, icon: "sunny" },
      { time: "9 AM", tempC: 32, tempF: 90, icon: "sunny" },
    ],
    forecast: [
      { day: "Today", tempMinC: 26, tempMinF: 78, tempMaxC: 35, tempMaxF: 95, icon: "sunny", label: "Sunny" },
      { day: "Wed", tempMinC: 26, tempMinF: 79, tempMaxC: 36, tempMaxF: 96, icon: "sunny", label: "Sunny" },
      { day: "Thu", tempMinC: 25, tempMinF: 77, tempMaxC: 34, tempMaxF: 94, icon: "sunny", label: "Sunny" },
      { day: "Fri", tempMinC: 26, tempMinF: 78, tempMaxC: 35, tempMaxF: 95, icon: "sunny", label: "Sunny" },
      { day: "Sat", tempMinC: 24, tempMinF: 76, tempMaxC: 33, tempMaxF: 92, icon: "mostly-sunny", label: "Mostly Sunny" },
      { day: "Sun", tempMinC: 26, tempMinF: 78, tempMaxC: 35, tempMaxF: 95, icon: "sunny", label: "Sunny" },
      { day: "Mon", tempMinC: 26, tempMinF: 79, tempMaxC: 36, tempMaxF: 96, icon: "sunny", label: "Sunny" },
      { day: "Tue", tempMinC: 25, tempMinF: 77, tempMaxC: 34, tempMaxF: 94, icon: "sunny", label: "Sunny" },
      { day: "Wed", tempMinC: 26, tempMinF: 78, tempMaxC: 35, tempMaxF: 95, icon: "sunny", label: "Sunny" },
      { day: "Thu", tempMinC: 24, tempMinF: 76, tempMaxC: 33, tempMaxF: 92, icon: "mostly-sunny", label: "Mostly Sunny" },
    ]
  }
};const Weather = () => {
  const [citiesData, setCitiesData] = useState(WEATHER_DATA);
  const [activeCityId, setActiveCityId] = useState("delhi");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unitMode, setUnitMode] = useState("both"); // "both", "c", "f"

  const activeCity = citiesData[activeCityId] || citiesData.delhi || WEATHER_DATA.delhi;

  // Robust extraction of temperature values to support both current & cached HMR schema formats
  const getSafeTemp = (cityObj) => {
    if (!cityObj) return { tempC: "--", tempF: "--", highC: "--", highF: "--", lowC: "--", lowF: "--" };
    
    const tempC = cityObj.tempC !== undefined ? cityObj.tempC : 
                  (cityObj.temp !== undefined ? (cityObj.temp <= 45 ? cityObj.temp : Math.round((cityObj.temp - 32) * 5 / 9)) : "--");
                  
    const tempF = cityObj.tempF !== undefined ? cityObj.tempF : 
                  (cityObj.temp !== undefined ? (cityObj.temp > 45 ? cityObj.temp : Math.round((cityObj.temp * 9 / 5) + 32)) : "--");

    const highC = cityObj.highC !== undefined ? cityObj.highC : 
                  (cityObj.high !== undefined ? (cityObj.high <= 45 ? cityObj.high : Math.round((cityObj.high - 32) * 5 / 9)) : "--");

    const highF = cityObj.highF !== undefined ? cityObj.highF : 
                  (cityObj.high !== undefined ? (cityObj.high > 45 ? cityObj.high : Math.round((cityObj.high * 9 / 5) + 32)) : "--");

    const lowC = cityObj.lowC !== undefined ? cityObj.lowC : 
                  (cityObj.low !== undefined ? (cityObj.low <= 45 ? cityObj.low : Math.round((cityObj.low - 32) * 5 / 9)) : "--");

    const lowF = cityObj.lowF !== undefined ? cityObj.lowF : 
                  (cityObj.low !== undefined ? (cityObj.low > 45 ? cityObj.low : Math.round((cityObj.low * 9 / 5) + 32)) : "--");

    return { tempC, tempF, highC, highF, lowC, lowF };
  };

  const activeTemps = getSafeTemp(activeCity);

  const filteredCityKeys = Object.keys(citiesData).filter((key) => {
    const city = citiesData[key];
    if (!city) return false;
    return city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           city.condition.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Parse wttr.in format "%C %t"
  const parseWttrResponse = (text) => {
    const trimmed = text.trim();
    const match = trimmed.match(/^(.*?)\s+([+-]?\d+°[CF])$/i);
    let condition = "Clear";
    let tempStr = "65°F";
    if (match) {
      condition = match[1].trim();
      tempStr = match[2].trim();
    } else {
      const lastSpaceIdx = trimmed.lastIndexOf(" ");
      if (lastSpaceIdx !== -1) {
        condition = trimmed.substring(0, lastSpaceIdx).trim();
        tempStr = trimmed.substring(lastSpaceIdx + 1).trim();
      } else {
        condition = trimmed || "Sunny";
      }
    }
    if (tempStr.startsWith("+")) {
      tempStr = tempStr.substring(1);
    }
    return { condition, tempStr };
  };

  const generateWeatherData = (cityName, condition, tempStr) => {
    const tempMatch = tempStr.match(/([+-]?\d+)(°[CF])/);
    let tempC = 20;
    let tempF = 68;

    if (tempMatch) {
      const val = parseInt(tempMatch[1], 10);
      const unit = tempMatch[2].toUpperCase();
      if (unit.includes("C")) {
        tempC = val;
        tempF = Math.round((val * 9/5) + 32);
      } else {
        tempF = val;
        tempC = Math.round((val - 32) * 5/9);
      }
    } else {
      const numMatch = tempStr.match(/([+-]?\d+)/);
      if (numMatch) {
        const val = parseInt(numMatch[1], 10);
        if (val <= 45) {
          tempC = val;
          tempF = Math.round((val * 9/5) + 32);
        } else {
          tempF = val;
          tempC = Math.round((val - 32) * 5/9);
        }
      }
    }

    const condLower = condition.toLowerCase();
    let icon = "sunny";
    let bgClass = "from-sky-400 to-blue-600";
    if (condLower.includes("cloud") || condLower.includes("overcast")) {
      icon = "cloudy";
      bgClass = "from-zinc-400 to-zinc-600";
    } else if (condLower.includes("rain") || condLower.includes("drizzle") || condLower.includes("shower") || condLower.includes("precip")) {
      icon = "rain";
      bgClass = "from-slate-500 to-slate-700";
    } else if (condLower.includes("fog") || condLower.includes("haze") || condLower.includes("mist") || condLower.includes("smoke")) {
      icon = "haze";
      bgClass = "from-amber-600/70 to-orange-700/80";
    } else if (condLower.includes("snow") || condLower.includes("ice") || condLower.includes("sleet") || condLower.includes("frost")) {
      icon = "cloudy";
      bgClass = "from-blue-200 to-sky-400";
    } else if (condLower.includes("sunny") || condLower.includes("clear")) {
      icon = "sunny";
      bgClass = "from-sky-400 to-blue-600";
    } else if (condLower.includes("partly") || condLower.includes("mostly")) {
      icon = "mostly-sunny";
    }

    const highOffset = Math.floor(Math.random() * 4) + 2;
    const lowOffset = Math.floor(Math.random() * 4) + 4;
    const highC = tempC + highOffset;
    const highF = tempF + Math.round(highOffset * 1.8);
    const lowC = tempC - lowOffset;
    const lowF = tempF - Math.round(lowOffset * 1.8);

    const aqi = Math.floor(Math.random() * 75) + 15;
    const aqiLabel = aqi < 50 ? "Good" : aqi < 100 ? "Moderate" : "Poor";
    const uv = Math.floor(Math.random() * 9) + 1;
    const uvLabel = uv < 3 ? "Low" : uv < 6 ? "Moderate" : uv < 8 ? "High" : "Very High";
    const windSpeed = Math.floor(Math.random() * 12) + 4;
    const windDir = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.floor(Math.random() * 8)];
    const windAngle = Math.floor(Math.random() * 360);
    const humidity = Math.floor(Math.random() * 35) + 45;
    const visibility = Math.floor(Math.random() * 5) + 6;
    const sunrise = `05:${String(Math.floor(Math.random() * 30) + 20).padStart(2, '0')} AM`;
    const sunset = `08:${String(Math.floor(Math.random() * 30) + 10).padStart(2, '0')} PM`;

    const currentHour = new Date().getHours();
    const hourly = Array.from({ length: 12 }).map((_, i) => {
      const hr = (currentHour + i) % 24;
      const timeLabel = i === 0 ? "Now" : `${hr % 12 || 12} ${hr >= 12 ? "PM" : "AM"}`;
      const offsetC = Math.round(Math.sin((hr - 6) / 24 * 2 * Math.PI) * 3);
      const offsetF = Math.round(offsetC * 1.8);
      return {
        time: timeLabel,
        tempC: tempC + offsetC,
        tempF: tempF + offsetF,
        icon: offsetC > 1 ? "sunny" : offsetC < -1 ? "cloudy" : icon
      };
    });

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentDayIndex = new Date().getDay();
    const forecast = Array.from({ length: 10 }).map((_, i) => {
      const dayLabel = i === 0 ? "Today" : daysOfWeek[(currentDayIndex + i) % 7];
      const offsetMinC = -Math.floor(Math.random() * 3) - 3;
      const offsetMaxC = Math.floor(Math.random() * 3) + 1;
      return {
        day: dayLabel,
        tempMinC: tempC + offsetMinC,
        tempMinF: tempF + Math.round(offsetMinC * 1.8),
        tempMaxC: tempC + offsetMaxC,
        tempMaxF: tempF + Math.round(offsetMaxC * 1.8),
        icon: i % 3 === 0 ? icon : i % 3 === 1 ? "mostly-sunny" : "cloudy",
        label: condition
      };
    });

    return {
      name: cityName,
      tempC,
      tempF,
      condition,
      bgClass,
      highC,
      highF,
      lowC,
      lowF,
      aqi,
      aqiLabel,
      uv,
      uvLabel,
      windSpeed,
      windDir,
      windAngle,
      humidity,
      visibility,
      sunrise,
      sunset,
      hourly,
      forecast
    };
  };

  const fetchCityWeather = async (cityName, isNewCity = false) => {
    try {
      const formattedCity = cityName.trim();
      if (!formattedCity) return;
      const response = await fetch(`https://wttr.in/${encodeURIComponent(formattedCity)}?format=%C+%t`);
      if (!response.ok) throw new Error("Failed to fetch weather data");
      let text = await response.text();
      if (!text || text.includes("Unknown location") || text.includes("Sorry")) {
        throw new Error(`Could not find weather for "${cityName}"`);
      }

      let condition = "Clear";
      let tempStr = "65°F";

      // If wttr.in returned an HTML page (because of browser User-Agent), fall back to JSON format
      if (text.trim().startsWith("<")) {
        const jsonResponse = await fetch(`https://wttr.in/${encodeURIComponent(formattedCity)}?format=j1`);
        if (!jsonResponse.ok) throw new Error("Failed to fetch weather JSON");
        const jsonData = await jsonResponse.json();
        const current = jsonData.current_condition?.[0];
        if (!current) throw new Error("Invalid weather data format");

        condition = current.weatherDesc?.[0]?.value || "Clear";
        const tempC = current.temp_C || "20";
        const tempF = current.temp_F || "68";
        // Check user preferences or navigator language to decide unit
        const isUS = navigator.language === "en-US" || navigator.languages?.includes("en-US");
        tempStr = isUS ? `+${tempF}°F` : `+${tempC}°C`;
      } else {
        const parsed = parseWttrResponse(text);
        condition = parsed.condition;
        tempStr = parsed.tempStr;
      }

      const generated = generateWeatherData(formattedCity, condition, tempStr);
      const key = formattedCity.toLowerCase().replace(/\s+/g, "");
      setCitiesData(prev => ({
        ...prev,
        [key]: generated
      }));
      if (isNewCity) {
        setActiveCityId(key);
      }
    } catch (err) {
      console.error(err);
      if (isNewCity) {
        setError(err.message || "Failed to fetch weather");
        setTimeout(() => setError(null), 5000);
      }
    }
  };

  const handleSearch = async (query) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    const key = trimmedQuery.toLowerCase().replace(/\s+/g, "");
    if (citiesData[key]) {
      setActiveCityId(key);
      setSearchQuery("");
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://wttr.in/${encodeURIComponent(trimmedQuery)}?format=%C+%t`);
      if (!response.ok) throw new Error("Failed to fetch weather data");
      let text = await response.text();
      if (!text || text.includes("Unknown location") || text.includes("Sorry")) {
        throw new Error(`Could not find weather for "${trimmedQuery}"`);
      }

      let condition = "Clear";
      let tempStr = "65°F";

      if (text.trim().startsWith("<")) {
        const jsonResponse = await fetch(`https://wttr.in/${encodeURIComponent(trimmedQuery)}?format=j1`);
        if (!jsonResponse.ok) throw new Error("Failed to fetch weather JSON");
        const jsonData = await jsonResponse.json();
        const current = jsonData.current_condition?.[0];
        if (!current) throw new Error("Invalid weather data format");

        condition = current.weatherDesc?.[0]?.value || "Clear";
        const tempC = current.temp_C || "20";
        const tempF = current.temp_F || "68";
        const isUS = navigator.language === "en-US" || navigator.languages?.includes("en-US");
        tempStr = isUS ? `+${tempF}°F` : `+${tempC}°C`;
      } else {
        const parsed = parseWttrResponse(text);
        condition = parsed.condition;
        tempStr = parsed.tempStr;
      }

      const generated = generateWeatherData(trimmedQuery, condition, tempStr);
      setCitiesData(prev => ({
        ...prev,
        [key]: generated
      }));
      setActiveCityId(key);
      setSearchQuery("");
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "City not found or network error.");
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialCities = ["Delhi", "Uttar Pradesh", "Jaipur"];
    initialCities.forEach(city => {
      fetchCityWeather(city);
    });
  }, []);

  const renderIcon = (type, sizeClass = "w-6 h-6") => {
    switch (type) {
      case "sunny":
        return <Sun className={`${sizeClass} text-amber-400 fill-current animate-pulse`} />;
      case "mostly-sunny":
        return (
          <div className="relative flex items-center justify-center">
            <Sun className={`${sizeClass} text-amber-400 fill-current`} />
            <Cloud className="w-4 h-4 text-white/95 absolute -bottom-1 -right-1 fill-current" />
          </div>
        );
      case "cloudy":
        return <Cloud className={`${sizeClass} text-slate-100 fill-current`} />;
      case "rain":
        return <CloudRain className={`${sizeClass} text-sky-200 fill-current`} />;
      case "haze":
        return <CloudFog className={`${sizeClass} text-amber-200 fill-current`} />;
      default:
        return <Sun className={`${sizeClass} text-amber-400 fill-current`} />;
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#f6f6f6] rounded-xl overflow-hidden shadow-2xl border border-black/10 select-none text-gray-800 relative font-sans">
      
      {/* ================= WINDOW HEADER ================= */}
      <div id="window-header" className="window-header shrink-0 flex items-center justify-between !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2.5 z-20">
        <div className="flex items-center gap-4">
          <WindowControls target="weather" />
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="sm:hidden p-1 rounded hover:bg-gray-200 text-gray-600 transition-colors"
            aria-label="Toggle Sidebar"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform duration-200 ${isSidebarOpen ? "rotate-0" : "rotate-180"}`} />
          </button>
        </div>
        <div className="flex-1 text-center font-bold text-gray-700 text-sm hidden sm:block">
          Weather — {activeCity.name}
        </div>
        <div className="w-14" />
      </div>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-10 sm:hidden animate-fade-in"
          />
        )}

        {/* Sidebar */}
        <aside className={`
          absolute sm:relative inset-y-0 left-0 w-56 bg-gray-50 border-r border-[#d1d1d1] p-3.5 space-y-4 flex flex-col z-20 transition-transform duration-300 shrink-0 h-full
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
        `}>
          {/* Search box */}
          <div className="relative flex items-center bg-gray-200/60 border border-gray-300/40 rounded-lg px-2.5 py-1.5 shrink-0">
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

          {/* City list */}
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
                    if (window.innerWidth < 768) {
                      setIsSidebarOpen(false);
                    }
                  }}
                  className={`w-full p-3 rounded-xl text-left transition-all duration-200 relative flex items-center justify-between text-white overflow-hidden shadow-sm hover:shadow-md cursor-pointer ${
                    isActive ? "ring-2 ring-blue-500/50" : ""
                  }`}
                >
                  {/* Dynamic condition background inside sidebar card */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${city.bgClass} opacity-90 z-0`} />
                  
                  <div className="relative z-10 space-y-0.5">
                    <h4 className="font-bold text-xs leading-none">{city.name}</h4>
                    <p className="text-[10px] text-white/70 leading-none">{city.condition}</p>
                  </div>
                  <div className="relative z-10 flex items-center gap-2">
                    {renderIcon(city.hourly?.[0]?.icon || "sunny", "w-5 h-5")}
                    <div className="text-right flex flex-col justify-center">
                      {unitMode === "both" && (
                        <>
                          <span className="font-bold text-base tracking-tighter leading-none">{temps.tempC}°C</span>
                          <span className="text-[10px] opacity-75 font-semibold leading-none mt-0.5">{temps.tempF}°F</span>
                        </>
                      )}
                      {unitMode === "c" && (
                        <span className="font-bold text-base tracking-tighter leading-none">{temps.tempC}°C</span>
                      )}
                      {unitMode === "f" && (
                        <span className="font-bold text-base tracking-tighter leading-none">{temps.tempF}°F</span>
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

        {/* Weather Dashboard Panel */}
        <main className={`flex-1 overflow-y-auto thin-scrollbar bg-gradient-to-b ${activeCity.bgClass} text-white p-6 space-y-6 flex flex-col justify-start relative`}>
          
          {/* Glassmorphic Loader overlay */}
          {loading && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-30 transition-all duration-300">
              <div className="flex flex-col items-center gap-3 bg-white/10 p-6 rounded-2xl border border-white/20 shadow-lg">
                <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                <p className="text-xs font-semibold text-white tracking-wider">Fetching live weather...</p>
              </div>
            </div>
          )}

          {/* Error Alert Box */}
          {error && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500/90 backdrop-blur-md text-white text-xs px-4 py-2.5 rounded-xl shadow-lg border border-red-400/20 z-30 flex items-center gap-2 animate-bounce">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
              <button onClick={() => setError(null)} className="ml-2 font-bold hover:text-gray-200 cursor-pointer">×</button>
            </div>
          )}

          {/* Unit Toggle & Live Badge Header */}
          <div className="flex items-center justify-between shrink-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-white/65 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Live Weather
            </span>
            <div className="flex bg-white/10 backdrop-blur-md rounded-lg p-0.5 border border-white/10 text-[10px] font-bold">
              <button 
                onClick={() => setUnitMode("both")}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer ${unitMode === "both" ? "bg-white text-gray-800 shadow-sm" : "hover:bg-white/5 text-white/70 hover:text-white"}`}
              >
                Both
              </button>
              <button 
                onClick={() => setUnitMode("c")}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${unitMode === "c" ? "bg-white text-gray-800 shadow-sm" : "hover:bg-white/5 text-white/70 hover:text-white"}`}
              >
                °C
              </button>
              <button 
                onClick={() => setUnitMode("f")}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${unitMode === "f" ? "bg-white text-gray-800 shadow-sm" : "hover:bg-white/5 text-white/70 hover:text-white"}`}
              >
                °F
              </button>
            </div>
          </div>

          {/* Main Info Hero */}
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
                  <span>H: {activeTemps.highC}°C / {activeTemps.highF}°F</span>
                  <span>L: {activeTemps.lowC}°C / {activeTemps.lowF}°F</span>
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

          {/* Hourly Forecast Carousel */}
          <section className="bg-white/10 backdrop-blur-md rounded-2xl p-4 space-y-3 border border-white/10 shadow-sm shrink-0">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-white/50 leading-none flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Hourly Forecast
            </h3>
            <div className="flex gap-4 overflow-x-auto thin-scrollbar pb-1 text-center select-none justify-between min-w-0">
              {activeCity.hourly?.map((h, i) => {
                const hTempC = h.tempC !== undefined ? h.tempC : (h.temp !== undefined ? (h.temp <= 45 ? h.temp : Math.round((h.temp - 32) * 5/9)) : "--");
                const hTempF = h.tempF !== undefined ? h.tempF : (h.temp !== undefined ? (h.temp > 45 ? h.temp : Math.round((h.temp * 9/5) + 32)) : "--");
                return (
                  <div key={i} className="space-y-2 shrink-0 px-2 flex flex-col items-center">
                    <span className="text-[10px] font-bold text-white/70">{h.time}</span>
                    {renderIcon(h.icon, "w-6 h-6")}
                    <div className="flex flex-col items-center leading-none">
                      {unitMode === "both" && (
                        <>
                          <span className="text-xs font-bold">{hTempC}°C</span>
                          <span className="text-[9px] text-white/60 font-semibold mt-0.5">{hTempF}°F</span>
                        </>
                      )}
                      {unitMode === "c" && (
                        <span className="text-xs font-bold">{hTempC}°C</span>
                      )}
                      {unitMode === "f" && (
                        <span className="text-xs font-bold">{hTempF}°F</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 10-Day Forecast & Weather Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            
            {/* 10-Day Forecast List */}
            <section className="bg-white/10 backdrop-blur-md rounded-2xl p-4 space-y-3.5 border border-white/10 shadow-sm">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-white/50 leading-none">10-Day Forecast</h3>
              <div className="space-y-3 text-xs">
                {activeCity.forecast?.map((f, i) => {
                  const minC = f.tempMinC !== undefined ? f.tempMinC : (f.tempMin !== undefined ? (f.tempMin <= 45 ? f.tempMin : Math.round((f.tempMin - 32) * 5/9)) : "--");
                  const minF = f.tempMinF !== undefined ? f.tempMinF : (f.tempMin !== undefined ? (f.tempMin > 45 ? f.tempMin : Math.round((f.tempMin * 9/5) + 32)) : "--");
                  const maxC = f.tempMaxC !== undefined ? f.tempMaxC : (f.tempMax !== undefined ? (f.tempMax <= 45 ? f.tempMax : Math.round((f.tempMax - 32) * 5/9)) : "--");
                  const maxF = f.tempMaxF !== undefined ? f.tempMaxF : (f.tempMax !== undefined ? (f.tempMax > 45 ? f.tempMax : Math.round((f.tempMax * 9/5) + 32)) : "--");
                  
                  return (
                    <div key={i} className="flex items-center justify-between gap-2 font-semibold">
                      <span className="w-12 text-left opacity-80">{f.day}</span>
                      <div className="w-6 flex justify-center">{renderIcon(f.icon, "w-4 h-4")}</div>
                      <div className="flex-1 flex items-center justify-between gap-3 max-w-[140px]">
                        <div className="flex flex-col items-end leading-none text-[9px] w-12 opacity-65">
                          {unitMode === "both" && (
                            <>
                              <span>{minC}°C</span>
                              <span className="text-[8px] text-white/60 mt-0.5">{minF}°F</span>
                            </>
                          )}
                          {unitMode === "c" && (
                            <span>{minC}°C</span>
                          )}
                          {unitMode === "f" && (
                            <span>{minF}°F</span>
                          )}
                        </div>
                        <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden relative">
                          {/* Simulated high/low range bar */}
                          <div 
                            className="absolute h-full bg-gradient-to-r from-orange-400 to-amber-300 rounded-full"
                            style={{ left: "20%", right: "15%" }}
                          />
                        </div>
                        <div className="flex flex-col items-end leading-none text-[9px] w-12">
                          {unitMode === "both" && (
                            <>
                              <span>{maxC}°C</span>
                              <span className="text-[8px] text-white/60 mt-0.5">{maxF}°F</span>
                            </>
                          )}
                          {unitMode === "c" && (
                            <span>{maxC}°C</span>
                          )}
                          {unitMode === "f" && (
                            <span>{maxF}°F</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Meteorological Grid Widgets */}
            <div className="grid grid-cols-2 gap-4">
              {/* UV Index */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between border border-white/10 shadow-sm min-h-[120px]">
                <h4 className="text-[9px] font-bold uppercase tracking-wider text-white/50 leading-none">UV Index</h4>
                <div className="space-y-1">
                  <span className="text-xl font-bold">{activeCity.uv}</span>
                  <p className="text-[10px] font-bold">{activeCity.uvLabel}</p>
                </div>
                <div className="h-1 bg-gradient-to-r from-green-500 via-amber-400 via-orange-500 to-purple-600 rounded-full relative mt-2">
                  <div 
                    className="absolute size-2 rounded-full bg-white border border-black/20 -top-0.5" 
                    style={{ left: `${(activeCity.uv / 12) * 100}%` }}
                  />
                </div>
              </div>

              {/* Wind Speed & Compass */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between border border-white/10 shadow-sm min-h-[120px]">
                <h4 className="text-[9px] font-bold uppercase tracking-wider text-white/50 leading-none">Wind</h4>
                <div className="flex items-center gap-3">
                  <div className="space-y-1 min-w-0 flex-1">
                    <span className="text-xl font-bold tracking-tight">{activeCity.windSpeed} <span className="text-[10px] font-semibold">mph</span></span>
                    <p className="text-[9px] font-bold opacity-80">{activeCity.windDir} Direction</p>
                  </div>
                  {/* Rotating compass needle */}
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center relative shrink-0">
                    <Compass className="w-7 h-7 stroke-[1.2] opacity-40" />
                    <div 
                      className="absolute w-1 h-8 bg-gradient-to-t from-transparent via-white to-white rounded-full transition-transform duration-500"
                      style={{ transform: `rotate(${activeCity.windAngle}deg)` }}
                    />
                  </div>
                </div>
              </div>

              {/* Sunrise & Sunset */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between border border-white/10 shadow-sm min-h-[120px]">
                <h4 className="text-[9px] font-bold uppercase tracking-wider text-white/50 leading-none">Sunrise</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Sunrise className="w-5 h-5 text-amber-300" />
                    <div>
                      <span className="text-xs font-bold leading-none">{activeCity.sunrise}</span>
                      <p className="text-[8px] text-white/60 leading-none mt-0.5">Sunrise</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 border-t border-white/10 pt-2">
                    <Sunset className="w-5 h-5 text-orange-300" />
                    <div>
                      <span className="text-xs font-bold leading-none">{activeCity.sunset}</span>
                      <p className="text-[8px] text-white/60 leading-none mt-0.5">Sunset</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Air Quality Index */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between border border-white/10 shadow-sm min-h-[120px]">
                <h4 className="text-[9px] font-bold uppercase tracking-wider text-white/50 leading-none">Air Quality</h4>
                <div className="space-y-1">
                  <span className="text-xl font-bold">{activeCity.aqi}</span>
                  <p className="text-[10px] font-bold">{activeCity.aqiLabel}</p>
                </div>
                <div className="h-1 bg-gradient-to-r from-green-500 via-yellow-400 via-orange-500 to-red-600 rounded-full relative mt-2">
                  <div 
                    className="absolute size-2 rounded-full bg-white border border-black/20 -top-0.5" 
                    style={{ left: `${Math.min((activeCity.aqi / 150) * 100, 100)}%` }}
                  />
                </div>
              </div>

            </div>

          </div>

        </main>
      </div>

    </div>
  );
};

const WeatherWindow = windowWrapper(Weather, "weather");
export default WeatherWindow;
