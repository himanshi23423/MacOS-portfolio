import { Search, BellOff } from "lucide-react";

const MessageList = ({
  conversations,
  searchQuery,
  onSearchChange,
  activeChatId,
  onSelectChat,
  mutedChats,
}) => {
  const filteredConversations = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.messages.some((m) => m.text.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="absolute md:relative inset-y-0 left-0 w-64 md:w-60 lg:w-64 bg-gray-50 border-r border-[#d1d1d1] flex flex-col z-20 transition-transform duration-300">
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
      <div className="flex-1 overflow-y-auto min-h-0 divide-y divide-gray-150">
        {filteredConversations.map((chat) => {
          const isSelected = activeChatId === chat.id;
          const lastMsg = chat.messages[chat.messages.length - 1];
          const isMuted = mutedChats[chat.id];

          return (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`p-3 flex items-center gap-3 cursor-pointer select-none transition-colors relative ${
                isSelected ? "bg-blue-100/70" : "hover:bg-gray-150/50"
              }`}
            >
              {chat.unread && <div className="absolute left-1.5 w-2 h-2 bg-blue-500 rounded-full" />}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm relative ${chat.avatarColor}`}>
                {chat.initials}
                {isMuted && (
                  <div className="absolute -bottom-1 -right-1 bg-gray-400 text-white rounded-full p-0.5 border border-white">
                    <BellOff className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm truncate text-gray-900">{chat.name}</h4>
                  <span className="text-[10px] text-gray-400 shrink-0 font-medium">{lastMsg?.time}</span>
                </div>
                <p className={`text-xs truncate mt-0.5 ${chat.unread ? "text-gray-900 font-semibold" : "text-gray-500"}`}>
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
