import WindowControls from "@components/WindowControls";

const MessagesHeaderSection = ({ activeChat, onBack }) => (
  <div
    id="window-header"
    className="window-header shrink-0 flex items-center justify-between !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2"
  >
    <div className="flex items-center gap-4">
      <WindowControls target="messages" onBack={onBack} />
    </div>
    <div className="flex-1 text-center font-semibold text-gray-700 text-sm hidden md:block">
      {activeChat ? activeChat.name : "Messages"}
    </div>
    <div className="w-14" />
  </div>
);

export default MessagesHeaderSection;
