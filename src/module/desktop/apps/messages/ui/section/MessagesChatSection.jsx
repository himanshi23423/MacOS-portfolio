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
  isLowWidth,
  isActualLowWidth,
  sidebarRef,
}) => (
  <div className="flex-1 flex min-h-0 relative">
    <div
      ref={sidebarRef}
      className={`
        z-20 transition-transform duration-300 h-full
        ${
          isLowWidth
            ? `absolute inset-y-0 left-0 w-64 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`
            : "relative translate-x-0 w-60 lg:w-64"
        }
      `}
    >
      <MessageList
        conversations={conversations}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeChatId={activeChatId}
        onSelectChat={(id) => {
          setActiveChatId(id);
          if (isLowWidth) setIsSidebarOpen(false);
        }}
        mutedChats={mutedChats}
        isLowWidth={isLowWidth}
      />
    </div>

    <div className="flex-1 flex flex-col bg-white min-w-0 relative">
      {activeChat ? (
        <>
          <div className="px-5 py-3 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
            <div>
              <h3 className="font-semibold text-[13px] text-slate-700">{activeChat.name}</h3>
              <span className="text-[10px] text-green-500 font-medium">iMessage</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => triggerCall("audio")}
                className="p-1.5 rounded hover:bg-gray-100 text-blue-500"
                title="Audio FaceTime"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                onClick={() => triggerCall("video")}
                className="p-1.5 rounded hover:bg-gray-100 text-blue-500"
                title="Video FaceTime"
              >
                <Video className="w-4 h-4" />
              </button>
              {!isActualLowWidth && (
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className={`p-1.5 rounded transition-colors ${showInfo ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-blue-500"}`}
                  title="Contact Details"
                >
                  <Info className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 flex min-h-0 overflow-hidden relative">
            <div className="flex-1 flex flex-col min-w-0 bg-white">
              <ChatView
                messages={activeChat.messages}
                isTyping={isTyping}
                messagesEndRef={messagesEndRef}
              />
              <ChatInput inputText={inputText} onInputChange={setInputText} onSend={handleSend} />
            </div>
            {!isActualLowWidth && showInfo && (
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
