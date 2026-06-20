import React, { useState, useEffect, useRef } from "react";
import MessagesHeaderSection from "./MessagesHeaderSection";
import MessagesChatSection from "./MessagesChatSection";
import MessagesCallSection from "./MessagesCallSection";

const MessagesSection = (props) => {
  const {
    activeChat,
    isSidebarOpen,
    setIsSidebarOpen,
    conversations,
    searchQuery,
    setSearchQuery,
    activeChatId,
    setActiveChatId,
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
    callState,
    callDuration,
    onMicToggle,
    onCameraToggle,
    onEndCall,
    formatCallTime,
  } = props;

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(800);
  const sidebarRef = useRef(null);
  const toggleBtnRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const isLowWidth = containerWidth < 520;

  useEffect(() => {
    if (isLowWidth) {
      setShowInfo(false);
    }
  }, [isLowWidth, setShowInfo]);

  const shouldTreatAsLowWidth = isLowWidth || showInfo;

  useEffect(() => {
    if (shouldTreatAsLowWidth) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [shouldTreatAsLowWidth, setIsSidebarOpen]);

  useEffect(() => {
    if (!shouldTreatAsLowWidth || !isSidebarOpen) return;

    const handleClickOutside = (event) => {
      if (
        sidebarRef.current?.contains(event.target) ||
        toggleBtnRef.current?.contains(event.target)
      ) {
        return;
      }
      setIsSidebarOpen(false);
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [shouldTreatAsLowWidth, isSidebarOpen, setIsSidebarOpen]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full w-full bg-white rounded-xl overflow-hidden shadow-2xl border border-black/10 select-none text-gray-800 relative"
    >
      <MessagesHeaderSection
        activeChat={activeChat}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isLowWidth={shouldTreatAsLowWidth}
        toggleBtnRef={toggleBtnRef}
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
        isLowWidth={shouldTreatAsLowWidth}
        isActualLowWidth={isLowWidth}
        sidebarRef={sidebarRef}
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
