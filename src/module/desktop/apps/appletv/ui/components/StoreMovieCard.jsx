const StoreMovieCard = ({ movie }) => (
  <div className="group cursor-pointer space-y-2">
    <div
      className={`aspect-[2/3] w-full rounded-lg bg-gradient-to-b ${movie.posterBg} border border-black/5 flex flex-col items-center justify-center p-4 text-center shadow-lg relative overflow-hidden`}
    >
      <span className="text-xs font-extrabold tracking-tight text-white group-hover:scale-105 transition-transform">
        {movie.title}
      </span>
      <button
        onClick={() => alert(`Purchasing ${movie.title} is simulated!`)}
        className="absolute bottom-4 left-4 right-4 bg-white text-black py-1.5 rounded-md text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {movie.price}
      </button>
    </div>
    <div className="px-1 text-center sm:text-left">
      <h4 className="text-xs font-bold truncate text-gray-800 group-hover:text-gray-950">
        {movie.title}
      </h4>
      <span className="text-[10px] text-gray-500 font-semibold">
        {movie.price.split(" ")[1]}
      </span>
    </div>
  </div>
);

export default StoreMovieCard;
