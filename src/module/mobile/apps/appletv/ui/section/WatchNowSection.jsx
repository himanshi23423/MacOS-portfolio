import { Check, Play, Plus } from "lucide-react";
import MovieCard from "../components/MovieCard";
import { FEATURED_SHOW, MOVIES } from "../components/appleTvCatalog";

const WatchNowSection = ({ upNext, onPlayFeatured, onPlayMovie, onToggleUpNext }) => {
  const queuedMovies = MOVIES.filter((movie) => upNext.includes(movie.id));

  return (
    <>
      <section
        className={`relative rounded-xl overflow-hidden border border-black/5 p-6 md:p-8 flex flex-col justify-end min-h-[220px] shadow-lg ${FEATURED_SHOW.bgImage}`}
      >
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
          <div className="flex items-center gap-3 pt-3">
            <button
              onClick={onPlayFeatured}
              className="flex items-center gap-1.5 bg-white text-black px-4 py-2 rounded-lg text-xs font-bold hover:bg-neutral-200 active:scale-95 transition-all shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              Play Trailer
            </button>
            <button
              onClick={() => onToggleUpNext("severance")}
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

      <section className="space-y-3">
        <h2 className="text-sm font-bold text-gray-800 px-1">Up Next</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
    </>
  );
};

export default WatchNowSection;
