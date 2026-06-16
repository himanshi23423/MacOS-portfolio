import { ZoomIn, ZoomOut } from "lucide-react";

const MapControls = ({ handleZoom }) => (
  <>
    {/* Vertical Zoom Controls Pill with Magnifying Glasses */}
    <div className="absolute bottom-4 right-4 z-10 flex flex-col bg-white/95 backdrop-blur-sm border border-zinc-200/80 p-1 rounded-lg shadow-md select-none">
      <button
        type="button"
        onClick={() => handleZoom("in")}
        className="p-1.5 hover:bg-gray-100 rounded text-gray-700 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
        title="Zoom In"
      >
        <ZoomIn size={16} />
      </button>
      <div className="border-t border-zinc-200 my-0.5" />
      <button
        type="button"
        onClick={() => handleZoom("out")}
        className="p-1.5 hover:bg-gray-150 rounded text-gray-700 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
        title="Zoom Out"
      >
        <ZoomOut size={16} />
      </button>
    </div>
  </>
);

export default MapControls;
