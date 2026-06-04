import useWindowsStore from "@store/window";
import { ChevronLeft, ChevronRight, Home, Maximize2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const AssistiveTouch = () => {
  const { closeWindow, windows } = useWindowsStore();
  const [position, setPosition] = useState({ x: 280, y: 500 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  useEffect(() => {
    // Initialize AssistiveTouch position on client-side
    if (typeof window !== "undefined") {
      setPosition({ x: window.innerWidth - 65, y: window.innerHeight - 170 });
    }
  }, []);

  // AssistiveTouch Drag/Pointer Handlers
  const handlePointerDown = (e) => {
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    isDragging.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    isDragging.current = true;
    const nextX = e.clientX - dragStart.current.x;
    const nextY = e.clientY - dragStart.current.y;
    const maxX = window.innerWidth - 55;
    const maxY = window.innerHeight - 55;
    setPosition({
      x: Math.max(10, Math.min(maxX, nextX)),
      y: Math.max(10, Math.min(maxY, nextY)),
    });
  };

  const handlePointerUp = (e) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (!isDragging.current) {
      setIsMenuOpen((prev) => !prev);
    }
  };

  // Helper to find currently active window
  const getActiveWindowKey = () => {
    let activeKey = null;
    let maxZ = -1;
    Object.entries(windows).forEach(([key, win]) => {
      if (win.isOpen && !win.isMinimized && win.zIndex > maxZ) {
        maxZ = win.zIndex;
        activeKey = key;
      }
    });
    return activeKey;
  };

  const handleHomeAction = () => {
    Object.keys(windows).forEach((key) => {
      closeWindow(key);
    });
    setIsMenuOpen(false);
  };

  const handleFullscreenAction = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => console.log(err));
    } else {
      document.exitFullscreen().catch((err) => console.log(err));
    }
    setIsMenuOpen(false);
  };

  const handleBackAction = () => {
    const activeApp = getActiveWindowKey();
    if (activeApp) {
      const appsWithBackListener = ["finder", "chrome", "notes", "appstore", "settings"];
      if (!appsWithBackListener.includes(activeApp)) {
        closeWindow(activeApp);
      } else {
        // Dispatch app-specific back navigation event
        const event = new CustomEvent("app-navigate-back", { detail: { app: activeApp } });
        window.dispatchEvent(event);
      }
    } else {
      window.history.back();
    }
    setIsMenuOpen(false);
  };

  const handleForwardAction = () => {
    const activeApp = getActiveWindowKey();
    if (activeApp) {
      // Dispatch app-specific forward navigation event
      const event = new CustomEvent("app-navigate-forward", { detail: { app: activeApp } });
      window.dispatchEvent(event);
    } else {
      window.history.forward();
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* AssistiveTouch Ball */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          touchAction: "none",
        }}
        className="w-12 h-12 rounded-full bg-black/45 backdrop-blur-md border-[2.5px] border-white/20 shadow-lg cursor-pointer flex items-center justify-center z-[99999] transition-opacity hover:bg-black/60 active:scale-95"
      >
        <div className="w-6 h-6 rounded-full bg-white/35 border-[1.5px] border-white/40 flex items-center justify-center shadow-inner">
          <div className="w-3.5 h-3.5 rounded-full bg-white/70 shadow-sm" />
        </div>
      </div>

      {/* AssistiveTouch expanded menu overlay */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/15 z-[99998] flex items-center justify-center"
        >
          {/* Menu Panel */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1c1c1e]/95 backdrop-blur-2xl p-4.5 w-[205px] h-[205px] rounded-[32px] border border-white/10 shadow-2xl grid grid-cols-2 gap-y-4 gap-x-2 items-center justify-center text-white z-[99999]"
          >
            {/* 1. Backward */}
            <button
              onClick={handleBackAction}
              className="flex flex-col items-center group active:scale-90 transition-transform"
            >
              <div className="w-11 h-11 rounded-full bg-white/10 group-hover:bg-white/15 flex items-center justify-center mb-1 text-white shadow-sm">
                <ChevronLeft size={20} strokeWidth={2.2} />
              </div>
              <span className="text-[9.5px] text-white/75 font-medium tracking-wide">Back</span>
            </button>

            {/* 2. Forward */}
            <button
              onClick={handleForwardAction}
              className="flex flex-col items-center group active:scale-90 transition-transform"
            >
              <div className="w-11 h-11 rounded-full bg-white/10 group-hover:bg-white/15 flex items-center justify-center mb-1 text-white shadow-sm">
                <ChevronRight size={20} strokeWidth={2.2} />
              </div>
              <span className="text-[9.5px] text-white/75 font-medium tracking-wide">Forward</span>
            </button>

            {/* 3. Fullscreen */}
            <button
              onClick={handleFullscreenAction}
              className="flex flex-col items-center group active:scale-90 transition-transform"
            >
              <div className="w-11 h-11 rounded-full bg-white/10 group-hover:bg-white/15 flex items-center justify-center mb-1 text-white shadow-sm">
                <Maximize2 size={17} strokeWidth={2.2} />
              </div>
              <span className="text-[9.5px] text-white/75 font-medium tracking-wide">
                Fullscreen
              </span>
            </button>

            {/* 4. Home */}
            <button
              onClick={handleHomeAction}
              className="flex flex-col items-center group active:scale-90 transition-transform"
            >
              <div className="w-11 h-11 rounded-full bg-white/10 group-hover:bg-white/15 flex items-center justify-center mb-1 text-white shadow-sm">
                <Home size={17} strokeWidth={2.2} />
              </div>
              <span className="text-[9.5px] text-white/75 font-medium tracking-wide">Home</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AssistiveTouch;
