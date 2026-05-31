import { navIcons } from "@constants/index";
import NavbarBatteryMenu from "../components/NavbarBatteryMenu";
import NavbarDateTime from "../components/NavbarDateTime";
import NavbarControlCenter from "../components/NavbarControlCenter";

const NavbarControlCenterSection = ({
  now,
  battery,
  music,
  settings,
  isControlOpen,
  controlCenterRef,
  toggleSetting,
  updateSlider,
  setMusicState,
  openWindow,
}) => {
  const visibleIcons = [];

  // Add Bluetooth if enabled in settings
  if (settings.bluetooth) {
    visibleIcons.push({ id: "bluetooth", img: "/icons/bluetooth.svg" });
  }

  // Add other icons, filtering out WiFi if it is disabled
  navIcons.forEach((icon) => {
    if (icon.img.includes("wifi")) {
      if (settings.wifi) {
        visibleIcons.push(icon);
      }
    } else {
      visibleIcons.push(icon);
    }
  });

  return (
    <>
      <ul className="status-icons">
        {visibleIcons.map(({ id, img }) => (
          <li key={id}>
            <img
              src={img}
              className={`icon-hover ${id === "bluetooth" ? "scale-[1.55] mx-1" : ""}`}
              alt={`icon-${id}`}
            />
          </li>
        ))}
        <li>
          <NavbarBatteryMenu battery={battery} />
        </li>
      </ul>
      <NavbarDateTime now={now} />
      <NavbarControlCenter
        isControlOpen={isControlOpen}
        settings={settings}
        music={music}
        controlCenterRef={controlCenterRef}
        toggleSetting={toggleSetting}
        updateSlider={updateSlider}
        setMusicState={setMusicState}
        openWindow={openWindow}
      />
    </>
  );
};

export default NavbarControlCenterSection;
