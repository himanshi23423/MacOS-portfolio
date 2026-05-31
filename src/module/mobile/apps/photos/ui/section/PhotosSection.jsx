import WindowControls from "@components/WindowControls";
import { Search } from "lucide-react";
import PhotosSidebarSection from "./PhotosSidebarSection";
import PhotosGridSection from "./PhotosGridSection";
import { photosLinks } from "@constants";

const PhotosSection = ({ isMobile, filteredGallery, activeTab, onSelectPhoto, onSelectAlbum }) => {
  if (isMobile) {
    return (
      <>
        <div
          id="window-header"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "14px 16px",
            background: "#f2f2f7",
            borderBottom: "1px solid #e5e5ea",
            gap: 10,
            minHeight: 52,
          }}
        >
          <WindowControls target="photos" />
          <h1
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: "#000",
              flex: 1,
              textAlign: "center",
            }}
          >
            Photos
          </h1>
          <Search size={20} className="text-blue-500" />
        </div>

        <div
          className="photos-main"
          style={{
            flex: 1,
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            background: "#f2f2f7",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <PhotosGridSection
            photos={filteredGallery}
            onSelectPhoto={onSelectPhoto}
            activeTab={activeTab}
            isMobile
          />
        </div>

        <PhotosSidebarSection
          albums={photosLinks}
          activeAlbum={activeTab}
          onSelectAlbum={onSelectAlbum}
          isMobile
        />
      </>
    );
  }

  return (
    <div className="flex flex-col h-full w-full @container bg-white rounded-xl overflow-hidden">
      <div id="window-header" className="shrink-0 !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2">
        <WindowControls target="photos" />
        <div className="w-full flex justify-end items-center gap-3 text-gray-500">
          <Search className="icon" />
        </div>
      </div>
      <div className="flex w-full flex-1 overflow-hidden photos-main">
        <PhotosSidebarSection
          albums={photosLinks}
          activeAlbum={activeTab}
          onSelectAlbum={onSelectAlbum}
          isSidebarOpen
        />
        <PhotosGridSection
          photos={filteredGallery}
          onSelectPhoto={onSelectPhoto}
          activeTab={activeTab}
        />
      </div>
    </div>
  );
};

export default PhotosSection;
