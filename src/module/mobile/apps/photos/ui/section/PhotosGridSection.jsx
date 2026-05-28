import { PhotoGrid, PhotoGridMobile } from "../components/PhotoGrid";

const PhotosGridSection = ({ photos, onSelectPhoto, activeTab, isMobile }) => {
  if (isMobile) {
    return <PhotoGridMobile photos={photos} onPhotoClick={onSelectPhoto} activeTab={activeTab} />;
  }
  return <PhotoGrid photos={photos} onPhotoClick={onSelectPhoto} activeTab={activeTab} />;
};

export default PhotosGridSection;
