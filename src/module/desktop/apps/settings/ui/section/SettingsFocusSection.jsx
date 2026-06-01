import React, { useState } from "react";
import {
  Moon,
  Plus,
  ToggleLeft,
  ToggleRight,
  ArrowLeft,
  User,
  Grid,
  Clock,
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
      desc: "Silences alerts during full screen play",
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

  // Custom focus options mapping
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
    // Keep profiles active synced with DND
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
      <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-left-2 duration-200">
        {/* Navigation back */}
        <button
          onClick={() => setSelectedFocus(null)}
          className="flex items-center gap-1 text-[11px] font-bold text-gray-500 hover:text-[#007aff] transition-colors focus:outline-none mb-6 p-1 rounded hover:bg-gray-150"
        >
          <ArrowLeft size={13} />
          <span>Back to Focus</span>
        </button>

        {/* Profile Info */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-150">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${profile.color}`}
            >
              <IconComp size={20} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-gray-900 leading-tight">
                {profile.name}
              </h2>
              <p className="text-[11.5px] text-gray-400 font-semibold mt-0.5">{profile.desc}</p>
            </div>
          </div>

          <button onClick={() => handleToggleProfile(profile.id)} className="focus:outline-none">
            {isActive ? (
              <ToggleRightActive size={36} className="text-[#007aff] cursor-pointer" />
            ) : (
              <ToggleRightInactive size={36} className="text-gray-300 cursor-pointer" />
            )}
          </button>
        </div>

        {/* Allowed Exceptions card */}
        <div className="space-y-6 animate-in fade-in duration-200">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
            Allowed Notifications
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Allowed Contacts */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-gray-800 border-b border-gray-100 pb-2">
                <User size={15} className="text-[#007aff]" />
                <span className="text-[12.5px] font-bold">Allowed People</span>
              </div>
              <div className="flex flex-wrap gap-1.5 min-h-[50px] items-start content-start">
                {allowedPeople.map((person) => (
                  <span
                    key={person}
                    className="bg-gray-100 border border-gray-200 rounded px-2 py-0.5 text-[11px] font-semibold text-gray-700 flex items-center gap-1"
                  >
                    {person}
                    <button
                      onClick={() => setAllowedPeople((prev) => prev.filter((p) => p !== person))}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={10} />
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
                      className="border border-gray-300 rounded px-1.5 py-0.5 text-[10px] w-20 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                      autoFocus
                      onBlur={() => {
                        setTimeout(() => setIsAddingPerson(false), 200);
                      }}
                    />
                  </form>
                ) : (
                  <button
                    onClick={() => setIsAddingPerson(true)}
                    className="bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#007aff] rounded px-2 py-0.5 text-[11px] font-bold flex items-center gap-0.5"
                  >
                    <Plus size={10} /> Add
                  </button>
                )}
              </div>
            </div>

            {/* Allowed Apps */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-gray-800 border-b border-gray-100 pb-2">
                <Grid size={15} className="text-[#007aff]" />
                <span className="text-[12.5px] font-bold">Allowed Apps</span>
              </div>
              <div className="flex flex-wrap gap-1.5 min-h-[50px] items-start content-start">
                {allowedApps.map((app) => (
                  <span
                    key={app}
                    className="bg-gray-100 border border-gray-200 rounded px-2 py-0.5 text-[11px] font-semibold text-gray-700 flex items-center gap-1"
                  >
                    {app}
                    <button
                      onClick={() => setAllowedApps((prev) => prev.filter((a) => a !== app))}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={10} />
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
                      className="border border-gray-300 rounded px-1.5 py-0.5 text-[10px] w-20 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                      autoFocus
                      onBlur={() => {
                        setTimeout(() => setIsAddingApp(false), 200);
                      }}
                    />
                  </form>
                ) : (
                  <button
                    onClick={() => setIsAddingApp(true)}
                    className="bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#007aff] rounded px-2 py-0.5 text-[11px] font-bold flex items-center gap-0.5"
                  >
                    <Plus size={10} /> Add
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
            Schedule & Automation
          </h3>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm text-xs text-gray-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-gray-400 shrink-0" />
              <div>
                <span className="font-bold text-gray-900 block">Set a Schedule</span>
                <span className="text-[11px] text-gray-400 font-semibold block mt-0.5">
                  Automatically trigger Focus from 22:00 to 07:00 daily
                </span>
              </div>
            </div>
            <span className="text-[11.5px] font-bold text-gray-400">22:00 - 07:00</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300 relative min-h-[440px]">
      {/* Focus Modes List */}
      <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2">
        Focus Profiles
      </h3>
      <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm divide-y divide-gray-100 mb-6">
        {focusProfiles.map((profile) => {
          const IconComp = profile.icon;
          const isActive = profile.id === "dnd" ? focusMode : profile.active;
          return (
            <div
              key={profile.id}
              onClick={() => setSelectedFocus(profile.name)}
              className="flex items-center justify-between p-3.5 px-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${profile.color}`}
                >
                  <IconComp size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-gray-900">{profile.name}</span>
                  <span className="text-[10px] text-gray-400 font-semibold">{profile.desc}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[12px] font-semibold ${isActive ? "text-[#007aff]" : "text-gray-400"}`}
                >
                  {isActive ? "On" : "Off"}
                </span>
                <ChevronRight size={14} className="text-gray-400" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Options Panel */}
      <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2">
        Options
      </h3>
      <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm p-4 mb-6 text-xs text-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-gray-900 block">Share Across Devices</span>
            <span className="text-[10.5px] text-gray-400 font-semibold block mt-0.5">
              Sync focus statuses with all device profiles on this iCloud
            </span>
          </div>
          <button
            onClick={() => setShareAcrossDevices(!shareAcrossDevices)}
            className="focus:outline-none"
          >
            {shareAcrossDevices ? (
              <ToggleRightActive size={32} className="text-[#007aff] cursor-pointer" />
            ) : (
              <ToggleRightInactive size={32} className="text-gray-300 cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      {/* Add Focus Mode launcher */}
      <div
        onClick={() => setShowAddModal(true)}
        className="w-full border border-dashed border-gray-300 hover:border-blue-400 bg-gray-50/30 rounded-xl p-4 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <PlusCircle size={16} className="text-gray-500" />
        <span className="text-[13px] font-bold text-gray-600">Add Focus...</span>
      </div>

      {/* Add Focus Modal Dialog */}
      {showAddModal && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-xl shadow-2xl p-5 w-80 max-w-full select-none animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
              <h4 className="text-[13px] font-extrabold text-gray-900 leading-tight">
                Create Focus Profile
              </h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={15} />
              </button>
            </div>

            <p className="text-[11px] text-gray-400 font-semibold mb-3">
              Choose a template for your new focus filter:
            </p>
            <div className="space-y-2">
              {focusTemplates.map((template) => {
                const TempIcon = template.icon;
                return (
                  <div
                    key={template.name}
                    onClick={() => handleAddFocus(template)}
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-blue-50/10 hover:border-blue-300 cursor-pointer transition-all duration-150"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${template.color}`}
                    >
                      <TempIcon size={16} />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-gray-800 block leading-tight">
                        {template.name}
                      </span>
                      <span className="text-[9.5px] text-gray-400 font-semibold block leading-tight mt-0.5">
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

const ToggleRightActive = () => (
  <div className="w-10 h-6 rounded-full transition-colors relative shrink-0 cursor-pointer bg-[#007aff]">
    <span className="w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-md transition-all left-[18px]" />
  </div>
);

const ToggleRightInactive = () => (
  <div className="w-10 h-6 rounded-full transition-colors relative shrink-0 cursor-pointer bg-gray-300">
    <span className="w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-md transition-all left-0.5" />
  </div>
);

export default SettingsFocusSection;
