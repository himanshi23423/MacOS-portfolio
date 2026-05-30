import { Check, Play, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { FEATURED_SHOW, MOVIES } from "../components/appleTvCatalog";

const WatchNowSection = ({ upNext, onPlayFeatured, onPlayMovie, onToggleUpNext, watchNowMovies, isCompact }) => {
  const queuedMovies = MOVIES.filter((movie) => upNext.includes(movie.id));
  const [backdropUrl, setBackdropUrl] = useState(null);

  useEffect(() => {
    if (!FEATURED_SHOW.tmdbId) return;
    const fetchBackdrop = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY || "8265bd1679663a7ea12ac168da84d2e8";
        const type = FEATURED_SHOW.type || "tv";
        const res = await fetch(`https://api.themoviedb.org/3/${type}/${FEATURED_SHOW.tmdbId}?api_key=${apiKey}`);
        const data = await res.json();
        if (data.backdrop_path) {
          setBackdropUrl(`https://image.tmdb.org/t/p/original${data.backdrop_path}`);
        }
      } catch (err) {
        console.error("Error fetching featured backdrop:", err);
      }
    };
    fetchBackdrop();
  }, []);

  return (
    <>
      <section
        className={`relative rounded-xl overflow-hidden border border-black/5 p-6 md:p-8 flex flex-col justify-end min-h-[260px] shadow-lg ${!backdropUrl ? FEATURED_SHOW.bgImage : ""}`}
        style={
          backdropUrl
            ? {
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.1) 80%), url(${backdropUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <div className="absolute top-4 right-4 bg-black/60 border border-white/10 px-2 py-0.5 rounded text-[10px] tracking-wider font-bold text-white uppercase backdrop-blur-sm">
          Featured
        </div>
        <div className="max-w-md space-y-2 z-10">
          <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase">
            {FEATURED_SHOW.category}
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-none">
            {FEATURED_SHOW.title}
          </h1>
          <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
            {FEATURED_SHOW.description}
          </p>
          <div className="flex items-center gap-3 pt-3">
            <button
              onClick={() => onPlayFeatured()}
              className="flex items-center gap-1.5 bg-white text-black px-4 py-2 rounded-lg text-xs font-bold hover:bg-neutral-200 active:scale-95 transition-all shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              Play Trailer
            </button>
            <button
              onClick={() => onToggleUpNext("ted_lasso")}
              className="flex items-center gap-1.5 bg-white/15 border border-white/10 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-white/25 active:scale-95 transition-all"
            >
              {upNext.includes("ted_lasso") ? (
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


      <section className="space-y-3">
        <h2 className="text-sm font-bold text-gray-800 px-1">Up Next</h2>
        <div className={`grid gap-4 ${isCompact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"}`}>
          {queuedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              compactMeta
              onPlay={() => onPlayMovie(movie)}
            />
          ))}
          {queuedMovies.length === 0 && (
            <div className="col-span-full py-6 text-center text-xs text-gray-500 italic">
              Your Up Next list is empty. Add shows to watch them later.
            </div>
          )}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-bold text-gray-800 px-1">Apple Originals</h2>
        <div className={`grid gap-4 ${isCompact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"}`}>
          {MOVIES.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              showToggle
              isInUpNext={upNext.includes(movie.id)}
              onPlay={() => onPlayMovie(movie)}
              onToggleUpNext={onToggleUpNext}
            />
          ))}
        </div>
      </section>

      {/* Dynamic Infinite Loaded Trending Movies */}
      {watchNowMovies && watchNowMovies.length > 0 && (
        <section className="space-y-3 pt-4 border-t border-gray-100">
          <h2 className="text-sm font-bold text-gray-800 px-1">Trending Movies</h2>
          <div className={`grid gap-4 ${isCompact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"}`}>
            {watchNowMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onPlay={() => onPlayMovie(movie)}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default WatchNowSection;

