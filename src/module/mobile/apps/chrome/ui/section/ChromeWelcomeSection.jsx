import React from "react";
import { Search } from "lucide-react";

const ChromeWelcomeSection = ({
  theme,
  searchEngine,
  googleSearchQuery,
  setGoogleSearchQuery,
  navigateTabTo,
  bookmarks,
}) => (
  <div
    className={`absolute inset-0 flex flex-col items-center justify-center p-6 select-none overflow-y-auto ${theme === "dark" ? "bg-[#202124] text-white" : "bg-[#f8f9fa] text-gray-800"}`}
  >
    <div className="w-full max-w-xl flex flex-col items-center gap-8 -mt-16">
      {searchEngine === "Google" && (
        <div className="flex items-baseline font-bold text-6xl tracking-tight select-none">
          <span className="text-blue-500">G</span>
          <span className="text-red-500">o</span>
          <span className="text-yellow-500">o</span>
          <span className="text-blue-500">g</span>
          <span className="text-green-500">l</span>
          <span className="text-red-500">e</span>
        </div>
      )}
      {searchEngine === "Bing" && (
        <div className="flex items-center gap-2 font-bold text-6xl tracking-tight select-none text-teal-600 font-sans">
          <span>bing</span>
        </div>
      )}
      {searchEngine === "DuckDuckGo" && (
        <div className="flex items-center gap-2 font-bold text-4xl tracking-tight select-none text-orange-500 font-sans">
          <span>DuckDuckGo</span>
        </div>
      )}
      <div
        className={`w-full flex items-center border hover:border-transparent hover:shadow-md focus-within:shadow-md focus-within:border-transparent transition-all rounded-full px-4 py-3 text-sm max-w-lg ${
          theme === "dark"
            ? "bg-[#35363a] border-[#404144] text-gray-200"
            : "bg-white border-[#dadce0] text-gray-700"
        }`}
      >
        <Search className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
        <input
          type="text"
          placeholder={`Search ${searchEngine} or type URL`}
          value={googleSearchQuery}
          onChange={(e) => setGoogleSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && googleSearchQuery.trim()) {
              navigateTabTo(googleSearchQuery);
              setGoogleSearchQuery("");
            }
          }}
          className={`w-full bg-transparent border-none outline-none ${theme === "dark" ? "text-gray-100 placeholder-gray-500" : "text-gray-800 placeholder-gray-400"}`}
        />
      </div>
      <div className="grid grid-cols-4 gap-4 max-w-sm w-full justify-center text-center mt-2 px-4">
        {bookmarks.slice(0, 8).map((bookmark, idx) => {
          const initial = bookmark.title ? bookmark.title.charAt(0).toUpperCase() : "G";
          let initialColor = "text-blue-500";
          let iconSrc = "";
          if (bookmark.title === "Portfolio") {
            initialColor = "text-indigo-600 font-extrabold";
            iconSrc = "/images/profile.jpg";
          } else if (bookmark.title === "Wikipedia") {
            initialColor = "text-gray-700 dark:text-gray-300 font-extrabold";
          } else if (bookmark.title === "OpenStreetMap") {
            initialColor = "text-amber-500 font-extrabold";
          } else if (bookmark.title === "GitHub") {
            initialColor = "text-neutral-900 dark:text-neutral-100 font-extrabold";
            iconSrc = "/images/github.png";
          } else if (bookmark.title === "LinkedIn") {
            initialColor = "text-sky-600 font-extrabold";
            iconSrc = "/images/linkedin.png";
          } else if (bookmark.title === "Twitter") {
            initialColor = "text-blue-400 font-extrabold";
            iconSrc = "/images/x.png";
          }
          return (
            <button
              key={idx}
              onClick={() => navigateTabTo(bookmark.url)}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-sm overflow-hidden transition-all group-hover:scale-105 ${
                  theme === "dark"
                    ? "bg-[#35363a] border-zinc-700/50 hover:bg-[#3d3e42]"
                    : "bg-white border-gray-200 hover:bg-gray-100"
                }`}
              >
                {iconSrc ? (
                  <img
                    src={iconSrc}
                    alt={bookmark.title}
                    className={
                      bookmark.title === "Portfolio"
                        ? "w-full h-full object-cover"
                        : "w-6 h-6 object-contain"
                    }
                  />
                ) : (
                  <span className={`text-sm ${initialColor}`}>{initial}</span>
                )}
              </div>
              <span
                className={`text-[10px] font-semibold group-hover:underline truncate w-14 ${theme === "dark" ? "text-zinc-350" : "text-gray-600"}`}
              >
                {bookmark.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

export default ChromeWelcomeSection;
