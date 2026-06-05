import { Image, FolderHeart, Search, Grid } from "lucide-react";
import { photosLinks } from "@constants";

const PhotoSidebarDesktop = ({ activeTab, onTabChange }) => (
  <div className="sidebar w-1/3 @md:w-3/12 border-r border-gray-200 overflow-y-auto">
    <h2>Photos</h2>
    <ul>
      {photosLinks.map(({ id, icon, title }) => (
        <li
          key={id}
          onClick={() => onTabChange(title)}
          className={`cursor-pointer ${activeTab === title ? "bg-blue-100 text-blue-700" : ""}`}
        >
          <img src={icon} alt={title} />
          <p>{title}</p>
        </li>
      ))}
    </ul>
  </div>
);

const PhotoSidebarMobile = ({ activeTab, onTabChange, onScrollToCollections, onSearchClick }) => {
  const tabs = [
    { title: "Collections", icon: <Grid size={18} /> },
    { title: "Library", icon: <Image size={18} /> },
    { title: "Favorites", icon: <FolderHeart size={18} /> },
    { title: "Search", icon: <Search size={18} /> },
  ];

  return (
    <div
      style={{
        position: "absolute",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "8px 12px",
        background: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: "0.5px solid rgba(255, 255, 255, 0.4)",
        borderRadius: 100,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.05)",
        zIndex: 50,
        gap: 6,
        width: "90%",
        maxWidth: 320,
        pointerEvents: "auto",
      }}
    >
      {tabs.map(({ title, icon }) => {
        const isActive =
          activeTab === title ||
          (title === "Collections" && ["Memories", "Places", "People"].includes(activeTab));
        return (
          <button
            key={title}
            onClick={() => {
              if (title === "Collections") {
                onScrollToCollections();
              } else if (title === "Search") {
                onSearchClick();
              } else {
                onTabChange(title);
              }
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              background: isActive ? "#fff" : "transparent",
              border: "none",
              padding: "8px 16px",
              borderRadius: 100,
              cursor: "pointer",
              boxShadow: isActive ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
              flex: 1,
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div
              style={{
                color: isActive ? "#007AFF" : "#555",
                display: "flex",
                alignItems: "center",
                transition: "color 0.2s",
              }}
            >
              {icon}
            </div>
            {isActive && (
              <span
                style={{
                  fontSize: 12,
                  color: "#007AFF",
                  fontWeight: 600,
                  transition: "opacity 0.2s",
                }}
              >
                {title}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export { PhotoSidebarDesktop, PhotoSidebarMobile };
