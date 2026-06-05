import { Search, Play, Plus, Clock, Music4, Heart, Radio, Flame, Sparkles } from "lucide-react";

const AppleMusicTabs = ({
  activeTab,
  setActiveTab,
  tracks,
  activeTrack,
  isPlaying,
  searchQuery,
  setSearchQuery,
  onSelectTrack,
  isLoading,
  isFetchingMore,
  handleLoadMore,
  formatTime,
  setActiveCategory,
}) => {
  const quickSearchTags = [
    "Lofi Beats",
    "Arijit Singh",
    "Taylor Swift",
    "Workout Hits",
    "Gym Bass",
    "Chill Pop",
  ];

  const curatedPlaylists = [
    {
      title: "Heavy Rotation",
      subtitle: "Your daily music digest",
      query: "Arijit Singh Hits",
      coverUrl:
        "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&auto=format&fit=crop&q=80",
    },
    {
      title: "Chill Vibes",
      subtitle: "Unwind and relax",
      query: "Lofi Beats",
      coverUrl:
        "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&auto=format&fit=crop&q=80",
    },
    {
      title: "Power Workout",
      subtitle: "Pump up your energy",
      query: "Gym Bass",
      coverUrl:
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80",
    },
    {
      title: "Bollywood Hits",
      subtitle: "Top Hindi songs",
      query: "Bollywood Hits",
      coverUrl:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80",
    },
  ];

  const browseCategories = [
    { name: "Hindi Hits", query: "New Hindi Songs", icon: <Flame size={16} /> },
    { name: "Pop Music", query: "Imagine Dragons", icon: <Sparkles size={16} /> },
    { name: "Romantic", query: "Arijit Romantic", icon: <Heart size={16} /> },
    { name: "Global Chart", query: "Top Global Hits", icon: <Radio size={16} /> },
  ];

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 50) {
      if (handleLoadMore) {
        handleLoadMore();
      }
    }
  };

  if (activeTab === "Listen Now") {
    return (
      <div
        style={{ WebkitOverflowScrolling: "touch" }}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-6 scrollbar-none bg-white select-none"
      >
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Listen Now</h2>
          <p className="text-xs text-gray-500 mt-0.5">Curated mixes and heavy rotation</p>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {curatedPlaylists.map((pl, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSearchQuery("");
                setActiveCategory(pl.title);
                if (setActiveTab) setActiveTab("Library");
              }}
              className="group cursor-pointer active:scale-95 transition-all"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-md relative bg-zinc-100 border border-black/5">
                <img
                  src={pl.coverUrl}
                  alt={pl.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-2 left-3 text-[10px] uppercase tracking-wider font-extrabold text-white drop-shadow-md">
                  Mix
                </span>
              </div>
              <h4 className="text-xs font-bold text-gray-900 truncate mt-2">{pl.title}</h4>
              <p className="text-[10px] text-gray-500 truncate mt-0.5">{pl.subtitle}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">
            Recently Played
          </h3>
          <div className="space-y-3">
            {tracks.slice(0, 4).map((track) => (
              <div
                key={track.id}
                onClick={() => onSelectTrack(track)}
                className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-zinc-50 cursor-pointer transition-colors"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0 flex items-center justify-center border border-black/5">
                  {track.coverUrl ? (
                    <img src={track.coverUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div
                      className={`w-full h-full flex items-center justify-center bg-gradient-to-tr ${track.coverColor}`}
                    >
                      <span className="text-lg">{track.coverText}</span>
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-gray-900 truncate">{track.title}</h4>
                  <p className="text-[10px] text-gray-500 truncate mt-0.5">{track.artist}</p>
                </div>
                <Play size={12} className="text-red-500 opacity-60 mr-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "Browse") {
    return (
      <div
        onScroll={handleScroll}
        style={{ WebkitOverflowScrolling: "touch" }}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-6 scrollbar-none bg-white select-none"
      >
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Browse</h2>
          <p className="text-xs text-gray-500 mt-0.5">Explore new releases and categories</p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {browseCategories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSearchQuery("");
                setActiveCategory(cat.name);
                if (setActiveTab) setActiveTab("Library");
              }}
              className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 cursor-pointer active:scale-95 transition-all border border-zinc-150/10"
            >
              <div className="w-7 h-7 rounded-lg bg-red-100 text-red-500 flex items-center justify-center shrink-0">
                {cat.icon}
              </div>
              <span className="text-xs font-bold text-gray-800">{cat.name}</span>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">
            Trending Music
          </h3>
          <div className="space-y-3">
            {tracks.slice(4).map((track) => (
              <div
                key={track.id}
                onClick={() => onSelectTrack(track)}
                className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-zinc-50 cursor-pointer transition-colors"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0 flex items-center justify-center border border-black/5">
                  {track.coverUrl ? (
                    <img src={track.coverUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div
                      className={`w-full h-full flex items-center justify-center bg-gradient-to-tr ${track.coverColor}`}
                    >
                      <span className="text-lg">{track.coverText}</span>
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-gray-900 truncate">{track.title}</h4>
                  <p className="text-[10px] text-gray-500 truncate mt-0.5">{track.artist}</p>
                </div>
                <span className="text-[10px] font-medium text-gray-400">
                  {formatTime(track.duration)}
                </span>
              </div>
            ))}

            {isFetchingMore && (
              <div className="flex items-center justify-center py-4 gap-1.5">
                <span
                  className="w-1.5 h-3 bg-red-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-1.5 h-3 bg-red-500 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-1.5 h-3 bg-red-500 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "Library") {
    return (
      <div
        onScroll={handleScroll}
        style={{ WebkitOverflowScrolling: "touch" }}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-5 scrollbar-none bg-white select-none"
      >
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Library</h2>
          <p className="text-xs text-gray-500 mt-0.5">Your queue and loaded tracks</p>
        </div>

        <div className="space-y-1">
          {tracks.map((track, index) => {
            const isActive = activeTrack?.id === track.id;
            return (
              <div
                key={track.id}
                onClick={() => onSelectTrack(track)}
                className={`flex items-center gap-3.5 p-2.5 rounded-xl transition-all cursor-pointer ${
                  isActive ? "bg-red-50/50" : "hover:bg-zinc-50"
                }`}
              >
                <div className="w-5 text-center text-xs font-semibold text-gray-400 shrink-0">
                  {isActive && isPlaying ? (
                    <div className="flex items-center gap-0.5 justify-center h-3">
                      <span
                        className="w-0.5 h-3 bg-red-500 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-0.5 h-3 bg-red-500 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-0.5 h-3 bg-red-500 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                <div className="w-9 h-9 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0 flex items-center justify-center border border-black/5">
                  {track.coverUrl ? (
                    <img src={track.coverUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div
                      className={`w-full h-full flex items-center justify-center bg-gradient-to-tr ${track.coverColor}`}
                    >
                      <span className="text-lg">{track.coverText}</span>
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h4
                    className={`text-xs font-bold truncate ${isActive ? "text-red-500" : "text-gray-900"}`}
                  >
                    {track.title}
                  </h4>
                  <p className="text-[10px] text-gray-500 truncate mt-0.5">{track.artist}</p>
                </div>

                <div className="text-[10px] text-gray-450 shrink-0 font-mono pr-1">
                  {formatTime(track.duration)}
                </div>
              </div>
            );
          })}

          {isFetchingMore && (
            <div className="flex items-center justify-center py-4 gap-1.5">
              <span
                className="w-1.5 h-3 bg-red-500 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="w-1.5 h-3 bg-red-500 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="w-1.5 h-3 bg-red-500 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          )}

          {tracks.length === 0 && (
            <div className="text-center py-20 text-gray-400 text-xs italic">
              No tracks loaded. Try searching!
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeTab === "Search") {
    return (
      <div
        onScroll={handleScroll}
        style={{ WebkitOverflowScrolling: "touch" }}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-5 scrollbar-none bg-white select-none"
      >
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Search</h2>
        </div>

        <div className="relative flex items-center bg-zinc-100 border border-zinc-200/50 rounded-xl px-3 py-2 h-10 shadow-sm shrink-0">
          <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Artists, Songs, Lyrics, More"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm focus:outline-none border-none outline-none text-gray-800 placeholder-zinc-400"
          />
        </div>

        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Quick Search</h3>
          <div className="flex flex-wrap gap-2">
            {quickSearchTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-zinc-100 hover:bg-red-50 hover:text-red-500 text-gray-700 active:scale-95 transition-all border border-transparent hover:border-red-100"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2">
          {isLoading && tracks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="flex items-center gap-1">
                <span
                  className="w-1.5 h-3 bg-red-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-1.5 h-3 bg-red-500 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-1.5 h-3 bg-red-500 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
              <p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase animate-pulse">
                Searching Apple Music...
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {tracks.map((track) => {
                const isActive = activeTrack?.id === track.id;
                return (
                  <div
                    key={track.id}
                    onClick={() => onSelectTrack(track)}
                    className={`flex items-center gap-3.5 p-2 rounded-xl transition-all cursor-pointer ${
                      isActive ? "bg-red-50/50" : "hover:bg-zinc-50"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0 flex items-center justify-center border border-black/5">
                      {track.coverUrl ? (
                        <img src={track.coverUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div
                          className={`w-full h-full flex items-center justify-center bg-gradient-to-tr ${track.coverColor}`}
                        >
                          <span className="text-lg">{track.coverText}</span>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4
                        className={`text-xs font-bold truncate ${isActive ? "text-red-500" : "text-gray-900"}`}
                      >
                        {track.title}
                      </h4>
                      <p className="text-[10px] text-gray-500 truncate mt-0.5">{track.artist}</p>
                    </div>
                    <Play size={12} className="text-red-500 opacity-60 mr-1" />
                  </div>
                );
              })}

              {isFetchingMore && (
                <div className="flex items-center justify-center py-4 gap-1.5">
                  <span
                    className="w-1.5 h-3 bg-red-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-1.5 h-3 bg-red-500 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-3 bg-red-500 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              )}

              {tracks.length === 0 && searchQuery && !isLoading && (
                <div className="text-center py-16 text-gray-400 text-xs italic">
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default AppleMusicTabs;
