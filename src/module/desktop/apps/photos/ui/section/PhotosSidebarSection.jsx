import { PhotoSidebarDesktop, PhotoSidebarMobile } from "../components/PhotoSidebar";

const PhotosSidebarSection = ({ _albums, activeAlbum, onSelectAlbum, isSidebarOpen, isMobile }) => {
  if (isMobile) {
    return <PhotoSidebarMobile activeTab={activeAlbum} onTabChange={onSelectAlbum} />;
  }
  if (!isSidebarOpen) return null;
  return <PhotoSidebarDesktop activeTab={activeAlbum} onTabChange={onSelectAlbum} />;
};

export default PhotosSidebarSection;
