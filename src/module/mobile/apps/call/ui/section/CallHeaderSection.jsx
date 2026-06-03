import WindowControls from "@components/WindowControls";
import { ChevronLeft } from "lucide-react";

const CallHeaderSection = ({ isSidebarOpen, onToggleSidebar }) => (
  <div
    id="window-header"
    className="window-header shrink-0 flex items-center justify-between !bg-zinc-50 !border-b-zinc-200 !px-4 !py-2.5 text-zinc-800"
  >
    <div className="flex items-center gap-4">
      <WindowControls target="call" />
      <button
        onClick={onToggleSidebar}
        className="sm:hidden p-1 rounded hover:bg-zinc-200/60 text-zinc-600 transition-colors"
        aria-label="Toggle Sidebar"
      >
        <ChevronLeft
          className={`w-5 h-5 transition-transform duration-200 ${
            isSidebarOpen ? "rotate-0" : "rotate-180"
          }`}
        />
      </button>
    </div>
    <div className="flex-1 text-center font-bold text-zinc-700 text-sm hidden sm:block">
      FaceTime
    </div>
    <div className="w-14" />
  </div>
);

export default CallHeaderSection;
