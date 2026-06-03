import { X, Phone, Video, MessageSquare, Bell, BellOff, ExternalLink } from "lucide-react";

const ContactInfoPanel = ({ activeChat, mutedChats, onToggleMute, onTriggerCall, onClose }) => {
  const isMuted = !!mutedChats[activeChat.id];

  return (
    <div className="absolute inset-y-0 right-0 w-72 bg-white/90 backdrop-blur-md border-l border-gray-200 p-6 overflow-y-auto flex flex-col items-center text-center shrink-0 z-30 shadow-2xl transition-all duration-300">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
        aria-label="Close details"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Avatar & Info */}
      <div className="flex flex-col items-center mt-6">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-inner overflow-hidden ${activeChat.avatarColor}`}
        >
          {activeChat.avatar ? (
            <img
              src={activeChat.avatar}
              alt={activeChat.name}
              className="w-full h-full object-cover"
            />
          ) : (
            activeChat.initials
          )}
        </div>
        <h3 className="font-bold text-gray-900 text-lg mt-3.5 leading-tight">{activeChat.name}</h3>
        <span className="text-xs text-gray-400 mt-1 truncate max-w-[240px]">
          {activeChat.email || "kuldeeprajput.dev@gmail.com"}
        </span>
      </div>

      {/* FaceTime & Communication Controls Row */}
      <div className="grid grid-cols-4 gap-3 my-6 w-full max-w-[260px]">
        <button
          onClick={onClose}
          className="flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-blue-500 flex items-center justify-center transition-all active:scale-95 shadow-sm">
            <MessageSquare className="w-4.5 h-4.5" />
          </div>
          <span className="text-[10px] text-gray-500 font-medium">message</span>
        </button>

        <button
          onClick={() => onTriggerCall("audio")}
          className="flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-blue-500 flex items-center justify-center transition-all active:scale-95 shadow-sm">
            <Phone className="w-4.5 h-4.5" />
          </div>
          <span className="text-[10px] text-gray-500 font-medium">call</span>
        </button>

        <button
          onClick={() => onTriggerCall("video")}
          className="flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-blue-500 flex items-center justify-center transition-all active:scale-95 shadow-sm">
            <Video className="w-4.5 h-4.5" />
          </div>
          <span className="text-[10px] text-gray-500 font-medium">video</span>
        </button>

        <button
          onClick={() => onToggleMute(activeChat.id)}
          className="flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer"
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-sm ${
              isMuted
                ? "bg-red-50 text-red-500 hover:bg-red-100"
                : "bg-gray-100 hover:bg-gray-200 text-blue-500"
            }`}
          >
            {isMuted ? <BellOff className="w-4.5 h-4.5" /> : <Bell className="w-4.5 h-4.5" />}
          </div>
          <span className="text-[10px] text-gray-500 font-medium">
            {isMuted ? "unmute" : "mute"}
          </span>
        </button>
      </div>

      <div className="w-full border-t border-gray-150 my-2" />

      {/* Hide Alerts Toggler Card */}
      <div className="w-full py-2">
        <div className="flex items-center justify-between w-full bg-gray-50/70 p-3 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-2.5 text-left">
            {isMuted ? (
              <BellOff className="w-4 h-4 text-red-400" />
            ) : (
              <Bell className="w-4 h-4 text-gray-400" />
            )}
            <span className="text-xs font-semibold text-gray-700">Hide Alerts</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isMuted}
              onChange={() => onToggleMute(activeChat.id)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
          </label>
        </div>
      </div>

      <div className="w-full border-t border-gray-150 my-2" />

      {/* Links section */}
      <div className="w-full py-3 text-left">
        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
          Links
        </h4>
        {activeChat.github ? (
          <a
            href={activeChat.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl border border-gray-100 text-xs text-blue-500 transition-colors w-full font-semibold"
          >
            <span className="truncate max-w-[190px]">
              {activeChat.github.replace("https://", "")}
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <span className="text-xs text-gray-400 italic px-1">No links shared</span>
        )}
      </div>
    </div>
  );
};

export default ContactInfoPanel;
