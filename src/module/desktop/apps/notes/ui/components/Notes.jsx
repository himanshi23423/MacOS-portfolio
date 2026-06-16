import React, { useState, useEffect } from "react";
import windowWrapper from "@hoc/windowWrapper";
import useWindowsStore from "@store/window";
import useNotes from "../../hooks/useNotes";
import NotesSection from "../section/NotesSection";
import NotesAboutModal from "./NotesAboutModal";

const Notes = () => {
  const { windows, setWindowData } = useWindowsStore();
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    if (windows.notes?.data?.openAbout) {
      setShowAbout(true);
      setWindowData("notes", { ...windows.notes.data, openAbout: false });
    }
  }, [windows.notes?.data?.openAbout, windows.notes?.data, setWindowData]);

  const allProps = useNotes();

  return (
    <>
      <NotesSection {...allProps} />
      <NotesAboutModal show={showAbout} onClose={() => setShowAbout(false)} />
    </>
  );
};

const NotesWindow = windowWrapper(Notes, "notes");
export default NotesWindow;
