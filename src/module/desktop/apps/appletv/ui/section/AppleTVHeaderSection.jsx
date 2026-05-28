import WindowControls from "#components/WindowControls";
import { ChevronLeft } from "lucide-react";

const AppleTVHeaderSection = ({ isSidebarOpen, onToggleSidebar }) => (
  <div
    id="window-header"
    className="window-header shrink-0 flex items-center justify-between !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2.5"
  >
    <div className="flex items-center gap-4">
      <WindowControls target="appletv" />
      <button
        onClick={onToggleSidebar}
        className="sm:hidden p-1 rounded hover:bg-gray-200 text-gray-600 transition-colors"
        aria-label="Toggle Sidebar"
      >
        <ChevronLeft
          className={`w-5 h-5 transition-transform duration-200 ${
            isSidebarOpen ? "rotate-0" : "rotate-180"
          }`}
        />
      </button>
    </div>
    <div className="flex-1 text-center font-bold text-gray-700 text-sm hidden sm:block">
      TV
    </div>
    <div className="w-14" />
  </div>
);

export default AppleTVHeaderSection;
