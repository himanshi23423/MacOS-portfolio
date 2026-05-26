import React, { useState, useEffect } from "react";
import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/windowWrapper";
import useWindowsStore from "#store/window";
import { 
  Download, Play as PlayIcon, Search, Tv, ShoppingBag, Film, 
  FolderHeart, Star, ArrowDownCircle, Check, RefreshCw, ChevronLeft,
  AppWindow, Terminal as TerminalIcon, Sparkles, Smile, ShieldAlert
} from "lucide-react";

// Mock Apps Data
const STORE_APPS = [
  // Native Apps
  { id: "calculator", name: "Calculator", category: "Utilities", desc: "Perform mathematical calculations.", rating: 4.5, icon: "calculator.png", native: true },
  { id: "notes", name: "Notes", category: "Productivity", desc: "Capture thoughts, draw, and keep notes.", rating: 4.6, icon: "notes.png", native: true },
  { id: "messages", name: "Messages", category: "Social", desc: "Connect with friends via iMessage.", rating: 4.4, icon: "message.png", native: true },
  { id: "call", name: "FaceTime", category: "Social", desc: "Make audio and video calls.", rating: 4.7, icon: "call.png", native: true },
  { id: "appletv", name: "Apple TV", category: "Entertainment", desc: "Watch Apple Originals and movies.", rating: 4.8, icon: "appletv.png", native: true },
  { id: "safari", name: "Safari", category: "Utilities", desc: "Fast, secure, and private web browsing.", rating: 4.6, icon: "safari.png", native: true },
  { id: "settings", name: "Settings", category: "Utilities", desc: "Customize system preferences.", rating: 4.3, icon: "settings.png", native: true },
  { id: "calendar", name: "Calendar", category: "Productivity", desc: "Organize your schedule and tasks.", rating: 4.7, icon: "calendar.png", native: true },
  
  // Non-Native Apps (Developer / Productivity)
  { id: "figma", name: "Figma", category: "Graphics & Design", desc: "Collaborative design & prototyping.", rating: 4.9, icon: "figma.png", native: false, url: "https://figma.com" },
  { id: "xcode", name: "Xcode", category: "Developer Tools", desc: "Integrated development for Apple platforms.", rating: 4.8, icon: "terminal.png", native: false },
  { id: "vscode", name: "VS Code", category: "Developer Tools", desc: "Code editing. Redefined.", rating: 4.9, icon: "terminal.png", native: false },
  { id: "notion", name: "Notion", category: "Productivity", desc: "Write, plan, and get organized.", rating: 4.7, icon: "plain.png", native: false },
  { id: "slack", name: "Slack", category: "Business", desc: "Team communication and collaboration.", rating: 4.5, icon: "message.png", native: false },
  
  // Games
  { id: "asphalt", name: "Asphalt 9", category: "Games", desc: "Arcade racing game adventure.", rating: 4.7, icon: "photos.png", native: false, isGame: true },
  { id: "tombraider", name: "Tomb Raider", category: "Games", desc: "Action adventure tomb exploration.", rating: 4.8, icon: "appletv.png", native: false, isGame: true },
  { id: "minecraft", name: "Minecraft", category: "Games", desc: "Explore infinite worlds and build anything.", rating: 4.9, icon: "plain.png", native: false, isGame: true }
];

const FEATURED_APPS = [
  { id: "figma", title: "Collaborative Prototyping", subtitle: "Figma Design System", desc: "Design together in real time with high fidelity mockup tools.", bg: "from-purple-900 to-indigo-950" },
  { id: "xcode", title: "IDE Redefined", subtitle: "Xcode 16 Developer Preview", desc: "Build applications with swift predictive compiler engines.", bg: "from-blue-900 to-slate-950" }
];

const AppStoreIcon = ({ icon, name, fallbackBg = "bg-blue-500" }) => {
  const [hasError, setHasError] = useState(false);
  return (
    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200/50 shadow-sm shrink-0">
      {!hasError ? (
        <img 
          src={`/images/${icon}`} 
          alt={name} 
          onError={() => setHasError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className={`w-full h-full ${fallbackBg} text-white flex items-center justify-center font-bold text-xs uppercase`}>
          {name[0]}
        </div>
      )}
    </div>
  );
};

const AppStore = () => {
  const { openWindow, closeWindow } = useWindowsStore();
  const [activeTab, setActiveTab] = useState("discover"); // discover | play | develop | updates
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // App Install States: 'get' | { status: 'downloading', progress: number } | 'open'
  const [installStates, setInstallStates] = useState(() => {
    // Native apps start as 'open' or 'get'
    const initial = {};
    STORE_APPS.forEach((app) => {
      initial[app.id] = app.native ? "open" : "get";
    });
    return initial;
  });

  const [activeDownloadId, setActiveDownloadId] = useState(null);
  const [alertApp, setAlertApp] = useState(null); // Mock app launch alert modal

  // Handle Download Progress Simulation
  const startDownload = (appId) => {
    setInstallStates((prev) => ({
      ...prev,
      [appId]: { status: "downloading", progress: 0 }
    }));
    setActiveDownloadId(appId);
  };

  useEffect(() => {
    if (!activeDownloadId) return;

    const interval = setInterval(() => {
      setInstallStates((prev) => {
        const appState = prev[activeDownloadId];
        if (appState && appState.status === "downloading") {
          const nextProgress = appState.progress + 10;
          if (nextProgress >= 100) {
            clearInterval(interval);
            // Completed! Set active download to null
            setTimeout(() => setActiveDownloadId(null), 100);
            return { ...prev, [activeDownloadId]: "open" };
          }
          return {
            ...prev,
            [activeDownloadId]: { ...appState, progress: nextProgress }
          };
        }
        return prev;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [activeDownloadId]);

  // Handle Open Application
  const handleOpenApp = (app) => {
    if (app.native) {
      // Close App Store window
      closeWindow("appstore");
      // Open native app window
      openWindow(app.id);
    } else {
      // Show simulated alert modal
      setAlertApp(app);
    }
  };

  // Simulate updating all apps in updates tab
  const [updatingAll, setUpdatingAll] = useState(false);
  const [updateProgresses, setUpdateProgresses] = useState({});

  const handleUpdateAll = () => {
    if (updatingAll) return;
    setUpdatingAll(true);
    
    const appsToUpdate = ["figma", "vscode", "slack"];
    const initialProgress = {};
    appsToUpdate.forEach(id => { initialProgress[id] = 0; });
    setUpdateProgresses(initialProgress);

    const interval = setInterval(() => {
      setUpdateProgresses((prev) => {
        let allDone = true;
        const next = { ...prev };
        appsToUpdate.forEach((id) => {
          if (next[id] < 100) {
            next[id] += Math.floor(Math.random() * 15) + 5;
            if (next[id] > 100) next[id] = 100;
            if (next[id] < 100) allDone = false;
          }
        });
        if (allDone) {
          clearInterval(interval);
          setUpdatingAll(false);
        }
        return next;
      });
    }, 300);
  };

  const filteredApps = STORE_APPS.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAppsByTab = () => {
    if (activeTab === "play") {
      return filteredApps.filter(app => app.isGame);
    }
    if (activeTab === "develop") {
      return filteredApps.filter(app => app.category === "Developer Tools" || app.category === "Productivity");
    }
    return filteredApps;
  };

  // Renders the button state (Get, Progress Ring, Open)
  const renderAppActionButton = (app) => {
    const state = installStates[app.id];

    if (state === "get") {
      return (
        <button
          onClick={() => startDownload(app.id)}
          className="px-5 py-1 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-full text-xs font-bold text-blue-600 transition-colors shadow-sm cursor-pointer"
        >
          GET
        </button>
      );
    }

    if (state && state.status === "downloading") {
      // Circular progress bar
      const radius = 10;
      const circumference = 2 * Math.PI * radius;
      const strokeDashoffset = circumference - (state.progress / 100) * circumference;

      return (
        <div className="relative w-8 h-8 flex items-center justify-center">
          <svg className="w-8 h-8 -rotate-90">
            <circle
              cx="16"
              cy="16"
              r={radius}
              className="stroke-gray-200 fill-none"
              strokeWidth="2.5"
            />
            <circle
              cx="16"
              cy="16"
              r={radius}
              className="stroke-blue-500 fill-none transition-all duration-200"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <span className="absolute text-[8px] font-bold text-blue-500 tabular-nums">
            {state.progress}%
          </span>
        </div>
      );
    }

    return (
      <button
        onClick={() => handleOpenApp(app)}
        className="px-5 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-bold text-gray-800 transition-colors shadow-sm cursor-pointer"
      >
        OPEN
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl overflow-hidden shadow-2xl border border-black/10 select-none text-gray-800 relative">
      
      {/* ================= WINDOW HEADER ================= */}
      <div id="window-header" className="window-header shrink-0 flex items-center justify-between !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2.5">
        <div className="flex items-center gap-4">
          <WindowControls target="appstore" />
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="sm:hidden p-1 rounded hover:bg-gray-200 text-gray-600 transition-colors"
            aria-label="Toggle Sidebar"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform duration-200 ${isSidebarOpen ? "rotate-0" : "rotate-180"}`} />
          </button>
        </div>
        <div className="flex-1 text-center font-bold text-gray-700 text-sm hidden sm:block">
          App Store
        </div>
        <div className="w-14" />
      </div>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-20 sm:hidden"
          />
        )}

        {/* Sidebar */}
        <aside className={`
          absolute sm:relative inset-y-0 left-0 w-52 bg-gray-50 border-r border-[#d1d1d1] p-4 space-y-6 flex flex-col z-30 transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
        `}>
          {/* Search Input */}
          <div className="relative flex items-center bg-gray-200/60 border border-gray-300/40 rounded-lg px-2.5 py-1.5 shrink-0">
            <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search Apps"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs focus:outline-none border-none outline-none text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Menu Sections */}
          <div className="space-y-4 flex-1">
            <nav className="space-y-0.5">
              {[
                { id: "discover", label: "Discover", icon: <Sparkles className="w-4 h-4" /> },
                { id: "play", label: "Play Games", icon: <PlayIcon className="w-4 h-4 fill-current" /> },
                { id: "develop", label: "Work & Develop", icon: <TerminalIcon className="w-4 h-4" /> },
                { id: "updates", label: "Updates", icon: <ArrowDownCircle className="w-4 h-4" /> },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer ${
                    activeTab === item.id 
                      ? "bg-gray-200 text-gray-900 shadow-sm" 
                      : "text-gray-600 hover:bg-gray-200/60 hover:text-gray-900"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Tab View Contents */}
        <main className="flex-1 bg-white overflow-y-auto thin-scrollbar p-6 space-y-8 select-none text-gray-800 h-full min-h-0">
          
          {/* ================= TAB: DISCOVER ================= */}
          {activeTab === "discover" && (
            <>
              {/* Featured Apps Carousel */}
              <section className="space-y-3">
                <h2 className="text-base font-extrabold tracking-tight px-1">Featured</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {FEATURED_APPS.map((item) => (
                    <div 
                      key={item.id}
                      className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${item.bg} text-white p-6 flex flex-col justify-between min-h-[180px] shadow-md border border-black/5`}
                    >
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-white/50">{item.subtitle}</span>
                        <h3 className="text-xl font-extrabold tracking-tight leading-none">{item.title}</h3>
                        <p className="text-[11px] text-white/70 max-w-xs mt-1 line-clamp-2">{item.desc}</p>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <span className="text-[10px] font-bold text-white/40">Developer Preview</span>
                        <button
                          onClick={() => handleOpenApp(STORE_APPS.find(app => app.id === item.id))}
                          className="px-4 py-1.5 bg-white/20 hover:bg-white/30 border border-white/20 rounded-full text-xs font-bold text-white transition-all active:scale-95"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Popular Apps List */}
              <section className="space-y-3">
                <h2 className="text-base font-extrabold tracking-tight px-1">Top Utilities & Productivity</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredApps.filter(app => !app.isGame).slice(0, 6).map((app) => (
                    <div 
                      key={app.id} 
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* App Icon */}
                        <AppStoreIcon icon={app.icon} name={app.name} fallbackBg="bg-blue-500" />
                        {/* Details */}
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-gray-800 truncate">{app.name}</h4>
                          <p className="text-[10px] text-gray-400 truncate">{app.desc}</p>
                          <div className="flex items-center gap-0.5 mt-0.5 text-amber-500">
                            <Star className="w-2.5 h-2.5 fill-current" />
                            <span className="text-[9px] font-bold text-gray-500">{app.rating}</span>
                          </div>
                        </div>
                      </div>

                      {/* Download/Action Button */}
                      <div className="shrink-0 pl-2">
                        {renderAppActionButton(app)}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* ================= TAB: PLAY GAMES ================= */}
          {activeTab === "play" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-extrabold tracking-tight">Play Games</h2>
                <p className="text-xs text-gray-400 mt-0.5">Explore immersive arcade and adventure games designed for Mac.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getAppsByTab().map((app) => (
                  <div 
                    key={app.id} 
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-xl flex items-center justify-center font-bold text-white shadow-sm shrink-0 uppercase">
                        {app.name.slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-gray-800 truncate">{app.name}</h4>
                        <p className="text-[10px] text-gray-400 truncate">{app.desc}</p>
                        <div className="flex items-center gap-0.5 mt-0.5 text-amber-500">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <span className="text-[9px] font-bold text-gray-500">{app.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 pl-2">
                      {renderAppActionButton(app)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB: WORK & DEVELOP ================= */}
          {activeTab === "develop" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-extrabold tracking-tight">Developer & Work Tools</h2>
                <p className="text-xs text-gray-400 mt-0.5">Build apps, manage workspaces, and collaborate with your team.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getAppsByTab().map((app) => (
                  <div 
                    key={app.id} 
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* App Icon */}
                      <AppStoreIcon icon={app.icon} name={app.name} fallbackBg="bg-indigo-500" />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-gray-800 truncate">{app.name}</h4>
                        <p className="text-[10px] text-gray-400 truncate">{app.desc}</p>
                        <div className="flex items-center gap-0.5 mt-0.5 text-amber-500">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <span className="text-[9px] font-bold text-gray-500">{app.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 pl-2">
                      {renderAppActionButton(app)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB: UPDATES ================= */}
          {activeTab === "updates" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h2 className="text-base font-extrabold tracking-tight">App Updates</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Keep your tools updated for the latest system stability enhancements.</p>
                </div>
                <button
                  onClick={handleUpdateAll}
                  disabled={updatingAll}
                  className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:pointer-events-none text-white rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${updatingAll ? "animate-spin" : ""}`} />
                  Update All
                </button>
              </div>

              {/* Updates List */}
              <div className="space-y-4">
                {[
                  { id: "figma", name: "Figma", ver: "v116.4.2", details: "Improves responsiveness of layout resizing and resolves vector rendering glitches." },
                  { id: "vscode", name: "VS Code", ver: "v1.94.0", details: "Adds typescript syntax compiler accelerators and optimizes window redraw load times." },
                  { id: "slack", name: "Slack", ver: "v4.38.1", details: "Enhances video FaceTime call connection pipelines and optimizes message notification badges." }
                ].map((update) => {
                  const progressVal = updateProgresses[update.id];
                  const isUpdating = progressVal !== undefined && progressVal < 100;
                  const isUpdated = progressVal === 100;

                  return (
                    <div 
                      key={update.id}
                      className="p-4 bg-gray-50/50 rounded-xl border border-gray-150 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                    >
                      <div className="space-y-2 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-gray-800">{update.name}</h4>
                          <span className="text-[10px] bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded font-semibold tabular-nums">{update.ver}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-relaxed max-w-xl">{update.details}</p>
                        
                        {/* Progress Bar */}
                        {isUpdating && (
                          <div className="w-full max-w-[200px] h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 transition-all duration-200" 
                              style={{ width: `${progressVal}%` }}
                            />
                          </div>
                        )}
                      </div>

                      <div className="shrink-0 flex items-center justify-end self-end sm:self-start">
                        {isUpdated ? (
                          <span className="flex items-center gap-1 text-[11px] text-green-600 font-bold">
                            <Check className="w-3.5 h-3.5" />
                            Updated
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              if (updatingAll) return;
                              setUpdateProgresses(p => ({ ...p, [update.id]: 0 }));
                              // Trigger specific progress simulation
                              const updateInterval = setInterval(() => {
                                setUpdateProgresses(prev => {
                                  const current = prev[update.id];
                                  if (current < 100) {
                                    const nextVal = current + 20;
                                    if (nextVal >= 100) {
                                      clearInterval(updateInterval);
                                      return { ...prev, [update.id]: 100 };
                                    }
                                    return { ...prev, [update.id]: nextVal };
                                  }
                                  return prev;
                                });
                              }, 200);
                            }}
                            disabled={isUpdating}
                            className="px-4 py-1 bg-white hover:bg-gray-100 disabled:opacity-40 border border-gray-300/50 rounded-full text-xs font-bold text-gray-700 transition-colors shadow-sm cursor-pointer"
                          >
                            {isUpdating ? "UPDATING..." : "UPDATE"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ================= MOCK ALERT MODAL ================= */}
      {alertApp && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-[320px] bg-white rounded-2xl shadow-2xl border border-black/10 p-5 text-center flex flex-col items-center gap-4 animate-fade-in">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <AppWindow className="w-6 h-6" />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-gray-800">{alertApp.name} Installed</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {alertApp.name} is successfully installed on your desktop! You can now access and run it via custom command simulations inside the Terminal application.
              </p>
            </div>

            <button
              onClick={() => setAlertApp(null)}
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all active:scale-98 shadow-md"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

const AppStoreWindow = windowWrapper(AppStore, "appstore");
export default AppStoreWindow;
