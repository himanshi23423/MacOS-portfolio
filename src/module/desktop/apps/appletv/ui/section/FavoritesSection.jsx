import MovieCard from "../components/MovieCard";
import { MOVIES } from "../components/appleTvCatalog";

const FavoritesSection = ({ upNext, onPlayMovie }) => {
  const queuedMovies = MOVIES.filter((movie) => upNext.includes(movie.id));

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold text-gray-800">Your Up Next Queue</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {queuedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onPlay={() => onPlayMovie(movie)}
          />
        ))}
        {queuedMovies.length === 0 && (
          <div className="col-span-full py-12 text-center text-xs text-gray-500 italic">
            Your queue is empty. Go to watch now to add movies to your list.
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesSection;
