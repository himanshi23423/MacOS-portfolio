import React from "react";
import { Search, AlertTriangle, ArrowRight, X, Printer } from "lucide-react";
import ChromeNewTab from "./ChromeNewTab";
import ChromeSettings from "./ChromeSettings";
import ChromeHistory from "./ChromeHistory";

const ChromePageView = ({
  activeTab,
  theme,
  settingsThemeClasses,
  searchEngine,
  googleSearchQuery,
  setGoogleSearchQuery,
  navigateTabTo,
  bookmarks,
  setBookmarks,
  isGitHubUrl,
  isLinkedInUrl,
  isTwitterUrl,
  isWikipediaUrl,
  isIframeable,
  isAdBlockerActive,
  setIsAdBlockerActive,
  isLensScanning,
  setIsLensScanning,
  showCastDialog,
  setShowCastDialog,
  castDevice,
  setCastDevice,
  isCastConnecting,
  setIsCastConnecting,
  showQrCode,
  setShowQrCode,
  zoom,
  fontSize,
  activeSettingsSection,
  setActiveSettingsSection,
  username,
  setUsername,
  profileColor,
  setProfileColor,
  isSyncActive,
  setIsSyncActive,
  showBookmarks,
  setShowBookmarks,
  setFontSize,
  setSearchEngine,
  historyList,
  setHistoryList,
  setTabs,
  setActiveTabId,
  highlightText,
  findText,
  downloadsList,
  setDownloadsList,
}) => {
  return (
    <div
      className="w-full h-full"
      style={{
        transform: `scale(${zoom / 100})`,
        transformOrigin: "top left",
        width: `${100 / (zoom / 100)}%`,
        height: `${100 / (zoom / 100)}%`,
        fontSize: fontSize === "small" ? "11px" : fontSize === "large" ? "15px" : "13px",
      }}
    >
      {/* Google Lens scan effect layer */}
      {isLensScanning && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center pointer-events-auto">
          <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 border-2 border-blue-500 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-blue-500" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-blue-500" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-blue-500" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-blue-500" />
            <div
              className="w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_10px_blue] absolute animate-pulse"
              style={{ animationDuration: "1.5s" }}
            />
          </div>
          <div className="absolute bottom-20 bg-zinc-900/90 text-white border border-zinc-700 px-5 py-2.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2">
            <Search className="w-4 h-4 text-blue-400 animate-spin" />
            <span>Scanning screen with Google Lens...</span>
            <button
              onClick={() => setIsLensScanning(false)}
              className="ml-4 text-zinc-400 hover:text-white font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Cast Dialog */}
      {showCastDialog && (
        <div className="absolute inset-0 bg-black/40 z-50 flex items-center justify-center p-6 pointer-events-auto">
          <div
            className={`w-80 rounded-xl border p-5 shadow-2xl space-y-4 ${
              theme === "dark"
                ? "bg-[#282a2d] border-zinc-700/80 text-zinc-100 shadow-black/45"
                : "bg-white border-gray-200 text-gray-800 shadow-neutral-300/40"
            }`}
          >
            <div className="flex items-center justify-between border-b pb-2.5 border-neutral-200 dark:border-zinc-700/30">
              <span className="font-bold text-sm flex items-center gap-2">
                <Printer className="w-4 h-4 text-blue-500" /> Cast tab
              </span>
              <button onClick={() => setShowCastDialog(false)}>
                <X className="w-4 h-4 text-zinc-400 hover:text-zinc-200" />
              </button>
            </div>
            {castDevice ? (
              <div className="space-y-4 text-center py-2">
                {isCastConnecting ? (
                  <div className="space-y-2">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs font-semibold font-sans">Connecting to {castDevice}...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto">
                      <Globe className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-blue-500">Casting active</p>
                      <p
                        className={`text-[10px] ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                      >
                        Streaming active tab viewport to {castDevice}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setCastDevice(null);
                        setIsCastConnecting(false);
                      }}
                      className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-bold transition-all shadow"
                    >
                      Stop Casting
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <p
                  className={`text-[10px] ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                >
                  Select Cast-enabled streaming device:
                </p>
                {["Living Room TV", "Bedroom Smart TV", "Kunal's Nest Hub"].map((device, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCastDevice(device);
                      setIsCastConnecting(true);
                      setTimeout(() => {
                        setIsCastConnecting(false);
                      }, 2000);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all text-xs font-semibold flex items-center justify-between ${
                      theme === "dark"
                        ? "hover:bg-white/5 bg-zinc-800/40 text-zinc-200"
                        : "hover:bg-neutral-100 bg-neutral-50/50 text-gray-700 border border-neutral-200/40"
                    }`}
                  >
                    <span>{device}</span>
                    <span className="text-[9px] bg-blue-600/10 text-blue-500 px-1.5 py-0.5 rounded font-bold">
                      Connect
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQrCode && (
        <div className="absolute inset-0 bg-black/40 z-50 flex items-center justify-center p-6 pointer-events-auto">
          <div
            className={`w-80 rounded-xl border p-5 shadow-2xl space-y-4 text-center ${
              theme === "dark"
                ? "bg-[#282a2d] border-zinc-700/80 text-zinc-100 shadow-black/45"
                : "bg-white border-gray-200 text-gray-800 shadow-neutral-300/40"
            }`}
          >
            <div className="flex items-center justify-between border-b pb-2.5 border-neutral-200 dark:border-zinc-700/30 text-left">
              <span className="font-bold text-sm">Create QR Code</span>
              <button onClick={() => setShowQrCode(false)}>
                <X className="w-4 h-4 text-zinc-400 hover:text-zinc-200" />
              </button>
            </div>
            <div className="w-36 h-36 bg-white p-2.5 rounded-lg border border-gray-200 mx-auto shadow-inner flex items-center justify-center relative">
              <svg className="w-32 h-32 text-black" viewBox="0 0 29 29" shapeRendering="crispEdges">
                <path fill="currentColor" d="M0 0h7v7H0zm22 0h7v7h-7zM0 22h7v7H0z" />
                <path fill="currentColor" d="M2 2h3v3H2zm22 2h3v3h-3zm-22 20h3v3H2z" />
                <path
                  fill="currentColor"
                  d="M9 1h1v1H9zm2 1h1v1h-1zm3 0h2v1h-2zm4 0h1v2h-1zm-9 3h2v1H9zm4 1h1v1h-1zm5 0h1v1h-1zm-9 3h1v1H9zm4 1h1v1h-1zm2 0h1v2h-1zm3 0h1v1h-1zm-5 3h1v1h-1zm4 1h2v1h-2zm-6 2h1v1h-1zm4 0h1v1h-1zm2 0h2v1h-2zm3 0h1v2h-1zm-9 3h1v1H9zm4 1h1v1h-1zm3 0h2v1h-2zm4 0h1v1h-1z"
                />
                <circle cx="14.5" cy="14.5" r="3.5" fill="white" />
                <circle cx="14.5" cy="14.5" r="2.5" fill="currentColor" />
              </svg>
            </div>
            <div className="space-y-1">
              <p
                className={`text-[10px] ${theme === "dark" ? "text-gray-400" : "text-gray-500"} truncate max-w-[240px] mx-auto`}
              >
                {activeTab.url}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  alert("QR Code downloaded to device!");
                  setShowQrCode(false);
                }}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow"
              >
                Download
              </button>
              <button
                onClick={() => setShowQrCode(false)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all ${theme === "dark" ? "border-zinc-700 text-zinc-300 hover:bg-zinc-800" : "border-gray-300 text-gray-600 hover:bg-gray-50"}`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ChromeNewTab
        activeTab={activeTab}
        searchEngine={searchEngine}
        googleSearchQuery={googleSearchQuery}
        setGoogleSearchQuery={setGoogleSearchQuery}
        navigateTabTo={navigateTabTo}
        bookmarks={bookmarks}
        theme={theme}
      />

      {/* Search Results Mockup */}
      {activeTab.url.includes("google.com/search") && (
        <div
          className={`absolute inset-0 flex flex-col p-6 select-none overflow-y-auto ${theme === "dark" ? "bg-[#202124] text-white" : "bg-[#ffffff] text-gray-800"}`}
        >
          <div className="max-w-2xl w-full space-y-6">
            <div
              className={`flex items-center gap-4 border-b pb-4 ${theme === "dark" ? "border-gray-800" : "border-gray-150"}`}
            >
              <span
                onClick={() => navigateTabTo("chrome://newtab")}
                className={`font-bold text-2xl tracking-tight cursor-pointer select-none ${searchEngine === "Google" ? "text-blue-500" : searchEngine === "Bing" ? "text-teal-600" : "text-orange-500"}`}
              >
                {searchEngine}
              </span>
              <div
                className={`flex-1 max-w-md border rounded-full px-4 py-1.5 text-xs flex items-center ${theme === "dark" ? "bg-[#35363a] border-[#404144]" : "bg-white border-[#dadce0]"}`}
              >
                <span className="truncate flex-1">
                  {new URL(activeTab.url).searchParams.get("q")}
                </span>
                <Search className="w-3.5 h-3.5 text-blue-500" />
              </div>
            </div>
            <div className="space-y-6 pt-2">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-500">https://wikipedia.org</span>
                <h4
                  onClick={() => navigateTabTo("https://en.wikipedia.org")}
                  className="text-base text-[#1a0dab] dark:text-blue-400 hover:underline cursor-pointer font-medium leading-tight"
                >
                  Wikipedia - The Free Encyclopedia
                </h4>
                <p
                  className={`text-xs leading-normal ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                >
                  Wikipedia is a free online encyclopedia, created and edited by volunteers around
                  the world and hosted by the Wikimedia Foundation.
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-gray-500">https://openstreetmap.org</span>
                <h4
                  onClick={() => navigateTabTo("https://openstreetmap.org")}
                  className="text-base text-[#1a0dab] dark:text-blue-400 hover:underline cursor-pointer font-medium leading-tight"
                >
                  OpenStreetMap - Free Wiki World Map
                </h4>
                <p
                  className={`text-xs leading-normal ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                >
                  OpenStreetMap is a map of the world, created by people like you and free to use
                  under an open license.
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-gray-500">https://example.com</span>
                <h4
                  onClick={() => navigateTabTo("https://example.com")}
                  className="text-base text-[#1a0dab] dark:text-blue-400 hover:underline cursor-pointer font-medium leading-tight"
                >
                  Example Domain
                </h4>
                <p
                  className={`text-xs leading-normal ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                >
                  This domain is for use in illustrative examples in documents.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Real IFrame Renderer */}
      {activeTab.url !== "chrome://newtab" &&
        !activeTab.url.includes("google.com/search") &&
        !activeTab.url.startsWith("chrome://") &&
        isIframeable(activeTab.url) && (
          <iframe
            src={
              activeTab.url.toLowerCase().includes("openstreetmap.org")
                ? "https://www.openstreetmap.org/export/embed.html"
                : activeTab.url
            }
            title={activeTab.title}
            className="w-full h-full border-none bg-white z-0 relative"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        )}

      {/* Sandbox fallback */}
      {activeTab.url !== "chrome://newtab" &&
        !activeTab.url.includes("google.com/search") &&
        !activeTab.url.startsWith("chrome://") &&
        !isGitHubUrl &&
        !isLinkedInUrl &&
        !isTwitterUrl &&
        !isWikipediaUrl &&
        !isIframeable(activeTab.url) && (
          <div className="absolute inset-0 bg-slate-50 flex items-center justify-center p-6 overflow-y-auto">
            <div className="bg-white border border-slate-200/80 p-8 rounded-2xl shadow-lg max-w-md w-full text-center space-y-6">
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
              <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 flex items-center justify-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-semibold text-slate-600 truncate">
                  {activeTab.url}
                </span>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <a
                  href={activeTab.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
                >
                  Open in New Tab <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => navigateTabTo("chrome://newtab")}
                  className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all"
                >
                  Back to New Tab
                </button>
              </div>
            </div>
          </div>
        )}

      {/* GitHub Profile Mock */}
      {isGitHubUrl && (
        <div className="absolute inset-0 bg-[#0d1117] text-[#c9d1d9] flex flex-col font-sans select-text overflow-y-auto z-0">
          <div className="bg-[#161b22] px-6 py-3 border-b border-[#30363d] flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-3">
              <img src="/images/github.png" alt="GitHub Logo" className="w-8 h-8 invert" />
              <span className="font-bold text-white text-sm">GitHub</span>
              <div className="bg-[#0d1117] border border-[#30363d] px-3 py-1 rounded-md text-[11px] w-64 text-[#8b949e]">
                Search or jump to...
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#8b949e] font-semibold">
              <span>Pull requests</span>
              <span>Issues</span>
              <span>Codespaces</span>
              <span>Marketplace</span>
              <div className="w-6 h-6 rounded-full overflow-hidden border border-[#30363d]">
                <img
                  src="/images/profile.jpg"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 flex p-8 gap-8 max-w-6xl mx-auto w-full min-h-0">
            <div className="w-64 shrink-0 space-y-4">
              <div className="w-60 h-60 rounded-full overflow-hidden border-2 border-[#30363d] shadow-lg">
                <img
                  src="/images/profile.jpg"
                  alt="Kuldeep Rajput avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white leading-tight">Kuldeep Rajput</h2>
                <h3 className="text-[#8b949e] text-sm">kuldeeprajput-dev</h3>
              </div>
              <button className="w-full py-1.5 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] rounded-md font-semibold text-xs transition-colors">
                Follow
              </button>
              <p className="text-xs text-[#c9d1d9] leading-relaxed">
                Full Stack Developer | Building interactive macOS web portfolios, screens, and
                custom browser simulations.
              </p>
              <div className="text-xs text-[#8b949e] space-y-1.5 pt-2">
                <div className="flex items-center gap-1.5">
                  <span>📍</span> Mumbai, India
                </div>
                <div className="flex items-center gap-1.5">
                  <span>🔗</span>{" "}
                  <a
                    href="https://github.com/kuldeeprajput-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    github.com/kuldeeprajput-dev
                  </a>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <div className="flex gap-6 border-b border-[#30363d] pb-2 text-xs font-semibold text-[#8b949e] select-none">
                <span className="text-white border-b-2 border-[#f78166] pb-2">Overview</span>
                <span>
                  Repositories{" "}
                  <span className="bg-[#30363d] px-1.5 py-0.5 rounded-full text-[10px]">12</span>
                </span>
                <span>Projects</span>
                <span>Packages</span>
                <span>Stars</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white">Pinned</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      name: "MacOS-portfolio",
                      desc: "Beautiful macos desktop portfolio simulator built with React, Vite and Tailwind.",
                      lang: "JavaScript",
                      color: "bg-[#f1e05a]",
                      stars: "142",
                      forks: "28",
                    },
                    {
                      name: "insta-things-downloader",
                      desc: "Clean media downloader application for Instagram posts, reels, and highlights.",
                      lang: "TypeScript",
                      color: "bg-[#3178c6]",
                      stars: "89",
                      forks: "12",
                    },
                    {
                      name: "resume-ats-scanner",
                      desc: "AI powered resume screening platform comparing job description keywords against resumes.",
                      lang: "Python",
                      color: "bg-[#3572A5]",
                      stars: "64",
                      forks: "0",
                    },
                    {
                      name: "newtube",
                      desc: "A modern, lightweight YouTube alternative client with ad-blocking and picture-in-picture.",
                      lang: "JavaScript",
                      color: "bg-[#f1e05a]",
                      stars: "52",
                      forks: "0",
                    },
                  ].map((repo, idx) => (
                    <div
                      key={idx}
                      className="bg-[#161b22] border border-[#30363d] rounded-md p-4 space-y-3 flex flex-col justify-between hover:border-[#8b949e]/50 transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-blue-400 hover:underline cursor-pointer">
                            {repo.name}
                          </span>
                          <span className="border border-[#30363d] px-1.5 py-0.5 rounded-full text-[9px] text-[#8b949e]">
                            Public
                          </span>
                        </div>
                        <p className="text-[11px] text-[#8b949e] mt-2 leading-relaxed">
                          {repo.desc}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] text-[#8b949e]">
                        <span className="flex items-center gap-1">
                          <span className={`w-3 h-3 rounded-full ${repo.color}`} /> {repo.lang}
                        </span>
                        <span>⭐ {repo.stars}</span>
                        {repo.forks !== "0" && <span>Fork {repo.forks}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#161b22] border border-[#30363d] rounded-md p-4 space-y-3">
                <h4 className="text-xs font-semibold text-white">
                  1,245 contributions in the last year
                </h4>
                <div className="flex flex-wrap gap-1 select-none">
                  {Array.from({ length: 140 }).map((_, idx) => {
                    let color = "bg-[#161b22] border border-[#30363d]";
                    if (idx % 7 === 0 || idx % 11 === 0) color = "bg-[#0e4429]";
                    else if (idx % 13 === 0) color = "bg-[#006d32]";
                    else if (idx % 19 === 0) color = "bg-[#26a641]";
                    else if (idx % 23 === 0) color = "bg-[#39d353]";
                    return <div key={idx} className={`w-2.5 h-2.5 rounded-sm ${color}`} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LinkedIn Profile Mock */}
      {isLinkedInUrl && (
        <div className="absolute inset-0 bg-[#f3f2f0] text-gray-800 flex flex-col font-sans select-text overflow-y-auto z-0">
          <div className="bg-white border-b border-gray-200 px-6 py-2 flex items-center justify-between shrink-0 select-none shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src="/images/linkedin.png"
                alt="LinkedIn Logo"
                className="w-8 h-8 object-contain"
              />
              <div className="bg-[#edf3f8] border-none px-3 py-1.5 rounded-md text-[11px] w-64 text-gray-500 flex items-center gap-2">
                <span>🔍</span> Search members, jobs...
              </div>
            </div>
            <div className="flex items-center gap-6 text-[10px] text-gray-500 font-semibold">
              <span className="flex flex-col items-center cursor-pointer">
                🏠 <span>Home</span>
              </span>
              <span className="flex flex-col items-center cursor-pointer">
                👥 <span>My Network</span>
              </span>
              <span className="flex flex-col items-center cursor-pointer">
                💼 <span>Jobs</span>
              </span>
              <span className="flex flex-col items-center cursor-pointer">
                💬 <span>Messaging</span>
              </span>
              <span className="flex flex-col items-center cursor-pointer">
                🔔 <span>Notifications</span>
              </span>
              <div className="flex flex-col items-center border-l pl-4 cursor-pointer">
                <img
                  src="/images/profile.jpg"
                  alt="Me avatar"
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span>Me ▼</span>
              </div>
            </div>
          </div>
          <div className="flex-1 max-w-4xl mx-auto w-full p-6 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="h-44 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 relative" />
              <div className="px-6 pb-6 relative">
                <div className="w-36 h-36 rounded-full border-4 border-white overflow-hidden absolute -top-18 left-6 shadow-md">
                  <img
                    src="/images/profile.jpg"
                    alt="Kuldeep Rajput"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pt-20 space-y-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Kuldeep Rajput</h2>
                    <h3 className="text-sm text-gray-700 font-medium">
                      Senior Software Engineer | Full-Stack Developer | Open Source Enthusiast
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Mumbai, Maharashtra, India •{" "}
                      <a
                        href="https://www.linkedin.com/in/kuldeepdotcom/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-bold hover:underline"
                      >
                        Contact info
                      </a>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-xs shadow-sm transition-colors">
                      Open to
                    </button>
                    <button className="px-4 py-1.5 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full font-bold text-xs transition-colors">
                      Add profile section
                    </button>
                    <button className="px-3 py-1.5 border border-gray-400 text-gray-600 hover:bg-gray-50 rounded-full font-bold text-xs transition-colors">
                      More
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-3">
              <h3 className="text-base font-bold text-gray-900">About</h3>
              <p className="text-xs leading-relaxed text-gray-700">
                Passionate Full-Stack Developer with 4+ years of professional experience designing,
                building, and launching high-performance interactive web interfaces.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-gray-900">Experience</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-600/10 rounded flex items-center justify-center shrink-0 font-bold text-blue-600">
                    Dev
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Senior Full-Stack Developer</h4>
                    <p className="text-[11px] text-gray-700">
                      Self-Employed / Open Source Projects
                    </p>
                    <p className="text-[10px] text-gray-500">2022 - Present • 4 yrs</p>
                    <p className="text-xs text-gray-600 mt-2">
                      Leading the development of rich interactive web experiences, micro-frontend
                      structures, and responsive macOS-style container systems.
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-150 my-3" />
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-indigo-600/10 rounded flex items-center justify-center shrink-0 font-bold text-indigo-600">
                    Soft
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Software Engineer</h4>
                    <p className="text-[11px] text-gray-700">Tech Corporation</p>
                    <p className="text-[10px] text-gray-500">2020 - 2022 • 2 yrs</p>
                    <p className="text-xs text-gray-600 mt-2">
                      Built stateful React components, integrated RESTful APIs, optimized asset
                      delivery pipes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Twitter/X Profile Mock */}
      {isTwitterUrl && (
        <div className="absolute inset-0 bg-black text-white flex font-sans select-text overflow-hidden z-0">
          <div className="w-20 border-r border-zinc-800 flex flex-col items-center py-4 justify-between shrink-0 select-none">
            <div className="space-y-6 flex flex-col items-center">
              <img src="/images/x.png" alt="X logo" className="w-6 h-6 invert" />
              <span className="text-lg cursor-pointer">🏠</span>
              <span className="text-lg cursor-pointer">🔍</span>
              <span className="text-lg cursor-pointer">🔔</span>
              <span className="text-lg cursor-pointer">✉️</span>
              <span className="text-lg cursor-pointer">👤</span>
            </div>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-800">
              <img src="/images/profile.jpg" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex-1 flex flex-col border-r border-zinc-800 overflow-y-auto min-w-0">
            <div className="px-6 py-2 border-b border-zinc-800 bg-black/80 backdrop-blur sticky top-0 z-10 flex items-center gap-4">
              <span className="text-base cursor-pointer">←</span>
              <div>
                <h2 className="text-sm font-extrabold text-white">Kuldeep Rajput</h2>
                <p className="text-[10px] text-zinc-500">3 Posts</p>
              </div>
            </div>
            <div className="h-32 bg-zinc-900 flex-shrink-0" />
            <div className="px-6 pb-4 relative flex flex-col">
              <div className="w-24 h-24 rounded-full border-4 border-black overflow-hidden absolute -top-12 left-6">
                <img
                  src="/images/profile.jpg"
                  alt="Kuldeep Rajput"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-end pt-3">
                <button className="px-4 py-1 border border-zinc-700 hover:bg-zinc-900 rounded-full font-bold text-xs transition-colors">
                  Edit profile
                </button>
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="text-base font-extrabold text-white leading-tight">
                  Kuldeep Rajput
                </h3>
                <p className="text-xs text-zinc-500">@kuldeepdotcom</p>
              </div>
              <p className="text-xs mt-3 leading-relaxed">
                Full Stack Developer | Building interactive macOS portfolios. Pushing the boundaries
                of web UI engineering! 💻🚀 #buildinpublic
              </p>
              <div className="flex gap-4 text-[11px] text-zinc-500 mt-3">
                <span>📅 Joined August 2019</span>
                <span>
                  🔗{" "}
                  <a
                    href="https://x.com/kuldeepdotcom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:underline"
                  >
                    x.com/kuldeepdotcom
                  </a>
                </span>
              </div>
              <div className="flex gap-4 text-xs font-bold text-zinc-400 mt-3.5">
                <span>
                  324 <span className="text-zinc-500 font-normal">Following</span>
                </span>
                <span>
                  1.8K <span className="text-zinc-500 font-normal">Followers</span>
                </span>
              </div>
            </div>
            <div className="flex border-b border-zinc-800 text-xs font-bold text-zinc-500 text-center select-none shrink-0">
              <div className="flex-1 py-3 text-white border-b-2 border-sky-500 font-extrabold">
                Posts
              </div>
              <div className="flex-1 py-3 font-semibold">Replies</div>
              <div className="flex-1 py-3 font-semibold">Highlights</div>
              <div className="flex-1 py-3 font-semibold">Media</div>
              <div className="flex-1 py-3 font-semibold">Likes</div>
            </div>
            <div className="divide-y divide-zinc-800">
              {[
                {
                  text: "Just finished building the Light Theme synchronization for my macOS portfolio! 🚀✨ #buildinpublic #webdev #reactjs",
                  time: "2h",
                  likes: "42",
                  replies: "4",
                },
                {
                  text: "Recursive rendering inside a mock browser in a portfolio? Type your local address in the Chrome app and see it stack! 💻🖥️ #reactjs #nextjs",
                  time: "May 25",
                  likes: "78",
                  replies: "9",
                },
                {
                  text: "Hello World! Welcome to my macOS portfolio desktop simulation. Built using React, TailwindCSS, and Lucide Icons.",
                  time: "Jan 12",
                  likes: "104",
                  replies: "12",
                },
              ].map((tweet, idx) => (
                <div key={idx} className="p-4 flex gap-3 hover:bg-zinc-900/35 transition-colors">
                  <img
                    src="/images/profile.jpg"
                    alt="Avatar"
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="font-bold text-white">Kuldeep Rajput</span>
                      <span className="text-zinc-500">@kuldeepdotcom • {tweet.time}</span>
                    </div>
                    <p className="text-xs leading-relaxed text-zinc-200">{tweet.text}</p>
                    <div className="flex justify-between text-[10px] text-zinc-500 pt-2.5 max-w-sm">
                      <span>💬 {tweet.replies}</span>
                      <span>🔁 5</span>
                      <span className="text-rose-500 font-bold">❤️ {tweet.likes}</span>
                      <span>📊 1.2K</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Wikipedia Article Mock */}
      {isWikipediaUrl && (
        <div className="absolute inset-0 bg-white text-gray-900 flex flex-col font-sans select-text overflow-y-auto z-0">
          <div className="bg-white border-b border-gray-300 px-4 py-2 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-600">
                  W
                </div>
                <span className="font-bold text-lg text-gray-900">Wikipedia</span>
              </div>
              <span className="text-xs text-gray-400">The Free Encyclopedia</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 border border-gray-300 px-3 py-1 rounded text-[11px] w-52 text-gray-500 flex items-center gap-1.5">
                <Search className="w-3 h-3 text-gray-400" />
                Search Wikipedia
              </div>
              <span className="text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline">
                Log in
              </span>
            </div>
          </div>
          <div className="bg-[#f8f9fa] border-b border-gray-300 px-6 flex items-center gap-0 text-[12px] shrink-0">
            {["Article", "Talk", "Read", "View source", "View history"].map((tab, i) => (
              <span
                key={i}
                className={`px-3 py-2 cursor-pointer border-b-2 ${tab === "Article" ? "border-blue-600 text-blue-600 bg-white -mb-px" : "border-transparent text-gray-600 hover:text-gray-900"}`}
              >
                {tab}
              </span>
            ))}
          </div>
          <div className="flex flex-1 gap-0 min-h-0">
            <div className="flex-1 overflow-y-auto p-8 max-w-4xl">
              <h1 className="text-3xl font-normal border-b border-gray-300 pb-3 mb-4">
                React (JavaScript library)
              </h1>
              <div className="text-[11px] text-gray-500 mb-5">
                From Wikipedia, the free encyclopedia
              </div>
              <div className="float-right ml-6 mb-4 w-64 border border-gray-400 text-[12px] bg-[#f8f9fa]">
                <div className="bg-[#cee0f2] text-center px-3 py-1.5 font-bold text-[13px] border-b border-gray-400">
                  React
                </div>
                <div className="flex items-center justify-center py-3 bg-white border-b border-gray-300">
                  <div className="w-16 h-16 rounded-full bg-[#61dafb]/20 border-2 border-[#61dafb] flex items-center justify-center">
                    <span className="text-3xl font-bold text-[#61dafb]">⚛</span>
                  </div>
                </div>
                <table className="w-full">
                  {[
                    ["Developer", "Meta Platforms"],
                    ["Initial release", "May 29, 2013"],
                    ["Stable release", "19.1.0 (April 2025)"],
                    ["Written in", "JavaScript"],
                    ["Type", "JavaScript library"],
                    ["License", "MIT License"],
                    ["Website", "react.dev"],
                  ].map(([k, v], i) => (
                    <tr key={i} className="border-t border-gray-300">
                      <td className="px-2 py-1 font-bold text-right text-[11px] align-top w-24 text-gray-700">
                        {k}
                      </td>
                      <td className="px-2 py-1 text-[11px] text-blue-600 hover:underline cursor-pointer">
                        {v}
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
              <p className="text-[13.5px] leading-relaxed mb-4">
                <b>React</b> (also known as <b>React.js</b> or <b>ReactJS</b>) is a free and
                open-source front-end JavaScript library for building user interfaces based on
                components. It is maintained by Meta (formerly Facebook) and a community of
                individual developers and companies.
              </p>
              <p className="text-[13.5px] leading-relaxed mb-4">
                React can be used to develop single-page, mobile, or server-rendered applications
                with frameworks like Next.js.
              </p>
              <div className="border border-gray-400 bg-[#f8f9fa] inline-block p-3 mb-5 text-[12px] min-w-[200px]">
                <div className="font-bold mb-2 text-center">Contents</div>
                {[
                  ["1", "History"],
                  ["2", "Basic usage"],
                  ["3", "Notable features"],
                  ["3.1", "Components"],
                  ["3.2", "Virtual DOM"],
                  ["3.3", "JSX"],
                  ["4", "React Hooks"],
                  ["5", "Server-side rendering"],
                  ["6", "See also"],
                ].map(([num, title], i) => (
                  <div key={i} className={`flex gap-2 py-0.5 ${num.includes(".") ? "pl-4" : ""}`}>
                    <span className="text-gray-500">{num}</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">{title}</span>
                  </div>
                ))}
              </div>
              <h2 className="text-xl font-normal border-b border-gray-300 pb-1 mb-3">History</h2>
              <p className="text-[13.5px] leading-relaxed mb-4">
                React was created by Jordan Walke, a software engineer at Facebook. It was first
                deployed on Facebook's News Feed in 2011 and later on Instagram in 2012.
              </p>
              <h2 className="text-xl font-normal border-b border-gray-300 pb-1 mb-3">
                Basic usage
              </h2>
              <div className="bg-[#f8f9fa] border border-gray-300 rounded p-4 font-mono text-[11px] text-gray-800 mb-5 whitespace-pre leading-relaxed overflow-x-auto">{`import React from 'react';\nimport { createRoot } from 'react-dom/client';\n\nfunction App() {\n  return <h1>Hello, World!</h1>;\n}\n\nconst root = createRoot(document.getElementById('root'));\nroot.render(<App />);`}</div>
              <h2 className="text-xl font-normal border-b border-gray-300 pb-1 mb-3">
                Notable features
              </h2>
              <h3 className="text-[15px] font-bold mb-2">Components</h3>
              <p className="text-[13.5px] leading-relaxed mb-4">
                React code is made of entities called <i>components</i>. These components are
                reusable and must be formed in the SFC structure.
              </p>
              <h3 className="text-[15px] font-bold mb-2">Virtual DOM</h3>
              <p className="text-[13.5px] leading-relaxed mb-4">
                Another notable feature is the use of a virtual Document Object Model, or virtual
                DOM.
              </p>
              <h3 className="text-[15px] font-bold mb-2">JSX</h3>
              <p className="text-[13.5px] leading-relaxed mb-4">
                JSX is an extension to the JavaScript language syntax. Similar in appearance to
                HTML.
              </p>
              <div className="text-[11px] text-gray-500 border-t border-gray-300 pt-4">
                This page was last edited on 27 May 2025.
              </div>
            </div>
            <div className="w-48 shrink-0 border-l border-gray-200 bg-[#f8f9fa] p-4 text-[11px] overflow-y-auto hidden lg:block">
              <div className="font-bold mb-2 text-gray-700">Navigation</div>
              {[
                "Main page",
                "Contents",
                "Current events",
                "Random article",
                "About Wikipedia",
                "Contact us",
                "Donate",
              ].map((item) => (
                <div key={item} className="py-0.5 text-blue-600 hover:underline cursor-pointer">
                  {item}
                </div>
              ))}
              <div className="font-bold mb-2 mt-4 text-gray-700">Contribute</div>
              {["Help", "Learn to edit", "Community portal", "Recent changes", "Upload file"].map(
                (item) => (
                  <div key={item} className="py-0.5 text-blue-600 hover:underline cursor-pointer">
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      )}

      <ChromeSettings
        activeTab={activeTab}
        navigateTabTo={navigateTabTo}
        settingsThemeClasses={settingsThemeClasses}
        theme={theme}
        activeSettingsSection={activeSettingsSection}
        setActiveSettingsSection={setActiveSettingsSection}
        username={username}
        setUsername={setUsername}
        profileColor={profileColor}
        setProfileColor={setProfileColor}
        isSyncActive={isSyncActive}
        setIsSyncActive={setIsSyncActive}
        showBookmarks={showBookmarks}
        setShowBookmarks={setShowBookmarks}
        fontSize={fontSize}
        setFontSize={setFontSize}
        searchEngine={searchEngine}
        setSearchEngine={setSearchEngine}
        setHistoryList={setHistoryList}
        setTabs={setTabs}
        setActiveTabId={setActiveTabId}
        highlightText={highlightText}
        findText={findText}
      />

      <ChromeHistory
        activeTab={activeTab}
        navigateTabTo={navigateTabTo}
        settingsThemeClasses={settingsThemeClasses}
        theme={theme}
        historyList={historyList}
        setHistoryList={setHistoryList}
        highlightText={highlightText}
        findText={findText}
      />

      {/* Bookmarks Page */}
      {activeTab.url === "chrome://bookmarks" && (
        <div
          className={`absolute inset-0 flex select-none overflow-hidden ${settingsThemeClasses.contentBg}`}
        >
          <div
            className={`w-52 border-r shrink-0 py-6 px-4 flex flex-col gap-1.5 ${settingsThemeClasses.sidebarBg}`}
          >
            <div
              className={`flex items-center gap-2 px-2 pb-4 border-b ${settingsThemeClasses.borderMuted} mb-3`}
            >
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="font-bold text-sm">Bookmarks</span>
            </div>
            <button
              onClick={() => navigateTabTo("chrome://settings")}
              className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
            >
              <SettingsIcon className="w-4 h-4" /> Appearance
            </button>
            <button className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-left w-full">
              <Bookmark className="w-4 h-4" /> Bookmarks
            </button>
            <button
              onClick={() => navigateTabTo("chrome://history")}
              className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
            >
              <History className="w-4 h-4" /> History
            </button>
            <button
              onClick={() => navigateTabTo("chrome://downloads")}
              className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
            >
              <History className="w-4 h-4 transform rotate-180" /> Downloads
            </button>
            <button
              onClick={() => navigateTabTo("chrome://about")}
              className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
            >
              <Info className="w-4 h-4" /> About Chrome
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-8 max-w-3xl space-y-6">
            <div
              className={`flex items-center justify-between border-b ${settingsThemeClasses.borderMuted} pb-4`}
            >
              <h2 className="text-xl font-bold">Bookmarks</h2>
            </div>
            {bookmarks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400 gap-3">
                <Star className="w-10 h-10 stroke-[1.5]" />
                <p className="text-xs">Your bookmarks will show up here.</p>
              </div>
            ) : (
              <div
                className={`border rounded-xl divide-y overflow-hidden shadow-sm ${theme === "dark" ? "bg-[#2f3033] border-[#3c3e41] divide-[#3c3e41]" : "bg-white border-gray-200 divide-gray-100"}`}
              >
                {bookmarks.map((bookmark, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3.5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <Globe className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span
                        onClick={() => navigateTabTo(bookmark.url)}
                        className="text-xs font-semibold text-blue-500 hover:underline cursor-pointer truncate max-w-md"
                      >
                        {highlightText(bookmark.title, findText)}
                      </span>
                      <span
                        className={`text-[10px] ${settingsThemeClasses.textMuted} truncate hidden md:inline`}
                      >
                        {highlightText(bookmark.url, findText)}
                      </span>
                    </div>
                    <button
                      onClick={() => setBookmarks((prev) => prev.filter((_, i) => i !== index))}
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
      )}

      {/* Incognito Page */}
      {activeTab.url === "chrome://incognito" && (
        <div className="absolute inset-0 bg-[#202124] text-gray-200 flex flex-col items-center justify-center p-8 select-none overflow-y-auto">
          <div className="max-w-xl w-full text-center space-y-6 -mt-10">
            <div className="w-20 h-20 bg-zinc-800 text-zinc-300 rounded-full flex items-center justify-center mx-auto shadow-lg border border-zinc-700">
              <svg
                className="w-12 h-12 text-zinc-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="8" cy="15" r="2" />
                <circle cx="16" cy="15" r="2" />
                <path d="M10 15h4M2 11a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v1H2z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-zinc-100">You've gone Incognito</h2>
              <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                Now you can browse privately, and other people who use this device won't see your
                activity.
              </p>
            </div>
            <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-4 text-left text-[10px] text-zinc-300 grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-zinc-100 mb-1">Chrome won't save:</h4>
                <ul className="list-disc pl-4 space-y-1 text-zinc-400">
                  <li>Your browsing history</li>
                  <li>Cookies and site data</li>
                  <li>Information entered in forms</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-zinc-100 mb-1">
                  Your activity might still be visible to:
                </h4>
                <ul className="list-disc pl-4 space-y-1 text-zinc-400">
                  <li>Websites you visit</li>
                  <li>Your employer or school</li>
                  <li>Your internet service provider</li>
                </ul>
              </div>
            </div>
            <div className="w-full flex items-center bg-zinc-800 border border-zinc-700 hover:border-transparent hover:shadow-md focus-within:shadow-md focus-within:border-transparent transition-all rounded-full px-4 py-3 text-sm max-w-md mx-auto">
              <Search className="w-4 h-4 text-zinc-400 mr-3 shrink-0" />
              <input
                type="text"
                placeholder="Search Google privately"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    navigateTabTo(
                      `https://www.google.com/search?q=${encodeURIComponent(e.target.value)}`,
                    );
                    e.target.value = "";
                  }
                }}
                className="w-full bg-transparent border-none outline-none text-zinc-100 placeholder-zinc-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Downloads Page */}
      {activeTab.url === "chrome://downloads" && (
        <div
          className={`absolute inset-0 flex select-none overflow-hidden ${settingsThemeClasses.contentBg}`}
        >
          <div
            className={`w-52 border-r shrink-0 py-6 px-4 flex flex-col gap-1.5 ${settingsThemeClasses.sidebarBg}`}
          >
            <div
              className={`flex items-center gap-2 px-2 pb-4 border-b ${settingsThemeClasses.borderMuted} mb-3`}
            >
              <History className="w-5 h-5 text-blue-500 transform rotate-180" />
              <span className="font-bold text-sm">Downloads</span>
            </div>
            <button
              onClick={() => navigateTabTo("chrome://settings")}
              className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
            >
              <SettingsIcon className="w-4 h-4" /> Appearance
            </button>
            <button
              onClick={() => navigateTabTo("chrome://bookmarks")}
              className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
            >
              <Star className="w-4 h-4" /> Bookmarks
            </button>
            <button
              onClick={() => navigateTabTo("chrome://history")}
              className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
            >
              <History className="w-4 h-4" /> History
            </button>
            <button className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-left w-full">
              <History className="w-4 h-4 transform rotate-180" /> Downloads
            </button>
            <button
              onClick={() => navigateTabTo("chrome://about")}
              className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
            >
              <Info className="w-4 h-4" /> About Chrome
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-8 max-w-3xl space-y-6">
            <div
              className={`flex items-center justify-between border-b ${settingsThemeClasses.borderMuted} pb-4`}
            >
              <h2 className="text-xl font-bold">Downloads</h2>
              {downloadsList.length > 0 && (
                <button
                  onClick={() => setDownloadsList([])}
                  className="text-xs font-semibold text-rose-500 hover:bg-rose-500/10 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="space-y-4">
              {downloadsList.map((d, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${settingsThemeClasses.cardBg}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${d.type === "PDF" ? "bg-red-500/10 text-red-500" : d.type === "ZIP" ? "bg-blue-500/10 text-blue-500" : "bg-emerald-500/10 text-emerald-500"}`}
                    >
                      {d.type}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold truncate">
                        {highlightText(d.name, findText)}
                      </h4>
                      <p className={`text-[10px] ${settingsThemeClasses.textMuted}`}>
                        {d.size} • {d.progress} • {d.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert(`Downloading ${d.name} again...`)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-bold cursor-pointer"
                    >
                      Download Again
                    </button>
                    <button
                      onClick={() => setDownloadsList((prev) => prev.filter((_, i) => i !== index))}
                      className="px-3 py-1 hover:bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-200 dark:border-rose-900/30 rounded text-[10px] font-semibold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              {downloadsList.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400 gap-3">
                  <History className="w-10 h-10 transform rotate-180 stroke-[1.5]" />
                  <p className="text-xs">No downloads found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Extensions Page */}
      {activeTab.url === "chrome://extensions" && (
        <div
          className={`absolute inset-0 flex flex-col select-none ${settingsThemeClasses.contentBg}`}
        >
          <div
            className={`px-6 py-4 border-b flex items-center justify-between ${settingsThemeClasses.sidebarBg}`}
          >
            <div className="flex items-center gap-3">
              <Bookmark className="w-6 h-6 text-blue-500 transform rotate-90" />
              <span className="font-bold text-base">Extensions</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-8 grid grid-cols-2 gap-6 max-w-4xl">
            <div
              className={`p-5 rounded-xl border flex flex-col justify-between gap-4 shadow-sm ${settingsThemeClasses.cardBg}`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs">AdBlock Pro</h3>
                  <span className="text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-700 rounded text-zinc-600 dark:text-zinc-300">
                    v3.4.1
                  </span>
                </div>
                <p className={`text-[10px] ${settingsThemeClasses.textMuted} leading-relaxed`}>
                  Blocks intrusive advertisements, tracking cookies, and popup marketing banners
                  across all websites.
                </p>
              </div>
              <div
                className={`flex items-center justify-between pt-2 border-t ${settingsThemeClasses.borderMuted}`}
              >
                <span className={`text-[10px] ${settingsThemeClasses.textMuted}`}>
                  Enable extension
                </span>
                <button
                  onClick={() => setIsAdBlockerActive((prev) => !prev)}
                  className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${isAdBlockerActive ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"}`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 transform ${isAdBlockerActive ? "translate-x-4.5" : "translate-x-0"}`}
                  />
                </button>
              </div>
            </div>
            <div
              className={`p-5 rounded-xl border flex flex-col justify-between gap-4 shadow-sm ${settingsThemeClasses.cardBg}`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs">React Developer Tools</h3>
                  <span className="text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-700 rounded text-zinc-600 dark:text-zinc-300">
                    v5.2.0
                  </span>
                </div>
                <p className={`text-[10px] ${settingsThemeClasses.textMuted} leading-relaxed`}>
                  Adds React component debugging tools and state inspector consoles.
                </p>
              </div>
              <div
                className={`flex items-center justify-between pt-2 border-t ${settingsThemeClasses.borderMuted}`}
              >
                <span className={`text-[10px] ${settingsThemeClasses.textMuted}`}>
                  Enable extension
                </span>
                <button className="w-10 h-5.5 rounded-full p-0.5 bg-blue-600">
                  <div className="w-4 h-4 rounded-full bg-white translate-x-4.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DevTools Page */}
      {activeTab.url === "chrome://devtools" && (
        <div className="absolute inset-0 bg-[#202124] text-gray-200 flex select-none overflow-hidden font-mono">
          <div className="w-1/2 border-r border-[#3c3e41] flex flex-col p-4 space-y-3 overflow-y-auto">
            <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
              Elements
            </div>
            <div className="text-[11px] text-sky-400 space-y-1">
              <div>
                &lt;<span className="text-pink-400">div</span>{" "}
                <span className="text-purple-400">id</span>="desktop-root"&gt;
              </div>
              <div className="pl-4">
                &lt;<span className="text-pink-400">header</span>{" "}
                <span className="text-purple-400">class</span>="navbar"&gt;...&lt;/
                <span className="text-pink-400">header</span>&gt;
              </div>
              <div className="pl-4 text-zinc-100 font-semibold">
                &lt;<span className="text-pink-400">main</span>{" "}
                <span className="text-purple-400">class</span>="desktop-main"&gt;
              </div>
              <div className="pl-8">
                &lt;<span className="text-pink-400">div</span>{" "}
                <span className="text-purple-400">id</span>="window-chrome"&gt;...&lt;/
                <span className="text-pink-400">div</span>&gt;
              </div>
              <div className="pl-4">
                &lt;/<span className="text-pink-400">main</span>&gt;
              </div>
              <div>
                &lt;/<span className="text-pink-400">div</span>&gt;
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col p-4 overflow-y-auto justify-between bg-zinc-950">
            <div className="space-y-1.5 text-[10px]">
              <div className="text-zinc-500 font-bold">Console (Active Session)</div>
              <div className="text-emerald-400">[info] Vite dev server connected.</div>
              <div className="text-emerald-400">[info] HMR hot module reload active.</div>
              <div className="text-sky-400">[debug] Loading Chrome window wrapper state.</div>
              <div className="text-sky-400">
                [debug] Active tab whitelisted for recursive rendering.
              </div>
              {isAdBlockerActive && (
                <div className="text-amber-500">
                  [warn] AdBlock Pro intercepted 12 tracking domains.
                </div>
              )}
            </div>
            <div className="border-t border-zinc-800 pt-2 flex items-center text-[10px] text-zinc-400 gap-1.5">
              <span>&gt;</span>
              <input
                type="text"
                placeholder="Enter console command..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    alert(`Console command executed: "${e.target.value}"`);
                    e.target.value = "";
                  }
                }}
                className="bg-transparent border-none outline-none focus:ring-0 text-zinc-100 flex-1"
              />
            </div>
          </div>
        </div>
      )}

      {/* About Chrome Page */}
      {activeTab.url === "chrome://about" && (
        <div
          className={`absolute inset-0 flex select-none overflow-hidden ${settingsThemeClasses.contentBg}`}
        >
          <div
            className={`w-52 border-r shrink-0 py-6 px-4 flex flex-col gap-1.5 ${settingsThemeClasses.sidebarBg}`}
          >
            <div
              className={`flex items-center gap-2 px-2 pb-4 border-b ${settingsThemeClasses.borderMuted} mb-3`}
            >
              <Globe className="w-5 h-5 text-blue-500" />
              <span className="font-bold text-sm">Chrome OS</span>
            </div>
            <button
              onClick={() => navigateTabTo("chrome://settings")}
              className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
            >
              <SettingsIcon className="w-4 h-4" /> Appearance
            </button>
            <button
              onClick={() => navigateTabTo("chrome://bookmarks")}
              className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
            >
              <Star className="w-4 h-4" /> Bookmarks
            </button>
            <button
              onClick={() => navigateTabTo("chrome://history")}
              className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
            >
              <History className="w-4 h-4" /> History
            </button>
            <button
              onClick={() => navigateTabTo("chrome://downloads")}
              className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
            >
              <History className="w-4 h-4 transform rotate-180" /> Downloads
            </button>
            <button className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-left">
              <Info className="w-4 h-4" /> About Chrome
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-8 max-w-2xl space-y-6">
            <div
              className={`flex flex-col items-center text-center gap-4 py-8 border-b ${settingsThemeClasses.borderMuted}`}
            >
              <div className="w-20 h-20 rounded-full border-4 border-white dark:border-[#35363a] shadow-lg flex items-center justify-center relative overflow-hidden bg-white">
                <div className="absolute inset-0 bg-blue-500 rounded-full scale-[0.4] z-10 border border-white" />
                <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500 transform origin-bottom -skew-x-[30deg]" />
                <div className="absolute bottom-0 right-0 w-full h-1/2 bg-green-500 transform origin-top -skew-y-[30deg]" />
                <div className="absolute top-0 right-0 w-full h-full bg-yellow-500 transform origin-left -skew-x-[60deg] scale-x-[0.5]" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-extrabold tracking-tight">Google Chrome</h2>
                <p className="text-xs text-gray-400">
                  Version 125.0.6422.112 (Official Build) (64-bit)
                </p>
              </div>
            </div>
            <div className={`space-y-4 text-xs leading-relaxed ${settingsThemeClasses.textMuted}`}>
              <p className="font-semibold text-gray-700 dark:text-gray-300">
                Google Chrome is up to date
              </p>
              <p>This mockup browser runs inside the Antigravity MacOS portfolio interface.</p>
              <p className="text-[10px] text-gray-400 pt-4">
                Copyright 2026 Google DeepMind. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Star = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const Bookmark = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const SettingsIcon = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const Trash2 = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const History = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const Info = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const Globe = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default ChromePageView;
