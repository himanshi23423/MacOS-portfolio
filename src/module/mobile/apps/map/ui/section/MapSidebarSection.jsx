import { Search, X } from "lucide-react";
import InfoPanel from "../components/InfoPanel";

const MapSidebarSection = ({
  searchQuery,
  onSearchChange,
  searchResults,
  onSelectResult,
  isSidebarOpen,
  onToggleSidebar,
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
  if (!isSidebarOpen) return null;

  return (
    <div className="w-60 bg-[#fbfbfb] border-r border-zinc-200 flex flex-col shrink-0 min-w-0">
      <div className="flex items-center gap-1 p-2 border-b border-zinc-200">
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
        <button onClick={onToggleSidebar} className="p-1 hover:bg-gray-200 rounded">
          <X size={14} className="text-gray-400" />
        </button>
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
      />
    </div>
  );
};

export default MapSidebarSection;
