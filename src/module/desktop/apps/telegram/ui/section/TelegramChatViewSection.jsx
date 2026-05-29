import React from "react";
import { Info } from "lucide-react";
import TelegramChatView from "../components/TelegramChatView";
import TelegramChatInput from "../components/TelegramChatInput";
import TelegramProfileDrawer from "../components/TelegramProfileDrawer";
import TelegramSidebarDrawer from "../components/TelegramSidebarDrawer";

const TelegramChatViewSection = ({ activeChat, inputText, onInputChange, onSend, isTyping, messagesEndRef, showProfileDrawer, setShowProfileDrawer, isDrawerOpen, setIsDrawerOpen, nightMode, ...rest }) => {
  return (
    <>
      <TelegramSidebarDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        nightMode={nightMode}
        {...rest}
      />
      <div className={`flex-1 flex flex-col min-w-0 transition-colors ${
        nightMode ? "bg-zinc-900" : "bg-[#f4f4f5]"
      }`}>
        <div className={`px-5 py-2.5 border-b flex justify-between items-center shrink-0 transition-colors ${
          nightMode ? "bg-zinc-950 border-zinc-850" : "bg-white border-zinc-200"
        }`}>
          <div>
            <h3 className="font-bold text-xs leading-none">{activeChat?.name}</h3>
            <span className={`text-[10px] font-medium block mt-1 ${
              activeChat?.status === "online" || activeChat?.status?.includes("cloud") ? "text-[#3390ec]" : "text-gray-400"
            }`}>
              {activeChat?.status}
            </span>
          </div>
          <button
            onClick={() => setShowProfileDrawer(!showProfileDrawer)}
            className={`p-2 rounded-lg transition-colors ${
              nightMode
                ? `hover:bg-zinc-800 ${showProfileDrawer ? "text-[#3390ec]" : "text-zinc-400"}`
                : `hover:bg-zinc-100 ${showProfileDrawer ? "text-[#3390ec]" : "text-gray-500"}`
            }`}
            title="Toggle Info"
          >
            <Info className="w-4.5 h-4.5" />
          </button>
        </div>
        <div className="flex-1 flex min-h-0 overflow-hidden relative">
          <div className="flex-1 flex flex-col min-w-0 relative">
            <TelegramChatView
              activeChat={activeChat}
              getThemeClass={rest.getThemeClass}
              isTyping={isTyping}
              messagesEndRef={messagesEndRef}
              nightMode={nightMode}
            />
            <TelegramChatInput
              inputText={inputText}
              setInputText={onInputChange}
              handleSend={onSend}
              activeChat={activeChat}
              nightMode={nightMode}
            />
          </div>
          {showProfileDrawer && (
            <TelegramProfileDrawer
              activeChat={activeChat}
              nightMode={nightMode}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TelegramChatViewSection;
