import MapSidebarSection from "./MapSidebarSection";
import MapViewSection from "./MapViewSection";

const MapSection = (props) => {
  const { isSidebarOpen, setIsSidebarOpen, isNarrow } = props;

  return (
    <div className="flex h-full w-full relative">
      {isNarrow && isSidebarOpen && (
        <div
          className="absolute inset-0 bg-black/10 z-10 transition-opacity duration-300 cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <MapSidebarSection
        searchQuery={props.searchQuery}
        onSearchChange={props.setSearchQuery}
        searchResults={props.filteredKeys}
        onSelectResult={(key) => {
          props.setActiveKey(key);
          props.setZoomLevel(1);
          if (isNarrow) {
            setIsSidebarOpen(false);
          }
        }}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isNarrow={isNarrow}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
        activeKey={props.activeKey}
        setActiveKey={props.setActiveKey}
        setZoomLevel={props.setZoomLevel}
        currentCity={props.currentCity}
        customPlace={props.customPlace}
        filteredKeys={props.filteredKeys}
        handleSearch={props.handleSearch}
      />
      <MapViewSection
        mapRef={null}
        markers={[{ lat: props.currentCity.lat, lon: props.currentCity.lon }]}
        selectedLocation={props.currentCity}
        onMapClick={() => {}}
        center={{ lat: props.currentCity.lat, lng: props.currentCity.lon }}
        zoom={props.zoomLevel}
        mapStyle={props.mapStyle}
        setMapStyle={props.setMapStyle}
        handleZoom={props.handleZoom}
        currentCity={props.currentCity}
        iframeSrc={props.iframeSrc}
      />
    </div>
  );
};

export default MapSection;
