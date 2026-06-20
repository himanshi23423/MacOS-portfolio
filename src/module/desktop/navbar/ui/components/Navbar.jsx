import { appNames } from "../../data/navbarData";
import useNavbar from "../../hooks/useNavbar";
import NavbarSection from "../section/NavbarSection";

const Navbar = () => {
  const {
    now,
    settings,
    battery,
    music,
    isControlOpen,
    isAppleMenuOpen,
    isShuttingDown,
    isAsleep,
    activeAppKey,
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
  } = useNavbar();

  const activeAppName = activeAppKey ? appNames[activeAppKey] || "Finder" : "Kuldeep's Portfolio";

  return (
    <NavbarSection
      now={now}
      settings={settings}
      battery={battery}
      music={music}
      isControlOpen={isControlOpen}
      isAppleMenuOpen={isAppleMenuOpen}
      isShuttingDown={isShuttingDown}
      isAsleep={isAsleep}
      activeAppName={activeAppName}
      appleMenuRef={appleMenuRef}
      controlCenterRef={controlCenterRef}
      setIsAppleMenuOpen={setIsAppleMenuOpen}
      setIsShuttingDown={setIsShuttingDown}
      setIsAsleep={setIsAsleep}
      openWindow={openWindow}
      setMusicState={setMusicState}
      toggleSetting={toggleSetting}
      updateSlider={updateSlider}
      openControlCenterFromNavbar={openControlCenterFromNavbar}
    />
  );
};

export default Navbar;
