import CalendarGrid from "../components/CalendarGrid";

const CalendarGridSection = ({
  gridCells,
  getEventsForDate,
  isToday,
  isSelected,
  selectedDate,
  setSelectedDate,
  triggerAddEventOnDate,
  setDayEventsPopover,
}) => (
  <CalendarGrid
    gridCells={gridCells}
    getEventsForDate={getEventsForDate}
    isToday={isToday}
    isSelected={isSelected}
    selectedDate={selectedDate}
    setSelectedDate={setSelectedDate}
    triggerAddEventOnDate={triggerAddEventOnDate}
    setDayEventsPopover={setDayEventsPopover}
  />
);

export default CalendarGridSection;
