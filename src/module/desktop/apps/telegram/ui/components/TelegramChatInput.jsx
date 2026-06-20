import React from "react";
import { Smile, Send, Paperclip } from "lucide-react";

const TelegramChatInput = ({ inputText, setInputText, handleSend, activeChat, nightMode }) => {
  return (
    <div
      className={`p-3.5 border-t shrink-0 transition-colors ${
        nightMode ? "bg-zinc-900 border-zinc-800/60" : "bg-[#f4f4f5] border-zinc-200/80"
      }`}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 max-w-4xl mx-auto"
      >
        <div
          className={`flex items-center flex-1 rounded-full px-3 py-1.5 border transition-all ${
            nightMode
              ? "bg-zinc-950 border-zinc-800 text-white focus-within:border-zinc-750"
              : "bg-white border-zinc-200/80 text-gray-800 focus-within:border-zinc-300"
          }`}
        >
          <button
            type="button"
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 shrink-0 transition-colors cursor-pointer mr-1.5"
            title="Add Attachment"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              activeChat.type === "channel"
                ? "Muted (Channel Broadcast only)"
                : "Write a message..."
            }
            disabled={activeChat.type === "channel"}
            className={`flex-1 bg-transparent text-xs focus:outline-none border-none outline-none disabled:opacity-50 select-text pointer-events-auto cursor-text ${
              nightMode ? "text-white" : "text-gray-800"
            }`}
          />

          <button
            type="button"
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 shrink-0 transition-colors cursor-pointer ml-1.5"
            title="Emoji Keyboard"
          >
            <Smile className="w-4 h-4" />
          </button>
        </div>

        <button
          type="submit"
          disabled={!inputText.trim() || activeChat.type === "channel"}
          className="w-8 h-8 bg-[#3390ec] hover:bg-[#2b7bc9] disabled:opacity-45 disabled:pointer-events-none text-white rounded-full transition-all shrink-0 active:scale-90 flex items-center justify-center cursor-pointer shadow-sm"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};

export default TelegramChatInput;
