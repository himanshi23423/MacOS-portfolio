import React, { useState, useEffect } from "react";
import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/windowWrapper";
import useWindowsStore from "#store/window";
import { 
  Plus, Calendar as CalendarIcon, ChevronLeft, ChevronRight, 
  Trash2, X, Clock, MapPin, Tag, AlignLeft, Info 
} from "lucide-react";

// Standard categories and their colors
const CATEGORIES = [
  { id: "personal", label: "Personal", color: "bg-blue-500", border: "border-blue-500", text: "text-blue-600", dot: "🔴" },
  { id: "work", label: "Work", color: "bg-green-500", border: "border-green-500", text: "text-green-600", dot: "🟢" },
  { id: "birthdays", label: "Birthdays", color: "bg-amber-500", border: "border-amber-500", text: "text-amber-600", dot: "🟡" },
  { id: "holidays", label: "Holidays", color: "bg-purple-500", border: "border-purple-500", text: "text-purple-600", dot: "🟣" },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 26)); // Starting at May 26, 2026
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 4, 26));
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Active Month & Year
  const [month, setMonth] = useState(currentDate.getMonth()); // 0-11
  const [year, setYear] = useState(currentDate.getFullYear());

  // Filter Categories
  const [activeCategories, setActiveCategories] = useState({
    personal: true,
    work: true,
    birthdays: true,
    holidays: true,
  });

  // Modal / Scheduler state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("2026-05-26");
  const [eventStart, setEventStart] = useState("09:00");
  const [eventEnd, setEventEnd] = useState("10:00");
  const [eventCategory, setEventCategory] = useState("personal");
  const [eventDesc, setEventDesc] = useState("");

  // Detailed view of events popover
  const [dayEventsPopover, setDayEventsPopover] = useState(null); // { date: Date, events: Array }

  // Load/Save Events
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("macos_portfolio_calendar_events");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Preloaded events for May 2026
    return [
      {
        id: "1",
        title: "Kuldeep's Birthday 🎂",
        date: "2026-05-26",
        start: "00:00",
        end: "23:59",
        category: "birthdays",
        desc: "Celebrate Kuldeep's birthday and review macos portfolio improvements!"
      },
      {
        id: "2",
        title: "Antigravity Code Review 🚀",
        date: "2026-05-26",
        start: "14:00",
        end: "15:30",
        category: "work",
        desc: "Review design elements, dynamic dock, and calendar integration."
      },
      {
        id: "3",
        title: "Lunch with Design Team",
        date: "2026-05-27",
        start: "12:30",
        end: "13:30",
        category: "personal",
        desc: "Discuss visual animations and glassmorphism elements."
      },
      {
        id: "4",
        title: "Project Alpha Release 📦",
        date: "2026-05-29",
        start: "09:00",
        end: "10:30",
        category: "work",
        desc: "Build bundle and perform end-to-end user experience checks."
      },
      {
        id: "5",
        title: "Memorial Day Holiday 🇺🇸",
        date: "2026-05-25",
        start: "00:00",
        end: "23:59",
        category: "holidays",
        desc: "Federal public holiday."
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("macos_portfolio_calendar_events", JSON.stringify(events));
  }, [events]);

  const toggleCategory = (catId) => {
    setActiveCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  // Grid Calculation
  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDayIndex = (y, m) => new Date(y, m, 1).getDay();

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  const handleGoToToday = () => {
    const today = new Date();
    setMonth(today.getMonth());
    setYear(today.getFullYear());
    setSelectedDate(today);
  };

  // Generate Month Grid Data
  const generateGrid = () => {
    const totalDays = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayIndex(year, month);
    
    const prevMonthDaysCount = getDaysInMonth(year, month - 1 < 0 ? 11 : month - 1);
    
    const gridCells = [];

    // Prev Month Trailing Days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = prevMonthDaysCount - i;
      const prevM = month - 1 < 0 ? 11 : month - 1;
      const prevY = month - 1 < 0 ? year - 1 : year;
      gridCells.push({
        dayNumber: d,
        date: new Date(prevY, prevM, d),
        isCurrentMonth: false,
      });
    }

    // Current Month Days
    for (let d = 1; d <= totalDays; d++) {
      gridCells.push({
        dayNumber: d,
        date: new Date(year, month, d),
        isCurrentMonth: true,
      });
    }

    // Next Month Leading Days
    const totalCells = gridCells.length;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let d = 1; d <= remainingCells; d++) {
      const nextM = month + 1 > 11 ? 0 : month + 1;
      const nextY = month + 1 > 11 ? year + 1 : year;
      gridCells.push({
        dayNumber: d,
        date: new Date(nextY, nextM, d),
        isCurrentMonth: false,
      });
    }

    return gridCells;
  };

  const gridCells = generateGrid();

  // Filter events matching active filters
  const getFilteredEvents = () => {
    return events.filter(event => activeCategories[event.category]);
  };

  const filteredEvents = getFilteredEvents();

  // Match events for a specific cell date
  const getEventsForDate = (dateObj) => {
    const dateString = dateObj.toLocaleDateString('en-CA'); // YYYY-MM-DD
    return filteredEvents.filter(event => event.date === dateString);
  };

  // Add event handler
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    const newEvent = {
      id: Date.now().toString(),
      title: eventTitle,
      date: eventDate,
      start: eventStart,
      end: eventEnd,
      category: eventCategory,
      desc: eventDesc,
    };

    setEvents((prev) => [...prev, newEvent]);
    setIsModalOpen(false);

    // Reset Form
    setEventTitle("");
    setEventDesc("");
  };

  const handleDeleteEvent = (eventId) => {
    setEvents((prev) => prev.filter(ev => ev.id !== eventId));
    // Clear popover if active
    if (dayEventsPopover) {
      setDayEventsPopover(prev => ({
        ...prev,
        events: prev.events.filter(ev => ev.id !== eventId)
      }));
    }
  };

  // Open modal pre-filling clicked date
  const triggerAddEventOnDate = (dateObj) => {
    const formattedDate = dateObj.toLocaleDateString('en-CA');
    setEventDate(formattedDate);
    setIsModalOpen(true);
  };

  // Format date readable
  const isToday = (dateObj) => {
    const today = new Date();
    return dateObj.getDate() === today.getDate() &&
           dateObj.getMonth() === today.getMonth() &&
           dateObj.getFullYear() === today.getFullYear();
  };

  const isSelected = (dateObj) => {
    return dateObj.getDate() === selectedDate.getDate() &&
           dateObj.getMonth() === selectedDate.getMonth() &&
           dateObj.getFullYear() === selectedDate.getFullYear();
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl overflow-hidden shadow-2xl border border-black/10 select-none text-gray-800 relative font-sans">
      
      {/* ================= WINDOW HEADER ================= */}
      <div id="window-header" className="window-header shrink-0 flex items-center justify-between !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2.5 z-20">
        <div className="flex items-center gap-4">
          <WindowControls target="calendar" />
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="sm:hidden p-1 rounded hover:bg-gray-200 text-gray-600 transition-colors"
            aria-label="Toggle Sidebar"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform duration-200 ${isSidebarOpen ? "rotate-0" : "rotate-180"}`} />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handlePrevMonth} 
            className="p-1 rounded hover:bg-gray-200/80 active:scale-95 transition-all text-gray-600 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-bold text-gray-700 w-28 text-center leading-none">
            {MONTHS[month]} {year}
          </span>
          <button 
            onClick={handleNextMonth} 
            className="p-1 rounded hover:bg-gray-200/80 active:scale-95 transition-all text-gray-600 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGoToToday}
            className="px-2.5 py-1 bg-white hover:bg-gray-100 border border-gray-300/60 rounded-md text-xs font-semibold shadow-xs cursor-pointer text-gray-700"
          >
            Today
          </button>
          <button 
            onClick={() => {
              setEventDate(selectedDate.toLocaleDateString('en-CA'));
              setIsModalOpen(true);
            }}
            className="p-1 rounded hover:bg-gray-200 text-blue-600 cursor-pointer"
            title="Add Event"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-10 sm:hidden animate-fade-in"
          />
        )}

        {/* Sidebar */}
        <aside className={`
          absolute sm:relative inset-y-0 left-0 w-56 bg-gray-50 border-r border-[#d1d1d1] p-4 flex flex-col z-20 transition-transform duration-300 shrink-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
        `}>
          {/* Calendar Picker Mini Calendar Indicator */}
          <div className="space-y-4 flex-1 overflow-y-auto thin-scrollbar">
            
            {/* Category checkboxes */}
            <div className="space-y-2">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Calendars</h3>
              <nav className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <label 
                    key={cat.id}
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-gray-200/50 cursor-pointer select-none transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs">{cat.dot}</span>
                      <span className="text-xs font-semibold text-gray-700">{cat.label}</span>
                    </div>
                    <input 
                      type="checkbox"
                      checked={activeCategories[cat.id]}
                      onChange={() => toggleCategory(cat.id)}
                      className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </label>
                ))}
              </nav>
            </div>

            {/* Upcoming Events list */}
            <div className="space-y-2.5 pt-4 border-t border-gray-200">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Upcoming Events</h3>
              <div className="space-y-2 divide-y divide-gray-150">
                {filteredEvents.length === 0 ? (
                  <p className="text-[11px] text-gray-400 italic px-1">No upcoming events scheduled.</p>
                ) : (
                  filteredEvents
                    .sort((a, b) => a.date.localeCompare(b.date) || a.start.localeCompare(b.start))
                    .slice(0, 5)
                    .map((ev) => {
                      const cat = CATEGORIES.find(c => c.id === ev.category);
                      const eventDateObj = new Date(ev.date + "T00:00:00");
                      
                      return (
                        <div key={ev.id} className="pt-2 first:pt-0 group relative flex justify-between items-start">
                          <div className="space-y-0.5 min-w-0 pr-6">
                            <h4 className="text-[11px] font-bold text-gray-800 truncate">{ev.title}</h4>
                            <p className="text-[9px] text-gray-400 flex items-center gap-1 font-semibold">
                              <span>{eventDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                              <span>•</span>
                              <span>{ev.start} - {ev.end}</span>
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteEvent(ev.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:bg-red-50 rounded transition-all cursor-pointer absolute right-0 top-0.5"
                            title="Delete event"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })
                )}
              </div>
            </div>

          </div>
        </aside>

        {/* Main Calendar Month Grid */}
        <main className="flex-1 flex flex-col bg-white overflow-hidden h-full min-w-0">
          
          {/* Days short header */}
          <div className="grid grid-cols-7 border-b border-gray-100 py-2 shrink-0 bg-gray-50/50">
            {DAYS_SHORT.map((day) => (
              <div key={day} className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>

          {/* Cells Grid */}
          <div className="flex-1 grid grid-cols-7 grid-rows-5 border-l border-gray-100 bg-gray-100 gap-[1px]">
            {gridCells.map((cell, idx) => {
              const cellEvents = getEventsForDate(cell.date);
              const cellIsToday = isToday(cell.date);
              const cellIsSelected = isSelected(cell.date);

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedDate(cell.date)}
                  onDoubleClick={() => triggerAddEventOnDate(cell.date)}
                  className={`
                    p-1.5 flex flex-col bg-white min-w-0 h-full relative cursor-pointer group hover:bg-gray-50/70 transition-all select-none
                    ${!cell.isCurrentMonth ? "opacity-40" : ""}
                    ${cellIsSelected ? "bg-blue-50/30" : ""}
                  `}
                >
                  {/* Date Header */}
                  <div className="flex items-center justify-between mb-1 shrink-0">
                    <span 
                      className={`
                        w-6 h-6 flex items-center justify-center text-xs font-bold rounded-full
                        ${cellIsToday ? "bg-[#ff3b30] text-white" : "text-gray-800"}
                        ${cellIsSelected && !cellIsToday ? "border border-blue-500 text-blue-600 font-extrabold" : ""}
                      `}
                    >
                      {cell.dayNumber}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerAddEventOnDate(cell.date);
                      }}
                      className="opacity-0 group-hover:opacity-100 text-blue-600 hover:bg-blue-50 rounded p-0.5 transition-opacity duration-150 cursor-pointer hidden md:block"
                      title="Add Event"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Cell Events List */}
                  <div className="flex-1 overflow-y-auto thin-scrollbar space-y-1 mt-0.5">
                    {/* Desktop View event items */}
                    <div className="hidden md:block space-y-0.5">
                      {cellEvents.map((ev) => {
                        const cat = CATEGORIES.find(c => c.id === ev.category);
                        return (
                          <div
                            key={ev.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDate(cell.date);
                              setDayEventsPopover({ date: cell.date, events: cellEvents });
                            }}
                            className={`
                              px-1.5 py-0.5 text-[9px] font-bold rounded truncate border-l-2 leading-tight flex items-center gap-1
                              ${cat?.color ? `${cat.color}/10 ${cat.text} ${cat.border}` : "bg-gray-100 text-gray-700 border-gray-300"}
                            `}
                            title={`${ev.title} (${ev.start} - ${ev.end})`}
                          >
                            <span className="truncate">{ev.title}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Mobile View dot indicators */}
                    <div className="flex md:hidden flex-wrap gap-0.5 justify-center mt-1">
                      {cellEvents.map((ev) => {
                        const cat = CATEGORIES.find(c => c.id === ev.category);
                        return (
                          <span 
                            key={ev.id} 
                            className={`w-1.5 h-1.5 rounded-full ${cat?.color || "bg-gray-400"}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </main>
      </div>

      {/* ================= MODAL: ADD EVENT ================= */}
      {isModalOpen && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form 
            onSubmit={handleAddEvent}
            className="w-full max-w-[380px] bg-white rounded-2xl shadow-2xl border border-black/10 flex flex-col overflow-hidden animate-fade-in"
          >
            {/* Modal Header */}
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4 text-blue-500" />
                New Event
              </h3>
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded p-0.5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 space-y-3 flex-1 overflow-y-auto text-xs">
              {/* Event Title */}
              <div className="space-y-1">
                <label className="font-bold text-gray-500">Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Google Interview"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-gray-800 placeholder-gray-400"
                />
              </div>

              {/* Event Date */}
              <div className="space-y-1">
                <label className="font-bold text-gray-500">Date</label>
                <input
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 font-medium"
                />
              </div>

              {/* Event Times */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-gray-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" /> Start Time
                  </label>
                  <input
                    type="time"
                    required
                    value={eventStart}
                    onChange={(e) => setEventStart(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-gray-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" /> End Time
                  </label>
                  <input
                    type="time"
                    required
                    value={eventEnd}
                    onChange={(e) => setEventEnd(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800"
                  />
                </div>
              </div>

              {/* Event Category */}
              <div className="space-y-1">
                <label className="font-bold text-gray-500 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-gray-400" /> Category
                </label>
                <select
                  value={eventCategory}
                  onChange={(e) => setEventCategory(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 font-medium"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {/* Event Description */}
              <div className="space-y-1">
                <label className="font-bold text-gray-500 flex items-center gap-1">
                  <AlignLeft className="w-3.5 h-3.5 text-gray-400" /> Description
                </label>
                <textarea
                  placeholder="Event details..."
                  rows={3}
                  value={eventDesc}
                  onChange={(e) => setEventDesc(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 font-medium placeholder-gray-400 resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 border-t border-gray-150 px-4 py-3 flex justify-end gap-2">
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-3.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition-all active:scale-95 shadow-md cursor-pointer"
              >
                Save Event
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= POPOVER: SELECTED DAY EVENTS ================= */}
      {dayEventsPopover && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px] z-40 flex items-center justify-center p-4">
          <div className="w-full max-w-[340px] bg-white rounded-2xl shadow-2xl border border-black/10 p-5 flex flex-col gap-4 animate-fade-in relative">
            <button 
              onClick={() => setDayEventsPopover(null)}
              className="absolute top-3.5 right-3.5 text-gray-400 hover:text-gray-600 rounded p-0.5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-500" />
                Schedule for {dayEventsPopover.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </h3>
            </div>

            <div className="max-h-[220px] overflow-y-auto thin-scrollbar space-y-2.5 divide-y divide-gray-100">
              {dayEventsPopover.events.length === 0 ? (
                <p className="text-xs text-gray-400 italic py-2">No events scheduled on this day.</p>
              ) : (
                dayEventsPopover.events.map((ev) => {
                  const cat = CATEGORIES.find(c => c.id === ev.category);
                  return (
                    <div key={ev.id} className="pt-2.5 first:pt-0 flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat ? cat.color.replace('bg-', '') : '#ccc' }} />
                          <h4 className="text-xs font-bold text-gray-800 truncate">{ev.title}</h4>
                        </div>
                        <p className="text-[10px] text-gray-400 font-semibold pl-4">
                          {ev.start} - {ev.end} ({cat?.label})
                        </p>
                        {ev.desc && (
                          <p className="text-[10px] text-gray-500 pl-4 leading-normal font-medium">{ev.desc}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(ev.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors shrink-0 cursor-pointer self-start"
                        title="Delete event"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            <button
              onClick={() => {
                triggerAddEventOnDate(dayEventsPopover.date);
                setDayEventsPopover(null);
              }}
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all active:scale-98 shadow-md"
            >
              Add New Event
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

const CalendarWindow = windowWrapper(Calendar, "calendar");
export default CalendarWindow;
