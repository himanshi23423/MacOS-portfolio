import React, { useState } from "react";
import { Download, Trash2, Search } from "lucide-react";

const ChromeDownloadsSection = ({
  settingsThemeClasses,
  theme,
  navigateTabTo,
  downloadsList,
  setDownloadsList,
  highlightText,
  findText,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDownloads = downloadsList.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.type.toLowerCase().includes(searchQuery.toLowerCase()),
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
        <span className="text-xs font-bold">Downloads</span>
        {downloadsList.length > 0 && (
          <button
            onClick={() => setDownloadsList([])}
            className="text-xs font-bold text-rose-500 active:opacity-60 bg-transparent border-none outline-none cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Search Bar */}
        {downloadsList.length > 0 && (
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
              placeholder="Search Downloads"
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

        {/* Downloads List */}
        {filteredDownloads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400 gap-2.5">
            <Download className="w-8 h-8 stroke-[1.5]" />
            <p className="text-xs font-medium">No downloaded files found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredDownloads.map((d, index) => (
              <div
                key={index}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${settingsThemeClasses.cardBg}`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`w-9.5 h-9.5 rounded-lg flex items-center justify-center shrink-0 font-bold text-[10px] ${
                      d.type === "PDF"
                        ? "bg-red-500/10 text-red-500"
                        : d.type === "ZIP"
                          ? "bg-blue-500/10 text-blue-500"
                          : "bg-emerald-500/10 text-emerald-500"
                    }`}
                  >
                    {d.type}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold truncate">
                      {highlightText(d.name, findText || searchQuery)}
                    </h4>
                    <p className={`text-[9px] ${settingsThemeClasses.textMuted}`}>
                      {d.size} &bull; {d.progress} &bull; {d.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => alert(`Downloading ${d.name} again...`)}
                    className="px-2.5 py-1 bg-blue-650 hover:bg-blue-700 text-white rounded-md text-[9px] font-bold cursor-pointer"
                  >
                    Fetch
                  </button>
                  <button
                    onClick={() => setDownloadsList((prev) => prev.filter((_, i) => i !== index))}
                    className="p-1 hover:bg-rose-500/10 text-gray-400 hover:text-rose-500 rounded transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChromeDownloadsSection;
