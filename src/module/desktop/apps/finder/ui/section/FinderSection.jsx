import FinderToolbarSection from "./FinderToolbarSection";
import FinderSidebarSection from "./FinderSidebarSection";
import FinderFileListSection from "./FinderFileListSection";

const FinderSection = ({
  activeLocation,
  setActiveLocation,
  openItem,
  canGoBack,
  canGoForward,
  onGoBack,
  onGoForward,
  searchQuery,
  onSearchChange,
  filteredChildren,
}) => (
  <div className="flex flex-col h-full w-full @container bg-white rounded-xl overflow-hidden border border-zinc-200/50">
    <FinderToolbarSection
      title={activeLocation?.name || "Finder"}
      canGoBack={canGoBack}
      canGoForward={canGoForward}
      onGoBack={onGoBack}
      onGoForward={onGoForward}
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
    />
    <div className="bg-white flex h-full finder-main min-h-0 flex-1">
      <FinderSidebarSection
        activeLocation={activeLocation}
        setActiveLocation={setActiveLocation}
      />
      <FinderFileListSection
        activeLocation={activeLocation}
        openItem={openItem}
        filteredChildren={filteredChildren}
      />
    </div>
  </div>
);

export default FinderSection;
