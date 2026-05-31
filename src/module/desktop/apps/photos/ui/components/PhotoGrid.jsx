import { Heart } from "lucide-react";
import useWindowsStore from "@store/window";

const PhotoGrid = ({
  photos = [],
  onPhotoClick,
  activeTab,
  zoomLevel = 4,
  viewMode = "All Photos",
  selectedPhotoId,
  onDoubleClick,
}) => {
  const { favorites, toggleFavorite } = useWindowsStore();

  // Map zoom level (1 to 5) to columns count
  const colCount =
    {
      1: 8,
      2: 6,
      3: 4,
      4: 3,
      5: 2,
    }[zoomLevel] || 3;

  const renderGrid = (photosList) => {
    return (
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
      >
        {photosList.map((photo) => {
          const { id, img, rotation = 0 } = photo;
          const isFav = favorites.includes(id);
          const isSelected = selectedPhotoId === id;
          return (
            <div
              key={id}
              className={`relative group aspect-square overflow-hidden bg-gray-100 border border-gray-200/50 cursor-pointer transition-all duration-150 ${
                isSelected
                  ? "ring-[3px] ring-blue-500 ring-offset-1 rounded scale-[0.97] z-10 shadow-md"
                  : "hover:scale-[1.02] hover:shadow-sm"
              }`}
              onClick={() => onPhotoClick(photo)}
              onDoubleClick={() => onDoubleClick(photo)}
            >
              <img
                src={img}
                alt={photo.title}
                className="w-full h-full object-cover transition-all duration-300"
                style={{ transform: `rotate(${rotation}deg)` }}
                loading="lazy"
              />

              {/* Hover shade overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-150" />

              {/* Favorite heart icon overlay */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(id);
                }}
                className={`absolute bottom-1.5 left-1.5 p-1 rounded-full transition-all duration-150 ${
                  isFav
                    ? "bg-white/95 text-red-500 shadow-sm opacity-100"
                    : "bg-black/30 text-white opacity-0 group-hover:opacity-100"
                }`}
              >
                <Heart size={10} className={isFav ? "fill-red-500" : ""} />
              </button>

              {/* Selection ring border on hover */}
              <div className="absolute inset-0 ring-inset ring-0 group-hover:ring-2 ring-white/40 transition-all pointer-events-none" />
            </div>
          );
        })}
      </div>
    );
  };

  let content;
  if (photos.length === 0) {
    content = (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <Heart size={36} className="mb-3 opacity-30 animate-pulse" />
        <p className="text-sm font-semibold text-gray-600">No Photos</p>
        <p className="text-xs mt-1 text-gray-400">
          No photos match the selected criteria or search.
        </p>
      </div>
    );
  } else if (viewMode === "Days") {
    const groups = {};
    photos.forEach((p) => {
      if (!groups[p.date]) groups[p.date] = [];
      groups[p.date].push(p);
    });
    content = (
      <div className="space-y-6 p-4">
        {Object.entries(groups).map(([date, list]) => (
          <div key={date} className="space-y-2">
            <div className="flex items-baseline gap-2 border-b border-gray-200/60 pb-1">
              <h3 className="text-xs font-bold text-gray-800">{date}</h3>
              <span className="text-[10px] text-gray-400 font-semibold">{list[0]?.location}</span>
            </div>
            {renderGrid(list)}
          </div>
        ))}
      </div>
    );
  } else if (viewMode === "Months") {
    const groups = {};
    photos.forEach((p) => {
      const parts = p.date.split(" ");
      const monthYear = parts.length >= 3 ? `${parts[0]} ${parts[2]}` : p.date;
      if (!groups[monthYear]) groups[monthYear] = [];
      groups[monthYear].push(p);
    });
    content = (
      <div className="space-y-6 p-4">
        {Object.entries(groups).map(([month, list]) => (
          <div key={month} className="space-y-2">
            <h3 className="text-sm font-extrabold text-gray-900 border-b border-gray-200/60 pb-1">
              {month}
            </h3>
            {renderGrid(list)}
          </div>
        ))}
      </div>
    );
  } else if (viewMode === "Years") {
    const groups = {};
    photos.forEach((p) => {
      const parts = p.date.split(" ");
      const year = parts.length >= 3 ? parts[2] : "Other";
      if (!groups[year]) groups[year] = [];
      groups[year].push(p);
    });
    content = (
      <div className="space-y-6 p-4">
        {Object.entries(groups).map(([year, list]) => (
          <div key={year} className="space-y-2">
            <h3 className="text-lg font-black text-gray-900 tracking-tight border-b border-gray-200/60 pb-1">
              {year}
            </h3>
            {renderGrid(list)}
          </div>
        ))}
      </div>
    );
  } else {
    content = <div className="p-3">{renderGrid(photos)}</div>;
  }

  return (
    <div className="flex-1 bg-white overflow-y-auto">
      {/* Header metadata summary */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-[#e8e8e8] px-5 py-2 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-gray-800 tracking-tight">{activeTab}</h2>
          <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
            {photos.length} {photos.length === 1 ? "Photo" : "Photos"}
          </p>
        </div>
      </div>

      {content}
    </div>
  );
};

const PhotoGridMobile = ({ photos = [], onPhotoClick, activeTab }) => {
  const { favorites } = useWindowsStore();

  return (
    <>
      <div style={{ padding: "16px 16px 6px" }}>
        <p style={{ fontSize: 22, fontWeight: 700, color: "#000" }}>{activeTab}</p>
        <p style={{ fontSize: 15, color: "#8e8e93", marginTop: 2 }}>{photos.length} Photos</p>
      </div>

      <div style={{ padding: "4px 2px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
          }}
        >
          {photos.map((photo) => {
            const { id, img } = photo;
            return (
              <button
                key={id}
                onClick={() => onPhotoClick(photo)}
                style={{
                  aspectRatio: "1/1",
                  overflow: "hidden",
                  background: "#e5e5ea",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <img
                  src={img}
                  alt={`Photo ${id}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                {favorites.includes(id) && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 4,
                      left: 4,
                      background: "rgba(255,255,255,0.9)",
                      borderRadius: "50%",
                      padding: 3,
                      display: "flex",
                    }}
                  >
                    <Heart size={10} style={{ color: "#ff3b30", fill: "#ff3b30" }} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export { PhotoGrid, PhotoGridMobile };
