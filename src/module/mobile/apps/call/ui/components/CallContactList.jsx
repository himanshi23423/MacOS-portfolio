import { Search, Phone, Video } from "lucide-react";

const CallContactList = ({ contacts, searchQuery, onSearchChange, onInitiateCall }) => {
  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="p-3.5 shrink-0">
        <div className="relative flex items-center bg-zinc-100 border border-zinc-200/50 rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-zinc-400 mr-2.5 shrink-0" />
          <input
            type="text"
            placeholder="To: name or number"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-transparent text-xs focus:outline-none border-none outline-none text-zinc-800 placeholder-zinc-400"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto thin-scrollbar px-3 pb-4 space-y-1">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-50 group transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              {contact.avatar ? (
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-[38px] h-[38px] rounded-full object-cover shadow-sm shrink-0 border border-black/5"
                />
              ) : (
                <div
                  className={`w-9.5 h-9.5 rounded-full ${contact.avatarColor} text-white flex items-center justify-center font-bold text-xs uppercase shadow-md shrink-0`}
                >
                  {contact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              )}
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-zinc-800 truncate">{contact.name}</h4>
                <p className="text-[10px] text-zinc-400 truncate mt-0.5">{contact.status}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onInitiateCall(contact.name, "audio")}
                className="p-2 bg-zinc-100 hover:bg-zinc-200 rounded-full text-zinc-700 transition-colors"
                title="Voice Call"
              >
                <Phone className="w-3.5 h-3.5 text-zinc-700" />
              </button>
              <button
                onClick={() => onInitiateCall(contact.name, "video")}
                className="p-2 bg-[#30d158]/10 hover:bg-[#30d158]/20 rounded-full text-[#30d158] transition-colors"
                title="FaceTime Video"
              >
                <Video className="w-3.5 h-3.5 fill-[#30d158] text-transparent" />
              </button>
            </div>
          </div>
        ))}
        {filteredContacts.length === 0 && (
          <div className="text-center py-8 text-xs text-zinc-400 italic">No contacts found</div>
        )}
      </div>
    </div>
  );
};

export default CallContactList;
