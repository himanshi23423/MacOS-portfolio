import { Clock, Star, MapPin, Users, Heart } from "lucide-react";
import { photosLinks } from "@constants";

const tabIcons = {
  Library: <Clock size={20} />,
  Memories: <Star size={20} />,
  Places: <MapPin size={20} />,
  People: <Users size={20} />,
  Favorites: <Heart size={20} />,
};

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

const PhotoSidebarMobile = ({ activeTab, onTabChange }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "8px 0 24px",
      background: "rgba(249,249,249,0.94)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderTop: "0.5px solid #e5e5ea",
      flexShrink: 0,
    }}
  >
    {photosLinks.map(({ id, title }) => (
      <button
        key={id}
        onClick={() => onTabChange(title)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          background: "none",
          border: "none",
          padding: "4px 12px",
        }}
      >
        <div
          style={{
            color: activeTab === title ? "#007AFF" : "#8e8e93",
            transition: "color 0.2s",
          }}
        >
          {tabIcons[title] || <Star size={22} />}
        </div>
        <span
          style={{
            fontSize: 10,
            color: activeTab === title ? "#007AFF" : "#8e8e93",
            fontWeight: activeTab === title ? 500 : 400,
          }}
        >
          {title}
        </span>
      </button>
    ))}
  </div>
);

export { PhotoSidebarDesktop, PhotoSidebarMobile };
