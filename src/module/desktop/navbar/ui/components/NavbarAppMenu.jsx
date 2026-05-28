const NavbarAppMenu = ({ activeAppName, openWindow }) => (
  <ul className="nav-links max-sm:hidden">
    <li className="font-bold cursor-default">{activeAppName}</li>
    <li onClick={() => openWindow("finder")}>Projects</li>
    <li onClick={() => openWindow("contact")}>Contact</li>
    <li onClick={() => openWindow("resume")}>Resume</li>
  </ul>
);

export default NavbarAppMenu;
