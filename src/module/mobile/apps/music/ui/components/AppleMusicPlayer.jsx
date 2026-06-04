import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronDown,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Sparkles,
} from "lucide-react";
import { useState, useMemo } from "react";

const AppleMusicPlayer = ({
  activeTrack,
  currentTime,
  isPlaying,
  volume,
  isMuted,
  isShuffle,
  isRepeat,
  onPlayPause,
  onNext,
  onPrev,
  onShuffleToggle,
  onRepeatToggle,
  onProgressChange,
  onMuteToggle,
  onVolumeChange,
  formatTime,
  onClose,
}) => {
  const [showLyrics, setShowLyrics] = useState(false);

  const coverGradient = useMemo(() => {
    if (activeTrack?.coverColor) {
      const classes = activeTrack.coverColor.split(" ");
      const from = classes.find((c) => c.startsWith("from-"))?.replace("from-", "") || "indigo-600";
      const to = classes.find((c) => c.startsWith("to-"))?.replace("to-", "") || "pink-500";
      return `linear-gradient(135deg, var(--tw-color-${from}, #3b82f6) 0%, var(--tw-color-${to}, #ec4899) 100%)`;
    }
    return "linear-gradient(135deg, #1e1e24 0%, #09090b 100%)";
  }, [activeTrack]);

  const remainingTime = useMemo(() => {
    if (!activeTrack || !activeTrack.duration) return "-0:00";
    const rem = activeTrack.duration - currentTime;
    return `-${formatTime(rem >= 0 ? rem : 0)}`;
  }, [activeTrack, currentTime, formatTime]);

  const progressPercent = useMemo(() => {
    if (!activeTrack || !activeTrack.duration) return 0;
    return (currentTime / activeTrack.duration) * 100;
  }, [activeTrack, currentTime]);

  const lyricsList = [
    "Singing with the stars in the night sky...",
    "Feeling the vibe, letting hours float by...",
    "Nothing can stop us, we are climbing so high...",
    "Just close your eyes and let the rhythm take you...",
    "Under the neon lights, we are brand new...",
    "Every beat is a memory of you...",
    "We keep on dancing, until the sun breaks through...",
  ];

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col justify-between select-none text-white overflow-hidden animate-slide-up bg-black"
      style={{
        backgroundImage: activeTrack?.coverUrl ? undefined : coverGradient,
      }}
    >
      {activeTrack?.coverUrl && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={activeTrack.coverUrl}
            alt=""
            className="w-full h-full object-cover scale-155 blur-3xl opacity-50"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      <div className="relative z-10 flex items-center justify-between px-6 pt-12 pb-4 shrink-0 bg-gradient-to-b from-black/20 to-transparent">
        <button
          onClick={onClose}
          className="p-1.5 rounded-full bg-white/10 active:scale-90 transition-transform border-none outline-none cursor-pointer text-white"
        >
          <ChevronDown size={22} />
        </button>
        <span className="text-xs font-bold uppercase tracking-wider text-white/60">
          Now Playing
        </span>
        <button
          onClick={() => setShowLyrics(!showLyrics)}
          className={`p-1.5 rounded-full active:scale-90 transition-all border-none outline-none cursor-pointer ${
            showLyrics ? "bg-red-500 text-white" : "bg-white/10 text-white"
          }`}
        >
          <Sparkles size={18} />
        </button>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 py-2 min-h-0">
        {!showLyrics ? (
          <div className="flex-1 flex items-center justify-center w-full max-h-[300px] my-4">
            <div
              className={`aspect-square w-full max-w-[240px] rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] border border-white/10 transition-all duration-500 relative flex items-center justify-center ${
                isPlaying ? "scale-105" : "scale-95 opacity-80"
              }`}
            >
              {activeTrack?.coverUrl ? (
                <img
                  src={activeTrack.coverUrl}
                  alt={activeTrack.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr ${activeTrack?.coverColor || "from-neutral-800 to-zinc-950"}`}
                >
                  <span className="text-7xl mb-2">{activeTrack?.coverText || "🎵"}</span>
                </div>
              )}
              {isPlaying && (
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1">
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
        ) : (
          <div className="flex-1 w-full overflow-y-auto px-2 py-4 my-2 scrollbar-none flex flex-col gap-6 text-center justify-center">
            {lyricsList.map((line, idx) => (
              <p
                key={idx}
                className={`text-lg font-bold transition-all duration-300 ${
                  idx === Math.floor(currentTime / 5) % lyricsList.length
                    ? "text-white scale-105"
                    : "text-white/40 filter blur-[0.5px]"
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        )}

        <div className="w-full text-left mt-2 shrink-0">
          <div className="flex justify-between items-center">
            <div className="min-w-0 flex-1 pr-4">
              <h2 className="text-xl font-bold tracking-tight truncate text-white">
                {activeTrack?.title || "Not Playing"}
              </h2>
              <p className="text-sm font-medium text-white/60 truncate mt-0.5">
                {activeTrack?.artist || "Choose a song to start"}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full mt-6 shrink-0">
          <div className="relative group w-full h-1 bg-white/20 rounded-full cursor-pointer">
            <div
              className="absolute top-0 left-0 h-full bg-white rounded-full relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg" />
            </div>
            <input
              type="range"
              min="0"
              max={activeTrack?.duration || 100}
              value={currentTime}
              onChange={onProgressChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-[10px] font-semibold text-white/50 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{remainingTime}</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-8 pb-14 shrink-0 flex flex-col gap-6 bg-gradient-to-t from-black/30 to-transparent">
        <div className="flex items-center justify-around w-full">
          <button
            onClick={onShuffleToggle}
            className={`p-2 rounded-full border-none bg-transparent outline-none cursor-pointer transition-colors ${
              isShuffle ? "text-red-500" : "text-white/40"
            }`}
          >
            <Shuffle size={20} />
          </button>

          <div className="flex items-center gap-8">
            <button
              onClick={onPrev}
              className="p-3 rounded-full border-none bg-transparent text-white active:scale-90 transition-transform outline-none cursor-pointer"
            >
              <SkipBack size={28} fill="white" />
            </button>
            <button
              onClick={onPlayPause}
              className="p-5 bg-white text-black rounded-full shadow-xl active:scale-90 transition-transform border-none outline-none cursor-pointer flex items-center justify-center"
            >
              {isPlaying ? (
                <Pause size={28} fill="black" />
              ) : (
                <Play size={28} fill="black" className="ml-1" />
              )}
            </button>
            <button
              onClick={onNext}
              className="p-3 rounded-full border-none bg-transparent text-white active:scale-90 transition-transform outline-none cursor-pointer"
            >
              <SkipForward size={28} fill="white" />
            </button>
          </div>

          <button
            onClick={onRepeatToggle}
            className={`p-2 rounded-full border-none bg-transparent outline-none cursor-pointer transition-colors ${
              isRepeat ? "text-red-500" : "text-white/40"
            }`}
          >
            <Repeat size={20} />
          </button>
        </div>

        <div className="flex items-center gap-3.5 px-2">
          <button
            onClick={onMuteToggle}
            className="p-1 rounded-full border-none bg-transparent text-white/50 hover:text-white outline-none cursor-pointer"
          >
            {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <div className="relative flex-1 h-1 bg-white/20 rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-white/80 rounded-full"
              style={{ width: `${isMuted ? 0 : volume}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={onVolumeChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <Volume2 size={16} className="text-white/50" />
        </div>
      </div>
    </div>
  );
};

export default AppleMusicPlayer;
