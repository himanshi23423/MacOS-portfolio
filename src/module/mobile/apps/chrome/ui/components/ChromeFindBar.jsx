import React from "react";
import { X } from "lucide-react";

const ChromeFindBar = ({
  showFindBar,
  findText,
  setFindText,
  findMatchesCount,
  findMatchIndex,
  setFindMatchIndex,
  setShowFindBar,
  theme,
}) => {
  if (!showFindBar) return null;

  return (
    <div
      className={`absolute top-2 right-4 z-45 flex items-center gap-2 border px-3 py-1.5 rounded-lg shadow-xl text-xs ${
        theme === "dark"
          ? "bg-[#282a2d] border-zinc-700/80 text-zinc-100 shadow-black/40"
          : "bg-white border-gray-200 text-gray-800 shadow-neutral-300/40"
      }`}
    >
      <input
        type="text"
        placeholder="Find in page..."
        value={findText}
        onChange={(e) => setFindText(e.target.value)}
        autoFocus
        className="bg-transparent border-none outline-none focus:ring-0 text-xs w-36 text-gray-800 dark:text-zinc-100"
      />
      <span
        className={`text-[10px] select-none pr-1.5 border-r ${theme === "dark" ? "text-zinc-500 border-zinc-700" : "text-gray-500 border-gray-200"}`}
      >
        {findMatchesCount > 0 ? `${findMatchIndex} of ${findMatchesCount}` : "0 of 0"}
      </span>
      <button
        onClick={() => setFindMatchIndex((prev) => (prev > 1 ? prev - 1 : findMatchesCount))}
        disabled={findMatchesCount === 0}
        className={`p-0.5 rounded leading-none ${theme === "dark" ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-gray-100 text-gray-600"}`}
      >
        ▲
      </button>
      <button
        onClick={() => setFindMatchIndex((prev) => (prev < findMatchesCount ? prev + 1 : 1))}
        disabled={findMatchesCount === 0}
        className={`p-0.5 rounded leading-none ${theme === "dark" ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-gray-100 text-gray-600"}`}
      >
        ▼
      </button>
      <button
        onClick={() => {
          setShowFindBar(false);
          setFindText("");
        }}
        className={`p-0.5 rounded ${theme === "dark" ? "hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200" : "hover:bg-gray-100 text-gray-500 hover:text-gray-800"}`}
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default ChromeFindBar;
