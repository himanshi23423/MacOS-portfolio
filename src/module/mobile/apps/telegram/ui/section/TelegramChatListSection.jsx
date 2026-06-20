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
      {...rest}
    />
  );
};

export default TelegramChatListSection;
