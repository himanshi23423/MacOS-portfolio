import React from "react";
import { Settings, Star, History, Info, Globe, Trash2 } from "lucide-react";

const ChromeHistorySection = ({
  settingsThemeClasses,
  theme,
  navigateTabTo,
  historyList,
  setHistoryList,
  highlightText,
  findText
}) => (
  <div className={`absolute inset-0 flex select-none overflow-hidden ${settingsThemeClasses.contentBg}`}>
    <div className={`w-52 border-r shrink-0 py-6 px-4 flex flex-col gap-1.5 ${settingsThemeClasses.sidebarBg}`}>
      <div className={`flex items-center gap-2 px-2 pb-4 border-b ${settingsThemeClasses.borderMuted} mb-3`}>
        <History className="w-5 h-5 text-blue-500" />
        <span className="font-bold text-sm">History</span>
      </div>
      <button onClick={() => navigateTabTo("chrome://settings")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
        <Settings className="w-4 h-4" /> Appearance
      </button>
      <button onClick={() => navigateTabTo("chrome://bookmarks")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
        <Star className="w-4 h-4" /> Bookmarks
      </button>
      <button className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-left w-full">
        <History className="w-4 h-4" /> History
      </button>
      <button onClick={() => navigateTabTo("chrome://downloads")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
        <History className="w-4 h-4 transform rotate-180" /> Downloads
      </button>
      <button onClick={() => navigateTabTo("chrome://about")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
        <Info className="w-4 h-4" /> About Chrome
      </button>
    </div>
    <div className="flex-1 overflow-y-auto p-8 max-w-3xl space-y-6">
      <div className={`flex items-center justify-between border-b ${settingsThemeClasses.borderMuted} pb-4`}>
        <h2 className="text-xl font-bold">History</h2>
        {historyList.length > 0 && (
          <button
            onClick={() => setHistoryList([])}
            className="px-3 py-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg text-xs font-semibold transition-all cursor-pointer"
          >
            Clear History
          </button>
        )}
      </div>
      {historyList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400 gap-3">
          <History className="w-10 h-10 stroke-[1.5]" />
          <p className="text-xs">Your browsing history will show up here.</p>
        </div>
      ) : (
        <div className={`border rounded-xl divide-y overflow-hidden shadow-sm ${theme === "dark" ? "bg-[#2f3033] border-[#3c3e41] divide-[#3c3e41]" : "bg-white border-gray-200 divide-gray-200"}`}>
          {historyList.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3.5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className={`text-[10px] ${settingsThemeClasses.textMuted} shrink-0 w-12`}>{item.time}</span>
                <Globe className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span
                  onClick={() => navigateTabTo(item.url)}
                  className="text-xs font-semibold text-blue-500 hover:underline cursor-pointer truncate max-w-md"
                >
                  {highlightText(item.title, findText)}
                </span>
                <span className={`text-[10px] ${settingsThemeClasses.textMuted} truncate hidden md:inline`}>{highlightText(item.url, findText)}</span>
              </div>
              <button
                onClick={() => setHistoryList(prev => prev.filter((_, i) => i !== index))}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-rose-500/10 hover:text-rose-500 rounded transition-all text-gray-400 shrink-0"
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

export default ChromeHistorySection;
