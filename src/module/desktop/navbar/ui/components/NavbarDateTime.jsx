const NavbarDateTime = ({ now }) => (
  <time className="nav-datetime">
    <span className="nav-date-day">{now.format("ddd")}</span>
    <span className="nav-date-month">{now.format("MMM")}</span>
    <span className="nav-date-date">{now.format("D")}</span>
    <span className="nav-date-time">{now.format("h:mm")}</span>
    <span className="nav-date-ampm">{now.format("A")}</span>
  </time>
);

export default NavbarDateTime;
