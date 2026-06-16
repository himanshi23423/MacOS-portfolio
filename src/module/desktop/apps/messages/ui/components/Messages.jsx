import React, { useState, useEffect } from "react";
import windowWrapper from "@hoc/windowWrapper";
import useWindowsStore from "@store/window";
import useMessages from "../../hooks/useMessages";
import MessagesSection from "../section/MessagesSection";
import MessagesAboutModal from "./MessagesAboutModal";

const Messages = () => {
  const { windows, setWindowData } = useWindowsStore();
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    if (windows.messages?.data?.openAbout) {
      setShowAbout(true);
      setWindowData("messages", { ...windows.messages.data, openAbout: false });
    }
  }, [windows.messages?.data?.openAbout, windows.messages?.data, setWindowData]);

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
    <>
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
      <MessagesAboutModal show={showAbout} onClose={() => setShowAbout(false)} />
    </>
  );
};

const MessagesWindow = windowWrapper(Messages, "messages");
export default MessagesWindow;
