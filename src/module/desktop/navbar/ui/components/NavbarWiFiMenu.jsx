const NavbarWiFiMenu = ({ settings, toggleSetting }) => (
  <div
    className="flex items-center gap-2.5 cursor-pointer select-none"
    onClick={() => toggleSetting("wifi")}
  >
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
        settings.wifi ? "bg-[#007aff] text-white" : "bg-white/10 text-white/70"
      }`}
    >
      <svg
        className="w-[17px] h-[17px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12.5a10.8 10.8 0 0 1 14 0" />
        <path d="M8.5 16a5.8 5.8 0 0 1 7 0" />
        <path d="M12 19.5a1.5 1.5 0 0 1 0-3" />
        <path d="M2 9a16 16 0 0 1 20 0" />
      </svg>
    </div>
    <div className="flex flex-col min-w-0">
      <span className="text-[12.5px] font-semibold text-white/95 leading-tight">Wi-Fi</span>
      <span className="text-[10px] text-white/50 leading-tight truncate">
        {settings.wifi ? "Home" : "Off"}
      </span>
    </div>
  </div>
);

export default NavbarWiFiMenu;
