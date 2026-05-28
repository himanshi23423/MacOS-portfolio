import SidebarNavigation from "../components/SidebarNavigation";
import FavoritesSection from "./FavoritesSection";
import LibrarySection from "./LibrarySection";
import StoreSection from "./StoreSection";
import TVPlusSection from "./TVPlusSection";
import WatchNowSection from "./WatchNowSection";

const AppleTVSection = ({
  activeTab,
  searchQuery,
  upNext,
  isSidebarOpen,
  onSearch,
  onSelectTab,
  onCloseSidebar,
  onOpenStore,
  onPlayFeatured,
  onPlayMovie,
  onToggleUpNext,
}) => (
  <div className="flex-1 flex min-h-0 relative">
    {isSidebarOpen && (
      <div
        onClick={onCloseSidebar}
        className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-20 sm:hidden"
      />
    )}
    <SidebarNavigation
      activeTab={activeTab}
      searchQuery={searchQuery}
      isSidebarOpen={isSidebarOpen}
      onSearch={onSearch}
      onSelectTab={onSelectTab}
    />
    <main className="flex-1 bg-white overflow-y-auto thin-scrollbar p-6 space-y-8 select-none text-gray-800 h-full min-h-0">
      {activeTab === "watchNow" && (
        <WatchNowSection
          upNext={upNext}
          onPlayFeatured={onPlayFeatured}
          onPlayMovie={onPlayMovie}
          onToggleUpNext={onToggleUpNext}
        />
      )}
      {activeTab === "tvPlus" && <TVPlusSection onPlayFeatured={onPlayFeatured} />}
      {activeTab === "store" && <StoreSection />}
      {activeTab === "library" && <LibrarySection onOpenStore={onOpenStore} />}
      {activeTab === "favorites" && (
        <FavoritesSection upNext={upNext} onPlayMovie={onPlayMovie} />
      )}
    </main>
  </div>
);

export default AppleTVSection;
