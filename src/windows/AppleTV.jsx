import React, { useState, useEffect, useRef } from "react";
import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/windowWrapper";
import useWindowsStore from "#store/window";
import { 
  Play, Plus, Search, Tv, ShoppingBag, Film, FolderHeart, 
  Volume2, VolumeX, Maximize2, Pause, X, RotateCcw, RotateCw, Check, ChevronLeft
} from "lucide-react";

const FEATURED_SHOW = {
  title: "Severance",
  category: "Sci-Fi Thriller",
  description: "Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives. When a mysterious colleague appears outside of work, it begins a journey to discover the truth about their jobs.",
  bgImage: "bg-gradient-to-br from-neutral-900 via-slate-950 to-zinc-900",
  videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", // Tears of Steel (Sci-fi)
};

const MOVIES = [
  {
    id: "sintel",
    title: "Sintel",
    category: "Fantasy • Apple TV+",
    duration: "15 min",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    poster: "bg-gradient-to-br from-amber-500 to-orange-700",
  },
  {
    id: "bbb",
    title: "Big Buck Bunny",
    category: "Comedy • Apple TV+",
    duration: "10 min",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: "bg-gradient-to-br from-green-400 to-emerald-600",
  },
  {
    id: "elephants",
    title: "Elephant's Dream",
    category: "Sci-Fi • Apple TV+",
    duration: "11 min",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: "bg-gradient-to-br from-indigo-500 to-purple-700",
  },
  {
    id: "tos",
    title: "Tears of Steel",
    category: "Action • Apple TV+",
    duration: "12 min",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    poster: "bg-gradient-to-br from-red-500 to-rose-700",
  },
];

const AppleTV = () => {
  const [activeTab, setActiveTab] = useState("watchNow");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVideo, setActiveVideo] = useState(null); // { title, url }
  const [upNext, setUpNext] = useState(["sintel", "bbb"]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Custom Video Player Controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // Auto Hide Video Controls on inactivity
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  // Video Events
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 0;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const seekVideo = (value) => {
    if (videoRef.current && duration) {
      const newTime = (value / 100) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(value);
    }
  };

  const skipTime = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const formatTime = (timeInSecs) => {
    if (isNaN(timeInSecs)) return "00:00";
    const minutes = Math.floor(timeInSecs / 60).toString().padStart(2, "0");
    const seconds = Math.floor(timeInSecs % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleUpNextToggle = (id) => {
    setUpNext((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl overflow-hidden shadow-2xl border border-black/10 select-none text-gray-800 relative">
      
      {/* ================= CUSTOM VIDEO PLAYER OVERLAY ================= */}
      {activeVideo && (
        <div 
          className="absolute inset-0 bg-black z-50 flex flex-col justify-between"
          onMouseMove={handleMouseMove}
        >
          {/* Main Video Element */}
          <video
            ref={videoRef}
            src={activeVideo.url}
            autoPlay
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full h-full object-contain"
            onClick={togglePlay}
          />

          {/* Player controls */}
          <div className={`absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-black/80 via-transparent to-black/60 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}>
            {/* Top Bar (Title & Close) */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-blue-400 tracking-wider uppercase">Now Streaming</span>
                <h2 className="text-lg font-bold text-white leading-tight">{activeVideo.title}</h2>
              </div>
              <button 
                onClick={() => {
                  if (videoRef.current) videoRef.current.pause();
                  setActiveVideo(null);
                  setIsPlaying(false);
                }}
                className="p-2 bg-neutral-800/80 hover:bg-neutral-700/80 rounded-full border border-white/10 active:scale-95 transition-all"
                title="Close Player"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Play/Pause Large Center Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button 
                onClick={togglePlay}
                className="p-5 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full active:scale-95 transition-all pointer-events-auto"
              >
                {isPlaying ? <Pause className="w-8 h-8 text-white fill-white" /> : <Play className="w-8 h-8 text-white fill-white ml-1" />}
              </button>
            </div>

            {/* Bottom Controls */}
            <div className="w-full space-y-4">
              {/* Progress Slider */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-neutral-400 font-medium tabular-nums">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => seekVideo(Number(e.target.value))}
                  className="flex-1 h-1.5 rounded-full bg-neutral-700 appearance-none cursor-pointer accent-white"
                />
                <span className="text-xs text-neutral-400 font-medium tabular-nums">{formatTime(duration)}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-5">
                  {/* Skip back 15s */}
                  <button onClick={() => skipTime(-15)} className="text-neutral-300 hover:text-white" title="Skip Back 15s">
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  {/* Play/Pause */}
                  <button onClick={togglePlay} className="text-neutral-300 hover:text-white">
                    {isPlaying ? <Pause className="w-5 h-5 fill-neutral-300" /> : <Play className="w-5 h-5 fill-neutral-300" />}
                  </button>
                  {/* Skip forward 15s */}
                  <button onClick={() => skipTime(15)} className="text-neutral-300 hover:text-white" title="Skip Forward 15s">
                    <RotateCw className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  {/* Volume Button */}
                  <button onClick={toggleMute} className="text-neutral-300 hover:text-white">
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  
                  {/* Fullscreen */}
                  <button 
                    onClick={() => {
                      if (videoRef.current?.requestFullscreen) videoRef.current.requestFullscreen();
                    }}
                    className="text-neutral-300 hover:text-white" 
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= WINDOW HEADER ================= */}
      <div id="window-header" className="window-header shrink-0 flex items-center justify-between !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2.5">
        <div className="flex items-center gap-4">
          <WindowControls target="appletv" />
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="sm:hidden p-1 rounded hover:bg-gray-200 text-gray-600 transition-colors"
            aria-label="Toggle Sidebar"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform duration-200 ${isSidebarOpen ? "rotate-0" : "rotate-180"}`} />
          </button>
        </div>
        <div className="flex-1 text-center font-bold text-gray-700 text-sm hidden sm:block">
          TV
        </div>
        <div className="w-14" />
      </div>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-20 sm:hidden"
          />
        )}

        {/* Sidebar */}
        <aside className={`
          absolute sm:relative inset-y-0 left-0 w-48 bg-gray-50 border-r border-[#d1d1d1] p-4 space-y-6 flex flex-col z-30 transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
        `}>
          {/* Search Input */}
          <div className="relative flex items-center bg-gray-200/60 border border-gray-300/40 rounded-lg px-2.5 py-1.5">
            <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs focus:outline-none border-none outline-none text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Menu Sections */}
          <div className="space-y-4">
            <div>
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-1.5">Apple TV</h3>
              <nav className="space-y-0.5">
                {[
                  { id: "watchNow", label: "Watch Now", icon: <Play className="w-3.5 h-3.5 fill-current" /> },
                  { id: "tvPlus", label: "Apple TV+", icon: <Tv className="w-3.5 h-3.5" /> },
                  { id: "store", label: "Store", icon: <ShoppingBag className="w-3.5 h-3.5" /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left transition-colors ${
                      activeTab === item.id 
                        ? "bg-gray-200 text-gray-900 shadow-sm" 
                        : "text-gray-600 hover:bg-gray-200/60 hover:text-gray-900"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-1.5">Library</h3>
              <nav className="space-y-0.5">
                {[
                  { id: "library", label: "Movies", icon: <Film className="w-3.5 h-3.5" /> },
                  { id: "favorites", label: "Up Next", icon: <FolderHeart className="w-3.5 h-3.5" /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left transition-colors ${
                      activeTab === item.id 
                        ? "bg-gray-200 text-gray-900 shadow-sm" 
                        : "text-gray-600 hover:bg-gray-200/60 hover:text-gray-900"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Tab View Contents */}
        <main className="flex-1 bg-white overflow-y-auto thin-scrollbar p-6 space-y-8 select-none text-gray-800 h-full min-h-0">
          
          {/* ================= TAB: WATCH NOW ================= */}
          {activeTab === "watchNow" && (
            <>
              {/* Featured Severance Hero Banner */}
              <section className={`relative rounded-xl overflow-hidden border border-black/5 p-6 md:p-8 flex flex-col justify-end min-h-[220px] shadow-lg ${FEATURED_SHOW.bgImage}`}>
                <div className="absolute top-4 right-4 bg-black/40 border border-white/10 px-2 py-0.5 rounded text-[10px] tracking-wider font-bold text-white uppercase">
                  Featured
                </div>
                <div className="max-w-md space-y-2 z-10">
                  <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                    {FEATURED_SHOW.category}
                  </span>
                  <h1 className="text-3xl font-extrabold tracking-tight text-white leading-none">
                    {FEATURED_SHOW.title}
                  </h1>
                  <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
                    {FEATURED_SHOW.description}
                  </p>
                  
                  {/* Hero Actions */}
                  <div className="flex items-center gap-3 pt-3">
                    <button 
                      onClick={() => setActiveVideo({ title: FEATURED_SHOW.title, url: FEATURED_SHOW.videoUrl })}
                      className="flex items-center gap-1.5 bg-white text-black px-4 py-2 rounded-lg text-xs font-bold hover:bg-neutral-200 active:scale-95 transition-all shadow-md"
                    >
                      <Play className="w-3.5 h-3.5 fill-black" />
                      Play Trailer
                    </button>
                    <button 
                      onClick={() => handleUpNextToggle("severance")}
                      className="flex items-center gap-1.5 bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-white/20 active:scale-95 transition-all"
                    >
                      {upNext.includes("severance") ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-400" />
                          In Up Next
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          Up Next
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </section>

              {/* Up Next List */}
              <section className="space-y-3">
                <h2 className="text-sm font-bold text-gray-800 px-1">Up Next</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {MOVIES.filter((m) => upNext.includes(m.id)).map((movie) => (
                    <div 
                      key={movie.id} 
                      className="group cursor-pointer space-y-2 relative"
                      onClick={() => setActiveVideo({ title: movie.title, url: movie.videoUrl })}
                    >
                      {/* Movie Card Poster */}
                      <div className={`aspect-video w-full rounded-lg ${movie.poster} flex items-center justify-center relative overflow-hidden shadow-md border border-black/5`}>
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                        <Play className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity text-white fill-white drop-shadow-md" />
                      </div>
                      
                      {/* Details */}
                      <div className="px-1">
                        <h4 className="text-xs font-bold truncate text-gray-800 group-hover:text-gray-950">{movie.title}</h4>
                        <span className="text-[10px] text-gray-500 font-semibold">{movie.duration} • {movie.category.split("•")[0]}</span>
                      </div>
                    </div>
                  ))}
                  {upNext.length === 0 && (
                    <div className="col-span-full py-6 text-center text-xs text-gray-500 italic">
                      Your Up Next list is empty. Add shows to watch them later.
                    </div>
                  )}
                </div>
              </section>

              {/* Browse Shows List */}
              <section className="space-y-3">
                <h2 className="text-sm font-bold text-gray-800 px-1">Apple Originals</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {MOVIES.map((movie) => {
                    const isInUpNext = upNext.includes(movie.id);
                    return (
                      <div 
                        key={movie.id}
                        className="group cursor-pointer space-y-2"
                      >
                        {/* Movie Card Poster */}
                        <div className={`aspect-video w-full rounded-lg ${movie.poster} flex items-center justify-center relative overflow-hidden shadow-md border border-black/5`}>
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                          
                          {/* Play button */}
                          <button 
                            onClick={() => setActiveVideo({ title: movie.title, url: movie.videoUrl })}
                            className="absolute z-10 p-2.5 bg-black/40 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60 active:scale-95"
                          >
                            <Play className="w-4 h-4 text-white fill-white" />
                          </button>

                          {/* Top Right add to Up Next */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpNextToggle(movie.id);
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-black/40 border border-white/10 rounded-full hover:bg-black/60 transition-colors"
                            title={isInUpNext ? "Remove from Up Next" : "Add to Up Next"}
                          >
                            {isInUpNext ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Plus className="w-3.5 h-3.5 text-white" />}
                          </button>
                        </div>
                        
                        {/* Details */}
                        <div className="px-1" onClick={() => setActiveVideo({ title: movie.title, url: movie.videoUrl })}>
                          <h4 className="text-xs font-bold truncate text-gray-800 group-hover:text-gray-950">{movie.title}</h4>
                          <span className="text-[10px] text-gray-500 font-semibold">{movie.category}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </>
          )}

          {/* ================= TAB: APPLE TV+ ================= */}
          {activeTab === "tvPlus" && (
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                <span className="bg-black text-white font-extrabold px-3 py-1 rounded text-lg tracking-wider">tv+</span>
                <h2 className="text-xl font-bold text-gray-800">Watch Apple Originals free in your browser.</h2>
                <p className="text-xs text-gray-500 max-w-sm">New Apple Originals added every month. Groundbreaking stories from the world’s most creative minds.</p>
              </div>

              {/* Grid of originals */}
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className="h-32 rounded-xl bg-gradient-to-tr from-sky-900 to-indigo-950 border border-black/5 p-4 flex flex-col justify-between cursor-pointer"
                  onClick={() => setActiveVideo({ title: "Severance", url: FEATURED_SHOW.videoUrl })}
                >
                  <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider">Series</span>
                  <div>
                    <h3 className="font-extrabold text-sm text-white">Severance</h3>
                    <p className="text-[10px] text-neutral-300 mt-1 line-clamp-1">Every work day is a fresh memory.</p>
                  </div>
                </div>
                
                <div 
                  className="h-32 rounded-xl bg-gradient-to-tr from-amber-900 to-orange-950 border border-black/5 p-4 flex flex-col justify-between cursor-pointer"
                  onClick={() => setActiveVideo({ title: "Sintel", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" })}
                >
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Movie</span>
                  <div>
                    <h3 className="font-extrabold text-sm text-white">Sintel</h3>
                    <p className="text-[10px] text-neutral-300 mt-1 line-clamp-1">A dragon rider's fantasy adventure.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB: STORE ================= */}
          {activeTab === "store" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-gray-800">Movie Store</h2>
                <p className="text-xs text-gray-500 mt-0.5">Buy or rent newly released movies.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { title: "Dune: Part Two", price: "$14.99 Buy", posterBg: "from-amber-600 to-yellow-800" },
                  { title: "Oppenheimer", price: "$5.99 Rent", posterBg: "from-neutral-700 to-zinc-900" },
                  { title: "Spider-Man: Across the Spider-Verse", price: "$14.99 Buy", posterBg: "from-red-600 to-indigo-900" },
                  { title: "Interstellar", price: "$3.99 Rent", posterBg: "from-blue-900 to-slate-900" },
                ].map((item, idx) => (
                  <div key={idx} className="group cursor-pointer space-y-2">
                    <div className={`aspect-[2/3] w-full rounded-lg bg-gradient-to-b ${item.posterBg} border border-black/5 flex flex-col items-center justify-center p-4 text-center shadow-lg relative overflow-hidden`}>
                      <span className="text-xs font-extrabold tracking-tight text-white group-hover:scale-105 transition-transform">{item.title}</span>
                      <button 
                        onClick={() => alert(`Purchasing ${item.title} is simulated!`)}
                        className="absolute bottom-4 left-4 right-4 bg-white text-black py-1.5 rounded-md text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {item.price}
                      </button>
                    </div>
                    <div className="px-1 text-center sm:text-left">
                      <h4 className="text-xs font-bold truncate text-gray-800 group-hover:text-gray-950">{item.title}</h4>
                      <span className="text-[10px] text-gray-500 font-semibold">{item.price.split(" ")[1]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB: LIBRARY ================= */}
          {activeTab === "library" && (
            <div className="text-center py-12 space-y-3 text-gray-800">
              <Film className="w-10 h-10 text-gray-400 mx-auto stroke-1" />
              <h2 className="text-sm font-bold text-gray-700">Your Movie Library is empty.</h2>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">Any movies you purchase or rent from the Store will show up here.</p>
              <button 
                onClick={() => setActiveTab("store")}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold active:scale-95 transition-all shadow-md"
              >
                Go to Store
              </button>
            </div>
          )}

          {/* ================= TAB: FAVORITES (UP NEXT) ================= */}
          {activeTab === "favorites" && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-gray-800">Your Up Next Queue</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {MOVIES.filter((m) => upNext.includes(m.id)).map((movie) => (
                  <div 
                    key={movie.id} 
                    className="group cursor-pointer space-y-2 relative"
                    onClick={() => setActiveVideo({ title: movie.title, url: movie.videoUrl })}
                  >
                    <div className={`aspect-video w-full rounded-lg ${movie.poster} flex items-center justify-center relative overflow-hidden shadow-md border border-black/5`}>
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                      <Play className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity text-white fill-white drop-shadow-md" />
                    </div>
                    <div className="px-1">
                      <h4 className="text-xs font-bold truncate text-gray-800 group-hover:text-gray-950">{movie.title}</h4>
                      <span className="text-[10px] text-gray-500 font-semibold">{movie.category}</span>
                    </div>
                  </div>
                ))}
                {upNext.length === 0 && (
                  <div className="col-span-full py-12 text-center text-xs text-gray-500 italic">
                    Your queue is empty. Go to watch now to add movies to your list.
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

const AppleTVWindow = windowWrapper(AppleTV, "appletv");
export default AppleTVWindow;
