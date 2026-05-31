import React from "react";
import {
  Settings as SettingsIcon,
  User,
  Lock,
  Search,
  Star,
  History,
  Info,
  Sun,
  Moon,
  Trash2,
} from "lucide-react";

const ChromeSettings = ({
  activeTab,
  navigateTabTo,
  settingsThemeClasses,
  theme,
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
  fontSize,
  setFontSize,
  searchEngine,
  setSearchEngine,
  setHistoryList,
  setTabs,
  setActiveTabId,
  setTheme,
  _highlightText,
  _findText,
}) => {
  // These come from the hook but we access them via props in the real implementation

  if (activeTab.url !== "chrome://settings") return null;

  return (
    <div
      className={`absolute inset-0 flex select-none overflow-hidden ${settingsThemeClasses.contentBg}`}
    >
      <div
        className={`w-52 border-r shrink-0 py-6 px-4 flex flex-col gap-1.5 ${settingsThemeClasses.sidebarBg}`}
      >
        <div
          className={`flex items-center gap-2 px-2 pb-4 border-b ${settingsThemeClasses.borderMuted} mb-3`}
        >
          <SettingsIcon className="w-5 h-5 text-blue-500" />
          <span className="font-bold text-sm">Settings</span>
        </div>
        <button
          onClick={() => setActiveSettingsSection("profile")}
          className={`flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left w-full transition-all ${activeSettingsSection === "profile" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold" : "hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"}`}
        >
          <User className="w-4 h-4" /> You and Google
        </button>
        <button
          onClick={() => setActiveSettingsSection("autofill")}
          className={`flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left w-full transition-all ${activeSettingsSection === "autofill" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold" : "hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"}`}
        >
          <Lock className="w-4 h-4" /> Autofill & Passwords
        </button>
        <button
          onClick={() => setActiveSettingsSection("appearance")}
          className={`flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left w-full transition-all ${activeSettingsSection === "appearance" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold" : "hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"}`}
        >
          <SettingsIcon className="w-4 h-4" /> Appearance
        </button>
        <button
          onClick={() => setActiveSettingsSection("search")}
          className={`flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left w-full transition-all ${activeSettingsSection === "search" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold" : "hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"}`}
        >
          <Search className="w-4 h-4" /> Search Engine
        </button>
        <button
          onClick={() => setActiveSettingsSection("privacy")}
          className={`flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left w-full transition-all ${activeSettingsSection === "privacy" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold" : "hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"}`}
        >
          <Lock className="w-4 h-4 text-emerald-500" /> Privacy & Security
        </button>
        <div className={`h-px bg-neutral-200 dark:bg-zinc-700/60 my-4`} />
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
        <button
          onClick={() => navigateTabTo("chrome://about")}
          className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
        >
          <Info className="w-4 h-4" /> About Chrome
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 max-w-3xl space-y-8">
        {activeSettingsSection === "profile" && (
          <div className="space-y-6">
            <h2 className={`text-xl font-bold border-b ${settingsThemeClasses.borderMuted} pb-4`}>
              You and Google (Profile)
            </h2>
            <div className={`p-5 rounded-xl border space-y-4 ${settingsThemeClasses.cardBg}`}>
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 ${profileColor} text-white rounded-full flex items-center justify-center text-xl font-bold shadow-md`}
                >
                  K
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold">{username}</h4>
                  <p className={`text-[10px] ${settingsThemeClasses.textMuted}`}>
                    kunal@gmail.com • Primary Profile
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const n = prompt("Enter profile name:", username);
                    if (n) setUsername(n);
                  }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold transition-all shadow-sm"
                >
                  Customize profile name
                </button>
              </div>
            </div>
            <div
              className={`flex items-center justify-between p-4 rounded-xl border ${settingsThemeClasses.cardBg}`}
            >
              <div>
                <h4 className="text-xs font-bold">Google account sync</h4>
                <p className={`text-[10px] ${settingsThemeClasses.textMuted}`}>
                  Sync passwords, bookmarks, history across device sessions
                </p>
              </div>
              <button
                onClick={() => setIsSyncActive((prev) => !prev)}
                className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${isSyncActive ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"}`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 transform ${isSyncActive ? "translate-x-4.5" : "translate-x-0"}`}
                />
              </button>
            </div>
            <div className={`p-4 rounded-xl border space-y-3.5 ${settingsThemeClasses.cardBg}`}>
              <div>
                <h4 className="text-xs font-bold">Pick your profile avatar theme color</h4>
                <p className={`text-[10px] ${settingsThemeClasses.textMuted}`}>
                  Personalize this window header badge color
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                {[
                  "bg-orange-600",
                  "bg-blue-600",
                  "bg-emerald-600",
                  "bg-purple-600",
                  "bg-rose-600",
                  "bg-cyan-600",
                ].map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setProfileColor(c)}
                    className={`w-7 h-7 rounded-full ${c} border-2 hover:scale-105 transition-transform ${profileColor === c ? "border-blue-500 scale-105" : "border-white dark:border-[#3c3e41]"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSettingsSection === "appearance" && (
          <div className="space-y-6">
            <h2 className={`text-xl font-bold border-b ${settingsThemeClasses.borderMuted} pb-4`}>
              Appearance
            </h2>
            <div
              className={`flex items-center justify-between p-4 rounded-xl border ${settingsThemeClasses.cardBg}`}
            >
              <div>
                <h4 className="text-xs font-bold">Theme Mode</h4>
                <p className={`text-[10px] ${settingsThemeClasses.textMuted}`}>
                  Toggle between Light and Dark themes
                </p>
              </div>
              <div className={`flex p-1 rounded-lg border ${settingsThemeClasses.toggleBg}`}>
                <button
                  onClick={() => setTheme("light")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-all ${theme === "light" ? "bg-white text-gray-800 shadow-sm" : settingsThemeClasses.btnInactive}`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" /> Light
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-all ${theme === "dark" ? "bg-[#2f3033] text-white shadow-sm" : settingsThemeClasses.btnInactive}`}
                >
                  <Moon className="w-3.5 h-3.5 text-indigo-400" /> Dark
                </button>
              </div>
            </div>
            <div
              className={`flex items-center justify-between p-4 rounded-xl border ${settingsThemeClasses.cardBg}`}
            >
              <div>
                <h4 className="text-xs font-bold">Show Bookmarks Bar</h4>
                <p className={`text-[10px] ${settingsThemeClasses.textMuted}`}>
                  Toggle visibility of bookmarks strip
                </p>
              </div>
              <button
                onClick={() => setShowBookmarks((prev) => !prev)}
                className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${showBookmarks ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"}`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 transform ${showBookmarks ? "translate-x-4.5" : "translate-x-0"}`}
                />
              </button>
            </div>
            <div
              className={`flex items-center justify-between p-4 rounded-xl border ${settingsThemeClasses.cardBg}`}
            >
              <div>
                <h4 className="text-xs font-bold">Font Size Scaling</h4>
                <p className={`text-[10px] ${settingsThemeClasses.textMuted}`}>
                  Adjust the display scale of browser window text contents
                </p>
              </div>
              <div className={`flex p-1 rounded-lg border ${settingsThemeClasses.toggleBg} gap-1`}>
                {["small", "medium", "large"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`px-3 py-1 rounded text-xs font-semibold capitalize transition-all ${
                      fontSize === size
                        ? theme === "dark"
                          ? "bg-[#2f3033] text-white shadow-sm font-bold"
                          : "bg-white text-gray-800 shadow-sm font-bold"
                        : settingsThemeClasses.btnInactive
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSettingsSection === "search" && (
          <div className="space-y-6">
            <h2 className={`text-xl font-bold border-b ${settingsThemeClasses.borderMuted} pb-4`}>
              Search Engine
            </h2>
            <div
              className={`flex items-center justify-between p-4 rounded-xl border ${settingsThemeClasses.cardBg}`}
            >
              <div>
                <h4 className="text-xs font-bold">Default Search Engine</h4>
                <p className={`text-[10px] ${settingsThemeClasses.textMuted}`}>
                  Address bar queries will be executed through this search provider
                </p>
              </div>
              <select
                value={searchEngine}
                onChange={(e) => setSearchEngine(e.target.value)}
                className={`text-xs px-3 py-1.5 rounded-lg border outline-none cursor-pointer ${settingsThemeClasses.inputBg}`}
              >
                <option value="Google">Google</option>
                <option value="Bing">Bing</option>
                <option value="DuckDuckGo">DuckDuckGo</option>
              </select>
            </div>
          </div>
        )}

        {activeSettingsSection === "privacy" && (
          <div className="space-y-6">
            <h2 className={`text-xl font-bold border-b ${settingsThemeClasses.borderMuted} pb-4`}>
              Privacy & Security
            </h2>
            <div
              className={`flex items-center justify-between p-4 rounded-xl border ${settingsThemeClasses.cardBg}`}
            >
              <div>
                <h4 className="text-xs font-bold">Clear Browsing Data</h4>
                <p className={`text-[10px] ${settingsThemeClasses.textMuted}`}>
                  Clears current browsing history, reset tabs, and logs out profiles
                </p>
              </div>
              <button
                onClick={() => {
                  setHistoryList([]);
                  setTabs([
                    {
                      id: "tab-1",
                      title: "New Tab",
                      url: "chrome://newtab",
                      history: ["chrome://newtab"],
                      historyIndex: 0,
                    },
                  ]);
                  setActiveTabId("tab-1");
                  alert("History cleared!");
                }}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Clear history
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChromeSettings;
