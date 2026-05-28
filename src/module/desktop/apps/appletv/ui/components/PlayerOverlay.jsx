import {
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

const formatTime = (timeInSecs) => {
  if (Number.isNaN(timeInSecs)) return "00:00";
  const minutes = Math.floor(timeInSecs / 60).toString().padStart(2, "0");
  const seconds = Math.floor(timeInSecs % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const PlayerOverlay = ({
  activeVideo,
  videoRef,
  isPlaying,
  isMuted,
  progress,
  duration,
  currentTime,
  showControls,
  onClose,
  onMouseMove,
  onTogglePlay,
  onToggleMute,
  onSeek,
  onSkip,
  onPlay,
  onPause,
  onTimeUpdate,
  onLoadedMetadata,
}) => {
  if (!activeVideo) return null;

  return (
    <div
      className="absolute inset-0 bg-black z-50 flex flex-col justify-between"
      onMouseMove={onMouseMove}
    >
      <video
        ref={videoRef}
        src={activeVideo.url}
        autoPlay
        onPlay={onPlay}
        onPause={onPause}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        className="w-full h-full object-contain"
        onClick={onTogglePlay}
      />
      <div
        className={`absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-black/80 via-transparent to-black/60 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-blue-400 tracking-wider uppercase">
              Now Streaming
            </span>
            <h2 className="text-lg font-bold text-white leading-tight">
              {activeVideo.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-neutral-800/80 hover:bg-neutral-700/80 rounded-full border border-white/10 active:scale-95 transition-all"
            title="Close Player"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <button
            onClick={onTogglePlay}
            className="p-5 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full active:scale-95 transition-all pointer-events-auto"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white fill-white" />
            ) : (
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            )}
          </button>
        </div>

        <div className="w-full space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 font-medium tabular-nums">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(event) => onSeek(Number(event.target.value))}
              className="flex-1 h-1.5 rounded-full bg-neutral-700 appearance-none cursor-pointer accent-white"
            />
            <span className="text-xs text-neutral-400 font-medium tabular-nums">
              {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-5">
              <button
                onClick={() => onSkip(-15)}
                className="text-neutral-300 hover:text-white"
                title="Skip Back 15s"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={onTogglePlay}
                className="text-neutral-300 hover:text-white"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-neutral-300" />
                ) : (
                  <Play className="w-5 h-5 fill-neutral-300" />
                )}
              </button>
              <button
                onClick={() => onSkip(15)}
                className="text-neutral-300 hover:text-white"
                title="Skip Forward 15s"
              >
                <RotateCw className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onToggleMute}
                className="text-neutral-300 hover:text-white"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => {
                  if (videoRef.current?.requestFullscreen) {
                    videoRef.current.requestFullscreen();
                  }
                }}
                className="text-neutral-300 hover:text-white"
                title="Fullscreen"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerOverlay;
