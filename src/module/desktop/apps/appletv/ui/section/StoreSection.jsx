import StoreMovieCard from "../components/StoreMovieCard";
import { STORE_MOVIES } from "../../data";

const StoreSection = ({ onPlayMovie, isCompact }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-base font-bold text-gray-800">Movie Store</h2>
      <p className="text-xs text-gray-500 mt-0.5">Buy or rent newly released movies.</p>
    </div>

    <div className={`grid gap-4 ${isCompact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"}`}>
      {STORE_MOVIES.map((movie) => (
        <StoreMovieCard key={movie.title} movie={movie} onPlayMovie={onPlayMovie} />
      ))}
    </div>
  </div>
);

export default StoreSection;
