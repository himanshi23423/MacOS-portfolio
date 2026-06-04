import { Film } from "lucide-react";

const LibrarySection = ({ onOpenStore }) => (
  <div className="text-center py-16 space-y-3">
    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mx-auto">
      <Film className="w-7 h-7 text-white/30 stroke-[1.5]" />
    </div>
    <h2 className="text-sm font-bold text-white/70">Your Movie Library is empty</h2>
    <p className="text-[11px] text-white/30 max-w-[200px] mx-auto leading-relaxed">
      Movies you stream will appear here for quick access.
    </p>
    <button
      onClick={onOpenStore}
      className="mt-3 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-[11px] font-bold active:scale-95 transition-all shadow-lg"
    >
      Browse Store
    </button>
  </div>
);

export default LibrarySection;
