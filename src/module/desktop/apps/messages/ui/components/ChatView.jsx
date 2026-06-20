const ChatView = ({ messages, isTyping, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white min-h-0">
      {messages.map((msg) => {
        const isMe = msg.sender === "me";
        return (
          <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[70%] text-[13px] leading-snug px-3.5 py-2 shadow-sm ${
                isMe
                  ? "bg-[#0b84ff] text-white rounded-[18px] rounded-br-[4px] font-medium"
                  : "bg-[#e9e9eb] text-black rounded-[18px] rounded-bl-[4px] font-medium"
              }`}
            >
              {msg.text}
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
