import React from "react";
import TelegramChatList from "../components/TelegramChatList";

const TelegramChatListSection = ({
  chats,
  activeChatId,
  onSelectChat,
  searchQuery,
  onSearchChange,
  isSidebarOpen,
  onCloseSidebar,
  isDrawerOpen,
  ...rest
}) => {
  return (
    <TelegramChatList
      filteredChats={chats}
      activeChatId={activeChatId}
      setActiveChatId={onSelectChat}
      searchQuery={searchQuery}
      setSearchQuery={onSearchChange}
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={onCloseSidebar}
      isDrawerOpen={isDrawerOpen}
      {...rest}
    />
  );
};

export default TelegramChatListSection;
