import NavbarAppMenu from "../components/NavbarAppMenu";

const NavbarAppMenuSection = ({
  activeAppName,
  openWindow,
  isAppleMenuOpen,
  setIsAppleMenuOpen,
}) => (
  <NavbarAppMenu
    activeAppName={activeAppName}
    openWindow={openWindow}
    isAppleMenuOpen={isAppleMenuOpen}
    setIsAppleMenuOpen={setIsAppleMenuOpen}
  />
);

export default NavbarAppMenuSection;
