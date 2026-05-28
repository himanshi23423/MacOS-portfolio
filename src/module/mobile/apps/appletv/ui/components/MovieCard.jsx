import { Check, Play, Plus } from "lucide-react";

const MovieCard = ({
  movie,
  isInUpNext = false,
  onPlay,
  onToggleUpNext,
  showToggle = false,
  compactMeta = false,
}) => (
  <div className="group cursor-pointer space-y-2" onClick={onPlay}>
    <div
      className={`aspect-video w-full rounded-lg ${movie.poster} flex items-center justify-center relative overflow-hidden shadow-md border border-black/5`}
    >
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
      <button
        onClick={(event) => {
          event.stopPropagation();
          onPlay();
        }}
        className="absolute z-10 p-2.5 bg-black/40 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60 active:scale-95"
      >
        <Play className="w-4 h-4 text-white fill-white" />
      </button>
      {showToggle && (
        <button
          onClick={(event) => {
            event.stopPropagation();
            onToggleUpNext(movie.id);
          }}
          className="absolute top-2 right-2 p-1.5 bg-black/40 border border-white/10 rounded-full hover:bg-black/60 transition-colors"
          title={isInUpNext ? "Remove from Up Next" : "Add to Up Next"}
        >
          {isInUpNext ? (
            <Check className="w-3.5 h-3.5 text-green-400" />
          ) : (
            <Plus className="w-3.5 h-3.5 text-white" />
          )}
        </button>
      )}
    </div>
    <div className="px-1">
      <h4 className="text-xs font-bold truncate text-gray-800 group-hover:text-gray-950">
        {movie.title}
      </h4>
      <span className="text-[10px] text-gray-500 font-semibold">
        {compactMeta ? `${movie.duration} • ${movie.category.split("•")[0]}` : movie.category}
      </span>
    </div>
  </div>
);

export default MovieCard;
