import WindowControls from "@components/WindowControls";
import { locations } from "@constants";
import windowWrapper from "@hoc/windowWrapper";
import useLocationStore from "@store/location";
import useWindowsStore from "@store/window";
import { Search, ChevronRight, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { fileIconMap } from "./finderData";
import FinderSection from "../section/FinderSection";
import FinderAboutModal from "./FinderAboutModal";

const Finder = () => {
  const { openWindow, setWindowData, setGithubRedirect } = useWindowsStore();
  const isOpen = useWindowsStore((state) => state.windows.finder?.isOpen);
  const finderWindowData = useWindowsStore((state) => state.windows.finder?.data);
  const { activeLocation, setActiveLocation, resetActiveLocation } = useLocationStore();
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [navStack, setNavStack] = useState([]);
  const [showAbout, setShowAbout] = useState(false);

  // Sync openAbout action from windowData
  useEffect(() => {
    if (finderWindowData?.openAbout) {
      setShowAbout(true);
      setWindowData("finder", null);
    }
  }, [finderWindowData, setWindowData]);

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
      setGithubRedirect({ href: item.href, name: item.name });
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

      {/* Finder About Dialog */}
      <FinderAboutModal show={showAbout} onClose={() => setShowAbout(false)} />
    </>
  );
};

const FinderWindow = windowWrapper(Finder, "finder");
export default FinderWindow;
