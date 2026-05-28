const NavbarBatteryMenu = ({ battery }) => (
  <div className="battery-indicator" title="Battery status">
    <span className="battery-text">
      {battery.supported && battery.level !== null
        ? `${battery.level}%`
        : "--"}
    </span>
    <div className="battery-icon-shell">
      <div
        className="battery-level"
        style={{
          width: `${battery.supported && battery.level !== null ? battery.level : 0}%`,
        }}
      />
      <i />
    </div>
    {battery.charging && (
      <img
        src="/icons/battery-charging.svg"
        alt="Charging"
        aria-hidden="true"
        className="w-[14px]"
      />
    )}
  </div>
);

export default NavbarBatteryMenu;
