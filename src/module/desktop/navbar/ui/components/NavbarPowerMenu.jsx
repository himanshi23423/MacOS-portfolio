const NavbarPowerMenu = ({ setIsAppleMenuOpen, setIsAsleep, setIsShuttingDown }) => (
  <>
    <button
      className="w-full text-left px-4 py-1 hover:bg-[#007aff] hover:text-white transition-colors cursor-default text-[13px] font-sans"
      onClick={() => {
        setIsAppleMenuOpen(false);
        setIsAsleep(true);
      }}
    >
      Sleep
    </button>
    <button
      className="w-full text-left px-4 py-1 hover:bg-[#007aff] hover:text-white transition-colors cursor-default text-[13px] font-sans"
      onClick={() => {
        setIsAppleMenuOpen(false);
        window.location.reload();
      }}
    >
      Restart...
    </button>
    <button
      className="w-full text-left px-4 py-1 hover:bg-[#007aff] hover:text-white transition-colors cursor-default text-[13px] font-sans"
      onClick={() => {
        setIsAppleMenuOpen(false);
        setIsShuttingDown(true);
        setTimeout(() => {
          window.location.href = "about:blank";
        }, 2000);
      }}
    >
      Shut Down...
    </button>
  </>
);

export default NavbarPowerMenu;
