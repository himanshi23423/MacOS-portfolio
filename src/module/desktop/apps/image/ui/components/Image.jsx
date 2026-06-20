"use client";
import "../styles/Image.css";
import windowWrapper from "@hoc/windowWrapper";
import useWindowsStore from "@store/window";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Heart,
  Download,
  X,
  Minus,
} from "lucide-react";
import PhotosAboutModal from "../../../photos/ui/components/PhotosAboutModal";

const WINDOW_KEY = "imgfile";

const ImageApp = () => {
  const {
    windows,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    favorites,
    toggleFavorite,
    setWindowData,
  } = useWindowsStore();

  const data = windows[WINDOW_KEY]?.data || {};
  const photos = data.photos || (data.imageUrl ? [data] : []);

  const [currentIndex, setCurrentIndex] = useState(() => data.currentIndex ?? 0);
  const [rotation, setRotation] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const [showAbout, setShowAbout] = useState(false);

  const handlePointerDown = (e) => {
    e.preventDefault();
    if (zoomScale <= 1) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - panOffset.x,
      y: e.clientY - panOffset.y,
    };
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;
    setPanOffset({ x: newX, y: newY });
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {
      // Ignored
    }
  };

  // Sync openAbout from window data
  useEffect(() => {
    if (data?.openAbout) {
      setShowAbout(true);
      setWindowData(WINDOW_KEY, { ...data, openAbout: false });
    }
  }, [data, setWindowData]);

  // Sync starting index when the window opens with new data
  useEffect(() => {
    if (data.currentIndex !== undefined) setCurrentIndex(data.currentIndex);
  }, [data.currentIndex, data]);

  // Reset view state on photo change
  useEffect(() => {
    setRotation(0);
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  }, [currentIndex]);

  // Keyboard navigation
  const handlePrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(photos.length - 1, i + 1));
  }, [photos.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (!windows[WINDOW_KEY]?.isOpen || windows[WINDOW_KEY]?.isMinimized) return;
      if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
      else if (e.key === "Escape") closeWindow(WINDOW_KEY);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlePrev, handleNext, closeWindow, windows]);

  const active = photos[currentIndex] || {};
  const { name = "Image", imageUrl = "", id, resolution = "" } = active;
  const isFavorite = id ? favorites.includes(id) : false;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  const handleRotate = () => setRotation((r) => (r + 90) % 360);
  const handleZoomIn = () => setZoomScale((s) => Math.min(4, parseFloat((s + 0.25).toFixed(2))));
  const handleZoomOut = () => {
    setZoomScale((s) => {
      const newScale = Math.max(0.25, parseFloat((s - 0.25).toFixed(2)));
      if (newScale <= 1) {
        setPanOffset({ x: 0, y: 0 });
      }
      return newScale;
    });
  };
  const handleZoomFit = () => {
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = name || "photo";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <div className="photos-preview-shell">
        {/* ── Toolbar / Title bar ──────────────────────────────── */}
        <div className="pp-toolbar window-header" id="window-header">
          {/* Traffic lights */}
          <div className="pp-trafficlights" onMouseDown={(e) => e.stopPropagation()}>
            <button
              className="pp-dot pp-dot-red"
              title="Close"
              onClick={() => closeWindow(WINDOW_KEY)}
            >
              <X size={7} strokeWidth={2.5} />
            </button>
            <button
              className="pp-dot pp-dot-yellow"
              title="Minimize"
              onClick={() => minimizeWindow(WINDOW_KEY)}
            >
              <Minus size={7} strokeWidth={2.5} />
            </button>
            <button
              className="pp-dot pp-dot-green"
              title="Fullscreen"
              onClick={() => toggleMaximize(WINDOW_KEY)}
            >
              <Minus size={7} strokeWidth={2.5} />
            </button>
          </div>

          {/* Center: filename + resolution */}
          <div className="pp-title">
            <span className="pp-filename">{name || "Preview"}</span>
            {resolution && <span className="pp-resolution">— {resolution}</span>}
          </div>

          {/* Right: image tools */}
          <div className="pp-tools" onMouseDown={(e) => e.stopPropagation()}>
            {/* Nav prev/next segment */}
            {photos.length > 1 && (
              <div className="pp-nav-segment">
                <button
                  className="pp-tool-btn"
                  onClick={handlePrev}
                  disabled={!hasPrev}
                  title="Previous (←)"
                >
                  <ChevronLeft size={14} strokeWidth={2} />
                </button>
                <span className="pp-nav-sep" />
                <button
                  className="pp-tool-btn"
                  onClick={handleNext}
                  disabled={!hasNext}
                  title="Next (→)"
                >
                  <ChevronRight size={14} strokeWidth={2} />
                </button>
              </div>
            )}

            <span className="pp-tool-divider" />

            {/* Rotate */}
            <button className="pp-tool-btn" onClick={handleRotate} title="Rotate 90°">
              <RotateCw size={13} strokeWidth={2} />
            </button>

            <span className="pp-tool-divider" />

            {/* Zoom out */}
            <button
              className="pp-tool-btn"
              onClick={handleZoomOut}
              disabled={zoomScale <= 0.25}
              title="Zoom Out"
            >
              <ZoomOut size={13} strokeWidth={2} />
            </button>

            {/* Zoom reset */}
            <button className="pp-zoom-label" onClick={handleZoomFit} title="Reset Zoom">
              {Math.round(zoomScale * 100)}%
            </button>

            {/* Zoom in */}
            <button
              className="pp-tool-btn"
              onClick={handleZoomIn}
              disabled={zoomScale >= 4}
              title="Zoom In"
            >
              <ZoomIn size={13} strokeWidth={2} />
            </button>

            <span className="pp-tool-divider" />

            {/* Favorite */}
            {id && (
              <button
                className="pp-tool-btn"
                onClick={() => toggleFavorite(id)}
                title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              >
                <Heart
                  size={13}
                  strokeWidth={2}
                  className={isFavorite ? "pp-heart-active" : ""}
                  style={isFavorite ? { fill: "#ff3b30", color: "#ff3b30" } : {}}
                />
              </button>
            )}

            {/* Download */}
            <button className="pp-tool-btn" onClick={handleDownload} title="Save Image">
              <Download size={13} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div
          className="pp-canvas select-none"
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onDragStart={(e) => e.preventDefault()}
          style={{
            cursor: zoomScale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
            touchAction: "none",
            userSelect: "none",
          }}
        >
          {imageUrl ? (
            <div
              className="pp-image-wrap"
              onDragStart={(e) => e.preventDefault()}
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) rotate(${rotation}deg) scale(${zoomScale})`,
                transition: isDragging
                  ? "none"
                  : "transform 0.25s cubic-bezier(0.25,0.46,0.45,0.94)",
              }}
            >
              <img
                src={imageUrl}
                alt={name}
                className="pp-image"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
          ) : (
            <div className="pp-empty">No Image Loaded</div>
          )}
        </div>

        {/* ── Bottom filmstrip (when multiple photos) ───────────── */}
        {photos.length > 1 && (
          <div className="pp-filmstrip">
            {photos.map((p, i) => (
              <button
                key={p.id ?? i}
                className={`pp-film-thumb${i === currentIndex ? " pp-film-active" : ""}`}
                onClick={() => setCurrentIndex(i)}
                title={p.name}
              >
                <img src={p.imageUrl} alt={p.name} draggable={false} />
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Photos About Dialog */}
      <PhotosAboutModal show={showAbout} onClose={() => setShowAbout(false)} />
    </>
  );
};

const ImageWindow = windowWrapper(ImageApp, WINDOW_KEY);
export default ImageWindow;
