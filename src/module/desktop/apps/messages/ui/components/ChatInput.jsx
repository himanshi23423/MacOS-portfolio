import { Smile, Send } from "lucide-react";

const ChatInput = ({ inputText, onInputChange, onSend }) => {
  return (
    <div className="p-3.5 bg-white border-t border-gray-100 shrink-0">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
        className="flex items-center gap-1 border border-gray-200 bg-gray-50/70 rounded-full px-3 py-1"
      >
        <button
          type="button"
          className="p-1.5 rounded-full hover:bg-gray-200 text-gray-400 shrink-0 cursor-pointer"
        >
          <Smile className="w-4 h-4" />
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="iMessage"
          className="flex-1 bg-transparent px-2 py-1 text-[13px] focus:outline-none border-none outline-none text-gray-800"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-1.5 bg-[#0b84ff] hover:bg-blue-600 disabled:opacity-30 disabled:pointer-events-none text-white rounded-full transition-all shrink-0 active:scale-95 flex items-center justify-center cursor-pointer"
        >
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
