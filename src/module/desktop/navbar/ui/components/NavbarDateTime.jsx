const NavbarDateTime = ({ now }) => (
  <time>{now.format("ddd MMM D h:mm A")}</time>
);

export default NavbarDateTime;
