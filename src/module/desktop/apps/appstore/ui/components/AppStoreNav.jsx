import WindowControls from "@components/WindowControls";
import { PanelLeft } from "lucide-react";

const AppStoreNav = ({ isSidebarOpen, onToggleSidebar, isNarrow }) => {
  return (
    <div
      id="window-header"
      className="window-header shrink-0 flex items-center justify-between !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2.5"
    >
      <div className="flex items-center gap-4">
        <WindowControls target="appstore" />
        {isNarrow && (
          <button
            onClick={onToggleSidebar}
            className="p-1 rounded hover:bg-zinc-200 transition-colors ml-1 cursor-pointer text-gray-700"
            title="Toggle Sidebar List"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="flex-1 text-center font-bold text-gray-700 text-xs truncate">App Store</div>
      <div className="w-14" />
    </div>
  );
};

export default AppStoreNav;
