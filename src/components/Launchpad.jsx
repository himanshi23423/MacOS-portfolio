import { useState, useEffect, useRef } from "react";
import useWindowsStore from "#store/window";
import { dockApps } from "#constants";
import { Search } from "lucide-react";

const Launchpad = () => {
  const { windows, openWindow, closeWindow } = useWindowsStore();
  const isOpen = windows.launchpad?.isOpen || false;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSpace, setActiveSpace] = useState(1);
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

  const changeSpace = (spaceNum, bgPath) => {
    setActiveSpace(spaceNum);
    document.body.style.backgroundImage = `url("${bgPath}")`;
  };

  return (
    <div 
      onClick={() => closeWindow("launchpad")}
      className="fixed inset-0 w-screen h-screen z-[9980] backdrop-blur-3xl bg-black/20 flex flex-col items-center pt-12 px-8 animate-fade-in select-none"
    >
      {/* Spaces Bar (Mission Control Previews) */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="flex items-center justify-center gap-6 mb-6 pt-4 select-none shrink-0"
      >
        <div 
          onClick={() => changeSpace(1, "/images/wallpaper.png")}
          className="flex flex-col items-center gap-1.5 cursor-pointer group"
        >
          <div className={`w-32 h-18 rounded-lg overflow-hidden border-2 transition-all shadow-lg relative ${
            activeSpace === 1 ? "border-white scale-102 shadow-white/10" : "border-white/20 group-hover:border-white/50"
          }`}>
            <img src="/images/wallpaper.png" alt="Desktop 1" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/10" />
            {/* Tiny mock windows */}
            <div className="absolute top-3 left-4 w-10 h-6 bg-white/40 rounded border border-white/20 backdrop-blur-sm" />
            <div className="absolute top-5 left-10 w-12 h-8 bg-zinc-800/60 rounded border border-white/10 backdrop-blur-sm" />
          </div>
          <span className="text-[10px] text-white/80 font-bold tracking-wide">Desktop 1</span>
        </div>

        <div 
          onClick={() => changeSpace(2, "/images/safari-bg.png")}
          className="flex flex-col items-center gap-1.5 cursor-pointer group"
        >
          <div className={`w-32 h-18 rounded-lg overflow-hidden border-2 transition-all shadow-lg relative ${
            activeSpace === 2 ? "border-white scale-102 shadow-white/10" : "border-white/20 group-hover:border-white/50"
          }`}>
            <img src="/images/safari-bg.png" alt="Desktop 2" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/15" />
            {/* Clean empty workspace outline */}
            <div className="absolute inset-2 border border-dashed border-white/20 rounded-md" />
          </div>
          <span className="text-[10px] text-white/80 font-bold tracking-wide">Desktop 2</span>
        </div>
      </div>

      {/* Search Input Bar (Prevent click from closing launchpad) */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="w-80 max-w-sm relative mb-10 transform scale-100 hover:scale-102 transition-transform duration-200 shrink-0"
      >
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
        <input 
          ref={inputRef}
          type="text"
          placeholder="Search Applications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/15 rounded-lg pl-9 pr-4 py-1.5 text-sm text-white outline-none focus:border-white/30 placeholder-white/40 shadow-inner select-text transition-all"
        />
      </div>

      {/* Grid of Apps (Prevent click from closing launchpad) */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl flex-1 overflow-y-auto px-4 pb-12"
      >
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-y-10 gap-x-6 justify-center">
          {filteredApps.map((app) => (
            <button 
              key={app.id}
              onClick={() => handleLaunch(app.id)}
              className="flex flex-col items-center gap-3 group focus:outline-none cursor-pointer"
            >
              {/* App Icon Container */}
              <div className="w-18 h-18 md:w-20 md:h-20 rounded-2xl bg-transparent transition-transform duration-300 ease-out group-hover:scale-108 group-active:scale-95 flex items-center justify-center relative">
                {app.id === "calendar" ? (
                  <div className="w-full h-full bg-white rounded-[18px] border border-black/10 shadow-lg overflow-hidden flex flex-col items-center select-none aspect-square">
                    {/* Red Calendar Header */}
                    <div className="w-full bg-[#ff3b30] text-white text-[10px] md:text-[11px] font-extrabold py-0.5 md:py-1 text-center leading-none tracking-wider uppercase">
                      {
                        ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][
                          new Date().getDay()
                        ]
                      }
                    </div>
                    {/* Date Number */}
                    <div className="flex-1 flex items-center justify-center text-gray-800 font-bold text-3xl md:text-4xl leading-none font-sans -mt-0.5">
                      {new Date().getDate()}
                    </div>
                  </div>
                ) : (
                  <img 
                    src={`/images/${app.icon}`} 
                    alt={app.name} 
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                )}
              </div>
              
              {/* App Label */}
              <span className="text-white text-xs md:text-sm font-medium tracking-wide text-center text-shadow-sm select-none">
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
    </div>
  );
};

export default Launchpad;
