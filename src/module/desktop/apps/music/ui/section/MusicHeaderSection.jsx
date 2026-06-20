import { useEffect } from "react";
import WindowControls from "@components/WindowControls";
import { Search, PanelLeft } from "lucide-react";

const MusicHeaderSection = ({
  searchQuery,
  onSearchChange,
  onToggleSidebar,
  isNarrow,
  searchInputRef,
  _onFocusWindow,
}) => {
  useEffect(() => {
    const input = searchInputRef.current;
    if (!input) return;

    const stopPropagation = (e) => {
      e.stopPropagation();
    };

    input.addEventListener("mousedown", stopPropagation);
    input.addEventListener("pointerdown", stopPropagation);
    input.addEventListener("click", stopPropagation);

    return () => {
      input.removeEventListener("mousedown", stopPropagation);
      input.removeEventListener("pointerdown", stopPropagation);
      input.removeEventListener("click", stopPropagation);
    };
  }, [searchInputRef]);

  return (
    <div
      id="window-header"
      className="shrink-0 bg-[#f4f4f6] border-b border-zinc-200 px-4 py-2 flex items-center justify-between text-xs text-gray-600 gap-4"
    >
      <div className="flex items-center gap-2">
        <WindowControls target="music" />
        {isNarrow && (
          <button
            onClick={onToggleSidebar}
            className="p-1 rounded hover:bg-zinc-200 transition-colors ml-1 cursor-pointer text-gray-700 flex items-center justify-center active:scale-95"
            title="Toggle Sidebar"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        )}
        {!isNarrow && (
          <span className="font-bold text-gray-700 flex pl-4 items-center gap-1.5">
            <span className="text-red-500 text-lg leading-none">♪</span> Music
          </span>
        )}
      </div>
      <div
        className={`${isNarrow ? "w-40" : "w-56"} relative flex items-center transition-all duration-200`}
      >
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search songs, artists..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-white border border-zinc-300 rounded-lg pl-8 pr-3 py-1 text-xs text-gray-800 outline-none focus:border-red-500 shadow-inner select-text"
        />
        <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
      <div className="w-14 flex justify-end">
        <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
          Hifi
        </span>
      </div>
    </div>
  );
};

export default MusicHeaderSection;
