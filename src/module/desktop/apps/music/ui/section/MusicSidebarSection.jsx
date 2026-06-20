import clsx from "clsx";
import { Disc, Compass, Music as MusicIcon, Library } from "lucide-react";

const SECTIONS = [
  {
    label: "Apple Music",
    items: [
      { name: "Listen Now", icon: Disc },
      { name: "Browse", icon: Compass },
    ],
  },
  {
    label: "Categories",
    items: [
      { name: "Hindi Music", icon: MusicIcon },
      { name: "English Music", icon: MusicIcon },
    ],
  },
  {
    label: "Library",
    items: [
      { name: "Recently Added", icon: Library },
      { name: "Artists", icon: Library },
      { name: "Albums", icon: Library },
      { name: "Songs", icon: Library },
    ],
  },
];

const MusicSidebarSection = ({
  activeCategory,
  setActiveCategory,
  isSidebarOpen,
  isPlaying,
  isNarrow,
}) => {
  return (
    <div
      className={clsx(
        "bg-[#f9f9fb] border-r border-zinc-200 flex flex-col shrink-0 min-w-0 overflow-y-auto transition-all duration-300 h-full z-20",
        isNarrow ? "absolute shadow-lg" : "relative",
        isNarrow && !isSidebarOpen
          ? "-translate-x-full w-0 overflow-hidden opacity-0"
          : "translate-x-0 w-48",
      )}
    >
      {SECTIONS.map((section, idx) => (
        <div key={section.label}>
          {idx > 0 && (
            <div className="p-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-4">
              {section.label}
            </div>
          )}
          {idx === 0 && (
            <div className="p-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              {section.label}
            </div>
          )}
          <div className="px-1.5 space-y-0.5">
            {section.items.map((item) => (
              <div
                key={item.name}
                onClick={() => setActiveCategory(item.name)}
                className={`flex items-center gap-2.5 py-1.5 px-3 rounded-lg cursor-pointer text-xs font-medium transition-colors ${
                  activeCategory === item.name
                    ? "bg-red-50 text-red-600"
                    : "text-gray-700 hover:bg-gray-200/60"
                }`}
              >
                <item.icon
                  size={15}
                  className={activeCategory === item.name ? "text-red-500" : "text-gray-400"}
                />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="p-3 border-t border-zinc-200 bg-gray-50 flex flex-col gap-2.5 select-none mt-auto">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
            Visualizer
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-red-500 animate-pulse" : "bg-zinc-300"}`}
          />
        </div>
        <div className="flex items-end justify-between h-9 px-2 gap-1.5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((bar) => (
            <div
              key={bar}
              className="flex-1 bg-red-500 rounded-t-sm transition-all duration-300"
              style={{
                height: "100%",
                transformOrigin: "bottom",
                transform: isPlaying ? "none" : "scaleY(0.2)",
                animationName: isPlaying ? "bounceVisualizer" : "none",
                animationDuration: isPlaying ? `${0.5 + ((bar * 7) % 10) * 0.08}s` : "0s",
                animationIterationCount: isPlaying ? "infinite" : "1",
                animationTimingFunction: isPlaying ? "ease-in-out" : "ease",
                animationDelay: `${bar * 100}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicSidebarSection;
