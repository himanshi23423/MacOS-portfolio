import React, { useState, useEffect, useRef } from "react";
import FinderToolbarSection from "./FinderToolbarSection";
import FinderSidebarSection from "./FinderSidebarSection";
import FinderFileListSection from "./FinderFileListSection";

const FinderSection = ({
  activeLocation,
  setActiveLocation,
  openItem,
  canGoBack,
  canGoForward,
  onGoBack,
  onGoForward,
  searchQuery,
  onSearchChange,
  filteredChildren,
}) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(800);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const isNarrow = containerWidth < 550;
  const isVeryNarrow = containerWidth < 480;

  useEffect(() => {
    if (isNarrow) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isNarrow]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full w-full @container bg-white rounded-xl overflow-hidden border border-zinc-200/50"
    >
      <FinderToolbarSection
        title={activeLocation?.name || "Finder"}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        onGoBack={onGoBack}
        onGoForward={onGoForward}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        isNarrow={isNarrow}
        isVeryNarrow={isVeryNarrow}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="bg-white flex h-full finder-main min-h-0 flex-1 relative">
        {isNarrow && isSidebarOpen && (
          <div
            className="absolute inset-0 bg-black/10 z-10 transition-opacity duration-300 cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <FinderSidebarSection
          activeLocation={activeLocation}
          setActiveLocation={(item) => {
            setActiveLocation(item);
            if (isNarrow) {
              setIsSidebarOpen(false);
            }
          }}
          isSidebarOpen={isSidebarOpen}
          isNarrow={isNarrow}
        />
        <FinderFileListSection
          activeLocation={activeLocation}
          openItem={openItem}
          filteredChildren={filteredChildren}
        />
      </div>
    </div>
  );
};

export default FinderSection;
