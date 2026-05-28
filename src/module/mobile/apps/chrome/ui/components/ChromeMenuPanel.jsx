import React from "react";
import {
  Plus, Lock, History, Star, Bookmark, Trash2,
  Printer, Globe, Search, Settings as SettingsIcon,
  Info, LogOut, User, Maximize
} from "lucide-react";

const ChromeMenuPanel = ({
  isMenuOpen, setIsMenuOpen,
  activeSubMenu, setActiveSubMenu,
  menuThemeClasses, theme,
  handleNewTab, setTabs, setActiveTabId,
  profileColor, username, setUsername,
  isDefaultBrowser, setIsDefaultBrowser,
  isSyncActive, setIsSyncActive,
  setProfileColor,
  navigateTabTo,
  isBookmarked, toggleBookmark, bookmarks,
  historyList,
  setShowFindBar,
  activeTab,
  setAddressInput,
  setShowCastDialog, setCastDevice, setIsCastConnecting,
  setDownloadsList,
  setShowQrCode,
  setIsLensScanning,
  zoom, setZoom,
  isFullScreen, setIsFullScreen,
  closeWindow,
  setActiveSettingsSection,
  setIsAdBlockerActive, isAdBlockerActive,
  setHistoryList,
  themeClasses
}) => {
  if (!isMenuOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-transparent"
        onClick={() => { setIsMenuOpen(false); setActiveSubMenu(null); }}
      />
      <div className={`absolute right-0 top-8 w-72 border rounded-xl shadow-2xl p-1.5 z-50 text-xs font-sans divide-y ${menuThemeClasses.menuBg} ${theme === "dark" ? "shadow-black/40" : "shadow-gray-300/45"}`}>

        <div className="pb-1.5">
          <button
            onClick={() => { setIsDefaultBrowser(true); alert("Chrome is now your default browser!"); }}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 font-semibold transition-all ${menuThemeClasses.bannerBg}`}
          >
            <Globe className="w-3.5 h-3.5 text-blue-500" />
            <span>{isDefaultBrowser ? "Chrome is default browser" : "Set Chrome as default browser"}</span>
          </button>
        </div>

        <div className="py-1">
          <button onClick={() => { handleNewTab(); setIsMenuOpen(false); }}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left ${menuThemeClasses.itemHover}`}>
            <div className="flex items-center gap-2.5">
              <Plus className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
              <span>New tab</span>
            </div>
            <span className={`text-[10px] font-medium ${menuThemeClasses.labelMuted}`}>Ctrl+T</span>
          </button>
          <button onClick={() => { handleNewTab(); setIsMenuOpen(false); }}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left ${menuThemeClasses.itemHover}`}>
            <div className="flex items-center gap-2.5">
              <Plus className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
              <span>New window</span>
            </div>
            <span className={`text-[10px] font-medium ${menuThemeClasses.labelMuted}`}>Ctrl+N</span>
          </button>
          <button onClick={() => {
            const newId = `tab-${Date.now()}`;
            setTabs(prev => [...prev, {
              id: newId, title: "Incognito", url: "chrome://incognito",
              history: ["chrome://incognito"], historyIndex: 0
            }]);
            setActiveTabId(newId);
            setIsMenuOpen(false);
          }}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left ${menuThemeClasses.itemHover}`}>
            <div className="flex items-center gap-2.5">
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              <span>New Incognito window</span>
            </div>
            <span className={`text-[10px] font-medium ${menuThemeClasses.labelMuted}`}>Ctrl+Shift+N</span>
          </button>
        </div>

        <div className="py-1">
          <div className="relative"
            onMouseEnter={() => setActiveSubMenu("profile")}
            onMouseLeave={() => setActiveSubMenu(null)}>
            <div className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}>
              <div className="flex items-center gap-2.5">
                <div className={`w-4.5 h-4.5 ${profileColor} text-white rounded-full flex items-center justify-center text-[9px] font-bold`}>K</div>
                <span className="font-semibold">{username}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="bg-blue-600/20 text-blue-400 px-1.5 py-0.5 rounded text-[9px] font-bold">Signed in</span>
                <span className={menuThemeClasses.labelMuted}>&gt;</span>
              </div>
            </div>
            {activeSubMenu === "profile" && (
              <div className={`absolute right-full top-0 mr-1 w-48 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}>
                <div className={`px-3 py-1.5 border-b text-[10px] ${menuThemeClasses.labelMuted} ${theme === "dark" ? "border-zinc-700/50" : "border-gray-200/60"}`}>Manage user profile</div>
                <button onClick={() => { const n = prompt("Enter new username:", username); if (n) setUsername(n); setActiveSubMenu(null); setIsMenuOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>Edit profile name</button>
                <button onClick={() => { setIsSyncActive(prev => !prev); alert(isSyncActive ? "Sync disabled!" : "Sync enabled!"); setActiveSubMenu(null); }}
                  className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>Sync is {isSyncActive ? "active" : "inactive"}</button>
                <div className={`px-3 py-1 text-[9px] font-semibold ${menuThemeClasses.labelMuted}`}>Choose color:</div>
                <div className="flex items-center gap-2 px-3 pb-1.5">
                  {["bg-orange-600", "bg-blue-600", "bg-emerald-600", "bg-purple-600"].map((c, i) => (
                    <button key={i} onClick={() => { setProfileColor(c); setActiveSubMenu(null); }}
                      className={`w-4 h-4 rounded-full ${c} border border-white hover:scale-110 transition-transform`} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative"
            onMouseEnter={() => setActiveSubMenu("passwords")}
            onMouseLeave={() => setActiveSubMenu(null)}>
            <div className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}>
              <div className="flex items-center gap-2.5">
                <Lock className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                <span>Passwords and autofill</span>
              </div>
              <span className={menuThemeClasses.labelMuted}>&gt;</span>
            </div>
            {activeSubMenu === "passwords" && (
              <div className={`absolute right-full top-0 mr-1 w-52 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}>
                <button onClick={() => { navigateTabTo("chrome://settings"); setActiveSettingsSection("autofill"); setIsMenuOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>Password Manager</button>
                <button onClick={() => { navigateTabTo("chrome://settings"); setActiveSettingsSection("autofill"); setIsMenuOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>Payment methods</button>
                <button onClick={() => { navigateTabTo("chrome://settings"); setActiveSettingsSection("autofill"); setIsMenuOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>Addresses and more</button>
              </div>
            )}
          </div>

          <div className="relative"
            onMouseEnter={() => setActiveSubMenu("history")}
            onMouseLeave={() => setActiveSubMenu(null)}>
            <div className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}>
              <div className="flex items-center gap-2.5">
                <History className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                <span>History</span>
              </div>
              <span className={menuThemeClasses.labelMuted}>&gt;</span>
            </div>
            {activeSubMenu === "history" && (
              <div className={`absolute right-full top-0 mr-1 w-56 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}>
                <button onClick={() => { navigateTabTo("chrome://history"); setIsMenuOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-md font-semibold text-blue-500 ${menuThemeClasses.itemHover}`}>Open History Center</button>
                <div className={`h-px my-1 ${theme === "dark" ? "bg-zinc-700/50" : "bg-gray-200/60"}`} />
                <div className={`px-3 py-1 text-[10px] ${menuThemeClasses.labelMuted}`}>Recent Tabs</div>
                {historyList.slice(0, 3).map((item, idx) => (
                  <button key={idx} onClick={() => { navigateTabTo(item.url); setIsMenuOpen(false); }}
                    className={`w-full text-left px-3 py-1 rounded-md truncate block ${menuThemeClasses.itemHover}`}>{item.title}</button>
                ))}
                {historyList.length === 0 && <div className={`px-3 py-1 text-[10px] ${menuThemeClasses.labelMuted}`}>No recent tabs</div>}
              </div>
            )}
          </div>

          <button onClick={() => { navigateTabTo("chrome://downloads"); setIsMenuOpen(false); }}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left cursor-pointer ${menuThemeClasses.itemHover}`}>
            <div className="flex items-center gap-2.5">
              <History className={`w-3.5 h-3.5 transform rotate-180 ${menuThemeClasses.iconColor}`} />
              <span>Downloads</span>
            </div>
            <span className={`text-[10px] font-medium ${menuThemeClasses.labelMuted}`}>Ctrl+J</span>
          </button>

          <div className="relative"
            onMouseEnter={() => setActiveSubMenu("bookmarks")}
            onMouseLeave={() => setActiveSubMenu(null)}>
            <div className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}>
              <div className="flex items-center gap-2.5">
                <Star className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                <span>Bookmarks and lists</span>
              </div>
              <span className={menuThemeClasses.labelMuted}>&gt;</span>
            </div>
            {activeSubMenu === "bookmarks" && (
              <div className={`absolute right-full top-0 mr-1 w-56 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}>
                <button onClick={() => { navigateTabTo("chrome://bookmarks"); setIsMenuOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-md font-semibold text-blue-500 ${menuThemeClasses.itemHover}`}>Open Bookmarks Manager</button>
                <button onClick={() => { toggleBookmark(); setActiveSubMenu(null); setIsMenuOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>{isBookmarked ? "Remove Bookmark" : "Bookmark this tab"}</button>
                <div className={`h-px my-1 ${theme === "dark" ? "bg-zinc-700/50" : "bg-gray-200/60"}`} />
                <div className={`px-3 py-1 text-[10px] ${menuThemeClasses.labelMuted}`}>My Bookmarks</div>
                {bookmarks.map((bookmark, idx) => (
                  <button key={idx} onClick={() => { navigateTabTo(bookmark.url); setIsMenuOpen(false); }}
                    className={`w-full text-left px-3 py-1 rounded-md truncate block ${menuThemeClasses.itemHover}`}>{bookmark.title}</button>
                ))}
              </div>
            )}
          </div>

          <div className="relative"
            onMouseEnter={() => setActiveSubMenu("tabgroups")}
            onMouseLeave={() => setActiveSubMenu(null)}>
            <div className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}>
              <div className="flex items-center gap-2.5">
                <Bookmark className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                <span>Tab groups</span>
              </div>
              <span className={menuThemeClasses.labelMuted}>&gt;</span>
            </div>
            {activeSubMenu === "tabgroups" && (
              <div className={`absolute right-full top-0 mr-1 w-48 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}>
                <button onClick={() => { const g = prompt("Enter new tab group name:", "Work"); if (g) alert(`Created tab group "${g}"!`); setActiveSubMenu(null); setIsMenuOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>Create new group</button>
                <button onClick={() => { alert("Active tab added to Work group!"); setActiveSubMenu(null); setIsMenuOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>Work Group</button>
              </div>
            )}
          </div>

          <div className="relative"
            onMouseEnter={() => setActiveSubMenu("extensions")}
            onMouseLeave={() => setActiveSubMenu(null)}>
            <div className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}>
              <div className="flex items-center gap-2.5">
                <Bookmark className={`w-3.5 h-3.5 transform rotate-90 ${menuThemeClasses.iconColor}`} />
                <span>Extensions</span>
              </div>
              <span className={menuThemeClasses.labelMuted}>&gt;</span>
            </div>
            {activeSubMenu === "extensions" && (
              <div className={`absolute right-full top-0 mr-1 w-52 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}>
                <button onClick={() => { navigateTabTo("chrome://extensions"); setIsMenuOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-md font-semibold text-blue-500 ${menuThemeClasses.itemHover}`}>Manage Extensions</button>
                <div className={`h-px my-1 ${theme === "dark" ? "bg-zinc-700/50" : "bg-gray-200/60"}`} />
                <div className="flex items-center justify-between px-3 py-1.5">
                  <span>AdBlocker Pro</span>
                  <button onClick={() => setIsAdBlockerActive(prev => !prev)}
                    className={`w-7 h-4.5 rounded-full p-0.5 transition-colors ${isAdBlockerActive ? "bg-blue-500" : "bg-zinc-600"}`}>
                    <div className={`w-3.5 h-3.5 rounded-full bg-white transition-transform duration-150 transform ${isAdBlockerActive ? "translate-x-3.5" : "translate-x-0"}`} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <button onClick={() => { setHistoryList([]); alert("Browsing history cleared!"); setIsMenuOpen(false); }}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left cursor-pointer ${menuThemeClasses.itemHover}`}>
            <div className="flex items-center gap-2.5">
              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
              <span>Delete browsing data...</span>
            </div>
            <span className={`text-[10px] font-medium ${menuThemeClasses.labelMuted}`}>Ctrl+Shift+Del</span>
          </button>
        </div>

        <div className="py-1.5 px-3 flex items-center justify-between">
          <span className={menuThemeClasses.labelMuted}>Zoom</span>
          <div className={`flex items-center gap-3 rounded-lg p-0.5 border ${menuThemeClasses.zoomBg}`}>
            <button onClick={() => setZoom(prev => Math.max(50, prev - 10))}
              className={`w-5 h-5 flex items-center justify-center rounded text-base font-bold cursor-pointer ${menuThemeClasses.zoomBtnHover}`}>-</button>
            <span className={`w-8 text-center text-[10px] font-bold ${theme === "dark" ? "text-zinc-200" : "text-gray-800"}`}>{zoom}%</span>
            <button onClick={() => setZoom(prev => Math.min(200, prev + 10))}
              className={`w-5 h-5 flex items-center justify-center rounded text-base font-bold cursor-pointer ${menuThemeClasses.zoomBtnHover}`}>+</button>
          </div>
          <button onClick={() => setIsFullScreen(prev => !prev)}
            className={`p-1 rounded cursor-pointer ${menuThemeClasses.itemHover} ${isFullScreen ? "bg-blue-600/30 text-blue-400" : ""}`}>
            <Maximize className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="py-1">
          <button onClick={() => { window.print(); setIsMenuOpen(false); }}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left cursor-pointer ${menuThemeClasses.itemHover}`}>
            <div className="flex items-center gap-2.5">
              <Printer className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
              <span>Print...</span>
            </div>
            <span className={`text-[10px] font-medium ${menuThemeClasses.labelMuted}`}>Ctrl+P</span>
          </button>
          <button onClick={() => { setIsLensScanning(true); setIsMenuOpen(false); }}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-left cursor-pointer ${menuThemeClasses.itemHover}`}>
            <Search className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
            <span>Search this tab with Google Lens</span>
          </button>
          <button disabled className="w-full flex items-center gap-2.5 px-3 py-1.5 opacity-55 cursor-not-allowed rounded-lg text-left text-zinc-500">
            <Globe className="w-3.5 h-3.5" />
            <span>Translate...</span>
          </button>

          <div className="relative"
            onMouseEnter={() => setActiveSubMenu("find_edit")}
            onMouseLeave={() => setActiveSubMenu(null)}>
            <div className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}>
              <div className="flex items-center gap-2.5">
                <Search className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                <span>Find and edit</span>
              </div>
              <span className={menuThemeClasses.labelMuted}>&gt;</span>
            </div>
            {activeSubMenu === "find_edit" && (
              <div className={`absolute right-full top-0 mr-1 w-48 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}>
                <button onClick={() => { setShowFindBar(true); setIsMenuOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover} flex items-center justify-between`}>
                  <span>Find...</span>
                  <span className={menuThemeClasses.labelMuted}>Ctrl+F</span>
                </button>
                <button onClick={() => { navigator.clipboard.writeText(activeTab.title + " - " + activeTab.url); alert("Copied title and URL to clipboard!"); setIsMenuOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>Copy</button>
                <button onClick={async () => { try { const t = await navigator.clipboard.readText(); setAddressInput(t); alert(`Pasted text from clipboard: "${t}"`); } catch(e) { alert("Please type or paste manually."); } setIsMenuOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>Paste</button>
              </div>
            )}
          </div>

          <div className="relative"
            onMouseEnter={() => setActiveSubMenu("cast_share")}
            onMouseLeave={() => setActiveSubMenu(null)}>
            <div className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}>
              <div className="flex items-center gap-2.5">
                <Printer className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                <span>Cast, save, and share</span>
              </div>
              <span className={menuThemeClasses.labelMuted}>&gt;</span>
            </div>
            {activeSubMenu === "cast_share" && (
              <div className={`absolute right-full top-0 mr-1 w-52 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}>
                <button onClick={() => { setShowCastDialog(true); setIsCastConnecting(false); setCastDevice(null); setIsMenuOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>Cast...</button>
                <button onClick={() => { const nd = { name: `${activeTab.title.toLowerCase().replace(/ /g, "_")}.html`, size: "1.2 MB", progress: "Complete", type: "HTML", date: "Today" }; setDownloadsList(prev => [nd, ...prev]); alert(`Saved Page: Added "${nd.name}" to Downloads list.`); setIsMenuOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>Save page as...</button>
                <button onClick={() => { setShowQrCode(true); setIsMenuOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>Create QR Code</button>
              </div>
            )}
          </div>

          <div className="relative"
            onMouseEnter={() => setActiveSubMenu("tools")}
            onMouseLeave={() => setActiveSubMenu(null)}>
            <div className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}>
              <div className="flex items-center gap-2.5">
                <SettingsIcon className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                <span>More tools</span>
              </div>
              <span className={menuThemeClasses.labelMuted}>&gt;</span>
            </div>
            {activeSubMenu === "tools" && (
              <div className={`absolute right-full top-0 mr-1 w-48 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}>
                <button onClick={() => { navigateTabTo("chrome://devtools"); setIsMenuOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-md font-semibold text-blue-500 ${menuThemeClasses.itemHover}`}>Developer tools</button>
                <button onClick={() => alert("Opening Task Manager...")}
                  className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>Task Manager</button>
              </div>
            )}
          </div>
        </div>

        <div className="py-1">
          <div className="relative"
            onMouseEnter={() => setActiveSubMenu("help")}
            onMouseLeave={() => setActiveSubMenu(null)}>
            <div className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}>
              <div className="flex items-center gap-2.5">
                <Info className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                <span>Help</span>
              </div>
              <span className={menuThemeClasses.labelMuted}>&gt;</span>
            </div>
            {activeSubMenu === "help" && (
              <div className={`absolute right-full top-0 mr-1 w-48 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}>
                <button onClick={() => { navigateTabTo("chrome://about"); setIsMenuOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>About Google Chrome</button>
                <button onClick={() => alert("Redirecting to Chrome Help Center...")}
                  className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>Help Center</button>
              </div>
            )}
          </div>
          <button onClick={() => { navigateTabTo("chrome://settings"); setIsMenuOpen(false); }}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-left cursor-pointer ${menuThemeClasses.itemHover}`}>
            <SettingsIcon className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
            <span>Settings</span>
          </button>
          <button onClick={() => { closeWindow("chrome"); setIsMenuOpen(false); }}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-left font-semibold cursor-pointer ${menuThemeClasses.exitBtn}`}>
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit</span>
          </button>
        </div>

      </div>
    </>
  );
};

export default ChromeMenuPanel;
