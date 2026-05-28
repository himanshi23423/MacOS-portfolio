import WindowControls from "#components/WindowControls";
import { ChevronLeft, ChevronRight, ExternalLink, Layout, Plus, Search, Share, ShieldHalf, PanelLeft } from "lucide-react";

const SafariDesktopToolbar = ({ showSidebar, onToggleSidebar }) => {
  return (
    <div id="window-header" className="!bg-white !border-b-[#d1d1d1] !px-4 !py-2">
      <div className="flex items-center gap-4 w-full">
        <div className="flex items-center gap-2">
          <WindowControls target="safari" />
          <button
            onClick={onToggleSidebar}
            className={`p-1 rounded hover:bg-black/5 transition-colors ${showSidebar ? "bg-black/5" : ""}`}
          >
            <PanelLeft size={16} className="text-gray-600" />
          </button>
        </div>
        <div className="flex items-center gap-1">
          <ChevronLeft size={20} className="text-gray-400 cursor-not-allowed" />
          <ChevronRight size={20} className="text-gray-400 cursor-not-allowed" />
        </div>
        <div className="flex-1 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 bg-white/80 border border-black/5 rounded-lg px-3 py-1 text-sm text-gray-600 shadow-sm backdrop-blur-sm">
            <ShieldHalf size={14} className="text-green-600" />
            <div className="flex-1 flex items-center justify-center gap-1 overflow-hidden">
              <Search size={12} className="text-gray-400" />
              <span className="truncate">kuldeep.dev — Projects</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Share size={18} className="text-gray-600 cursor-pointer hover:text-black" />
          <Plus size={18} className="text-gray-600 cursor-pointer hover:text-black" />
          <Layout size={18} className="text-gray-600 cursor-pointer hover:text-black" />
        </div>
      </div>
    </div>
  );
};

const SafariMobileHeader = ({ socials, projects }) => {
  return (
    <>
      <div id="window-header" style={{ display: "flex", flexDirection: "column", padding: "10px 12px 8px", background: "#f8f8f8", borderBottom: "0.5px solid #d1d1d6", gap: 8, minHeight: "auto", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
          <WindowControls target="safari" />
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6, background: "#e9e9eb", borderRadius: 10, padding: "7px 10px", minHeight: 34 }}>
            <ShieldHalf size={13} className="text-green-600 flex-shrink-0" />
            <Search size={12} className="text-gray-400 flex-shrink-0" />
            <span style={{ fontSize: 14, color: "#3c3c43", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>kuldeep.dev</span>
          </div>
          <Share size={20} className="text-blue-500 flex-shrink-0" />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", paddingLeft: 4, paddingRight: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <ChevronLeft size={22} className="text-gray-300" />
            <ChevronRight size={22} className="text-gray-300" />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Layout size={18} className="text-blue-500" />
            <Plus size={18} className="text-blue-500" />
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", WebkitOverflowScrolling: "touch", background: "#fff", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px 20px 0" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#000", marginBottom: 16 }}>Favorites</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {socials.map((favorite) => (
              <a key={favorite.id} href={favorite.id === 2 ? "https://www.youtube.com" : favorite.link} target="_blank" rel="noopener noreferrer" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textDecoration: "none" }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={favorite.img} alt={favorite.text} style={{ width: 26, height: 26, objectFit: "contain" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 500, color: "#3c3c43", textAlign: "center" }}>
                  {favorite.id === 1 ? "Github" : favorite.id === 2 ? "Youtube" : favorite.id === 3 ? "Twitter/X" : "LinkedIn"}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div style={{ padding: "20px 20px 0" }}>
          <div style={{ background: "#f2f2f7", borderRadius: 14, padding: 14, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <ShieldHalf className="text-blue-600" size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#000" }}>Privacy Report</p>
              <p style={{ fontSize: 13, color: "#8e8e93" }}>Safari has protected your projects from 14 trackers.</p>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        </div>

        <div style={{ padding: "20px 20px 32px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#000", marginBottom: 16 }}>Featured Projects</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {projects.map((project) => (
              <div key={project.id} style={{ background: "#f2f2f7", borderRadius: 14, overflow: "hidden" }}>
                <div style={{ height: 140, background: "#e5e5ea", overflow: "hidden" }}>
                  <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: 14 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: "#000", marginBottom: 6 }}>{project.title}</h3>
                  <p style={{ fontSize: 14, color: "#8e8e93", marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{project.description}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 15, fontWeight: 500, color: "#007AFF", textDecoration: "none" }}>
                      <ExternalLink size={14} /> Live Demo
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 15, fontWeight: 500, color: "#007AFF", textDecoration: "none" }}>
                      Source
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "8px 16px 28px", background: "rgba(248,248,248,0.97)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderTop: "0.5px solid #d1d1d6", flexShrink: 0 }}>
        <ChevronLeft size={22} className="text-gray-300" />
        <ChevronRight size={22} className="text-gray-300" />
        <Share size={20} className="text-blue-500" />
        <Plus size={20} className="text-blue-500" />
        <Layout size={20} className="text-blue-500" />
      </div>
    </>
  );
};

export { SafariDesktopToolbar, SafariMobileHeader };
