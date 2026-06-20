import CalendarSidebar from "../components/CalendarSidebar";

const CalendarSidePanelSection = ({
  activeCategories,
  toggleCategory,
  filteredEvents,
  handleDeleteEvent,
  isSidebarOpen,
  setIsSidebarOpen,
  isNarrow,
}) => (
  <CalendarSidebar
    activeCategories={activeCategories}
    toggleCategory={toggleCategory}
    filteredEvents={filteredEvents}
    handleDeleteEvent={handleDeleteEvent}
    isSidebarOpen={isSidebarOpen}
    setIsSidebarOpen={setIsSidebarOpen}
    isNarrow={isNarrow}
  />
);

export default CalendarSidePanelSection;
