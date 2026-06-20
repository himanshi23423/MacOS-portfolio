import { ChevronLeft, ChevronRight, X } from "lucide-react";

const PhotosViewerSection = ({ selectedPhoto, onClose, onPrev, onNext }) => {
  if (!selectedPhoto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
      >
        <X size={24} />
      </button>
      {onPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
        >
          <ChevronLeft size={32} />
        </button>
      )}
      <img
        src={selectedPhoto.img}
        alt="Photo"
        className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      {onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
        >
          <ChevronRight size={32} />
        </button>
      )}
    </div>
  );
};

export default PhotosViewerSection;
