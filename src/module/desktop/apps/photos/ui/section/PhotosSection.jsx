import { useState, useRef, useEffect } from "react";
import WindowControls from "@components/WindowControls";
import {
  Search,
  Plus,
  Share2,
  RotateCw,
  Trash2,
  Info,
  LayoutGrid,
  Rows3,
  SlidersHorizontal,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Mail,
  MessageSquare,
  Send,
  FileText,
  FolderPlus,
  PanelLeft,
} from "lucide-react";
import PhotosSidebarSection from "./PhotosSidebarSection";
import PhotosGridSection from "./PhotosGridSection";
import { photosLinks } from "@constants";
import PhotosViewerSection from "./PhotosViewerSection";

const PhotosSection = ({
  isMobile,
  filteredGallery,
  activeTab,
  onSelectPhoto,
  onSelectAlbum,

  // Extended controls
  zoomLevel,
  setZoomLevel,
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  selectedPhoto,
  showInfo,
  setShowInfo,
  onRotate,
  inAppViewerPhoto,
  setInAppViewerPhoto,
  onUpdateTitle,

  // History navigation
  canGoBack,
  canGoForward,
  onNavigate,
  onDoubleClick,
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
  const isVeryNarrow = containerWidth < 520;

  useEffect(() => {
    if (isNarrow) {
      setIsSidebarOpen(false);
      setShowInfo(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isNarrow]);

  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const shareDropdownRef = useRef(null);

  // Close share dropdown on clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (shareDropdownRef.current && !shareDropdownRef.current.contains(e.target)) {
        setShowShareDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const [toastMessage, setToastMessage] = useState("");

  const handleShareOption = (method) => {
    setToastMessage(`Shared "${selectedPhoto?.title || "Photo"}" successfully via ${method}!`);
    setShowShareDropdown(false);
    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  const currentIdx = filteredGallery.findIndex((p) => p.id === inAppViewerPhoto?.id);
  const handlePrevPhoto =
    currentIdx > 0 ? () => setInAppViewerPhoto(filteredGallery[currentIdx - 1]) : null;
  const handleNextPhoto =
    currentIdx < filteredGallery.length - 1
      ? () => setInAppViewerPhoto(filteredGallery[currentIdx + 1])
      : null;

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
          <WindowControls target="photos" />
          <h1
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: "#000",
              flex: 1,
              textAlign: "center",
            }}
          >
            Photos
          </h1>
          <Search size={20} className="text-blue-500" />
        </div>

        <div
          className="photos-main"
          style={{
            flex: 1,
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            background: "#f2f2f7",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <PhotosGridSection
            photos={filteredGallery}
            onSelectPhoto={onSelectPhoto}
            activeTab={activeTab}
            isMobile
          />
        </div>

        <PhotosSidebarSection
          albums={photosLinks}
          activeAlbum={activeTab}
          onSelectAlbum={onSelectAlbum}
          isMobile
        />
      </>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full w-full @container bg-white rounded-xl overflow-hidden select-none relative"
    >
      {/* macOS Photos Toolbar */}
      <div
        id="window-header"
        className="shrink-0 !bg-[#f5f5f5] !border-b-[#d4d4d4] !px-3 !py-1.5 flex flex-col gap-1 z-20"
      >
        {/* Top toolbar row */}
        <div className="flex items-center gap-3 w-full">
          <WindowControls target="photos" />
          {isNarrow && (
            <button
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="p-1 rounded hover:bg-black/5 transition-colors cursor-pointer text-gray-600"
              title="Toggle Sidebar"
            >
              <PanelLeft size={14} />
            </button>
          )}

          {/* Navigation controls */}
          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={() => onNavigate("back")}
              disabled={!canGoBack}
              className={`p-1.5 transition-colors rounded hover:bg-black/5 ${
                canGoBack ? "text-gray-600" : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => onNavigate("forward")}
              disabled={!canGoForward}
              className={`p-1.5 transition-colors rounded hover:bg-black/5 ${
                canGoForward ? "text-gray-600" : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Zoom Slider */}
          {!isVeryNarrow && (
            <div
              className="flex items-center gap-1.5 bg-[#e8e8e8]/50 px-2 py-0.5 rounded-md mr-2"
              onMouseDownCapture={(e) => e.stopPropagation()}
              onPointerDownCapture={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setZoomLevel((prev) => Math.max(1, prev - 1))}
                className="text-gray-400 hover:text-gray-600 transition-colors p-0.5 rounded cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut size={11} />
              </button>
              <input
                type="range"
                min="1"
                max="5"
                value={zoomLevel}
                onChange={(e) => setZoomLevel(Number(e.target.value))}
                className="w-16 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
                style={{ outline: "none" }}
                onMouseDown={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
              />
              <button
                onClick={() => setZoomLevel((prev) => Math.min(5, prev + 1))}
                className="text-gray-400 hover:text-gray-600 transition-colors p-0.5 rounded cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn size={11} />
              </button>
            </div>
          )}

          {/* Search Bar */}
          <div
            className="flex items-center gap-1.5 bg-[#e8e8e8] hover:bg-[#e0e0e0] border border-transparent focus-within:border-blue-400 focus-within:bg-white rounded-md px-2 py-0.5 transition-all w-44 cursor-text"
            onMouseDownCapture={(e) => e.stopPropagation()}
            onPointerDownCapture={(e) => e.stopPropagation()}
            onClick={(e) => e.currentTarget.querySelector("input")?.focus()}
          >
            <Search size={12} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search Photos"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-[11px] text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Bottom toolbar row with view controls */}
        <div className="flex items-center -mt-0.5 w-full">
          {/* Left: Spacer matching sidebar width, then Section Label */}
          {!isNarrow && isSidebarOpen && <div className="w-48 flex-shrink-0" />}

          <span className="text-[11px] font-bold text-gray-800 uppercase tracking-wide pl-2">
            {activeTab}
          </span>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Center: Segment control for view modes */}
          <div className="flex items-center bg-[#e8e8e8] rounded-md p-0.5 text-[10px] font-semibold">
            {["Years", "Months", "Days", "All Photos"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-0.5 rounded-sm transition-all ${
                  viewMode === mode
                    ? "bg-white text-gray-800 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right: Action buttons */}
          <div className="flex items-center gap-0.5 relative pr-2">
            <button
              onClick={onRotate}
              disabled={!selectedPhoto}
              className={`p-1 rounded transition-colors ${
                selectedPhoto
                  ? "hover:bg-black/5 text-gray-500"
                  : "text-gray-300 cursor-not-allowed"
              }`}
              title="Rotate 90°"
            >
              <RotateCw size={13} />
            </button>

            {/* Share dropdown launcher */}
            <div className="relative" ref={shareDropdownRef}>
              <button
                onClick={() => setShowShareDropdown(!showShareDropdown)}
                disabled={!selectedPhoto}
                className={`p-1 rounded transition-colors ${
                  selectedPhoto
                    ? "hover:bg-black/5 text-gray-500"
                    : "text-gray-300 cursor-not-allowed"
                }`}
                title="Share Photo"
              >
                <Share2 size={13} />
              </button>
              {showShareDropdown && (
                <div
                  className="absolute right-0 top-full mt-1 w-44 bg-white/95 backdrop-blur-md border border-gray-200 rounded-lg shadow-xl py-1 z-30 text-[12px] text-gray-700"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => handleShareOption("Mail")}
                    className="w-full text-left px-3 py-1.5 hover:bg-blue-500 hover:text-white flex items-center gap-2"
                  >
                    <Mail size={13} className="text-sky-500 group-hover:text-white" /> Mail
                  </button>
                  <button
                    onClick={() => handleShareOption("Messages")}
                    className="w-full text-left px-3 py-1.5 hover:bg-blue-500 hover:text-white flex items-center gap-2"
                  >
                    <MessageSquare size={13} className="text-green-500" /> Messages
                  </button>
                  <button
                    onClick={() => handleShareOption("AirDrop")}
                    className="w-full text-left px-3 py-1.5 hover:bg-blue-500 hover:text-white flex items-center gap-2"
                  >
                    <Send size={13} className="text-blue-500" /> AirDrop
                  </button>
                  <button
                    onClick={() => handleShareOption("Notes")}
                    className="w-full text-left px-3 py-1.5 hover:bg-blue-500 hover:text-white flex items-center gap-2"
                  >
                    <FileText size={13} className="text-yellow-500" /> Add to Notes
                  </button>
                  <div className="border-t border-gray-100 my-1" />
                  <button
                    onClick={() => handleShareOption("Shared Album")}
                    className="w-full text-left px-3 py-1.5 hover:bg-blue-500 hover:text-white flex items-center gap-2"
                  >
                    <FolderPlus size={13} className="text-purple-500" /> Add to Shared Album...
                  </button>
                </div>
              )}
            </div>

            {!isNarrow && (
              <button
                onClick={() => setShowInfo(!showInfo)}
                disabled={!selectedPhoto}
                className={`p-1 rounded transition-colors ${
                  selectedPhoto
                    ? `${showInfo ? "bg-blue-100 text-blue-600" : "hover:bg-black/5 text-gray-500"}`
                    : "text-gray-300 cursor-not-allowed"
                }`}
                title="Show Info"
              >
                <Info size={13} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-1 overflow-hidden photos-main bg-white relative">
        <div
          className={`flex-shrink-0 z-30 transition-all duration-300 relative h-full bg-[#f5f5f5]/80 border-r border-[#d4d4d4] flex flex-col ${
            isSidebarOpen ? "w-48 opacity-100" : "w-0 opacity-0 overflow-hidden pointer-events-none"
          }`}
        >
          <PhotosSidebarSection
            albums={photosLinks}
            activeAlbum={activeTab}
            onSelectAlbum={(album) => {
              onSelectAlbum(album);
              if (isNarrow) setIsSidebarOpen(false);
            }}
            isSidebarOpen={true}
          />
        </div>

        <PhotosGridSection
          photos={filteredGallery}
          onSelectPhoto={onSelectPhoto}
          activeTab={activeTab}
          zoomLevel={zoomLevel}
          viewMode={viewMode}
          selectedPhotoId={selectedPhoto?.id}
          onDoubleClick={onDoubleClick}
        />

        {/* Info Inspector Sidebar */}
        {showInfo && selectedPhoto && (
          <div className="w-60 flex-shrink-0 bg-[#f5f5f5]/90 backdrop-blur-md border-l border-[#d4d4d4] flex flex-col p-4 overflow-y-auto select-none">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Info</h3>
              <button
                onClick={() => setShowInfo(false)}
                className="text-gray-400 hover:text-gray-600 p-0.5 rounded-full hover:bg-gray-200 transition-all"
              >
                <X size={14} />
              </button>
            </div>

            {/* Editable Title */}
            <div className="mb-4">
              <label className="text-[9px] font-bold text-gray-400 uppercase">Title</label>
              <input
                type="text"
                value={selectedPhoto.title}
                onChange={(e) => onUpdateTitle(selectedPhoto.id, e.target.value)}
                onMouseDown={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
                className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1 font-semibold"
              />
            </div>

            {/* Metadata Fields */}
            <div className="space-y-3 border-t border-gray-200/80 pt-3 text-[11px]">
              <div>
                <span className="text-gray-400 font-medium block text-[9px] uppercase">
                  Date Taken
                </span>
                <span className="text-gray-700 font-semibold">{selectedPhoto.date}</span>
              </div>
              <div>
                <span className="text-gray-400 font-medium block text-[9px] uppercase">
                  Location
                </span>
                <span className="text-gray-700 font-semibold">{selectedPhoto.location}</span>
              </div>
              <div>
                <span className="text-gray-400 font-medium block text-[9px] uppercase">
                  Resolution & Size
                </span>
                <span className="text-gray-700 font-semibold">
                  {selectedPhoto.resolution} • {selectedPhoto.size}
                </span>
              </div>
            </div>

            {/* Camera EXIF Details */}
            <div className="mt-4 border-t border-gray-200/80 pt-3 text-[11px] space-y-1 bg-gray-200/30 p-2 rounded border border-gray-200">
              <div className="font-bold text-gray-800 flex items-center gap-1">
                <span>📷</span> {selectedPhoto.camera}
              </div>
              <div className="text-gray-500 font-medium">{selectedPhoto.lens}</div>
              <div className="text-[10px] text-gray-400 font-semibold flex gap-2 pt-0.5 border-t border-gray-200/50">
                <span>{selectedPhoto.exposure.split(" ")[0]}</span>
                <span>{selectedPhoto.exposure.split(" ")[1]}</span>
                <span>{selectedPhoto.exposure.split(" ")[2]}</span>
              </div>
            </div>

            {/* Map / Location pin */}
            <div className="mt-4 border-t border-gray-200/80 pt-3">
              <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1.5">
                Map Location
              </span>
              <div className="w-full h-24 rounded bg-sky-100/50 border border-sky-200 relative overflow-hidden flex flex-col items-center justify-center text-center p-1">
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(circle, #0284c7 1px, transparent 1px)",
                    backgroundSize: "8px 8px",
                  }}
                />
                <MapPin size={18} className="text-red-500 animate-pulse z-10" />
                <span className="text-[9px] text-sky-800 font-bold z-10 truncate w-full mt-1 bg-white/80 px-1 py-0.5 rounded">
                  {selectedPhoto.location}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* In-app detailed viewer lightbox */}
      {inAppViewerPhoto && (
        <PhotosViewerSection
          selectedPhoto={inAppViewerPhoto}
          onClose={() => setInAppViewerPhoto(null)}
          onPrev={handlePrevPhoto}
          onNext={handleNextPhoto}
        />
      )}
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white text-[12px] font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
            ✓
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default PhotosSection;
