import { Map as MapIcon, Layers, ZoomIn, ZoomOut } from "lucide-react";

const MapControls = ({ mapStyle, setMapStyle, handleZoom }) => (
  <>
    <div className="absolute top-4 left-4 z-10 flex gap-1.5 bg-white/90 backdrop-blur border border-zinc-200 p-1 rounded-lg shadow-md select-none">
      <button
        onClick={() => setMapStyle("standard")}
        className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
          mapStyle === "standard" ? "bg-blue-500 text-white shadow-sm" : "text-gray-600 hover:bg-gray-150"
        }`}
      >
        <MapIcon size={12} /> Standard
      </button>
      <button
        onClick={() => setMapStyle("satellite")}
        className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
          mapStyle === "satellite" ? "bg-blue-500 text-white shadow-sm" : "text-gray-600 hover:bg-gray-150"
        }`}
      >
        <Layers size={12} /> Satellite
      </button>
    </div>

    <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1 bg-white/90 backdrop-blur border border-zinc-200 p-1.5 rounded-lg shadow-md select-none">
      <button
        onClick={() => handleZoom("in")}
        className="p-1.5 hover:bg-gray-150 rounded text-gray-600 active:scale-95 transition-all"
        title="Zoom In"
      >
        <ZoomIn size={16} />
      </button>
      <div className="border-t border-zinc-200 my-0.5" />
      <button
        onClick={() => handleZoom("out")}
        className="p-1.5 hover:bg-gray-150 rounded text-gray-600 active:scale-95 transition-all"
        title="Zoom Out"
      >
        <ZoomOut size={16} />
      </button>
    </div>
  </>
);

export default MapControls;
