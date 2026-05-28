import { Film, FolderHeart, Play, Search, ShoppingBag, Tv } from "lucide-react";

const appleTvItems = [
  { id: "watchNow", label: "Watch Now", icon: Play },
  { id: "tvPlus", label: "Apple TV+", icon: Tv },
  { id: "store", label: "Store", icon: ShoppingBag },
];

const libraryItems = [
  { id: "library", label: "Movies", icon: Film },
  { id: "favorites", label: "Up Next", icon: FolderHeart },
];

const NavigationGroup = ({ title, items, activeTab, onSelect }) => (
  <div>
    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-1.5">
      {title}
    </h3>
    <nav className="space-y-0.5">
      {items.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left transition-colors ${
            activeTab === id
              ? "bg-gray-200 text-gray-900 shadow-sm"
              : "text-gray-600 hover:bg-gray-200/60 hover:text-gray-900"
          }`}
        >
          <Icon className={`w-3.5 h-3.5 ${id === "watchNow" ? "fill-current" : ""}`} />
          {label}
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
}) => (
  <aside
    className={`
      absolute sm:relative inset-y-0 left-0 w-48 bg-gray-50 border-r border-[#d1d1d1] p-4 space-y-6 flex flex-col z-30 transition-transform duration-300
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
    `}
  >
    <div className="relative flex items-center bg-gray-200/60 border border-gray-300/40 rounded-lg px-2.5 py-1.5">
      <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(event) => onSearch(event.target.value)}
        className="w-full bg-transparent text-xs focus:outline-none border-none outline-none text-gray-800 placeholder-gray-400"
      />
    </div>

    <div className="space-y-4">
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
