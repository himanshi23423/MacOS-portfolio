import { SafariDesktopToolbar } from "../components/SafariToolbar";

const SafariToolbarSection = ({ showSidebar, onToggleSidebar }) => {
  return <SafariDesktopToolbar showSidebar={showSidebar} onToggleSidebar={onToggleSidebar} />;
};

export default SafariToolbarSection;
