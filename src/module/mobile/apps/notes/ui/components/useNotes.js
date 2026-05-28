import { useState, useEffect } from "react";

const defaultNotes = [
  {
    id: "1",
    title: "Welcome to Notes",
    body: "Welcome to Notes\n\nThis is a macOS-style Notes application integrated into this interactive desktop portfolio.\n\nFeatures:\n• Add new notes using the compose button\n• Delete notes when they are no longer needed\n• Real-time search to quickly find what you're looking for\n• Automated persistence so your thoughts are saved locally!",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Idea Log",
    body: "Idea Log\n\n- Build a fully functioning macOS desktop experience using React & Tailwind (Done!)\n- Add interactive apps like Notes, Safari, Calculator, Photos, and Terminal\n- Design a gorgeous Control Center and mobile responsive iOS shell",
    updatedAt: new Date().toISOString(),
  },
];

export default function useNotes() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("macos_portfolio_notes");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return defaultNotes;
  });

  const [activeNoteId, setActiveNoteId] = useState(notes[0]?.id || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem("macos_portfolio_notes", JSON.stringify(notes));
  }, [notes]);

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  const handleUpdateNote = (field, value) => {
    if (!activeNote) return;

    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === activeNote.id) {
          const updated = {
            ...note,
            [field]: value,
            updatedAt: new Date().toISOString(),
          };
          if (field === "body") {
            const firstLine = value.trim().split("\n")[0];
            updated.title = firstLine || "New Note";
          }
          return updated;
        }
        return note;
      });
    });
  };

  const handleCreateNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: "New Note",
      body: "New Note",
      updatedAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
  };

  const handleDeleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    if (activeNoteId === id) {
      setActiveNoteId(newNotes[0]?.id || "");
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (isoStr) => {
    const date = new Date(isoStr);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return {
    notes,
    activeNote,
    activeNoteId,
    searchQuery,
    isSidebarOpen,
    setActiveNoteId,
    setSearchQuery,
    setIsSidebarOpen,
    handleUpdateNote,
    handleCreateNote,
    handleDeleteNote,
    filteredNotes,
    formatDate,
  };
}
