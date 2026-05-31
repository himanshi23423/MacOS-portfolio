import windowWrapper from "@hoc/windowWrapper";
import useNotes from "./useNotes";
import NotesSection from "../section/NotesSection";

const Notes = () => {
  const allProps = useNotes();
  return <NotesSection {...allProps} />;
};

const NotesWindow = windowWrapper(Notes, "notes");
export default NotesWindow;
