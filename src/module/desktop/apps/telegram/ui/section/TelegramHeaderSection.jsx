import React from "react";
import WindowControls from "@components/WindowControls";
import { PanelLeft } from "lucide-react";

const TelegramHeaderSection = ({
  activeChat,
  onToggleProfile,
  nightMode,
  isSidebarOpen,
  onToggleSidebar,
  containerWidth = 800,
}) => {
  const isNarrow = containerWidth < 550;

  return (
    <div
      id="window-header"
      className={`shrink-0 border-b px-4 py-2 flex items-center justify-between text-xs transition-colors ${
        nightMode
          ? "bg-zinc-900 border-zinc-800 text-zinc-400"
          : "bg-[#f4f4f5] border-zinc-200 text-gray-600"
      }`}
    >
      <div className="flex items-center gap-2">
        <WindowControls target="telegram" />
        {isNarrow && (
          <button
            onClick={onToggleSidebar}
            className={`p-1 rounded transition-colors ml-1 cursor-pointer ${
              nightMode ? "hover:bg-zinc-850 text-zinc-300" : "hover:bg-zinc-200 text-gray-700"
            }`}
            title="Toggle Sidebar List"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      <div
        className={`flex-1 text-center font-bold transition-all duration-200 ${
          containerWidth < 450 ? "opacity-0 pointer-events-none" : "opacity-100"
        } ${nightMode ? "text-zinc-250" : "text-gray-700"}`}
      >
        {activeChat ? activeChat.name : "Telegram"}
      </div>

      <div className="w-14 flex justify-end" />
    </div>
  );
};

export default TelegramHeaderSection;
