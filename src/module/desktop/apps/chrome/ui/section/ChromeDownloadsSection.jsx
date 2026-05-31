import React from "react";
import { Settings, Star, History, Info } from "lucide-react";

const ChromeDownloadsSection = ({
  settingsThemeClasses,
  _theme,
  navigateTabTo,
  downloadsList,
  setDownloadsList,
  highlightText,
  findText,
}) => (
  <div
    className={`absolute inset-0 flex select-none overflow-hidden ${settingsThemeClasses.contentBg}`}
  >
    <div
      className={`w-52 border-r shrink-0 py-6 px-4 flex flex-col gap-1.5 ${settingsThemeClasses.sidebarBg}`}
    >
      <div
        className={`flex items-center gap-2 px-2 pb-4 border-b ${settingsThemeClasses.borderMuted} mb-3`}
      >
        <History className="w-5 h-5 text-blue-500 transform rotate-180" />
        <span className="font-bold text-sm">Downloads</span>
      </div>
      <button
        onClick={() => navigateTabTo("chrome://settings")}
        className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
      >
        <Settings className="w-4 h-4" /> Appearance
      </button>
      <button
        onClick={() => navigateTabTo("chrome://bookmarks")}
        className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
      >
        <Star className="w-4 h-4" /> Bookmarks
      </button>
      <button
        onClick={() => navigateTabTo("chrome://history")}
        className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
      >
        <History className="w-4 h-4" /> History
      </button>
      <button className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-left w-full">
        <History className="w-4 h-4 transform rotate-180" /> Downloads
      </button>
      <button
        onClick={() => navigateTabTo("chrome://about")}
        className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
      >
        <Info className="w-4 h-4" /> About Chrome
      </button>
    </div>
    <div className="flex-1 overflow-y-auto p-8 max-w-3xl space-y-6">
      <div
        className={`flex items-center justify-between border-b ${settingsThemeClasses.borderMuted} pb-4`}
      >
        <h2 className="text-xl font-bold">Downloads</h2>
        {downloadsList.length > 0 && (
          <button
            onClick={() => setDownloadsList([])}
            className="text-xs font-semibold text-rose-500 hover:bg-rose-500/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            Clear All
          </button>
        )}
      </div>
      <div className="space-y-4">
        {downloadsList.map((d, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${settingsThemeClasses.cardBg}`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${d.type === "PDF" ? "bg-red-500/10 text-red-500" : d.type === "ZIP" ? "bg-blue-500/10 text-blue-500" : "bg-emerald-500/10 text-emerald-500"}`}
              >
                {d.type}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold truncate">{highlightText(d.name, findText)}</h4>
                <p className={`text-[10px] ${settingsThemeClasses.textMuted}`}>
                  {d.size} &bull; {d.progress} &bull; {d.date}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => alert(`Downloading ${d.name} again...`)}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-bold cursor-pointer"
              >
                Download Again
              </button>
              <button
                onClick={() => setDownloadsList((prev) => prev.filter((_, i) => i !== index))}
                className="px-3 py-1 hover:bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-200 dark:border-rose-900/30 rounded text-[10px] font-semibold cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        {downloadsList.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400 gap-3">
            <History className="w-10 h-10 transform rotate-180 stroke-[1.5]" />
            <p className="text-xs">No downloads found.</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default ChromeDownloadsSection;
