import windowWrapper from "@hoc/windowWrapper";
import useMessages from "./useMessages";
import MessagesSection from "../section/MessagesSection";

const Messages = () => {
  const {
    conversations,
    activeChat,
    activeChatId,
    setActiveChatId,
    inputText,
    setInputText,
    searchQuery,
    setSearchQuery,
    isSidebarOpen,
    setIsSidebarOpen,
    isTyping,
    showInfo,
    setShowInfo,
    mutedChats,
    setMutedChats,
    callState,
    callDuration,
    messagesEndRef,
    triggerCall,
    endCall,
    handleSend,
    formatCallTime,
    setCallState,
  } = useMessages();

  return (
    <MessagesSection
      conversations={conversations}
      activeChat={activeChat}
      activeChatId={activeChatId}
      setActiveChatId={setActiveChatId}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      inputText={inputText}
      setInputText={setInputText}
      isTyping={isTyping}
      showInfo={showInfo}
      setShowInfo={setShowInfo}
      mutedChats={mutedChats}
      setMutedChats={setMutedChats}
      callState={callState}
      callDuration={callDuration}
      messagesEndRef={messagesEndRef}
      triggerCall={triggerCall}
      onEndCall={endCall}
      onMicToggle={() => setCallState((prev) => ({ ...prev, micMuted: !prev.micMuted }))}
      onCameraToggle={() => setCallState((prev) => ({ ...prev, cameraOff: !prev.cameraOff }))}
      handleSend={handleSend}
      formatCallTime={formatCallTime}
    />
  );
};

const MessagesWindow = windowWrapper(Messages, "messages");
export default MessagesWindow;
