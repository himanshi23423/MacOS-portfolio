import { memo } from "react";
import useWindowsStore from "@store/window";

const MapCanvas = ({ currentCity, iframeSrc }) => {
  const isOpen = useWindowsStore((state) => state.windows.map?.isOpen);

  if (!isOpen) {
    return <div className="flex-1 w-full bg-white" />;
  }

  return (
    <div className="flex-1 w-full overflow-hidden relative">
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
};

export default memo(MapCanvas);
