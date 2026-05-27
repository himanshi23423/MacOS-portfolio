import { useState, useEffect, useRef } from "react";
import useWindowsStore from "#store/window";
import { dockApps } from "#constants";
import { Search } from "lucide-react";

const Launchpad = () => {
  const { windows, openWindow, closeWindow } = useWindowsStore();
  const isOpen = windows.launchpad?.isOpen || false;
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);

  // Auto-focus search input when Launchpad is opened
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Escape key handler to close Launchpad
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeWindow("launchpad");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeWindow]);

  if (!isOpen) return null;

  // Filter apps (exclude launchpad itself and non-openable items like trash)
  const appItems = dockApps.filter(
    (app) => app.id !== "launchpad" && app.id !== "trash" && app.canOpen
  );

  const filteredApps = appItems.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLaunch = (appId) => {
    openWindow(appId);
    closeWindow("launchpad");
  };

  return (
    <div 
      onClick={() => closeWindow("launchpad")}
      className="fixed inset-0 w-screen h-screen z-[9980] backdrop-blur-3xl bg-black/15 flex flex-col items-center pt-16 pb-10 px-12 sm:px-20 md:px-32 lg:px-44 animate-fade-in select-none"
    >
      {/* Search Input Bar (Prevent click from closing launchpad) */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="w-64 relative mb-12 transform transition-all duration-200 shrink-0"
      >
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
        <input 
          ref={inputRef}
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/10 hover:bg-white/12 focus:bg-white/15 border border-white/10 rounded-[6px] pl-8.5 pr-4 py-1 text-[13px] text-white outline-none focus:border-white/20 placeholder-white/40 shadow-inner select-text transition-all text-center focus:text-left focus:placeholder-transparent"
        />
      </div>

      {/* Grid of Apps (Prevent click from closing launchpad) */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4.5xl flex-1 overflow-y-auto px-4"
      >
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-y-12 gap-x-8 justify-items-center justify-center">
          {filteredApps.map((app) => (
            <button 
              key={app.id}
              onClick={() => handleLaunch(app.id)}
              className="flex flex-col items-center gap-2.5 group focus:outline-none cursor-pointer w-20"
            >
              {/* App Icon Container */}
              <div className="w-[80px] h-[80px] rounded-[18px] bg-transparent transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-95 flex items-center justify-center relative select-none">
                {app.id === "calendar" ? (
                  <div className="w-full h-full bg-white rounded-[18px] border border-black/10 shadow-md overflow-hidden flex flex-col items-center select-none aspect-square scale-[0.76]">
                    {/* Red Calendar Header */}
                    <div className="w-full bg-[#ff3b30] text-white text-[10px] font-extrabold py-0.5 md:py-1 text-center leading-none tracking-wider uppercase">
                      {
                        ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][
                          new Date().getDay()
                        ]
                      }
                    </div>
                    {/* Date Number */}
                    <div className="flex-1 flex items-center justify-center text-gray-800 font-bold text-3xl leading-none font-sans -mt-0.5">
                      {new Date().getDate()}
                    </div>
                  </div>
                ) : (
                  <img 
                    src={`/images/${app.icon}`} 
                    alt={app.name} 
                    className={`w-full h-full object-contain filter drop-shadow-sm ${
                      {
                        finder: "scale-[0.90]",
                        safari: "scale-[0.90]",
                        photos: "scale-[0.90]",
                        contact: "scale-[0.90]",
                        terminal: "scale-[0.90]",
                        settings: "scale-[0.83]",
                        calculator: "scale-[0.83]",
                        notes: "scale-[0.90]",
                        messages: "scale-[0.90]",
                        appletv: "scale-[0.80]",
                        call: "scale-[0.71]",
                        appstore: "scale-[0.90]",
                        weather: "scale-[0.81]",
                        chrome: "scale-[0.95]",
                        vscode: "scale-[0.95]",
                        postman: "scale-[0.95]",
                        map: "scale-[0.72]",
                        font: "scale-[2.8]",
                        telegram: "scale-[0.90]",
                        music: "scale-[0.90]",
                      }[app.id] || ""
                    }`}
                  />
                )}
              </div>
              
              {/* App Label */}
              <span className="text-white text-[11px] font-normal tracking-wide text-center text-shadow-sm select-none truncate w-full mt-1">
                {app.name}
              </span>
            </button>
          ))}
        </div>
        
        {filteredApps.length === 0 && (
          <div className="text-white/40 text-center py-20 text-sm">
            No Applications found matching "{searchQuery}"
          </div>
        )}
      </div>

      {/* Page Indicators */}
      <div className="flex items-center justify-center gap-2 mt-auto pt-6 shrink-0">
        <span className="w-2 h-2 rounded-full bg-white transition-opacity duration-200" />
        <span className="w-2 h-2 rounded-full bg-white/30 transition-opacity duration-200" />
      </div>
    </div>
  );
};

export default Launchpad;
