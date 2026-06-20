import { ChevronLeft, ChevronRight, X } from "lucide-react";

const PhotosViewerSection = ({ selectedPhoto, onClose, onPrev, onNext }) => {
  if (!selectedPhoto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2.5 rounded-full bg-black/5 hover:bg-black/10 transition-colors text-gray-800 border border-black/5 shadow-sm"
      >
        <X size={20} />
      </button>
      {onPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/5 hover:bg-black/10 transition-colors text-gray-800 border border-black/5 shadow-sm"
        >
          <ChevronLeft size={28} />
        </button>
      )}
      <img
        src={selectedPhoto.img}
        alt="Photo"
        className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl border border-gray-200 transition-all duration-300 ease-out bg-white p-1"
        style={{ transform: `rotate(${selectedPhoto.rotation || 0}deg)` }}
        onClick={(e) => e.stopPropagation()}
      />
      {onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/5 hover:bg-black/10 transition-colors text-gray-800 border border-black/5 shadow-sm"
        >
          <ChevronRight size={28} />
        </button>
      )}
    </div>
  );
};

export default PhotosViewerSection;
