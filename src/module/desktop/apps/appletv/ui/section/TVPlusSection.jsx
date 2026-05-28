import { FEATURED_SHOW } from "../components/appleTvCatalog";

const TVPlusSection = ({ onPlayFeatured }) => (
  <div className="space-y-6">
    <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
      <span className="bg-black text-white font-extrabold px-3 py-1 rounded text-lg tracking-wider">
        tv+
      </span>
      <h2 className="text-xl font-bold text-gray-800">
        Watch Apple Originals free in your browser.
      </h2>
      <p className="text-xs text-gray-500 max-w-sm">
        New Apple Originals added every month. Groundbreaking stories from the
        world's most creative minds.
      </p>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div
        className="h-32 rounded-xl bg-gradient-to-tr from-sky-900 to-indigo-950 border border-black/5 p-4 flex flex-col justify-between cursor-pointer"
        onClick={onPlayFeatured}
      >
        <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider">
          Series
        </span>
        <div>
          <h3 className="font-extrabold text-sm text-white">Severance</h3>
          <p className="text-[10px] text-neutral-300 mt-1 line-clamp-1">
            Every work day is a fresh memory.
          </p>
        </div>
      </div>

      <div
        className="h-32 rounded-xl bg-gradient-to-tr from-amber-900 to-orange-950 border border-black/5 p-4 flex flex-col justify-between cursor-pointer"
        onClick={() =>
          onPlayFeatured({
            title: "Sintel",
            url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
          })
        }
      >
        <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
          Movie
        </span>
        <div>
          <h3 className="font-extrabold text-sm text-white">Sintel</h3>
          <p className="text-[10px] text-neutral-300 mt-1 line-clamp-1">
            A dragon rider's fantasy adventure.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default TVPlusSection;
