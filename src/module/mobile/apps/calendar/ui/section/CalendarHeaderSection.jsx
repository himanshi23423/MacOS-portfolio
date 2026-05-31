import WindowControls from "@components/WindowControls";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { MONTHS } from "../components/calendarData";

const CalendarHeaderSection = ({
  month,
  year,
  onPrevMonth,
  onNextMonth,
  onToday,
  onAddEvent,
  isSidebarOpen,
  onToggleSidebar,
}) => (
  <div
    id="window-header"
    className="window-header shrink-0 flex items-center justify-between !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2.5 z-20"
  >
    <div className="flex items-center gap-4">
      <WindowControls target="calendar" />
      <button
        onClick={onToggleSidebar}
        className="sm:hidden p-1 rounded hover:bg-gray-200 text-gray-600 transition-colors"
        aria-label="Toggle Sidebar"
      >
        <ChevronLeft
          className={`w-5 h-5 transition-transform duration-200 ${isSidebarOpen ? "rotate-0" : "rotate-180"}`}
        />
      </button>
    </div>

    <div className="flex items-center gap-2">
      <button
        onClick={onPrevMonth}
        className="p-1 rounded hover:bg-gray-200/80 active:scale-95 transition-all text-gray-600 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <span className="text-sm font-bold text-gray-700 w-28 text-center leading-none">
        {MONTHS[month]} {year}
      </span>
      <button
        onClick={onNextMonth}
        className="p-1 rounded hover:bg-gray-200/80 active:scale-95 transition-all text-gray-600 cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>

    <div className="flex items-center gap-2">
      <button
        onClick={onToday}
        className="px-2.5 py-1 bg-white hover:bg-gray-100 border border-gray-300/60 rounded-md text-xs font-semibold shadow-xs cursor-pointer text-gray-700"
      >
        Today
      </button>
      <button
        onClick={onAddEvent}
        className="p-1 rounded hover:bg-gray-200 text-blue-600 cursor-pointer"
        title="Add Event"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  </div>
);

export default CalendarHeaderSection;
