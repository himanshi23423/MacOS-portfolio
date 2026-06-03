import useWindowsStore from "@store/window";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";

const WindowControls = ({ target }) => {
  const { closeWindow, toggleMaximize, minimizeWindow } = useWindowsStore();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <button
        onClick={() => closeWindow(target)}
        style={{
          border: "none",
          background: "none",
          color: "#000",
          display: "flex",
          alignItems: "center",
          gap: 2,
          fontSize: 14,
          fontWeight: 500,
          padding: "4px 0",
          cursor: "pointer",
        }}
      >
        <ChevronLeft size={16} />
        <span>Back</span>
      </button>
    );
  }

  return (
    <div id="window-controls">
      <div className="close" onClick={() => closeWindow(target)} />
      <div className="minimize" onClick={() => toggleMaximize(target)} title="Zoom" />
      <div className="maximize" onClick={() => minimizeWindow(target)} title="Minimize" />
    </div>
  );
};

export default WindowControls;
