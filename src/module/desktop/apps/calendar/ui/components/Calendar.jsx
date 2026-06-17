import React, { useState, useEffect } from "react";
import windowWrapper from "@hoc/windowWrapper";
import useWindowsStore from "@store/window";
import useCalendar from "../../hooks/useCalendar";
import CalendarSection from "../section/CalendarSection";
import CalendarAboutModal from "./CalendarAboutModal";

const Calendar = () => {
  const { windows, setWindowData } = useWindowsStore();
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    if (windows.calendar?.data?.openAbout) {
      setShowAbout(true);
      setWindowData("calendar", { ...windows.calendar.data, openAbout: false });
    }
  }, [windows.calendar?.data?.openAbout, windows.calendar?.data, setWindowData]);

  const allProps = useCalendar();
  return (
    <>
      <CalendarSection {...allProps} />
      <CalendarAboutModal show={showAbout} onClose={() => setShowAbout(false)} />
    </>
  );
};

const CalendarWindow = windowWrapper(Calendar, "calendar");
export default CalendarWindow;
