import { Search, BellOff } from "lucide-react";

const MessageList = ({
  conversations,
  searchQuery,
  onSearchChange,
  activeChatId,
  onSelectChat,
  mutedChats,
  isLowWidth,
}) => {
  const filteredConversations = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.messages.some((m) => m.text.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <div className="w-full bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      <div className="p-2.5">
        <div className="relative flex items-center bg-gray-200/60 rounded-md px-2 py-1.5">
          <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-transparent text-sm focus:outline-none border-none outline-none text-gray-800"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto min-h-0 divide-y divide-gray-100">
        {filteredConversations.map((chat) => {
          const isSelected = activeChatId === chat.id;
          const lastMsg = chat.messages[chat.messages.length - 1];
          const isMuted = mutedChats[chat.id];

          return (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`p-3.5 mx-2 my-0.5 rounded-lg flex items-center gap-3 cursor-pointer select-none transition-all duration-150 relative ${
                isSelected
                  ? "bg-[#007aff] text-white shadow-sm"
                  : "hover:bg-gray-200/50 text-gray-700"
              }`}
            >
              {chat.unread && (
                <div
                  className={`absolute left-1 w-1.5 h-1.5 bg-blue-500 rounded-full ${isSelected ? "bg-white" : ""}`}
                />
              )}
              <div className="w-10 h-10 rounded-full shrink-0 shadow-sm relative overflow-hidden flex items-center justify-center bg-gray-50 border border-gray-100">
                {chat.avatar ? (
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className={`w-full h-full object-cover ${chat.id === "apple" ? "p-2 bg-gray-100 object-contain" : ""}`}
                  />
                ) : (
                  <div
                    className={`w-full h-full flex items-center justify-center text-white font-bold text-sm ${chat.avatarColor}`}
                  >
                    {chat.initials}
                  </div>
                )}
                {isMuted && (
                  <div className="absolute -bottom-1 -right-1 bg-gray-400 text-white rounded-full p-0.5 border border-white z-10">
                    <BellOff className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4
                    className={`font-bold text-xs truncate ${isSelected ? "text-white" : "text-gray-900"}`}
                  >
                    {chat.name}
                  </h4>
                  <span
                    className={`text-[9px] shrink-0 font-medium ${isSelected ? "text-white/80" : "text-gray-400"}`}
                  >
                    {lastMsg?.time}
                  </span>
                </div>
                <p
                  className={`text-[11px] truncate mt-0.5 ${
                    isSelected
                      ? "text-white/90 font-medium"
                      : chat.unread
                        ? "text-gray-900 font-bold"
                        : "text-gray-500"
                  }`}
                >
                  {lastMsg?.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageList;
