import React from "react";
import {
  ArrowLeft,
  User,
  Users,
  Megaphone,
  Phone,
  Bookmark,
  Settings as SettingsIcon,
  Moon,
  Camera,
  Lock,
  Bell,
  Monitor,
} from "lucide-react";

const TelegramSidebarDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  drawerSection,
  setDrawerSection,
  nightMode,
  userProfile,
  setUserProfile,
  newGroupName,
  setNewGroupName,
  newChannelName,
  setNewChannelName,
  newChannelBio,
  setNewChannelBio,
  chatThemeColor,
  setChatThemeColor,
  handleCreateGroup,
  handleCreateChannel,
  openSavedMessages,
  setActiveChatId,
  setNightMode,
}) => {
  if (!isDrawerOpen) return null;

  return (
    <div
      className={`absolute inset-0 z-30 flex flex-col transition-all duration-300 ${
        nightMode ? "bg-[#181818] border-r border-zinc-800" : "bg-white border-r border-zinc-200"
      }`}
    >
      <div className="p-3 border-b flex items-center gap-3 shrink-0 dark:border-zinc-800">
        <button
          onClick={() => {
            if (drawerSection === "menu") {
              setIsDrawerOpen(false);
            } else {
              setDrawerSection("menu");
            }
          }}
          className={`p-1.5 rounded-lg transition-colors ${
            nightMode ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-100 text-gray-600"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span
          className={`font-bold text-xs capitalize ${
            nightMode ? "text-zinc-200" : "text-gray-700"
          }`}
        >
          {drawerSection === "menu" ? "Back" : drawerSection.replace("_", " ")}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        {drawerSection === "menu" && (
          <div className="flex flex-col h-full">
            <div className="p-5 text-left flex flex-col items-start gap-3 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-cyan-500/10 shrink-0">
              <div className="w-14 h-14 rounded-full bg-orange-500 text-white font-bold text-lg flex items-center justify-center shadow-md">
                P
              </div>
              <div>
                <h4
                  className={`font-bold text-sm flex items-center gap-1 ${nightMode ? "text-white" : "text-gray-900"}`}
                >
                  {userProfile.name}
                </h4>
                <span className={`text-[10px] ${nightMode ? "text-zinc-400" : "text-gray-500"}`}>
                  Set Emoji Status
                </span>
              </div>
            </div>

            <div className="p-2 space-y-0.5 text-xs text-left">
              <button
                onClick={() => setDrawerSection("profile")}
                className="w-full p-2.5 rounded-lg flex items-center gap-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-850"
              >
                <User className="w-4.5 h-4.5 text-gray-400" />
                <span>My Profile</span>
              </button>
              <button
                onClick={() => setDrawerSection("new_group")}
                className="w-full p-2.5 rounded-lg flex items-center gap-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-850"
              >
                <Users className="w-4.5 h-4.5 text-gray-400" />
                <span>New Group</span>
              </button>
              <button
                onClick={() => setDrawerSection("new_channel")}
                className="w-full p-2.5 rounded-lg flex items-center gap-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-850"
              >
                <Megaphone className="w-4.5 h-4.5 text-gray-400" />
                <span>New Channel</span>
              </button>
              <button
                onClick={() => setDrawerSection("contacts")}
                className="w-full p-2.5 rounded-lg flex items-center gap-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-850"
              >
                <User className="w-4.5 h-4.5 text-gray-400" />
                <span>Contacts</span>
              </button>
              <button
                onClick={() => setDrawerSection("calls")}
                className="w-full p-2.5 rounded-lg flex items-center gap-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-850"
              >
                <Phone className="w-4.5 h-4.5 text-gray-400" />
                <span>Calls</span>
              </button>
              <button
                onClick={openSavedMessages}
                className="w-full p-2.5 rounded-lg flex items-center gap-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-850"
              >
                <Bookmark className="w-4.5 h-4.5 text-gray-400" />
                <span>Saved Messages</span>
              </button>
              <button
                onClick={() => setDrawerSection("settings")}
                className="w-full p-2.5 rounded-lg flex items-center gap-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-850"
              >
                <SettingsIcon className="w-4.5 h-4.5 text-gray-400" />
                <span>Settings</span>
              </button>

              <div className="p-2.5 flex items-center justify-between text-xs border-t border-zinc-100 dark:border-zinc-800 mt-2">
                <div className="flex items-center gap-3">
                  <Moon className="w-4.5 h-4.5 text-gray-400" />
                  <span>Night Mode</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={nightMode}
                    onChange={() => setNightMode(!nightMode)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4.5 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>

            <div className="mt-auto p-4 text-[10px] text-gray-400 text-center select-none border-t dark:border-zinc-800">
              Telegram Desktop
              <br />
              Version 6.8.2 – About
            </div>
          </div>
        )}

        {drawerSection === "profile" && (
          <div className="p-4 space-y-4 text-xs text-left">
            <div className="flex flex-col items-center gap-2.5 py-4 border-b dark:border-zinc-800">
              <div className="w-18 h-18 rounded-full bg-orange-500 text-white font-bold text-2xl flex items-center justify-center relative shadow group">
                P
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-[10px] text-blue-500 font-bold hover:underline cursor-pointer">
                Change Profile Photo
              </span>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">
                  Display Name
                </label>
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-zinc-100 dark:bg-zinc-800 dark:text-white border-none rounded px-3 py-1.5 mt-1 outline-none text-xs focus:ring-1 focus:ring-blue-500 select-text"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">Username</label>
                <input
                  type="text"
                  value={userProfile.username}
                  onChange={(e) =>
                    setUserProfile((prev) => ({ ...prev, username: e.target.value }))
                  }
                  className="w-full bg-zinc-100 dark:bg-zinc-800 dark:text-white border-none rounded px-3 py-1.5 mt-1 outline-none text-xs focus:ring-1 focus:ring-blue-500 select-text"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={userProfile.phone}
                  onChange={(e) => setUserProfile((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-zinc-100 dark:bg-zinc-800 dark:text-white border-none rounded px-3 py-1.5 mt-1 outline-none text-xs focus:ring-1 focus:ring-blue-500 select-text"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">Bio</label>
                <textarea
                  rows="3"
                  value={userProfile.bio}
                  onChange={(e) => setUserProfile((prev) => ({ ...prev, bio: e.target.value }))}
                  className="w-full bg-zinc-100 dark:bg-zinc-800 dark:text-white border-none rounded px-3 py-1.5 mt-1 outline-none text-xs resize-none focus:ring-1 focus:ring-blue-500 select-text"
                />
              </div>
            </div>
          </div>
        )}

        {drawerSection === "new_group" && (
          <div className="p-4 space-y-4 text-xs text-left">
            <span className="text-[10px] text-gray-400 font-bold block uppercase">
              Create Group Chat
            </span>
            <div>
              <label className="text-[10px] text-gray-400 font-medium">Group Name</label>
              <input
                type="text"
                placeholder="e.g. Next.js Developers"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="w-full bg-zinc-100 dark:bg-zinc-800 dark:text-white border border-zinc-200 dark:border-zinc-700 rounded px-3 py-1.5 mt-1 outline-none focus:border-blue-500 select-text"
              />
            </div>
            <button
              onClick={handleCreateGroup}
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors cursor-pointer text-center"
            >
              Create Group
            </button>
          </div>
        )}

        {drawerSection === "new_channel" && (
          <div className="p-4 space-y-4 text-xs text-left">
            <span className="text-[10px] text-gray-400 font-bold block uppercase">
              Create Broadcast Channel
            </span>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-gray-400 font-medium">Channel Name</label>
                <input
                  type="text"
                  placeholder="e.g. Daily Tech Bytes"
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value)}
                  className="w-full bg-zinc-100 dark:bg-zinc-800 dark:text-white border border-zinc-200 dark:border-zinc-700 rounded px-3 py-1.5 mt-1 outline-none focus:border-blue-500 select-text"
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-400 font-medium">Description</label>
                <textarea
                  placeholder="What is this channel about?"
                  rows="3"
                  value={newChannelBio}
                  onChange={(e) => setNewChannelBio(e.target.value)}
                  className="w-full bg-zinc-100 dark:bg-zinc-800 dark:text-white border border-zinc-200 dark:border-zinc-700 rounded px-3 py-1.5 mt-1 outline-none focus:border-blue-500 select-text"
                />
              </div>
            </div>
            <button
              onClick={handleCreateChannel}
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors cursor-pointer text-center"
            >
              Create Channel
            </button>
          </div>
        )}

        {drawerSection === "contacts" && (
          <div className="p-2 space-y-1 text-xs text-left">
            <span className="text-[10px] text-gray-400 font-bold px-2.5 block uppercase tracking-wider mb-2">
              My Contacts
            </span>
            {[
              {
                name: "Kuldeep (Developer)",
                role: "@kuldeeprajput_dev",
                color: "bg-blue-500",
                initial: "K",
                id: "kuldeep",
              },
              {
                name: "Amit Kumar",
                role: "@amit_kumar",
                color: "bg-teal-500",
                initial: "A",
                id: "react_group",
              },
              {
                name: "Sneha Reddy",
                role: "@sneha_dev",
                color: "bg-emerald-500",
                initial: "S",
                id: "react_group",
              },
            ].map((cont) => (
              <div
                key={cont.name}
                onClick={() => {
                  setActiveChatId(cont.id);
                  setIsDrawerOpen(false);
                }}
                className="p-2 flex items-center gap-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-850 cursor-pointer"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${cont.color}`}
                >
                  {cont.initial}
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white">{cont.name}</h5>
                  <span className="text-[10px] text-gray-400 block">{cont.role}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {drawerSection === "calls" && (
          <div className="p-3 space-y-2.5 text-xs text-left">
            <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider mb-1">
              Recent Call Logs
            </span>
            {[
              { name: "Kuldeep (Developer)", time: "Today, 10:35 AM", type: "Outgoing" },
              { name: "Kuldeep (Developer)", time: "Yesterday, 2:40 PM", type: "Missed" },
              { name: "System Assistant", time: "May 25, 4:10 PM", type: "Incoming" },
            ].map((call, idx) => (
              <div
                key={idx}
                className="border-b dark:border-zinc-800 pb-2 flex justify-between items-center"
              >
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white">{call.name}</h5>
                  <span className="text-[10px] text-gray-400 block">{call.time}</span>
                </div>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    call.type === "Missed"
                      ? "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-300"
                      : "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                  }`}
                >
                  {call.type}
                </span>
              </div>
            ))}
          </div>
        )}

        {drawerSection === "settings" && (
          <div className="p-3 text-xs text-left space-y-4">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Select Chat Theme
              </span>
              <div className="flex gap-2.5">
                {["blue", "green", "purple", "orange"].map((col) => (
                  <button
                    key={col}
                    onClick={() => setChatThemeColor(col)}
                    className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                      col === "blue"
                        ? "bg-blue-500"
                        : col === "green"
                          ? "bg-emerald-500"
                          : col === "purple"
                            ? "bg-purple-500"
                            : "bg-orange-500"
                    } ${chatThemeColor === col ? "border-black scale-110 shadow-md ring-1 ring-blue-400" : "border-transparent hover:scale-105"}`}
                    title={`${col} theme`}
                  />
                ))}
              </div>
            </div>
            <hr className="border-zinc-100 dark:border-zinc-800" />
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Privacy & Security
              </span>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-400" />
                  <span>Passcode Lock</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-8 h-4.5 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-gray-400" />
                  <span>Push Notifications</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-8 h-4.5 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
            <hr className="border-zinc-100 dark:border-zinc-800" />
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Active Devices
              </span>
              <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center gap-2">
                <Monitor className="w-4 h-4 text-blue-500 shrink-0" />
                <div>
                  <h6 className="font-bold text-[10px] text-gray-800 dark:text-white">
                    macOS M2 Max
                  </h6>
                  <span className="text-[8px] text-gray-400 block">
                    Safari Browser • Active Now
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TelegramSidebarDrawer;
