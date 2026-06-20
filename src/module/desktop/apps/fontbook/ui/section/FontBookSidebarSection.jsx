import clsx from "clsx";
import { Plus } from "lucide-react";

const CATEGORIES = [
  "All Fonts",
  "Sans-Serif",
  "Serif",
  "Monospaced",
  "Handwriting",
  "Retro/Display",
  "Google Fonts",
];

const FontBookSidebarSection = ({
  fonts = [],
  activeCategory,
  onSelectCategory,
  googleFontInput,
  onGoogleFontInputChange,
  onInstallFont,
  isSidebarOpen,
  isNarrow,
}) => (
  <div
    className={clsx(
      "bg-[#f8f9fa] border-r border-zinc-200 flex flex-col shrink-0 min-w-0 transition-all duration-300 h-full z-20",
      isNarrow ? "absolute shadow-lg" : "relative",
      isNarrow && !isSidebarOpen
        ? "-translate-x-full w-0 overflow-hidden opacity-0"
        : "translate-x-0 w-48",
    )}
  >
    <div className="p-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 border-b border-zinc-200">
      Collections
    </div>

    <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5">
      {CATEGORIES.map((cat) => {
        const count =
          cat === "All Fonts" ? fonts.length : fonts.filter((f) => f.category === cat).length;
        return (
          <div
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg cursor-pointer text-xs transition-colors ${
              activeCategory === cat
                ? "bg-indigo-600 text-white font-semibold"
                : "text-gray-700 hover:bg-gray-200/60"
            }`}
          >
            <span className="truncate">{cat}</span>
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded-full ${activeCategory === cat ? "bg-indigo-700 text-indigo-100" : "bg-zinc-200 text-zinc-500"}`}
            >
              {count}
            </span>
          </div>
        );
      })}
    </div>

    <div className="p-3 border-t border-zinc-200 bg-gray-50">
      <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
        Load Google Font
      </span>
      <div className="flex gap-1.5 items-center">
        <input
          type="text"
          placeholder="e.g. Lobster"
          value={googleFontInput}
          onChange={(e) => onGoogleFontInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onInstallFont();
          }}
          className="flex-1 min-w-0 bg-white border border-zinc-300 rounded px-2 py-1 text-[11px] text-gray-800 outline-none focus:border-indigo-500 select-text"
        />
        <button
          onClick={onInstallFont}
          className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white p-1 rounded transition-colors active:scale-95 cursor-pointer"
          title="Install Font"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  </div>
);

export default FontBookSidebarSection;
