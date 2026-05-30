import { useState, useEffect } from "react";
import { Play, Plus, Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import MovieCard from "../components/MovieCard";

const CAROUSEL_ITEMS = [
  {
    id: "severance",
    title: "Severance",
    category: "Sci-Fi Thriller • Apple TV+",
    description: "Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives. When a mysterious colleague appears outside of work, it begins a journey to discover the truth about their jobs.",
    tmdbId: "95396",
    type: "tv",
    season: 1,
    episode: 1,
    bgFallback: "bg-gradient-to-tr from-slate-900 to-zinc-950",
  },
  {
    id: "ted_lasso",
    title: "Ted Lasso",
    category: "Comedy • Apple TV+",
    description: "Small-time American football coach Ted Lasso is hired to coach a professional soccer team in England, despite having no experience coaching soccer.",
    tmdbId: "97546",
    type: "tv",
    season: 1,
    episode: 1,
    bgFallback: "bg-gradient-to-tr from-sky-950 to-blue-900",
  },
  {
    id: "foundation",
    title: "Foundation",
    category: "Sci-Fi Fantasy • Apple TV+",
    description: "Based on the award-winning novels by Isaac Asimov, Foundation chronicles a band of exiles on their monumental journey to save humanity and rebuild civilization amid the fall of the Galactic Empire.",
    tmdbId: "91363",
    type: "tv",
    season: 1,
    episode: 1,
    bgFallback: "bg-gradient-to-tr from-neutral-900 to-indigo-950",
  },
  {
    id: "silo",
    title: "Silo",
    category: "Sci-Fi Drama • Apple TV+",
    description: "In a ruined and toxic future, a community exists in a giant underground silo that plunges hundreds of stories deep. There, people live in a society full of regulations they believe are meant to protect them.",
    tmdbId: "125988",
    type: "tv",
    season: 1,
    episode: 1,
    bgFallback: "bg-gradient-to-tr from-stone-900 to-amber-950",
  }
];

const TVPlusSection = ({ onPlayFeatured, onPlayMovie, upNext = [], onToggleUpNext }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselBackdrops, setCarouselBackdrops] = useState({});
  const [popularSeries, setPopularSeries] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [sciFiSeries, setSciFiSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Carousel Backdrops
  useEffect(() => {
    const fetchBackdrops = async () => {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY || "8265bd1679663a7ea12ac168da84d2e8";
      const backdrops = {};
      for (const item of CAROUSEL_ITEMS) {
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/${item.type}/${item.tmdbId}?api_key=${apiKey}`
          );
          const data = await res.json();
          if (data.backdrop_path) {
            backdrops[item.id] = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;
          }
        } catch (err) {
          console.error(`Error fetching backdrop for ${item.title}:`, err);
        }
      }
      setCarouselBackdrops(backdrops);
    };
    fetchBackdrops();
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Apple TV+ content categories
  useEffect(() => {
    const fetchAppleContent = async () => {
      setIsLoading(true);
      const apiKey = import.meta.env.VITE_TMDB_API_KEY || "8265bd1679663a7ea12ac168da84d2e8";
      try {
        // Popular Apple TV Shows (Network 2552)
        const tvRes = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_networks=2552&sort_by=popularity.desc`
        );
        const tvData = await tvRes.json();

        // Popular Apple TV Movies (Watch Provider 350, US region)
        const movieRes = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_watch_providers=350&watch_region=US&sort_by=popularity.desc`
        );
        const movieData = await movieRes.json();

        if (tvData.results) {
          const formattedTv = tvData.results.map((show) => ({
            id: `apple_tv_${show.id}`,
            title: show.name,
            category: `${show.vote_average ? show.vote_average.toFixed(1) : "N/A"} ★ • Apple TV+`,
            duration: "Series",
            tmdbId: show.id.toString(),
            type: "tv",
            season: 1,
            episode: 1,
            genres: show.genre_ids || [],
          }));

          setPopularSeries(formattedTv.slice(0, 8));
          setSciFiSeries(formattedTv.filter((s) => s.genres.includes(10765) || s.genres.includes(18)).slice(0, 8));
        }

        if (movieData.results) {
          const formattedMovies = movieData.results.map((movie) => ({
            id: `apple_movie_${movie.id}`,
            title: movie.title,
            category: `${movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} ★ • Feature Film`,
            duration: "Movie",
            tmdbId: movie.id.toString(),
            type: "movie",
          }));
          setPopularMovies(formattedMovies.slice(0, 8));
        }
      } catch (err) {
        console.error("Error fetching Apple TV+ TMDB data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppleContent();
  }, []);

  const currentHero = CAROUSEL_ITEMS[activeSlide];
  const heroBackdrop = carouselBackdrops[currentHero.id];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
  };

  // Fallback static listings for mobile
  const fallbackSeries = [
    { id: "sintel", title: "Sintel", category: "Fantasy • Apple TV+", duration: "15 min", tmdbId: "sintel", type: "movie", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" },
    { id: "bbb", title: "Big Buck Bunny", category: "Comedy • Apple TV+", duration: "10 min", tmdbId: "bbb", type: "movie", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { id: "elephants", title: "Elephant's Dream", category: "Sci-Fi • Apple TV+", duration: "11 min", tmdbId: "elephants", type: "movie", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
    { id: "tos", title: "Tears of Steel", category: "Action • Apple TV+", duration: "12 min", tmdbId: "tos", type: "movie", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" },
  ];

  const finalSeries = popularSeries.length > 0 ? popularSeries : fallbackSeries;
  const finalMovies = popularMovies.length > 0 ? popularMovies : [];
  const finalSciFi = sciFiSeries.length > 0 ? sciFiSeries : [];

  return (
    <div className="space-y-8 pb-10">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-1">
        <span className="bg-black text-white font-extrabold px-3 py-1 rounded-md text-sm tracking-widest uppercase shadow-sm">
          tv+
        </span>
        <div>
          <h2 className="text-lg font-bold text-gray-800 leading-tight">Apple TV+</h2>
          <p className="text-xs text-gray-400">Groundbreaking Apple Originals.</p>
        </div>
      </div>

      {/* Hero Carousel Section */}
      <section
        className={`relative rounded-2xl overflow-hidden border border-black/5 p-6 flex flex-col justify-end min-h-[260px] shadow-xl transition-all duration-700 ease-in-out ${
          !heroBackdrop ? currentHero.bgFallback : ""
        }`}
        style={
          heroBackdrop
            ? {
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%), url(${heroBackdrop})`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
              }
            : undefined
        }
      >
        {/* Carousel Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 bg-black/40 hover:bg-black/60 border border-white/10 rounded-full text-white backdrop-blur-md transition-all active:scale-90"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-black/40 hover:bg-black/60 border border-white/10 rounded-full text-white backdrop-blur-md transition-all active:scale-90"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
          {CAROUSEL_ITEMS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === activeSlide ? "bg-white scale-125 w-3" : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Hero Metadata & CTA */}
        <div className="max-w-xs space-y-2.5 z-10 text-left">
          <span className="text-[9px] font-extrabold tracking-widest text-sky-400 uppercase bg-sky-950/40 border border-sky-500/20 px-1.5 py-0.5 rounded backdrop-blur-sm inline-block">
            {currentHero.category}
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-white leading-none">
            {currentHero.title}
          </h1>
          <p className="text-[11px] text-neutral-200 leading-relaxed line-clamp-3">
            {currentHero.description}
          </p>
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => onPlayFeatured(currentHero)}
              className="flex items-center gap-1 bg-white text-black px-3.5 py-2 rounded-lg text-[10px] font-bold hover:bg-neutral-200 active:scale-95 transition-all shadow-lg"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              Watch Now
            </button>
            <button
              onClick={() => onToggleUpNext(currentHero.id)}
              className="flex items-center gap-1 bg-white/15 border border-white/10 text-white px-3.5 py-2 rounded-lg text-[10px] font-bold hover:bg-white/25 active:scale-95 transition-all backdrop-blur-md"
            >
              {upNext.includes(currentHero.id) ? (
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

      {isLoading && (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
        </div>
      )}

      {!isLoading && (
        <>
          {/* Popular Series Row */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-gray-800 px-1">Popular Series</h3>
            <div className="grid grid-cols-2 gap-4">
              {finalSeries.map((show) => (
                <MovieCard
                  key={show.id}
                  movie={show}
                  showToggle
                  isInUpNext={upNext.includes(show.id)}
                  onPlay={() => onPlayMovie(show)}
                  onToggleUpNext={onToggleUpNext}
                />
              ))}
            </div>
          </section>

          {/* Popular Movies Row */}
          {finalMovies.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-sm font-bold text-gray-800 px-1">Feature Films</h3>
              <div className="grid grid-cols-2 gap-4">
                {finalMovies.map((movie) => (
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
          )}

          {/* Acclaimed Drama & Sci-Fi Row */}
          {finalSciFi.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-sm font-bold text-gray-800 px-1">Acclaimed Drama & Sci-Fi</h3>
              <div className="grid grid-cols-2 gap-4">
                {finalSciFi.map((show) => (
                  <MovieCard
                    key={show.id}
                    movie={show}
                    showToggle
                    isInUpNext={upNext.includes(show.id)}
                    onPlay={() => onPlayMovie(show)}
                    onToggleUpNext={onToggleUpNext}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default TVPlusSection;
