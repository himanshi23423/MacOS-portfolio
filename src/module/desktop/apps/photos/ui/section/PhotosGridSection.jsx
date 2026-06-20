import { PhotoGrid, PhotoGridMobile } from "../components/PhotoGrid";

const PhotosGridSection = ({
  photos,
  onSelectPhoto,
  activeTab,
  isMobile,
  zoomLevel,
  viewMode,
  selectedPhotoId,
  onDoubleClick,
}) => {
  if (isMobile) {
    return <PhotoGridMobile photos={photos} onPhotoClick={onSelectPhoto} activeTab={activeTab} />;
  }
  return (
    <PhotoGrid
      photos={photos}
      onPhotoClick={onSelectPhoto}
      activeTab={activeTab}
      zoomLevel={zoomLevel}
      viewMode={viewMode}
      selectedPhotoId={selectedPhotoId}
      onDoubleClick={onDoubleClick}
    />
  );
};

export default PhotosGridSection;
