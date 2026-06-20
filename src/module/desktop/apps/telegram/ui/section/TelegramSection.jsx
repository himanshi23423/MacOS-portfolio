import React, { useRef, useState, useEffect } from "react";
import TelegramHeaderSection from "../section/TelegramHeaderSection";
import TelegramChatListSection from "../section/TelegramChatListSection";
import TelegramChatViewSection from "../section/TelegramChatViewSection";

const TelegramSection = ({
  activeChatId,
  setActiveChatId,
  inputText,
  setInputText,
  searchQuery,
  setSearchQuery,
  isSidebarOpen,
  setIsSidebarOpen,
  isTyping,
  showProfileDrawer,
  setShowProfileDrawer,
  nightMode,
  setNightMode,
  isDrawerOpen,
  setIsDrawerOpen,
  drawerSection,
  setDrawerSection,
  userProfile,
  setUserProfile,
  newGroupName,
  setNewGroupName,
  newChannelName,
  setNewChannelName,
  newChannelBio,
  setNewChannelBio,
  chatThemeColor,
  setChatThemeColor,
  messagesEndRef,
  activeChat,
  handleSend,
  handleCreateGroup,
  handleCreateChannel,
  openSavedMessages,
  filteredChats,
  getThemeClass,
}) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(800);

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

  useEffect(() => {
    if (containerWidth < 550) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [containerWidth, setIsSidebarOpen]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col h-full w-full rounded-xl overflow-hidden shadow-2xl border transition-colors select-none ${
        nightMode
          ? "bg-zinc-900 text-zinc-100 border-zinc-800/80"
          : "bg-[#f4f4f5] text-gray-800 border-zinc-200"
      }`}
    >
      <TelegramHeaderSection
        activeChat={activeChat}
        isDrawerOpen={isDrawerOpen}
        onToggleDrawer={() => {
          setDrawerSection("menu");
          setIsDrawerOpen(!isDrawerOpen);
        }}
        onToggleProfile={() => setShowProfileDrawer(!showProfileDrawer)}
        setShowProfileDrawer={setShowProfileDrawer}
        nightMode={nightMode}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        containerWidth={containerWidth}
      />
      <div className="flex-1 flex min-h-0 relative">
        {containerWidth < 550 && isSidebarOpen && (
          <div
            className="absolute inset-0 bg-black/10 z-10 transition-opacity duration-300 cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <TelegramChatListSection
          chats={filteredChats}
          activeChatId={activeChatId}
          onSelectChat={setActiveChatId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isSidebarOpen={isSidebarOpen}
          onCloseSidebar={setIsSidebarOpen}
          nightMode={nightMode}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          setDrawerSection={setDrawerSection}
          containerWidth={containerWidth}
        />
        <TelegramChatViewSection
          activeChat={activeChat}
          inputText={inputText}
          onInputChange={setInputText}
          onSend={handleSend}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
          showProfileDrawer={showProfileDrawer}
          setShowProfileDrawer={setShowProfileDrawer}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          nightMode={nightMode}
          getThemeClass={getThemeClass}
          drawerSection={drawerSection}
          setDrawerSection={setDrawerSection}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          newGroupName={newGroupName}
          setNewGroupName={setNewGroupName}
          newChannelName={newChannelName}
          setNewChannelName={setNewChannelName}
          newChannelBio={newChannelBio}
          setNewChannelBio={setNewChannelBio}
          chatThemeColor={chatThemeColor}
          setChatThemeColor={setChatThemeColor}
          handleCreateGroup={handleCreateGroup}
          handleCreateChannel={handleCreateChannel}
          openSavedMessages={openSavedMessages}
          setActiveChatId={setActiveChatId}
          setNightMode={setNightMode}
          containerWidth={containerWidth}
        />
      </div>
    </div>
  );
};

export default TelegramSection;
