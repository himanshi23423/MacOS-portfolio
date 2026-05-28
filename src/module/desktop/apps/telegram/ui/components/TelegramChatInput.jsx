import React from "react";
import { Smile, Send } from "lucide-react";

const TelegramChatInput = ({ inputText, setInputText, handleSend, activeChat, nightMode }) => {
  return (
    <div className={`p-3 border-t shrink-0 transition-colors ${
      nightMode ? "bg-zinc-950 border-zinc-850" : "bg-white border-zinc-200"
    }`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2"
      >
        <button
          type="button"
          className={`p-1.5 rounded text-gray-450 shrink-0 transition-colors ${
            nightMode ? "hover:bg-zinc-800 hover:text-zinc-200" : "hover:bg-zinc-200/50 hover:text-gray-700"
          }`}
        >
          <Smile className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={activeChat.type === "channel" ? "Muted (Channel Broadcast only)" : "Write a message..."}
          disabled={activeChat.type === "channel"}
          className={`flex-1 rounded-lg px-3.5 py-2 text-xs focus:outline-none border border-transparent outline-none disabled:opacity-50 select-text ${
            nightMode
              ? "bg-zinc-800 text-white focus:border-zinc-700"
              : "bg-zinc-100 text-gray-800 focus:border-zinc-200"
          }`}
        />
        <button
          type="submit"
          disabled={!inputText.trim() || activeChat.type === "channel"}
          className="p-2 bg-[#3390ec] hover:bg-[#2b7bc9] disabled:opacity-45 disabled:pointer-events-none text-white rounded-lg transition-all shrink-0 active:scale-95 flex items-center justify-center cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};

export default TelegramChatInput;
