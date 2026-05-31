import React from "react";
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
  findText: _findTextBrowser,
}) => {
  return (
    <div
      className={`flex flex-col h-full w-full rounded-xl overflow-hidden shadow-2xl border select-none text-xs font-sans ${themeClasses.container} ${isFullScreen ? "fixed inset-0 z-50 rounded-none border-none" : ""}`}
    >
      {/* CHROME TAB BAR & WINDOW CONTROLS */}
      <div
        id="window-header"
        className={`shrink-0 px-3 pt-2.5 pb-1 flex items-center justify-between z-20 border-b gap-4 select-none ${themeClasses.header}`}
      >
        <div className="flex items-center gap-6 shrink-0">
          <WindowControls target="chrome" />
        </div>
        <div className="flex-1 flex items-end gap-1.5 overflow-x-auto thin-scrollbar select-none pr-12 min-w-0">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            const isIncognitoTab = tab.url === "chrome://incognito";
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`
                  group flex items-center gap-2 h-[28px] max-w-[160px] min-w-[100px] px-3 rounded-t-lg text-xs leading-none transition-all duration-150 cursor-pointer relative shrink-0
                  ${
                    isActive
                      ? isIncognitoTab
                        ? "bg-[#202124] text-zinc-100 shadow-[0_-1px_3px_rgba(0,0,0,0.3)] z-10"
                        : themeClasses.tabActive
                      : isIncognitoTab
                        ? "text-zinc-400 hover:bg-[#323336]"
                        : themeClasses.tabInactive
                  }
                `}
              >
                {isIncognitoTab ? (
                  <svg
                    className="w-3.5 h-3.5 shrink-0 text-zinc-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="8" cy="15" r="2" />
                    <circle cx="16" cy="15" r="2" />
                    <path d="M10 15h4M2 11a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v1H2z" />
                  </svg>
                ) : (
                  <Globe className={`w-3.5 h-3.5 shrink-0 ${themeClasses.tabGlobe}`} />
                )}
                <span className="truncate flex-1 pr-3">{tab.title}</span>
                {tabs.length > 1 && (
                  <button
                    onClick={(e) => handleCloseTab(tab.id, e)}
                    className={`absolute right-2 opacity-0 group-hover:opacity-100 p-0.5 rounded-full transition-opacity ${themeClasses.tabCloseHover}`}
                    aria-label="Close tab"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            );
          })}
          <button
            onClick={handleNewTab}
            className={`p-1 rounded-full mb-1 transition-colors flex items-center justify-center shrink-0 cursor-pointer ${theme === "dark" ? "hover:bg-white/10 text-gray-400" : "hover:bg-[#d0d3d7] text-gray-600"}`}
            aria-label="New tab"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* NAVIGATION & ADDRESS BAR */}
      <div
        className={`shrink-0 px-3 py-1.5 border-b flex items-center gap-3 ${themeClasses.navBg}`}
      >
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

        <div
          className={`flex-1 flex items-center focus-within:ring-2 rounded-full px-3 py-1 text-xs shadow-inner transition-all ${themeClasses.addressBg}`}
        >
          <Lock className="w-3 h-3 text-emerald-600 mr-2 shrink-0" />
          <input
            type="text"
            placeholder={
              activeTab.url === "chrome://incognito"
                ? "Search privately"
                : `Search ${searchEngine} or type a URL`
            }
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

        <div className="flex items-center gap-1 shrink-0 relative">
          {castDevice && !isCastConnecting && (
            <button
              onClick={() => setShowCastDialog(true)}
              className="p-1.5 rounded-full transition-colors flex items-center justify-center cursor-pointer text-blue-500 bg-blue-500/10 hover:bg-blue-500/20"
              title={`Casting to ${castDevice}`}
            >
              <svg
                className="w-4 h-4 animate-pulse"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <path d="M2 18a2 2 0 0 1 2-2" />
                <path d="M2 14a6 6 0 0 1 6-6" />
                <path d="M12 20a10 10 0 0 0-10-10" />
              </svg>
            </button>
          )}
          <button
            className={`p-1.5 rounded-full transition-colors flex items-center justify-center cursor-pointer ${themeClasses.buttonText}`}
          >
            <User className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={`p-1.5 rounded-full transition-colors flex items-center justify-center cursor-pointer ${themeClasses.buttonText} ${isMenuOpen ? "bg-black/10 dark:bg-white/10" : ""}`}
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40 bg-transparent"
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveSubMenu(null);
                }}
              />
              <div
                className={`absolute right-0 top-8 w-72 border rounded-xl shadow-2xl p-1.5 z-50 text-xs font-sans divide-y ${menuThemeClasses.menuBg} ${theme === "dark" ? "shadow-black/40" : "shadow-gray-300/45"}`}
              >
                <div className="pb-1.5">
                  <button
                    onClick={() => {
                      setIsDefaultBrowser(true);
                      alert("Chrome is now your default browser!");
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 font-semibold transition-all ${menuThemeClasses.bannerBg}`}
                  >
                    <Globe className="w-3.5 h-3.5 text-blue-500" />
                    <span>
                      {isDefaultBrowser
                        ? "Chrome is default browser"
                        : "Set Chrome as default browser"}
                    </span>
                  </button>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      handleNewTab();
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left ${menuThemeClasses.itemHover}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Plus className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                      <span>New tab</span>
                    </div>
                    <span className={`text-[10px] font-medium ${menuThemeClasses.labelMuted}`}>
                      Ctrl+T
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      handleNewTab();
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left ${menuThemeClasses.itemHover}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Plus className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                      <span>New window</span>
                    </div>
                    <span className={`text-[10px] font-medium ${menuThemeClasses.labelMuted}`}>
                      Ctrl+N
                    </span>
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
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left ${menuThemeClasses.itemHover}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Lock className="w-3.5 h-3.5 text-amber-500" />
                      <span>New Incognito window</span>
                    </div>
                    <span className={`text-[10px] font-medium ${menuThemeClasses.labelMuted}`}>
                      Ctrl+Shift+N
                    </span>
                  </button>
                </div>

                <div className="py-1">
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveSubMenu("profile")}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    <div
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4.5 h-4.5 ${profileColor} text-white rounded-full flex items-center justify-center text-[9px] font-bold`}
                        >
                          K
                        </div>
                        <span className="font-semibold">{username}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="bg-blue-600/20 text-blue-400 px-1.5 py-0.5 rounded text-[9px] font-bold">
                          Signed in
                        </span>
                        <span className={menuThemeClasses.labelMuted}>&gt;</span>
                      </div>
                    </div>
                    {activeSubMenu === "profile" && (
                      <div
                        className={`absolute right-full top-0 mr-1 w-48 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}
                      >
                        <div
                          className={`px-3 py-1.5 border-b text-[10px] ${menuThemeClasses.labelMuted} ${theme === "dark" ? "border-zinc-700/50" : "border-gray-200/60"}`}
                        >
                          Manage user profile
                        </div>
                        <button
                          onClick={() => {
                            const newName = prompt("Enter new username:", username);
                            if (newName) setUsername(newName);
                            setActiveSubMenu(null);
                            setIsMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}
                        >
                          Edit profile name
                        </button>
                        <button
                          onClick={() => {
                            setIsSyncActive((prev) => !prev);
                            alert(isSyncActive ? "Sync disabled!" : "Sync enabled!");
                            setActiveSubMenu(null);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}
                        >
                          Sync is {isSyncActive ? "active" : "inactive"}
                        </button>
                        <div
                          className={`px-3 py-1 text-[9px] font-semibold ${menuThemeClasses.labelMuted}`}
                        >
                          Choose color:
                        </div>
                        <div className="flex items-center gap-2 px-3 pb-1.5">
                          {["bg-orange-600", "bg-blue-600", "bg-emerald-600", "bg-purple-600"].map(
                            (c, i) => (
                              <button
                                key={i}
                                onClick={() => {
                                  setProfileColor(c);
                                  setActiveSubMenu(null);
                                }}
                                className={`w-4 h-4 rounded-full ${c} border border-white hover:scale-110 transition-transform`}
                              />
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className="relative"
                    onMouseEnter={() => setActiveSubMenu("passwords")}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    <div
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Lock className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                        <span>Passwords and autofill</span>
                      </div>
                      <span className={menuThemeClasses.labelMuted}>&gt;</span>
                    </div>
                    {activeSubMenu === "passwords" && (
                      <div
                        className={`absolute right-full top-0 mr-1 w-52 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}
                      >
                        <button
                          onClick={() => {
                            navigateTabTo("chrome://settings");
                            setActiveSettingsSection("autofill");
                            setIsMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}
                        >
                          Password Manager
                        </button>
                        <button
                          onClick={() => {
                            navigateTabTo("chrome://settings");
                            setActiveSettingsSection("autofill");
                            setIsMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}
                        >
                          Payment methods
                        </button>
                        <button
                          onClick={() => {
                            navigateTabTo("chrome://settings");
                            setActiveSettingsSection("autofill");
                            setIsMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}
                        >
                          Addresses and more
                        </button>
                      </div>
                    )}
                  </div>

                  <div
                    className="relative"
                    onMouseEnter={() => setActiveSubMenu("history")}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    <div
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <History className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                        <span>History</span>
                      </div>
                      <span className={menuThemeClasses.labelMuted}>&gt;</span>
                    </div>
                    {activeSubMenu === "history" && (
                      <div
                        className={`absolute right-full top-0 mr-1 w-56 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}
                      >
                        <button
                          onClick={() => {
                            navigateTabTo("chrome://history");
                            setIsMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-md font-semibold text-blue-500 ${menuThemeClasses.itemHover}`}
                        >
                          Open History Center
                        </button>
                        <div
                          className={`h-px my-1 ${theme === "dark" ? "bg-zinc-700/50" : "bg-gray-200/60"}`}
                        />
                        <div className={`px-3 py-1 text-[10px] ${menuThemeClasses.labelMuted}`}>
                          Recent Tabs
                        </div>
                        {historyList.slice(0, 3).map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              navigateTabTo(item.url);
                              setIsMenuOpen(false);
                            }}
                            className={`w-full text-left px-3 py-1 rounded-md truncate block ${menuThemeClasses.itemHover}`}
                          >
                            {item.title}
                          </button>
                        ))}
                        {historyList.length === 0 && (
                          <div className={`px-3 py-1 text-[10px] ${menuThemeClasses.labelMuted}`}>
                            No recent tabs
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      navigateTabTo("chrome://downloads");
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left cursor-pointer ${menuThemeClasses.itemHover}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <History
                        className={`w-3.5 h-3.5 transform rotate-180 ${menuThemeClasses.iconColor}`}
                      />
                      <span>Downloads</span>
                    </div>
                    <span className={`text-[10px] font-medium ${menuThemeClasses.labelMuted}`}>
                      Ctrl+J
                    </span>
                  </button>

                  <div
                    className="relative"
                    onMouseEnter={() => setActiveSubMenu("bookmarks")}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    <div
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Star className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                        <span>Bookmarks and lists</span>
                      </div>
                      <span className={menuThemeClasses.labelMuted}>&gt;</span>
                    </div>
                    {activeSubMenu === "bookmarks" && (
                      <div
                        className={`absolute right-full top-0 mr-1 w-56 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}
                      >
                        <button
                          onClick={() => {
                            navigateTabTo("chrome://bookmarks");
                            setIsMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-md font-semibold text-blue-500 ${menuThemeClasses.itemHover}`}
                        >
                          Open Bookmarks Manager
                        </button>
                        <button
                          onClick={() => {
                            toggleBookmark();
                            setActiveSubMenu(null);
                            setIsMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}
                        >
                          {isBookmarked ? "Remove Bookmark" : "Bookmark this tab"}
                        </button>
                        <div
                          className={`h-px my-1 ${theme === "dark" ? "bg-zinc-700/50" : "bg-gray-200/60"}`}
                        />
                        <div className={`px-3 py-1 text-[10px] ${menuThemeClasses.labelMuted}`}>
                          My Bookmarks
                        </div>
                        {bookmarks.map((bookmark, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              navigateTabTo(bookmark.url);
                              setIsMenuOpen(false);
                            }}
                            className={`w-full text-left px-3 py-1 rounded-md truncate block ${menuThemeClasses.itemHover}`}
                          >
                            {bookmark.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    className="relative"
                    onMouseEnter={() => setActiveSubMenu("tabgroups")}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    <div
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Bookmark className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                        <span>Tab groups</span>
                      </div>
                      <span className={menuThemeClasses.labelMuted}>&gt;</span>
                    </div>
                    {activeSubMenu === "tabgroups" && (
                      <div
                        className={`absolute right-full top-0 mr-1 w-48 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}
                      >
                        <button
                          onClick={() => {
                            const groupName = prompt("Enter new tab group name:", "Work");
                            if (groupName) {
                              alert(`Created tab group "${groupName}"!`);
                            }
                            setActiveSubMenu(null);
                            setIsMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}
                        >
                          Create new group
                        </button>
                        <button
                          onClick={() => {
                            alert("Active tab added to Work group!");
                            setActiveSubMenu(null);
                            setIsMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}
                        >
                          Work Group
                        </button>
                      </div>
                    )}
                  </div>

                  <div
                    className="relative"
                    onMouseEnter={() => setActiveSubMenu("extensions")}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    <div
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Bookmark
                          className={`w-3.5 h-3.5 transform rotate-90 ${menuThemeClasses.iconColor}`}
                        />
                        <span>Extensions</span>
                      </div>
                      <span className={menuThemeClasses.labelMuted}>&gt;</span>
                    </div>
                    {activeSubMenu === "extensions" && (
                      <div
                        className={`absolute right-full top-0 mr-1 w-52 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}
                      >
                        <button
                          onClick={() => {
                            navigateTabTo("chrome://extensions");
                            setIsMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-md font-semibold text-blue-500 ${menuThemeClasses.itemHover}`}
                        >
                          Manage Extensions
                        </button>
                        <div
                          className={`h-px my-1 ${theme === "dark" ? "bg-zinc-700/50" : "bg-gray-200/60"}`}
                        />
                        <div className="flex items-center justify-between px-3 py-1.5">
                          <span>AdBlocker Pro</span>
                          <button
                            onClick={() => setIsAdBlockerActive((prev) => !prev)}
                            className={`w-7 h-4.5 rounded-full p-0.5 transition-colors ${isAdBlockerActive ? "bg-blue-500" : "bg-zinc-600"}`}
                          >
                            <div
                              className={`w-3.5 h-3.5 rounded-full bg-white transition-transform duration-150 transform ${isAdBlockerActive ? "translate-x-3.5" : "translate-x-0"}`}
                            />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setHistoryList([]);
                      alert("Browsing history cleared!");
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left cursor-pointer ${menuThemeClasses.itemHover}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                      <span>Delete browsing data...</span>
                    </div>
                    <span className={`text-[10px] font-medium ${menuThemeClasses.labelMuted}`}>
                      Ctrl+Shift+Del
                    </span>
                  </button>
                </div>

                <div className="py-1.5 px-3 flex items-center justify-between">
                  <span className={menuThemeClasses.labelMuted}>Zoom</span>
                  <div
                    className={`flex items-center gap-3 rounded-lg p-0.5 border ${menuThemeClasses.zoomBg}`}
                  >
                    <button
                      onClick={() => setZoom((prev) => Math.max(50, prev - 10))}
                      className={`w-5 h-5 flex items-center justify-center rounded text-base font-bold cursor-pointer ${menuThemeClasses.zoomBtnHover}`}
                    >
                      -
                    </button>
                    <span
                      className={`w-8 text-center text-[10px] font-bold ${theme === "dark" ? "text-zinc-200" : "text-gray-800"}`}
                    >
                      {zoom}%
                    </span>
                    <button
                      onClick={() => setZoom((prev) => Math.min(200, prev + 10))}
                      className={`w-5 h-5 flex items-center justify-center rounded text-base font-bold cursor-pointer ${menuThemeClasses.zoomBtnHover}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => setIsFullScreen((prev) => !prev)}
                    className={`p-1 rounded cursor-pointer ${menuThemeClasses.itemHover} ${isFullScreen ? "bg-blue-600/30 text-blue-400" : ""}`}
                  >
                    <Maximize className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      window.print();
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left cursor-pointer ${menuThemeClasses.itemHover}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Printer className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                      <span>Print...</span>
                    </div>
                    <span className={`text-[10px] font-medium ${menuThemeClasses.labelMuted}`}>
                      Ctrl+P
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setIsLensScanning(true);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-left cursor-pointer ${menuThemeClasses.itemHover}`}
                  >
                    <Search className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                    <span>Search this tab with Google Lens</span>
                  </button>

                  <button
                    disabled
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 opacity-55 cursor-not-allowed rounded-lg text-left text-zinc-500"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Translate...</span>
                  </button>

                  <div
                    className="relative"
                    onMouseEnter={() => setActiveSubMenu("find_edit")}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    <div
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Search className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                        <span>Find and edit</span>
                      </div>
                      <span className={menuThemeClasses.labelMuted}>&gt;</span>
                    </div>
                    {activeSubMenu === "find_edit" && (
                      <div
                        className={`absolute right-full top-0 mr-1 w-48 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}
                      >
                        <button
                          onClick={() => {
                            setShowFindBar(true);
                            setIsMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover} flex items-center justify-between`}
                        >
                          <span>Find...</span>
                          <span className={menuThemeClasses.labelMuted}>Ctrl+F</span>
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(activeTab.title + " - " + activeTab.url);
                            alert("Copied title and URL to clipboard!");
                            setIsMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}
                        >
                          Copy
                        </button>
                        <button
                          onClick={async () => {
                            try {
                              const text = await navigator.clipboard.readText();
                              setAddressInput(text);
                              alert(`Pasted text from clipboard: "${text}"`);
                            } catch {
                              alert("Please type or paste manually.");
                            }
                            setIsMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}
                        >
                          Paste
                        </button>
                      </div>
                    )}
                  </div>

                  <div
                    className="relative"
                    onMouseEnter={() => setActiveSubMenu("cast_share")}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    <div
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Printer className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                        <span>Cast, save, and share</span>
                      </div>
                      <span className={menuThemeClasses.labelMuted}>&gt;</span>
                    </div>
                    {activeSubMenu === "cast_share" && (
                      <div
                        className={`absolute right-full top-0 mr-1 w-52 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}
                      >
                        <button
                          onClick={() => {
                            setShowCastDialog(true);
                            setIsCastConnecting(false);
                            setCastDevice(null);
                            setIsMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}
                        >
                          Cast...
                        </button>
                        <button
                          onClick={() => {
                            const newDownload = {
                              name: `${activeTab.title.toLowerCase().replace(/ /g, "_")}.html`,
                              size: "1.2 MB",
                              progress: "Complete",
                              type: "HTML",
                              date: "Today",
                            };
                            setDownloadsList((prev) => [newDownload, ...prev]);
                            alert(`Saved Page: Added "${newDownload.name}" to Downloads list.`);
                            setIsMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}
                        >
                          Save page as...
                        </button>
                        <button
                          onClick={() => {
                            setShowQrCode(true);
                            setIsMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}
                        >
                          Create QR Code
                        </button>
                      </div>
                    )}
                  </div>

                  <div
                    className="relative"
                    onMouseEnter={() => setActiveSubMenu("tools")}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    <div
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Settings className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                        <span>More tools</span>
                      </div>
                      <span className={menuThemeClasses.labelMuted}>&gt;</span>
                    </div>
                    {activeSubMenu === "tools" && (
                      <div
                        className={`absolute right-full top-0 mr-1 w-48 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}
                      >
                        <button
                          onClick={() => {
                            navigateTabTo("chrome://devtools");
                            setIsMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-md font-semibold text-blue-500 ${menuThemeClasses.itemHover}`}
                        >
                          Developer tools
                        </button>
                        <button
                          onClick={() => alert("Opening Task Manager...")}
                          className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}
                        >
                          Task Manager
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="py-1">
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveSubMenu("help")}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    <div
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Info className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                        <span>Help</span>
                      </div>
                      <span className={menuThemeClasses.labelMuted}>&gt;</span>
                    </div>
                    {activeSubMenu === "help" && (
                      <div
                        className={`absolute right-full top-0 mr-1 w-48 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}
                      >
                        <button
                          onClick={() => {
                            navigateTabTo("chrome://about");
                            setIsMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}
                        >
                          About Google Chrome
                        </button>
                        <button
                          onClick={() => alert("Redirecting to Chrome Help Center...")}
                          className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}
                        >
                          Help Center
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      navigateTabTo("chrome://settings");
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-left cursor-pointer ${menuThemeClasses.itemHover}`}
                  >
                    <Settings className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                    <span>Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      closeWindow("chrome");
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-left font-semibold cursor-pointer ${menuThemeClasses.exitBtn}`}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Exit</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* BOOKMARKS BAR */}
      {showBookmarks && (
        <div
          className={`shrink-0 px-4 py-1 border-b flex items-center gap-4 text-[10px] font-medium select-none ${themeClasses.bookmarksBg}`}
        >
          {bookmarks.map((bookmark, idx) => (
            <button
              key={idx}
              onClick={() => navigateTabTo(bookmark.url)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded cursor-pointer transition-colors ${themeClasses.bookmarksText}`}
            >
              <Globe className="w-3 h-3 text-sky-600" /> {bookmark.title}
            </button>
          ))}
        </div>
      )}

      {/* BROWSER BODY RENDER */}
      <div className="flex-1 bg-white relative min-h-0 overflow-hidden">
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
            highlightText={highlightText}
            findText={findText}
          />
        </div>
      </div>
    </div>
  );
};

export default ChromeSection;
