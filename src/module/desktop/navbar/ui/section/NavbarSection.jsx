import NavbarShutdownOverlay from "../components/NavbarShutdownOverlay";
import NavbarAppleSection from "./NavbarAppleSection";
import NavbarAppMenuSection from "./NavbarAppMenuSection";
import NavbarControlCenterSection from "./NavbarControlCenterSection";

const NavbarSection = ({
  now,
  settings,
  battery,
  music,
  isControlOpen,
  isAppleMenuOpen,
  isShuttingDown,
  isAsleep,
  activeAppName,
  appleMenuRef,
  controlCenterRef,
  setIsAppleMenuOpen,
  setIsShuttingDown,
  setIsAsleep,
  openWindow,
  setMusicState,
  toggleSetting,
  updateSlider,
  openControlCenterFromNavbar,
}) => (
  <>
    <NavbarShutdownOverlay
      isAsleep={isAsleep}
      isShuttingDown={isShuttingDown}
      setIsAsleep={setIsAsleep}
    />
    <nav className="mac-navbar">
      <div className="nav-left relative" ref={appleMenuRef}>
        <NavbarAppleSection
          isAppleMenuOpen={isAppleMenuOpen}
          setIsAppleMenuOpen={setIsAppleMenuOpen}
          openWindow={openWindow}
          setIsAsleep={setIsAsleep}
          setIsShuttingDown={setIsShuttingDown}
        />
        <NavbarAppMenuSection
          activeAppName={activeAppName}
          openWindow={openWindow}
          isAppleMenuOpen={isAppleMenuOpen}
          setIsAppleMenuOpen={setIsAppleMenuOpen}
        />
      </div>
      <div className="nav-right relative max-sm:hidden" onClick={openControlCenterFromNavbar}>
        <NavbarControlCenterSection
          now={now}
          battery={battery}
          music={music}
          settings={settings}
          isControlOpen={isControlOpen}
          controlCenterRef={controlCenterRef}
          toggleSetting={toggleSetting}
          updateSlider={updateSlider}
          setMusicState={setMusicState}
          openWindow={openWindow}
          setIsAsleep={setIsAsleep}
        />
      </div>
    </nav>
  </>
);

export default NavbarSection;
