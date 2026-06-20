import WindowControls from "@components/WindowControls";
import { PanelLeft } from "lucide-react";

const CallHeaderSection = ({ isSidebarOpen, onToggleSidebar, isNarrow }) => (
  <div
    id="window-header"
    className="window-header shrink-0 flex items-center justify-between bg-gray-50! border-b-[#d1d1d1]! px-4! py-2.5!"
  >
    <div className="flex items-center gap-4">
      <WindowControls target="call" />
      <button
        onClick={onToggleSidebar}
        className={`${!isNarrow ? "hidden" : ""} p-1 rounded hover:bg-gray-200 text-gray-600 transition-colors flex items-center justify-center`}
        aria-label="Toggle Sidebar"
      >
        <PanelLeft className="w-4 h-4" />
      </button>
    </div>
    <div
      className={`flex-1 text-center font-bold text-gray-700 text-sm ${isNarrow ? "hidden" : "block"}`}
    >
      FaceTime
    </div>
    <div className="w-14" />
  </div>
);

export default CallHeaderSection;
