import React from "react";
import TelegramHeaderSection from "../section/TelegramHeaderSection";
import TelegramChatListSection from "../section/TelegramChatListSection";
import TelegramChatViewSection from "../section/TelegramChatViewSection";

const TelegramSection = ({
  activeChatId, setActiveChatId,
  inputText, setInputText,
  searchQuery, setSearchQuery,
  isSidebarOpen, setIsSidebarOpen,
  isTyping,
  showProfileDrawer, setShowProfileDrawer,
  nightMode, setNightMode,
  isDrawerOpen, setIsDrawerOpen,
  drawerSection, setDrawerSection,
  userProfile, setUserProfile,
  newGroupName, setNewGroupName,
  newChannelName, setNewChannelName,
  newChannelBio, setNewChannelBio,
  chatThemeColor, setChatThemeColor,
  messagesEndRef,
  activeChat,
  handleSend,
  handleCreateGroup,
  handleCreateChannel,
  openSavedMessages,
  filteredChats,
  getThemeClass,
}) => {
  return (
    <div className={`flex flex-col h-full w-full rounded-xl overflow-hidden shadow-2xl border transition-colors select-none ${
      nightMode
        ? "bg-zinc-950 text-zinc-100 border-zinc-800/80"
        : "bg-white text-gray-800 border-zinc-200"
    }`}>
      <TelegramHeaderSection
        activeChat={activeChat}
        isDrawerOpen={isDrawerOpen}
        onToggleDrawer={() => { setDrawerSection("menu"); setIsDrawerOpen(!isDrawerOpen); }}
        onToggleProfile={() => setShowProfileDrawer(!showProfileDrawer)}
        setShowProfileDrawer={setShowProfileDrawer}
      />
      <div className="flex-1 flex min-h-0 relative">
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
        />
      </div>
    </div>
  );
};

export default TelegramSection;
