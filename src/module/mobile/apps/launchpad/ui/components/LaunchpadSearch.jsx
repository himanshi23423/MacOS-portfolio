import { Search } from "lucide-react";

const LaunchpadSearch = ({ inputRef, searchQuery, onSearchChange }) => (
  <div
    onClick={(e) => e.stopPropagation()}
    className="w-64 relative mb-12 transform transition-all duration-200 shrink-0"
  >
    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
    <input
      ref={inputRef}
      type="text"
      placeholder="Search"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full bg-white/10 hover:bg-white/12 focus:bg-white/15 border border-white/10 rounded-[6px] pl-8.5 pr-4 py-1 text-[13px] text-white outline-none focus:border-white/20 placeholder-white/40 shadow-inner select-text transition-all text-center focus:text-left focus:placeholder-transparent"
    />
  </div>
);

export default LaunchpadSearch;
