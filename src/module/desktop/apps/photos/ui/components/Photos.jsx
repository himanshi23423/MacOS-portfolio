import windowWrapper from "@hoc/windowWrapper";
import useWindowsStore from "@store/window";
import { gallery } from "@constants";
import { useState, useEffect } from "react";
import PhotosSection from "../section/PhotosSection";
import PhotosAboutModal from "./PhotosAboutModal";

// Enrich the static gallery with realistic metadata for macOS Photos experience
const enrichedGallery = gallery.map((item) => {
  let title = "Untitled";
  let date = "May 20, 2026";
  let location = "San Francisco, CA";
  let camera = "iPhone 15 Pro";
  let exposure = "1/120s f/1.8 ISO 125";
  let lens = "24mm (equivalent)";
  let size = "3.2 MB";
  let resolution = "4032 × 3024";

  if (item.category === "Library") {
    if (item.id === 1) {
      title = "Pacific Sunset";
      date = "October 14, 2025";
      location = "Golden Gate, San Francisco";
      camera = "Sony α7R V";
      exposure = "1/250s f/4.0 ISO 100";
      lens = "70-200mm F2.8 GM OSS II";
      size = "12.4 MB";
      resolution = "9504 × 6336";
    } else if (item.id === 2) {
      title = "Morning Coffee & Code";
      date = "February 12, 2026";
      location = "Oakland Cafe, CA";
      camera = "iPhone 15 Pro Max";
      exposure = "1/60s f/1.78 ISO 400";
      lens = "24mm Main Camera";
      size = "2.1 MB";
      resolution = "4032 × 3024";
    } else if (item.id === 3) {
      title = "City Skyline at Night";
      date = "December 5, 2025";
      location = "Tokyo, Japan";
      camera = "Sony α7R V";
      exposure = "1.3s f/8.0 ISO 100";
      lens = "24-70mm F2.8 GM II";
      size = "18.1 MB";
      resolution = "9504 × 6336";
    } else {
      title = "Scenic Highway 1";
      date = "April 29, 2026";
      location = "Big Sur, California";
      camera = "iPhone 15 Pro";
      exposure = "1/1000s f/2.2 ISO 50";
      lens = "13mm Ultra Wide";
      size = "2.8 MB";
      resolution = "4032 × 3024";
    }
  } else if (item.category === "Memories") {
    const memoryTitles = [
      "Sunset Beach Walk",
      "Mountain Hiking",
      "Lake Cabin Retreat",
      "Forest Exploration",
      "Campfire Gathering",
    ];
    title = memoryTitles[(item.id - 5) % memoryTitles.length] || "Memory Trip";
    date = `July ${10 + (item.id % 5)}, 2024`;
    location = "Maui, Hawaii";
    camera = "GoPro Hero 12";
    exposure = "1/400s f/2.5 ISO 100";
    lens = "Wide Lens";
    size = "4.5 MB";
    resolution = "5568 × 4872";
  } else if (item.category === "Places") {
    const places = [
      "Yosemite Valley",
      "Grand Canyon Lookout",
      "Venice Rialto Bridge",
      "Swiss Alps Peaks",
    ];
    title = places[item.id % 4] || "Nature Escape";
    date = "September 18, 2025";
    location = title.includes("Venice")
      ? "Venice, Italy"
      : title.includes("Swiss")
        ? "Zermatt, Switzerland"
        : "Yosemite Park, CA";
    camera = "Fujifilm X-T5";
    exposure = "1/500s f/5.6 ISO 160";
    lens = "XF 18-55mm F2.8-4 R LM OIS";
    size = "9.8 MB";
    resolution = "6240 × 4160";
  } else if (item.category === "People") {
    const people = [
      "Team Collaboration",
      "Friends Reunion",
      "Family Gathering",
      "Portrait Session",
    ];
    title = people[item.id % 4] || "Portrait";
    date = "November 23, 2025";
    location = "San Jose, CA";
    camera = "Canon EOS R5";
    exposure = "1/200s f/1.2 ISO 200";
    lens = "RF 85mm F1.2L USM";
    size = "14.2 MB";
    resolution = "8192 × 5464";
  }

  return {
    ...item,
    title,
    date,
    location,
    camera,
    exposure,
    lens,
    size,
    resolution,
  };
});

const Photos = () => {
  const { favorites, openWindow, setWindowData } = useWindowsStore();
  const photosWindowData = useWindowsStore((state) => state.windows.photos?.data);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [activeTab, setActiveTab] = useState("Library");
  const [showAbout, setShowAbout] = useState(false);

  // Sync openAbout from window data
  useEffect(() => {
    if (photosWindowData?.openAbout) {
      setShowAbout(true);
      setWindowData("photos", null);
    }
  }, [photosWindowData, setWindowData]);

  // Navigation history
  const [navHistory, setNavHistory] = useState(["Library"]);
  const [navIndex, setNavIndex] = useState(0);

  // Layout and view controls
  const [zoomLevel, setZoomLevel] = useState(4); // 1 (large columns) to 6 (small columns)
  const [viewMode, setViewMode] = useState("All Photos"); // Years, Months, Days, All Photos
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [rotations, setRotations] = useState({}); // { [id]: degrees }
  const [inAppViewerPhoto, setInAppViewerPhoto] = useState(null);

  // Custom photo titles modified locally
  const [customTitles, setCustomTitles] = useState({});

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sync selection photo ID when active tab changes
  useEffect(() => {
    setSelectedPhotoId(null);
  }, [activeTab]);

  // Navigate back/forward
  const handleNavigate = (direction) => {
    if (direction === "back" && navIndex > 0) {
      const nextIdx = navIndex - 1;
      setNavIndex(nextIdx);
      setActiveTab(navHistory[nextIdx]);
    } else if (direction === "forward" && navIndex < navHistory.length - 1) {
      const nextIdx = navIndex + 1;
      setNavIndex(nextIdx);
      setActiveTab(navHistory[nextIdx]);
    }
  };

  const handleSelectAlbum = (album) => {
    setActiveTab(album);
    const newHistory = navHistory.slice(0, navIndex + 1);
    newHistory.push(album);
    setNavHistory(newHistory);
    setNavIndex(newHistory.length - 1);
  };

  // Get active photo list
  const activePhotos = enrichedGallery
    .map((photo) => ({
      ...photo,
      title: customTitles[photo.id] || photo.title,
      rotation: rotations[photo.id] || 0,
    }))
    .filter((item) => {
      // Tab filter
      if (activeTab === "Favorites") {
        if (!favorites.includes(item.id)) return false;
      } else if (item.category !== activeTab) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.camera.toLowerCase().includes(q)
        );
      }
      return true;
    });

  const selectedPhoto =
    activePhotos.find((p) => p.id === selectedPhotoId) || activePhotos[0] || null;

  const handlePhotoClick = (photo) => {
    setSelectedPhotoId(photo.id);
  };

  const _handlePhotoDoubleClick = (photo) => {
    if (isMobile) {
      setInAppViewerPhoto(photo);
    } else {
      const index = activePhotos.findIndex((p) => p.id === photo.id);
      openWindow("imgfile", {
        currentIndex: index >= 0 ? index : 0,
        photos: activePhotos.map((p) => ({
          id: p.id,
          name: p.title,
          imageUrl: p.img,
          resolution: p.resolution || "1920 × 1080",
        })),
      });
    }
  };

  const handleRotateActivePhoto = () => {
    if (!selectedPhoto) return;
    const currentRot = rotations[selectedPhoto.id] || 0;
    const nextRot = (currentRot + 90) % 360;
    setRotations((prev) => ({
      ...prev,
      [selectedPhoto.id]: nextRot,
    }));
  };

  const handleUpdateTitle = (id, newTitle) => {
    setCustomTitles((prev) => ({
      ...prev,
      [id]: newTitle,
    }));
  };

  return (
    <>
      <PhotosSection
        isMobile={isMobile}
        filteredGallery={activePhotos}
        activeTab={activeTab}
        onSelectPhoto={handlePhotoClick}
        onSelectAlbum={handleSelectAlbum}
        // Extended controls
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedPhoto={selectedPhoto}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
        onRotate={handleRotateActivePhoto}
        inAppViewerPhoto={inAppViewerPhoto}
        setInAppViewerPhoto={setInAppViewerPhoto}
        onUpdateTitle={handleUpdateTitle}
        onDoubleClick={_handlePhotoDoubleClick}
        // History navigation
        canGoBack={navIndex > 0}
        canGoForward={navIndex < navHistory.length - 1}
        onNavigate={handleNavigate}
      />
      <PhotosAboutModal show={showAbout} onClose={() => setShowAbout(false)} />
    </>
  );
};

const PhotosWindow = windowWrapper(Photos, "photos");
PhotosWindow.displayName = "Photos";
export default PhotosWindow;
