import { X, Phone, Video, Bell, BellOff, ExternalLink } from "lucide-react";

const ContactInfoPanel = ({
  activeChat,
  mutedChats,
  onToggleMute,
  onTriggerCall,
  onClose,
}) => {
  return (
    <div className="absolute md:relative inset-y-0 right-0 w-64 bg-gray-50 border-l border-gray-200 p-5 overflow-y-auto flex flex-col items-center text-center shrink-0 z-30 transition-transform duration-300">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 md:hidden"
        aria-label="Close details"
      >
        <X className="w-4 h-4 text-gray-500" />
      </button>

      <div className="w-16 h-16 rounded-full shadow-md mt-4 overflow-hidden relative flex items-center justify-center bg-gray-50 border border-gray-100">
        {activeChat.avatar ? (
          <img 
            src={activeChat.avatar} 
            alt={activeChat.name} 
            className={`w-full h-full object-cover ${activeChat.id === "apple" ? "p-3.5 bg-gray-100 object-contain" : ""}`} 
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center text-white font-bold text-2xl ${activeChat.avatarColor}`}>
            {activeChat.initials}
          </div>
        )}
      </div>

      <h3 className="font-bold text-gray-900 text-base mt-3 leading-tight">{activeChat.name}</h3>
      <span className="text-xs text-gray-500 mt-1 truncate w-full">{activeChat.email || "No email info"}</span>

      <div className="flex justify-center gap-4 my-5 w-full">
        <button onClick={() => onTriggerCall("audio")} className="flex flex-col items-center gap-1 select-none">
          <div className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 text-blue-600 flex items-center justify-center active:scale-95 transition-all">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[10px] text-gray-500 font-medium">call</span>
        </button>
        <button onClick={() => onTriggerCall("video")} className="flex flex-col items-center gap-1 select-none">
          <div className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 text-blue-600 flex items-center justify-center active:scale-95 transition-all">
            <Video className="w-4 h-4" />
          </div>
          <span className="text-[10px] text-gray-500 font-medium">video</span>
        </button>
      </div>

      <hr className="w-full border-gray-200 my-1" />

      <div className="w-full py-2 space-y-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 text-left">
            {mutedChats[activeChat.id] ? (
              <BellOff className="w-4 h-4 text-gray-400" />
            ) : (
              <Bell className="w-4 h-4 text-gray-400" />
            )}
            <span className="text-xs font-semibold text-gray-700">Hide Alerts</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={!!mutedChats[activeChat.id]}
              onChange={() => onToggleMute(activeChat.id)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
          </label>
        </div>
      </div>

      <hr className="w-full border-gray-200 my-1" />

      <div className="w-full py-3 text-left">
        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Links</h4>
        {activeChat.github ? (
          <a
            href={activeChat.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 bg-gray-100 hover:bg-gray-200 rounded text-xs text-blue-600 transition-colors w-full font-medium"
          >
            <span className="truncate max-w-[150px]">{activeChat.github.replace("https://", "")}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <span className="text-xs text-gray-400 italic">No links shared</span>
        )}
      </div>
    </div>
  );
};

export default ContactInfoPanel;
