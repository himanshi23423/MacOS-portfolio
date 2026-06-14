import React from "react";
import WindowControls from "@components/WindowControls";
import { ChevronLeft } from "lucide-react";

const WeatherHeader = ({ activeCity, unitMode, setUnitMode, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div
      id="window-header"
      className="window-header shrink-0 flex items-center justify-between !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2.5 z-20"
    >
      <div className="flex items-center gap-4">
        <WindowControls target="weather" />
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="sm:hidden p-1 rounded hover:bg-gray-200 text-gray-600 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <ChevronLeft
            className={`w-5 h-5 transition-transform duration-200 ${isSidebarOpen ? "rotate-0" : "rotate-180"}`}
          />
        </button>
      </div>
      <div className="flex-1 text-center font-bold text-gray-700 text-sm block truncate px-2">
        Weather — {activeCity.name}
      </div>
      <div className="flex bg-black/5 rounded-lg p-0.5 border border-black/5 text-[10px] font-bold text-gray-600">
        <button
          onClick={() => setUnitMode("both")}
          className={`px-2 py-1 rounded-md transition-all cursor-pointer ${unitMode === "both" ? "bg-white text-gray-800 shadow-sm" : "hover:bg-black/5 text-gray-500 hover:text-gray-800"}`}
        >
          Both
        </button>
        <button
          onClick={() => setUnitMode("c")}
          className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${unitMode === "c" ? "bg-white text-gray-800 shadow-sm" : "hover:bg-black/5 text-gray-500 hover:text-gray-800"}`}
        >
          °C
        </button>
        <button
          onClick={() => setUnitMode("f")}
          className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${unitMode === "f" ? "bg-white text-gray-800 shadow-sm" : "hover:bg-black/5 text-gray-500 hover:text-gray-800"}`}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default WeatherHeader;
