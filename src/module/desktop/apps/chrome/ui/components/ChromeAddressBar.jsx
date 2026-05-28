import React from "react";
import { RotateCw, ChevronLeft, ChevronRight, Home, Lock, Star } from "lucide-react";

const ChromeAddressBar = ({
  activeTab, searchEngine, addressInput, setAddressInput,
  navigateTabTo, handleGoBack, handleGoForward,
  isBookmarked, toggleBookmark, themeClasses
}) => {
  return (
    <div className={`shrink-0 px-3 py-1.5 border-b flex items-center gap-3 ${themeClasses.navBg}`}>
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={handleGoBack}
          disabled={activeTab.historyIndex <= 0}
          className={`p-1.5 rounded-full transition-colors flex items-center justify-center cursor-pointer ${activeTab.historyIndex > 0 ? themeClasses.buttonText : themeClasses.buttonDisabled}`}
          aria-label="Back"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
        </button>
        <button
          onClick={handleGoForward}
          disabled={activeTab.historyIndex >= activeTab.history.length - 1}
          className={`p-1.5 rounded-full transition-colors flex items-center justify-center cursor-pointer ${activeTab.historyIndex < activeTab.history.length - 1 ? themeClasses.buttonText : themeClasses.buttonDisabled}`}
          aria-label="Forward"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
        <button
          onClick={() => navigateTabTo(activeTab.url)}
          className={`p-1.5 rounded-full transition-colors flex items-center justify-center cursor-pointer ${themeClasses.buttonText}`}
          aria-label="Reload"
        >
          <RotateCw className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
        <button
          onClick={() => navigateTabTo("chrome://newtab")}
          className={`p-1.5 rounded-full transition-colors flex items-center justify-center cursor-pointer ${themeClasses.buttonText}`}
          aria-label="Home"
        >
          <Home className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className={`flex-1 flex items-center focus-within:ring-2 rounded-full px-3 py-1 text-xs shadow-inner transition-all ${themeClasses.addressBg}`}>
        <Lock className="w-3 h-3 text-emerald-600 mr-2 shrink-0" />
        <input
          type="text"
          placeholder={activeTab.url === "chrome://incognito" ? "Search privately" : `Search ${searchEngine} or type a URL`}
          value={addressInput}
          onChange={(e) => setAddressInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && navigateTabTo(addressInput)}
          className={`w-full bg-transparent border-none outline-none focus:ring-0 ${themeClasses.addressInput}`}
        />
        <Star
          onClick={toggleBookmark}
          className={`w-3.5 h-3.5 cursor-pointer ml-1.5 shrink-0 transition-colors ${
            isBookmarked ? "text-amber-400 fill-amber-400" : "text-gray-400 hover:text-amber-400"
          }`}
        />
      </div>
    </div>
  );
};

export default ChromeAddressBar;
