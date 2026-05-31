import { useState } from "react";
import MusicHeaderSection from "./MusicHeaderSection";
import MusicSidebarSection from "./MusicSidebarSection";
import MusicTrackSection from "./MusicTrackSection";
import MusicPlayerSection from "./MusicPlayerSection";

const MusicSection = (props) => {
  const {
    tracks,
    activeTrack,
    isPlaying,
    volume,
    isMuted,
    currentTime,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    isShuffle,
    setIsShuffle,
    isRepeat,
    setIsRepeat,
    isLoading,
    audioRef,
    searchInputRef,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleAudioEnded,
    handleSelectTrack,
    handlePlayPause,
    handleNext,
    handlePrev,
    formatTime,
    handleProgressChange,
    focusWindow,
    setMusicState,
  } = props;

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-full w-full bg-white text-gray-800 rounded-xl overflow-hidden shadow-2xl border border-zinc-200 select-none">
      <MusicHeaderSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        isSidebarOpen={isSidebarOpen}
        searchInputRef={searchInputRef}
        onFocusWindow={focusWindow}
      />

      <div className="flex-1 flex min-h-0 relative">
        <MusicSidebarSection
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          isSidebarOpen={isSidebarOpen}
          isPlaying={isPlaying}
        />

        <MusicTrackSection
          tracks={tracks}
          activeTrack={activeTrack}
          isPlaying={isPlaying}
          onSelectTrack={handleSelectTrack}
          formatTime={formatTime}
          isLoading={isLoading}
          activeCategory={activeCategory}
        />
      </div>

      <audio
        ref={audioRef}
        src={activeTrack?.url || null}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
      />

      <MusicPlayerSection
        activeTrack={activeTrack}
        currentTime={currentTime}
        isPlaying={isPlaying}
        volume={volume}
        isMuted={isMuted}
        isShuffle={isShuffle}
        isRepeat={isRepeat}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrev={handlePrev}
        onShuffleToggle={() => setIsShuffle(!isShuffle)}
        onRepeatToggle={() => setIsRepeat(!isRepeat)}
        onProgressChange={handleProgressChange}
        onMuteToggle={() => setMusicState({ isMuted: !isMuted })}
        onVolumeChange={(e) => {
          const val = parseInt(e.target.value);
          setMusicState({ volume: val, isMuted: val === 0 });
        }}
        formatTime={formatTime}
      />

      <style>{`
        @keyframes bounceVisualizer {
          0%, 100% { transform: scaleY(0.2); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
};

export default MusicSection;
