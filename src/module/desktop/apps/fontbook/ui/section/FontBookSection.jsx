import React, { useState, useEffect, useRef } from "react";
import { Type, Search, PanelLeft } from "lucide-react";
import WindowControls from "@components/WindowControls";
import FontBookSidebarSection from "./FontBookSidebarSection";
import FontBookGallerySection from "./FontBookGallerySection";
import useWindowsStore from "@store/window";

const FontBookSection = ({
  fonts,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  googleFontInput,
  setGoogleFontInput,
  handleInstallFont,
  filteredFonts,
  activeFont,
  setActiveFont,
  fontSize,
  setFontSize,
  isBold,
  setIsBold,
  isItalic,
  setIsItalic,
  specimenText,
  setSpecimenText,
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

  const isNarrow = containerWidth < 650;

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
      className="flex flex-col h-full w-full bg-white text-gray-800 font-sans select-none rounded-xl overflow-hidden shadow-2xl border border-zinc-200/80"
    >
      <div
        id="window-header"
        className="shrink-0 bg-[#f3f3f3] border-b border-zinc-200 px-4 py-2 flex items-center justify-between text-xs text-gray-600 gap-4"
      >
        <div className="flex items-center gap-2">
          <WindowControls target="font" />
          {isNarrow && (
            <button
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="p-1 rounded hover:bg-zinc-200 transition-colors ml-1 cursor-pointer text-gray-700 flex items-center justify-center active:scale-95"
              title="Toggle Sidebar"
            >
              <PanelLeft className="w-4 h-4" />
            </button>
          )}
          {!isNarrow && (
            <span className="font-semibold pl-4 flex items-center gap-1.5">
              <Type size={14} className="text-indigo-600" /> Font Book
            </span>
          )}
        </div>

        <div
          className={`${isNarrow ? "w-40" : "w-64"} max-w-xs relative flex items-center transition-all duration-200`}
        >
          <input
            type="text"
            placeholder="Search fonts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onMouseDown={(e) => {
              e.stopPropagation();
              useWindowsStore.getState().focusWindow("font");
              e.currentTarget.focus();
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              useWindowsStore.getState().focusWindow("font");
              e.currentTarget.focus();
            }}
            className="w-full bg-white border border-zinc-300 rounded-lg pl-8 pr-3 py-1 text-xs text-gray-800 outline-none focus:border-indigo-500 shadow-inner select-text"
          />
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="w-16 flex justify-end">
          <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded font-bold">
            FONTS
          </span>
        </div>
      </div>

      <div className="flex-1 flex min-h-0 relative bg-white">
        {isNarrow && isSidebarOpen && (
          <div
            className="absolute inset-0 bg-black/15 z-10 transition-opacity duration-300 cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <FontBookSidebarSection
          fonts={fonts}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            if (isNarrow) {
              setIsSidebarOpen(false);
            }
          }}
          googleFontInput={googleFontInput}
          onGoogleFontInputChange={setGoogleFontInput}
          onInstallFont={handleInstallFont}
          isSidebarOpen={isSidebarOpen}
          isNarrow={isNarrow}
        />
        <FontBookGallerySection
          filteredFonts={filteredFonts}
          activeFont={activeFont}
          setActiveFont={setActiveFont}
          fontSize={fontSize}
          setFontSize={setFontSize}
          isBold={isBold}
          setIsBold={setIsBold}
          isItalic={isItalic}
          setIsItalic={setIsItalic}
          specimenText={specimenText}
          setSpecimenText={setSpecimenText}
        />
      </div>
    </div>
  );
};

export default FontBookSection;
