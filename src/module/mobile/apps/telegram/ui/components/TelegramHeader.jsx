import React from "react";
import WindowControls from "@components/WindowControls";
import { ChevronLeft } from "lucide-react";

const TelegramHeader = ({ isSidebarOpen, setIsSidebarOpen, nightMode }) => {
  return (
    <div
      id="window-header"
      className={`shrink-0 border-b px-4 py-2 flex items-center justify-between text-xs transition-colors ${
        nightMode
          ? "bg-zinc-900 border-zinc-800 text-zinc-400"
          : "bg-[#f6f6f6] border-zinc-200 text-gray-600"
      }`}
    >
      <div className="flex items-center gap-4">
        <WindowControls target="telegram" />
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`md:hidden p-1.5 rounded transition-colors ${
            nightMode ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-200 text-gray-700"
          }`}
        >
          <ChevronLeft
            className={`w-4 h-4 transition-transform ${isSidebarOpen ? "rotate-0" : "rotate-180"}`}
          />
        </button>
      </div>
      <div
        className={`flex-1 text-center font-bold hidden md:block ${
          nightMode ? "text-zinc-200" : "text-gray-700"
        }`}
      >
        Telegram
      </div>
      <div className="w-14" />
    </div>
  );
};

export default TelegramHeader;
