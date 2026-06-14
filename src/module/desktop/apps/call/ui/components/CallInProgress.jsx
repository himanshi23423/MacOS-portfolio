import { User, Mic, MicOff, Video, VideoOff, Volume2, VolumeX, PhoneOff } from "lucide-react";

const CallInProgress = ({
  activeCall,
  callTimer,
  micMuted,
  cameraMuted,
  speakerMuted,
  onMicToggle,
  onCameraToggle,
  onSpeakerToggle,
  onEndCall,
  formatTimer,
}) => {
  return (
    <div className="absolute inset-0 bg-neutral-900 text-white z-40 flex flex-col items-center justify-between p-6 md:p-8 animate-fade-in h-full">
      <div className="text-center space-y-2 pt-4">
        <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase">
          FaceTime {activeCall.type === "video" ? "Video" : "Audio"}
        </span>
        <h2 className="text-xl font-bold tracking-tight">{activeCall.name}</h2>
        <div className="flex items-center justify-center gap-1.5">
          {activeCall.status === "ringing" ? (
            <>
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" />
              <span className="text-xs text-neutral-400 font-medium animate-pulse">Ringing...</span>
            </>
          ) : (
            <>
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs text-neutral-400 font-bold tabular-nums">{formatTimer(callTimer)}</span>
            </>
          )}
        </div>
      </div>

      <div className="relative w-full max-w-[400px] aspect-video md:aspect-[4/3] bg-neutral-950 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
        {activeCall.type === "video" && !cameraMuted ? (
          <div className="absolute inset-0 bg-neutral-950 flex items-center justify-center overflow-hidden">
            {activeCall.status === "connected" ? (
              <img
                src="/images/facetime_call_preview.png"
                alt="Active Video Call Stream"
                className="w-full h-full object-cover animate-fade-in"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-tr from-neutral-800 via-indigo-950 to-neutral-900 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/20" />
                <div className="w-20 h-20 rounded-full bg-blue-600/30 border border-blue-400/30 animate-pulse flex items-center justify-center z-10">
                  <User className="w-10 h-10 text-blue-400" />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center space-y-4">
            {activeCall.avatar ? (
              <img
                src={activeCall.avatar}
                alt={activeCall.name}
                className="w-20 h-20 rounded-full object-cover shadow-md border border-white/10"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 text-white flex items-center justify-center font-bold text-xl uppercase shadow-md border border-white/10">
                {activeCall.name.split(" ").map(n => n[0]).join("")}
              </div>
            )}
            {cameraMuted && activeCall.type === "video" && (
              <span className="text-[10px] text-red-400 bg-red-950/40 border border-red-500/20 px-2.5 py-0.5 rounded-full font-bold">
                Camera Paused
              </span>
            )}
            {activeCall.status === "connected" && !micMuted && (
              <div className="flex items-center gap-1.5 h-8">
                {[1, 2, 3, 4, 5].map((idx) => (
                  <span key={idx} className="w-1 bg-blue-500 rounded-full animate-pulse"
                    style={{ height: `${Math.sin(idx) * 20 + 24}px`, animationDelay: `${idx * 100}ms` }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeCall.status === "connected" && activeCall.type === "video" && (
          <div className="absolute bottom-3 right-3 w-20 h-28 bg-neutral-900 rounded-xl border border-white/10 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
            {cameraMuted ? (
              <VideoOff className="w-4 h-4 text-neutral-500" />
            ) : (
              <div className="w-full h-full relative">
                <img
                  src="/images/facetime_standby.png"
                  alt="Self Camera Preview"
                  className="w-full h-full object-cover brightness-[0.85]"
                />
                <div className="absolute bottom-1 left-1.5 bg-black/60 px-1 py-0.5 rounded text-[8px] text-white/95 uppercase font-extrabold select-none pointer-events-none">
                  Me
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 md:gap-6 bg-neutral-800/80 border border-white/10 backdrop-blur-md px-6 py-3.5 rounded-full shadow-lg mb-4 shrink-0">
        <button
          onClick={onMicToggle}
          disabled={activeCall.status !== "connected"}
          className={`p-3 rounded-full transition-all active:scale-95 disabled:opacity-30 ${
            micMuted ? "bg-red-600 text-white" : "bg-neutral-700/80 hover:bg-neutral-600 text-neutral-200"
          }`}
          title={micMuted ? "Unmute Microphone" : "Mute Microphone"}
        >
          {micMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>
        <button
          onClick={onCameraToggle}
          disabled={activeCall.type !== "video" || activeCall.status !== "connected"}
          className={`p-3 rounded-full transition-all active:scale-95 disabled:opacity-30 ${
            cameraMuted ? "bg-red-600 text-white" : "bg-neutral-700/80 hover:bg-neutral-600 text-neutral-200"
          }`}
          title={cameraMuted ? "Start Camera" : "Pause Camera"}
        >
          {cameraMuted ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
        </button>
        <button
          onClick={onSpeakerToggle}
          className={`p-3 rounded-full transition-all active:scale-95 ${
            speakerMuted ? "bg-red-600 text-white" : "bg-neutral-700/80 hover:bg-neutral-600 text-neutral-200"
          }`}
          title={speakerMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {speakerMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <button
          onClick={onEndCall}
          className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all active:scale-95 shadow-md flex items-center justify-center"
          title="End Call"
        >
          <PhoneOff className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CallInProgress;
