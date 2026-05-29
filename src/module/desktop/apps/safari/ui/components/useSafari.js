import { useState, useEffect } from "react";
import useWindowsStore from "#store/window";
import {
  DEFAULT_BOOKMARKS,
  WALLPAPERS,
  IFRAME_COMPATIBLE_SITES,
  MOCK_HISTORY
} from "./safariData";

const useSafari = () => {
  const [tabs, setTabs] = useState([
    {
      id: "tab-1",
      title: "Start Page",
      url: "safari://start",
      history: ["safari://start"],
      historyIndex: 0,
      isReaderMode: false
    }
  ]);
  const [activeTabId, setActiveTabId] = useState("tab-1");
  const [addressInput, setAddressInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarTab, setSidebarTab] = useState("bookmarks"); // bookmarks, readingList, history
  const [searchEngine, setSearchEngine] = useState("Google");
  const [showDownloads, setShowDownloads] = useState(false);
  const [showTabOverview, setShowTabOverview] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(WALLPAPERS[0].value);
  const [enabledSections, setEnabledSections] = useState({
    favorites: true,
    privacyReport: true,
    readingList: true,
    background: true
  });
  const [bookmarks, setBookmarks] = useState(DEFAULT_BOOKMARKS);
  const [historyList, setHistoryList] = useState(MOCK_HISTORY);
  
  // Custom reading settings
  const [readerFont, setReaderFont] = useState("serif"); // serif, sans
  const [readerTheme, setReaderTheme] = useState("sepia"); // white, sepia, gray, night
  const [readerFontSize, setReaderFontSize] = useState(16); // px

  const { closeWindow, openWindow } = useWindowsStore();

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const isBookmarked = bookmarks.some((b) => b.url === activeTab.url);

  // Sync addressInput with activeTab url
  useEffect(() => {
    if (activeTab) {
      if (activeTab.url === "safari://start") {
        setAddressInput("");
      } else {
        setAddressInput(activeTab.url);
      }
    }
  }, [activeTab?.url, activeTabId]);

  // Log history
  useEffect(() => {
    if (activeTab && activeTab.url && !activeTab.url.startsWith("safari://")) {
      const title = activeTab.title || activeTab.url;
      const url = activeTab.url;
      setHistoryList((prev) => {
        if (prev.length > 0 && prev[0].url === url) return prev;
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        return [{ title, url, time: timeStr }, ...prev];
      });
    }
  }, [activeTab?.url, activeTab?.title]);

  const handleNewTab = () => {
    const newId = `tab-${Date.now()}`;
    const newTabObj = {
      id: newId,
      title: "Start Page",
      url: "safari://start",
      history: ["safari://start"],
      historyIndex: 0,
      isReaderMode: false
    };
    setTabs((prev) => [...prev, newTabObj]);
    setActiveTabId(newId);
    setShowTabOverview(false);
  };

  const handleCloseTab = (tabId, e) => {
    if (e) e.stopPropagation();
    if (tabs.length === 1) {
      // Just reset the single tab to start page
      setTabs([
        {
          id: "tab-1",
          title: "Start Page",
          url: "safari://start",
          history: ["safari://start"],
          historyIndex: 0,
          isReaderMode: false
        }
      ]);
      setActiveTabId("tab-1");
      return;
    }
    const closeIndex = tabs.findIndex((t) => t.id === tabId);
    const nextTabs = tabs.filter((t) => t.id !== tabId);
    setTabs(nextTabs);
    if (activeTabId === tabId) {
      const nextActiveIndex = Math.max(0, closeIndex - 1);
      setActiveTabId(nextTabs[nextActiveIndex].id);
    }
  };

  const navigateTabTo = (url) => {
    let targetUrl = url.trim();
    if (!targetUrl) return;

    if (!targetUrl.startsWith("safari://")) {
      if (!/^https?:\/\//i.test(targetUrl)) {
        const lowerUrl = targetUrl.toLowerCase();
        const isLocal =
          lowerUrl.startsWith("localhost") ||
          lowerUrl.startsWith("127.0.0.1") ||
          lowerUrl.startsWith(window.location.host.toLowerCase()) ||
          lowerUrl.startsWith(window.location.hostname.toLowerCase());
        
        if (isLocal) {
          let protocol = "http://";
          if (
            lowerUrl.startsWith(window.location.host.toLowerCase()) ||
            lowerUrl.startsWith(window.location.hostname.toLowerCase())
          ) {
            protocol = window.location.protocol + "//";
          }
          targetUrl = protocol + targetUrl;
        } else if (targetUrl.includes(".") && !targetUrl.includes(" ")) {
          targetUrl = "https://" + targetUrl;
        } else {
          // search query
          targetUrl = `https://www.google.com/search?q=${encodeURIComponent(targetUrl)}`;
        }
      }
    }

    setTabs((prevTabs) =>
      prevTabs.map((tab) => {
        if (tab.id === activeTabId) {
          const nextHistory = tab.history.slice(0, tab.historyIndex + 1);
          nextHistory.push(targetUrl);

          let newTitle = "Web Page";
          if (targetUrl === "safari://start") {
            newTitle = "Start Page";
          } else if (targetUrl === "safari://privacy-report") {
            newTitle = "Privacy Report";
          } else if (targetUrl === "safari://history") {
            newTitle = "History";
          } else if (targetUrl === "safari://bookmarks") {
            newTitle = "Bookmarks";
          } else if (targetUrl.includes("google.com/search")) {
            try {
              const qParam = new URL(targetUrl).searchParams.get("q");
              newTitle = qParam ? `${qParam} - Google Search` : "Google Search";
            } catch (e) {
              newTitle = "Google Search";
            }
          } else {
            try {
              const hostname = new URL(targetUrl).hostname;
              newTitle = hostname.replace("www.", "");
            } catch (e) {
              newTitle = targetUrl;
            }
          }

          return {
            ...tab,
            url: targetUrl,
            title: newTitle,
            history: nextHistory,
            historyIndex: nextHistory.length - 1,
            isReaderMode: false // Reset reader mode on navigation
          };
        }
        return tab;
      })
    );
  };

  const handleGoBack = () => {
    if (activeTab.historyIndex > 0) {
      setTabs((prevTabs) =>
        prevTabs.map((tab) => {
          if (tab.id === activeTabId) {
            const nextIndex = tab.historyIndex - 1;
            const nextUrl = tab.history[nextIndex];
            return {
              ...tab,
              url: nextUrl,
              historyIndex: nextIndex,
              title: getTitleForUrl(nextUrl),
              isReaderMode: false
            };
          }
          return tab;
        })
      );
    }
  };

  const handleGoForward = () => {
    if (activeTab.historyIndex < activeTab.history.length - 1) {
      setTabs((prevTabs) =>
        prevTabs.map((tab) => {
          if (tab.id === activeTabId) {
            const nextIndex = tab.historyIndex + 1;
            const nextUrl = tab.history[nextIndex];
            return {
              ...tab,
              url: nextUrl,
              historyIndex: nextIndex,
              title: getTitleForUrl(nextUrl),
              isReaderMode: false
            };
          }
          return tab;
        })
      );
    }
  };

  const getTitleForUrl = (url) => {
    if (url === "safari://start") return "Start Page";
    if (url === "safari://privacy-report") return "Privacy Report";
    if (url === "safari://history") return "History";
    if (url === "safari://bookmarks") return "Bookmarks";
    if (url.includes("google.com/search")) {
      try {
        const q = new URL(url).searchParams.get("q");
        return q ? `${q} - Google` : "Google Search";
      } catch (e) {
        return "Google Search";
      }
    }
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch (e) {
      return "Web Page";
    }
  };

  const handleReload = () => {
    // Simulated reload effect
    const prevUrl = activeTab.url;
    navigateTabTo("safari://start");
    setTimeout(() => {
      navigateTabTo(prevUrl);
    }, 100);
  };

  const toggleReaderMode = () => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => {
        if (tab.id === activeTabId) {
          return { ...tab, isReaderMode: !tab.isReaderMode };
        }
        return tab;
      })
    );
  };

  const toggleBookmark = () => {
    if (activeTab.url === "safari://start" || activeTab.url.startsWith("safari://")) return;
    if (isBookmarked) {
      setBookmarks((prev) => prev.filter((b) => b.url !== activeTab.url));
    } else {
      setBookmarks((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: activeTab.title,
          url: activeTab.url,
          img: `https://www.google.com/s2/favicons?domain=${new URL(activeTab.url).hostname}&sz=32`
        }
      ]);
    }
  };

  const isIframeable = (url) => {
    if (url.startsWith("safari://")) return true;
    const urlLower = url.toLowerCase();
    try {
      const parsedUrl = new URL(url);
      const host = parsedUrl.hostname.toLowerCase();
      const currentHost = window.location.hostname.toLowerCase();
      if (host === "localhost" || host === "127.0.0.1" || host === currentHost) {
        return true;
      }
    } catch (e) {}
    return IFRAME_COMPATIBLE_SITES.some((site) => urlLower.includes(site));
  };

  return {
    tabs,
    setTabs,
    activeTabId,
    setActiveTabId,
    addressInput,
    setAddressInput,
    showSidebar,
    setShowSidebar,
    sidebarTab,
    setSidebarTab,
    searchEngine,
    setSearchEngine,
    showDownloads,
    setShowDownloads,
    showTabOverview,
    setShowTabOverview,
    backgroundImage,
    setBackgroundImage,
    enabledSections,
    setEnabledSections,
    bookmarks,
    setBookmarks,
    historyList,
    setHistoryList,
    readerFont,
    setReaderFont,
    readerTheme,
    setReaderTheme,
    readerFontSize,
    setReaderFontSize,
    activeTab,
    isBookmarked,
    navigateTabTo,
    handleNewTab,
    handleCloseTab,
    handleGoBack,
    handleGoForward,
    handleReload,
    toggleReaderMode,
    toggleBookmark,
    isIframeable,
    closeWindow,
    openWindow
  };
};

export default useSafari;
