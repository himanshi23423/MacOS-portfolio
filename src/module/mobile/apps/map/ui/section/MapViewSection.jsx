import { forwardRef } from "react";
import MapControls from "../components/MapControls";
import MapCanvas from "../components/MapCanvas";

const MapViewSection = forwardRef(
  (
    {
      mapRef,
      _markers,
      _selectedLocation,
      onMapClick,
      _center,
      _zoom,
      mapStyle,
      setMapStyle,
      handleZoom,
      currentCity,
      iframeSrc,
    },
    ref,
  ) => (
    <div
      ref={mapRef || ref}
      className="flex-1 flex flex-col min-w-0 bg-zinc-200 relative"
      onClick={onMapClick}
    >
      <MapControls mapStyle={mapStyle} setMapStyle={setMapStyle} handleZoom={handleZoom} />
      <MapCanvas currentCity={currentCity} mapStyle={mapStyle} iframeSrc={iframeSrc} />
    </div>
  ),
);

MapViewSection.displayName = "MapViewSection";
export default MapViewSection;
