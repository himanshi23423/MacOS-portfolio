import React from "react";
import {
  Settings,
  Search,
  Lock,
  User,
  Star,
  History,
  Info,
  Sun,
  Moon,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";

const ChromeSettingsSection = ({
  settingsThemeClasses,
  theme,
  activeSettingsSection,
  setActiveSettingsSection,
  profileColor,
  setProfileColor,
  username,
  setUsername,
  isSyncActive,
  setIsSyncActive,
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
  showBookmarks,
  setShowBookmarks,
  fontSize,
  setFontSize,
  setTheme,
  searchEngine,
  setSearchEngine,
  navigateTabTo,
  setHistoryList,
  setTabs,
  setActiveTabId,
  highlightText,
  findText,
}) => {
  return (
    <div
      className={`absolute inset-0 flex flex-col select-none overflow-y-auto pb-10 ${settingsThemeClasses.contentBg}`}
    >
      {/* iOS Header */}
      <div
        className={`shrink-0 px-4 py-3 flex items-center justify-between border-b ${
          theme === "dark"
            ? "bg-[#202124] border-zinc-800/80 text-white"
            : "bg-white border-zinc-200/50 text-gray-800"
        }`}
      >
        {activeSettingsSection !== null ? (
          <button
            onClick={() => setActiveSettingsSection(null)}
            className="flex items-center gap-0.5 text-xs font-semibold text-blue-500 bg-transparent border-none outline-none cursor-pointer p-0 active:opacity-60 transition-opacity"
          >
            <ChevronLeft size={16} />
            <span>Settings</span>
          </button>
        ) : (
          <div className="w-10" />
        )}
        <span className="text-xs font-bold absolute left-1/2 -translate-x-1/2">
          {activeSettingsSection === "profile"
            ? "You & Google"
            : activeSettingsSection === "autofill"
              ? "Autofill & Passwords"
              : activeSettingsSection === "appearance"
                ? "Appearance"
                : activeSettingsSection === "search"
                  ? "Search Engine"
                  : activeSettingsSection === "privacy"
                    ? "Privacy & Security"
                    : "Settings"}
        </span>
        <div className="w-10" />
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-6">
        {/* MAIN SETTINGS MENU */}
        {activeSettingsSection === null && (
          <div className="space-y-4">
            {/* Profile Section Row */}
            <div
              onClick={() => setActiveSettingsSection("profile")}
              className={`p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                theme === "dark"
                  ? "bg-zinc-900 hover:bg-zinc-850 border-zinc-850"
                  : "bg-white hover:bg-neutral-50 border-zinc-200/60 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full ${profileColor} text-white flex items-center justify-center font-bold text-xs shadow-sm`}
                >
                  {username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-xs font-bold">{username}</h4>
                  <p className={`text-[9px] ${settingsThemeClasses.textMuted}`}>
                    Sync is {isSyncActive ? "on" : "off"}
                  </p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>

            {/* General Group */}
            <div
              className={`rounded-xl border divide-y overflow-hidden ${
                theme === "dark"
                  ? "bg-zinc-900 border-zinc-850 divide-zinc-800"
                  : "bg-white border-zinc-200/60 divide-zinc-100 shadow-sm"
              }`}
            >
              {/* Search Engine Row */}
              <div
                onClick={() => setActiveSettingsSection("search")}
                className="flex items-center justify-between p-3.5 hover:bg-neutral-50 dark:hover:bg-zinc-850 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-md bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <Search size={13} />
                  </div>
                  <span className="text-xs font-semibold">Search Engine</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <span className={`text-[10px] ${settingsThemeClasses.textMuted}`}>
                    {searchEngine}
                  </span>
                  <ChevronRight size={15} />
                </div>
              </div>

              {/* Autofill & Passwords Row */}
              <div
                onClick={() => setActiveSettingsSection("autofill")}
                className="flex items-center justify-between p-3.5 hover:bg-neutral-50 dark:hover:bg-zinc-850 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <Lock size={13} />
                  </div>
                  <span className="text-xs font-semibold">Autofill & Passwords</span>
                </div>
                <ChevronRight size={15} className="text-gray-400" />
              </div>

              {/* Appearance Row */}
              <div
                onClick={() => setActiveSettingsSection("appearance")}
                className="flex items-center justify-between p-3.5 hover:bg-neutral-50 dark:hover:bg-zinc-850 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-md bg-purple-500/10 text-purple-500 flex items-center justify-center">
                    <Settings size={13} />
                  </div>
                  <span className="text-xs font-semibold">Appearance</span>
                </div>
                <ChevronRight size={15} className="text-gray-400" />
              </div>

              {/* Privacy & Security Row */}
              <div
                onClick={() => setActiveSettingsSection("privacy")}
                className="flex items-center justify-between p-3.5 hover:bg-neutral-50 dark:hover:bg-zinc-850 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-md bg-rose-500/10 text-rose-500 flex items-center justify-center">
                    <Lock size={13} className="text-rose-500" />
                  </div>
                  <span className="text-xs font-semibold">Privacy & Security</span>
                </div>
                <ChevronRight size={15} className="text-gray-400" />
              </div>
            </div>

            {/* Quick Links Group */}
            <div
              className={`rounded-xl border divide-y overflow-hidden ${
                theme === "dark"
                  ? "bg-zinc-900 border-zinc-850 divide-zinc-800"
                  : "bg-white border-zinc-200/60 divide-zinc-100 shadow-sm"
              }`}
            >
              {/* Bookmarks Redirect Row */}
              <div
                onClick={() => navigateTabTo("chrome://bookmarks")}
                className="flex items-center justify-between p-3.5 hover:bg-neutral-50 dark:hover:bg-zinc-850 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-md bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <Star size={13} />
                  </div>
                  <span className="text-xs font-semibold">Bookmarks</span>
                </div>
                <ChevronRight size={15} className="text-gray-400" />
              </div>

              {/* History Redirect Row */}
              <div
                onClick={() => navigateTabTo("chrome://history")}
                className="flex items-center justify-between p-3.5 hover:bg-neutral-50 dark:hover:bg-zinc-850 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-md bg-sky-500/10 text-sky-500 flex items-center justify-center">
                    <History size={13} />
                  </div>
                  <span className="text-xs font-semibold">History</span>
                </div>
                <ChevronRight size={15} className="text-gray-400" />
              </div>

              {/* Downloads Redirect Row */}
              <div
                onClick={() => navigateTabTo("chrome://downloads")}
                className="flex items-center justify-between p-3.5 hover:bg-neutral-50 dark:hover:bg-zinc-850 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-md bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                    <Download size={13} />
                  </div>
                  <span className="text-xs font-semibold">Downloads</span>
                </div>
                <ChevronRight size={15} className="text-gray-400" />
              </div>
            </div>

            {/* About Info Group */}
            <div
              className={`rounded-xl border overflow-hidden ${
                theme === "dark"
                  ? "bg-zinc-900 border-zinc-850"
                  : "bg-white border-zinc-200/60 shadow-sm"
              }`}
            >
              <div
                onClick={() => navigateTabTo("chrome://about")}
                className="flex items-center justify-between p-3.5 hover:bg-neutral-50 dark:hover:bg-zinc-850 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-md bg-gray-550/10 text-gray-500 flex items-center justify-center">
                    <Info size={13} />
                  </div>
                  <span className="text-xs font-semibold">About Chrome</span>
                </div>
                <ChevronRight size={15} className="text-gray-400" />
              </div>
            </div>
          </div>
        )}

        {/* SUB SECTION: PROFILE */}
        {activeSettingsSection === "profile" && (
          <div className="space-y-5">
            <div className={`p-4 rounded-xl border space-y-4 ${settingsThemeClasses.cardBg}`}>
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 ${profileColor} text-white rounded-full flex items-center justify-center text-lg font-bold shadow-md`}
                >
                  {username.charAt(0).toUpperCase()}
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold">{username}</h4>
                  <p className={`text-[9px] ${settingsThemeClasses.textMuted}`}>
                    kunal@gmail.com &bull; Primary Profile
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const newName = prompt("Enter profile name:", username);
                    if (newName) setUsername(newName);
                  }}
                  className="px-3 py-1.5 bg-blue-650 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold transition-all shadow-sm"
                >
                  Edit Name
                </button>
              </div>
            </div>

            <div
              className={`flex items-center justify-between p-4 rounded-xl border ${settingsThemeClasses.cardBg}`}
            >
              <div>
                <h4 className="text-xs font-bold">Sync Settings</h4>
                <p className={`text-[9px] ${settingsThemeClasses.textMuted}`}>
                  Sync passwords, bookmarks, history
                </p>
              </div>
              <button
                onClick={() => setIsSyncActive((prev) => !prev)}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${isSyncActive ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-750"}`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 transform ${isSyncActive ? "translate-x-4" : "translate-x-0"}`}
                />
              </button>
            </div>

            <div className={`p-4 rounded-xl border space-y-3 ${settingsThemeClasses.cardBg}`}>
              <div>
                <h4 className="text-xs font-bold">Avatar Color</h4>
                <p className={`text-[9px] ${settingsThemeClasses.textMuted}`}>
                  Personalize avatar display background
                </p>
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
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
                    className={`w-6.5 h-6.5 rounded-full ${c} border-2 hover:scale-105 transition-transform ${profileColor === c ? "border-blue-500 scale-105" : "border-white dark:border-[#3c3e41]"}`}
                    aria-label={`Color option ${i}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUB SECTION: AUTOFILL */}
        {activeSettingsSection === "autofill" && (
          <div className="space-y-5">
            {/* Passwords */}
            <div className={`p-4 rounded-xl border space-y-3.5 ${settingsThemeClasses.cardBg}`}>
              <h3
                className={`text-[10px] font-bold ${settingsThemeClasses.textMuted} uppercase tracking-wider`}
              >
                Password Manager
              </h3>
              <div
                className={`divide-y ${settingsThemeClasses.divideColor} max-h-40 overflow-y-auto`}
              >
                {passwordsList.map((p) => (
                  <div key={p.id} className="flex items-center justify-between py-2 text-[11px]">
                    <div className="grid grid-cols-3 gap-2 flex-1 min-w-0 pr-2">
                      <span className="font-semibold truncate">
                        {highlightText(p.site, findText)}
                      </span>
                      <span className={`truncate ${settingsThemeClasses.textMuted}`}>
                        {highlightText(p.username, findText)}
                      </span>
                      <span className="font-mono text-[9px] opacity-70">
                        {p.show ? p.password : "••••••••"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() =>
                          setPasswordsList((prev) =>
                            prev.map((item) =>
                              item.id === p.id ? { ...item, show: !item.show } : item,
                            ),
                          )
                        }
                        className={`text-[9px] ${settingsThemeClasses.textMuted} hover:text-gray-800 dark:hover:text-zinc-200`}
                      >
                        {p.show ? "Hide" : "Show"}
                      </button>
                      <button
                        onClick={() =>
                          setPasswordsList((prev) => prev.filter((item) => item.id !== p.id))
                        }
                        className={`p-0.5 ${settingsThemeClasses.textMuted} hover:text-rose-500`}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-gray-200 dark:border-zinc-800 space-y-2">
                <input
                  type="text"
                  placeholder="Website"
                  value={newPassSite}
                  onChange={(e) => setNewPassSite(e.target.value)}
                  className={`w-full text-[11px] px-2 py-1 rounded border outline-none ${settingsThemeClasses.inputBg}`}
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Username"
                    value={newPassUser}
                    onChange={(e) => setNewPassUser(e.target.value)}
                    className={`flex-1 text-[11px] px-2 py-1 rounded border outline-none ${settingsThemeClasses.inputBg}`}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={newPassVal}
                    onChange={(e) => setNewPassVal(e.target.value)}
                    className={`flex-1 text-[11px] px-2 py-1 rounded border outline-none ${settingsThemeClasses.inputBg}`}
                  />
                  <button
                    onClick={() => {
                      if (!newPassSite || !newPassUser || !newPassVal)
                        return alert("Fill all fields");
                      setPasswordsList((prev) => [
                        ...prev,
                        {
                          id: Date.now(),
                          site: newPassSite,
                          username: newPassUser,
                          password: newPassVal,
                          show: false,
                        },
                      ]);
                      setNewPassSite("");
                      setNewPassUser("");
                      setNewPassVal("");
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-3 py-1 rounded shadow"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className={`p-4 rounded-xl border space-y-3.5 ${settingsThemeClasses.cardBg}`}>
              <h3
                className={`text-[10px] font-bold ${settingsThemeClasses.textMuted} uppercase tracking-wider`}
              >
                Payment Methods
              </h3>
              <div className={`divide-y ${settingsThemeClasses.divideColor}`}>
                {cardsList.map((c) => (
                  <div key={c.id} className="flex items-center justify-between py-2 text-[11px]">
                    <div>
                      <span className="font-semibold">{highlightText(c.type, findText)}</span>{" "}
                      &bull; <span className={settingsThemeClasses.textMuted}>{c.number}</span>
                      <p className={`text-[9px] ${settingsThemeClasses.textMuted}`}>
                        Expiry: {c.expiry} &bull; {c.holder}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setCardsList((prev) => prev.filter((item) => item.id !== c.id))
                      }
                      className={`${settingsThemeClasses.textMuted} hover:text-rose-500`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-zinc-800">
                <input
                  type="text"
                  placeholder="Card Number (last 4 digits)"
                  value={newCardNum}
                  onChange={(e) => setNewCardNum(e.target.value)}
                  className={`flex-1 text-[11px] px-2 py-1 rounded border outline-none ${settingsThemeClasses.inputBg}`}
                />
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={newCardExpiry}
                  onChange={(e) => setNewCardExpiry(e.target.value)}
                  className={`w-14 text-[11px] px-2 py-1 rounded border outline-none ${settingsThemeClasses.inputBg}`}
                />
                <button
                  onClick={() => {
                    if (!newCardNum || !newCardExpiry) return alert("Fill fields");
                    setCardsList((prev) => [
                      ...prev,
                      {
                        id: Date.now(),
                        type: "Card",
                        number: `•••• •••• •••• ${newCardNum.slice(-4)}`,
                        holder: "Kunal",
                        expiry: newCardExpiry,
                      },
                    ]);
                    setNewCardNum("");
                    setNewCardExpiry("");
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-2 rounded shadow"
                >
                  Add Card
                </button>
              </div>
            </div>

            {/* Addresses */}
            <div className={`p-4 rounded-xl border space-y-3.5 ${settingsThemeClasses.cardBg}`}>
              <h3
                className={`text-[10px] font-bold ${settingsThemeClasses.textMuted} uppercase tracking-wider`}
              >
                Saved Addresses
              </h3>
              <div className={`divide-y ${settingsThemeClasses.divideColor}`}>
                {addressesList.map((addr) => (
                  <div key={addr.id} className="flex items-center justify-between py-2 text-[11px]">
                    <div>
                      <span className="font-semibold">{highlightText(addr.label, findText)}</span>:{" "}
                      {highlightText(addr.street, findText)}, {addr.city}
                      <p className={`text-[9px] ${settingsThemeClasses.textMuted}`}>
                        Recipient: {addr.name}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setAddressesList((prev) => prev.filter((item) => item.id !== addr.id))
                      }
                      className={`${settingsThemeClasses.textMuted} hover:text-rose-500`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-zinc-800">
                <input
                  type="text"
                  placeholder="Street"
                  value={newAddressStreet}
                  onChange={(e) => setNewAddressStreet(e.target.value)}
                  className={`flex-1 text-[11px] px-2 py-1.5 rounded border outline-none ${settingsThemeClasses.inputBg}`}
                />
                <input
                  type="text"
                  placeholder="City"
                  value={newAddressCity}
                  onChange={(e) => setNewAddressCity(e.target.value)}
                  className={`w-20 text-[11px] px-2 py-1.5 rounded border outline-none ${settingsThemeClasses.inputBg}`}
                />
                <button
                  onClick={() => {
                    if (!newAddressStreet || !newAddressCity) return alert("Fill fields");
                    setAddressesList((prev) => [
                      ...prev,
                      {
                        id: Date.now(),
                        label: "Other",
                        name: "Kunal",
                        street: newAddressStreet,
                        city: newAddressCity,
                        state: "CA",
                        zip: "90001",
                      },
                    ]);
                    setNewAddressStreet("");
                    setNewAddressCity("");
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-2.5 rounded shadow"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUB SECTION: APPEARANCE */}
        {activeSettingsSection === "appearance" && (
          <div className="space-y-5">
            <div
              className={`flex items-center justify-between p-4 rounded-xl border ${settingsThemeClasses.cardBg}`}
            >
              <div>
                <h4 className="text-xs font-bold">Theme Mode</h4>
                <p className={`text-[9px] ${settingsThemeClasses.textMuted}`}>
                  Light or dark browser theme
                </p>
              </div>
              <div className={`flex p-1 rounded-lg border ${settingsThemeClasses.toggleBg}`}>
                <button
                  onClick={() => setTheme("light")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded text-[11px] font-semibold transition-all ${
                    theme === "light"
                      ? "bg-white text-gray-800 shadow-sm"
                      : settingsThemeClasses.btnInactive
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" /> Light
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded text-[11px] font-semibold transition-all ${
                    theme === "dark"
                      ? "bg-[#2f3033] text-white shadow-sm"
                      : settingsThemeClasses.btnInactive
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-indigo-400" /> Dark
                </button>
              </div>
            </div>

            <div
              className={`flex items-center justify-between p-4 rounded-xl border ${settingsThemeClasses.cardBg}`}
            >
              <div>
                <h4 className="text-xs font-bold">Show Bookmarks Strip</h4>
                <p className={`text-[9px] ${settingsThemeClasses.textMuted}`}>
                  Display bookmarks bar in top view
                </p>
              </div>
              <button
                onClick={() => setShowBookmarks((prev) => !prev)}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${showBookmarks ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-750"}`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 transform ${showBookmarks ? "translate-x-4" : "translate-x-0"}`}
                />
              </button>
            </div>

            <div
              className={`flex items-center justify-between p-4 rounded-xl border ${settingsThemeClasses.cardBg}`}
            >
              <div>
                <h4 className="text-xs font-bold">Font Size</h4>
                <p className={`text-[9px] ${settingsThemeClasses.textMuted}`}>
                  Scale browser display font size
                </p>
              </div>
              <div
                className={`flex p-1 rounded-lg border ${settingsThemeClasses.toggleBg} gap-0.5`}
              >
                {["small", "medium", "large"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`px-2.5 py-1 rounded text-[10px] font-semibold capitalize transition-all ${
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

        {/* SUB SECTION: SEARCH ENGINE */}
        {activeSettingsSection === "search" && (
          <div className="space-y-5">
            <div
              className={`flex items-center justify-between p-4 rounded-xl border ${settingsThemeClasses.cardBg}`}
            >
              <div>
                <h4 className="text-xs font-bold">Default Provider</h4>
                <p className={`text-[9px] ${settingsThemeClasses.textMuted}`}>
                  Queries are sent to this search engine
                </p>
              </div>
              <select
                value={searchEngine}
                onChange={(e) => setSearchEngine(e.target.value)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border outline-none cursor-pointer ${settingsThemeClasses.inputBg}`}
              >
                <option value="Google">Google</option>
                <option value="Bing">Bing</option>
                <option value="DuckDuckGo">DuckDuckGo</option>
              </select>
            </div>
          </div>
        )}

        {/* SUB SECTION: PRIVACY */}
        {activeSettingsSection === "privacy" && (
          <div className="space-y-5">
            <div
              className={`flex items-center justify-between p-4 rounded-xl border ${settingsThemeClasses.cardBg}`}
            >
              <div>
                <h4 className="text-xs font-bold">Browsing Data</h4>
                <p className={`text-[9px] ${settingsThemeClasses.textMuted}`}>
                  Delete history, reset tabs, and log out profile
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
                  alert("Browsing history and tabs cleared!");
                  setActiveSettingsSection(null);
                }}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[10px] font-bold transition-all shadow-sm cursor-pointer"
              >
                Clear History
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChromeSettingsSection;
