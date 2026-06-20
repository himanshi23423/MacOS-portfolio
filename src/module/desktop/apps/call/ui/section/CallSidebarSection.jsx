import { Users, Grid } from "lucide-react";
import CallContactList from "../components/CallContactList";
import CallDialPad from "../components/CallDialPad";
import { CONTACTS } from "../../data";

const CallSidebarSection = ({
  sidebarTab,
  setSidebarTab,
  searchQuery,
  setSearchQuery,
  onInitiateCall,
  dialNumber,
  onDialPress,
  onBackspace,
  onClear,
  onInputChange,
  isSidebarOpen,
  _onCloseSidebar,
  isNarrow,
}) => (
  <aside
    className={`
      transition-all duration-300 bg-gray-100 border-r border-[#d1d1d1] flex flex-col shrink-0
      ${
        isNarrow
          ? `absolute inset-y-0 left-0 w-64 z-30 shadow-xl ${
              isSidebarOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0 pointer-events-none"
            }`
          : "relative w-64 translate-x-0 opacity-100"
      }
    `}
  >
    <div className="p-3.5 flex justify-center border-b border-gray-200/60 bg-gray-100 shrink-0">
      <div className="flex bg-gray-200/80 p-0.5 rounded-lg w-full max-w-[200px]">
        <button
          onClick={() => setSidebarTab("contacts")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1 text-[11px] font-bold rounded-md transition-all ${
            sidebarTab === "contacts"
              ? "bg-white text-gray-800 shadow-sm"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          Contacts
        </button>
        <button
          onClick={() => setSidebarTab("dialpad")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1 text-[11px] font-bold rounded-md transition-all ${
            sidebarTab === "dialpad"
              ? "bg-white text-gray-800 shadow-sm"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          Keypad
        </button>
      </div>
    </div>

    {sidebarTab === "contacts" && (
      <CallContactList
        contacts={CONTACTS}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onInitiateCall={onInitiateCall}
      />
    )}

    {sidebarTab === "dialpad" && (
      <CallDialPad
        dialNumber={dialNumber}
        onDialPress={onDialPress}
        onBackspace={onBackspace}
        onClear={onClear}
        onInputChange={onInputChange}
        onInitiateCall={onInitiateCall}
      />
    )}
  </aside>
);

export default CallSidebarSection;
