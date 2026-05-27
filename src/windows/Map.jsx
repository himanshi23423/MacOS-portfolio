import { useState, useEffect } from "react";
import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/windowWrapper";
import { 
  Search, 
  Navigation, 
  MapPin, 
  Map as MapIcon, 
  Compass, 
  ZoomIn, 
  ZoomOut, 
  CloudSun,
  Layers,
  ChevronRight,
  Route
} from "lucide-react";

// Preset cities with coordinate centers & bounding box formulas
const PRESET_PLACES = {
  mumbai: {
    name: "Mumbai",
    region: "Maharashtra, India",
    desc: "Kuldeep's current location. The financial powerhouse and entertainment capital of India, situated on the coastal edge of the Arabian Sea.",
    lat: 19.0760,
    lon: 72.8777,
    bboxWidth: 0.12, // Bounding box offset size (determines zoom)
    weather: "31°C • Partly Cloudy",
    landmarks: ["Gateway of India", "Marine Drive", "Bandra-Worli Sea Link"],
    steps: [
      "Head north on Marine Drive toward Churchgate.",
      "Merge onto the Bandra-Worli Sea Link (toll road).",
      "Continue onto Western Express Highway.",
      "Arrive at Kuldeep's Development Lab."
    ]
  },
  sf: {
    name: "San Francisco",
    region: "California, USA",
    desc: "The cultural, commercial, and financial center of Northern California, famous for tech innovation, Victorian houses, and rolling hills.",
    lat: 37.7749,
    lon: -122.4194,
    bboxWidth: 0.08,
    weather: "17°C • Sunny",
    landmarks: ["Golden Gate Bridge", "Fisherman's Wharf", "Alcatraz Island"],
    steps: [
      "Depart from San Francisco International Airport.",
      "Take US-101 North toward Golden Gate Bridge.",
      "Take exit 434B for Lombard Street.",
      "Turn left onto Van Ness Ave and arrive at Silicon Valley Hub."
    ]
  },
  nyc: {
    name: "New York City",
    region: "New York, USA",
    desc: "The Big Apple. A global hub of finance, culture, art, fashion, and history, composed of 5 iconic boroughs where the Hudson meets the Atlantic.",
    lat: 40.7128,
    lon: -74.0060,
    bboxWidth: 0.09,
    weather: "22°C • Clear",
    landmarks: ["Times Square", "Central Park", "Statue of Liberty"],
    steps: [
      "Start from Grand Central Terminal.",
      "Walk southwest toward Times Square.",
      "Turn right onto Broadway.",
      "Arrive at Central Park South entrance."
    ]
  },
  london: {
    name: "London",
    region: "Greater London, UK",
    desc: "Capital of the United Kingdom. A 21st-century city with history stretching back to Roman times, anchored by the iconic River Thames.",
    lat: 51.5074,
    lon: -0.1278,
    bboxWidth: 0.06,
    weather: "14°C • Light Rain",
    landmarks: ["Big Ben & Parliament", "Tower Bridge", "London Eye"],
    steps: [
      "Depart from Heathrow Airport Terminals.",
      "Take the Piccadilly line eastbound to Piccadilly Circus.",
      "Walk down Whitehall toward Parliament Square.",
      "Arrive at the Westminster Palace Gate."
    ]
  },
  tokyo: {
    name: "Tokyo",
    region: "Kanto, Japan",
    desc: "Japan’s bustling capital, mixing ultra-modern skyscrapers with historic temples and shrines. Home to the world's busiest pedestrian crossing.",
    lat: 35.6762,
    lon: 139.6503,
    bboxWidth: 0.10,
    weather: "19°C • Humid",
    landmarks: ["Shibuya Crossing", "Tokyo Skytree", "Senso-ji Temple"],
    steps: [
      "Start from Tokyo Station.",
      "Take the Yamanote Line (Green) toward Shibuya.",
      "Exit via Hachiko gate.",
      "Cross Shibuya Crossing and arrive at your destination."
    ]
  }
};

const Map = () => {
  const nominatimApiBase = import.meta.env.VITE_NOMINATIM_API_URL || "https://nominatim.openstreetmap.org";
  const openStreetMapBase = import.meta.env.VITE_OPENSTREETMAP_URL || "https://www.openstreetmap.org";

  const [activeTab, setActiveTab] = useState("explore"); // 'explore', 'directions'
  const [activeKey, setActiveKey] = useState("mumbai");
  const [searchQuery, setSearchQuery] = useState("");
  const [zoomLevel, setZoomLevel] = useState(1); // multiplier for bounding box size (lower = zoomed in)
  const [mapStyle, setMapStyle] = useState("standard"); // 'standard', 'satellite'
  
  // Custom searched place state
  const [customPlace, setCustomPlace] = useState(null);

  const currentCity = activeKey === "custom" && customPlace ? customPlace : (PRESET_PLACES[activeKey] || PRESET_PLACES.mumbai);

  // Zoom logic
  const handleZoom = (direction) => {
    if (direction === "in") {
      setZoomLevel(prev => Math.max(0.1, prev - 0.15));
    } else {
      setZoomLevel(prev => Math.min(4, prev + 0.15));
    }
  };

  // Live Geocoding search from Nominatim API
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(`${nominatimApiBase}/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lon = parseFloat(result.lon);
        const bbox = result.boundingbox; // [minlat, maxlat, minlon, maxlon]
        const display = result.display_name;

        const newPlace = {
          name: display.split(",")[0],
          region: display.split(",").slice(1, 3).join(",").trim(),
          desc: display,
          lat: lat,
          lon: lon,
          bboxWidth: Math.max(0.01, Math.abs(parseFloat(bbox[3]) - parseFloat(bbox[2]))),
          weather: `${Math.floor(Math.random() * 15) + 15}°C • Searched Location`,
          landmarks: ["Local Destination", "Searched Coordinates"],
          steps: [
            `Navigate toward coordinates: ${lat.toFixed(4)}, ${lon.toFixed(4)}.`,
            "Follow arterial routes to final waypoint.",
            `Arrive in ${display.split(",")[0]}.`
          ]
        };

        setCustomPlace(newPlace);
        setActiveKey("custom");
        setZoomLevel(1);
      } else {
        alert("Location not found. Try another search.");
      }
    } catch (err) {
      console.error(err);
      alert("Error querying maps search API. Please try again.");
    }
  };

  // Bounding box calculations for OpenStreetMap embed iframe URL
  const bboxWidth = currentCity.bboxWidth * zoomLevel;
  const minLon = currentCity.lon - bboxWidth;
  const maxLon = currentCity.lon + bboxWidth;
  const minLat = currentCity.lat - (bboxWidth * 0.6); // scale height slightly
  const maxLat = currentCity.lat + (bboxWidth * 0.6);

  const iframeSrc = `${openStreetMapBase}/export/embed.html?bbox=${minLon}%2C${minLat}%2C${maxLon}%2C${maxLat}&layer=mapnik&marker=${currentCity.lat}%2C${currentCity.lon}`;

  // Filter preset places based on search query
  const filteredKeys = Object.keys(PRESET_PLACES).filter(key => {
    const city = PRESET_PLACES[key];
    return city.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           city.region.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex flex-col h-full w-full bg-[#f6f6f6] text-gray-800 font-sans select-none rounded-xl overflow-hidden shadow-2xl border border-zinc-200/80">
      
      {/* Title Bar Header */}
      <div id="window-header" className="shrink-0 bg-[#f3f3f3] border-b border-zinc-200 px-4 py-2 flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <WindowControls target="map" />
          <div className="font-semibold pl-4 hidden md:flex items-center gap-1.5 select-none">
            <Compass size={14} className="text-blue-500 shrink-0" />
            <span>Maps</span>
          </div>
        </div>

        {/* Top Search bar */}
        <div className="w-64 max-w-xs relative flex items-center">
          <input 
            type="text"
            placeholder="Search city (e.g. Paris, Tokyo)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="w-full bg-white border border-zinc-300 rounded-lg pl-8 pr-8 py-1 text-xs text-gray-800 outline-none focus:border-blue-500 shadow-inner select-text"
          />
          <Search 
            onClick={handleSearch}
            className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 cursor-pointer" 
          />
        </div>

        <div className="w-16 flex justify-end">
          <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded font-bold">MAPS</span>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex min-h-0 relative">
        
        {/* Left Sidebar Exploration Panel */}
        <div className="w-60 bg-[#fbfbfb] border-r border-zinc-200 flex flex-col shrink-0 min-w-0">
          
          {/* Header tabs navigation */}
          <div className="flex border-b border-zinc-200 bg-gray-100/50 text-xs font-semibold text-gray-500 shrink-0 select-none">
            <button 
              onClick={() => setActiveTab("explore")}
              className={`flex-1 py-2 text-center border-b-2 transition-all ${
                activeTab === "explore" ? "border-blue-500 text-blue-600 font-bold" : "border-transparent hover:text-gray-800"
              }`}
            >
              Explore
            </button>
            <button 
              onClick={() => setActiveTab("directions")}
              className={`flex-1 py-2 text-center border-b-2 transition-all ${
                activeTab === "directions" ? "border-blue-500 text-blue-600 font-bold" : "border-transparent hover:text-gray-800"
              }`}
            >
              Directions
            </button>
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            
            {activeTab === "explore" && (
              <>
                {/* Search result item if active is custom */}
                {activeKey === "custom" && customPlace && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pl-1.5 font-sans">Search Result</span>
                    <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-blue-600 text-white font-semibold shadow-sm">
                      <div className="flex items-center gap-2 truncate">
                        <MapPin size={13} className="text-white" />
                        <span className="truncate">{customPlace.name}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Favorites places list */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pl-1.5">Favorites</span>
                  {Object.keys(PRESET_PLACES).map(key => {
                    const place = PRESET_PLACES[key];
                    const isActive = activeKey === key;
                    return (
                      <div 
                        key={key}
                        onClick={() => { setActiveKey(key); setZoomLevel(1); }}
                        className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg cursor-pointer text-xs transition-colors ${
                          isActive ? "bg-blue-500 text-white font-semibold" : "text-gray-700 hover:bg-gray-200/60"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <MapPin size={13} className={isActive ? "text-white" : "text-blue-500"} />
                          <span className="truncate">{place.name}</span>
                        </div>
                        <span className={`text-[9px] ${isActive ? "text-blue-100" : "text-gray-400"}`}>{place.region.split(", ").pop()}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Detail card active location */}
                <div className="border border-zinc-200 bg-white rounded-xl p-3 space-y-2.5 shadow-sm">
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 leading-tight truncate">{currentCity.name}</h3>
                    <p className="text-[10px] text-gray-500 mt-0.5 truncate">{currentCity.region}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-gray-50 border border-zinc-200/80 px-2 py-1 rounded">
                    <CloudSun size={14} className="text-amber-500" />
                    <span>{currentCity.weather}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-gray-600">{currentCity.desc}</p>
                  
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 font-sans">Landmarks</span>
                    <ul className="text-xs text-gray-700 space-y-0.5 pl-1">
                      {currentCity.landmarks.map((landmark, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 truncate">
                          <span className="text-[10px] text-blue-500">❖</span>
                          <span className="truncate">{landmark}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}

            {activeTab === "directions" && (
              <div className="space-y-3">
                <div className="border border-zinc-200 bg-white rounded-xl p-3 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 border-b pb-2 border-zinc-200/80">
                    <Route size={16} className="text-blue-500" />
                    <div>
                      <span className="text-[10px] font-semibold text-gray-400 uppercase leading-none block font-sans">Route Planner</span>
                      <span className="text-xs font-bold text-gray-800">To {currentCity.name}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed">Simulated directions and waypoints from start location to target city:</p>
                </div>

                {/* Steps Timeline */}
                <div className="relative pl-4 border-l border-blue-500/30 ml-2 space-y-4 py-1 text-xs">
                  {currentCity.steps.map((step, idx) => (
                    <div key={idx} className="relative">
                      {/* Node Bullet */}
                      <span className="absolute -left-5.5 top-0.5 bg-blue-500 border border-white text-white rounded-full w-3 h-3 flex items-center justify-center text-[7px]" />
                      <div className="space-y-0.5 pl-1.5">
                        <span className="font-semibold text-gray-500">Step {idx + 1}</span>
                        <p className="text-gray-700 leading-relaxed">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Map Viewport Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-zinc-200 relative">
          
          {/* Map Layer Option HUD Controls */}
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

          {/* Map navigation Zoom Controls */}
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

          {/* OSM Live Iframe Render (Clipped to remove watermarks and controls) */}
          {mapStyle === "standard" ? (
            <div className="w-full h-full overflow-hidden relative">
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
          ) : (
            // Mock Satellite View Card
            <div className="w-full h-full relative bg-slate-900 overflow-hidden flex flex-col justify-end text-white p-6 select-none">
              {/* Dynamic Grid Background Grid Pattern representing Satellite Imaging */}
              <div 
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}
              />
              <div className="absolute inset-0 bg-radial-gradient from-blue-900/20 to-black" />
              
              {/* Mock map render indicators */}
              <div className="relative z-10 max-w-sm space-y-2 bg-black/60 backdrop-blur border border-zinc-800 p-4 rounded-xl">
                <div className="flex items-center gap-1.5 text-xs text-blue-400 font-bold tracking-wider">
                  <Compass size={14} className="animate-pulse" /> SATELLITE HUD VIEW ACTIVE
                </div>
                <h4 className="text-sm font-bold">{currentCity.name} Orbit Imaging</h4>
                <p className="text-[11px] text-zinc-300 leading-normal">
                  High-altitude thermal satellite layers currently syncing with OpenStreetMap telemetry. GPS Coordinates: <code className="bg-zinc-800 text-yellow-500 px-1 py-0.5 rounded">{currentCity.lat.toFixed(4)}° N, {currentCity.lon.toFixed(4)}° E</code>.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

const MapWindow = windowWrapper(Map, "map");
export default MapWindow;
