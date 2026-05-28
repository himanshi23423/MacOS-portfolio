import { navIcons } from "#constants/index";
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
}) => (
  <>
    <ul className="status-icons">
      {navIcons.map(({ id, img }) => (
        <li key={id}>
          <img src={img} className="icon-hover" alt={`icon-${id}`} />
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

export default NavbarControlCenterSection;
