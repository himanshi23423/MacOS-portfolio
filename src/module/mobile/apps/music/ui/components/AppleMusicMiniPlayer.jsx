import { Play, Pause, SkipForward } from "lucide-react";

const AppleMusicMiniPlayer = ({ activeTrack, isPlaying, onPlayPause, onNext, onExpand }) => {
  if (!activeTrack) return null;

  return (
    <div
      onClick={onExpand}
      className="absolute bottom-[66px] left-3 right-3 h-14 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl flex items-center justify-between px-3 shadow-lg z-30 cursor-pointer active:scale-[0.99] transition-transform select-none"
    >
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        <div className="w-9 h-9 rounded-lg overflow-hidden bg-zinc-150 flex-shrink-0 shadow-sm border border-black/5 flex items-center justify-center">
          {activeTrack.coverUrl ? (
            <img src={activeTrack.coverUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <div
              className={`w-full h-full flex items-center justify-center bg-gradient-to-tr ${activeTrack.coverColor || "from-indigo-600 to-pink-500"}`}
            >
              <span className="text-lg">{activeTrack.coverText || "🎵"}</span>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
            {activeTrack.title}
          </h4>
          <p className="text-[10px] text-gray-500 dark:text-zinc-400 truncate mt-0.5">
            {activeTrack.artist}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onPlayPause}
          className="p-2 text-zinc-800 dark:text-white hover:text-red-500 active:scale-90 transition-transform bg-transparent border-none outline-none cursor-pointer flex items-center justify-center"
        >
          {isPlaying ? (
            <Pause size={18} fill="currentColor" />
          ) : (
            <Play size={18} fill="currentColor" />
          )}
        </button>
        <button
          onClick={onNext}
          className="p-2 text-zinc-800 dark:text-white hover:text-red-500 active:scale-90 transition-transform bg-transparent border-none outline-none cursor-pointer flex items-center justify-center"
        >
          <SkipForward size={18} fill="currentColor" />
        </button>
      </div>
    </div>
  );
};

export default AppleMusicMiniPlayer;
