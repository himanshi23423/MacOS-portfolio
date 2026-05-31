const NavbarPowerMenu = ({ setIsAppleMenuOpen, setIsAsleep, setIsShuttingDown }) => (
  <div className="apple-menu-section">
    <button
      type="button"
      className="apple-menu-item"
      onClick={() => {
        setIsAppleMenuOpen(false);
        setIsAsleep(true);
      }}
    >
      Sleep
    </button>
    <button
      type="button"
      className="apple-menu-item"
      onClick={() => {
        setIsAppleMenuOpen(false);
        window.location.reload();
      }}
    >
      Restart...
    </button>
    <button
      type="button"
      className="apple-menu-item"
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
  </div>
);

export default NavbarPowerMenu;
