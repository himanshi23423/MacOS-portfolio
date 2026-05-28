import MessagesHeaderSection from "./MessagesHeaderSection";
import MessagesChatSection from "./MessagesChatSection";
import MessagesCallSection from "./MessagesCallSection";

const MessagesSection = (props) => {
  const {
    activeChat, isSidebarOpen, setIsSidebarOpen,
    conversations, searchQuery, setSearchQuery,
    activeChatId, setActiveChatId,
    inputText, setInputText,
    isTyping,
    showInfo, setShowInfo,
    mutedChats, setMutedChats,
    messagesEndRef,
    triggerCall, handleSend,
    callState, callDuration,
    onMicToggle, onCameraToggle, onEndCall, formatCallTime,
  } = props;

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl overflow-hidden shadow-2xl border border-black/10 select-none text-gray-800 relative">
      <MessagesHeaderSection
        activeChat={activeChat}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <MessagesChatSection
        conversations={conversations}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeChat={activeChat}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        inputText={inputText}
        setInputText={setInputText}
        isTyping={isTyping}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
        mutedChats={mutedChats}
        setMutedChats={setMutedChats}
        messagesEndRef={messagesEndRef}
        triggerCall={triggerCall}
        handleSend={handleSend}
      />
      <MessagesCallSection
        callState={callState}
        callDuration={callDuration}
        activeChat={activeChat}
        onMicToggle={onMicToggle}
        onCameraToggle={onCameraToggle}
        onEndCall={onEndCall}
        formatCallTime={formatCallTime}
      />
    </div>
  );
};

export default MessagesSection;
