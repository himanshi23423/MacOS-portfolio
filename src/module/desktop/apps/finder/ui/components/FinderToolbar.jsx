import WindowControls from "@components/WindowControls";
import { Search, ChevronLeft, ChevronRight, PanelLeft } from "lucide-react";

const FinderToolbar = ({
  title,
  canGoBack,
  canGoForward,
  onGoBack,
  onGoForward,
  searchQuery,
  onSearchChange,
  isNarrow,
  isVeryNarrow,
  isSidebarOpen,
  onToggleSidebar,
}) => (
  <div
    id="window-header"
    className="bg-[#f3f3f3]! border-b-[#d1d1d6]! px-4 py-2 flex items-center justify-between shrink-0 text-gray-600 gap-4"
  >
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <WindowControls target="finder" />
        {isNarrow && (
          <button
            onClick={onToggleSidebar}
            className="p-1 rounded hover:bg-zinc-200 transition-colors ml-1 cursor-pointer text-gray-700"
            title="Toggle Sidebar List"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center gap-1">
        <button
          onClick={onGoBack}
          disabled={!canGoBack}
          className={`p-1 rounded cursor-pointer transition-colors ${canGoBack ? "hover:bg-zinc-200 text-gray-700 active:scale-95" : "text-gray-300 pointer-events-none"}`}
          title="Back"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={onGoForward}
          disabled={!canGoForward}
          className={`p-1 rounded cursor-pointer transition-colors ${canGoForward ? "hover:bg-zinc-200 text-gray-700 active:scale-95" : "text-gray-300 pointer-events-none"}`}
          title="Forward"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>

    {/* Center Title */}
    {!isVeryNarrow && (
      <div className="flex-1 text-center font-bold text-gray-700 text-xs truncate">{title}</div>
    )}

    {/* Search Input */}
    {!isVeryNarrow && (
      <div
        className="w-48 relative flex items-center bg-zinc-200/50 border border-zinc-300/30 rounded-md px-2 py-0.5 cursor-text"
        onMouseDownCapture={(e) => e.stopPropagation()}
        onPointerDownCapture={(e) => e.stopPropagation()}
        onClick={(e) => e.currentTarget.querySelector("input")?.focus()}
      >
        <Search className="w-3.5 h-3.5 text-gray-400 mr-1.5 shrink-0" />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-transparent border-none outline-none text-xs text-gray-800 placeholder-gray-400 select-text"
        />
      </div>
    )}
  </div>
);

export default FinderToolbar;
