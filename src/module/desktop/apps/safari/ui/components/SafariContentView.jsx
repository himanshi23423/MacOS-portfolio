import React from "react";
import {
  ShieldHalf,
  ChevronRight,
  ExternalLink,
  SlidersHorizontal,
  X,
  Star,
  Trash2,
  AlertTriangle,
  ArrowRight,
  Globe,
  Settings,
  Minimize2,
  Search
} from "lucide-react";
import { TRACKERS, WALLPAPERS } from "./safariData";

const SafariContentView = ({
  activeTab,
  tabs,
  setActiveTabId,
  handleCloseTab,
  handleNewTab,
  showTabOverview,
  setShowTabOverview,
  addressInput,
  navigateTabTo,
  bookmarks,
  setBookmarks,
  projects,
  socials,
  backgroundImage,
  setBackgroundImage,
  enabledSections,
  setEnabledSections,
  isIframeable,
  readerFont,
  setReaderFont,
  readerTheme,
  setReaderTheme,
  readerFontSize,
  setReaderFontSize,
  toggleReaderMode
}) => {

  // If Tab Overview is active, render the Grid of tabs
  if (showTabOverview) {
    return (
      <div 
        className="flex-1 bg-gray-100 p-6 overflow-y-auto select-none"
        onMouseDown={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6 max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-gray-800">Tabs Overview</h2>
          <button 
            onClick={() => setShowTabOverview(false)}
            className="px-3 py-1 bg-white border border-[#c8cbd0] text-xs font-semibold rounded-md shadow-sm hover:bg-gray-50 flex items-center gap-1"
          >
            <Minimize2 size={12} /> Exit Overview
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {tabs.map((tab) => (
            <div 
              key={tab.id}
              onClick={() => {
                setActiveTabId(tab.id);
                setShowTabOverview(false);
              }}
              className={`group relative border rounded-xl overflow-hidden shadow hover:shadow-lg bg-white cursor-pointer transition-all ${
                tab.id === activeTab.id ? "ring-2 ring-blue-500" : "border-[#c8cbd0]"
              }`}
            >
              <div className="h-28 bg-[#f5f6f8] flex items-center justify-center border-b border-[#c8cbd0]/40 relative">
                <span className="text-3xl text-gray-400">
                  {tab.url === "safari://start" ? "🧭" : "🌐"}
                </span>
                <button
                  onClick={(e) => handleCloseTab(tab.id, e)}
                  className="absolute top-2 right-2 p-1 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors"
                >
                  <X size={10} />
                </button>
              </div>
              <div className="p-2.5 bg-white">
                <p className="text-[11px] font-bold text-gray-800 truncate">{tab.title}</p>
                <p className="text-[9px] text-gray-500 truncate mt-0.5">{tab.url}</p>
              </div>
            </div>
          ))}
          <div 
            onClick={handleNewTab}
            className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-6 text-gray-400 hover:text-gray-600 hover:border-gray-400 cursor-pointer h-[154px]"
          >
            <span className="text-2xl font-bold">+</span>
            <span className="text-[10px] font-bold mt-1">New Tab</span>
          </div>
        </div>
      </div>
    );
  }

  // Reader Mode View (formats content text in a beautiful distraction-free layer)
  if (activeTab.isReaderMode) {
    const isDark = readerTheme === "night";
    const isSepia = readerTheme === "sepia";
    const isGray = readerTheme === "gray";

    let bgClass = "bg-white text-gray-900";
    if (isDark) bgClass = "bg-zinc-950 text-gray-100";
    if (isSepia) bgClass = "bg-[#f4ebd0] text-[#4f3824]";
    if (isGray) bgClass = "bg-zinc-800 text-zinc-100";

    const fontStyle = readerFont === "serif" ? "font-serif" : "font-sans";

    return (
      <div className={`flex-1 flex flex-col min-h-0 select-text overflow-hidden ${bgClass}`}>
        {/* Reader Mode Tooling Bar */}
        <div 
          className="border-b px-6 py-2.5 flex items-center justify-between shrink-0 select-none bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10"
          onMouseDown={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-4 text-xs font-semibold">
            {/* Font switcher */}
            <div className="flex bg-black/5 dark:bg-white/5 rounded p-0.5">
              <button 
                onClick={() => setReaderFont("serif")} 
                className={`px-2 py-0.5 rounded ${readerFont === "serif" ? "bg-white text-gray-800 shadow-sm" : "opacity-60"}`}
              >
                Serif
              </button>
              <button 
                onClick={() => setReaderFont("sans")} 
                className={`px-2 py-0.5 rounded ${readerFont === "sans" ? "bg-white text-gray-800 shadow-sm" : "opacity-60"}`}
              >
                Sans
              </button>
            </div>

            {/* Font Resizing */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setReaderFontSize(Math.max(12, readerFontSize - 2))} 
                className="w-6 h-6 rounded bg-black/5 dark:bg-white/5 flex items-center justify-center text-xs"
              >
                A-
              </button>
              <span>{readerFontSize}px</span>
              <button 
                onClick={() => setReaderFontSize(Math.min(24, readerFontSize + 2))} 
                className="w-6 h-6 rounded bg-black/5 dark:bg-white/5 flex items-center justify-center text-xs"
              >
                A+
              </button>
            </div>
          </div>

          {/* Theme switcher */}
          <div className="flex gap-2">
            {[
              { id: "white", color: "bg-white border-gray-300" },
              { id: "sepia", color: "bg-[#f4ebd0] border-[#d4c5a0]" },
              { id: "gray", color: "bg-zinc-600 border-zinc-500" },
              { id: "night", color: "bg-zinc-900 border-zinc-800" }
            ].map((theme) => (
              <button
                key={theme.id}
                onClick={() => setReaderTheme(theme.id)}
                className={`w-5 h-5 rounded-full border ${theme.color} ${
                  readerTheme === theme.id ? "ring-2 ring-blue-500" : ""
                }`}
              />
            ))}
            <button 
              onClick={toggleReaderMode}
              className="text-xs font-semibold text-blue-500 hover:underline ml-2"
            >
              Exit Reader
            </button>
          </div>
        </div>

        {/* Reader Content View */}
        <div className="flex-1 overflow-y-auto px-8 py-12 max-w-2xl mx-auto w-full">
          <div className={`${fontStyle}`} style={{ fontSize: `${readerFontSize}px` }}>
            <h1 className="text-3xl font-bold leading-tight mb-4">React (JavaScript library)</h1>
            <p className="opacity-70 text-xs mb-8">From Wikipedia, the free encyclopedia</p>
            
            <p className="leading-relaxed mb-6">
              React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies.
            </p>
            
            <p className="leading-relaxed mb-6">
              React can be used as a base in the development of single-page, mobile, or server-rendered applications with frameworks like Next.js. Because React is only concerned with state management and rendering that state to the DOM, creating React applications usually requires the use of additional libraries for routing, as well as certain client-side functionality.
            </p>

            <h2 className="text-xl font-bold border-b border-black/10 dark:border-white/10 pb-1.5 mt-8 mb-4">Notable features</h2>
            
            <h3 className="text-base font-bold mt-4 mb-2">Components</h3>
            <p className="leading-relaxed mb-6">
              React code is made of entities called components. These components can be rendered to a particular element in the DOM using the React DOM library. When rendering a component, one can pass in values that are known as "props".
            </p>

            <h3 className="text-base font-bold mt-4 mb-2">Virtual DOM</h3>
            <p className="leading-relaxed mb-6">
              Another notable feature is the use of a virtual Document Object Model, or virtual DOM. React creates an in-memory data structure cache, computes the differences, and then updates the browser's displayed DOM efficiently.
            </p>

            <h3 className="text-base font-bold mt-4 mb-2">JSX</h3>
            <p className="leading-relaxed mb-6">
              JSX (JavaScript XML) is an extension to the JavaScript language syntax. Write elements using HTML-like syntax inside React components.
            </p>

            <h2 className="text-xl font-bold border-b border-black/10 dark:border-white/10 pb-1.5 mt-8 mb-4">History</h2>
            <p className="leading-relaxed mb-6">
              React was created by Jordan Walke, a software engineer at Facebook. It was first deployed on Facebook's News Feed in 2011 and later on Instagram in 2012. It was open-sourced at JSConf US in May 2013.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 1. Start Page (safari://start)
  if (activeTab.url === "safari://start") {
    const isLightBg = backgroundImage === "#ffffff" || backgroundImage.includes("#ffffff") || backgroundImage.includes("glass") || backgroundImage.includes("#ece9e6");
    const textClass = isLightBg ? "text-gray-800" : "text-white";
    const textMutedClass = isLightBg ? "text-gray-500" : "text-white/70";
    const cardBgClass = isLightBg ? "bg-[#f5f6f8] border-black/5" : "bg-black/20 border-white/10";
    const innerCardBgClass = isLightBg ? "bg-white border-gray-150 shadow-sm" : "bg-white/10 border-white/5";
    const shadowClass = isLightBg ? "" : "drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]";
    const headerShadowClass = isLightBg ? "" : "drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)]";

    return (
      <div 
        className="flex-1 overflow-y-auto relative transition-all duration-300 min-h-0"
        style={{ background: backgroundImage }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-8 py-14">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className={`text-4xl font-extrabold ${textClass} ${shadowClass} tracking-wide`}>
              Safari
            </h1>
          </div>

          {/* Central Search Bar */}
          <div 
            className="max-w-md mx-auto mb-10" 
            onMouseDown={(e) => e.stopPropagation()} 
            onPointerDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 bg-white/95 border border-[#c8cbd0] rounded-full px-4.5 py-2.5 text-sm text-gray-700 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20">
              <Search size={14} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search with Google"
                className="flex-1 bg-transparent border-none outline-none text-xs text-gray-800"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    navigateTabTo(e.target.value);
                  }
                }}
              />
            </div>
          </div>

          {/* Favorites */}
          {enabledSections.favorites && (
            <section className={`mb-12 ${cardBgClass} backdrop-blur-md rounded-2xl p-6 border`}>
              <h2 className={`text-sm font-bold ${textClass} mb-4 tracking-wider uppercase opacity-90 ${headerShadowClass}`}>
                Favorites
              </h2>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-5">
                {bookmarks.map((favorite) => (
                  <div
                    key={favorite.id}
                    onClick={() => navigateTabTo(favorite.url)}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center transition-all duration-200 group-hover:scale-105">
                      {favorite.img ? (
                        <img src={favorite.img} alt="" className="w-6 h-6 object-contain" />
                      ) : (
                        <span className="text-xs font-bold text-gray-500">{favorite.title[0]}</span>
                      )}
                    </div>
                    <span className={`text-[10px] font-bold ${textClass} text-center truncate w-14 ${shadowClass}`}>
                      {favorite.title}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Privacy Report card */}
          {enabledSections.privacyReport && (
            <section className="mb-12">
              <div 
                onClick={() => navigateTabTo("safari://privacy-report")}
                className={`${cardBgClass} backdrop-blur-md rounded-2xl p-5 border cursor-pointer hover:opacity-90 transition-all flex items-center justify-between`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-500 dark:text-blue-300">
                    <ShieldHalf size={24} />
                  </div>
                  <div>
                    <h3 className={`font-bold ${textClass} ${shadowClass}`}>Privacy Report</h3>
                    <p className={`text-xs ${textMutedClass} mt-1`}>
                      Safari has prevented {TRACKERS.reduce((acc, curr) => acc + curr.count, 0)} tracker attempts. Click to view analysis.
                    </p>
                  </div>
                </div>
                <ChevronRight className={`${textMutedClass}`} size={18} />
              </div>
            </section>
          )}

          {/* Reading List / Projects */}
          {enabledSections.readingList && (
            <section className={`mb-12 ${cardBgClass} backdrop-blur-md rounded-2xl p-6 border`}>
              <h2 className={`text-sm font-bold ${textClass} mb-5 tracking-wider uppercase opacity-90 ${headerShadowClass}`}>
                Featured Reading List
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((project) => (
                  <div 
                    key={project.id} 
                    className={`${innerCardBgClass} rounded-xl overflow-hidden flex flex-col justify-between`}
                  >
                    <div className="h-36 bg-black/10 overflow-hidden">
                      <img src={project.image} alt="" className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform" />
                    </div>
                    <div className="p-4">
                      <h3 className={`text-sm font-extrabold ${isLightBg ? "text-gray-800" : "text-white"}`}>{project.title}</h3>
                      <p className={`text-[11px] ${isLightBg ? "text-gray-500" : "text-white/70"} line-clamp-2 mt-1 leading-relaxed`}>
                        {project.description}
                      </p>
                      <div className="flex gap-4 mt-3">
                        <button 
                          onClick={() => navigateTabTo(project.link || "https://github.com/kuldeeprajput-dev")}
                          className="flex items-center gap-1 text-[11px] font-bold text-blue-500 hover:underline"
                        >
                          <ExternalLink size={12} /> Open Page
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Customize options */}
          <section className="mt-14 flex flex-col items-center">
            <div className="flex bg-[#e3e4e6] dark:bg-black/45 backdrop-blur-md rounded-full px-4 py-2 border border-[#c8cbd0] dark:border-white/15 items-center gap-4 shadow-sm">
              <div className={`flex items-center gap-1.5 text-[11px] ${isLightBg ? "text-gray-700" : "text-white/90"} font-bold border-r border-[#c8cbd0] dark:border-white/10 pr-3`}>
                <SlidersHorizontal size={12} /> Wallpaper
              </div>
              <div className="flex gap-2">
                {WALLPAPERS.map((wp) => (
                  <button
                    key={wp.id}
                    onClick={() => setBackgroundImage(wp.value)}
                    className={`w-5.5 h-5.5 rounded-full border border-white/20 transition-transform hover:scale-110 ${
                      backgroundImage === wp.value ? "ring-2 ring-blue-500 scale-105" : ""
                    }`}
                    style={{ background: wp.value }}
                    title={wp.name}
                  />
                ))}
              </div>
            </div>

            {/* Custom section checkboxes */}
            <div className={`flex gap-6 mt-4 text-[10px] ${textMutedClass} select-none`}>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={enabledSections.favorites} 
                  onChange={(e) => setEnabledSections(prev => ({ ...prev, favorites: e.target.checked }))} 
                />
                Favorites
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={enabledSections.privacyReport} 
                  onChange={(e) => setEnabledSections(prev => ({ ...prev, privacyReport: e.target.checked }))} 
                />
                Privacy
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={enabledSections.readingList} 
                  onChange={(e) => setEnabledSections(prev => ({ ...prev, readingList: e.target.checked }))} 
                />
                Reading List
              </label>
            </div>
          </section>

        </div>
      </div>
    );
  }

  // 2. Detailed Privacy Report (safari://privacy-report)
  if (activeTab.url === "safari://privacy-report") {
    return (
      <div 
        className="flex-1 bg-[#f5f6f8] overflow-y-auto p-8 select-text text-gray-800"
        onMouseDown={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <ShieldHalf size={32} className="text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold">Privacy Report</h1>
              <p className="text-xs text-gray-500">How Safari protects your privacy when compiling portfolios</p>
            </div>
          </div>

          {/* Mini Tracker Charts (SVG graph) */}
          <div className="bg-white border border-[#c8cbd0]/60 rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Blocked Trackers (Past 7 Days)</h3>
            <div className="h-40 w-full flex items-end justify-between gap-2 pt-4">
              {[12, 18, 14, 25, 9, 32, 14].map((count, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[10px] text-gray-500 font-bold">{count}</span>
                  <div 
                    className="w-full bg-blue-500 hover:bg-blue-600 transition-all rounded-t-sm"
                    style={{ height: `${(count / 35) * 100}%` }}
                  />
                  <span className="text-[9px] text-gray-400 font-semibold">Day {idx + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tracker list */}
          <div className="bg-white border border-[#c8cbd0]/60 rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-bold text-gray-800 mb-4">Trackers Prevented from Profiling You</h2>
            <div className="divide-y divide-[#c8cbd0]/45">
              {TRACKERS.map((tracker, idx) => (
                <div key={idx} className="flex items-center justify-between py-2.5 text-xs">
                  <div>
                    <p className="font-bold text-gray-700">{tracker.name}</p>
                    <p className="text-[10px] text-gray-400">{tracker.category}</p>
                  </div>
                  <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold text-[10px]">
                    {tracker.count} Blocked
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Search Results Mockup (e.g. google.com/search)
  if (activeTab.url.includes("google.com/search")) {
    const query = new URL(activeTab.url).searchParams.get("q") || "Search";
    return (
      <div 
        className="flex-1 bg-white select-text overflow-y-auto p-6 text-gray-800"
        onMouseDown={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="max-w-2xl w-full space-y-6">
          <div className="flex items-center gap-4 border-b pb-4 border-gray-150">
            <span 
              onClick={() => navigateTabTo("safari://start")}
              className="font-bold text-2xl tracking-tight cursor-pointer text-blue-600 hover:opacity-85 select-none"
            >
              Google
            </span>
            <div className="flex-1 max-w-md border border-gray-300 rounded-full px-4 py-1.5 text-xs flex items-center bg-white shadow-sm">
              <span className="truncate flex-1 font-medium">{query}</span>
              <Search className="w-3.5 h-3.5 text-blue-500" />
            </div>
          </div>

          <div className="space-y-6 pt-2">
            <div className="space-y-1">
              <span className="text-[10px] text-gray-500">https://wikipedia.org</span>
              <h4 
                onClick={() => navigateTabTo("https://en.wikipedia.org")} 
                className="text-base text-blue-600 hover:underline cursor-pointer font-medium leading-tight"
              >
                React - The Free Encyclopedia
              </h4>
              <p className="text-xs text-gray-600 leading-normal">
                React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library. Click here to read Jordan Walke's component history page in Reader View.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-gray-500">https://openstreetmap.org</span>
              <h4 
                onClick={() => navigateTabTo("https://openstreetmap.org")} 
                className="text-base text-blue-600 hover:underline cursor-pointer font-medium leading-tight"
              >
                OpenStreetMap - Free Wiki World Map
              </h4>
              <p className="text-xs text-gray-600 leading-normal">
                OpenStreetMap is a map of the world, created by volunteers and free to use under an open license.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-gray-500">https://example.com</span>
              <h4 
                onClick={() => navigateTabTo("https://example.com")} 
                className="text-base text-blue-600 hover:underline cursor-pointer font-medium leading-tight"
              >
                Example Domain
              </h4>
              <p className="text-xs text-gray-600 leading-normal">
                This domain is for use in illustrative examples in documents. You can write your custom mock pages.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. Real Iframe Support
  if (!activeTab.url.startsWith("safari://") && isIframeable(activeTab.url)) {
    let sourceUrl = activeTab.url;
    if (activeTab.url.toLowerCase().includes("openstreetmap.org")) {
      sourceUrl = "https://www.openstreetmap.org/export/embed.html";
    }
    return (
      <iframe
        src={sourceUrl}
        title={activeTab.title}
        className="flex-1 w-full h-full border-none bg-white relative z-0"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    );
  }

  // 5. Fallback warning layout (Sandbox Fallback)
  return (
    <div 
      className="flex-1 bg-slate-50 flex items-center justify-center p-6 overflow-y-auto"
      onMouseDown={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-lg max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-gray-800">Connection Sandboxed</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            To protect your security, <span className="font-semibold text-gray-700">{activeTab.title}</span> prohibits rendering its contents inside other windows.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-center gap-2">
          <Globe className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-600 truncate">{activeTab.url}</span>
        </div>
        <div className="flex flex-col gap-2 pt-2">
          <a 
            href={activeTab.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
          >
            Open in New Window <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <button 
            onClick={() => navigateTabTo("safari://start")}
            className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all"
          >
            Back to Start Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default SafariContentView;
