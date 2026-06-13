import { useState, useEffect } from "react";
import { projects, socials } from "@constants";
import useSafari from "../../hooks/useSafari";
import { SafariDesktopToolbar, SafariMobileHeader } from "../components/SafariToolbar";
import SafariTabBar from "../components/SafariTabBar";
import SafariSidebar from "../components/SafariSidebar";
import SafariContentView from "../components/SafariContentView";
import SafariSettingsModal from "../components/SafariSettingsModal";
import SafariAboutModal from "../components/SafariAboutModal";

const SafariSection = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const safari = useSafari();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="flex flex-col h-full w-full bg-white select-none overflow-hidden rounded-xl">
        <SafariMobileHeader
          activeTab={safari.activeTab}
          addressInput={safari.addressInput}
          setAddressInput={safari.setAddressInput}
          navigateTabTo={safari.navigateTabTo}
          handleGoBack={safari.handleGoBack}
          handleGoForward={safari.handleGoForward}
          handleReload={safari.handleReload}
          handleNewTab={safari.handleNewTab}
          showDownloads={safari.showDownloads}
          setShowDownloads={safari.setShowDownloads}
          openWindow={safari.openWindow}
        />
        <SafariContentView
          activeTab={safari.activeTab}
          tabs={safari.tabs}
          setActiveTabId={safari.setActiveTabId}
          handleCloseTab={safari.handleCloseTab}
          handleNewTab={safari.handleNewTab}
          showTabOverview={safari.showTabOverview}
          setShowTabOverview={safari.setShowTabOverview}
          addressInput={safari.addressInput}
          navigateTabTo={safari.navigateTabTo}
          bookmarks={safari.bookmarks}
          setBookmarks={safari.setBookmarks}
          projects={projects}
          socials={socials}
          backgroundImage={safari.backgroundImage}
          setBackgroundImage={safari.setBackgroundImage}
          enabledSections={safari.enabledSections}
          setEnabledSections={safari.setEnabledSections}
          isIframeable={safari.isIframeable}
          readerFont={safari.readerFont}
          setReaderFont={safari.setReaderFont}
          readerTheme={safari.readerTheme}
          setReaderTheme={safari.setReaderTheme}
          readerFontSize={safari.readerFontSize}
          setReaderFontSize={safari.setReaderFontSize}
          toggleReaderMode={safari.toggleReaderMode}
          searchEngine={safari.searchEngine}
          enableJavaScript={safari.enableJavaScript}
          preventTracking={safari.preventTracking}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full @container bg-white select-none overflow-hidden rounded-xl relative">
      {/* 1. Main Unified Toolbar */}
      <SafariDesktopToolbar
        showSidebar={safari.showSidebar}
        onToggleSidebar={() => safari.setShowSidebar(!safari.showSidebar)}
        activeTab={safari.activeTab}
        addressInput={safari.addressInput}
        setAddressInput={safari.setAddressInput}
        navigateTabTo={safari.navigateTabTo}
        handleGoBack={safari.handleGoBack}
        handleGoForward={safari.handleGoForward}
        handleReload={safari.handleReload}
        toggleReaderMode={safari.toggleReaderMode}
        toggleBookmark={safari.toggleBookmark}
        isBookmarked={safari.isBookmarked}
        showDownloads={safari.showDownloads}
        setShowDownloads={safari.setShowDownloads}
        showTabOverview={safari.showTabOverview}
        setShowTabOverview={safari.setShowTabOverview}
        handleNewTab={safari.handleNewTab}
        openWindow={safari.openWindow}
        homepage={safari.homepage}
        setShowSettings={safari.setShowSettings}
      />

      {/* 2. Sleek Tab Bar */}
      <SafariTabBar
        tabs={safari.tabs}
        activeTabId={safari.activeTabId}
        setActiveTabId={safari.setActiveTabId}
        onCloseTab={safari.handleCloseTab}
        onNewTab={safari.handleNewTab}
        showTabIcons={safari.showTabIcons}
      />

      {/* 3. Sidebar + Main Content Split View */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Sidebar Container */}
        <div
          className={`h-full border-r border-[#c8cbd0] transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0 ${
            safari.showSidebar ? "w-64 opacity-100" : "w-0 opacity-0 border-r-0"
          }`}
          onMouseDown={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <SafariSidebar
            bookmarks={safari.bookmarks}
            setBookmarks={safari.setBookmarks}
            historyList={safari.historyList}
            setHistoryList={safari.setHistoryList}
            sidebarTab={safari.sidebarTab}
            setSidebarTab={safari.setSidebarTab}
            navigateTabTo={safari.navigateTabTo}
            projects={projects}
          />
        </div>

        {/* Content View Area */}
        <SafariContentView
          activeTab={safari.activeTab}
          tabs={safari.tabs}
          setActiveTabId={safari.setActiveTabId}
          handleCloseTab={safari.handleCloseTab}
          handleNewTab={safari.handleNewTab}
          showTabOverview={safari.showTabOverview}
          setShowTabOverview={safari.setShowTabOverview}
          addressInput={safari.addressInput}
          navigateTabTo={safari.navigateTabTo}
          bookmarks={safari.bookmarks}
          setBookmarks={safari.setBookmarks}
          projects={projects}
          socials={socials}
          backgroundImage={safari.backgroundImage}
          setBackgroundImage={safari.setBackgroundImage}
          enabledSections={safari.enabledSections}
          setEnabledSections={safari.setEnabledSections}
          isIframeable={safari.isIframeable}
          readerFont={safari.readerFont}
          setReaderFont={safari.setReaderFont}
          readerTheme={safari.readerTheme}
          setReaderTheme={safari.setReaderTheme}
          readerFontSize={safari.readerFontSize}
          setReaderFontSize={safari.setReaderFontSize}
          toggleReaderMode={safari.toggleReaderMode}
          searchEngine={safari.searchEngine}
          enableJavaScript={safari.enableJavaScript}
          preventTracking={safari.preventTracking}
        />
      </div>

      {/* 4. Safari Settings Dialog */}
      <SafariSettingsModal
        show={safari.showSettings}
        onClose={() => safari.setShowSettings(false)}
        homepage={safari.homepage}
        setHomepage={safari.setHomepage}
        searchEngine={safari.searchEngine}
        setSearchEngine={safari.setSearchEngine}
        showTabIcons={safari.showTabIcons}
        setShowTabIcons={safari.setShowTabIcons}
        preventTracking={safari.preventTracking}
        setPreventTracking={safari.setPreventTracking}
        blockCookies={safari.blockCookies}
        setBlockCookies={safari.setBlockCookies}
        enableJavaScript={safari.enableJavaScript}
        setEnableJavaScript={safari.setEnableJavaScript}
        developMenuEnabled={safari.developMenuEnabled}
        setDevelopMenuEnabled={safari.setDevelopMenuEnabled}
      />

      {/* 5. Safari About Dialog */}
      <SafariAboutModal
        show={safari.showAbout}
        onClose={() => safari.setShowAbout(false)}
      />
    </div>
  );
};

export default SafariSection;
