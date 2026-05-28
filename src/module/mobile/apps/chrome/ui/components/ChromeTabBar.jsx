import React from "react";
import WindowControls from "#components/WindowControls";
import { Globe, X, Plus } from "lucide-react";

const ChromeTabBar = ({ tabs, activeTabId, setActiveTabId, handleNewTab, handleCloseTab, theme, themeClasses }) => {
  return (
    <div id="window-header" className={`shrink-0 px-3 pt-2.5 pb-1 flex items-center justify-between z-20 border-b gap-4 select-none ${themeClasses.header}`}>
      <div className="flex items-center gap-6 shrink-0">
        <WindowControls target="chrome" />
      </div>
      <div className="flex-1 flex items-end gap-1.5 overflow-x-auto thin-scrollbar select-none pr-12 min-w-0">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          const isIncognitoTab = tab.url === "chrome://incognito";
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`
                group flex items-center gap-2 h-[28px] max-w-[160px] min-w-[100px] px-3 rounded-t-lg text-xs leading-none transition-all duration-150 cursor-pointer relative shrink-0
                ${isActive
                  ? (isIncognitoTab ? "bg-[#202124] text-zinc-100 shadow-[0_-1px_3px_rgba(0,0,0,0.3)] z-10" : themeClasses.tabActive)
                  : (isIncognitoTab ? "text-zinc-400 hover:bg-[#323336]" : themeClasses.tabInactive)
                }
              `}
            >
              {isIncognitoTab ? (
                <svg className="w-3.5 h-3.5 shrink-0 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="8" cy="15" r="2" />
                  <circle cx="16" cy="15" r="2" />
                  <path d="M10 15h4M2 11a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v1H2z" />
                </svg>
              ) : (
                <Globe className={`w-3.5 h-3.5 shrink-0 ${themeClasses.tabGlobe}`} />
              )}
              <span className="truncate flex-1 pr-3">{tab.title}</span>
              {tabs.length > 1 && (
                <button
                  onClick={(e) => handleCloseTab(tab.id, e)}
                  className={`absolute right-2 opacity-0 group-hover:opacity-100 p-0.5 rounded-full transition-opacity ${themeClasses.tabCloseHover}`}
                  aria-label="Close tab"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              )}
            </div>
          );
        })}
        <button
          onClick={handleNewTab}
          className={`p-1 rounded-full mb-1 transition-colors flex items-center justify-center shrink-0 cursor-pointer ${theme === "dark" ? "hover:bg-white/10 text-gray-400" : "hover:bg-[#d0d3d7] text-gray-600"}`}
          aria-label="New tab"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

export default ChromeTabBar;
