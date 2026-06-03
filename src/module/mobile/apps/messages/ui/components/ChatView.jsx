import { useState } from "react";

const REACTION_EMOJIS = ["❤️", "👍", "👎", "😂", "❗️", "❓"];

const ChatView = ({ messages, isTyping, messagesEndRef, addReaction }) => {
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white min-h-0 select-none">
      {messages.map((msg) => {
        const isMe = msg.sender === "me";
        const hasReactions = msg.reactions && msg.reactions.length > 0;

        return (
          <div key={msg.id} className="relative space-y-1">
            {/* Reaction Selector (Popup menu) */}
            {selectedMessageId === msg.id && (
              <div
                className={`absolute -top-10 z-30 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-full shadow-lg border border-gray-200 animate-bounce ${
                  isMe ? "right-0" : "left-0"
                }`}
              >
                {REACTION_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      addReaction(msg.id, emoji);
                      setSelectedMessageId(null);
                    }}
                    className="hover:scale-125 transition-transform duration-100 text-[15px] bg-transparent border-none outline-none cursor-pointer p-0.5"
                  >
                    {emoji}
                  </button>
                ))}
                <button
                  onClick={() => setSelectedMessageId(null)}
                  className="text-[10px] text-gray-400 font-bold px-1 bg-transparent border-none outline-none cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Bubble layout */}
            <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className="relative group max-w-[70%]">
                <div
                  onClick={() => setSelectedMessageId(selectedMessageId === msg.id ? null : msg.id)}
                  className={
                    msg.attachment?.type === "sticker"
                      ? "text-5xl p-2 cursor-pointer transition-all duration-150 active:scale-90 select-none hover:scale-105"
                      : `rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm transition-all duration-150 cursor-pointer hover:brightness-95 ${
                          isMe
                            ? "bg-blue-500 text-white rounded-br-sm"
                            : "bg-gray-100 text-gray-800 rounded-bl-sm"
                        }`
                  }
                >
                  {msg.attachment?.type === "sticker" ? (
                    msg.attachment.value
                  ) : msg.attachment?.type === "photo" ? (
                    <div className="space-y-1 select-none">
                      <div className="w-36 h-28 bg-zinc-200 rounded-xl overflow-hidden flex items-center justify-center border border-white/20 relative shadow-inner">
                        <span className="text-3xl">🖼️</span>
                        <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-[10px] bg-black/60 text-white px-2 py-0.5 rounded-full font-bold">
                            Preview
                          </span>
                        </div>
                      </div>
                      <p className="text-[10px] font-bold text-center opacity-70">Sent a photo</p>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>

                {/* Display reactions */}
                {hasReactions && (
                  <div
                    className={`absolute -bottom-2.5 bg-white border border-gray-150 shadow-md rounded-full px-1.5 py-0.5 flex items-center gap-0.5 text-[10px] z-10 ${
                      isMe ? "right-2" : "left-2"
                    }`}
                  >
                    {msg.reactions.map((emoji, idx) => (
                      <span key={idx}>{emoji}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-gray-100 text-gray-500 rounded-2xl px-4 py-2 text-sm rounded-bl-sm flex items-center gap-1">
            <span
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatView;
