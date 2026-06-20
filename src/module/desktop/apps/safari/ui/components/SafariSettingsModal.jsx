import React, { useState } from "react";
import { Settings, Layout, Search, Lock, Shield, Sliders, X } from "lucide-react";

const SafariSettingsModal = ({
  show,
  onClose,
  homepage,
  setHomepage,
  searchEngine,
  setSearchEngine,
  showTabIcons,
  setShowTabIcons,
  preventTracking,
  setPreventTracking,
  blockCookies,
  setBlockCookies,
  enableJavaScript,
  setEnableJavaScript,
  developMenuEnabled,
  setDevelopMenuEnabled,
}) => {
  const [activeTab, setActiveTab] = useState("general"); // general, tabs, search, security, privacy, advanced
  const [isMinimized, setIsMinimized] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!show) return null;

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "tabs", label: "Tabs", icon: Layout },
    { id: "search", label: "Search", icon: Search },
    { id: "security", label: "Security", icon: Shield },
    { id: "privacy", label: "Privacy", icon: Lock },
    { id: "advanced", label: "Advanced", icon: Sliders },
  ];

  // If Minimized, render a neat floating recovery tile at the bottom-right of Safari
  if (isMinimized) {
    return (
      <div
        onClick={() => setIsMinimized(false)}
        className="absolute bottom-4 right-4 z-[999] bg-white/90 backdrop-blur-md border border-gray-305 rounded-lg shadow-lg px-3 py-2 flex items-center gap-3.5 cursor-pointer hover:bg-gray-50 active:scale-98 transition-all animate-in fade-in slide-in-from-bottom-2 duration-200"
        onMouseDown={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-[#1aab29]" />
        </div>
        <span className="text-[11px] font-semibold text-gray-700 flex items-center gap-1.5 select-none">
          <Settings size={12} className="text-gray-500 animate-[spin_4s_linear_infinite]" />
          Safari Settings
        </span>
      </div>
    );
  }

  const sizeClass = isZoomed ? "w-[680px] h-[480px]" : "w-[550px] h-[380px]";

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/25 backdrop-blur-xs select-none"
      onClick={onClose}
      onMouseDown={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div
        className={`${sizeClass} bg-[#ece9e6] border border-gray-400 rounded-xl shadow-2xl overflow-hidden flex flex-col font-sans text-gray-800 transition-all duration-300 ease-out`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title & Toolbar Header */}
        <div className="h-16 flex items-center px-5 shrink-0 bg-[#f3f1ee] border-b border-gray-300 gap-6">
          {/* Windows Controls Dots */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Close */}
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] cursor-pointer active:opacity-75"
              title="Close Settings"
            />
            {/* Minimize */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] cursor-pointer active:opacity-75"
              title="Zoom Settings"
            />
            {/* Zoom */}
            <button
              onClick={() => setIsMinimized(true)}
              className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] cursor-pointer active:opacity-75"
              title="Minimize Settings"
            />
          </div>

          {/* Navigation Tabs (Aligned next to dots in a horizontal flex layout) */}
          <div className="flex items-center gap-1.5 overflow-x-auto min-w-0">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center w-[64px] h-[46px] rounded-md transition-all shrink-0 ${
                    isActive
                      ? "bg-black/10 text-gray-900"
                      : "text-gray-500 hover:bg-black/5 hover:text-gray-700"
                  }`}
                >
                  <TabIcon size={16} className={isActive ? "text-blue-500" : ""} />
                  <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white p-6 overflow-y-auto text-xs">
          {activeTab === "general" && (
            <div className="space-y-4">
              {/* Homepage Row */}
              <div className="flex items-center">
                <label className="w-32 text-right pr-4 font-semibold text-gray-500">
                  Homepage:
                </label>
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={homepage}
                    onChange={(e) => setHomepage(e.target.value)}
                    className="flex-1 px-2.5 py-1 bg-white border border-gray-300 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-800"
                    placeholder="safari://start"
                  />
                  <button
                    onClick={() => setHomepage("safari://start")}
                    className="px-2.5 py-1 bg-white hover:bg-gray-50 active:bg-gray-100 border border-gray-300 rounded-md font-medium text-gray-700 shadow-xs transition-colors"
                  >
                    Set to Start Page
                  </button>
                </div>
              </div>

              {/* New Tabs Open With */}
              <div className="flex items-center">
                <label className="w-32 text-right pr-4 font-semibold text-gray-500">
                  New tabs open with:
                </label>
                <div className="flex-1">
                  <select
                    className="px-2 py-1 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-500 text-gray-800"
                    disabled
                    value="Start Page"
                  >
                    <option>Start Page</option>
                    <option disabled>Empty Page (Pro Feature)</option>
                    <option disabled>Homepage (Pro Feature)</option>
                  </select>
                </div>
              </div>

              {/* Default Browser */}
              <div className="flex items-center">
                <label className="w-32 text-right pr-4 font-semibold text-gray-500">
                  Default browser:
                </label>
                <span className="text-gray-600 font-medium">Safari (Portfolio Edition)</span>
              </div>
            </div>
          )}

          {activeTab === "tabs" && (
            <div className="space-y-4">
              {/* Show tab icons */}
              <div className="flex items-start">
                <div className="w-32 text-right pr-4 font-semibold text-gray-500 mt-0.5">
                  Tab options:
                </div>
                <div className="flex-1 space-y-2.5">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-850">
                    <input
                      type="checkbox"
                      checked={showTabIcons}
                      onChange={(e) => setShowTabIcons(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Show website icons in tabs</span>
                  </label>
                  <label className="flex items-center gap-2 opacity-50 cursor-not-allowed text-gray-850">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Show tab overview on layout icon click</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "search" && (
            <div className="space-y-4">
              {/* Search Engine Choice */}
              <div className="flex items-center">
                <label className="w-32 text-right pr-4 font-semibold text-gray-500">
                  Search engine:
                </label>
                <select
                  value={searchEngine}
                  onChange={(e) => setSearchEngine(e.target.value)}
                  className="px-2.5 py-1 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-500 cursor-pointer text-gray-800 font-medium"
                >
                  <option value="Google">Google</option>
                  <option value="DuckDuckGo">DuckDuckGo</option>
                  <option value="Bing">Bing</option>
                  <option value="Yahoo">Yahoo</option>
                </select>
              </div>

              {/* Suggestions options */}
              <div className="flex items-start">
                <div className="w-32 pr-4" />
                <div className="flex-1 space-y-2.5">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-850">
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Include search engine suggestions</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-gray-850">
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Enable quick website search</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-4">
              {/* Enable Javascript */}
              <div className="flex items-start">
                <div className="w-32 text-right pr-4 font-semibold text-gray-500 mt-0.5">
                  Web content:
                </div>
                <div className="flex-1 space-y-2.5">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-850">
                    <input
                      type="checkbox"
                      checked={enableJavaScript}
                      onChange={(e) => setEnableJavaScript(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-medium">Enable JavaScript</span>
                  </label>
                  <p className="text-[10px] text-gray-400 pl-5">
                    Disabling JavaScript restricts script execution inside webpages. This will
                    remove allow-scripts sandbox capabilities from the browser iframe.
                  </p>
                </div>
              </div>

              {/* Fraudulent Website warning */}
              <div className="flex items-start">
                <div className="w-32 text-right pr-4 font-semibold text-gray-500 mt-0.5">
                  Fraudulent sites:
                </div>
                <div className="flex-1">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-850">
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Warn when visiting a fraudulent website</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-4">
              {/* Prevent cross site tracking */}
              <div className="flex items-start">
                <div className="w-32 text-right pr-4 font-semibold text-gray-500 mt-0.5">
                  Website tracking:
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-850">
                    <input
                      type="checkbox"
                      checked={preventTracking}
                      onChange={(e) => setPreventTracking(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-medium">Prevent cross-site tracking</span>
                  </label>
                  <p className="text-[10px] text-gray-400 pl-5 leading-normal">
                    Prevents tracking networks from profiling your activities across different
                    domains. You can inspect this status on safari://privacy-report.
                  </p>
                </div>
              </div>

              {/* Block all cookies */}
              <div className="flex items-start">
                <div className="w-32 text-right pr-4 font-semibold text-gray-500 mt-0.5">
                  Cookies:
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-850">
                    <input
                      type="checkbox"
                      checked={blockCookies}
                      onChange={(e) => setBlockCookies(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-medium">Block all cookies</span>
                  </label>
                  <p className="text-[10px] text-gray-405 pl-5 leading-normal">
                    Websites, third parties, and advertisers may not store cookies or other data on
                    your computer.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "advanced" && (
            <div className="space-y-4">
              {/* Smart Search Field */}
              <div className="flex items-start">
                <div className="w-32 text-right pr-4 font-semibold text-gray-500 mt-0.5">
                  Smart Search:
                </div>
                <div className="flex-1">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-850">
                    <input
                      type="checkbox"
                      defaultChecked={false}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Show full website address</span>
                  </label>
                </div>
              </div>

              {/* Show Develop Menu */}
              <div className="flex items-start">
                <div className="w-32 text-right pr-4 font-semibold text-gray-500 mt-0.5">
                  Develop menu:
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-850">
                    <input
                      type="checkbox"
                      checked={developMenuEnabled}
                      onChange={(e) => setDevelopMenuEnabled(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-medium">Show Develop menu in menu bar</span>
                  </label>
                  <p className="text-[10px] text-gray-400 pl-5 leading-normal">
                    Enables development tools for testing browser features and web design
                    components. (Simulated)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info line */}
        <div className="h-8 shrink-0 bg-[#f3f1ee] border-t border-gray-300 flex items-center justify-center text-[10px] text-gray-500 font-medium">
          Settings are saved instantly in Safari preferences
        </div>
      </div>
    </div>
  );
};

export default SafariSettingsModal;
