import WindowControls from "@components/WindowControls";
import { locations } from "@constants";
import windowWrapper from "@hoc/windowWrapper";
import useLocationStore from "@store/location";
import useWindowsStore from "@store/window";
import { Search, ChevronRight, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { fileIconMap } from "./finderData";
import FinderSection from "../section/FinderSection";

const Finder = () => {
  const { openWindow } = useWindowsStore();
  const isOpen = useWindowsStore((state) => state.windows.finder?.isOpen);
  const { activeLocation, setActiveLocation, resetActiveLocation } = useLocationStore();
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [navStack, setNavStack] = useState([]);
  const [redirectItem, setRedirectItem] = useState(null);

  // History and Search States
  const [history, setHistory] = useState([activeLocation]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset finder state to default when closed
  useEffect(() => {
    if (!isOpen) {
      setHistory([locations.work]);
      setHistoryIndex(0);
      setSearchQuery("");
      setNavStack([]);
      resetActiveLocation();
    }
  }, [isOpen, resetActiveLocation]);

  // Sync initial location when store updates
  useEffect(() => {
    if (activeLocation && history.length === 1 && history[0]?.id !== activeLocation.id) {
      setHistory([activeLocation]);
      setHistoryIndex(0);
    }
  }, [activeLocation, history]);

  const handleNavigate = (location) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(location);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setActiveLocation(location);
    setSearchQuery(""); // Reset search query on folder change
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      setActiveLocation(history[nextIndex]);
      setSearchQuery("");
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setActiveLocation(history[nextIndex]);
      setSearchQuery("");
    }
  };

  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") {
      if (isMobile) {
        setNavStack((prev) => [...prev, activeLocation]);
        setActiveLocation(item);
      } else {
        handleNavigate(item);
      }
      return;
    }
    // GitHub links should open in new tab of the browser with a redirect popup
    if ((item.fileType === "fig" || item.name?.toLowerCase().includes("github")) && item.href) {
      setRedirectItem(item);
      return;
    }
    if (item.fileType === "url" && item.href) {
      openWindow("safari", { url: item.href });
      return;
    }
    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const _goBack = () => {
    if (navStack.length > 0) {
      const prev = navStack[navStack.length - 1];
      setNavStack((s) => s.slice(0, -1));
      setActiveLocation(prev);
    }
  };

  if (isMobile) {
    return (
      <>
        <div
          id="window-header"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "14px 16px",
            background: "#f2f2f7",
            borderBottom: "1px solid #e5e5ea",
            gap: 10,
            minHeight: 52,
          }}
        >
          <WindowControls target="finder" />
          <h1
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: "#000",
              flex: 1,
              textAlign: "center",
            }}
          >
            {activeLocation?.name || "Files"}
          </h1>
          <Search size={20} className="text-blue-500" />
        </div>

        <div
          className="finder-main"
          style={{
            flex: 1,
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            background: "#f2f2f7",
          }}
        >
          <div style={{ padding: "20px 16px 8px" }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#6d6d72",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginBottom: 8,
              }}
            >
              Favorites
            </p>
            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              {Object.values(locations).map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setNavStack((prev) => [...prev, activeLocation]);
                    setActiveLocation(item);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    padding: "12px 16px",
                    background: item.id === activeLocation?.id ? "#e8f0fe" : "transparent",
                    borderBottom:
                      index < Object.values(locations).length - 1 ? "0.5px solid #e5e5ea" : "none",
                    gap: 14,
                    textAlign: "left",
                  }}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    style={{ width: 30, height: 30, borderRadius: 7 }}
                  />
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: "#000",
                      }}
                    >
                      {item.name}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>

          {activeLocation?.children && activeLocation.children.length > 0 && (
            <div style={{ padding: "24px 16px 8px" }}>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#6d6d72",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  marginBottom: 8,
                }}
              >
                {activeLocation.name}
              </p>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                {activeLocation.children.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => openItem(item)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      padding: "12px 16px",
                      background: "transparent",
                      borderBottom:
                        index < activeLocation.children.length - 1 ? "0.5px solid #e5e5ea" : "none",
                      gap: 14,
                      textAlign: "left",
                    }}
                  >
                    {item.kind === "folder" ? (
                      <img
                        src={item.icon}
                        alt={item.name}
                        style={{ width: 30, height: 30, borderRadius: 7 }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 7,
                          background: "#f2f2f7",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {fileIconMap[item.fileType] || (
                          <FileText size={20} className="text-gray-400" />
                        )}
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          fontSize: 16,
                          fontWeight: 400,
                          color: "#000",
                        }}
                      >
                        {item.name}
                      </p>
                      {item.kind === "folder" && (
                        <p style={{ fontSize: 12, color: "#8e8e93" }}>
                          {item.children?.length || 0} items
                        </p>
                      )}
                    </div>
                    {item.kind === "folder" && <ChevronRight size={18} className="text-gray-300" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Redirection Popup */}
        {redirectItem && (
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-[100] animate-in fade-in duration-150 rounded-b-2xl">
            <div className="bg-white/95 border border-zinc-200/50 p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4 text-center space-y-4 transform animate-in zoom-in-95 duration-150 backdrop-blur-md">
              <div className="w-12 h-12 bg-neutral-100 text-neutral-800 rounded-full flex items-center justify-center mx-auto shadow-inner border border-zinc-200">
                <img src="/images/github.png" alt="GitHub" className="w-7 h-7 object-contain" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-800">Open in New Tab</h3>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Do you want to open the GitHub repository for{" "}
                  <span className="font-semibold text-gray-700">{activeLocation.name}</span> in a new tab?
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setRedirectItem(null)}
                  className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 rounded-xl text-xs font-bold transition-all cursor-pointer border border-zinc-200"
                >
                  Cancel
                </button>
                <a
                  href={redirectItem.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setRedirectItem(null)}
                  className="flex-1 py-2 bg-[#24292e] hover:bg-[#1f2327] active:bg-[#1a1e21] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center cursor-pointer text-center"
                >
                  Open Link
                </a>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  const filteredChildren =
    activeLocation?.children?.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  return (
    <>
      <FinderSection
        activeLocation={activeLocation}
        setActiveLocation={handleNavigate}
        openItem={openItem}
        canGoBack={historyIndex > 0}
        canGoForward={historyIndex < history.length - 1}
        onGoBack={handleBack}
        onGoForward={handleForward}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filteredChildren={filteredChildren}
      />

      {/* Redirection Popup */}
      {redirectItem && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-[100] animate-in fade-in duration-150 rounded-b-2xl">
          <div className="bg-white/95 border border-zinc-200/50 p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4 text-center space-y-4 transform animate-in zoom-in-95 duration-150 backdrop-blur-md">
            <div className="w-12 h-12 bg-neutral-100 text-neutral-800 rounded-full flex items-center justify-center mx-auto shadow-inner border border-zinc-200">
              <img src="/images/github.png" alt="GitHub" className="w-7 h-7 object-contain" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-gray-800">Open in New Tab</h3>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Do you want to open the GitHub repository for{" "}
                <span className="font-semibold text-gray-700">{activeLocation.name}</span> in a new tab?
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setRedirectItem(null)}
                className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 rounded-xl text-xs font-bold transition-all cursor-pointer border border-zinc-200"
              >
                Cancel
              </button>
              <a
                href={redirectItem.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setRedirectItem(null)}
                className="flex-1 py-2 bg-[#24292e] hover:bg-[#1f2327] active:bg-[#1a1e21] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center cursor-pointer text-center"
              >
                Open Link
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const FinderWindow = windowWrapper(Finder, "finder");
export default FinderWindow;
