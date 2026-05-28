import AppStoreSidebar from "../components/AppStoreSidebar";

const AppStoreSidebarSection = ({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  isSidebarOpen,
  onCloseSidebar,
}) => (
  <>
    {isSidebarOpen && (
      <div
        onClick={onCloseSidebar}
        className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-20 sm:hidden"
      />
    )}
    <div
      className={`absolute sm:relative inset-y-0 left-0 z-30 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
    >
      <AppStoreSidebar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        activeTab={activeTab}
        onTabChange={onTabChange}
        onClose={onCloseSidebar}
      />
    </div>
  </>
);

export default AppStoreSidebarSection;
