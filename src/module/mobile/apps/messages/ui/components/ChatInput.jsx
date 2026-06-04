import { Plus, Send, Image, Smile, MapPin, Mic, MoreHorizontal } from "lucide-react";
import { useState } from "react";

const MOCK_STICKERS = ["🚀", "🌟", "🍕", "🎉", "👽", "🦄", "❤️", "🔥"];

const ChatInput = ({ inputText, onInputChange, onSend, sendAttachment }) => {
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showStickers, setShowStickers] = useState(false);

  return (
    <div className="p-3.5 bg-white border-t border-gray-100 shrink-0 relative">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
        className="flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => {
            setShowPlusMenu(!showPlusMenu);
            setShowStickers(false);
          }}
          className={`p-1.5 rounded-full transition-colors shrink-0 flex items-center justify-center border-none outline-none cursor-pointer ${
            showPlusMenu
              ? "bg-gray-200 text-blue-500"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
          title="App Menu"
        >
          <Plus
            className={`w-5 h-5 transition-transform duration-250 ${showPlusMenu ? "rotate-45" : ""}`}
          />
        </button>

        <input
          type="text"
          name="message"
          autoComplete="off"
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="iMessage"
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none border border-transparent focus:border-gray-200 outline-none text-gray-800"
        />

        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-30 disabled:pointer-events-none text-white rounded-full transition-all shrink-0 active:scale-95 shadow-md flex items-center justify-center border-none outline-none cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* iOS Style Vertical Plus Menu */}
      {showPlusMenu && (
        <div className="absolute bottom-[65px] left-4 bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl p-2.5 z-40 w-44 flex flex-col gap-1.5 animate-fade-in">
          <button
            type="button"
            onClick={() => {
              sendAttachment("photo");
              setShowPlusMenu(false);
            }}
            className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-700 flex items-center gap-2.5 bg-transparent border-none outline-none cursor-pointer"
          >
            <Image size={15} className="text-blue-500" />
            <span>Camera & Photos</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setShowStickers(!showStickers);
            }}
            className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-700 flex items-center gap-2.5 bg-transparent border-none outline-none cursor-pointer"
          >
            <Smile size={15} className="text-yellow-500" />
            <span>Stickers</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sendAttachment("location", "Cupertino, CA");
              setShowPlusMenu(false);
            }}
            className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-700 flex items-center gap-2.5 bg-transparent border-none outline-none cursor-pointer"
          >
            <MapPin size={15} className="text-green-500" />
            <span>Location</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sendAttachment("audio", "Voice note");
              setShowPlusMenu(false);
            }}
            className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-700 flex items-center gap-2.5 bg-transparent border-none outline-none cursor-pointer"
          >
            <Mic size={15} className="text-purple-500" />
            <span>Audio Message</span>
          </button>
        </div>
      )}

      {/* Stickers Selector Sub-panel */}
      {showStickers && showPlusMenu && (
        <div className="absolute bottom-[65px] left-52 bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl p-3 z-40 w-40 flex flex-wrap gap-2.5 justify-center animate-fade-in">
          {MOCK_STICKERS.map((sticker) => (
            <button
              key={sticker}
              type="button"
              onClick={() => {
                sendAttachment("sticker", sticker);
                setShowPlusMenu(false);
                setShowStickers(false);
              }}
              className="text-2xl hover:scale-125 transition-transform duration-100 bg-transparent border-none outline-none cursor-pointer"
            >
              {sticker}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatInput;
