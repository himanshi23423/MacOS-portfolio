import { Smile, Send } from "lucide-react";

const ChatInput = ({ inputText, onInputChange, onSend }) => {
  return (
    <div className="p-3.5 bg-white border-t border-gray-100 shrink-0">
      <form
        onSubmit={(e) => { e.preventDefault(); onSend(); }}
        className="flex items-center gap-2"
      >
        <button type="button" className="p-1.5 rounded hover:bg-gray-100 text-gray-400 shrink-0">
          <Smile className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="iMessage"
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none border border-transparent focus:border-gray-200 outline-none text-gray-800"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-30 disabled:pointer-events-none text-white rounded-full transition-all shrink-0 active:scale-95 shadow-md flex items-center justify-center"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
