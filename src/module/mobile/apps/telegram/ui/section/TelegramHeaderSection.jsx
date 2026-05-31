import React from "react";
import WindowControls from "@components/WindowControls";
import { User } from "lucide-react";

const TelegramHeaderSection = ({ activeChat, onToggleProfile, nightMode }) => {
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
      </div>
      <div className="flex-1 text-center font-bold hidden md:block text-gray-700 dark:text-zinc-200">
        {activeChat ? activeChat.name : "Telegram"}
      </div>
      <div className="w-14 flex justify-end">
        <button
          onClick={onToggleProfile}
          className="p-1.5 rounded transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800"
          title="Toggle Profile"
        >
          <User className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TelegramHeaderSection;
