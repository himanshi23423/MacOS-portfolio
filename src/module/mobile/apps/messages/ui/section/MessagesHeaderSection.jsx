import WindowControls from "@components/WindowControls";
import { ChevronLeft } from "lucide-react";

const MessagesHeaderSection = ({ activeChat, isSidebarOpen, onToggleSidebar }) => (
  <div
    id="window-header"
    className="window-header shrink-0 flex items-center justify-between !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2"
  >
    <div className="flex items-center gap-4">
      <WindowControls target="messages" />
      <button
        onClick={onToggleSidebar}
        className="md:hidden p-1 rounded hover:bg-gray-200"
        aria-label="Toggle Sidebar"
      >
        <ChevronLeft
          className={`w-5 h-5 transition-transform ${isSidebarOpen ? "rotate-0" : "rotate-180"}`}
        />
      </button>
    </div>
    <div className="flex-1 text-center font-semibold text-gray-700 text-sm hidden md:block">
      {activeChat ? activeChat.name : "Messages"}
    </div>
    <div className="w-14" />
  </div>
);

export default MessagesHeaderSection;
