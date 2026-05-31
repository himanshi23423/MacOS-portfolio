import { useState } from "react";
import {
  Clock,
  Heart,
  MapPin,
  Users,
  Star,
  Image,
  Film,
  Folder,
  Share2,
  Trash2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { photosLinks } from "@constants";

const sidebarSections = [
  {
    title: "Library",
    items: [
      { id: "Library", label: "Library", icon: Image, color: "text-blue-500" },
      { id: "Memories", label: "Memories", icon: Film, color: "text-orange-500" },
      { id: "Favorites", label: "Favourites", icon: Heart, color: "text-red-500" },
    ],
  },
  {
    title: "People & Places",
    items: [
      { id: "People", label: "People", icon: Users, color: "text-purple-500" },
      { id: "Places", label: "Places", icon: MapPin, color: "text-green-500" },
    ],
  },
];

const PhotoSidebarDesktop = ({ activeTab, onTabChange }) => {
  const [expandedSections, setExpandedSections] = useState(
    sidebarSections.reduce((acc, s) => ({ ...acc, [s.title]: true }), {}),
  );

  const toggleSection = (title) => {
    setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="w-48 flex-shrink-0 bg-[#f5f5f5]/80 border-r border-[#d4d4d4] flex flex-col py-2 select-none overflow-y-auto">
      {sidebarSections.map((section) => (
        <div key={section.title} className="mb-1">
          {/* Section header */}
          <button
            onClick={() => toggleSection(section.title)}
            className="flex items-center gap-1 px-4 py-1 w-full text-left"
          >
            <ChevronDown
              size={10}
              className={`text-gray-400 transition-transform ${
                expandedSections[section.title] ? "" : "-rotate-90"
              }`}
            />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              {section.title}
            </span>
          </button>

          {/* Section items */}
          {expandedSections[section.title] && (
            <div className="mt-0.5">
              {section.items.map((item) => {
                const IconComp = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`flex items-center gap-2.5 px-4 py-[5.5px] text-left text-[13px] font-semibold transition-colors rounded-md mx-1.5 !w-[calc(100%-12px)] ${
                      isActive ? "bg-black/8 text-gray-900" : "text-gray-700 hover:bg-black/5"
                    }`}
                  >
                    <IconComp size={15} className={item.color} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const PhotoSidebarMobile = ({ activeTab, onTabChange }) => {
  const tabIcons = {
    Library: Image,
    Memories: Film,
    Places: MapPin,
    People: Users,
    Favorites: Heart,
  };

  return (
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
      {photosLinks.map(({ id, title }) => {
        const IconComp = tabIcons[title] || Star;
        return (
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
            <IconComp
              size={22}
              style={{
                color: activeTab === title ? "#007AFF" : "#8e8e93",
                transition: "color 0.2s",
              }}
            />
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
        );
      })}
    </div>
  );
};

export { PhotoSidebarDesktop, PhotoSidebarMobile };
