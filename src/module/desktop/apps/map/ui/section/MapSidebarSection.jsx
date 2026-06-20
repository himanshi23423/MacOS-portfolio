import { Search } from "lucide-react";
import InfoPanel from "../components/InfoPanel";
import clsx from "clsx";

const MapSidebarSection = ({
  searchQuery,
  onSearchChange,
  _searchResults,
  _onSelectResult,
  isSidebarOpen,
  setIsSidebarOpen,
  isNarrow,
  activeTab,
  setActiveTab,
  activeKey,
  setActiveKey,
  setZoomLevel,
  currentCity,
  customPlace,
  filteredKeys,
  handleSearch,
}) => {
  return (
    <div
      className={clsx(
        "bg-[#fbfbfb] border-r border-zinc-200 flex flex-col shrink-0 min-w-0 h-full z-20 transition-all duration-300",
        isNarrow ? "absolute bg-[#fbfbfb]/95 shadow-lg" : "relative",
        !isSidebarOpen ? "-translate-x-full w-0 overflow-hidden opacity-0" : "translate-x-0 w-60",
      )}
    >
      <div className="flex items-center p-2 border-b border-zinc-200">
        <div className="flex-1 relative">
          <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search places..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full bg-white border border-zinc-300 rounded-lg pl-7 pr-2 py-1 text-xs outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <InfoPanel
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        setZoomLevel={setZoomLevel}
        currentCity={currentCity}
        customPlace={customPlace}
        filteredKeys={filteredKeys}
        searchQuery={searchQuery}
        isNarrow={isNarrow}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </div>
  );
};

export default MapSidebarSection;
