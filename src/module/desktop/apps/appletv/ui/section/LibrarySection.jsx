import { Film } from "lucide-react";

const LibrarySection = ({ onOpenStore }) => (
  <div className="text-center py-12 space-y-3 text-gray-800">
    <Film className="w-10 h-10 text-gray-400 mx-auto stroke-1" />
    <h2 className="text-sm font-bold text-gray-700">Your Movie Library is empty.</h2>
    <p className="text-xs text-gray-500 max-w-xs mx-auto">
      Any movies you purchase or rent from the Store will show up here.
    </p>
    <button
      onClick={onOpenStore}
      className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold active:scale-95 transition-all shadow-md"
    >
      Go to Store
    </button>
  </div>
);

export default LibrarySection;
