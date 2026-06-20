import { memo } from "react";
import { Compass } from "lucide-react";
import useWindowsStore from "@store/window";

const MapCanvas = ({ currentCity, mapStyle, iframeSrc }) => {
  const isOpen = useWindowsStore((state) => state.windows.map?.isOpen);

  if (mapStyle === "standard") {
    if (!isOpen) {
      return <div className="w-full h-full bg-white" />;
    }
    return (
      <div className="w-full h-full overflow-hidden relative bg-[#f4f3f0] flex items-center justify-center">
        {/* Beautiful map grid background behind the iframe */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #ccc 1px, transparent 1px), linear-gradient(to bottom, #ccc 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />
        <div className="flex flex-col items-center gap-3 text-zinc-400 select-none">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold font-sans tracking-wide">
            Syncing Telemetry...
          </span>
        </div>

        <iframe
          src={iframeSrc}
          title={`Map showing ${currentCity.name}`}
          className="absolute border-none bg-white z-0"
          style={{
            top: "-40px",
            left: "-40px",
            width: "calc(100% + 80px)",
            height: "calc(100% + 80px)",
          }}
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-slate-900 overflow-hidden flex flex-col justify-end text-white p-6 select-none">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute inset-0 bg-radial-gradient from-blue-900/20 to-black" />

      <div className="relative z-10 max-w-sm space-y-2 bg-black/60 backdrop-blur border border-zinc-800 p-4 rounded-xl">
        <div className="flex items-center gap-1.5 text-xs text-blue-400 font-bold tracking-wider">
          <Compass size={14} className="animate-pulse" /> SATELLITE HUD VIEW ACTIVE
        </div>
        <h4 className="text-sm font-bold">{currentCity.name} Orbit Imaging</h4>
        <p className="text-[11px] text-zinc-300 leading-normal">
          High-altitude thermal satellite layers currently syncing with OpenStreetMap telemetry. GPS
          Coordinates:{" "}
          <code className="bg-zinc-800 text-yellow-500 px-1 py-0.5 rounded">
            {currentCity.lat.toFixed(4)}° N, {currentCity.lon.toFixed(4)}° E
          </code>
          .
        </p>
      </div>
    </div>
  );
};

export default memo(MapCanvas);
