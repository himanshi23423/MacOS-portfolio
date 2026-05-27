import React, { useState, useEffect, useRef } from "react";
import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/windowWrapper";
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Search, Radio, Compass, Disc, Library, Music as MusicIcon,
  Heart, Repeat, Shuffle, Clock, Award
} from "lucide-react";

// Curated mock music tracks
const MOCK_TRACKS = [
  {
    id: 1,
    title: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    duration: 243, // in seconds (4:03)
    coverColor: "from-indigo-600 to-pink-500",
    coverText: "🌌"
  },
  {
    id: 2,
    title: "Get Lucky",
    artist: "Daft Punk",
    album: "Random Access Memories",
    duration: 369, // 6:09
    coverColor: "from-yellow-400 to-amber-600",
    coverText: "🤖"
  },
  {
    id: 3,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 200, // 3:20
    coverColor: "from-red-650 to-rose-900",
    coverText: "🕶️"
  },
  {
    id: 4,
    title: "Sweater Weather",
    artist: "The Neighbourhood",
    album: "I Love You.",
    duration: 240, // 4:00
    coverColor: "from-zinc-500 to-slate-700",
    coverText: "☁️"
  },
  {
    id: 5,
    title: "Intro",
    artist: "The xx",
    album: "xx",
    duration: 128, // 2:08
    coverColor: "from-neutral-900 to-zinc-950",
    coverText: "✖️"
  },
  {
    id: 6,
    title: "Starlight",
    artist: "Muse",
    album: "Black Holes and Revelations",
    duration: 240, // 4:00
    coverColor: "from-blue-600 to-indigo-950",
    coverText: "✨"
  }
];

const Music = () => {
  const [tracks, setTracks] = useState(MOCK_TRACKS);
  const [activeTrack, setActiveTrack] = useState(MOCK_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(34); // start partway through for mock
  const [volume, setVolume] = useState(72);
  const [isMuted, setIsMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Listen Now");
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  // Playback timer simulation
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= activeTrack.duration) {
            // Repeat or stop
            if (isRepeat) return 0;
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeTrack, isRepeat]);

  // Load a song and reset play timer
  const handleSelectTrack = (track) => {
    setActiveTrack(track);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (isShuffle) {
      const randIdx = Math.floor(Math.random() * tracks.length);
      setActiveTrack(tracks[randIdx]);
    } else {
      const currentIdx = tracks.findIndex(t => t.id === activeTrack.id);
      const nextIdx = (currentIdx + 1) % tracks.length;
      setActiveTrack(tracks[nextIdx]);
    }
    setCurrentTime(0);
  };

  const handlePrev = () => {
    const currentIdx = tracks.findIndex(t => t.id === activeTrack.id);
    const prevIdx = (currentIdx - 1 + tracks.length) % tracks.length;
    setActiveTrack(tracks[prevIdx]);
    setCurrentTime(0);
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleProgressChange = (e) => {
    setCurrentTime(parseInt(e.target.value));
  };

  const filteredTracks = tracks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full bg-white text-gray-800 rounded-xl overflow-hidden shadow-2xl border border-zinc-200 select-none">
      
      {/* Title Header Bar */}
      <div id="window-header" className="shrink-0 bg-[#f4f4f6] border-b border-zinc-200 px-4 py-2 flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-4">
          <WindowControls target="music" />
          <span className="font-bold text-gray-700 hidden md:inline pl-3 flex items-center gap-1.5">
            <MusicIcon size={14} className="text-red-500" /> Music
          </span>
        </div>

        {/* Global search in header */}
        <div className="w-56 relative flex items-center">
          <input 
            type="text"
            placeholder="Search Library..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
              { name: "Browse", icon: Compass },
              { name: "Radio", icon: Radio }
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
                      height: isPlaying ? "100%" : "20%",
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

          {/* Library Tracks Table List */}
          <div className="flex-1 overflow-y-auto">
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
                {filteredTracks.map((track, index) => {
                  const isActive = activeTrack.id === track.id;
                  return (
                    <tr 
                      key={track.id}
                      onDoubleClick={() => handleSelectTrack(track)}
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
                          onClick={() => handleSelectTrack(track)}
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

                {filteredTracks.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-12 text-gray-400 italic">No songs found in this view</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Dynamic Bottom Player bar */}
          <div className="h-20 border-t border-zinc-200 bg-gray-50/80 backdrop-blur px-6 flex items-center justify-between shrink-0 select-none">
            
            {/* Active Track info */}
            <div className="w-1/3 flex items-center gap-3 min-w-0">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-tr ${activeTrack.coverColor} flex items-center justify-center text-xl shadow-md shrink-0`}>
                {activeTrack.coverText}
              </div>
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
                  max={activeTrack.duration}
                  value={currentTime}
                  onChange={handleProgressChange}
                  className="flex-1 h-1.5 bg-zinc-200 accent-red-500 rounded-lg cursor-pointer outline-none"
                />
                <span>{formatTime(activeTrack.duration)}</span>
              </div>

            </div>

            {/* Volume controls */}
            <div className="w-1/3 flex items-center justify-end gap-2.5 text-gray-500">
              <button 
                onClick={() => setIsMuted(!isMuted)}
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
                  setVolume(parseInt(e.target.value));
                  if (isMuted) setIsMuted(false);
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
          0%, 100% { height: 20%; }
          50% { height: 95%; }
        }
      `}</style>

    </div>
  );
};

const MusicWindow = windowWrapper(Music, "music");
export default MusicWindow;
