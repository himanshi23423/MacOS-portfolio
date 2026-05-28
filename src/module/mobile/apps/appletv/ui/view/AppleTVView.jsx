import { useEffect, useRef, useState } from "react";
import windowWrapper from "#hoc/windowWrapper";
import PlayerOverlay from "../components/PlayerOverlay";
import { FEATURED_SHOW } from "../components/appleTvCatalog";
import AppleTVHeaderSection from "../section/AppleTVHeaderSection";
import AppleTVSection from "../section/AppleTVSection";

const AppleTVView = () => {
  const [activeTab, setActiveTab] = useState("watchNow");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVideo, setActiveVideo] = useState(null);
  const [upNext, setUpNext] = useState(["sintel", "bbb"]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  const openVideo = (video) => setActiveVideo(video);

  const playFeatured = (video = FEATURED_SHOW) => {
    openVideo({ title: video.title, url: video.videoUrl ?? video.url });
  };

  const playMovie = (movie) => {
    openVideo({ title: movie.title, url: movie.videoUrl });
  };

  const closePlayer = () => {
    if (videoRef.current) videoRef.current.pause();
    setActiveVideo(null);
    setIsPlaying(false);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 0;
    setCurrentTime(current);
    setProgress((current / total) * 100);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const seekVideo = (value) => {
    if (!videoRef.current || !duration) return;
    const newTime = (value / 100) * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(value);
  };

  const skipTime = (seconds) => {
    if (videoRef.current) videoRef.current.currentTime += seconds;
  };

  const toggleUpNext = (id) => {
    setUpNext((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const selectTab = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl overflow-hidden shadow-2xl border border-black/10 select-none text-gray-800 relative">
      <PlayerOverlay
        activeVideo={activeVideo}
        videoRef={videoRef}
        isPlaying={isPlaying}
        isMuted={isMuted}
        progress={progress}
        duration={duration}
        currentTime={currentTime}
        showControls={showControls}
        onClose={closePlayer}
        onMouseMove={handleMouseMove}
        onTogglePlay={togglePlay}
        onToggleMute={toggleMute}
        onSeek={seekVideo}
        onSkip={skipTime}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <AppleTVHeaderSection
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((open) => !open)}
      />
      <AppleTVSection
        activeTab={activeTab}
        searchQuery={searchQuery}
        upNext={upNext}
        isSidebarOpen={isSidebarOpen}
        onSearch={setSearchQuery}
        onSelectTab={selectTab}
        onCloseSidebar={() => setIsSidebarOpen(false)}
        onOpenStore={() => setActiveTab("store")}
        onPlayFeatured={playFeatured}
        onPlayMovie={playMovie}
        onToggleUpNext={toggleUpNext}
      />
    </div>
  );
};

const AppleTVWindow = windowWrapper(AppleTVView, "appletv");

export default AppleTVWindow;
