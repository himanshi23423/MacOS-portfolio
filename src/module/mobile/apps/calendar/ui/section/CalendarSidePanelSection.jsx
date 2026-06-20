import CalendarSidebar from "../components/CalendarSidebar";

const CalendarSidePanelSection = ({
  activeCategories,
  toggleCategory,
  filteredEvents,
  handleDeleteEvent,
  isSidebarOpen,
  setIsSidebarOpen,
}) => (
  <CalendarSidebar
    activeCategories={activeCategories}
    toggleCategory={toggleCategory}
    filteredEvents={filteredEvents}
    handleDeleteEvent={handleDeleteEvent}
    isSidebarOpen={isSidebarOpen}
    setIsSidebarOpen={setIsSidebarOpen}
  />
);

export default CalendarSidePanelSection;
