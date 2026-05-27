import React, { useState, useEffect, useRef } from "react";
import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/windowWrapper";
import useWindowsStore from "#store/window";
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Search, Compass, Disc, Library, Music as MusicIcon,
  Heart, Repeat, Shuffle, Clock, Award
} from "lucide-react";

const colors = [
  "from-indigo-600 to-pink-500",
  "from-yellow-400 to-amber-600",
  "from-red-600 to-rose-900",
  "from-zinc-500 to-slate-700",
  "from-neutral-900 to-zinc-950",
  "from-blue-600 to-indigo-950",
  "from-orange-500 to-amber-500",
  "from-emerald-500 to-teal-700",
];

const getCoverColor = (index) => colors[index % colors.length];

const emojis = ["🌌", "🤖", "🕶️", "☁️", "✖️", "✨", "🪕", "🪈", "🥁", "🎵", "🎸", "🎹", "🎶"];
const getCoverEmoji = (name) => {
  const code = (name && name.charCodeAt(0)) || 0;
  return emojis[code % emojis.length];
};

// Memoized tracks table to prevent expensive table re-renders on every progress/time tick
const TracksTable = React.memo(({ tracks, activeTrackId, isPlaying, onSelectTrack, formatTime }) => {
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-zinc-100 text-[10px] font-bold text-gray-400 uppercase select-none">
          <th className="py-2.5 px-4 w-12">#</th>
          <th className="py-2.5 px-3">Title</th>
          <th className="py-2.5 px-3">Artist</th>
          <th className="py-2.5 px-3">Album</th>
          <th className="py-2.5 px-3 w-16 text-center"><Clock size={12} className="inline" /></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-50 text-xs">
        {tracks.map((track, index) => {
          const isActive = activeTrackId === track.id;
          return (
            <tr 
              key={track.id}
              onDoubleClick={() => onSelectTrack(track)}
              className={`hover:bg-zinc-50 cursor-pointer group ${
                isActive ? "bg-red-50/50 font-semibold" : ""
              }`}
            >
              <td className="py-3 px-4 text-gray-400">
                {isActive && isPlaying ? (
                  <div className="flex items-center gap-0.5 justify-center w-4 h-4">
                    <span className="w-0.5 h-3 bg-red-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-0.5 h-3 bg-red-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-0.5 h-3 bg-red-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                ) : (
                  <span className="group-hover:hidden">{index + 1}</span>
                )}
                <Play 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTrack(track);
                  }}
                  size={12} 
                  className="hidden group-hover:inline text-red-500 transition-transform active:scale-90" 
                />
              </td>
              <td className={`py-3 px-3 truncate ${isActive ? "text-red-600" : "text-gray-900"}`}>
                {track.title}
              </td>
              <td className="py-3 px-3 text-gray-600 truncate">{track.artist}</td>
              <td className="py-3 px-3 text-gray-500 truncate">{track.album}</td>
              <td className="py-3 px-3 text-gray-400 text-center font-mono">{formatTime(track.duration)}</td>
            </tr>
          );
        })}

        {tracks.length === 0 && (
          <tr>
            <td colSpan="5" className="text-center py-12 text-gray-400 italic">No songs found in this view</td>
          </tr>
        )}
      </tbody>
    </table>
  );
});

TracksTable.displayName = "TracksTable";

const Music = () => {
  const { music, setMusicState, focusWindow } = useWindowsStore();
  const activeTrack = music.activeTrack;
  const isPlaying = music.isPlaying;
  const volume = music.volume;
  const isMuted = music.isMuted;

  const [tracks, setTracks] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Browse"); // Default to Browse
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef(null);
  const searchInputRef = useRef(null);

  // Fetch tracks from JioSaavn API based on search query and category
  useEffect(() => {
    const fetchTracks = async () => {
      setIsLoading(true);
      try {
        const apiBase = import.meta.env.VITE_JIOSAAVN_API_URL || "https://jiosaavn-apix.arcadopredator.workers.dev";
        let query = "Bollywood Hits";
        
        if (searchQuery.trim() !== "") {
          query = searchQuery;
        } else {
          switch (activeCategory) {
            case "Browse":
              query = "Bollywood Hits";
              break;
            case "Listen Now":
              query = "Arijit Singh Hits";
              break;
            case "Hindi Music":
              query = "New Hindi Songs";
              break;
            case "English Music":
              query = "Imagine Dragons";
              break;
            case "Recently Added":
              query = "Latest Hits";
              break;
            case "Artists":
              query = "Top Artists";
              break;
            case "Albums":
              query = "Top Albums";
              break;
            case "Songs":
              query = "Popular Songs";
              break;
            default:
              query = "Bollywood Hits";
          }
        }

        // Fetch songs directly with all details and download URLs in a single request
        const res = await fetch(`${apiBase}/api/search/songs?query=${encodeURIComponent(query)}&limit=25`);
        const resultData = await res.json();
        
        if (resultData.success && resultData.data && resultData.data.results) {
          const formattedTracks = resultData.data.results.map((track, index) => {
            const downloadUrls = track.downloadUrl || [];
            const audioUrl = downloadUrls.length > 0 ? downloadUrls[downloadUrls.length - 1]?.url : "";
            
            // Robust cover art URL resolver
            const images = track.image;
            let coverUrl = "";
            if (typeof images === "string") {
              coverUrl = images;
            } else if (Array.isArray(images) && images.length > 0) {
              const lastImg = images[images.length - 1];
              coverUrl = typeof lastImg === "string" ? lastImg : (lastImg?.url || lastImg?.link || "");
            }

            return {
              id: track.id,
              title: track.name,
              artist: track.artists?.primary?.map(a => a.name).join(", ") || track.label || "Unknown Artist",
              album: track.album?.name || "Single",
              duration: track.duration,
              coverColor: getCoverColor(index),
              coverText: getCoverEmoji(track.name),
              coverUrl: coverUrl,
              url: audioUrl,
              language: track.language
            };
          });
          
          setTracks(formattedTracks);
        } else {
          setTracks([]);
        }
      } catch (err) {
        console.error("Failed to fetch JioSaavn tracks:", err);
        setTracks([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchTracks();
    }, 450);

    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery]);

  // Set the first track as active if none is currently selected
  useEffect(() => {
    if (tracks.length > 0 && activeTrack.id === 0) {
      setMusicState({ activeTrack: tracks[0] });
    }
  }, [tracks, activeTrack]);

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // Sync play/pause controls when activeTrack or isPlaying changes
  useEffect(() => {
    if (audioRef.current && activeTrack.url) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.log("Audio playback blocked or interrupted:", err);
          setMusicState({ isPlaying: false });
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, activeTrack]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const duration = Math.round(audioRef.current.duration);
      if (duration && !isNaN(duration)) {
        setMusicState({ activeTrack: { ...activeTrack, duration } });
      }
    }
  };

  const handleAudioEnded = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(err => console.log(err));
      }
    } else {
      handleNext();
    }
  };

  const handleSelectTrack = (track) => {
    setMusicState({ activeTrack: track, isPlaying: true });
    setCurrentTime(0);
  };

  const handlePlayPause = () => {
    if (activeTrack.url) {
      setMusicState({ isPlaying: !isPlaying });
    }
  };

  const handleNext = () => {
    const currentList = tracks;
    if (currentList.length === 0) return;
    
    let nextTrack;
    if (isShuffle) {
      const randIdx = Math.floor(Math.random() * currentList.length);
      nextTrack = currentList[randIdx];
    } else {
      const currentIdx = currentList.findIndex(t => t.id === activeTrack.id);
      if (currentIdx === -1) {
        nextTrack = currentList[0];
      } else {
        const nextIdx = (currentIdx + 1) % currentList.length;
        nextTrack = currentList[nextIdx];
      }
    }
    setMusicState({ activeTrack: nextTrack });
    setCurrentTime(0);
  };

  const handlePrev = () => {
    const currentList = tracks;
    if (currentList.length === 0) return;

    let prevTrack;
    const currentIdx = currentList.findIndex(t => t.id === activeTrack.id);
    if (currentIdx === -1) {
      prevTrack = currentList[currentList.length - 1];
    } else {
      const prevIdx = (currentIdx - 1 + currentList.length) % currentList.length;
      prevTrack = currentList[prevIdx];
    }
    setMusicState({ activeTrack: prevTrack });
    setCurrentTime(0);
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleProgressChange = (e) => {
    const newTime = parseInt(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white text-gray-800 rounded-xl overflow-hidden shadow-2xl border border-zinc-200 select-none">
      
      {/* Hidden native audio element */}
      <audio 
        ref={audioRef}
        src={activeTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
      />
      
      {/* Title Header Bar */}
      <div id="window-header" className="shrink-0 bg-[#f4f4f6] border-b border-zinc-200 px-4 py-2 flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-4">
          <WindowControls target="music" />
          <span className="font-bold text-gray-700 hidden md:flex pl-3 items-center gap-1.5">
            <MusicIcon size={14} className="text-red-500" /> Music
          </span>
        </div>

        {/* Global search in header */}
        <div className="w-56 relative flex items-center">
          <input 
            ref={searchInputRef}
            type="text"
            placeholder="Search songs, artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onMouseDown={(e) => {
              e.stopPropagation();
              focusWindow("music");
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              focusWindow("music");
            }}
            className="w-full bg-white border border-zinc-300 rounded-lg pl-8 pr-3 py-1 text-xs text-gray-800 outline-none focus:border-red-500 shadow-inner select-text"
          />
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="w-14 flex justify-end">
          <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">Hifi</span>
        </div>
      </div>

      {/* Main Layout Body */}
      <div className="flex-1 flex min-h-0 relative">
        
        {/* Navigation Sidebar */}
        <div className="w-48 bg-[#f9f9fb] border-r border-zinc-200 flex flex-col shrink-0 min-w-0">
          <div className="p-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Apple Music
          </div>
          
          <div className="px-1.5 space-y-0.5">
            {[
              { name: "Listen Now", icon: Disc },
              { name: "Browse", icon: Compass }
            ].map(item => (
              <div 
                key={item.name}
                onClick={() => setActiveCategory(item.name)}
                className={`flex items-center gap-2.5 py-1.5 px-3 rounded-lg cursor-pointer text-xs font-medium transition-colors ${
                  activeCategory === item.name ? "bg-red-50 text-red-600" : "text-gray-700 hover:bg-gray-200/60"
                }`}
              >
                <item.icon size={15} className={activeCategory === item.name ? "text-red-500" : "text-gray-400"} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>

          <div className="p-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-4">
            Categories
          </div>
          
          <div className="px-1.5 space-y-0.5">
            {[
              { name: "Hindi Music", icon: MusicIcon },
              { name: "English Music", icon: MusicIcon }
            ].map(item => (
              <div 
                key={item.name}
                onClick={() => setActiveCategory(item.name)}
                className={`flex items-center gap-2.5 py-1.5 px-3 rounded-lg cursor-pointer text-xs font-medium transition-colors ${
                  activeCategory === item.name ? "bg-red-50 text-red-600" : "text-gray-700 hover:bg-gray-200/60"
                }`}
              >
                <item.icon size={15} className={activeCategory === item.name ? "text-red-500" : "text-gray-400"} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>

          <div className="p-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-4">
            Library
          </div>

          <div className="px-1.5 space-y-0.5 flex-1 overflow-y-auto">
            {[
              { name: "Recently Added", icon: Library },
              { name: "Artists", icon: Library },
              { name: "Albums", icon: Library },
              { name: "Songs", icon: Library }
            ].map(item => (
              <div 
                key={item.name}
                onClick={() => setActiveCategory(item.name)}
                className={`flex items-center gap-2.5 py-1.5 px-3 rounded-lg cursor-pointer text-xs font-medium transition-colors ${
                  activeCategory === item.name ? "bg-red-50 text-red-600" : "text-gray-700 hover:bg-gray-200/60"
                }`}
              >
                <Library size={15} className={activeCategory === item.name ? "text-red-500" : "text-gray-400"} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>

          {/* Spectrum visualizer section (Pulsing graphic when playing) */}
          <div className="p-3 border-t border-zinc-200 bg-gray-50 flex flex-col gap-2.5 select-none">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Visualizer</span>
              <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-red-500 animate-pulse" : "bg-zinc-300"}`} />
            </div>
            {/* Visualizer bars */}
            <div className="flex items-end justify-between h-9 px-2 gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(bar => {
                const animDelay = `${bar * 100}ms`;
                const animDuration = `${0.5 + Math.random() * 0.8}s`;
                return (
                  <div 
                    key={bar}
                    className="flex-1 bg-red-500 rounded-t-sm transition-all duration-300"
                    style={{
                      height: "100%",
                      transformOrigin: "bottom",
                      transform: isPlaying ? "none" : "scaleY(0.2)",
                      animation: isPlaying ? `bounceVisualizer ${animDuration} infinite ease-in-out` : "none",
                      animationDelay: animDelay
                    }}
                  />
                );
              })}
            </div>
          </div>

        </div>

        {/* Tracks Content Board */}
        <div className="flex-1 flex flex-col bg-white min-w-0">
          
          {/* Section banner */}
          <div className="p-6 border-b border-zinc-150 bg-gradient-to-br from-red-500/5 to-rose-500/10 shrink-0">
            <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
              {activeCategory} <Award size={18} className="text-red-500" />
            </h2>
            <p className="text-xs text-gray-500 mt-1">Explore high-fidelity tracks, albums, and curated playlists in your library.</p>
          </div>

          {/* Library Tracks Table List - Decoupled using React.memo component */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-48 flex-col gap-3">
                <div className="w-7 h-7 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-gray-500">Searching JioSaavn catalog...</span>
              </div>
            ) : (
              <TracksTable 
                tracks={tracks}
                activeTrackId={activeTrack.id}
                isPlaying={isPlaying}
                onSelectTrack={handleSelectTrack}
                formatTime={formatTime}
              />
            )}
          </div>

          {/* Dynamic Bottom Player bar */}
          <div className="h-20 border-t border-zinc-200 bg-gray-50/80 backdrop-blur px-6 flex items-center justify-between shrink-0 select-none">
            
            {/* Active Track info */}
            <div className="w-1/3 flex items-center gap-3 min-w-0">
              {activeTrack.coverUrl ? (
                <img 
                  src={activeTrack.coverUrl} 
                  alt={activeTrack.title}
                  className="w-12 h-12 rounded-lg object-cover shadow-md shrink-0 bg-zinc-100 border border-zinc-200" 
                />
              ) : (
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-tr ${activeTrack.coverColor} flex items-center justify-center text-xl shadow-md shrink-0`}>
                  {activeTrack.coverText}
                </div>
              )}
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-gray-900 truncate flex items-center gap-1.5">
                  {activeTrack.title}
                  <Heart size={12} className="text-red-500 cursor-pointer fill-red-500" />
                </h4>
                <p className="text-[10px] text-gray-500 truncate">{activeTrack.artist}</p>
              </div>
            </div>

            {/* Playback sliders and controls */}
            <div className="w-1/3 flex flex-col items-center gap-1.5">
              
              {/* Button controllers */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsShuffle(!isShuffle)}
                  className={`p-1 transition-colors ${isShuffle ? "text-red-500" : "text-gray-400 hover:text-gray-600"}`}
                  title="Shuffle"
                >
                  <Shuffle size={14} />
                </button>
                <button 
                  onClick={handlePrev}
                  className="p-1 hover:bg-zinc-200 rounded text-gray-600 transition-transform active:scale-95 cursor-pointer"
                  title="Previous"
                >
                  <SkipBack size={16} />
                </button>
                <button 
                  onClick={handlePlayPause}
                  className="p-2.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all active:scale-95 shadow-md flex items-center justify-center cursor-pointer"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={15} /> : <Play size={15} className="pl-0.5" />}
                </button>
                <button 
                  onClick={handleNext}
                  className="p-1 hover:bg-zinc-200 rounded text-gray-600 transition-transform active:scale-95 cursor-pointer"
                  title="Next"
                >
                  <SkipForward size={16} />
                </button>
                <button 
                  onClick={() => setIsRepeat(!isRepeat)}
                  className={`p-1 transition-colors ${isRepeat ? "text-red-500" : "text-gray-400 hover:text-gray-600"}`}
                  title="Repeat"
                >
                  <Repeat size={14} />
                </button>
              </div>

              {/* Progress timeline slider */}
              <div className="w-full flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                <span>{formatTime(currentTime)}</span>
                <input 
                  type="range"
                  min="0"
                  max={activeTrack.duration || 100}
                  value={currentTime}
                  onChange={handleProgressChange}
                  className="flex-1 h-1.5 bg-zinc-200 accent-red-500 rounded-lg cursor-pointer outline-none"
                />
                <span>{formatTime(activeTrack.duration || 100)}</span>
              </div>

            </div>

            {/* Volume controls */}
            <div className="w-1/3 flex items-center justify-end gap-2.5 text-gray-500">
              <button 
                onClick={() => setMusicState({ isMuted: !isMuted })}
                className="hover:text-gray-700 transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={15} className="text-red-500" /> : <Volume2 size={15} />}
              </button>
              <input 
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setMusicState({ volume: val, isMuted: val === 0 });
                }}
                className="w-20 h-1 bg-zinc-200 accent-red-500 rounded-lg cursor-pointer outline-none"
              />
            </div>

          </div>

        </div>

      </div>

      {/* Visualizer animation frames */}
      <style>{`
        @keyframes bounceVisualizer {
          0%, 100% { transform: scaleY(0.2); }
          50% { transform: scaleY(1); }
        }
      `}</style>

    </div>
  );
};

const MusicWindow = windowWrapper(Music, "music");
export default MusicWindow;
