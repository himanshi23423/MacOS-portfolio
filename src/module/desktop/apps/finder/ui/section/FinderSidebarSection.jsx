import FinderSidebar from "../components/FinderSidebar";

const FinderSidebarSection = ({ activeLocation, setActiveLocation, isSidebarOpen, isNarrow }) => (
  <FinderSidebar
    activeLocation={activeLocation}
    setActiveLocation={setActiveLocation}
    isSidebarOpen={isSidebarOpen}
    isNarrow={isNarrow}
  />
);

export default FinderSidebarSection;
