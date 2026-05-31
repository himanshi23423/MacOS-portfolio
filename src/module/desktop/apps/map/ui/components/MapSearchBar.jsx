import { Search } from "lucide-react";
import useWindowsStore from "@store/window";

const MapSearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => (
  <div className="w-64 max-w-xs relative flex items-center">
    <input
      type="text"
      placeholder="Search city (e.g. Paris, Tokyo)..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onMouseDown={(e) => {
        e.stopPropagation();
        useWindowsStore.getState().focusWindow("map");
        e.currentTarget.focus();
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        useWindowsStore.getState().focusWindow("map");
        e.currentTarget.focus();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
      }}
      className="w-full bg-white border border-zinc-300 rounded-lg pl-8 pr-8 py-1 text-xs text-gray-800 outline-none focus:border-blue-500 shadow-inner select-text"
    />
    <Search
      onClick={handleSearch}
      className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 cursor-pointer"
    />
  </div>
);

export default MapSearchBar;
