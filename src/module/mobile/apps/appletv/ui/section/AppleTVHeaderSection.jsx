import WindowControls from "@components/WindowControls";

const AppleTVHeaderSection = ({ onProfileClick, profileUrl }) => (
  <div
    id="window-header"
    className="shrink-0 flex items-center justify-between bg-[#f5f5f7] border-b border-zinc-200/50 px-4 pt-12 pb-2.5 z-40 relative"
  >
    <div className="flex items-center gap-2">
      <WindowControls target="appletv" />
    </div>

    <span className="text-[15px] font-bold text-gray-900 absolute left-1/2 -translate-x-1/2 select-none pointer-events-none">
      Apple TV
    </span>

    <button
      onClick={onProfileClick}
      className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center border border-zinc-200 shadow-sm active:scale-95 transition-transform cursor-pointer relative z-50"
    >
      <img
        src={profileUrl || "/images/profile.jpg"}
        alt="Profile"
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://avatars.githubusercontent.com/u/105151528?v=4";
        }}
      />
    </button>
  </div>
);

export default AppleTVHeaderSection;
