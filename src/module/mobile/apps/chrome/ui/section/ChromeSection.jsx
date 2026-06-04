import React, { useState } from "react";
import WindowControls from "@components/WindowControls";
import {
  RotateCw,
  Search,
  ChevronLeft,
  ChevronRight,
  Home,
  Lock,
  Star,
  X,
  Plus,
  Menu,
  User,
  Globe,
  AlertTriangle,
  ArrowRight,
  MoreVertical,
  Settings,
  History,
  Info,
  Trash2,
  Moon,
  Sun,
  Bookmark,
  Printer,
  LogOut,
  Maximize,
} from "lucide-react";
import ChromeWelcomeSection from "./ChromeWelcomeSection";
import ChromeSettingsSection from "./ChromeSettingsSection";
import ChromeHistorySection from "./ChromeHistorySection";
import ChromeBookmarksSection from "./ChromeBookmarksSection";
import ChromeDownloadsSection from "./ChromeDownloadsSection";
import ChromeBrowserSection from "./ChromeBrowserSection";

const ChromeSection = ({
  theme,
  themeClasses,
  menuThemeClasses,
  settingsThemeClasses,

  tabs,
  activeTabId,
  setActiveTabId,
  handleCloseTab,
  handleNewTab,

  addressInput,
  setAddressInput,
  activeTab,
  handleGoBack,
  handleGoForward,
  isBookmarked,
  toggleBookmark,
  navigateTabTo,

  isMenuOpen,
  setIsMenuOpen,
  activeSubMenu,
  setActiveSubMenu,
  zoom,
  setZoom,
  isFullScreen,
  setIsFullScreen,
  isDefaultBrowser,
  setIsDefaultBrowser,
  username,
  setUsername,
  profileColor,
  setProfileColor,
  isSyncActive,
  setIsSyncActive,
  historyList,
  setHistoryList,
  isLensScanning,
  setIsLensScanning,
  showFindBar,
  setShowFindBar,
  findText,
  setFindText,
  findMatchesCount,
  findMatchIndex,
  setFindMatchIndex,
  showCastDialog,
  setShowCastDialog,
  castDevice,
  setCastDevice,
  isCastConnecting,
  setIsCastConnecting,
  showQrCode,
  setShowQrCode,
  isAdBlockerActive,
  setIsAdBlockerActive,
  showBookmarks,
  bookmarks,
  setBookmarks,
  closeWindow,
  setTabs,

  activeSettingsSection,
  setActiveSettingsSection,

  setTheme,
  setSearchEngine,
  setShowBookmarks,

  downloadsList,
  setDownloadsList,

  passwordsList,
  setPasswordsList,
  newPassSite,
  setNewPassSite,
  newPassUser,
  setNewPassUser,
  newPassVal,
  setNewPassVal,

  cardsList,
  setCardsList,
  newCardNum,
  setNewCardNum,
  newCardExpiry,
  setNewCardExpiry,

  addressesList,
  setAddressesList,
  newAddressStreet,
  setNewAddressStreet,
  newAddressCity,
  setNewAddressCity,

  fontSize,
  setFontSize,
  searchEngine,

  googleSearchQuery,
  setGoogleSearchQuery,

  isIframeable,
  isGitHubUrl,
  isLinkedInUrl,
  isTwitterUrl,
  isWikipediaUrl,
  highlightText,
}) => {
  const [showTabsOverview, setShowTabsOverview] = useState(false);

  // Helper to extract domain for the mobile header
  const getCleanDomain = (url) => {
    if (url === "chrome://newtab") return "New Tab";
    if (url === "chrome://settings") return "Settings";
    if (url === "chrome://history") return "History";
    if (url === "chrome://bookmarks") return "Bookmarks";
    if (url === "chrome://about") return "About Chrome";
    if (url === "chrome://incognito") return "New Incognito Tab";
    if (url === "chrome://extensions") return "Extensions";
    if (url === "chrome://downloads") return "Downloads";
    if (url === "chrome://devtools") return "Developer Tools";
    if (url.includes("google.com/search")) return "Google Search";
    try {
      const parsed = new URL(url);
      return parsed.hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  return (
    <div
      className={`flex flex-col h-full w-full select-none text-xs font-sans relative ${
        theme === "dark" ? "bg-[#202124] text-white" : "bg-[#f8f9fa] text-gray-800"
      }`}
    >
      {/* iOS Minimal Top Bar */}
      <div
        className={`shrink-0 border-b px-4 py-3 flex items-center justify-between z-20 relative select-none ${
          theme === "dark"
            ? "bg-[#202124] border-zinc-800/80 text-white"
            : "bg-white border-zinc-200/50 text-gray-800"
        }`}
      >
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              if (activeTab.historyIndex > 0) {
                handleGoBack();
              } else {
                closeWindow("chrome");
              }
            }}
            className={`flex items-center gap-0.5 font-semibold text-sm bg-transparent border-none outline-none cursor-pointer p-0 active:opacity-60 transition-opacity ${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            }`}
          >
            <ChevronLeft size={16} />
            <span>Back</span>
          </button>
        </div>
        <span className="text-xs font-bold absolute left-1/2 -translate-x-1/2 max-w-[50%] truncate">
          {getCleanDomain(activeTab.url)}
        </span>
        <div className="w-16 flex justify-end">
          {activeTab.url === "chrome://incognito" && (
            <svg
              className={`w-4 h-4 ${theme === "dark" ? "text-zinc-300" : "text-gray-650"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="8" cy="15" r="2" />
              <circle cx="16" cy="15" r="2" />
              <path d="M10 15h4M2 11a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v1H2z" />
            </svg>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden bg-white mb-[105px] z-10">
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

        {/* In-page Find Bar Overlay */}
        {showFindBar && (
          <div
            className={`absolute top-2 right-4 z-45 flex items-center gap-2 border px-3 py-1.5 rounded-lg shadow-xl text-xs ${
              theme === "dark"
                ? "bg-[#282a2d] border-zinc-700/80 text-zinc-100 shadow-black/40"
                : "bg-white border-gray-200 text-gray-800 shadow-neutral-300/40"
            }`}
          >
            <input
              type="text"
              placeholder="Find in page..."
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
              autoFocus
              className="bg-transparent border-none outline-none focus:ring-0 text-xs w-36 text-gray-800 dark:text-zinc-100"
            />
            <span
              className={`text-[10px] select-none pr-1.5 border-r ${theme === "dark" ? "text-zinc-500 border-zinc-700" : "text-gray-500 border-gray-200"}`}
            >
              {findMatchesCount > 0 ? `${findMatchIndex} of ${findMatchesCount}` : "0 of 0"}
            </span>
            <button
              onClick={() => setFindMatchIndex((prev) => (prev > 1 ? prev - 1 : findMatchesCount))}
              disabled={findMatchesCount === 0}
              className={`p-0.5 rounded leading-none ${theme === "dark" ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-gray-100 text-gray-600"}`}
            >
              {"\u25B2"}
            </button>
            <button
              onClick={() => setFindMatchIndex((prev) => (prev < findMatchesCount ? prev + 1 : 1))}
              disabled={findMatchesCount === 0}
              className={`p-0.5 rounded leading-none ${theme === "dark" ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-gray-100 text-gray-600"}`}
            >
              {"\u25BC"}
            </button>
            <button
              onClick={() => {
                setShowFindBar(false);
                setFindText("");
              }}
              className={`p-0.5 rounded ${theme === "dark" ? "hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200" : "hover:bg-gray-100 text-gray-500 hover:text-gray-800"}`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Cast Dialog Overlay */}
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
                      <p className="text-xs font-semibold font-sans">
                        Connecting to {castDevice}...
                      </p>
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

        {/* QR Code Generator Modal */}
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
                <svg
                  className="w-32 h-32 text-black"
                  viewBox="0 0 29 29"
                  shapeRendering="crispEdges"
                >
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
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    theme === "dark"
                      ? "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                      : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Zoom Scale Wrapper */}
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
          {/* New Tab Page */}
          {activeTab.url === "chrome://newtab" && (
            <ChromeWelcomeSection
              theme={theme}
              searchEngine={searchEngine}
              googleSearchQuery={googleSearchQuery}
              setGoogleSearchQuery={setGoogleSearchQuery}
              navigateTabTo={navigateTabTo}
              bookmarks={bookmarks}
            />
          )}

          {/* Settings Page */}
          {activeTab.url === "chrome://settings" && (
            <ChromeSettingsSection
              settingsThemeClasses={settingsThemeClasses}
              theme={theme}
              activeSettingsSection={activeSettingsSection}
              setActiveSettingsSection={setActiveSettingsSection}
              profileColor={profileColor}
              setProfileColor={setProfileColor}
              username={username}
              setUsername={setUsername}
              isSyncActive={isSyncActive}
              setIsSyncActive={setIsSyncActive}
              passwordsList={passwordsList}
              setPasswordsList={setPasswordsList}
              newPassSite={newPassSite}
              setNewPassSite={setNewPassSite}
              newPassUser={newPassUser}
              setNewPassUser={setNewPassUser}
              newPassVal={newPassVal}
              setNewPassVal={setNewPassVal}
              cardsList={cardsList}
              setCardsList={setCardsList}
              newCardNum={newCardNum}
              setNewCardNum={setNewCardNum}
              newCardExpiry={newCardExpiry}
              setNewCardExpiry={setNewCardExpiry}
              addressesList={addressesList}
              setAddressesList={setAddressesList}
              newAddressStreet={newAddressStreet}
              setNewAddressStreet={setNewAddressStreet}
              newAddressCity={newAddressCity}
              setNewAddressCity={setNewAddressCity}
              showBookmarks={showBookmarks}
              setShowBookmarks={setShowBookmarks}
              fontSize={fontSize}
              setFontSize={setFontSize}
              setTheme={setTheme}
              searchEngine={searchEngine}
              setSearchEngine={setSearchEngine}
              navigateTabTo={navigateTabTo}
              setHistoryList={setHistoryList}
              setTabs={setTabs}
              setActiveTabId={setActiveTabId}
              highlightText={highlightText}
              findText={findText}
            />
          )}

          {/* History Page */}
          {activeTab.url === "chrome://history" && (
            <ChromeHistorySection
              settingsThemeClasses={settingsThemeClasses}
              theme={theme}
              navigateTabTo={navigateTabTo}
              historyList={historyList}
              setHistoryList={setHistoryList}
              highlightText={highlightText}
              findText={findText}
            />
          )}

          {/* Bookmarks Page */}
          {activeTab.url === "chrome://bookmarks" && (
            <ChromeBookmarksSection
              settingsThemeClasses={settingsThemeClasses}
              theme={theme}
              navigateTabTo={navigateTabTo}
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
              highlightText={highlightText}
              findText={findText}
            />
          )}

          {/* Downloads Page */}
          {activeTab.url === "chrome://downloads" && (
            <ChromeDownloadsSection
              settingsThemeClasses={settingsThemeClasses}
              theme={theme}
              navigateTabTo={navigateTabTo}
              downloadsList={downloadsList}
              setDownloadsList={setDownloadsList}
              highlightText={highlightText}
              findText={findText}
            />
          )}

          {/* Browser Content (all other views) */}
          <ChromeBrowserSection
            activeTab={activeTab}
            theme={theme}
            searchEngine={searchEngine}
            navigateTabTo={navigateTabTo}
            isIframeable={isIframeable}
            isGitHubUrl={isGitHubUrl}
            isLinkedInUrl={isLinkedInUrl}
            isTwitterUrl={isTwitterUrl}
            isWikipediaUrl={isWikipediaUrl}
            isAdBlockerActive={isAdBlockerActive}
            setIsAdBlockerActive={setIsAdBlockerActive}
            settingsThemeClasses={settingsThemeClasses}
          />
        </div>
      </div>

      {/* Chrome iOS Bottom Section (URL + Nav) */}
      <div
        className={`absolute bottom-0 left-0 right-0 border-t z-30 flex flex-col gap-3 pb-8 pt-3 px-4 shadow-lg shrink-0 ${
          theme === "dark" ? "bg-[#282a2d]/95 border-zinc-800/80" : "bg-white/95 border-gray-200"
        }`}
      >
        {/* Floating URL Address Bar */}
        <div
          className={`w-full h-11 border rounded-2xl flex items-center justify-between px-3.5 shadow-inner ${
            theme === "dark"
              ? "bg-[#35363a] border-zinc-700/50 text-white"
              : "bg-gray-100 border-gray-200 text-gray-800"
          }`}
        >
          <div className="flex items-center gap-2 max-w-[85%] flex-1">
            <Lock size={12} className={theme === "dark" ? "text-zinc-400" : "text-emerald-600"} />
            <input
              type="text"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              placeholder={
                activeTab.url === "chrome://incognito" ? "Search privately" : "Search or type URL"
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigateTabTo(addressInput);
                }
              }}
              className={`text-sm bg-transparent border-none outline-none w-full text-center ${
                theme === "dark"
                  ? "text-zinc-200 placeholder-zinc-550"
                  : "text-gray-800 placeholder-gray-400"
              }`}
            />
          </div>
          {activeTab.url !== "chrome://newtab" && (
            <button
              onClick={() => navigateTabTo(activeTab.url)}
              className={`p-1 rounded-full transition-colors bg-transparent border-none outline-none cursor-pointer ${
                theme === "dark"
                  ? "text-zinc-400 hover:bg-zinc-850"
                  : "text-gray-500 hover:bg-gray-250"
              }`}
            >
              <RotateCw size={13} strokeWidth={2.2} />
            </button>
          )}
        </div>

        {/* Navigation Toolbar */}
        <div className="flex justify-between items-center w-full px-2 mt-0.5">
          <button
            onClick={handleGoBack}
            disabled={activeTab.historyIndex <= 0}
            className="border-none bg-transparent cursor-pointer p-2 active:opacity-50 transition-opacity"
          >
            <ChevronLeft
              size={24}
              className={
                activeTab.historyIndex > 0
                  ? theme === "dark"
                    ? "text-blue-400"
                    : "text-blue-600"
                  : theme === "dark"
                    ? "text-zinc-600"
                    : "text-gray-300"
              }
            />
          </button>

          <button
            onClick={handleGoForward}
            disabled={activeTab.historyIndex >= activeTab.history.length - 1}
            className="border-none bg-transparent cursor-pointer p-2 active:opacity-50 transition-opacity"
          >
            <ChevronRight
              size={24}
              className={
                activeTab.historyIndex < activeTab.history.length - 1
                  ? theme === "dark"
                    ? "text-blue-400"
                    : "text-blue-600"
                  : theme === "dark"
                    ? "text-zinc-600"
                    : "text-gray-300"
              }
            />
          </button>

          <button
            onClick={handleNewTab}
            className="border-none bg-transparent cursor-pointer p-2 active:scale-95 transition-transform"
          >
            <Plus size={24} className={theme === "dark" ? "text-blue-400" : "text-blue-600"} />
          </button>

          <button
            onClick={() => setShowTabsOverview(true)}
            className="border-none bg-transparent cursor-pointer p-2 active:scale-95 transition-transform relative"
          >
            <div
              className={`w-5 h-5 border-2 rounded-md flex items-center justify-center text-[10px] font-bold ${
                theme === "dark" ? "border-blue-400 text-blue-400" : "border-blue-600 text-blue-600"
              }`}
            >
              {tabs.length}
            </div>
          </button>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="border-none bg-transparent cursor-pointer p-2 active:scale-95 transition-transform"
          >
            <MoreVertical
              size={22}
              className={theme === "dark" ? "text-blue-400" : "text-blue-600"}
            />
          </button>
        </div>
      </div>

      {/* iOS Style Bottom Menu Sheet */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/45 z-50 flex flex-col justify-end"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={`rounded-t-[25px] p-5 pb-8 space-y-4 max-h-[80%] overflow-y-auto shadow-2xl transition-all ${
              theme === "dark" ? "bg-[#282a2d] text-zinc-200" : "bg-[#f2f2f7] text-zinc-950"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1.5 bg-gray-400/50 rounded-full mx-auto mb-2" />
            <div className="flex justify-between items-center border-b pb-3 border-gray-400/20">
              <h4 className="text-sm font-extrabold">Chrome Menu</h4>
              <button
                onClick={() => setIsMenuOpen(false)}
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                  theme === "dark" ? "bg-zinc-800 text-zinc-400" : "bg-gray-200 text-zinc-650"
                }`}
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => {
                  handleNewTab();
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 border shadow-sm ${
                  theme === "dark"
                    ? "bg-[#35363a] border-zinc-700/40 text-white"
                    : "bg-white border-zinc-200/50 text-gray-800"
                }`}
              >
                <Plus size={18} className="text-blue-500" />
                <span className="text-[10px] font-bold">New Tab</span>
              </button>

              <button
                onClick={() => {
                  const newId = `tab-${Date.now()}`;
                  setTabs((prev) => [
                    ...prev,
                    {
                      id: newId,
                      title: "Incognito",
                      url: "chrome://incognito",
                      history: ["chrome://incognito"],
                      historyIndex: 0,
                    },
                  ]);
                  setActiveTabId(newId);
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 border shadow-sm ${
                  theme === "dark"
                    ? "bg-[#35363a] border-zinc-700/40 text-white"
                    : "bg-white border-zinc-200/50 text-gray-800"
                }`}
              >
                <Lock size={18} className="text-amber-500" />
                <span className="text-[10px] font-bold">Incognito</span>
              </button>

              <button
                onClick={() => {
                  navigateTabTo("chrome://bookmarks");
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 border shadow-sm ${
                  theme === "dark"
                    ? "bg-[#35363a] border-zinc-700/40 text-white"
                    : "bg-white border-zinc-200/50 text-gray-800"
                }`}
              >
                <Star size={18} className="text-yellow-500 fill-yellow-500/20" />
                <span className="text-[10px] font-bold">Bookmarks</span>
              </button>

              <button
                onClick={() => {
                  navigateTabTo("chrome://history");
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 border shadow-sm ${
                  theme === "dark"
                    ? "bg-[#35363a] border-zinc-700/40 text-white"
                    : "bg-white border-zinc-200/50 text-gray-800"
                }`}
              >
                <History size={18} className="text-emerald-500" />
                <span className="text-[10px] font-bold">History</span>
              </button>

              <button
                onClick={() => {
                  navigateTabTo("chrome://downloads");
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 border shadow-sm ${
                  theme === "dark"
                    ? "bg-[#35363a] border-zinc-700/40 text-white"
                    : "bg-white border-zinc-200/50 text-gray-800"
                }`}
              >
                <History size={18} className="rotate-180 text-violet-500" />
                <span className="text-[10px] font-bold">Downloads</span>
              </button>

              <button
                onClick={() => {
                  navigateTabTo("chrome://settings");
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 border shadow-sm ${
                  theme === "dark"
                    ? "bg-[#35363a] border-zinc-700/40 text-white"
                    : "bg-white border-zinc-200/50 text-gray-800"
                }`}
              >
                <Settings size={18} className="text-gray-500" />
                <span className="text-[10px] font-bold">Settings</span>
              </button>
            </div>

            <div
              className={`rounded-2xl border divide-y overflow-hidden shadow-sm ${
                theme === "dark"
                  ? "bg-[#35363a] border-zinc-700/40 divide-zinc-700/35"
                  : "bg-white border-zinc-200/50 divide-zinc-100"
              }`}
            >
              <button
                onClick={() => {
                  toggleBookmark();
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left p-3.5 hover:bg-black/5 text-xs font-semibold flex items-center gap-3 bg-transparent border-none outline-none cursor-pointer ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                <Star
                  size={16}
                  className={isBookmarked ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}
                />
                <span>{isBookmarked ? "Remove Bookmark" : "Bookmark this page"}</span>
              </button>

              <button
                onClick={() => {
                  setShowQrCode(true);
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left p-3.5 hover:bg-black/5 text-xs font-semibold flex items-center gap-3 bg-transparent border-none outline-none cursor-pointer ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                <Globe size={16} className="text-zinc-400" />
                <span>Create QR Code</span>
              </button>

              <button
                onClick={() => {
                  setHistoryList([]);
                  alert("Browsing history cleared!");
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left p-3.5 hover:bg-black/5 text-xs font-semibold flex items-center gap-3 bg-transparent border-none outline-none cursor-pointer ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                <Trash2 size={16} className="text-rose-500" />
                <span>Clear history...</span>
              </button>

              <button
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left p-3.5 hover:bg-black/5 text-xs font-semibold flex items-center gap-3 bg-transparent border-none outline-none cursor-pointer ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                {theme === "dark" ? (
                  <>
                    <Sun size={16} className="text-amber-500" />
                    <span>Switch to Light Theme</span>
                  </>
                ) : (
                  <>
                    <Moon size={16} className="text-[#007aff]" />
                    <span>Switch to Dark Theme</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iOS Style Tabs Grid Overview Screen */}
      {showTabsOverview && (
        <div
          className={`fixed inset-0 z-50 flex flex-col justify-between p-4 ${
            theme === "dark" ? "bg-zinc-950 text-white" : "bg-gray-100 text-gray-800"
          }`}
        >
          <div className="flex items-center justify-between shrink-0 py-2">
            <span
              className={`text-xs font-extrabold tracking-wide uppercase ${theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}
            >
              {tabs.length} {tabs.length === 1 ? "Tab" : "Tabs"}
            </span>
            <button
              onClick={() => setShowTabsOverview(false)}
              className={`text-sm font-bold bg-transparent border-none outline-none cursor-pointer ${
                theme === "dark"
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-600 hover:text-blue-700"
              }`}
            >
              Done
            </button>
          </div>

          {/* Grid of Tabs */}
          <div className="flex-1 overflow-y-auto grid grid-cols-2 gap-4 my-4 content-start pb-24">
            {tabs.map((tab) => {
              const isTabActive = tab.id === activeTabId;
              const tabDomain = getCleanDomain(tab.url);
              return (
                <div
                  key={tab.id}
                  onClick={() => {
                    setActiveTabId(tab.id);
                    setShowTabsOverview(false);
                  }}
                  className={`relative h-44 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer flex flex-col justify-between p-3.5 ${
                    theme === "dark"
                      ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                      : "bg-white border-gray-250 hover:border-gray-300"
                  } ${
                    isTabActive
                      ? theme === "dark"
                        ? "border-blue-500 ring-4 ring-blue-500/30"
                        : "border-blue-600 ring-4 ring-blue-600/20"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[11px] font-bold truncate max-w-[80%]">{tab.title}</span>
                    <button
                      onClick={(e) => handleCloseTab(tab.id, e)}
                      className={`w-5 h-5 rounded-full flex items-center justify-center border-none outline-none cursor-pointer ${
                        theme === "dark"
                          ? "bg-zinc-800 text-zinc-400 hover:text-white"
                          : "bg-gray-200 text-gray-650 hover:text-gray-850"
                      }`}
                    >
                      <X size={10} />
                    </button>
                  </div>

                  {/* Tab Mock Content Preview */}
                  <div
                    className={`flex-1 flex items-center justify-center mt-2 border rounded-xl shadow-inner overflow-hidden select-none ${
                      theme === "dark"
                        ? "bg-zinc-950/60 border-zinc-800 text-zinc-650"
                        : "bg-gray-50 border-gray-200 text-gray-400"
                    }`}
                  >
                    {tab.url === "chrome://newtab" ? (
                      <span className="text-[9px] uppercase tracking-wider font-extrabold">
                        New Tab
                      </span>
                    ) : tab.url === "chrome://incognito" ? (
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-amber-500">
                        Incognito
                      </span>
                    ) : (
                      <Globe size={18} className="opacity-80" />
                    )}
                  </div>
                  <div className="text-[8.5px] truncate pt-1 opacity-60">{tabDomain}</div>
                </div>
              );
            })}
          </div>

          {/* Bottom Bar inside Tab Switcher */}
          <div className="flex justify-center items-center py-3 shrink-0">
            <button
              onClick={() => {
                handleNewTab();
                setShowTabsOverview(false);
              }}
              className={`flex items-center gap-1.5 px-6 py-2.5 rounded-full font-bold text-xs shadow-md active:scale-95 transition-transform bg-blue-600 text-white hover:bg-blue-700`}
            >
              <Plus size={14} strokeWidth={2.5} />
              <span>New Tab</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChromeSection;
