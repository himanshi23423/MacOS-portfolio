import WindowControls from "@components/WindowControls";
import { Plus, ChevronLeft, ChevronRight, PanelLeft } from "lucide-react";
import { MONTHS } from "../../data/calendarData";

const CalendarHeaderSection = ({
  month,
  year,
  onPrevMonth,
  onNextMonth,
  onToday,
  onAddEvent,
  isSidebarOpen,
  onToggleSidebar,
  isNarrow,
  isVeryNarrow,
}) => (
  <div
    id="window-header"
    className={`window-header shrink-0 flex items-center justify-between !bg-gray-50 !border-b-[#d1d1d1] z-20 transition-all ${
      isNarrow ? "!px-2 !py-2" : "!px-4 !py-2.5"
    }`}
  >
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5">
        <WindowControls target="calendar" />
        {isNarrow && (
          <button
            onClick={onToggleSidebar}
            className="p-1 rounded hover:bg-gray-200 text-gray-600 transition-all cursor-pointer"
            title="Toggle Sidebar"
          >
            <PanelLeft className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>

    <div className="flex items-center gap-1">
      <button
        onClick={onPrevMonth}
        className="p-0.5 rounded hover:bg-gray-200/80 active:scale-95 transition-all text-gray-600 cursor-pointer"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>
      <span
        className={`font-bold text-gray-700 text-center leading-none ${isNarrow ? "text-xs w-20" : "text-sm w-28"}`}
      >
        {MONTHS[month]} {year}
      </span>
      <button
        onClick={onNextMonth}
        className="p-0.5 rounded hover:bg-gray-200/80 active:scale-95 transition-all text-gray-600 cursor-pointer"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>

    <div className="flex items-center gap-1.5">
      <button
        onClick={onToday}
        className={`bg-white hover:bg-gray-100 border border-gray-300/60 rounded text-center font-semibold shadow-xs cursor-pointer text-gray-700 transition-all ${
          isNarrow ? "px-1.5 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"
        }`}
      >
        Today
      </button>
      <button
        onClick={onAddEvent}
        className="p-1 rounded hover:bg-gray-200 text-blue-600 cursor-pointer flex items-center justify-center"
        title="Add Event"
      >
        <Plus className={isNarrow ? "w-4 h-4" : "w-5 h-5"} />
      </button>
    </div>
  </div>
);

export default CalendarHeaderSection;
