import NavbarPowerMenu from "./NavbarPowerMenu";

const NavbarAppleMenu = ({ isAppleMenuOpen, setIsAppleMenuOpen, openWindow, setIsAsleep, setIsShuttingDown }) => {
  if (!isAppleMenuOpen) return null;

  return (
    <div className="absolute left-2.5 top-[28px] w-56 bg-[#2a2a2a]/90 backdrop-blur-3xl border border-white/10 rounded-lg shadow-2xl py-1 z-[99999] select-none text-[13.5px] text-white/95">
      <button
        className="w-full text-left px-4 py-1 hover:bg-[#007aff] hover:text-white transition-colors cursor-default text-[13px] font-sans"
        onClick={() => {
          setIsAppleMenuOpen(false);
          openWindow("settings", { tab: "General", time: Date.now() });
        }}
      >
        About This Mac
      </button>
      <div className="h-[1px] bg-white/10 my-1 mx-2" />
      <button
        className="w-full text-left px-4 py-1 hover:bg-[#007aff] hover:text-white transition-colors cursor-default text-[13px] font-sans"
        onClick={() => {
          setIsAppleMenuOpen(false);
          openWindow("settings");
        }}
      >
        System Settings...
      </button>
      <button
        className="w-full text-left px-4 py-1 hover:bg-[#007aff] hover:text-white transition-colors cursor-default text-[13px] font-sans"
        onClick={() => {
          setIsAppleMenuOpen(false);
          openWindow("appstore");
        }}
      >
        App Store...
      </button>
      <div className="h-[1px] bg-white/10 my-1 mx-2" />
      <NavbarPowerMenu
        setIsAppleMenuOpen={setIsAppleMenuOpen}
        setIsAsleep={setIsAsleep}
        setIsShuttingDown={setIsShuttingDown}
      />
    </div>
  );
};

export default NavbarAppleMenu;
