import { Video } from "lucide-react";

const CallStandbySection = () => (
  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 relative overflow-hidden h-full">
    <div className="relative w-64 h-44 md:w-80 md:h-56 rounded-2xl bg-gradient-to-tr from-indigo-950 via-slate-900 to-emerald-950 shadow-inner flex items-center justify-center border border-black/10 overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />
      <div className="absolute w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-green-500/80 rounded-full animate-ping" />
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-green-500 rounded-full" />
      <div className="flex flex-col items-center justify-center space-y-2 z-10">
        <div className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
          <Video className="w-8 h-8 text-white fill-white/10" />
        </div>
        <span className="text-[10px] text-white/50 tracking-widest uppercase font-bold">Camera Standby</span>
      </div>
    </div>
    <div className="space-y-2 max-w-sm">
      <h3 className="text-sm font-bold text-gray-800">FaceTime</h3>
      <p className="text-xs text-gray-400 leading-relaxed">
        Call developers, assistants, and colleagues using high-fidelity FaceTime audio or video directly from your browser.
      </p>
    </div>
    <div className="text-[10px] text-gray-400 font-semibold flex items-center gap-1 bg-gray-200/50 px-3 py-1 rounded-full border border-gray-300/20">
      <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
      System ready for calls
    </div>
  </div>
);

export default CallStandbySection;
