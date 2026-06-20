import { Search, Phone, Video } from "lucide-react";

const CallContactList = ({ contacts, searchQuery, onSearchChange, onInitiateCall }) => {
  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="p-3 shrink-0">
        <div className="relative flex items-center bg-gray-200/60 border border-gray-300/40 rounded-lg px-2.5 py-1.5">
          <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search contacts"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-transparent text-xs focus:outline-none border-none outline-none text-gray-800 placeholder-gray-400"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto thin-scrollbar p-2 space-y-1">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-200/60 group transition-all"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {contact.avatar ? (
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-9 h-9 rounded-full object-cover shadow-sm shrink-0 border border-black/5"
                />
              ) : (
                <div
                  className={`w-9 h-9 rounded-full ${contact.avatarColor} text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm shrink-0`}
                >
                  {contact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              )}
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-gray-800 truncate">{contact.name}</h4>
                <p className="text-[10px] text-gray-400 truncate">{contact.status}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onInitiateCall(contact.name, "audio")}
                className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-600 transition-colors"
                title="Voice Call"
              >
                <Phone className="w-3.5 h-3.5 fill-gray-600 text-transparent" />
              </button>
              <button
                onClick={() => onInitiateCall(contact.name, "video")}
                className="p-1.5 bg-green-100 hover:bg-green-200 rounded-md text-green-600 transition-colors"
                title="FaceTime Video"
              >
                <Video className="w-3.5 h-3.5 fill-green-600 text-transparent" />
              </button>
            </div>
          </div>
        ))}
        {filteredContacts.length === 0 && (
          <div className="text-center py-8 text-xs text-gray-400 italic">No contacts found</div>
        )}
      </div>
    </div>
  );
};

export default CallContactList;
