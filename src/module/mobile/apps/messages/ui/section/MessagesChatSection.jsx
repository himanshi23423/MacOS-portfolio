import { Phone, Video, Info } from "lucide-react";
import MessageList from "../components/MessageList";
import ChatView from "../components/ChatView";
import ChatInput from "../components/ChatInput";
import ContactInfoPanel from "../components/ContactInfoPanel";

const MessagesChatSection = ({
  conversations,
  searchQuery,
  setSearchQuery,
  activeChat,
  activeChatId,
  setActiveChatId,
  isSidebarOpen,
  setIsSidebarOpen,
  inputText,
  setInputText,
  isTyping,
  showInfo,
  setShowInfo,
  mutedChats,
  setMutedChats,
  messagesEndRef,
  triggerCall,
  handleSend,
  pinnedChats,
  togglePinChat,
  activeCategory,
  setActiveCategory,
  addReaction,
  sendAttachment,
}) => (
  <div className="flex-1 flex min-h-0 relative overflow-hidden">
    <div
      className={`
      absolute md:relative inset-y-0 left-0 w-full md:w-auto z-20 transition-transform duration-300 bg-white
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
    `}
    >
      <MessageList
        conversations={conversations}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeChatId={activeChatId}
        onSelectChat={(id) => {
          setActiveChatId(id);
          setIsSidebarOpen(false);
        }}
        mutedChats={mutedChats}
        pinnedChats={pinnedChats}
        togglePinChat={togglePinChat}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
    </div>

    <div className="flex-1 flex flex-col bg-white min-w-0 relative h-full">
      {activeChat ? (
        <>
          <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-white shrink-0 select-none">
            <div className="flex items-center gap-2 min-w-0">
              <div className="min-w-0">
                <h3 className="font-semibold text-sm text-gray-900 truncate">{activeChat.name}</h3>
                <span className="text-[10px] text-green-500 font-medium">iMessage</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => triggerCall("audio")}
                className="p-2 rounded-full hover:bg-gray-100 text-blue-500 active:scale-95 transition-all"
                title="Audio FaceTime"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                onClick={() => triggerCall("video")}
                className="p-2 rounded-full hover:bg-gray-100 text-blue-500 active:scale-95 transition-all"
                title="Video FaceTime"
              >
                <Video className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowInfo(!showInfo)}
                className={`p-2 rounded-full transition-all active:scale-95 ${showInfo ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100 text-blue-500"}`}
                title="Contact Details"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex min-h-0 overflow-hidden relative">
            <div className="flex-1 flex flex-col min-w-0 bg-white">
              <ChatView
                messages={activeChat.messages}
                isTyping={isTyping}
                messagesEndRef={messagesEndRef}
                addReaction={addReaction}
              />
              <ChatInput
                inputText={inputText}
                onInputChange={setInputText}
                onSend={handleSend}
                sendAttachment={sendAttachment}
              />
            </div>
            {showInfo && (
              <ContactInfoPanel
                activeChat={activeChat}
                mutedChats={mutedChats}
                onToggleMute={(id) => setMutedChats((prev) => ({ ...prev, [id]: !prev[id] }))}
                onTriggerCall={triggerCall}
                onClose={() => setShowInfo(false)}
              />
            )}
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
          <p className="text-sm">Select a conversation to start messaging</p>
        </div>
      )}
    </div>
  </div>
);

export default MessagesChatSection;
