import { Search, BellOff, Pin, Mic, MessageSquare, Video, Users } from "lucide-react";
import useWindowsStore from "@store/window";

const MessageList = ({
  conversations,
  searchQuery,
  onSearchChange,
  activeChatId,
  onSelectChat,
  mutedChats,
  _pinnedChats = [],
  togglePinChat,
  activeCategory = "all",
  setActiveCategory,
}) => {
  const { openWindow, closeWindow } = useWindowsStore();

  // Base text filters
  let filteredConversations = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.messages.some((m) => m.text.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  // Category filters
  if (activeCategory === "unread") {
    filteredConversations = filteredConversations.filter((c) => c.unread);
  } else if (activeCategory === "muted") {
    filteredConversations = filteredConversations.filter((c) => mutedChats[c.id]);
  }

  return (
    <div className="absolute md:relative inset-y-0 left-0 w-full md:w-60 lg:w-64 bg-gray-50 border-r border-[#d1d1d1] flex flex-col z-20 transition-transform duration-300">
      <div className="px-4 pt-5 pb-1 select-none shrink-0">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Messages</h1>
      </div>

      {/* Search Input */}
      <div className="px-3 pb-2.5 space-y-2.5 shrink-0">
        <div className="relative flex items-center bg-zinc-200/50 rounded-xl px-3 py-2.5 h-10 shadow-sm border border-zinc-250/20">
          <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search"
            autoComplete="off"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-transparent text-sm focus:outline-none border-none outline-none text-gray-800"
          />
          <Mic className="w-4 h-4 text-gray-400 ml-1.5 cursor-pointer hover:text-gray-600 transition-colors" />
        </div>

        {/* Filters bar */}
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 select-none scrollbar-none">
          {["all", "unread", "muted"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all shrink-0 capitalize border-none outline-none cursor-pointer ${
                activeCategory === cat
                  ? "bg-blue-500 text-white shadow-sm"
                  : "bg-zinc-200/70 text-gray-600 hover:bg-zinc-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Threads list */}
      <div className="flex-1 overflow-y-auto min-h-0 py-2 space-y-1 bg-gray-50">
        {filteredConversations.map((chat) => {
          const isSelected = activeChatId === chat.id;
          const lastMsg = chat.messages[chat.messages.length - 1];
          const isMuted = mutedChats[chat.id];

          return (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`mx-2.5 p-3 flex items-center gap-3 cursor-pointer select-none transition-all duration-200 relative group rounded-2xl ${
                isSelected ? "bg-zinc-200/60 shadow-sm" : "hover:bg-zinc-100/50"
              }`}
            >
              {chat.unread && <div className="absolute left-1 w-2 h-2 bg-[#007aff] rounded-full" />}
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm relative overflow-hidden ${chat.avatarColor}`}
              >
                {chat.avatar ? (
                  <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
                ) : (
                  chat.initials
                )}
                {isMuted && (
                  <div className="absolute -bottom-1 -right-1 bg-gray-400 text-white rounded-full p-0.5 border border-white z-10">
                    <BellOff className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm truncate text-gray-900">{chat.name}</h4>
                  <span className="text-[10px] text-gray-450 shrink-0 font-medium">
                    {lastMsg?.time}
                  </span>
                </div>
                <p
                  className={`text-xs truncate mt-0.5 ${chat.unread ? "text-gray-950 font-bold" : "text-gray-500"}`}
                >
                  {lastMsg?.text}
                </p>
              </div>
              {/* Pin button on hover */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePinChat(chat.id);
                }}
                className="hidden group-hover:flex p-1.5 hover:bg-gray-200/55 rounded-full text-gray-400 hover:text-blue-500 absolute right-2 top-1/2 -translate-y-1/2 border-none outline-none cursor-pointer transition-colors"
                title="Pin"
              >
                <Pin className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}

        {filteredConversations.length === 0 && (
          <div className="p-4 text-center text-xs text-gray-400">No conversations found</div>
        )}
      </div>

      {/* iOS style Bottom Navigation Bar */}
      <div className="border-t border-gray-200/40 bg-white/95 backdrop-blur-md py-2.5 px-6 flex justify-around items-center shrink-0 select-none shadow-inner">
        <button className="flex flex-col items-center gap-0.5 text-blue-500 bg-transparent border-none outline-none cursor-pointer">
          <MessageSquare className="w-5.5 h-5.5" />
          <span className="text-[10px] font-semibold">Messages</span>
        </button>
        <button
          onClick={() => {
            openWindow("call");
            closeWindow("messages");
          }}
          className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-[#007aff] bg-transparent border-none outline-none cursor-pointer transition-colors"
        >
          <Video className="w-5.5 h-5.5" />
          <span className="text-[10px] font-semibold">FaceTime</span>
        </button>
        <button
          onClick={() => {
            openWindow("contact");
            closeWindow("messages");
          }}
          className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-[#007aff] bg-transparent border-none outline-none cursor-pointer transition-colors"
        >
          <Users className="w-5.5 h-5.5" />
          <span className="text-[10px] font-semibold">Contacts</span>
        </button>
      </div>
    </div>
  );
};

export default MessageList;
