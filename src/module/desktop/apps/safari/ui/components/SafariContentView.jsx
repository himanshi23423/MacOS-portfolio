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
  Search,
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
  bookmarks = [],
  setBookmarks,
  projects = [],
  socials = [],
  backgroundImage,
  setBackgroundImage,
  enabledSections = {},
  setEnabledSections,
  isIframeable,
  readerFont,
  setReaderFont,
  readerTheme,
  setReaderTheme,
  readerFontSize,
  setReaderFontSize,
  toggleReaderMode,
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
              { id: "night", color: "bg-zinc-900 border-zinc-800" },
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
              React is a free and open-source front-end JavaScript library for building user
              interfaces based on components. It is maintained by Meta (formerly Facebook) and a
              community of individual developers and companies.
            </p>

            <p className="leading-relaxed mb-6">
              React can be used as a base in the development of single-page, mobile, or
              server-rendered applications with frameworks like Next.js. Because React is only
              concerned with state management and rendering that state to the DOM, creating React
              applications usually requires the use of additional libraries for routing, as well as
              certain client-side functionality.
            </p>

            <h2 className="text-xl font-bold border-b border-black/10 dark:border-white/10 pb-1.5 mt-8 mb-4">
              Notable features
            </h2>

            <h3 className="text-base font-bold mt-4 mb-2">Components</h3>
            <p className="leading-relaxed mb-6">
              React code is made of entities called components. These components can be rendered to
              a particular element in the DOM using the React DOM library. When rendering a
              component, one can pass in values that are known as "props".
            </p>

            <h3 className="text-base font-bold mt-4 mb-2">Virtual DOM</h3>
            <p className="leading-relaxed mb-6">
              Another notable feature is the use of a virtual Document Object Model, or virtual DOM.
              React creates an in-memory data structure cache, computes the differences, and then
              updates the browser's displayed DOM efficiently.
            </p>

            <h3 className="text-base font-bold mt-4 mb-2">JSX</h3>
            <p className="leading-relaxed mb-6">
              JSX (JavaScript XML) is an extension to the JavaScript language syntax. Write elements
              using HTML-like syntax inside React components.
            </p>

            <h2 className="text-xl font-bold border-b border-black/10 dark:border-white/10 pb-1.5 mt-8 mb-4">
              History
            </h2>
            <p className="leading-relaxed mb-6">
              React was created by Jordan Walke, a software engineer at Facebook. It was first
              deployed on Facebook's News Feed in 2011 and later on Instagram in 2012. It was
              open-sourced at JSConf US in May 2013.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 1. Start Page (safari://start)
  if (activeTab.url === "safari://start") {
    const isLightBg =
      backgroundImage === "#ffffff" ||
      backgroundImage.includes("#ffffff") ||
      backgroundImage.includes("glass") ||
      backgroundImage.includes("#ece9e6");
    const textClass = isLightBg ? "text-gray-800" : "text-white";
    const subTextClass = isLightBg ? "text-gray-500" : "text-white/70";
    const shadowClass = isLightBg ? "" : "drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]";
    const cardClass = isLightBg
      ? "bg-white/80 backdrop-blur-md border border-[#c8cbd0]/50 shadow-sm"
      : "bg-black/40 backdrop-blur-md border border-white/10 shadow-lg text-white";

    return (
      <div
        className="flex-1 overflow-y-auto relative transition-all duration-300 min-h-0 select-none pb-16"
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
            className="max-w-md mx-auto mb-12"
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 bg-white/95 border border-[#c8cbd0] rounded-full px-4.5 py-2.5 text-sm text-gray-700 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20">
              <Search size={14} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search with Google"
                className="w-full bg-transparent border-none outline-none text-gray-800 placeholder-zinc-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    navigateTabTo(
                      `https://www.google.com/search?q=${encodeURIComponent(e.target.value)}`,
                    );
                    e.target.value = "";
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-10">
            {/* Favorites / Bookmarks Section */}
            {enabledSections.favorites && (
              <section>
                <h2 className={`text-lg font-bold ${textClass} ${shadowClass} mb-4`}>Favorites</h2>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-6">
                  {bookmarks.map((fav) => (
                    <div
                      key={fav.id}
                      onClick={() => navigateTabTo(fav.url)}
                      className="flex flex-col items-center gap-2 cursor-pointer group"
                      onMouseDown={(e) => e.stopPropagation()}
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-hover:shadow-md ${cardClass}`}
                      >
                        {fav.img ? (
                          <img
                            src={fav.img}
                            alt={fav.title}
                            className="w-8 h-8 object-contain rounded-md"
                            onError={(e) => {
                              e.target.src = "";
                            }}
                          />
                        ) : (
                          <Globe size={20} className={isLightBg ? "text-gray-600" : "text-white"} />
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-semibold truncate max-w-full text-center ${isLightBg ? "text-gray-600" : "text-white/90"} group-hover:underline`}
                      >
                        {fav.title}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Privacy Report Section */}
            {enabledSections.privacyReport && (
              <section
                className="cursor-pointer"
                onClick={() => navigateTabTo("safari://privacy-report")}
                onMouseDown={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <div
                  className={`rounded-2xl p-5 transition-all duration-200 hover:scale-[1.01] ${cardClass}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-500">
                        <ShieldHalf size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm">Privacy Report</h3>
                        <p className={`text-[11px] ${subTextClass} mt-0.5`}>
                          Safari has prevented 14 trackers from profiling you across your portfolio
                          visit.
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-gray-400" />
                  </div>
                </div>
              </section>
            )}

            {/* Featured Projects Section */}
            <section>
              <h2 className={`text-lg font-bold ${textClass} ${shadowClass} mb-4`}>
                Featured Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={`rounded-2xl overflow-hidden shadow-sm transition-all duration-200 hover:-translate-y-1 ${cardClass}`}
                    onMouseDown={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    <div className="h-44 bg-gray-200/50 relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-sm font-bold mb-1">{project.title}</h3>
                      <p
                        className={`text-[11px] ${subTextClass} mb-4 line-clamp-2 leading-relaxed`}
                      >
                        {project.description}
                      </p>
                      <div className="flex items-center gap-4">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-bold text-blue-500 hover:text-blue-600 transition-colors"
                        >
                          <ExternalLink size={14} /> Live Demo
                        </a>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-1.5 text-xs font-bold ${isLightBg ? "text-gray-600 hover:text-black" : "text-white/80 hover:text-white"} transition-colors`}
                        >
                          Source
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Wallpaper Selection Section */}
            {enabledSections.background && (
              <section>
                <div className="flex items-center gap-1.5 mb-4">
                  <SlidersHorizontal
                    size={14}
                    className={isLightBg ? "text-gray-600" : "text-white"}
                  />
                  <h2 className={`text-sm font-bold ${textClass} ${shadowClass}`}>
                    Customize Start Page
                  </h2>
                </div>
                <div
                  className="flex flex-wrap gap-3.5"
                  onMouseDown={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  {WALLPAPERS.map((wp) => (
                    <button
                      key={wp.id}
                      onClick={() => setBackgroundImage(wp.value)}
                      className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-105 active:scale-95 ${
                        backgroundImage === wp.value
                          ? "border-blue-500 ring-2 ring-blue-500/25 scale-105"
                          : "border-transparent shadow-sm"
                      }`}
                      style={{ background: wp.value }}
                      title={wp.name}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
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
              <p className="text-xs text-gray-500">
                How Safari protects your privacy when compiling portfolios
              </p>
            </div>
          </div>

          {/* Mini Tracker Charts (SVG graph) */}
          <div className="bg-white border border-[#c8cbd0]/60 rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Blocked Trackers (Past 7 Days)
            </h3>
            <div className="h-40 w-full flex items-end justify-between gap-2 pt-4">
              {[12, 18, 14, 25, 9, 32, 14].map((count, idx) => (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end"
                >
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
            <h2 className="text-sm font-bold text-gray-800 mb-4">
              Trackers Prevented from Profiling You
            </h2>
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
                React (also known as React.js or ReactJS) is a free and open-source front-end
                JavaScript library. Click here to read Jordan Walke's component history page in
                Reader View.
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
                OpenStreetMap is a map of the world, created by volunteers and free to use under an
                open license.
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
                This domain is for use in illustrative examples in documents. You can write your
                custom mock pages.
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
            To protect your security,{" "}
            <span className="font-semibold text-gray-700">{activeTab.title}</span> prohibits
            rendering its contents inside other windows.
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
