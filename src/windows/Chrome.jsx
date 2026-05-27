import React, { useState, useEffect } from "react";
import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/windowWrapper";
import useWindowsStore from "#store/window";
import {
  RotateCw, Search, ChevronLeft, ChevronRight, Home,
  Lock, Star, X, Plus, Menu, User, Globe, AlertTriangle, ArrowRight,
  MoreVertical, Settings, History, Info, Trash2, Moon, Sun, Bookmark,
  Printer, LogOut, Maximize
} from "lucide-react";

// List of websites that are iframe-compatible and load perfectly
const IFRAME_COMPATIBLE_SITES = [
  "openstreetmap.org",
  "example.com",
  "example.org",
  "wttr.in"
];

const Chrome = () => {
  const [tabs, setTabs] = useState([
    {
      id: "tab-1",
      title: "New Tab",
      url: "chrome://newtab",
      history: ["chrome://newtab"],
      historyIndex: 0
    }
  ]);
  const [activeTabId, setActiveTabId] = useState("tab-1");
  const [addressInput, setAddressInput] = useState("");
  const [googleSearchQuery, setGoogleSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchEngine, setSearchEngine] = useState("Google");
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [theme, setTheme] = useState("light");
  const [historyList, setHistoryList] = useState([]);
  const [bookmarks, setBookmarks] = useState([
    { title: "Portfolio", url: window.location.origin },
    { title: "GitHub", url: "https://github.com/kuldeeprajput-dev" },
    { title: "LinkedIn", url: "https://www.linkedin.com/in/kuldeepdotcom/" },
    { title: "Twitter", url: "https://x.com/kuldeepdotcom" },
    { title: "Wikipedia", url: "https://en.wikipedia.org" },
    { title: "OpenStreetMap", url: "https://openstreetmap.org" }
  ]);

  const { closeWindow } = useWindowsStore();
  const [zoom, setZoom] = useState(100);
  const [activeSubMenu, setActiveSubMenu] = useState(null); // 'profile' | 'passwords' | 'history' | 'bookmarks' | 'tabgroups' | 'extensions' | 'tools' | 'help' | null
  const [isAdBlockerActive, setIsAdBlockerActive] = useState(false);
  const [isLensScanning, setIsLensScanning] = useState(false);
  const [isDefaultBrowser, setIsDefaultBrowser] = useState(false);
  const [username, setUsername] = useState("Kunal");
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Dynamic state sections
  const [activeSettingsSection, setActiveSettingsSection] = useState("appearance");
  const [fontSize, setFontSize] = useState("medium"); // "small" | "medium" | "large"
  const [findText, setFindText] = useState("");
  const [showFindBar, setShowFindBar] = useState(false);
  const [findMatchesCount, setFindMatchesCount] = useState(0);
  const [findMatchIndex, setFindMatchIndex] = useState(0);
  const [showCastDialog, setShowCastDialog] = useState(false);
  const [castDevice, setCastDevice] = useState(null); // 'Living Room TV' etc.
  const [isCastConnecting, setIsCastConnecting] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  // Dynamic state for downloads
  const [downloadsList, setDownloadsList] = useState([
    { name: "Kunal_Resume.pdf", size: "2.4 MB", progress: "Complete", type: "PDF", date: "Today" },
    { name: "Project_Portfolio_Source.zip", size: "14.8 MB", progress: "Complete", type: "ZIP", date: "Yesterday" }
  ]);

  // Passwords list
  const [passwordsList, setPasswordsList] = useState([
    { id: 1, site: "github.com", username: "kunal-github", password: "githubsecret123", show: false },
    { id: 2, site: "netflix.com", username: "kunal@gmail.com", password: "netfl1xPassword", show: false },
    { id: 3, site: "google.com", username: "kunal.dev", password: "mygooglepwd!", show: false }
  ]);
  const [newPassSite, setNewPassSite] = useState("");
  const [newPassUser, setNewPassUser] = useState("");
  const [newPassVal, setNewPassVal] = useState("");

  // Payment Cards
  const [cardsList, setCardsList] = useState([
    { id: 1, type: "Visa", number: "•••• •••• •••• 4242", holder: "Kunal", expiry: "12/28" },
    { id: 2, type: "Mastercard", number: "•••• •••• •••• 9876", holder: "Kunal", expiry: "08/29" }
  ]);
  const [newCardNum, setNewCardNum] = useState("");
  const [newCardExpiry, setNewCardExpiry] = useState("");

  // Addresses
  const [addressesList, setAddressesList] = useState([
    { id: 1, label: "Home", name: "Kunal", street: "123 macOS Lane", city: "Cupertino", state: "CA", zip: "95014" }
  ]);
  const [newAddressStreet, setNewAddressStreet] = useState("");
  const [newAddressCity, setNewAddressCity] = useState("");

  // Profile Color
  const [profileColor, setProfileColor] = useState("bg-orange-600");
  const [isSyncActive, setIsSyncActive] = useState(true);

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  const isBookmarked = bookmarks.some(b => b.url === activeTab.url);

  const isGitHubUrl = activeTab.url.toLowerCase().includes("github.com/kuldeeprajput-dev") || activeTab.url.toLowerCase().includes("github.com");
  const isLinkedInUrl = activeTab.url.toLowerCase().includes("linkedin.com/in/kuldeepdotcom") || activeTab.url.toLowerCase().includes("linkedin.com");
  const isTwitterUrl = activeTab.url.toLowerCase().includes("x.com/kuldeepdotcom") || activeTab.url.toLowerCase().includes("x.com") || activeTab.url.toLowerCase().includes("twitter.com");
  const isWikipediaUrl = activeTab.url.toLowerCase().includes("wikipedia.org");

  const toggleBookmark = () => {
    if (activeTab.url === "chrome://newtab" || activeTab.url.startsWith("chrome://")) return;
    if (isBookmarked) {
      setBookmarks(prev => prev.filter(b => b.url !== activeTab.url));
    } else {
      setBookmarks(prev => [...prev, { title: activeTab.title, url: activeTab.url }]);
    }
  };

  const highlightText = (text, query) => {
    if (!query || !text || typeof text !== "string") return text;
    const parts = text.split(new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, "gi"));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-amber-300 text-black rounded px-0.5">{part}</mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const getFindMatchesForUrl = (url, query) => {
    if (!query) return 0;
    let pageContent = "";
    if (url === "chrome://settings") {
      pageContent = "Appearance & Search Settings You and Google Profile Autofill and passwords Search Engine Privacy & security Theme Mode Toggle between Light and Dark default search engine password manager payment methods cards addresses font size show bookmarks bar clear browsing data";
    } else if (url === "chrome://history") {
      pageContent = `History Clear History ${historyList.map(h => h.title + " " + h.url).join(" ")}`;
    } else if (url === "chrome://bookmarks") {
      pageContent = `Bookmarks ${bookmarks.map(b => b.title + " " + b.url).join(" ")}`;
    } else if (url === "chrome://about") {
      pageContent = "Google Chrome Version 125.0.6422.112 Official Build 64-bit Up to date Antigravity MacOS portfolio interface copyright DeepMind";
    } else if (url === "chrome://incognito") {
      pageContent = "You've gone Incognito private browsing won't save cookies site data information entered search privately";
    } else if (url === "chrome://downloads") {
      pageContent = `Downloads ${downloadsList.map(d => d.name + " " + d.type).join(" ")}`;
    } else if (url === "chrome://extensions") {
      pageContent = "Extensions AdBlock Pro Blocks intrusive advertisements React Developer Tools debugger panels";
    } else {
      pageContent = "Google Search Results Wikipedia openstreetmap example page web browser";
    }
    const regex = new RegExp(query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), "gi");
    const matches = pageContent.match(regex);
    return matches ? matches.length : 0;
  };

  useEffect(() => {
    if (showFindBar) {
      const count = getFindMatchesForUrl(activeTab.url, findText);
      setFindMatchesCount(count);
      setFindMatchIndex(count > 0 ? 1 : 0);
    }
  }, [findText, activeTab.url, showFindBar, downloadsList, bookmarks, historyList]);

  const themeClasses = {
    container: theme === "dark" ? "bg-[#2f3033] border-[#2f3032] text-gray-200" : "bg-[#f2f2f2] border-black/10 text-gray-800",
    header: theme === "dark" ? "bg-[#202124] border-[#2f3032]" : "bg-[#dee1e6] border-[#c9cacc]",
    tabActive: theme === "dark" ? "bg-[#2f3033] text-gray-100 shadow-[0_-1px_3px_rgba(0,0,0,0.2)] z-10" : "bg-[#f2f2f2] text-gray-800 font-medium shadow-[0_-1px_3px_rgba(0,0,0,0.06)] z-10",
    tabInactive: theme === "dark" ? "text-gray-400 hover:bg-[#2b2c2f]" : "text-gray-600 hover:bg-[#e4e7eb]",
    navBg: theme === "dark" ? "bg-[#2f3033] border-[#202124]" : "bg-[#f2f2f2] border-[#d1d1d1]",
    bookmarksBg: theme === "dark" ? "bg-[#2f3033] border-[#202124]" : "bg-[#f2f2f2] border-[#dadce0]",
    bookmarksText: theme === "dark" ? "text-gray-300 hover:bg-white/5" : "text-gray-600 hover:bg-black/5",
    addressBg: theme === "dark" ? "bg-[#202124] border-[#404144] focus-within:border-blue-500 focus-within:ring-blue-500/20" : "bg-white border-[#dadce0] focus-within:border-blue-500 focus-within:ring-blue-500/20",
    addressInput: theme === "dark" ? "text-gray-200 placeholder-gray-500" : "text-gray-800 placeholder-gray-400",
    buttonText: theme === "dark" ? "text-gray-300 hover:bg-white/5" : "text-gray-700 hover:bg-black/5",
    buttonDisabled: theme === "dark" ? "text-gray-600 cursor-not-allowed" : "text-gray-300 cursor-not-allowed",
    tabCloseHover: theme === "dark" ? "hover:bg-white/15 text-gray-400" : "hover:bg-black/10 text-gray-500",
    tabGlobe: theme === "dark" ? "text-gray-400" : "text-gray-500",
  };

  const menuThemeClasses = {
    menuBg: theme === "dark" 
      ? "bg-[#282a2d] border-zinc-700/80 text-zinc-100 divide-zinc-700/60 shadow-black/40" 
      : "bg-white border-neutral-200 text-neutral-800 divide-neutral-200 shadow-neutral-300/40",
    itemHover: theme === "dark" ? "hover:bg-white/10" : "hover:bg-neutral-100",
    subBg: theme === "dark" 
      ? "bg-[#282a2d] border-zinc-700/80 text-zinc-200 divide-zinc-700/50 shadow-black/40" 
      : "bg-white border-neutral-200 text-neutral-800 divide-neutral-200 shadow-neutral-300/40",
    labelMuted: theme === "dark" ? "text-zinc-500" : "text-neutral-400",
    bannerBg: theme === "dark" ? "text-blue-400 hover:bg-white/5" : "text-blue-600 hover:bg-neutral-100/80",
    iconColor: theme === "dark" ? "text-zinc-400" : "text-neutral-500",
    zoomBg: theme === "dark" ? "bg-zinc-800 border-zinc-700/80" : "bg-neutral-100 border-neutral-200",
    zoomBtnHover: theme === "dark" ? "hover:bg-zinc-700 text-zinc-200" : "hover:bg-neutral-200 text-neutral-700",
    exitBtn: theme === "dark" 
      ? "hover:bg-rose-950/60 hover:text-rose-400 text-rose-300" 
      : "hover:bg-rose-50 hover:text-rose-600 text-rose-500",
  };

  const settingsThemeClasses = {
    sidebarBg: theme === "dark" ? "bg-[#2f3033] border-[#3c3e41]" : "bg-[#f1f3f4] border-[#e2e4e7]",
    contentBg: theme === "dark" ? "bg-[#202124] text-gray-200" : "bg-[#f8f9fa] text-gray-800",
    cardBg: theme === "dark" ? "bg-[#2f3033] border-[#3c3e41]" : "bg-white border-gray-200 shadow-sm",
    borderMuted: theme === "dark" ? "border-zinc-700/40" : "border-gray-200/80",
    textMuted: theme === "dark" ? "text-gray-400" : "text-gray-500",
    inputBg: theme === "dark" ? "bg-[#202124] border-[#404144] text-white focus:border-blue-500" : "bg-white border-gray-300 text-gray-800 focus:border-blue-500",
    divideColor: theme === "dark" ? "divide-zinc-700/40" : "divide-gray-200",
    toggleBg: theme === "dark" ? "bg-[#202124] border-zinc-700/25" : "bg-gray-200/40 border-gray-200/85",
    btnInactive: theme === "dark" ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-800",
  };

  // Add navigation logic to update global history list
  useEffect(() => {
    if (activeTab.url && activeTab.url !== "chrome://newtab" && !activeTab.url.startsWith("chrome://") && !activeTab.url.includes("google.com/search")) {
      setHistoryList(prev => {
        if (prev.length > 0 && prev[0].url === activeTab.url) return prev;
        return [{ 
          url: activeTab.url, 
          title: activeTab.title, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }, ...prev];
      });
    }
  }, [activeTab.url, activeTab.title]);

  // Keep address input in sync with the active tab's URL
  useEffect(() => {
    if (activeTab.url === "chrome://newtab") {
      setAddressInput("");
    } else {
      setAddressInput(activeTab.url);
    }
  }, [activeTab.url, activeTabId]);

  // Navigate function for tab history
  const navigateTabTo = (url) => {
    let targetUrl = url.trim();
    if (!targetUrl) return;

    // Auto prepend protocol if not a chrome internal page
    if (!targetUrl.startsWith("chrome://")) {
      if (!/^https?:\/\//i.test(targetUrl)) {
        const lowerUrl = targetUrl.toLowerCase();
        
        // Check if the destination is a local host/address or matches the current domain
        const isLocal = lowerUrl.startsWith("localhost") || 
                        lowerUrl.startsWith("127.0.0.1") || 
                        lowerUrl.startsWith(window.location.host.toLowerCase()) ||
                        lowerUrl.startsWith(window.location.hostname.toLowerCase());
        
        if (isLocal) {
          // Prepend http:// for localhost/127.0.0.1, or match window.location.protocol for current domain
          let protocol = "http://";
          if (lowerUrl.startsWith(window.location.host.toLowerCase()) || lowerUrl.startsWith(window.location.hostname.toLowerCase())) {
            protocol = window.location.protocol + "//";
          }
          targetUrl = protocol + targetUrl;
        } else if (targetUrl.includes(".") && !targetUrl.includes(" ")) {
          targetUrl = "https://" + targetUrl;
        } else {
          // Google search query
          targetUrl = `https://www.google.com/search?q=${encodeURIComponent(targetUrl)}`;
        }
      }
    }

    setTabs(prevTabs => prevTabs.map(tab => {
      if (tab.id === activeTabId) {
        const nextHistory = tab.history.slice(0, tab.historyIndex + 1);
        nextHistory.push(targetUrl);
        
        // Try to generate tab title based on URL
        let newTitle = "Web Page";
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
          } catch(e) {
            newTitle = targetUrl;
          }
        }

        return {
          ...tab,
          url: targetUrl,
          title: newTitle,
          history: nextHistory,
          historyIndex: nextHistory.length - 1
        };
      }
      return tab;
    }));
  };

  // Back/Forward controls
  const handleGoBack = () => {
    if (activeTab.historyIndex > 0) {
      setTabs(prevTabs => prevTabs.map(tab => {
        if (tab.id === activeTabId) {
          const nextIndex = tab.historyIndex - 1;
          const nextUrl = tab.history[nextIndex];
          return {
            ...tab,
            url: nextUrl,
            historyIndex: nextIndex,
            title: getTitleForUrl(nextUrl)
          };
        }
        return tab;
      }));
    }
  };

  const handleGoForward = () => {
    if (activeTab.historyIndex < activeTab.history.length - 1) {
      setTabs(prevTabs => prevTabs.map(tab => {
        if (tab.id === activeTabId) {
          const nextIndex = tab.historyIndex + 1;
          const nextUrl = tab.history[nextIndex];
          return {
            ...tab,
            url: nextUrl,
            historyIndex: nextIndex,
            title: getTitleForUrl(nextUrl)
          };
        }
        return tab;
      }));
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
      } catch (e) {
        return "Google Search";
      }
    }
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch(e) {
      return "Web Page";
    }
  };

  // Tab management
  const handleNewTab = () => {
    const newId = `tab-${Date.now()}`;
    const newTabObj = {
      id: newId,
      title: "New Tab",
      url: "chrome://newtab",
      history: ["chrome://newtab"],
      historyIndex: 0
    };
    setTabs(prev => [...prev, newTabObj]);
    setActiveTabId(newId);
  };

  const handleCloseTab = (tabId, e) => {
    e.stopPropagation();
    if (tabs.length === 1) return; // Keep at least one tab

    const closeIndex = tabs.findIndex(t => t.id === tabId);
    const nextTabs = tabs.filter(t => t.id !== tabId);
    setTabs(nextTabs);

    if (activeTabId === tabId) {
      const nextActiveIndex = Math.max(0, closeIndex - 1);
      setActiveTabId(nextTabs[nextActiveIndex].id);
    }
  };

  // Check if target URL can be rendered inside iframe
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
    } catch (e) {
      // ignore
    }
    
    return IFRAME_COMPATIBLE_SITES.some(site => urlLower.includes(site));
  };



  // Auto-dismiss Google Lens scanner after 4 seconds
  useEffect(() => {
    if (isLensScanning) {
      const timer = setTimeout(() => {
        setIsLensScanning(false);
        alert("Google Lens scan complete: No visual matches found.");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isLensScanning]);

  return (
    <div className={`flex flex-col h-full w-full rounded-xl overflow-hidden shadow-2xl border select-none text-xs font-sans ${themeClasses.container} ${isFullScreen ? "fixed inset-0 z-50 rounded-none border-none" : ""}`}>
      
      {/* ================= CHROME TAB BAR & WINDOW CONTROLS ================= */}
      <div id="window-header" className={`shrink-0 px-3 pt-2.5 pb-1 flex items-center justify-between z-20 border-b gap-4 select-none ${themeClasses.header}`}>
        
        {/* Left Window Control Buttons Spacer */}
        <div className="flex items-center gap-6 shrink-0">
          <WindowControls target="chrome" />
        </div>

        {/* Scrollable Tab Row */}
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
                  ${isActive 
                    ? (isIncognitoTab 
                        ? "bg-[#202124] text-zinc-100 shadow-[0_-1px_3px_rgba(0,0,0,0.3)] z-10" 
                        : themeClasses.tabActive)
                    : (isIncognitoTab 
                        ? "text-zinc-400 hover:bg-[#323336]" 
                        : themeClasses.tabInactive)
                  }
                `}
              >
                {isIncognitoTab ? (
                  <svg className="w-3.5 h-3.5 shrink-0 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
          {/* New Tab Button */}
          <button
            onClick={handleNewTab}
            className={`p-1 rounded-full mb-1 transition-colors flex items-center justify-center shrink-0 cursor-pointer ${theme === "dark" ? "hover:bg-white/10 text-gray-400" : "hover:bg-[#d0d3d7] text-gray-600"}`}
            aria-label="New tab"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* ================= NAVIGATION & ADDRESS BAR ================= */}
      <div className={`shrink-0 px-3 py-1.5 border-b flex items-center gap-3 ${themeClasses.navBg}`}>
        {/* Navigation Arrows */}
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

        {/* Address Input */}
        <div className={`flex-1 flex items-center focus-within:ring-2 rounded-full px-3 py-1 text-xs shadow-inner transition-all ${themeClasses.addressBg}`}>
          <Lock className="w-3 h-3 text-emerald-600 mr-2 shrink-0" />
          <input
            type="text"
            placeholder={activeTab.url === "chrome://incognito" ? "Search privately" : `Search ${searchEngine} or type a URL`}
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

        {/* Options */}
        <div className="flex items-center gap-1 shrink-0 relative">
          {castDevice && !isCastConnecting && (
            <button 
              onClick={() => setShowCastDialog(true)}
              className="p-1.5 rounded-full transition-colors flex items-center justify-center cursor-pointer text-blue-500 bg-blue-500/10 hover:bg-blue-500/20"
              title={`Casting to ${castDevice}`}
            >
              <svg className="w-4 h-4 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <path d="M2 18a2 2 0 0 1 2-2" />
                <path d="M2 14a6 6 0 0 1 6-6" />
                <path d="M12 20a10 10 0 0 0-10-10" />
              </svg>
            </button>
          )}
          <button className={`p-1.5 rounded-full transition-colors flex items-center justify-center cursor-pointer ${themeClasses.buttonText}`}>
            <User className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsMenuOpen(prev => !prev)}
            className={`p-1.5 rounded-full transition-colors flex items-center justify-center cursor-pointer ${themeClasses.buttonText} ${isMenuOpen ? "bg-black/10 dark:bg-white/10" : ""}`}
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {isMenuOpen && (
            <>
              {/* Invisible Overlay for click-outside closure */}
              <div 
                className="fixed inset-0 z-40 bg-transparent" 
                onClick={() => { setIsMenuOpen(false); setActiveSubMenu(null); }}
              />
              <div className={`absolute right-0 top-8 w-72 border rounded-xl shadow-2xl p-1.5 z-50 text-xs font-sans divide-y ${menuThemeClasses.menuBg} ${theme === "dark" ? "shadow-black/40" : "shadow-gray-300/45"}`}>
                
                {/* Banner */}
                <div className="pb-1.5">
                  <button 
                    onClick={() => { setIsDefaultBrowser(true); alert("Chrome is now your default browser!"); }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 font-semibold transition-all ${menuThemeClasses.bannerBg}`}
                  >
                    <Globe className="w-3.5 h-3.5 text-blue-500" />
                    <span>{isDefaultBrowser ? "Chrome is default browser" : "Set Chrome as default browser"}</span>
                  </button>
                </div>

                {/* Section 1 */}
                <div className="py-1">
                  <button 
                    onClick={() => { handleNewTab(); setIsMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left ${menuThemeClasses.itemHover}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Plus className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                      <span>New tab</span>
                    </div>
                    <span className={`text-[10px] font-medium ${menuThemeClasses.labelMuted}`}>Ctrl+T</span>
                  </button>
                  
                  <button 
                    onClick={() => { handleNewTab(); setIsMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left ${menuThemeClasses.itemHover}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Plus className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                      <span>New window</span>
                    </div>
                    <span className={`text-[10px] font-medium ${menuThemeClasses.labelMuted}`}>Ctrl+N</span>
                  </button>

                  <button 
                    onClick={() => {
                      const newId = `tab-${Date.now()}`;
                      setTabs(prev => [...prev, {
                        id: newId,
                        title: "Incognito",
                        url: "chrome://incognito",
                        history: ["chrome://incognito"],
                        historyIndex: 0
                      }]);
                      setActiveTabId(newId);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left ${menuThemeClasses.itemHover}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Lock className="w-3.5 h-3.5 text-amber-500" />
                      <span>New Incognito window</span>
                    </div>
                    <span className={`text-[10px] font-medium ${menuThemeClasses.labelMuted}`}>Ctrl+Shift+N</span>
                  </button>
                </div>

                {/* Section 2 */}
                <div className="py-1">
                  {/* Profile Row */}
                  <div 
                    className="relative"
                    onMouseEnter={() => setActiveSubMenu("profile")}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
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
                    {/* Profile Submenu */}
                    {activeSubMenu === "profile" && (
                      <div className={`absolute right-full top-0 mr-1 w-48 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}>
                        <div className={`px-3 py-1.5 border-b text-[10px] ${menuThemeClasses.labelMuted} ${theme === "dark" ? "border-zinc-700/50" : "border-gray-200/60"}`}>Manage user profile</div>
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
                            setIsSyncActive(prev => !prev);
                            alert(isSyncActive ? "Sync disabled!" : "Sync enabled!");
                            setActiveSubMenu(null);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}
                        >
                          Sync is {isSyncActive ? "active" : "inactive"}
                        </button>
                        <div className={`px-3 py-1 text-[9px] font-semibold ${menuThemeClasses.labelMuted}`}>Choose color:</div>
                        <div className="flex items-center gap-2 px-3 pb-1.5">
                          {["bg-orange-600", "bg-blue-600", "bg-emerald-600", "bg-purple-600"].map((c, i) => (
                            <button
                              key={i}
                              onClick={() => { setProfileColor(c); setActiveSubMenu(null); }}
                              className={`w-4 h-4 rounded-full ${c} border border-white hover:scale-110 transition-transform`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Passwords and Autofill */}
                  <div 
                    className="relative"
                    onMouseEnter={() => setActiveSubMenu("passwords")}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    <div className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}>
                      <div className="flex items-center gap-2.5">
                        <Lock className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                        <span>Passwords and autofill</span>
                      </div>
                      <span className={menuThemeClasses.labelMuted}>&gt;</span>
                    </div>
                    {/* Passwords Submenu */}
                    {activeSubMenu === "passwords" && (
                      <div className={`absolute right-full top-0 mr-1 w-52 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}>
                        <button onClick={() => { navigateTabTo("chrome://settings"); setActiveSettingsSection("autofill"); setIsMenuOpen(false); }} className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>Password Manager</button>
                        <button onClick={() => { navigateTabTo("chrome://settings"); setActiveSettingsSection("autofill"); setIsMenuOpen(false); }} className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>Payment methods</button>
                        <button onClick={() => { navigateTabTo("chrome://settings"); setActiveSettingsSection("autofill"); setIsMenuOpen(false); }} className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>Addresses and more</button>
                      </div>
                    )}
                  </div>

                  {/* History Row */}
                  <div 
                    className="relative"
                    onMouseEnter={() => setActiveSubMenu("history")}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    <div className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}>
                      <div className="flex items-center gap-2.5">
                        <History className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                        <span>History</span>
                      </div>
                      <span className={menuThemeClasses.labelMuted}>&gt;</span>
                    </div>
                    {/* History Submenu */}
                    {activeSubMenu === "history" && (
                      <div className={`absolute right-full top-0 mr-1 w-56 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}>
                        <button onClick={() => { navigateTabTo("chrome://history"); setIsMenuOpen(false); }} className={`w-full text-left px-3 py-1.5 rounded-md font-semibold text-blue-500 ${menuThemeClasses.itemHover}`}>Open History Center</button>
                        <div className={`h-px my-1 ${theme === "dark" ? "bg-zinc-700/50" : "bg-gray-200/60"}`} />
                        <div className={`px-3 py-1 text-[10px] ${menuThemeClasses.labelMuted}`}>Recent Tabs</div>
                        {historyList.slice(0, 3).map((item, idx) => (
                          <button 
                            key={idx}
                            onClick={() => { navigateTabTo(item.url); setIsMenuOpen(false); }}
                            className={`w-full text-left px-3 py-1 rounded-md truncate block ${menuThemeClasses.itemHover}`}
                          >
                            {item.title}
                          </button>
                        ))}
                        {historyList.length === 0 && <div className={`px-3 py-1 text-[10px] ${menuThemeClasses.labelMuted}`}>No recent tabs</div>}
                      </div>
                    )}
                  </div>

                  {/* Downloads Row */}
                  <button 
                    onClick={() => { navigateTabTo("chrome://downloads"); setIsMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left cursor-pointer ${menuThemeClasses.itemHover}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <History className={`w-3.5 h-3.5 transform rotate-180 ${menuThemeClasses.iconColor}`} />
                      <span>Downloads</span>
                    </div>
                    <span className={`text-[10px] font-medium ${menuThemeClasses.labelMuted}`}>Ctrl+J</span>
                  </button>

                  {/* Bookmarks Row */}
                  <div 
                    className="relative"
                    onMouseEnter={() => setActiveSubMenu("bookmarks")}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    <div className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}>
                      <div className="flex items-center gap-2.5">
                        <Star className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                        <span>Bookmarks and lists</span>
                      </div>
                      <span className={menuThemeClasses.labelMuted}>&gt;</span>
                    </div>
                    {/* Bookmarks Submenu */}
                    {activeSubMenu === "bookmarks" && (
                      <div className={`absolute right-full top-0 mr-1 w-56 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}>
                        <button onClick={() => { navigateTabTo("chrome://bookmarks"); setIsMenuOpen(false); }} className={`w-full text-left px-3 py-1.5 rounded-md font-semibold text-blue-500 ${menuThemeClasses.itemHover}`}>Open Bookmarks Manager</button>
                        <button onClick={() => { toggleBookmark(); setActiveSubMenu(null); setIsMenuOpen(false); }} className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>
                          {isBookmarked ? "Remove Bookmark" : "Bookmark this tab"}
                        </button>
                        <div className={`h-px my-1 ${theme === "dark" ? "bg-zinc-700/50" : "bg-gray-200/60"}`} />
                        <div className={`px-3 py-1 text-[10px] ${menuThemeClasses.labelMuted}`}>My Bookmarks</div>
                        {bookmarks.map((bookmark, idx) => (
                          <button 
                            key={idx}
                            onClick={() => { navigateTabTo(bookmark.url); setIsMenuOpen(false); }}
                            className={`w-full text-left px-3 py-1 rounded-md truncate block ${menuThemeClasses.itemHover}`}
                          >
                            {bookmark.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tab Groups Row */}
                  <div 
                    className="relative"
                    onMouseEnter={() => setActiveSubMenu("tabgroups")}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    <div className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}>
                      <div className="flex items-center gap-2.5">
                        <Bookmark className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                        <span>Tab groups</span>
                      </div>
                      <span className={menuThemeClasses.labelMuted}>&gt;</span>
                    </div>
                    {/* Tab Groups Submenu */}
                    {activeSubMenu === "tabgroups" && (
                      <div className={`absolute right-full top-0 mr-1 w-48 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}>
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
                        <button onClick={() => { alert("Active tab added to Work group!"); setActiveSubMenu(null); setIsMenuOpen(false); }} className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>Work Group</button>
                      </div>
                    )}
                  </div>

                  {/* Extensions Row */}
                  <div 
                    className="relative"
                    onMouseEnter={() => setActiveSubMenu("extensions")}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    <div className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}>
                      <div className="flex items-center gap-2.5">
                        <Bookmark className={`w-3.5 h-3.5 transform rotate-90 ${menuThemeClasses.iconColor}`} />
                        <span>Extensions</span>
                      </div>
                      <span className={menuThemeClasses.labelMuted}>&gt;</span>
                    </div>
                    {/* Extensions Submenu */}
                    {activeSubMenu === "extensions" && (
                      <div className={`absolute right-full top-0 mr-1 w-52 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}>
                        <button onClick={() => { navigateTabTo("chrome://extensions"); setIsMenuOpen(false); }} className={`w-full text-left px-3 py-1.5 rounded-md font-semibold text-blue-500 ${menuThemeClasses.itemHover}`}>Manage Extensions</button>
                        <div className={`h-px my-1 ${theme === "dark" ? "bg-zinc-700/50" : "bg-gray-200/60"}`} />
                        <div className="flex items-center justify-between px-3 py-1.5">
                          <span>AdBlocker Pro</span>
                          <button 
                            onClick={() => setIsAdBlockerActive(prev => !prev)}
                            className={`w-7 h-4.5 rounded-full p-0.5 transition-colors ${isAdBlockerActive ? "bg-blue-500" : "bg-zinc-600"}`}
                          >
                            <div className={`w-3.5 h-3.5 rounded-full bg-white transition-transform duration-150 transform ${isAdBlockerActive ? "translate-x-3.5" : "translate-x-0"}`} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Delete browsing data */}
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
                    <span className={`text-[10px] font-medium ${menuThemeClasses.labelMuted}`}>Ctrl+Shift+Del</span>
                  </button>
                </div>

                {/* Section 3: Zoom */}
                <div className="py-1.5 px-3 flex items-center justify-between">
                  <span className={menuThemeClasses.labelMuted}>Zoom</span>
                  <div className={`flex items-center gap-3 rounded-lg p-0.5 border ${menuThemeClasses.zoomBg}`}>
                    <button 
                      onClick={() => setZoom(prev => Math.max(50, prev - 10))}
                      className={`w-5 h-5 flex items-center justify-center rounded text-base font-bold cursor-pointer ${menuThemeClasses.zoomBtnHover}`}
                    >
                      -
                    </button>
                    <span className={`w-8 text-center text-[10px] font-bold ${theme === "dark" ? "text-zinc-200" : "text-gray-800"}`}>{zoom}%</span>
                    <button 
                      onClick={() => setZoom(prev => Math.min(200, prev + 10))}
                      className={`w-5 h-5 flex items-center justify-center rounded text-base font-bold cursor-pointer ${menuThemeClasses.zoomBtnHover}`}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => setIsFullScreen(prev => !prev)}
                    className={`p-1 rounded cursor-pointer ${menuThemeClasses.itemHover} ${isFullScreen ? "bg-blue-600/30 text-blue-400" : ""}`}
                  >
                    <Maximize className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Section 4 */}
                <div className="py-1">
                  <button 
                    onClick={() => { window.print(); setIsMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left cursor-pointer ${menuThemeClasses.itemHover}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Printer className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                      <span>Print...</span>
                    </div>
                    <span className={`text-[10px] font-medium ${menuThemeClasses.labelMuted}`}>Ctrl+P</span>
                  </button>

                  <button 
                    onClick={() => { setIsLensScanning(true); setIsMenuOpen(false); }}
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

                  {/* Find and edit Row */}
                  <div 
                    className="relative"
                    onMouseEnter={() => setActiveSubMenu("find_edit")}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    <div className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}>
                      <div className="flex items-center gap-2.5">
                        <Search className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                        <span>Find and edit</span>
                      </div>
                      <span className={menuThemeClasses.labelMuted}>&gt;</span>
                    </div>
                    {/* Find and edit Submenu */}
                    {activeSubMenu === "find_edit" && (
                      <div className={`absolute right-full top-0 mr-1 w-48 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}>
                        <button 
                          onClick={() => { setShowFindBar(true); setIsMenuOpen(false); }} 
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
                            } catch (e) {
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

                  {/* Cast, save, and share Row */}
                  <div 
                    className="relative"
                    onMouseEnter={() => setActiveSubMenu("cast_share")}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    <div className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}>
                      <div className="flex items-center gap-2.5">
                        <Printer className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                        <span>Cast, save, and share</span>
                      </div>
                      <span className={menuThemeClasses.labelMuted}>&gt;</span>
                    </div>
                    {/* Cast, save, and share Submenu */}
                    {activeSubMenu === "cast_share" && (
                      <div className={`absolute right-full top-0 mr-1 w-52 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}>
                        <button 
                          onClick={() => { setShowCastDialog(true); setIsCastConnecting(false); setCastDevice(null); setIsMenuOpen(false); }} 
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
                              date: "Today"
                            };
                            setDownloadsList(prev => [newDownload, ...prev]);
                            alert(`Saved Page: Added "${newDownload.name}" to Downloads list.`);
                            setIsMenuOpen(false);
                          }} 
                          className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}
                        >
                          Save page as...
                        </button>
                        <button 
                          onClick={() => { setShowQrCode(true); setIsMenuOpen(false); }} 
                          className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}
                        >
                          Create QR Code
                        </button>
                      </div>
                    )}
                  </div>

                  {/* More tools */}
                  <div 
                    className="relative"
                    onMouseEnter={() => setActiveSubMenu("tools")}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    <div className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}>
                      <div className="flex items-center gap-2.5">
                        <Settings className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                        <span>More tools</span>
                      </div>
                      <span className={menuThemeClasses.labelMuted}>&gt;</span>
                    </div>
                    {/* More tools Submenu */}
                    {activeSubMenu === "tools" && (
                      <div className={`absolute right-full top-0 mr-1 w-48 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}>
                        <button onClick={() => { navigateTabTo("chrome://devtools"); setIsMenuOpen(false); }} className={`w-full text-left px-3 py-1.5 rounded-md font-semibold text-blue-500 ${menuThemeClasses.itemHover}`}>Developer tools</button>
                        <button onClick={() => alert("Opening Task Manager...")} className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>Task Manager</button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 5 */}
                <div className="py-1">
                  {/* Help */}
                  <div 
                    className="relative"
                    onMouseEnter={() => setActiveSubMenu("help")}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    <div className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer ${menuThemeClasses.itemHover}`}>
                      <div className="flex items-center gap-2.5">
                        <Info className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                        <span>Help</span>
                      </div>
                      <span className={menuThemeClasses.labelMuted}>&gt;</span>
                    </div>
                    {/* Help Submenu */}
                    {activeSubMenu === "help" && (
                      <div className={`absolute right-full top-0 mr-1 w-48 border rounded-lg shadow-2xl p-1.5 z-50 text-xs ${menuThemeClasses.subBg}`}>
                        <button onClick={() => { navigateTabTo("chrome://about"); setIsMenuOpen(false); }} className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>About Google Chrome</button>
                        <button onClick={() => alert("Redirecting to Chrome Help Center...")} className={`w-full text-left px-3 py-1.5 rounded-md ${menuThemeClasses.itemHover}`}>Help Center</button>
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => { navigateTabTo("chrome://settings"); setIsMenuOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-left cursor-pointer ${menuThemeClasses.itemHover}`}
                  >
                    <Settings className={`w-3.5 h-3.5 ${menuThemeClasses.iconColor}`} />
                    <span>Settings</span>
                  </button>

                  <button 
                    onClick={() => { closeWindow("chrome"); setIsMenuOpen(false); }}
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

      {/* ================= BOOKMARKS BAR ================= */}
      {showBookmarks && (
        <div className={`shrink-0 px-4 py-1 border-b flex items-center gap-4 text-[10px] font-medium select-none ${themeClasses.bookmarksBg}`}>
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

      {/* ================= BROWSER BODY RENDER ================= */}
      <div className="flex-1 bg-white relative min-h-0 overflow-hidden">
        
        {/* Google Lens scan effect layer */}
        {isLensScanning && (
          <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center pointer-events-auto">
            <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 border-2 border-blue-500 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-blue-500" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-blue-500" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-blue-500" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-blue-500" />
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_10px_blue] absolute animate-pulse" style={{ animationDuration: '1.5s' }} />
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
          <div className={`absolute top-2 right-4 z-45 flex items-center gap-2 border px-3 py-1.5 rounded-lg shadow-xl text-xs ${
            theme === "dark" ? "bg-[#282a2d] border-zinc-700/80 text-zinc-100 shadow-black/40" : "bg-white border-gray-200 text-gray-800 shadow-neutral-300/40"
          }`}>
            <input 
              type="text" 
              placeholder="Find in page..." 
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
              autoFocus
              className="bg-transparent border-none outline-none focus:ring-0 text-xs w-36 text-gray-800 dark:text-zinc-100"
            />
            <span className={`text-[10px] select-none pr-1.5 border-r ${theme === "dark" ? "text-zinc-500 border-zinc-700" : "text-gray-500 border-gray-200"}`}>
              {findMatchesCount > 0 ? `${findMatchIndex} of ${findMatchesCount}` : "0 of 0"}
            </span>
            <button 
              onClick={() => setFindMatchIndex(prev => prev > 1 ? prev - 1 : findMatchesCount)}
              disabled={findMatchesCount === 0}
              className={`p-0.5 rounded leading-none ${theme === "dark" ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-gray-100 text-gray-600"}`}
            >
              ▲
            </button>
            <button 
              onClick={() => setFindMatchIndex(prev => prev < findMatchesCount ? prev + 1 : 1)}
              disabled={findMatchesCount === 0}
              className={`p-0.5 rounded leading-none ${theme === "dark" ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-gray-100 text-gray-600"}`}
            >
              ▼
            </button>
            <button 
              onClick={() => { setShowFindBar(false); setFindText(""); }}
              className={`p-0.5 rounded ${theme === "dark" ? "hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200" : "hover:bg-gray-100 text-gray-500 hover:text-gray-800"}`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Cast Dialog Overlay */}
        {showCastDialog && (
          <div className="absolute inset-0 bg-black/40 z-50 flex items-center justify-center p-6 pointer-events-auto">
            <div className={`w-80 rounded-xl border p-5 shadow-2xl space-y-4 ${
              theme === "dark" ? "bg-[#282a2d] border-zinc-700/80 text-zinc-100 shadow-black/45" : "bg-white border-gray-200 text-gray-800 shadow-neutral-300/40"
            }`}>
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
                      <p className="text-xs font-semibold font-sans">Connecting to {castDevice}...</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto">
                        <Globe className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-blue-500">Casting active</p>
                        <p className={`text-[10px] ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Streaming active tab viewport to {castDevice}</p>
                      </div>
                      <button 
                        onClick={() => { setCastDevice(null); setIsCastConnecting(false); }}
                        className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-bold transition-all shadow"
                      >
                        Stop Casting
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <p className={`text-[10px] ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Select Cast-enabled streaming device:</p>
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
                        theme === "dark" ? "hover:bg-white/5 bg-zinc-800/40 text-zinc-200" : "hover:bg-neutral-100 bg-neutral-50/50 text-gray-700 border border-neutral-200/40"
                      }`}
                    >
                      <span>{device}</span>
                      <span className="text-[9px] bg-blue-600/10 text-blue-500 px-1.5 py-0.5 rounded font-bold">Connect</span>
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
            <div className={`w-80 rounded-xl border p-5 shadow-2xl space-y-4 text-center ${
              theme === "dark" ? "bg-[#282a2d] border-zinc-700/80 text-zinc-100 shadow-black/45" : "bg-white border-gray-200 text-gray-800 shadow-neutral-300/40"
            }`}>
              <div className="flex items-center justify-between border-b pb-2.5 border-neutral-200 dark:border-zinc-700/30 text-left">
                <span className="font-bold text-sm">Create QR Code</span>
                <button onClick={() => setShowQrCode(false)}>
                  <X className="w-4 h-4 text-zinc-400 hover:text-zinc-200" />
                </button>
              </div>

              {/* Sleek SVG QR Code Mockup */}
              <div className="w-36 h-36 bg-white p-2.5 rounded-lg border border-gray-200 mx-auto shadow-inner flex items-center justify-center relative">
                <svg className="w-32 h-32 text-black" viewBox="0 0 29 29" shapeRendering="crispEdges">
                  <path fill="currentColor" d="M0 0h7v7H0zm22 0h7v7h-7zM0 22h7v7H0z"/>
                  <path fill="currentColor" d="M2 2h3v3H2zm22 2h3v3h-3zm-22 20h3v3H2z"/>
                  <path fill="currentColor" d="M9 1h1v1H9zm2 1h1v1h-1zm3 0h2v1h-2zm4 0h1v2h-1zm-9 3h2v1H9zm4 1h1v1h-1zm5 0h1v1h-1zm-9 3h1v1H9zm4 1h1v1h-1zm2 0h1v2h-1zm3 0h1v1h-1zm-5 3h1v1h-1zm4 1h2v1h-2zm-6 2h1v1h-1zm4 0h1v1h-1zm2 0h2v1h-2zm3 0h1v2h-1zm-9 3h1v1H9zm4 1h1v1h-1zm3 0h2v1h-2zm4 0h1v1h-1z"/>
                  <circle cx="14.5" cy="14.5" r="3.5" fill="white"/>
                  <circle cx="14.5" cy="14.5" r="2.5" fill="currentColor"/>
                </svg>
              </div>

              <div className="space-y-1">
                <p className={`text-[10px] ${theme === "dark" ? "text-gray-400" : "text-gray-500"} truncate max-w-[240px] mx-auto`}>{activeTab.url}</p>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => { alert("QR Code downloaded to device!"); setShowQrCode(false); }}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow"
                >
                  Download
                </button>
                <button 
                  onClick={() => setShowQrCode(false)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    theme === "dark" ? "border-zinc-700 text-zinc-300 hover:bg-zinc-800" : "border-gray-300 text-gray-600 hover:bg-gray-50"
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
            transformOrigin: 'top left', 
            width: `${100 / (zoom / 100)}%`, 
            height: `${100 / (zoom / 100)}%`,
            fontSize: fontSize === "small" ? "11px" : fontSize === "large" ? "15px" : "13px"
          }}
        >

          {/* VIEW 1: Chrome New Tab Start Page (Interactive search) */}
          {activeTab.url === "chrome://newtab" && (
            <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 select-none overflow-y-auto ${theme === "dark" ? "bg-[#202124] text-white" : "bg-[#f8f9fa] text-gray-800"}`}>
              <div className="w-full max-w-xl flex flex-col items-center gap-8 -mt-16">
                
                {/* Search Engine Wordmark Logo Mockup */}
                {searchEngine === "Google" && (
                  <div className="flex items-baseline font-bold text-6xl tracking-tight select-none">
                    <span className="text-blue-500">G</span>
                    <span className="text-red-500">o</span>
                    <span className="text-yellow-500">o</span>
                    <span className="text-blue-500">g</span>
                    <span className="text-green-500">l</span>
                    <span className="text-red-500">e</span>
                  </div>
                )}
                {searchEngine === "Bing" && (
                  <div className="flex items-center gap-2 font-bold text-6xl tracking-tight select-none text-teal-600 font-sans">
                    <span>bing</span>
                  </div>
                )}
                {searchEngine === "DuckDuckGo" && (
                  <div className="flex items-center gap-2 font-bold text-4xl tracking-tight select-none text-orange-500 font-sans">
                    <span>DuckDuckGo</span>
                  </div>
                )}

                {/* Start Page Search Input */}
                <div className={`w-full flex items-center border hover:border-transparent hover:shadow-md focus-within:shadow-md focus-within:border-transparent transition-all rounded-full px-4 py-3 text-sm max-w-lg ${
                  theme === "dark" 
                    ? "bg-[#35363a] border-[#404144] text-gray-200" 
                    : "bg-white border-[#dadce0] text-gray-700"
                }`}>
                  <Search className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
                  <input
                    type="text"
                    placeholder={`Search ${searchEngine} or type URL`}
                    value={googleSearchQuery}
                    onChange={(e) => setGoogleSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && googleSearchQuery.trim()) {
                        navigateTabTo(googleSearchQuery);
                        setGoogleSearchQuery("");
                      }
                    }}
                    className={`w-full bg-transparent border-none outline-none ${theme === "dark" ? "text-gray-100 placeholder-gray-500" : "text-gray-800 placeholder-gray-400"}`}
                  />
                </div>

                {/* Quick Shortcuts */}
                <div className="grid grid-cols-5 gap-6 max-w-lg w-full justify-center text-center mt-2">
                  {bookmarks.slice(0, 5).map((bookmark, idx) => {
                    const initial = bookmark.title ? bookmark.title.charAt(0).toUpperCase() : "G";
                    let initialColor = "text-blue-500";
                    let iconSrc = "";
                    if (bookmark.title === "Portfolio") {
                      initialColor = "text-indigo-600 font-extrabold";
                      iconSrc = "/images/profile.jpg";
                    } else if (bookmark.title === "Wikipedia") {
                      initialColor = "text-gray-700 dark:text-gray-300 font-extrabold";
                    } else if (bookmark.title === "OpenStreetMap") {
                      initialColor = "text-amber-500 font-extrabold";
                    } else if (bookmark.title === "GitHub") {
                      initialColor = "text-neutral-900 dark:text-neutral-100 font-extrabold";
                      iconSrc = "/images/github.png";
                    } else if (bookmark.title === "LinkedIn") {
                      initialColor = "text-sky-600 font-extrabold";
                      iconSrc = "/images/linkedin.png";
                    } else if (bookmark.title === "Twitter") {
                      initialColor = "text-blue-400 font-extrabold";
                      iconSrc = "/images/x.png";
                    }
                    
                    return (
                      <button 
                        key={idx}
                        onClick={() => navigateTabTo(bookmark.url)}
                        className="flex flex-col items-center gap-2 group cursor-pointer"
                      >
                        <div className={`w-11 h-11 rounded-full border flex items-center justify-center shadow-sm overflow-hidden transition-all group-hover:scale-105 ${
                          theme === "dark" 
                            ? "bg-[#35363a] border-[#404144] hover:bg-[#3d3e42]" 
                            : "bg-white border-gray-200 hover:bg-gray-100"
                        }`}>
                          {iconSrc ? (
                            <img 
                              src={iconSrc} 
                              alt={bookmark.title} 
                              className={bookmark.title === "Portfolio" ? "w-full h-full object-cover" : "w-6 h-6 object-contain"} 
                            />
                          ) : (
                            <span className={`text-sm ${initialColor}`}>{initial}</span>
                          )}
                        </div>
                        <span className={`text-[10px] font-semibold group-hover:underline truncate w-16 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{bookmark.title}</span>
                      </button>
                    );
                  })}
                </div>

              </div>
            </div>
          )}

          {/* VIEW 2: Search Results Mockup Page */}
          {activeTab.url.includes("google.com/search") && (
            <div className={`absolute inset-0 flex flex-col p-6 select-none overflow-y-auto ${theme === "dark" ? "bg-[#202124] text-white" : "bg-[#ffffff] text-gray-800"}`}>
              <div className="max-w-2xl w-full space-y-6">
                
                {/* Header Mini search logo & Search */}
                <div className={`flex items-center gap-4 border-b pb-4 ${theme === "dark" ? "border-gray-800" : "border-gray-150"}`}>
                  <span 
                    onClick={() => navigateTabTo("chrome://newtab")} 
                    className={`font-bold text-2xl tracking-tight cursor-pointer select-none ${
                      searchEngine === "Google" ? "text-blue-500" :
                      searchEngine === "Bing" ? "text-teal-600" :
                      "text-orange-500"
                    }`}
                  >
                    {searchEngine}
                  </span>
                  <div className={`flex-1 max-w-md border rounded-full px-4 py-1.5 text-xs flex items-center ${
                    theme === "dark" ? "bg-[#35363a] border-[#404144]" : "bg-white border-[#dadce0]"
                  }`}>
                    <span className="truncate flex-1">{new URL(activeTab.url).searchParams.get("q")}</span>
                    <Search className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                </div>

                {/* Search result items */}
                <div className="space-y-6 pt-2">
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500">https://wikipedia.org</span>
                    <h4 onClick={() => navigateTabTo("https://en.wikipedia.org")} className="text-base text-[#1a0dab] dark:text-blue-400 hover:underline cursor-pointer font-medium leading-tight">
                      Wikipedia - The Free Encyclopedia
                    </h4>
                    <p className={`text-xs leading-normal ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500">https://openstreetmap.org</span>
                    <h4 onClick={() => navigateTabTo("https://openstreetmap.org")} className="text-base text-[#1a0dab] dark:text-blue-400 hover:underline cursor-pointer font-medium leading-tight">
                      OpenStreetMap - Free Wiki World Map
                    </h4>
                    <p className={`text-xs leading-normal ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      OpenStreetMap is a map of the world, created by people like you and free to use under an open license.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500">https://example.com</span>
                    <h4 onClick={() => navigateTabTo("https://example.com")} className="text-base text-[#1a0dab] dark:text-blue-400 hover:underline cursor-pointer font-medium leading-tight">
                      Example Domain
                    </h4>
                    <p className={`text-xs leading-normal ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: Real IFrame Renderer (For iframe-friendly websites) */}
          {activeTab.url !== "chrome://newtab" && 
           !activeTab.url.includes("google.com/search") && 
           !activeTab.url.startsWith("chrome://") && 
           isIframeable(activeTab.url) && (
            <iframe
              src={
                activeTab.url.toLowerCase().includes("openstreetmap.org") 
                  ? "https://www.openstreetmap.org/export/embed.html" 
                  : activeTab.url
              }
              title={activeTab.title}
              className="w-full h-full border-none bg-white z-0 relative"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          )}

          {/* VIEW 4: Refused / Security Sandboxed Site Fallback Card */}
          {activeTab.url !== "chrome://newtab" && 
           !activeTab.url.includes("google.com/search") && 
           !activeTab.url.startsWith("chrome://") && 
           !isGitHubUrl &&
           !isLinkedInUrl &&
           !isTwitterUrl &&
           !isWikipediaUrl &&
           !isIframeable(activeTab.url) && (
            <div className="absolute inset-0 bg-slate-50 flex items-center justify-center p-6 overflow-y-auto">
              <div className="bg-white border border-slate-200/80 p-8 rounded-2xl shadow-lg max-w-md w-full text-center space-y-6">
                
                {/* Alert icon */}
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <AlertTriangle className="w-8 h-8" />
                </div>

                {/* Title & Warning Details */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-800">Connection Sandboxed</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    To protect your security, <span className="font-semibold text-gray-700">{activeTab.title}</span> prohibits rendering its contents inside other windows (<code className="bg-gray-150 px-1 py-0.5 rounded text-[10px]">X-Frame-Options</code>).
                  </p>
                </div>

                {/* URL card indicator */}
                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 flex items-center justify-center gap-2">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-600 truncate">{activeTab.url}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                  <a
                    href={activeTab.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
                  >
                    Open in New Tab <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => navigateTabTo("chrome://newtab")}
                    className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all"
                  >
                    Back to New Tab
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* VIEW 13: Mock GitHub Profile */}
          {isGitHubUrl && (
            <div className="absolute inset-0 bg-[#0d1117] text-[#c9d1d9] flex flex-col font-sans select-text overflow-y-auto z-0">
              {/* GitHub Header */}
              <div className="bg-[#161b22] px-6 py-3 border-b border-[#30363d] flex items-center justify-between shrink-0 select-none">
                <div className="flex items-center gap-3">
                  <img src="/images/github.png" alt="GitHub Logo" className="w-8 h-8 invert" />
                  <span className="font-bold text-white text-sm">GitHub</span>
                  <div className="bg-[#0d1117] border border-[#30363d] px-3 py-1 rounded-md text-[11px] w-64 text-[#8b949e]">
                    Search or jump to...
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#8b949e] font-semibold">
                  <span>Pull requests</span>
                  <span>Issues</span>
                  <span>Codespaces</span>
                  <span>Marketplace</span>
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-[#30363d]">
                    <img src="/images/profile.jpg" alt="User avatar" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* GitHub Body */}
              <div className="flex-1 flex p-8 gap-8 max-w-6xl mx-auto w-full min-h-0">
                {/* Left Column Profile Info */}
                <div className="w-64 shrink-0 space-y-4">
                  <div className="w-60 h-60 rounded-full overflow-hidden border-2 border-[#30363d] shadow-lg">
                    <img src="/images/profile.jpg" alt="Kuldeep Rajput avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white leading-tight">Kuldeep Rajput</h2>
                    <h3 className="text-[#8b949e] text-sm">kuldeeprajput-dev</h3>
                  </div>
                  <button className="w-full py-1.5 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] rounded-md font-semibold text-xs transition-colors">
                    Follow
                  </button>
                  <p className="text-xs text-[#c9d1d9] leading-relaxed">
                    Full Stack Developer | Building interactive macOS web portfolios, screens, and custom browser simulations.
                  </p>
                  <div className="text-xs text-[#8b949e] space-y-1.5 pt-2">
                    <div className="flex items-center gap-1.5">
                      <span>📍</span> Mumbai, India
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>🔗</span> <a href="https://github.com/kuldeeprajput-dev" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">github.com/kuldeeprajput-dev</a>
                    </div>
                  </div>
                </div>

                {/* Right Column Pinned Repos & Stats */}
                <div className="flex-1 space-y-6">
                  {/* Tab bar */}
                  <div className="flex gap-6 border-b border-[#30363d] pb-2 text-xs font-semibold text-[#8b949e] select-none">
                    <span className="text-white border-b-2 border-[#f78166] pb-2">Overview</span>
                    <span>Repositories <span className="bg-[#30363d] px-1.5 py-0.5 rounded-full text-[10px]">12</span></span>
                    <span>Projects</span>
                    <span>Packages</span>
                    <span>Stars</span>
                  </div>

                  {/* Pinned Section */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white">Pinned</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Pinned Card 1 */}
                      <div className="bg-[#161b22] border border-[#30363d] rounded-md p-4 space-y-3 flex flex-col justify-between hover:border-[#8b949e]/50 transition-colors">
                        <div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-blue-400 hover:underline cursor-pointer">MacOS-portfolio</span>
                            <span className="border border-[#30363d] px-1.5 py-0.5 rounded-full text-[9px] text-[#8b949e]">Public</span>
                          </div>
                          <p className="text-[11px] text-[#8b949e] mt-2 leading-relaxed">
                            Beautiful macos desktop portfolio simulator built with React, Vite and Tailwind. Includes interactive dock, weather, notes, safari, and settings apps.
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] text-[#8b949e]">
                          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#f1e05a]" /> JavaScript</span>
                          <span>⭐ 142</span>
                          <span>Fork 28</span>
                        </div>
                      </div>

                      {/* Pinned Card 2 */}
                      <div className="bg-[#161b22] border border-[#30363d] rounded-md p-4 space-y-3 flex flex-col justify-between hover:border-[#8b949e]/50 transition-colors">
                        <div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-blue-400 hover:underline cursor-pointer">insta-things-downloader</span>
                            <span className="border border-[#30363d] px-1.5 py-0.5 rounded-full text-[9px] text-[#8b949e]">Public</span>
                          </div>
                          <p className="text-[11px] text-[#8b949e] mt-2 leading-relaxed">
                            Clean media downloader application for Instagram posts, reels, and highlights. Stateful batch download pipeline.
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] text-[#8b949e]">
                          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#3178c6]" /> TypeScript</span>
                          <span>⭐ 89</span>
                          <span>Fork 12</span>
                        </div>
                      </div>

                      {/* Pinned Card 3 */}
                      <div className="bg-[#161b22] border border-[#30363d] rounded-md p-4 space-y-3 flex flex-col justify-between hover:border-[#8b949e]/50 transition-colors">
                        <div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-blue-400 hover:underline cursor-pointer">resume-ats-scanner</span>
                            <span className="border border-[#30363d] px-1.5 py-0.5 rounded-full text-[9px] text-[#8b949e]">Public</span>
                          </div>
                          <p className="text-[11px] text-[#8b949e] mt-2 leading-relaxed">
                            AI powered resume screening platform comparing job description keywords against resumes using NLP embeddings.
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] text-[#8b949e]">
                          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#3572A5]" /> Python</span>
                          <span>⭐ 64</span>
                        </div>
                      </div>

                      {/* Pinned Card 4 */}
                      <div className="bg-[#161b22] border border-[#30363d] rounded-md p-4 space-y-3 flex flex-col justify-between hover:border-[#8b949e]/50 transition-colors">
                        <div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-blue-400 hover:underline cursor-pointer">newtube</span>
                            <span className="border border-[#30363d] px-1.5 py-0.5 rounded-full text-[9px] text-[#8b949e]">Public</span>
                          </div>
                          <p className="text-[11px] text-[#8b949e] mt-2 leading-relaxed">
                            A modern, lightweight YouTube alternative client with ad-blocking and picture-in-picture streaming state support.
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] text-[#8b949e]">
                          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#f1e05a]" /> JavaScript</span>
                          <span>⭐ 52</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contributions grid */}
                  <div className="bg-[#161b22] border border-[#30363d] rounded-md p-4 space-y-3">
                    <h4 className="text-xs font-semibold text-white">1,245 contributions in the last year</h4>
                    <div className="flex flex-wrap gap-1 select-none">
                      {Array.from({ length: 140 }).map((_, idx) => {
                        let color = "bg-[#161b22] border border-[#30363d]";
                        if (idx % 7 === 0 || idx % 11 === 0) color = "bg-[#0e4429]";
                        else if (idx % 13 === 0) color = "bg-[#006d32]";
                        else if (idx % 19 === 0) color = "bg-[#26a641]";
                        else if (idx % 23 === 0) color = "bg-[#39d353]";
                        return <div key={idx} className={`w-2.5 h-2.5 rounded-sm ${color}`} />;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 14: Mock LinkedIn Profile */}
          {isLinkedInUrl && (
            <div className="absolute inset-0 bg-[#f3f2f0] text-gray-800 flex flex-col font-sans select-text overflow-y-auto z-0">
              {/* LinkedIn Header */}
              <div className="bg-white border-b border-gray-200 px-6 py-2 flex items-center justify-between shrink-0 select-none shadow-sm">
                <div className="flex items-center gap-3">
                  <img src="/images/linkedin.png" alt="LinkedIn Logo" className="w-8 h-8 object-contain" />
                  <div className="bg-[#edf3f8] border-none px-3 py-1.5 rounded-md text-[11px] w-64 text-gray-500 flex items-center gap-2">
                    <span>🔍</span> Search members, jobs...
                  </div>
                </div>
                <div className="flex items-center gap-6 text-[10px] text-gray-500 font-semibold">
                  <span className="flex flex-col items-center cursor-pointer">🏠 <span>Home</span></span>
                  <span className="flex flex-col items-center cursor-pointer">👥 <span>My Network</span></span>
                  <span className="flex flex-col items-center cursor-pointer">💼 <span>Jobs</span></span>
                  <span className="flex flex-col items-center cursor-pointer">💬 <span>Messaging</span></span>
                  <span className="flex flex-col items-center cursor-pointer">🔔 <span>Notifications</span></span>
                  <div className="flex flex-col items-center border-l pl-4 cursor-pointer">
                    <img src="/images/profile.jpg" alt="Me avatar" className="w-5 h-5 rounded-full object-cover" />
                    <span>Me ▼</span>
                  </div>
                </div>
              </div>

              {/* LinkedIn Body */}
              <div className="flex-1 max-w-4xl mx-auto w-full p-6 space-y-6">
                
                {/* Profile Card */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  {/* Banner */}
                  <div className="h-44 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 relative" />
                  {/* Avatar & Content */}
                  <div className="px-6 pb-6 relative">
                    <div className="w-36 h-36 rounded-full border-4 border-white overflow-hidden absolute -top-18 left-6 shadow-md">
                      <img src="/images/profile.jpg" alt="Kuldeep Rajput" className="w-full h-full object-cover" />
                    </div>
                    <div className="pt-20 space-y-3">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Kuldeep Rajput</h2>
                        <h3 className="text-sm text-gray-700 font-medium">Senior Software Engineer | Full-Stack Developer | Open Source Enthusiast</h3>
                        <p className="text-xs text-gray-500 mt-1">Mumbai, Maharashtra, India • <a href="https://www.linkedin.com/in/kuldeepdotcom/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">Contact info</a></p>
                      </div>

                      <div className="flex gap-2">
                        <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-xs shadow-sm transition-colors">
                          Open to
                        </button>
                        <button className="px-4 py-1.5 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full font-bold text-xs transition-colors">
                          Add profile section
                        </button>
                        <button className="px-3 py-1.5 border border-gray-400 text-gray-600 hover:bg-gray-50 rounded-full font-bold text-xs transition-colors">
                          More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-3">
                  <h3 className="text-base font-bold text-gray-900">About</h3>
                  <p className="text-xs leading-relaxed text-gray-700">
                    Passionate Full-Stack Developer with 4+ years of professional experience designing, building, and launching high-performance interactive web interfaces. Specialized in React, JavaScript, Node.js, Bun, Vite, and macOS-style glassmorphic desktop simulations. Pushing the boundaries of browser application modeling.
                  </p>
                </div>

                {/* Experience Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
                  <h3 className="text-base font-bold text-gray-900">Experience</h3>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-blue-600/10 rounded flex items-center justify-center shrink-0 font-bold text-blue-600">Dev</div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">Senior Full-Stack Developer</h4>
                        <p className="text-[11px] text-gray-700">Self-Employed / Open Source Projects</p>
                        <p className="text-[10px] text-gray-500">2022 - Present • 4 yrs</p>
                        <p className="text-xs text-gray-600 mt-2">Leading the development of rich interactive web experiences, micro-frontend structures, and responsive macOS-style container systems.</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-150 my-3" />

                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-indigo-600/10 rounded flex items-center justify-center shrink-0 font-bold text-indigo-600">Soft</div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">Software Engineer</h4>
                        <p className="text-[11px] text-gray-700">Tech Corporation</p>
                        <p className="text-[10px] text-gray-500">2020 - 2022 • 2 yrs</p>
                        <p className="text-xs text-gray-600 mt-2">Built stateful React components, integrated RESTful APIs, optimized asset delivery pipes, and reduced app bundle sizes by 32% using dynamic import bundles.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* VIEW 15: Mock Twitter/X Profile */}
          {isTwitterUrl && (
            <div className="absolute inset-0 bg-black text-white flex font-sans select-text overflow-hidden z-0">
              {/* Left Bar (Mock Navigation Icons) */}
              <div className="w-20 border-r border-zinc-800 flex flex-col items-center py-4 justify-between shrink-0 select-none">
                <div className="space-y-6 flex flex-col items-center">
                  <img src="/images/x.png" alt="X logo" className="w-6 h-6 invert" />
                  <span className="text-lg cursor-pointer">🏠</span>
                  <span className="text-lg cursor-pointer">🔍</span>
                  <span className="text-lg cursor-pointer">🔔</span>
                  <span className="text-lg cursor-pointer">✉️</span>
                  <span className="text-lg cursor-pointer">👤</span>
                </div>
                <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-800">
                  <img src="/images/profile.jpg" alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Central Feed */}
              <div className="flex-1 flex flex-col border-r border-zinc-800 overflow-y-auto min-w-0">
                {/* Twitter Header */}
                <div className="px-6 py-2 border-b border-zinc-800 bg-black/80 backdrop-blur sticky top-0 z-10 flex items-center gap-4">
                  <span className="text-base cursor-pointer">←</span>
                  <div>
                    <h2 className="text-sm font-extrabold text-white">Kuldeep Rajput</h2>
                    <p className="text-[10px] text-zinc-500">3 Posts</p>
                  </div>
                </div>

                {/* Banner & Bio */}
                <div className="h-32 bg-zinc-900 flex-shrink-0" />
                <div className="px-6 pb-4 relative flex flex-col">
                  {/* Circular Avatar */}
                  <div className="w-24 h-24 rounded-full border-4 border-black overflow-hidden absolute -top-12 left-6">
                    <img src="/images/profile.jpg" alt="Kuldeep Rajput" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex justify-end pt-3">
                    <button className="px-4 py-1 border border-zinc-700 hover:bg-zinc-900 rounded-full font-bold text-xs transition-colors">
                      Edit profile
                    </button>
                  </div>

                  <div className="mt-4 space-y-1">
                    <h3 className="text-base font-extrabold text-white leading-tight">Kuldeep Rajput</h3>
                    <p className="text-xs text-zinc-500">@kuldeepdotcom</p>
                  </div>

                  <p className="text-xs mt-3 leading-relaxed">
                    Full Stack Developer | Building interactive macOS portfolios. Pushing the boundaries of web UI engineering! 💻🚀 #buildinpublic
                  </p>

                  <div className="flex gap-4 text-[11px] text-zinc-500 mt-3">
                    <span>📅 Joined August 2019</span>
                    <span>🔗 <a href="https://x.com/kuldeepdotcom" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">x.com/kuldeepdotcom</a></span>
                  </div>

                  <div className="flex gap-4 text-xs font-bold text-zinc-400 mt-3.5">
                    <span>324 <span className="text-zinc-500 font-normal">Following</span></span>
                    <span>1.8K <span className="text-zinc-500 font-normal">Followers</span></span>
                  </div>
                </div>

                {/* Feed Tab row */}
                <div className="flex border-b border-zinc-800 text-xs font-bold text-zinc-500 text-center select-none shrink-0">
                  <div className="flex-1 py-3 text-white border-b-2 border-sky-500 font-extrabold">Posts</div>
                  <div className="flex-1 py-3 font-semibold">Replies</div>
                  <div className="flex-1 py-3 font-semibold">Highlights</div>
                  <div className="flex-1 py-3 font-semibold">Media</div>
                  <div className="flex-1 py-3 font-semibold">Likes</div>
                </div>

                {/* Tweets list */}
                <div className="divide-y divide-zinc-800">
                  {/* Tweet 1 */}
                  <div className="p-4 flex gap-3 hover:bg-zinc-900/35 transition-colors">
                    <img src="/images/profile.jpg" alt="Avatar" className="w-9 h-9 rounded-full object-cover shrink-0" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="font-bold text-white">Kuldeep Rajput</span>
                        <span className="text-zinc-500">@kuldeepdotcom • 2h</span>
                      </div>
                      <p className="text-xs leading-relaxed text-zinc-200">
                        Just finished building the Light Theme synchronization for my macOS portfolio! The browser settings and dropdowns now transition perfectly based on Chrome's state. 🚀✨ #buildinpublic #webdev #reactjs
                      </p>
                      <div className="flex justify-between text-[10px] text-zinc-500 pt-2.5 max-w-sm">
                        <span>💬 4</span>
                        <span>🔁 5</span>
                        <span className="text-rose-500 font-bold">❤️ 42</span>
                        <span>📊 1.2K</span>
                      </div>
                    </div>
                  </div>

                  {/* Tweet 2 */}
                  <div className="p-4 flex gap-3 hover:bg-zinc-900/35 transition-colors">
                    <img src="/images/profile.jpg" alt="Avatar" className="w-9 h-9 rounded-full object-cover shrink-0" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="font-bold text-white">Kuldeep Rajput</span>
                        <span className="text-zinc-500">@kuldeepdotcom • May 25</span>
                      </div>
                      <p className="text-xs leading-relaxed text-zinc-200">
                        Recursive rendering inside a mock browser in a portfolio? Yes, please. Type your local address in the Chrome app and see it stack! 💻🖥️ #reactjs #vite
                      </p>
                      <div className="flex justify-between text-[10px] text-zinc-500 pt-2.5 max-w-sm">
                        <span>💬 9</span>
                        <span>🔁 12</span>
                        <span className="text-rose-500 font-bold">❤️ 78</span>
                        <span>📊 2.4K</span>
                      </div>
                    </div>
                  </div>

                  {/* Tweet 3 */}
                  <div className="p-4 flex gap-3 hover:bg-zinc-900/35 transition-colors">
                    <img src="/images/profile.jpg" alt="Avatar" className="w-9 h-9 rounded-full object-cover shrink-0" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="font-bold text-white">Kuldeep Rajput</span>
                        <span className="text-zinc-500">@kuldeepdotcom • Jan 12</span>
                      </div>
                      <p className="text-xs leading-relaxed text-zinc-200">
                        Hello World! Welcome to my macOS portfolio desktop simulation. Built using React, TailwindCSS, and Lucide Icons. Feel free to explore the apps!
                      </p>
                      <div className="flex justify-between text-[10px] text-zinc-500 pt-2.5 max-w-sm">
                        <span>💬 12</span>
                        <span>🔁 18</span>
                        <span className="text-rose-500 font-bold">❤️ 104</span>
                        <span>📊 3.8K</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 16: Mock Wikipedia Article */}
          {isWikipediaUrl && (
            <div className="absolute inset-0 bg-white text-gray-900 flex flex-col font-sans select-text overflow-y-auto z-0" style={{ fontFamily: "'Linux Libertine', 'Georgia', serif" }}>
              {/* Wikipedia Header */}
              <div className="bg-white border-b border-gray-300 px-4 py-2 flex items-center justify-between shrink-0 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-600">W</div>
                    <span className="font-bold text-lg text-gray-900" style={{ fontFamily: "'Linux Libertine', Georgia, serif" }}>Wikipedia</span>
                  </div>
                  <span className="text-xs text-gray-400">The Free Encyclopedia</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 border border-gray-300 px-3 py-1 rounded text-[11px] w-52 text-gray-500 flex items-center gap-1.5">
                    <Search className="w-3 h-3 text-gray-400" />
                    Search Wikipedia
                  </div>
                  <span className="text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline">Log in</span>
                </div>
              </div>

              {/* Wikipedia Nav tabs */}
              <div className="bg-[#f8f9fa] border-b border-gray-300 px-6 flex items-center gap-0 text-[12px] shrink-0">
                {["Article", "Talk", "Read", "View source", "View history"].map((tab, i) => (
                  <span key={i} className={`px-3 py-2 cursor-pointer border-b-2 ${
                    tab === "Article" ? "border-blue-600 text-blue-600 bg-white -mb-px" : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}>{tab}</span>
                ))}
              </div>

              {/* Body */}
              <div className="flex flex-1 gap-0 min-h-0">
                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-8 max-w-4xl">
                  {/* Article Title */}
                  <h1 className="text-3xl font-normal border-b border-gray-300 pb-3 mb-4" style={{ fontFamily: "'Linux Libertine', Georgia, serif" }}>React (JavaScript library)</h1>
                  <div className="text-[11px] text-gray-500 mb-5">From Wikipedia, the free encyclopedia</div>

                  {/* Infobox */}
                  <div className="float-right ml-6 mb-4 w-64 border border-gray-400 text-[12px] bg-[#f8f9fa]">
                    <div className="bg-[#cee0f2] text-center px-3 py-1.5 font-bold text-[13px] border-b border-gray-400">React</div>
                    <div className="flex items-center justify-center py-3 bg-white border-b border-gray-300">
                      <div className="w-16 h-16 rounded-full bg-[#61dafb]/20 border-2 border-[#61dafb] flex items-center justify-center">
                        <span className="text-3xl font-bold text-[#61dafb]">⚛</span>
                      </div>
                    </div>
                    <table className="w-full">
                      {[
                        ["Developer", "Meta Platforms"],
                        ["Initial release", "May 29, 2013"],
                        ["Stable release", "19.1.0 (April 2025)"],
                        ["Written in", "JavaScript"],
                        ["Type", "JavaScript library"],
                        ["License", "MIT License"],
                        ["Website", "react.dev"]
                      ].map(([k, v], i) => (
                        <tr key={i} className="border-t border-gray-300">
                          <td className="px-2 py-1 font-bold text-right text-[11px] align-top w-24 text-gray-700">{k}</td>
                          <td className="px-2 py-1 text-[11px] text-blue-600 hover:underline cursor-pointer">{v}</td>
                        </tr>
                      ))}
                    </table>
                  </div>

                  {/* Lead paragraph */}
                  <p className="text-[13.5px] leading-relaxed mb-4">
                    <b>React</b> (also known as <b>React.js</b> or <b>ReactJS</b>) is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by <span className="text-blue-600 hover:underline cursor-pointer">Meta</span> (formerly Facebook) and a community of individual developers and companies.
                  </p>
                  <p className="text-[13.5px] leading-relaxed mb-4">
                    React can be used to develop single-page, mobile, or server-rendered applications with frameworks like <span className="text-blue-600 hover:underline cursor-pointer">Next.js</span>. Because React is only concerned with the user interface and rendering components to the DOM, React applications often rely on libraries for routing and other client-side functionality.
                  </p>

                  {/* Table of Contents */}
                  <div className="border border-gray-400 bg-[#f8f9fa] inline-block p-3 mb-5 text-[12px] min-w-[200px]">
                    <div className="font-bold mb-2 text-center">Contents</div>
                    {[
                      ["1", "History"],
                      ["2", "Basic usage"],
                      ["3", "Notable features"],
                      ["3.1", "Components"],
                      ["3.2", "Virtual DOM"],
                      ["3.3", "JSX"],
                      ["4", "React Hooks"],
                      ["5", "Server-side rendering"],
                      ["6", "See also"]
                    ].map(([num, title], i) => (
                      <div key={i} className={`flex gap-2 py-0.5 ${num.includes(".") ? "pl-4" : ""}`}>
                        <span className="text-gray-500">{num}</span>
                        <span className="text-blue-600 hover:underline cursor-pointer">{title}</span>
                      </div>
                    ))}
                  </div>

                  {/* Section: History */}
                  <h2 className="text-xl font-normal border-b border-gray-300 pb-1 mb-3" style={{ fontFamily: "'Linux Libertine', Georgia, serif" }}>History</h2>
                  <p className="text-[13.5px] leading-relaxed mb-4">
                    React was created by <span className="text-blue-600 hover:underline cursor-pointer">Jordan Walke</span>, a software engineer at Facebook. It was first deployed on Facebook's News Feed in 2011 and later on Instagram in 2012. It was open-sourced at JSConf US in May 2013. React Native, which enables native Android, iOS, and UWP development with React, was announced at Facebook's React Conf in February 2015 and open-sourced in March 2015.
                  </p>

                  {/* Section: Basic usage */}
                  <h2 className="text-xl font-normal border-b border-gray-300 pb-1 mb-3" style={{ fontFamily: "'Linux Libertine', Georgia, serif" }}>Basic usage</h2>
                  <p className="text-[13.5px] leading-relaxed mb-3">
                    The following is a rudimentary example of using React for the web, written in JSX and JavaScript:
                  </p>
                  <div className="bg-[#f8f9fa] border border-gray-300 rounded p-4 font-mono text-[11px] text-gray-800 mb-5 whitespace-pre leading-relaxed overflow-x-auto">{`import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return <h1>Hello, World!</h1>;
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);`}</div>

                  {/* Section: Notable features */}
                  <h2 className="text-xl font-normal border-b border-gray-300 pb-1 mb-3" style={{ fontFamily: "'Linux Libertine', Georgia, serif" }}>Notable features</h2>

                  <h3 className="text-[15px] font-bold mb-2">Components</h3>
                  <p className="text-[13.5px] leading-relaxed mb-4">
                    React code is made of entities called <i>components</i>. These components are reusable and must be formed in the SFC (Single File Component) structure. React components can be defined as class-based components or as functional components. The introduction of React Hooks with React 16.8 in 2019 allowed state and lifecycle management in functional components.
                  </p>

                  <h3 className="text-[15px] font-bold mb-2">Virtual DOM</h3>
                  <p className="text-[13.5px] leading-relaxed mb-4">
                    Another notable feature is the use of a <span className="text-blue-600 hover:underline cursor-pointer">virtual Document Object Model</span>, or virtual DOM. React creates an in-memory data-structure cache, computes the resulting differences, and then updates the browser's displayed DOM efficiently. This allows the programmer to write code as if the entire page is rendered on each change, while React only renders the components that actually changed.
                  </p>

                  <h3 className="text-[15px] font-bold mb-2">JSX</h3>
                  <p className="text-[13.5px] leading-relaxed mb-4">
                    JSX is an extension to the JavaScript language syntax. Similar in appearance to HTML, JSX provides a way to structure component rendering using syntax familiar to many developers. React components are typically written using JSX, although they do not have to be (components may also be written in pure JavaScript).
                  </p>

                  {/* Section: React Hooks */}
                  <h2 className="text-xl font-normal border-b border-gray-300 pb-1 mb-3" style={{ fontFamily: "'Linux Libertine', Georgia, serif" }}>React Hooks</h2>
                  <p className="text-[13.5px] leading-relaxed mb-4">
                    Hooks are functions that let developers "hook into" React state and lifecycle features from function components. They were first available in React 16.8. The most common hooks are <code className="bg-gray-100 px-1 rounded">useState</code>, <code className="bg-gray-100 px-1 rounded">useEffect</code>, <code className="bg-gray-100 px-1 rounded">useContext</code>, <code className="bg-gray-100 px-1 rounded">useRef</code>, and <code className="bg-gray-100 px-1 rounded">useMemo</code>.
                  </p>

                  {/* See Also */}
                  <h2 className="text-xl font-normal border-b border-gray-300 pb-1 mb-3" style={{ fontFamily: "'Linux Libertine', Georgia, serif" }}>See also</h2>
                  <ul className="list-disc pl-5 space-y-1 text-[13px] mb-8">
                    {["Vue.js", "Angular (web framework)", "Svelte", "Next.js", "Vite", "TypeScript", "Node.js", "JavaScript"].map((item) => (
                      <li key={item} className="text-blue-600 hover:underline cursor-pointer">{item}</li>
                    ))}
                  </ul>

                  <div className="text-[11px] text-gray-500 border-t border-gray-300 pt-4">
                    This page was last edited on 27 May 2025. Text is available under the <span className="text-blue-600 hover:underline cursor-pointer">Creative Commons Attribution-ShareAlike License 4.0</span>; additional terms may apply.
                  </div>
                </div>

                {/* Right Sidebar - Wikipedia Nav */}
                <div className="w-48 shrink-0 border-l border-gray-200 bg-[#f8f9fa] p-4 text-[11px] overflow-y-auto hidden lg:block">
                  <div className="font-bold mb-2 text-gray-700">Navigation</div>
                  {["Main page", "Contents", "Current events", "Random article", "About Wikipedia", "Contact us", "Donate"].map((item) => (
                    <div key={item} className="py-0.5 text-blue-600 hover:underline cursor-pointer">{item}</div>
                  ))}
                  <div className="font-bold mb-2 mt-4 text-gray-700">Contribute</div>
                  {["Help", "Learn to edit", "Community portal", "Recent changes", "Upload file"].map((item) => (
                    <div key={item} className="py-0.5 text-blue-600 hover:underline cursor-pointer">{item}</div>
                  ))}
                  <div className="font-bold mb-2 mt-4 text-gray-700">Tools</div>
                  {["What links here", "Related changes", "Special pages", "Permanent link", "Page information", "Cite this page", "Get shortened URL"].map((item) => (
                    <div key={item} className="py-0.5 text-blue-600 hover:underline cursor-pointer">{item}</div>
                  ))}
                  <div className="font-bold mb-2 mt-4 text-gray-700">Languages</div>
                  {["Deutsch", "Español", "Français", "हिन्दी", "日本語", "Русский", "中文"].map((item) => (
                    <div key={item} className="py-0.5 text-blue-600 hover:underline cursor-pointer">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 5: Settings Page */}
          {activeTab.url === "chrome://settings" && (
            <div className={`absolute inset-0 flex select-none overflow-hidden ${settingsThemeClasses.contentBg}`}>
              {/* Sidebar */}
              <div className={`w-52 border-r shrink-0 py-6 px-4 flex flex-col gap-1.5 ${settingsThemeClasses.sidebarBg}`}>
                <div className={`flex items-center gap-2 px-2 pb-4 border-b ${settingsThemeClasses.borderMuted} mb-3`}>
                  <Settings className="w-5 h-5 text-blue-500" />
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
                  <Settings className="w-4 h-4" /> Appearance
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
                <button onClick={() => navigateTabTo("chrome://bookmarks")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
                  <Star className="w-4 h-4" /> Bookmarks
                </button>
                <button onClick={() => navigateTabTo("chrome://history")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
                  <History className="w-4 h-4" /> History
                </button>
                <button onClick={() => navigateTabTo("chrome://downloads")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
                  <History className="w-4 h-4 transform rotate-180" /> Downloads
                </button>
                <button onClick={() => navigateTabTo("chrome://about")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
                  <Info className="w-4 h-4" /> About Chrome
                </button>
              </div>

              {/* Main Content */}
              <div className="flex-1 overflow-y-auto p-8 max-w-3xl space-y-8">
                
                {/* SECTION 1: Profile Customizer */}
                {activeSettingsSection === "profile" && (
                  <div className="space-y-6">
                    <h2 className={`text-xl font-bold border-b ${settingsThemeClasses.borderMuted} pb-4`}>You and Google (Profile)</h2>
                    
                    <div className={`p-5 rounded-xl border space-y-4 ${settingsThemeClasses.cardBg}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 ${profileColor} text-white rounded-full flex items-center justify-center text-xl font-bold shadow-md`}>
                          K
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold">{username}</h4>
                          <p className={`text-[10px] ${settingsThemeClasses.textMuted}`}>kunal@gmail.com • Primary Profile</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            const newName = prompt("Enter profile name:", username);
                            if (newName) setUsername(newName);
                          }}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold transition-all shadow-sm"
                        >
                          Customize profile name
                        </button>
                      </div>
                    </div>

                    <div className={`flex items-center justify-between p-4 rounded-xl border ${settingsThemeClasses.cardBg}`}>
                      <div>
                        <h4 className="text-xs font-bold">Google account sync</h4>
                        <p className={`text-[10px] ${settingsThemeClasses.textMuted}`}>Sync passwords, bookmarks, history across device sessions</p>
                      </div>
                      <button 
                        onClick={() => setIsSyncActive(prev => !prev)}
                        className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${isSyncActive ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 transform ${isSyncActive ? "translate-x-4.5" : "translate-x-0"}`} />
                      </button>
                    </div>

                    <div className={`p-4 rounded-xl border space-y-3.5 ${settingsThemeClasses.cardBg}`}>
                      <div>
                        <h4 className="text-xs font-bold">Pick your profile avatar theme color</h4>
                        <p className={`text-[10px] ${settingsThemeClasses.textMuted}`}>Personalize this window header badge color</p>
                      </div>
                      <div className="flex items-center gap-2.5">
                        {["bg-orange-600", "bg-blue-600", "bg-emerald-600", "bg-purple-600", "bg-rose-600", "bg-cyan-600"].map((c, i) => (
                          <button
                            key={i}
                            onClick={() => setProfileColor(c)}
                            className={`w-7 h-7 rounded-full ${c} border-2 hover:scale-105 transition-transform ${profileColor === c ? "border-blue-500 scale-105" : "border-white dark:border-[#3c3e41]"}`}
                            aria-label={`Color option ${i}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION 2: Autofill & Passwords */}
                {activeSettingsSection === "autofill" && (
                  <div className="space-y-6">
                    <h2 className={`text-xl font-bold border-b ${settingsThemeClasses.borderMuted} pb-4`}>Autofill & Passwords</h2>

                    {/* Credentials vault */}
                    <div className={`p-5 rounded-xl border space-y-4 ${settingsThemeClasses.cardBg}`}>
                      <h3 className={`text-xs font-bold ${settingsThemeClasses.textMuted} uppercase tracking-wider`}>Password Manager</h3>
                      
                      <div className={`divide-y ${settingsThemeClasses.divideColor} max-h-52 overflow-y-auto space-y-1`}>
                        {passwordsList.map((p) => (
                          <div key={p.id} className="flex items-center justify-between py-2 text-xs">
                            <div className="grid grid-cols-3 gap-4 flex-1 min-w-0 pr-4">
                              <span className="font-semibold truncate">{highlightText(p.site, findText)}</span>
                              <span className={`truncate ${settingsThemeClasses.textMuted}`}>{highlightText(p.username, findText)}</span>
                              <span className="font-mono tracking-widest text-[9px]">
                                {p.show ? p.password : "••••••••"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <button 
                                onClick={() => setPasswordsList(prev => prev.map(item => item.id === p.id ? { ...item, show: !item.show } : item))}
                                className={`text-[10px] ${settingsThemeClasses.textMuted} hover:text-gray-800 dark:hover:text-zinc-200`}
                              >
                                {p.show ? "Hide" : "Show"}
                              </button>
                              <button 
                                onClick={() => setPasswordsList(prev => prev.filter(item => item.id !== p.id))}
                                className={`p-1 ${settingsThemeClasses.textMuted} hover:text-rose-500 transition-colors`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className={`border-t ${settingsThemeClasses.borderMuted} pt-4 space-y-3`}>
                        <h4 className={`text-[10px] font-bold ${settingsThemeClasses.textMuted}`}>Add Mock Credential</h4>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Site (e.g. github.com)" 
                            value={newPassSite}
                            onChange={(e) => setNewPassSite(e.target.value)}
                            className={`flex-1 text-xs px-2.5 py-1 rounded border outline-none ${settingsThemeClasses.inputBg}`}
                          />
                          <input 
                            type="text" 
                            placeholder="Username" 
                            value={newPassUser}
                            onChange={(e) => setNewPassUser(e.target.value)}
                            className={`flex-1 text-xs px-2.5 py-1 rounded border outline-none ${settingsThemeClasses.inputBg}`}
                          />
                          <input 
                            type="password" 
                            placeholder="Password" 
                            value={newPassVal}
                            onChange={(e) => setNewPassVal(e.target.value)}
                            className={`flex-1 text-xs px-2.5 py-1 rounded border outline-none ${settingsThemeClasses.inputBg}`}
                          />
                          <button 
                            onClick={() => {
                              if (!newPassSite || !newPassUser || !newPassVal) return alert("Fill all fields");
                              setPasswordsList(prev => [...prev, { id: Date.now(), site: newPassSite, username: newPassUser, password: newPassVal, show: false }]);
                              setNewPassSite("");
                              setNewPassUser("");
                              setNewPassVal("");
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 py-1 rounded shadow"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Credit Cards section */}
                    <div className={`p-5 rounded-xl border space-y-4 ${settingsThemeClasses.cardBg}`}>
                      <h3 className={`text-xs font-bold ${settingsThemeClasses.textMuted} uppercase tracking-wider`}>Payment Methods</h3>
                      
                      <div className={`divide-y ${settingsThemeClasses.divideColor}`}>
                        {cardsList.map((c) => (
                          <div key={c.id} className="flex items-center justify-between py-2 text-xs">
                            <div>
                              <span className="font-semibold">{highlightText(c.type, findText)}</span> • <span className={settingsThemeClasses.textMuted}>{c.number}</span>
                              <p className={`text-[9px] ${settingsThemeClasses.textMuted}`}>Expiry: {c.expiry} • {c.holder}</p>
                            </div>
                            <button 
                              onClick={() => setCardsList(prev => prev.filter(item => item.id !== c.id))}
                              className={`${settingsThemeClasses.textMuted} hover:text-rose-500`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className={`flex gap-2 border-t ${settingsThemeClasses.borderMuted} pt-3`}>
                        <input 
                          type="text" 
                          placeholder="Card Number (4242...)" 
                          value={newCardNum}
                          onChange={(e) => setNewCardNum(e.target.value)}
                          className={`flex-1 text-xs px-2 py-1.5 rounded border outline-none ${settingsThemeClasses.inputBg}`}
                        />
                        <input 
                          type="text" 
                          placeholder="MM/YY" 
                          value={newCardExpiry}
                          onChange={(e) => setNewCardExpiry(e.target.value)}
                          className={`w-20 text-xs px-2 py-1.5 rounded border outline-none ${settingsThemeClasses.inputBg}`}
                        />
                        <button 
                          onClick={() => {
                            if (!newCardNum || !newCardExpiry) return alert("Fill fields");
                            setCardsList(prev => [...prev, { id: Date.now(), type: "Card", number: `•••• •••• •••• ${newCardNum.slice(-4)}`, holder: "Kunal", expiry: newCardExpiry }]);
                            setNewCardNum("");
                            setNewCardExpiry("");
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 rounded shadow"
                        >
                          Add Card
                        </button>
                      </div>
                    </div>

                    {/* Addresses section */}
                    <div className={`p-5 rounded-xl border space-y-4 ${settingsThemeClasses.cardBg}`}>
                      <h3 className={`text-xs font-bold ${settingsThemeClasses.textMuted} uppercase tracking-wider`}>Saved Addresses</h3>
                      
                      <div className={`divide-y ${settingsThemeClasses.divideColor}`}>
                        {addressesList.map((addr) => (
                          <div key={addr.id} className="flex items-center justify-between py-2 text-xs">
                            <div>
                              <span className="font-semibold">{highlightText(addr.label, findText)}</span>: {highlightText(addr.street, findText)}, {addr.city}, {addr.state} {addr.zip}
                              <p className={`text-[9px] ${settingsThemeClasses.textMuted}`}>Recipient: {addr.name}</p>
                            </div>
                            <button 
                              onClick={() => setAddressesList(prev => prev.filter(item => item.id !== addr.id))}
                              className={`${settingsThemeClasses.textMuted} hover:text-rose-500`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className={`flex gap-2 border-t ${settingsThemeClasses.borderMuted} pt-3`}>
                        <input 
                          type="text" 
                          placeholder="Street address" 
                          value={newAddressStreet}
                          onChange={(e) => setNewAddressStreet(e.target.value)}
                          className={`flex-1 text-xs px-2 py-1.5 rounded border outline-none ${settingsThemeClasses.inputBg}`}
                        />
                        <input 
                          type="text" 
                          placeholder="City" 
                          value={newAddressCity}
                          onChange={(e) => setNewAddressCity(e.target.value)}
                          className={`w-28 text-xs px-2 py-1.5 rounded border outline-none ${settingsThemeClasses.inputBg}`}
                        />
                        <button 
                          onClick={() => {
                            if (!newAddressStreet || !newAddressCity) return alert("Fill fields");
                            setAddressesList(prev => [...prev, { id: Date.now(), label: "Other", name: "Kunal", street: newAddressStreet, city: newAddressCity, state: "CA", zip: "90001" }]);
                            setNewAddressStreet("");
                            setNewAddressCity("");
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 rounded shadow"
                        >
                          Add Address
                        </button>
                      </div>
                    </div>

                  </div>
                )}

                {/* SECTION 3: Appearance */}
                {activeSettingsSection === "appearance" && (
                  <div className="space-y-6">
                    <h2 className={`text-xl font-bold border-b ${settingsThemeClasses.borderMuted} pb-4`}>Appearance</h2>

                    <div className={`flex items-center justify-between p-4 rounded-xl border ${settingsThemeClasses.cardBg}`}>
                      <div>
                        <h4 className="text-xs font-bold">Theme Mode</h4>
                        <p className={`text-[10px] ${settingsThemeClasses.textMuted}`}>Toggle between Light and Dark themes</p>
                      </div>
                      <div className={`flex p-1 rounded-lg border ${settingsThemeClasses.toggleBg}`}>
                        <button 
                          onClick={() => setTheme("light")}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-all ${
                            theme === "light" 
                              ? "bg-white text-gray-800 shadow-sm" 
                              : settingsThemeClasses.btnInactive
                          }`}
                        >
                          <Sun className="w-3.5 h-3.5 text-amber-500" /> Light
                        </button>
                        <button 
                          onClick={() => setTheme("dark")}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-all ${
                            theme === "dark" 
                              ? "bg-[#2f3033] text-white shadow-sm" 
                              : settingsThemeClasses.btnInactive
                          }`}
                        >
                          <Moon className="w-3.5 h-3.5 text-indigo-400" /> Dark
                        </button>
                      </div>
                    </div>

                    <div className={`flex items-center justify-between p-4 rounded-xl border ${settingsThemeClasses.cardBg}`}>
                      <div>
                        <h4 className="text-xs font-bold">Show Bookmarks Bar</h4>
                        <p className={`text-[10px] ${settingsThemeClasses.textMuted}`}>Toggle visibility of bookmarks strip</p>
                      </div>
                      <button 
                        onClick={() => setShowBookmarks(prev => !prev)}
                        className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${showBookmarks ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 transform ${showBookmarks ? "translate-x-4.5" : "translate-x-0"}`} />
                      </button>
                    </div>

                    {/* Font size picker */}
                    <div className={`flex items-center justify-between p-4 rounded-xl border ${settingsThemeClasses.cardBg}`}>
                      <div>
                        <h4 className="text-xs font-bold">Font Size Scaling</h4>
                        <p className={`text-[10px] ${settingsThemeClasses.textMuted}`}>Adjust the display scale of browser window text contents</p>
                      </div>
                      <div className={`flex p-1 rounded-lg border ${settingsThemeClasses.toggleBg} gap-1`}>
                        {["small", "medium", "large"].map((size) => (
                          <button
                            key={size}
                            onClick={() => setFontSize(size)}
                            className={`px-3 py-1 rounded text-xs font-semibold capitalize transition-all ${
                              fontSize === size 
                                ? (theme === "dark" ? "bg-[#2f3033] text-white shadow-sm font-bold" : "bg-white text-gray-800 shadow-sm font-bold")
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

                {/* SECTION 4: Search Engine */}
                {activeSettingsSection === "search" && (
                  <div className="space-y-6">
                    <h2 className={`text-xl font-bold border-b ${settingsThemeClasses.borderMuted} pb-4`}>Search Engine</h2>
                    
                    <div className={`flex items-center justify-between p-4 rounded-xl border ${settingsThemeClasses.cardBg}`}>
                      <div>
                        <h4 className="text-xs font-bold">Default Search Engine</h4>
                        <p className={`text-[10px] ${settingsThemeClasses.textMuted}`}>Address bar queries will be executed through this search provider</p>
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

                {/* SECTION 5: Privacy & Security */}
                {activeSettingsSection === "privacy" && (
                  <div className="space-y-6">
                    <h2 className={`text-xl font-bold border-b ${settingsThemeClasses.borderMuted} pb-4`}>Privacy & Security</h2>

                    <div className={`flex items-center justify-between p-4 rounded-xl border ${settingsThemeClasses.cardBg}`}>
                      <div>
                        <h4 className="text-xs font-bold">Clear Browsing Data</h4>
                        <p className={`text-[10px] ${settingsThemeClasses.textMuted}`}>Clears current browsing history, reset tabs, and logs out profiles</p>
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
                              historyIndex: 0
                            }
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
          )}

          {/* VIEW 6: History Page */}
          {activeTab.url === "chrome://history" && (
            <div className={`absolute inset-0 flex select-none overflow-hidden ${settingsThemeClasses.contentBg}`}>
              {/* Sidebar */}
              <div className={`w-52 border-r shrink-0 py-6 px-4 flex flex-col gap-1.5 ${settingsThemeClasses.sidebarBg}`}>
                <div className={`flex items-center gap-2 px-2 pb-4 border-b ${settingsThemeClasses.borderMuted} mb-3`}>
                  <History className="w-5 h-5 text-blue-500" />
                  <span className="font-bold text-sm">History</span>
                </div>
                <button onClick={() => navigateTabTo("chrome://settings")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
                  <Settings className="w-4 h-4" /> Appearance
                </button>
                <button onClick={() => navigateTabTo("chrome://bookmarks")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
                  <Star className="w-4 h-4" /> Bookmarks
                </button>
                <button className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-left w-full">
                  <History className="w-4 h-4" /> History
                </button>
                <button onClick={() => navigateTabTo("chrome://downloads")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
                  <History className="w-4 h-4 transform rotate-180" /> Downloads
                </button>
                <button onClick={() => navigateTabTo("chrome://about")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
                  <Info className="w-4 h-4" /> About Chrome
                </button>
              </div>

              {/* Main Content */}
              <div className="flex-1 overflow-y-auto p-8 max-w-3xl space-y-6">
                <div className={`flex items-center justify-between border-b ${settingsThemeClasses.borderMuted} pb-4`}>
                  <h2 className="text-xl font-bold">History</h2>
                  {historyList.length > 0 && (
                    <button 
                      onClick={() => setHistoryList([])}
                      className="px-3 py-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                    >
                      Clear History
                    </button>
                  )}
                </div>

                {historyList.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400 gap-3">
                    <History className="w-10 h-10 stroke-[1.5]" />
                    <p className="text-xs">Your browsing history will show up here.</p>
                  </div>
                ) : (
                  <div className={`border rounded-xl divide-y overflow-hidden shadow-sm ${theme === "dark" ? "bg-[#2f3033] border-[#3c3e41] divide-[#3c3e41]" : "bg-white border-gray-200 divide-gray-200"}`}>
                    {historyList.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3.5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <span className={`text-[10px] ${settingsThemeClasses.textMuted} shrink-0 w-12`}>{item.time}</span>
                          <Globe className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span 
                            onClick={() => navigateTabTo(item.url)}
                            className="text-xs font-semibold text-blue-500 hover:underline cursor-pointer truncate max-w-md"
                          >
                            {highlightText(item.title, findText)}
                          </span>
                          <span className={`text-[10px] ${settingsThemeClasses.textMuted} truncate hidden md:inline`}>{highlightText(item.url, findText)}</span>
                        </div>
                        <button 
                          onClick={() => setHistoryList(prev => prev.filter((_, i) => i !== index))}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-rose-500/10 hover:text-rose-500 rounded transition-all text-gray-400 shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW 7: About Chrome Page */}
          {activeTab.url === "chrome://about" && (
            <div className={`absolute inset-0 flex select-none overflow-hidden ${settingsThemeClasses.contentBg}`}>
              {/* Sidebar */}
              <div className={`w-52 border-r shrink-0 py-6 px-4 flex flex-col gap-1.5 ${settingsThemeClasses.sidebarBg}`}>
                <div className={`flex items-center gap-2 px-2 pb-4 border-b ${settingsThemeClasses.borderMuted} mb-3`}>
                  <Globe className="w-5 h-5 text-blue-500" />
                  <span className="font-bold text-sm">Chrome OS</span>
                </div>
                <button onClick={() => navigateTabTo("chrome://settings")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
                  <Settings className="w-4 h-4" /> Appearance
                </button>
                <button onClick={() => navigateTabTo("chrome://bookmarks")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
                  <Star className="w-4 h-4" /> Bookmarks
                </button>
                <button onClick={() => navigateTabTo("chrome://history")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
                  <History className="w-4 h-4" /> History
                </button>
                <button onClick={() => navigateTabTo("chrome://downloads")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
                  <History className="w-4 h-4 transform rotate-180" /> Downloads
                </button>
                <button className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-left">
                  <Info className="w-4 h-4" /> About Chrome
                </button>
              </div>

              {/* Main Content */}
              <div className="flex-1 overflow-y-auto p-8 max-w-2xl space-y-6">
                <div className={`flex flex-col items-center text-center gap-4 py-8 border-b ${settingsThemeClasses.borderMuted}`}>
                  {/* Custom Chromelike Colorful Circle */}
                  <div className="w-20 h-20 rounded-full border-4 border-white dark:border-[#35363a] shadow-lg flex items-center justify-center relative overflow-hidden bg-white">
                    <div className="absolute inset-0 bg-blue-500 rounded-full scale-[0.4] z-10 border border-white" />
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500 transform origin-bottom -skew-x-[30deg]" />
                    <div className="absolute bottom-0 right-0 w-full h-1/2 bg-green-500 transform origin-top -skew-y-[30deg]" />
                    <div className="absolute top-0 right-0 w-full h-full bg-yellow-500 transform origin-left -skew-x-[60deg] scale-x-[0.5]" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-xl font-extrabold tracking-tight">Google Chrome</h2>
                    <p className="text-xs text-gray-400">Version 125.0.6422.112 (Official Build) (64-bit)</p>
                  </div>
                </div>

                <div className={`space-y-4 text-xs leading-relaxed ${settingsThemeClasses.textMuted}`}>
                  <p className="font-semibold text-gray-700 dark:text-gray-300">
                    Google Chrome is up to date
                  </p>
                  <p>
                    This mockup browser runs inside the Antigravity MacOS portfolio interface. It features customizable themes, bookmark controls, default search configurations, and whitelisted recursive site rendering.
                  </p>
                  <p className="text-[10px] text-gray-400 pt-4">
                    Copyright 2026 Google DeepMind. All rights reserved. Chrome and Google are registered trademarks of Google LLC.
                  </p>
                </div>
              </div>
            </div>
          )}

           {activeTab.url === "chrome://bookmarks" && (
            <div className={`absolute inset-0 flex select-none overflow-hidden ${settingsThemeClasses.contentBg}`}>
              {/* Sidebar */}
              <div className={`w-52 border-r shrink-0 py-6 px-4 flex flex-col gap-1.5 ${settingsThemeClasses.sidebarBg}`}>
                <div className={`flex items-center gap-2 px-2 pb-4 border-b ${settingsThemeClasses.borderMuted} mb-3`}>
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-sm">Bookmarks</span>
                </div>
                <button onClick={() => navigateTabTo("chrome://settings")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
                  <Settings className="w-4 h-4" /> Appearance
                </button>
                <button className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-left w-full">
                  <Bookmark className="w-4 h-4" /> Bookmarks
                </button>
                <button onClick={() => navigateTabTo("chrome://history")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
                  <History className="w-4 h-4" /> History
                </button>
                <button onClick={() => navigateTabTo("chrome://downloads")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
                  <History className="w-4 h-4 transform rotate-180" /> Downloads
                </button>
                <button onClick={() => navigateTabTo("chrome://about")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
                  <Info className="w-4 h-4" /> About Chrome
                </button>
              </div>

              {/* Main Content */}
              <div className="flex-1 overflow-y-auto p-8 max-w-3xl space-y-6">
                <div className={`flex items-center justify-between border-b ${settingsThemeClasses.borderMuted} pb-4`}>
                  <h2 className="text-xl font-bold">Bookmarks</h2>
                </div>

                {bookmarks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400 gap-3">
                    <Star className="w-10 h-10 stroke-[1.5]" />
                    <p className="text-xs">Your bookmarks will show up here. Press the Star icon in the address bar to bookmark a page.</p>
                  </div>
                ) : (
                  <div className={`border rounded-xl divide-y overflow-hidden shadow-sm ${theme === "dark" ? "bg-[#2f3033] border-[#3c3e41] divide-[#3c3e41]" : "bg-white border-gray-200 divide-gray-100"}`}>
                    {bookmarks.map((bookmark, index) => (
                      <div key={index} className="flex items-center justify-between p-3.5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <Globe className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span 
                            onClick={() => navigateTabTo(bookmark.url)}
                            className="text-xs font-semibold text-blue-500 hover:underline cursor-pointer truncate max-w-md"
                          >
                            {highlightText(bookmark.title, findText)}
                          </span>
                          <span className={`text-[10px] ${settingsThemeClasses.textMuted} truncate hidden md:inline`}>{highlightText(bookmark.url, findText)}</span>
                        </div>
                        <button 
                          onClick={() => setBookmarks(prev => prev.filter((_, i) => i !== index))}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-rose-500/10 hover:text-rose-500 rounded transition-all text-gray-400 shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW 9: Incognito Page */}
          {activeTab.url === "chrome://incognito" && (
            <div className="absolute inset-0 bg-[#202124] text-gray-200 flex flex-col items-center justify-center p-8 select-none overflow-y-auto">
              <div className="max-w-xl w-full text-center space-y-6 -mt-10">
                <div className="w-20 h-20 bg-zinc-800 text-zinc-300 rounded-full flex items-center justify-center mx-auto shadow-lg border border-zinc-700">
                  <svg className="w-12 h-12 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="15" r="2" />
                    <circle cx="16" cy="15" r="2" />
                    <path d="M10 15h4M2 11a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v1H2z" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-zinc-100">You've gone Incognito</h2>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                    Now you can browse privately, and other people who use this device won't see your activity. However, downloads and bookmarks will be saved.
                  </p>
                </div>

                <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-4 text-left text-[10px] text-zinc-300 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-zinc-100 mb-1">Chrome won't save:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-zinc-400">
                      <li>Your browsing history</li>
                      <li>Cookies and site data</li>
                      <li>Information entered in forms</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-100 mb-1">Your activity might still be visible to:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-zinc-400">
                      <li>Websites you visit</li>
                      <li>Your employer or school</li>
                      <li>Your internet service provider</li>
                    </ul>
                  </div>
                </div>

                <div className="w-full flex items-center bg-zinc-800 border border-zinc-700 hover:border-transparent hover:shadow-md focus-within:shadow-md focus-within:border-transparent transition-all rounded-full px-4 py-3 text-sm max-w-md mx-auto">
                  <Search className="w-4 h-4 text-zinc-400 mr-3 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search Google privately"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target.value.trim()) {
                        navigateTabTo(`https://www.google.com/search?q=${encodeURIComponent(e.target.value)}`);
                        e.target.value = "";
                      }
                    }}
                    className="w-full bg-transparent border-none outline-none text-zinc-100 placeholder-zinc-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* VIEW 10: Downloads Page */}
          {activeTab.url === "chrome://downloads" && (
            <div className={`absolute inset-0 flex select-none overflow-hidden ${settingsThemeClasses.contentBg}`}>
              {/* Sidebar */}
              <div className={`w-52 border-r shrink-0 py-6 px-4 flex flex-col gap-1.5 ${settingsThemeClasses.sidebarBg}`}>
                <div className={`flex items-center gap-2 px-2 pb-4 border-b ${settingsThemeClasses.borderMuted} mb-3`}>
                  <History className="w-5 h-5 text-blue-500 transform rotate-180" />
                  <span className="font-bold text-sm">Downloads</span>
                </div>
                <button onClick={() => navigateTabTo("chrome://settings")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
                  <Settings className="w-4 h-4" /> Appearance
                </button>
                <button onClick={() => navigateTabTo("chrome://bookmarks")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
                  <Star className="w-4 h-4" /> Bookmarks
                </button>
                <button onClick={() => navigateTabTo("chrome://history")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
                  <History className="w-4 h-4" /> History
                </button>
                <button className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-left w-full">
                  <History className="w-4 h-4 transform rotate-180" /> Downloads
                </button>
                <button onClick={() => navigateTabTo("chrome://about")} className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400">
                  <Info className="w-4 h-4" /> About Chrome
                </button>
              </div>

              {/* Main Content */}
              <div className="flex-1 overflow-y-auto p-8 max-w-3xl space-y-6">
                <div className={`flex items-center justify-between border-b ${settingsThemeClasses.borderMuted} pb-4`}>
                  <h2 className="text-xl font-bold">Downloads</h2>
                  {downloadsList.length > 0 && (
                    <button 
                      onClick={() => setDownloadsList([])}
                      className="text-xs font-semibold text-rose-500 hover:bg-rose-500/10 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                
                <div className="space-y-4">
                  {downloadsList.map((d, index) => (
                    <div key={index} className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${settingsThemeClasses.cardBg}`}>
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${d.type === "PDF" ? "bg-red-500/10 text-red-500" : d.type === "ZIP" ? "bg-blue-500/10 text-blue-500" : "bg-emerald-500/10 text-emerald-500"}`}>{d.type}</div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold truncate">{highlightText(d.name, findText)}</h4>
                          <p className={`text-[10px] ${settingsThemeClasses.textMuted}`}>{d.size} • {d.progress} • {d.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => alert(`Downloading ${d.name} again...`)} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-bold cursor-pointer">Download Again</button>
                        <button 
                          onClick={() => setDownloadsList(prev => prev.filter((_, i) => i !== index))}
                          className="px-3 py-1 hover:bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-200 dark:border-rose-900/30 rounded text-[10px] font-semibold cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  {downloadsList.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400 gap-3">
                      <History className="w-10 h-10 transform rotate-180 stroke-[1.5]" />
                      <p className="text-xs">No downloads found.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 11: Extensions Page */}
          {activeTab.url === "chrome://extensions" && (
            <div className={`absolute inset-0 flex flex-col select-none ${settingsThemeClasses.contentBg}`}>
              <div className={`px-6 py-4 border-b flex items-center justify-between ${settingsThemeClasses.sidebarBg}`}>
                <div className="flex items-center gap-3">
                  <Bookmark className="w-6 h-6 text-blue-500 transform rotate-90" />
                  <span className="font-bold text-base">Extensions</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 grid grid-cols-2 gap-6 max-w-4xl">
                <div className={`p-5 rounded-xl border flex flex-col justify-between gap-4 shadow-sm ${settingsThemeClasses.cardBg}`}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xs">AdBlock Pro</h3>
                      <span className="text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-700 rounded text-zinc-600 dark:text-zinc-300">v3.4.1</span>
                    </div>
                    <p className={`text-[10px] ${settingsThemeClasses.textMuted} leading-relaxed`}>
                      Blocks intrusive advertisements, tracking cookies, and popup marketing banners across all websites inside the portfolio browser.
                    </p>
                  </div>
                  <div className={`flex items-center justify-between pt-2 border-t ${settingsThemeClasses.borderMuted}`}>
                    <span className={`text-[10px] ${settingsThemeClasses.textMuted}`}>Enable extension</span>
                    <button 
                      onClick={() => setIsAdBlockerActive(prev => !prev)}
                      className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${isAdBlockerActive ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 transform ${isAdBlockerActive ? "translate-x-4.5" : "translate-x-0"}`} />
                    </button>
                  </div>
                </div>

                <div className={`p-5 rounded-xl border flex flex-col justify-between gap-4 shadow-sm ${settingsThemeClasses.cardBg}`}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xs">React Developer Tools</h3>
                      <span className="text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-700 rounded text-zinc-600 dark:text-zinc-300">v5.2.0</span>
                    </div>
                    <p className={`text-[10px] ${settingsThemeClasses.textMuted} leading-relaxed`}>
                      Adds React component debugging tools and state inspector consoles to the browser developer inspector panel.
                    </p>
                  </div>
                  <div className={`flex items-center justify-between pt-2 border-t ${settingsThemeClasses.borderMuted}`}>
                    <span className={`text-[10px] ${settingsThemeClasses.textMuted}`}>Enable extension</span>
                    <button className="w-10 h-5.5 rounded-full p-0.5 bg-blue-600">
                      <div className="w-4 h-4 rounded-full bg-white translate-x-4.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 12: Developer Tools Page */}
          {activeTab.url === "chrome://devtools" && (
            <div className="absolute inset-0 bg-[#202124] text-gray-200 flex select-none overflow-hidden font-mono">
              <div className="w-1/2 border-r border-[#3c3e41] flex flex-col p-4 space-y-3 overflow-y-auto">
                <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Elements</div>
                <div className="text-[11px] text-sky-400 space-y-1">
                  <div>&lt;<span className="text-pink-400">div</span> <span className="text-purple-400">id</span>="desktop-root"&gt;</div>
                  <div className="pl-4">&lt;<span className="text-pink-400">header</span> <span className="text-purple-400">class</span>="navbar"&gt;...&lt;/<span className="text-pink-400">header</span>&gt;</div>
                  <div className="pl-4 text-zinc-100 font-semibold">&lt;<span className="text-pink-400">main</span> <span className="text-purple-400">class</span>="desktop-main"&gt;</div>
                  <div className="pl-8">&lt;<span className="text-pink-400">div</span> <span className="text-purple-400">id</span>="window-chrome"&gt;...&lt;/<span className="text-pink-400">div</span>&gt;</div>
                  <div className="pl-8">&lt;<span className="text-pink-400">div</span> <span className="text-purple-400">id</span>="dock"&gt;...&lt;/<span className="text-pink-400">div</span>&gt;</div>
                  <div className="pl-4">&lt;/<span className="text-pink-400">main</span>&gt;</div>
                  <div>&lt;/<span className="text-pink-400">div</span>&gt;</div>
                </div>
              </div>

              <div className="w-1/2 flex flex-col p-4 overflow-y-auto justify-between bg-zinc-950">
                <div className="space-y-1.5 text-[10px]">
                  <div className="text-zinc-500 font-bold">Console (Active Session)</div>
                  <div className="text-emerald-400">[info] Vite dev server connected.</div>
                  <div className="text-emerald-400">[info] HMR hot module reload active.</div>
                  <div className="text-sky-400">[debug] Loading Chrome window wrapper state.</div>
                  <div className="text-sky-400">[debug] Active tab whitelisted for recursive rendering.</div>
                  {isAdBlockerActive && <div className="text-amber-500">[warn] AdBlock Pro intercepted 12 tracking domains.</div>}
                </div>
                <div className="border-t border-zinc-800 pt-2 flex items-center text-[10px] text-zinc-400 gap-1.5">
                  <span>&gt;</span>
                  <input 
                    type="text" 
                    placeholder="Enter console command..." 
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target.value.trim()) {
                        alert(`Console command executed: "${e.target.value}"`);
                        e.target.value = "";
                      }
                    }}
                    className="bg-transparent border-none outline-none focus:ring-0 text-zinc-100 flex-1"
                  />
                </div>
              </div>
            </div>
          )}

        </div> {/* Dynamic Zoom Scale Wrapper */}
      </div> {/* BROWSER BODY RENDER */}
    </div>
  );
};

const ChromeWindow = windowWrapper(Chrome, "chrome");
export default ChromeWindow;
