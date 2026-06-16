import WindowControls from "@components/WindowControls";
import { PanelLeft } from "lucide-react";

const MessagesHeaderSection = ({
  activeChat,
  isSidebarOpen,
  onToggleSidebar,
  isLowWidth,
  toggleBtnRef,
}) => (
  <div
    id="window-header"
    className="window-header shrink-0 flex items-center justify-between !bg-gray-50 !border-b-gray-200 !px-4 !py-2"
  >
    <div className="flex items-center gap-4">
      <WindowControls target="messages" />
      {isLowWidth && (
        <button
          ref={toggleBtnRef}
          onClick={onToggleSidebar}
          className="p-1 rounded hover:bg-zinc-200 transition-colors ml-1 cursor-pointer text-gray-700"
          aria-label="Toggle Sidebar"
        >
          <PanelLeft className="w-4 h-4" />
        </button>
      )}
    </div>
    <div className="flex-1 text-center font-semibold text-slate-600 text-[13px] truncate whitespace-nowrap px-4 min-w-0">
      {activeChat ? activeChat.name : "Messages"}
    </div>
    <div className="w-14 shrink-0" />
  </div>
);

export default MessagesHeaderSection;
