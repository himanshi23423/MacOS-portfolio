import { useState, useEffect, useCallback } from "react";
import useWindowsStore from "@store/window";
import {
  DEFAULT_TABS,
  DEFAULT_BOOKMARKS,
  DEFAULT_DOWNLOADS,
  DEFAULT_PASSWORDS,
  DEFAULT_CARDS,
  DEFAULT_ADDRESSES,
  IFRAME_COMPATIBLE_SITES,
} from "./chromeData";

const useChrome = () => {
  const [tabs, setTabs] = useState(DEFAULT_TABS);
  const [activeTabId, setActiveTabId] = useState("tab-1");
  const [addressInput, setAddressInput] = useState("");
  const [googleSearchQuery, setGoogleSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchEngine, setSearchEngine] = useState("Google");
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [theme, setTheme] = useState("light");
  const [historyList, setHistoryList] = useState([]);
  const [bookmarks, setBookmarks] = useState(DEFAULT_BOOKMARKS);

  const { closeWindow } = useWindowsStore();
  const [zoom, setZoom] = useState(100);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isAdBlockerActive, setIsAdBlockerActive] = useState(false);
  const [isLensScanning, setIsLensScanning] = useState(false);
  const [isDefaultBrowser, setIsDefaultBrowser] = useState(false);
  const [username, setUsername] = useState("Kunal");
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [activeSettingsSection, setActiveSettingsSection] = useState("appearance");
  const [fontSize, setFontSize] = useState("medium");
  const [findText, setFindText] = useState("");
  const [showFindBar, setShowFindBar] = useState(false);
  const [findMatchesCount, setFindMatchesCount] = useState(0);
  const [findMatchIndex, setFindMatchIndex] = useState(0);
  const [showCastDialog, setShowCastDialog] = useState(false);
  const [castDevice, setCastDevice] = useState(null);
  const [isCastConnecting, setIsCastConnecting] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  const [downloadsList, setDownloadsList] = useState(DEFAULT_DOWNLOADS);
  const [passwordsList, setPasswordsList] = useState(DEFAULT_PASSWORDS);
  const [newPassSite, setNewPassSite] = useState("");
  const [newPassUser, setNewPassUser] = useState("");
  const [newPassVal, setNewPassVal] = useState("");

  const [cardsList, setCardsList] = useState(DEFAULT_CARDS);
  const [newCardNum, setNewCardNum] = useState("");
  const [newCardExpiry, setNewCardExpiry] = useState("");

  const [addressesList, setAddressesList] = useState(DEFAULT_ADDRESSES);
  const [newAddressStreet, setNewAddressStreet] = useState("");
  const [newAddressCity, setNewAddressCity] = useState("");

  const [profileColor, setProfileColor] = useState("bg-orange-600");
  const [isSyncActive, setIsSyncActive] = useState(true);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const isBookmarked = bookmarks.some((b) => b.url === activeTab.url);

  const isGitHubUrl =
    activeTab.url.toLowerCase().includes("github.com/kuldeeprajput-dev") ||
    activeTab.url.toLowerCase().includes("github.com");
  const isLinkedInUrl =
    activeTab.url.toLowerCase().includes("linkedin.com/in/kuldeepdotcom") ||
    activeTab.url.toLowerCase().includes("linkedin.com");
  const isTwitterUrl =
    activeTab.url.toLowerCase().includes("x.com/kuldeepdotcom") ||
    activeTab.url.toLowerCase().includes("x.com") ||
    activeTab.url.toLowerCase().includes("twitter.com");
  const isWikipediaUrl = activeTab.url.toLowerCase().includes("wikipedia.org");

  const toggleBookmark = () => {
    if (activeTab.url === "chrome://newtab" || activeTab.url.startsWith("chrome://")) return;
    if (isBookmarked) {
      setBookmarks((prev) => prev.filter((b) => b.url !== activeTab.url));
    } else {
      setBookmarks((prev) => [...prev, { title: activeTab.title, url: activeTab.url }]);
    }
  };

  const highlightText = (text, query) => {
    if (!query || !text || typeof text !== "string") return text;
    const parts = text.split(
      new RegExp(`(${query.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi"),
    );
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-amber-300 text-black rounded px-0.5">
              {part}
            </mark>
          ) : (
            part
          ),
        )}
      </>
    );
  };

  const getFindMatchesForUrl = useCallback(
    (url, query) => {
      if (!query) return 0;
      let pageContent;
      if (url === "chrome://settings") {
        pageContent =
          "Appearance & Search Settings You and Google Profile Autofill and passwords Search Engine Privacy & security Theme Mode Toggle between Light and Dark default search engine password manager payment methods cards addresses font size show bookmarks bar clear browsing data";
      } else if (url === "chrome://history") {
        pageContent = `History Clear History ${historyList.map((h) => h.title + " " + h.url).join(" ")}`;
      } else if (url === "chrome://bookmarks") {
        pageContent = `Bookmarks ${bookmarks.map((b) => b.title + " " + b.url).join(" ")}`;
      } else if (url === "chrome://about") {
        pageContent =
          "Google Chrome Version 125.0.6422.112 Official Build 64-bit Up to date Antigravity MacOS portfolio interface copyright DeepMind";
      } else if (url === "chrome://incognito") {
        pageContent =
          "You've gone Incognito private browsing won't save cookies site data information entered search privately";
      } else if (url === "chrome://downloads") {
        pageContent = `Downloads ${downloadsList.map((d) => d.name + " " + d.type).join(" ")}`;
      } else if (url === "chrome://extensions") {
        pageContent =
          "Extensions AdBlock Pro Blocks intrusive advertisements React Developer Tools debugger panels";
      } else {
        pageContent = "Google Search Results Wikipedia openstreetmap example page web browser";
      }
      const regex = new RegExp(query.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&"), "gi");
      const matches = pageContent.match(regex);
      return matches ? matches.length : 0;
    },
    [historyList, bookmarks, downloadsList],
  );

  useEffect(() => {
    if (showFindBar) {
      const count = getFindMatchesForUrl(activeTab.url, findText);
      setFindMatchesCount(count);
      setFindMatchIndex(count > 0 ? 1 : 0);
    }
  }, [
    findText,
    activeTab.url,
    showFindBar,
    downloadsList,
    bookmarks,
    historyList,
    getFindMatchesForUrl,
  ]);

  const themeClasses = {
    container:
      theme === "dark"
        ? "bg-[#2f3033] border-[#2f3032] text-gray-200"
        : "bg-[#f2f2f2] border-black/10 text-gray-800",
    header: theme === "dark" ? "bg-[#202124] border-[#2f3032]" : "bg-[#dee1e6] border-[#c9cacc]",
    tabActive:
      theme === "dark"
        ? "bg-[#2f3033] text-gray-100 shadow-[0_-1px_3px_rgba(0,0,0,0.2)] z-10"
        : "bg-[#f2f2f2] text-gray-800 font-medium shadow-[0_-1px_3px_rgba(0,0,0,0.06)] z-10",
    tabInactive:
      theme === "dark" ? "text-gray-400 hover:bg-[#2b2c2f]" : "text-gray-600 hover:bg-[#e4e7eb]",
    navBg: theme === "dark" ? "bg-[#2f3033] border-[#202124]" : "bg-[#f2f2f2] border-[#d1d1d1]",
    bookmarksBg:
      theme === "dark" ? "bg-[#2f3033] border-[#202124]" : "bg-[#f2f2f2] border-[#dadce0]",
    bookmarksText:
      theme === "dark" ? "text-gray-300 hover:bg-white/5" : "text-gray-600 hover:bg-black/5",
    addressBg:
      theme === "dark"
        ? "bg-[#202124] border-[#404144] focus-within:border-blue-500 focus-within:ring-blue-500/20"
        : "bg-white border-[#dadce0] focus-within:border-blue-500 focus-within:ring-blue-500/20",
    addressInput:
      theme === "dark"
        ? "text-gray-200 placeholder-gray-500"
        : "text-gray-800 placeholder-gray-400",
    buttonText:
      theme === "dark" ? "text-gray-300 hover:bg-white/5" : "text-gray-700 hover:bg-black/5",
    buttonDisabled:
      theme === "dark" ? "text-gray-600 cursor-not-allowed" : "text-gray-300 cursor-not-allowed",
    tabCloseHover:
      theme === "dark" ? "hover:bg-white/15 text-gray-400" : "hover:bg-black/10 text-gray-500",
    tabGlobe: theme === "dark" ? "text-gray-400" : "text-gray-500",
  };

  const menuThemeClasses = {
    menuBg:
      theme === "dark"
        ? "bg-[#282a2d] border-zinc-700/80 text-zinc-100 divide-zinc-700/60 shadow-black/40"
        : "bg-white border-neutral-200 text-neutral-800 divide-neutral-200 shadow-neutral-300/40",
    itemHover: theme === "dark" ? "hover:bg-white/10" : "hover:bg-neutral-100",
    subBg:
      theme === "dark"
        ? "bg-[#282a2d] border-zinc-700/80 text-zinc-200 divide-zinc-700/50 shadow-black/40"
        : "bg-white border-neutral-200 text-neutral-800 divide-neutral-200 shadow-neutral-300/40",
    labelMuted: theme === "dark" ? "text-zinc-500" : "text-neutral-400",
    bannerBg:
      theme === "dark" ? "text-blue-400 hover:bg-white/5" : "text-blue-600 hover:bg-neutral-100/80",
    iconColor: theme === "dark" ? "text-zinc-400" : "text-neutral-500",
    zoomBg:
      theme === "dark" ? "bg-zinc-800 border-zinc-700/80" : "bg-neutral-100 border-neutral-200",
    zoomBtnHover:
      theme === "dark"
        ? "hover:bg-zinc-700 text-zinc-200"
        : "hover:bg-neutral-200 text-neutral-700",
    exitBtn:
      theme === "dark"
        ? "hover:bg-rose-950/60 hover:text-rose-400 text-rose-300"
        : "hover:bg-rose-50 hover:text-rose-600 text-rose-500",
  };

  const settingsThemeClasses = {
    sidebarBg: theme === "dark" ? "bg-[#2f3033] border-[#3c3e41]" : "bg-[#f1f3f4] border-[#e2e4e7]",
    contentBg: theme === "dark" ? "bg-[#202124] text-gray-200" : "bg-[#f8f9fa] text-gray-800",
    cardBg:
      theme === "dark" ? "bg-[#2f3033] border-[#3c3e41]" : "bg-white border-gray-200 shadow-sm",
    borderMuted: theme === "dark" ? "border-zinc-700/40" : "border-gray-200/80",
    textMuted: theme === "dark" ? "text-gray-400" : "text-gray-500",
    inputBg:
      theme === "dark"
        ? "bg-[#202124] border-[#404144] text-white focus:border-blue-500"
        : "bg-white border-gray-300 text-gray-800 focus:border-blue-500",
    divideColor: theme === "dark" ? "divide-zinc-700/40" : "divide-gray-200",
    toggleBg:
      theme === "dark" ? "bg-[#202124] border-zinc-700/25" : "bg-gray-200/40 border-gray-200/85",
    btnInactive:
      theme === "dark" ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-800",
  };

  useEffect(() => {
    if (
      activeTab.url &&
      activeTab.url !== "chrome://newtab" &&
      !activeTab.url.startsWith("chrome://") &&
      !activeTab.url.includes("google.com/search")
    ) {
      setHistoryList((prev) => {
        if (prev.length > 0 && prev[0].url === activeTab.url) return prev;
        return [
          {
            url: activeTab.url,
            title: activeTab.title,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
          ...prev,
        ];
      });
    }
  }, [activeTab.url, activeTab.title]);

  useEffect(() => {
    if (activeTab.url === "chrome://newtab") {
      setAddressInput("");
    } else {
      setAddressInput(activeTab.url);
    }
  }, [activeTab.url, activeTabId]);

  const navigateTabTo = (url) => {
    let targetUrl = url.trim();
    if (!targetUrl) return;

    if (!targetUrl.startsWith("chrome://")) {
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
          targetUrl = `https://www.google.com/search?q=${encodeURIComponent(targetUrl)}`;
        }
      }
    }

    setTabs((prevTabs) =>
      prevTabs.map((tab) => {
        if (tab.id === activeTabId) {
          const nextHistory = tab.history.slice(0, tab.historyIndex + 1);
          nextHistory.push(targetUrl);

          let newTitle;
          if (targetUrl === "chrome://newtab") {
            newTitle = "New Tab";
          } else if (targetUrl === "chrome://settings") {
            newTitle = "Settings";
          } else if (targetUrl === "chrome://history") {
            newTitle = "History";
          } else if (targetUrl === "chrome://bookmarks") {
            newTitle = "Bookmarks";
          } else if (targetUrl === "chrome://about") {
            newTitle = "About Chrome";
          } else if (targetUrl === "chrome://incognito") {
            newTitle = "New Incognito Tab";
          } else if (targetUrl === "chrome://extensions") {
            newTitle = "Extensions";
          } else if (targetUrl === "chrome://downloads") {
            newTitle = "Downloads";
          } else if (targetUrl === "chrome://devtools") {
            newTitle = "Developer Tools";
          } else if (targetUrl.includes("google.com/search")) {
            const qParam = new URL(targetUrl).searchParams.get("q");
            newTitle = qParam ? `${qParam} - Google` : "Google Search";
          } else {
            try {
              const hostname = new URL(targetUrl).hostname;
              newTitle = hostname.replace("www.", "");
            } catch {
              newTitle = targetUrl;
            }
          }

          return {
            ...tab,
            url: targetUrl,
            title: newTitle,
            history: nextHistory,
            historyIndex: nextHistory.length - 1,
          };
        }
        return tab;
      }),
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
            };
          }
          return tab;
        }),
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
            };
          }
          return tab;
        }),
      );
    }
  };

  const getTitleForUrl = (url) => {
    if (url === "chrome://newtab") return "New Tab";
    if (url === "chrome://settings") return "Settings";
    if (url === "chrome://history") return "History";
    if (url === "chrome://bookmarks") return "Bookmarks";
    if (url === "chrome://about") return "About Chrome";
    if (url === "chrome://incognito") return "New Incognito Tab";
    if (url === "chrome://extensions") return "Extensions";
    if (url === "chrome://downloads") return "Downloads";
    if (url === "chrome://devtools") return "Developer Tools";
    if (url.includes("google.com/search")) {
      try {
        const q = new URL(url).searchParams.get("q");
        return q ? `${q} - Google` : "Google Search";
      } catch {
        return "Google Search";
      }
    }
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return "Web Page";
    }
  };

  const handleNewTab = () => {
    const newId = `tab-${Date.now()}`;
    const newTabObj = {
      id: newId,
      title: "New Tab",
      url: "chrome://newtab",
      history: ["chrome://newtab"],
      historyIndex: 0,
    };
    setTabs((prev) => [...prev, newTabObj]);
    setActiveTabId(newId);
  };

  const handleCloseTab = (tabId, e) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    const closeIndex = tabs.findIndex((t) => t.id === tabId);
    const nextTabs = tabs.filter((t) => t.id !== tabId);
    setTabs(nextTabs);
    if (activeTabId === tabId) {
      const nextActiveIndex = Math.max(0, closeIndex - 1);
      setActiveTabId(nextTabs[nextActiveIndex].id);
    }
  };

  const isIframeable = (url) => {
    if (url.startsWith("chrome://")) return true;
    const urlLower = url.toLowerCase();
    try {
      const parsedUrl = new URL(url);
      const host = parsedUrl.hostname.toLowerCase();
      const currentHost = window.location.hostname.toLowerCase();
      if (host === "localhost" || host === "127.0.0.1" || host === currentHost) {
        return true;
      }
    } catch {
      /* ignore */
    }
    return IFRAME_COMPATIBLE_SITES.some((site) => urlLower.includes(site));
  };

  useEffect(() => {
    if (isLensScanning) {
      const timer = setTimeout(() => {
        setIsLensScanning(false);
        alert("Google Lens scan complete: No visual matches found.");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isLensScanning]);

  return {
    tabs,
    setTabs,
    activeTabId,
    setActiveTabId,
    addressInput,
    setAddressInput,
    googleSearchQuery,
    setGoogleSearchQuery,
    isMenuOpen,
    setIsMenuOpen,
    searchEngine,
    setSearchEngine,
    showBookmarks,
    setShowBookmarks,
    theme,
    setTheme,
    historyList,
    setHistoryList,
    bookmarks,
    setBookmarks,
    closeWindow,
    zoom,
    setZoom,
    activeSubMenu,
    setActiveSubMenu,
    isAdBlockerActive,
    setIsAdBlockerActive,
    isLensScanning,
    setIsLensScanning,
    isDefaultBrowser,
    setIsDefaultBrowser,
    username,
    setUsername,
    isFullScreen,
    setIsFullScreen,
    activeSettingsSection,
    setActiveSettingsSection,
    fontSize,
    setFontSize,
    findText,
    setFindText,
    showFindBar,
    setShowFindBar,
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
    profileColor,
    setProfileColor,
    isSyncActive,
    setIsSyncActive,
    activeTab,
    isBookmarked,
    isGitHubUrl,
    isLinkedInUrl,
    isTwitterUrl,
    isWikipediaUrl,
    toggleBookmark,
    highlightText,
    navigateTabTo,
    handleGoBack,
    handleGoForward,
    handleNewTab,
    handleCloseTab,
    isIframeable,
    themeClasses,
    menuThemeClasses,
    settingsThemeClasses,
  };
};

export default useChrome;
