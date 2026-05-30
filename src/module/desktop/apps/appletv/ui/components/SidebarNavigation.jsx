import { Film, FolderHeart, Play, Search, ShoppingBag, Tv } from "lucide-react";

const appleTvItems = [
  { id: "watchNow", label: "Watch Now", icon: Play, color: "text-orange-500 fill-orange-500" },
  { id: "tvPlus", label: "Apple TV+", icon: Tv, color: "text-gray-800" },
  { id: "store", label: "Store", icon: ShoppingBag, color: "text-blue-500" },
];

const libraryItems = [
  { id: "library", label: "Movies", icon: Film, color: "text-emerald-500" },
  { id: "favorites", label: "Up Next", icon: FolderHeart, color: "text-rose-500 fill-rose-500" },
];

const NavigationGroup = ({ title, items, activeTab, onSelect }) => (
  <div className="space-y-1">
    <h3 className="text-[10px] font-bold text-gray-400/90 uppercase tracking-wider px-3 mb-1">
      {title}
    </h3>
    <nav className="space-y-0.5">
      {items.map(({ id, label, icon: Icon, color }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium text-left transition-all ${
            activeTab === id
              ? "bg-gray-200/90 text-gray-900 shadow-sm font-semibold"
              : "text-gray-600 hover:bg-gray-200/50 hover:text-gray-900"
          }`}
        >
          <Icon className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-105 ${color}`} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  </div>
);

const SidebarNavigation = ({
  activeTab,
  searchQuery,
  isSidebarOpen,
  onSearch,
  onSelectTab,
  isCompact,
}) => (
  <aside
    className={`
      ${isCompact ? "absolute" : "relative"} inset-y-0 left-0 w-48 bg-gray-50/90 backdrop-blur-md border-r border-gray-300/40 p-4 space-y-6 flex flex-col z-30 transition-transform duration-300 h-full
      ${isSidebarOpen || !isCompact ? "translate-x-0" : "-translate-x-full"}
    `}
  >
    {/* macOS Search bar styling */}
    <div className="relative flex items-center bg-gray-200/50 border border-gray-300/20 rounded-lg px-2.5 py-1.5 focus-within:ring-2 focus-within:ring-blue-500/40 focus-within:bg-white transition-all shadow-inner">
      <Search className="w-3.5 h-3.5 text-gray-400 mr-2 shrink-0" />
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(event) => onSearch(event.target.value)}
        className="w-full bg-transparent text-xs focus:outline-none border-none outline-none text-gray-800 placeholder-gray-400 font-medium"
      />
    </div>

    <div className="space-y-5">
      <NavigationGroup
        title="Apple TV"
        items={appleTvItems}
        activeTab={activeTab}
        onSelect={onSelectTab}
      />
      <NavigationGroup
        title="Library"
        items={libraryItems}
        activeTab={activeTab}
        onSelect={onSelectTab}
      />
    </div>
  </aside>
);

export default SidebarNavigation;

