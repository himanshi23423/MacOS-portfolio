import useWindowsStore from "@store/window";
import { useMemo } from "react";

const BARS = [
  { h: 40, d: "0.9s" },
  { h: 104, d: "0.87s" },
  { h: 44, d: "0.84s" },
  { h: 79, d: "0.81s" },
  { h: 66, d: "0.78s" },
  { h: 71, d: "0.75s" },
  { h: 83, d: "0.72s" },
  { h: 51, d: "0.69s" },
  { h: 86, d: "0.66s" },
  { h: 72, d: "0.63s" },
  { h: 41, d: "0.6s" },
  { h: 52, d: "0.57s" },
  { h: 97, d: "0.54s" },
  { h: 40, d: "0.51s" },
  { h: 52, d: "0.48s" },
  { h: 70, d: "0.45s" },
  { h: 104, d: "0.42s" },
  { h: 70, d: "0.39s" },
  { h: 85, d: "0.36s" },
  { h: 62, d: "0.33s" },
  { h: 93, d: "0.3s" },
  { h: 78, d: "0.27s" },
  { h: 86, d: "0.24s" },
  { h: 80, d: "0.21s" },
  { h: 100, d: "0.18s" },
  { h: 86, d: "0.15s" },
  { h: 75, d: "0.12s" },
  { h: 109, d: "0.09s" },
  { h: 98, d: "0.06s" },
  { h: 80, d: "0.03s" },
  { h: 108, d: "0s" },
  { h: 90, d: "0.03s" },
  { h: 59, d: "0.06s" },
  { h: 69, d: "0.09s" },
  { h: 54, d: "0.12s" },
  { h: 80, d: "0.15s" },
  { h: 108, d: "0.18s" },
  { h: 104, d: "0.21s" },
  { h: 77, d: "0.24s" },
  { h: 56, d: "0.27s" },
  { h: 68, d: "0.3s" },
  { h: 44, d: "0.33s" },
  { h: 78, d: "0.36s" },
  { h: 94, d: "0.39s" },
  { h: 61, d: "0.42s" },
  { h: 95, d: "0.45s" },
  { h: 59, d: "0.48s" },
  { h: 75, d: "0.51s" },
  { h: 49, d: "0.54s" },
  { h: 48, d: "0.57s" },
  { h: 61, d: "0.6s" },
  { h: 48, d: "0.63s" },
  { h: 53, d: "0.66s" },
  { h: 71, d: "0.69s" },
  { h: 81, d: "0.72s" },
  { h: 48, d: "0.75s" },
  { h: 76, d: "0.78s" },
  { h: 94, d: "0.81s" },
  { h: 88, d: "0.84s" },
  { h: 97, d: "0.87s" },
];

const DockVisualizer = () => {
  const { windows, music, isDockHiddenByCollision } = useWindowsStore();
  const isPlaying = music?.isPlaying;

  const isAnyWindowMaximized = useMemo(() => {
    return Object.values(windows).some((win) => win.isOpen && win.isMaximized && !win.isMinimized);
  }, [windows]);

  return (
    <div
      className={`desktop-visualizer-container ${
        isPlaying && !isAnyWindowMaximized && !isDockHiddenByCollision ? "active" : ""
      }`}
    >
      <style>{`
        @keyframes desktop-eq {
          0% { height: 10px; opacity: 0.3; }
          50% { height: var(--bar-height, 100px); opacity: 1; }
          100% { height: 20px; opacity: 0.5; }
        }
        .mask-image-fade {
          /* Fades the edges of the waveform so it blends into the wallpaper */
          mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
        }
      `}</style>
      {BARS.map((bar, i) => (
        <div
          key={i}
          className="w-2 md:w-3 bg-white/80 rounded-t-full origin-bottom transition-all duration-300 "
          style={{
            "--bar-height": `${bar.h}px`,
            animation: isPlaying
              ? `1s ease-in-out ${bar.d} infinite alternate none running desktop-eq`
              : "none",
          }}
        />
      ))}
    </div>
  );
};

export default DockVisualizer;
