import React from "react";
import WindowControls from "@components/WindowControls";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Share,
  ShieldHalf,
  PanelLeft,
  RotateCw,
  Star,
  Download,
  Layout,
  AlignLeft,
} from "lucide-react";

const SafariDesktopToolbar = ({
  showSidebar,
  onToggleSidebar,
  activeTab,
  addressInput,
  setAddressInput,
  navigateTabTo,
  handleGoBack,
  handleGoForward,
  handleReload,
  toggleReaderMode,
  toggleBookmark,
  isBookmarked,
  showDownloads,
  setShowDownloads,
  showTabOverview,
  setShowTabOverview,
  handleNewTab,
  openWindow,
}) => {
  const canGoBack = activeTab.historyIndex > 0;
  const canGoForward = activeTab.historyIndex < activeTab.history.length - 1;
  const isReaderCompatible = activeTab.url.includes("wikipedia.org");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigateTabTo(addressInput);
      e.target.blur();
    }
  };

  return (
    <div
      id="window-header"
      className="!bg-[#eef1f5] !border-b-[#c8cbd0] !px-4 !py-2 flex flex-col gap-1.5 select-none relative z-20 shrink-0"
    >
      <div className="flex items-center gap-4 w-full">
        {/* Left Side: Window Controls & Sidebar toggle */}
        <div className="flex items-center gap-3">
          <WindowControls target="safari" />
          <button
            onClick={onToggleSidebar}
            className={`p-1 rounded hover:bg-black/5 transition-colors ${
              showSidebar ? "bg-black/8" : ""
            }`}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <PanelLeft size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleGoBack}
            disabled={!canGoBack}
            className={`p-1 rounded hover:bg-black/5 transition-colors ${
              canGoBack ? "text-gray-700 cursor-pointer" : "text-gray-300 cursor-not-allowed"
            }`}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <ChevronLeft size={17} />
          </button>
          <button
            onClick={handleGoForward}
            disabled={!canGoForward}
            className={`p-1 rounded hover:bg-black/5 transition-colors ${
              canGoForward ? "text-gray-700 cursor-pointer" : "text-gray-300 cursor-not-allowed"
            }`}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <ChevronRight size={17} />
          </button>
        </div>

        {/* Center: Address Bar */}
        <div className="flex-1 max-w-2xl mx-auto w-full">
          <div
            className="flex items-center gap-2 bg-white border border-[#c8cbd0] rounded-lg px-2.5 py-1 text-sm text-gray-700 shadow-inner focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10"
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {/* Padlock / Security report */}
            <div
              className="flex items-center gap-1 cursor-pointer hover:bg-black/5 rounded p-0.5"
              title="Privacy Report"
            >
              <ShieldHalf size={13} className="text-green-600" />
            </div>

            {/* Reader Mode Button */}
            {isReaderCompatible && (
              <button
                onClick={toggleReaderMode}
                className={`p-0.5 rounded transition-colors ${
                  activeTab.isReaderMode
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-500 hover:bg-black/5"
                }`}
                title="Reader View"
              >
                <AlignLeft size={13} />
              </button>
            )}

            {/* Search Icon */}
            {!activeTab.isReaderMode && <Search size={12} className="text-gray-400" />}

            {/* Address Input */}
            <input
              type="text"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search or enter website name"
              className="flex-1 bg-transparent border-none outline-none text-xs text-gray-800 placeholder-gray-400 text-center focus:text-left"
            />

            {/* Bookmark Star Button */}
            <button
              onClick={toggleBookmark}
              className={`p-0.5 rounded transition-colors text-gray-400 hover:text-amber-500`}
              title="Bookmark this page"
            >
              <Star size={13} className={isBookmarked ? "text-amber-500 fill-amber-500" : ""} />
            </button>

            {/* Reload Button */}
            <button
              onClick={handleReload}
              className="p-0.5 rounded hover:bg-black/5 transition-colors text-gray-500"
              title="Reload page"
            >
              <RotateCw size={12} />
            </button>
          </div>
        </div>

        {/* Right Side: Share, Downloads, Plus, Layout */}
        <div className="flex items-center gap-3">
          <button
            className="p-1.5 rounded hover:bg-black/5 text-gray-600 transition-colors"
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <Share size={16} />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowDownloads(!showDownloads)}
              className={`p-1.5 rounded hover:bg-black/5 text-gray-600 transition-colors ${
                showDownloads ? "bg-black/8" : ""
              }`}
              onMouseDown={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <Download size={16} />
            </button>

            {/* Downloads Popover */}
            {showDownloads && (
              <div
                className="absolute right-0 mt-2 w-72 bg-white border border-[#c8cbd0] rounded-xl shadow-xl p-4 text-xs z-50 text-gray-700 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseDown={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b pb-2 mb-3">
                  <span className="font-bold">Downloads</span>
                  <button
                    onClick={() => setShowDownloads(false)}
                    className="text-blue-500 hover:underline font-medium"
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-3">
                  <div
                    onClick={() => {
                      openWindow("resume");
                      setShowDownloads(false);
                    }}
                    className="flex items-center gap-2.5 cursor-pointer hover:bg-black/5 p-1 rounded transition-colors"
                  >
                    <div className="w-8 h-8 rounded bg-red-100 flex items-center justify-center font-bold text-red-600 text-[10px]">
                      PDF
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate text-left">Kuldeep_Resume.pdf</p>
                      <p className="text-[10px] text-gray-400 text-left">2.4 MB — Complete</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-[10px]">
                      ZIP
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">Project_Portfolio_Source.zip</p>
                      <p className="text-[10px] text-gray-400">14.8 MB — Complete</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleNewTab}
            className="p-1.5 rounded hover:bg-black/5 text-gray-600 transition-colors"
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <Plus size={16} />
          </button>

          <button
            onClick={() => setShowTabOverview(!showTabOverview)}
            className={`p-1.5 rounded hover:bg-black/5 text-gray-600 transition-colors ${
              showTabOverview ? "bg-black/8" : ""
            }`}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <Layout size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const SafariMobileHeader = ({
  activeTab,
  addressInput,
  setAddressInput,
  navigateTabTo,
  handleGoBack,
  handleGoForward,
  handleReload,
  handleNewTab,
  showDownloads,
  setShowDownloads,
  openWindow,
}) => {
  const canGoBack = activeTab.historyIndex > 0;
  const canGoForward = activeTab.historyIndex < activeTab.history.length - 1;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigateTabTo(addressInput);
      e.target.blur();
    }
  };

  return (
    <div
      id="window-header"
      className="flex flex-col p-2.5 bg-[#f8f8f8] border-b border-[#d1d1d6] gap-2 shrink-0 select-none relative z-20"
    >
      <div className="flex items-center gap-2 w-full">
        <WindowControls target="safari" />
        <div className="flex-1 flex items-center gap-1.5 bg-[#e9e9eb] rounded-lg px-2 py-1.5 min-h-[34px]">
          <ShieldHalf size={13} className="text-green-600 flex-shrink-0" />
          <Search size={11} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search or enter website"
            className="flex-1 bg-transparent border-none outline-none text-xs text-gray-800 placeholder-gray-400 focus:text-left text-center"
          />
          <button onClick={handleReload} className="text-gray-400 hover:text-gray-600">
            <RotateCw size={12} />
          </button>
        </div>
        <button
          onClick={() => setShowDownloads(!showDownloads)}
          className="text-blue-500 relative p-1"
        >
          <Download size={18} />
        </button>
      </div>

      <div className="flex items-center justify-between w-full px-2 relative">
        <div className="flex items-center gap-5">
          <button
            onClick={handleGoBack}
            disabled={!canGoBack}
            className={canGoBack ? "text-blue-500" : "text-gray-300"}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={handleGoForward}
            disabled={!canGoForward}
            className={canGoForward ? "text-blue-500" : "text-gray-300"}
          >
            <ChevronRight size={22} />
          </button>
        </div>
        <div className="flex items-center gap-5">
          <button onClick={handleNewTab} className="text-blue-500">
            <Plus size={20} />
          </button>
        </div>

        {/* Mobile Downloads Popover */}
        {showDownloads && (
          <div className="absolute right-2 top-0 mt-8 w-64 bg-white border border-[#c8cbd0] rounded-xl shadow-xl p-3.5 text-xs z-50 text-gray-700 animate-in fade-in">
            <div className="flex items-center justify-between border-b pb-1.5 mb-2">
              <span className="font-bold">Downloads</span>
              <button
                onClick={() => setShowDownloads(false)}
                className="text-blue-500 hover:underline font-medium"
              >
                Clear
              </button>
            </div>
            <div className="space-y-2">
              <div
                onClick={() => {
                  openWindow("resume");
                  setShowDownloads(false);
                }}
                className="flex items-center gap-2.5 cursor-pointer hover:bg-black/5 p-1 rounded transition-colors"
              >
                <div className="w-7 h-7 rounded bg-red-100 flex items-center justify-center font-bold text-red-600 text-[9px]">
                  PDF
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate text-left">Kuldeep_Resume.pdf</p>
                  <p className="text-[9px] text-gray-400 text-left">2.4 MB — Complete</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { SafariDesktopToolbar, SafariMobileHeader };
