import { PhotoSidebarDesktop, PhotoSidebarMobile } from "../components/PhotoSidebar";

const PhotosSidebarSection = ({
  activeAlbum,
  onSelectAlbum,
  isSidebarOpen,
  isMobile,
  onScrollToCollections,
  onSearchClick,
}) => {
  if (isMobile) {
    return (
      <PhotoSidebarMobile
        activeTab={activeAlbum}
        onTabChange={onSelectAlbum}
        onScrollToCollections={onScrollToCollections}
        onSearchClick={onSearchClick}
      />
    );
  }
  if (!isSidebarOpen) return null;
  return <PhotoSidebarDesktop activeTab={activeAlbum} onTabChange={onSelectAlbum} />;
};

export default PhotosSidebarSection;
