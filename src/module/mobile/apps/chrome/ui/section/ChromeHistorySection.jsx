import React, { useState } from "react";
import { History, Globe, Trash2, Search } from "lucide-react";

const ChromeHistorySection = ({
  settingsThemeClasses,
  theme,
  navigateTabTo,
  historyList,
  setHistoryList,
  highlightText,
  findText,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHistory = historyList.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.url.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      className={`absolute inset-0 flex flex-col select-none overflow-y-auto pb-10 ${settingsThemeClasses.contentBg}`}
    >
      {/* iOS Style Top Header */}
      <div
        className={`shrink-0 px-4 py-3 flex items-center justify-between border-b ${
          theme === "dark"
            ? "bg-[#202124] border-zinc-800/80 text-white"
            : "bg-white border-zinc-200/50 text-gray-800"
        }`}
      >
        <span className="text-xs font-bold">History</span>
        {historyList.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm("Clear all browsing history?")) {
                setHistoryList([]);
              }
            }}
            className="text-xs font-bold text-rose-500 active:opacity-60 bg-transparent border-none outline-none cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Search Bar */}
        {historyList.length > 0 && (
          <div
            className={`w-full flex items-center border rounded-xl px-3 py-2 text-xs ${
              theme === "dark"
                ? "bg-zinc-900 border-zinc-800 text-zinc-200"
                : "bg-white border-gray-200 text-gray-700"
            }`}
          >
            <Search className="w-3.5 h-3.5 text-gray-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search History"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-transparent border-none outline-none ${
                theme === "dark"
                  ? "text-zinc-200 placeholder-zinc-550"
                  : "text-gray-800 placeholder-gray-450"
              }`}
            />
          </div>
        )}

        {/* History List */}
        {filteredHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400 gap-2.5">
            <History className="w-8 h-8 stroke-[1.5]" />
            <p className="text-xs font-medium">No history items found.</p>
          </div>
        ) : (
          <div
            className={`border rounded-xl divide-y overflow-hidden shadow-sm ${
              theme === "dark"
                ? "bg-zinc-900 border-zinc-850 divide-zinc-800"
                : "bg-white border-zinc-200/60 divide-zinc-100"
            }`}
          >
            {filteredHistory.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3.5 hover:bg-neutral-50 dark:hover:bg-zinc-850 transition-colors group"
              >
                <div
                  onClick={() => navigateTabTo(item.url)}
                  className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
                >
                  <span className={`text-[9px] ${settingsThemeClasses.textMuted} shrink-0 w-10`}>
                    {item.time}
                  </span>
                  <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold truncate">
                      {highlightText(item.title, findText || searchQuery)}
                    </h4>
                    <p className={`text-[9px] ${settingsThemeClasses.textMuted} truncate`}>
                      {highlightText(item.url, findText || searchQuery)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setHistoryList((prev) => prev.filter((_, i) => i !== index))}
                  className="p-1 hover:bg-rose-500/10 text-gray-400 hover:text-rose-500 rounded transition-all shrink-0 ml-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChromeHistorySection;
