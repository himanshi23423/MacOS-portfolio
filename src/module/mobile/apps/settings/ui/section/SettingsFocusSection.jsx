import React, { useState } from "react";
import {
  Moon,
  Plus,
  ArrowLeft,
  User,
  Grid,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
  Briefcase,
  BookOpen,
  Gamepad2,
  Heart,
  PlusCircle,
  Check,
} from "lucide-react";
import useWindowsStore from "@store/window";

const SettingsFocusSection = () => {
  const { systemSettings, toggleSystemSetting } = useWindowsStore();
  const { focusMode } = systemSettings;

  // Selected Focus mode for configuration (null means show list)
  const [selectedFocus, setSelectedFocus] = useState(null);

  // Modal dialog to add a new focus mode
  const [showAddModal, setShowAddModal] = useState(false);

  // Shared across devices toggle state
  const [shareAcrossDevices, setShareAcrossDevices] = useState(true);

  // List of active focus profiles
  const [focusProfiles, setFocusProfiles] = useState([
    {
      id: "dnd",
      name: "Do Not Disturb",
      desc: "Silences notifications",
      active: false,
      icon: Moon,
      color: "bg-indigo-500 text-white",
    },
    {
      id: "work",
      name: "Work",
      desc: "Turned on during office hours",
      active: false,
      icon: Briefcase,
      color: "bg-orange-500 text-white",
    },
    {
      id: "gaming",
      name: "Gaming",
      desc: "Silences alerts during play",
      active: false,
      icon: Gamepad2,
      color: "bg-red-500 text-white",
    },
  ]);

  // Allowed lists for active Focus configurations
  const [allowedPeople, setAllowedPeople] = useState(["Family", "Co-workers"]);
  const [allowedApps, setAllowedApps] = useState(["Slack", "Calendar", "Messages"]);

  // Inline inputs to avoid browser prompt dialogs
  const [isAddingPerson, setIsAddingPerson] = useState(false);
  const [newPersonInput, setNewPersonInput] = useState("");
  const [isAddingApp, setIsAddingApp] = useState(false);
  const [newAppInput, setNewAppInput] = useState("");

  const focusTemplates = [
    {
      name: "Personal",
      icon: Heart,
      color: "bg-purple-500 text-white",
      desc: "Silences notifications when off duty",
    },
    {
      name: "Reading",
      icon: BookOpen,
      color: "bg-teal-500 text-white",
      desc: "Minimize distractions during study",
    },
  ];

  const handleToggleDnd = () => {
    toggleSystemSetting("focusMode");
    setFocusProfiles((prev) =>
      prev.map((p) => (p.id === "dnd" ? { ...p, active: !focusMode } : p)),
    );
  };

  const handleToggleProfile = (id) => {
    if (id === "dnd") {
      handleToggleDnd();
    } else {
      setFocusProfiles((prev) => prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
    }
  };

  const handleAddFocus = (template) => {
    const newProfile = {
      id: template.name.toLowerCase(),
      name: template.name,
      desc: template.desc,
      active: false,
      icon: template.icon,
      color: template.color,
    };
    setFocusProfiles((prev) => [...prev, newProfile]);
    setShowAddModal(false);
  };

  if (selectedFocus) {
    const profile = focusProfiles.find((p) => p.name === selectedFocus);
    const IconComp = profile.icon;
    const isActive = profile.id === "dnd" ? focusMode : profile.active;

    return (
      <div className="w-full px-4 py-6 space-y-6 select-none animate-in fade-in slide-in-from-left-2 duration-200">
        {/* Navigation back */}
        <button
          onClick={() => setSelectedFocus(null)}
          className="flex items-center gap-1 text-[13px] font-bold text-blue-500 hover:text-blue-600 transition-colors focus:outline-none bg-transparent border-none cursor-pointer p-0"
        >
          <ChevronLeft size={16} strokeWidth={2.5} />
          <span>Focus</span>
        </button>

        {/* Profile Info Header */}
        <div className="bg-white rounded-2xl border border-black/5 p-4 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0 ${profile.color}`}
            >
              <IconComp size={18} />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-gray-900 leading-tight">{profile.name}</h3>
              <p className="text-[12px] text-gray-400 mt-0.5">{profile.desc}</p>
            </div>
          </div>

          <button
            onClick={() => handleToggleProfile(profile.id)}
            className={`w-[51px] h-[31px] rounded-full transition-colors relative flex items-center px-0.5 border-none outline-none cursor-pointer ${
              isActive ? "bg-blue-500" : "bg-zinc-200"
            }`}
          >
            <div
              className={`w-[27px] h-[27px] rounded-full bg-white shadow-md transition-transform duration-200 ${
                isActive ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Allowed Exceptions */}
        <div className="space-y-5 animate-in fade-in duration-200">
          <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider ml-3 mb-2">
            Allowed Notifications
          </h3>
          <div className="space-y-4">
            {/* Allowed Contacts */}
            <div className="bg-white border border-black/5 rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-3">
              <div className="flex items-center gap-2 text-gray-800 border-b border-zinc-100 pb-2">
                <User size={15} className="text-blue-500" />
                <span className="text-[13px] font-bold">Allowed People</span>
              </div>
              <div className="flex flex-wrap gap-1.5 min-h-[50px] items-start content-start">
                {allowedPeople.map((person) => (
                  <span
                    key={person}
                    className="bg-zinc-50 border border-zinc-150 rounded-xl px-3 py-1 text-[12px] font-semibold text-gray-700 flex items-center gap-1.5"
                  >
                    {person}
                    <button
                      onClick={() => setAllowedPeople((prev) => prev.filter((p) => p !== person))}
                      className="text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer p-0"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                {isAddingPerson ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (newPersonInput.trim()) {
                        setAllowedPeople((prev) => [...prev, newPersonInput.trim()]);
                        setNewPersonInput("");
                        setIsAddingPerson(false);
                      }
                    }}
                    className="flex items-center"
                  >
                    <input
                      type="text"
                      value={newPersonInput}
                      onChange={(e) => setNewPersonInput(e.target.value)}
                      placeholder="Name"
                      className="border border-zinc-200 rounded-xl px-2.5 py-1 text-xs w-24 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-zinc-50"
                      autoFocus
                      onBlur={() => {
                        setTimeout(() => setIsAddingPerson(false), 200);
                      }}
                    />
                  </form>
                ) : (
                  <button
                    onClick={() => setIsAddingPerson(true)}
                    className="bg-blue-50 hover:bg-blue-100 border border-blue-100 text-blue-500 rounded-xl px-3 py-1 text-[12px] font-bold flex items-center gap-0.5 cursor-pointer"
                  >
                    <Plus size={10} strokeWidth={2.5} /> Add
                  </button>
                )}
              </div>
            </div>

            {/* Allowed Apps */}
            <div className="bg-white border border-black/5 rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-3">
              <div className="flex items-center gap-2 text-gray-800 border-b border-zinc-100 pb-2">
                <Grid size={15} className="text-blue-500" />
                <span className="text-[13px] font-bold">Allowed Apps</span>
              </div>
              <div className="flex flex-wrap gap-1.5 min-h-[50px] items-start content-start">
                {allowedApps.map((app) => (
                  <span
                    key={app}
                    className="bg-zinc-50 border border-zinc-150 rounded-xl px-3 py-1 text-[12px] font-semibold text-gray-700 flex items-center gap-1.5"
                  >
                    {app}
                    <button
                      onClick={() => setAllowedApps((prev) => prev.filter((a) => a !== app))}
                      className="text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer p-0"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                {isAddingApp ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (newAppInput.trim()) {
                        setAllowedApps((prev) => [...prev, newAppInput.trim()]);
                        setNewAppInput("");
                        setIsAddingApp(false);
                      }
                    }}
                    className="flex items-center"
                  >
                    <input
                      type="text"
                      value={newAppInput}
                      onChange={(e) => setNewAppInput(e.target.value)}
                      placeholder="App Name"
                      className="border border-zinc-200 rounded-xl px-2.5 py-1 text-xs w-24 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-zinc-50"
                      autoFocus
                      onBlur={() => {
                        setTimeout(() => setIsAddingApp(false), 200);
                      }}
                    />
                  </form>
                ) : (
                  <button
                    onClick={() => setIsAddingApp(true)}
                    className="bg-blue-50 hover:bg-blue-100 border border-blue-100 text-blue-500 rounded-xl px-3 py-1 text-[12px] font-bold flex items-center gap-0.5 cursor-pointer"
                  >
                    <Plus size={10} strokeWidth={2.5} /> Add
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider ml-3 mb-2">
            Schedule & Automation
          </h3>
          <div className="bg-white rounded-2xl border border-black/5 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] text-xs text-gray-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-gray-400 shrink-0" />
              <div>
                <span className="font-bold text-gray-900 block leading-tight">Set a Schedule</span>
                <span className="text-[11px] text-gray-400 font-medium block mt-1 leading-normal">
                  Automatically trigger Focus from 22:00 to 07:00 daily
                </span>
              </div>
            </div>
            <span className="text-[12px] font-bold text-gray-400 shrink-0">22:00 - 07:00</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6 space-y-6 select-none animate-in fade-in slide-in-from-bottom-2 duration-300 relative min-h-[440px]">
      {/* Focus Profiles List */}
      <div>
        <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider ml-3 mb-2">
          Focus Profiles
        </h3>
        <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] divide-y divide-zinc-100">
          {focusProfiles.map((profile) => {
            const IconComp = profile.icon;
            const isActive = profile.id === "dnd" ? focusMode : profile.active;
            return (
              <div
                key={profile.id}
                onClick={() => setSelectedFocus(profile.name)}
                className="flex items-center justify-between p-3.5 pl-4 hover:bg-zinc-50 cursor-pointer active:bg-zinc-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${profile.color}`}
                  >
                    <IconComp size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-semibold text-gray-800 leading-tight">
                      {profile.name}
                    </span>
                    <span className="text-[11px] text-gray-400 mt-0.5 leading-tight">
                      {profile.desc}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 text-gray-400">
                  <span
                    className={`text-xs ${isActive ? "text-blue-500 font-bold" : "text-gray-400 font-semibold"}`}
                  >
                    {isActive ? "On" : "Off"}
                  </span>
                  <ChevronRight size={16} className="text-gray-300 ml-0.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Share across devices */}
      <div>
        <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider ml-3 mb-2">
          Options
        </h3>
        <div className="bg-white rounded-2xl border border-black/5 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex justify-between items-center text-xs">
          <div>
            <span className="font-bold text-gray-800 text-[15px] block leading-tight">
              Share Across Devices
            </span>
            <span className="text-[11px] text-gray-400 font-medium block mt-1 leading-normal">
              Sync focus statuses with all device profiles on this iCloud
            </span>
          </div>
          <button
            onClick={() => setShareAcrossDevices(!shareAcrossDevices)}
            className={`w-[51px] h-[31px] rounded-full transition-colors relative flex items-center px-0.5 border-none outline-none cursor-pointer shrink-0 ${
              shareAcrossDevices ? "bg-blue-500" : "bg-zinc-200"
            }`}
          >
            <div
              className={`w-[27px] h-[27px] rounded-full bg-white shadow-md transition-transform duration-200 ${
                shareAcrossDevices ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Add Focus Button */}
      <div
        onClick={() => setShowAddModal(true)}
        className="w-full border border-dashed border-zinc-300 hover:border-blue-400 bg-zinc-50 rounded-2xl p-4 flex items-center justify-center gap-2 cursor-pointer hover:bg-white transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
      >
        <PlusCircle size={16} className="text-gray-400" />
        <span className="text-[15px] font-bold text-gray-500">Add Focus...</span>
      </div>

      {/* Templates Modal Overlay */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-black/5 rounded-3xl shadow-2xl p-5 w-80 max-w-full select-none animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-100">
              <h4 className="text-[16px] font-bold text-gray-900 leading-tight">
                Create Focus Profile
              </h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-650 bg-transparent border-none cursor-pointer p-0"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-[12px] text-gray-500 mb-3">
              Choose a template for your new focus filter:
            </p>
            <div className="space-y-2">
              {focusTemplates.map((template) => {
                const TempIcon = template.icon;
                return (
                  <div
                    key={template.name}
                    onClick={() => handleAddFocus(template)}
                    className="flex items-center gap-3 p-3 rounded-2xl border border-zinc-200 hover:bg-blue-50/10 hover:border-blue-300 cursor-pointer transition-all duration-150 bg-zinc-50"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${template.color}`}
                    >
                      <TempIcon size={16} />
                    </div>
                    <div className="text-left">
                      <span className="text-[14px] font-bold text-gray-800 block leading-tight">
                        {template.name}
                      </span>
                      <span className="text-[10px] text-gray-450 font-semibold block leading-tight mt-0.5">
                        {template.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsFocusSection;
