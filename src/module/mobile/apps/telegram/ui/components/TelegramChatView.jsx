import React from "react";
import { Check, CheckCheck } from "lucide-react";

const TelegramChatView = ({ activeChat, getThemeClass, isTyping, messagesEndRef }) => {
  return (
    <div
      className={`flex-1 overflow-y-auto p-4 space-y-3 min-h-0 transition-colors ${
        isTyping ? "bg-[#0c0d14]" : "bg-[#e7ebf0]"
      }`}
    >
      {activeChat.messages.map((msg) => {
        const isMe = msg.sender === "me";

        return (
          <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] rounded-lg px-3 py-1.5 text-xs shadow-sm relative ${getThemeClass(isMe)}`}
            >
              {!isMe && msg.senderName && (
                <span className="font-bold text-[#3390ec] block mb-0.5 text-[10px]">
                  {msg.senderName}
                </span>
              )}
              <span className="whitespace-pre-wrap break-words leading-relaxed select-text">
                {msg.text}
              </span>
              <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-gray-400 text-right leading-none select-none">
                <span>{msg.time}</span>
                {isMe &&
                  (msg.status === "read" ? (
                    <CheckCheck className="w-3 h-3 text-[#3390ec]" />
                  ) : (
                    <Check className="w-3 h-3 text-gray-400" />
                  ))}
              </div>
            </div>
          </div>
        );
      })}

      {isTyping && (
        <div className="flex justify-start">
          <div
            className={`rounded-lg px-3.5 py-2 text-xs flex items-center gap-1 ${
              activeChat?.id !== "bot" ? "bg-white text-gray-700" : "bg-zinc-800 text-white"
            }`}
          >
            <span
              className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default TelegramChatView;
