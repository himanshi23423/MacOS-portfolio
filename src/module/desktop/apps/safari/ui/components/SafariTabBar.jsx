import React from "react";
import { Plus, X, Globe } from "lucide-react";

const SafariTabBar = ({ tabs, activeTabId, setActiveTabId, onCloseTab, onNewTab, showTabIcons }) => {
  return (
    <div 
      className="flex items-end bg-[#eef1f5] border-b border-[#c8cbd0] px-2 h-10 select-none overflow-x-auto scrollbar-none"
      onMouseDown={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="flex items-end flex-1 max-w-full">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          const isStartPage = tab.url === "safari://start";
          
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`group relative flex items-center h-8 min-w-[85px] @md:min-w-[120px] max-w-[200px] flex-1 px-3 rounded-t-lg text-xs transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-white text-gray-800 shadow-[0_-1px_3px_rgba(0,0,0,0.06)] border-t border-x border-[#c8cbd0]/60 z-10 font-medium"
                  : "bg-black/5 hover:bg-black/10 text-gray-500 border-t border-x border-transparent hover:border-black/5"
              }`}
            >
              {/* Divider on the right of inactive tabs */}
              {!isActive && (
                <div className="absolute right-0 top-2 bottom-2 w-[1px] bg-[#c8cbd0] group-hover:opacity-0 transition-opacity" />
              )}

              {/* Tab Icon */}
              {showTabIcons && (
                <span className="mr-1.5 flex-shrink-0">
                  {isStartPage ? (
                    <span className="text-[10px]">🧭</span>
                  ) : (
                    <Globe size={11} className={isActive ? "text-blue-500" : "text-gray-400"} />
                  )}
                </span>
              )}

              {/* Title */}
              <span className="truncate pr-4 flex-1">
                {tab.title}
              </span>

              {/* Close Button */}
              <button
                onClick={(e) => onCloseTab(tab.id, e)}
                className={`absolute right-1.5 p-0.5 rounded-full hover:bg-black/10 transition-colors text-gray-400 hover:text-gray-700 ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <X size={10} />
              </button>
            </div>
          );
        })}

        {/* Plus Button */}
        <button
          onClick={onNewTab}
          className="p-1 mb-1 ml-2 rounded hover:bg-black/5 text-gray-600 transition-colors flex-shrink-0"
          title="Open a new tab"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
};

export default SafariTabBar;
