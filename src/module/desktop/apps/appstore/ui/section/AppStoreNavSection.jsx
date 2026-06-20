import AppStoreNav from "../components/AppStoreNav";

const AppStoreNavSection = ({ isSidebarOpen, onToggleSidebar, isNarrow }) => (
  <AppStoreNav
    isSidebarOpen={isSidebarOpen}
    onToggleSidebar={onToggleSidebar}
    isNarrow={isNarrow}
  />
);

export default AppStoreNavSection;
