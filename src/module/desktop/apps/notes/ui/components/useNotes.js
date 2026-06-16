import { useState, useEffect } from "react";

const defaultFolders = [
  { id: "all", name: "All Notes" },
  { id: "notes", name: "Notes" },
  { id: "quick", name: "Quick Notes" },
];

const defaultNotes = [
  {
    id: "1",
    folderId: "notes",
    title: "Welcome to Notes",
    preview:
      "This is a macOS-style Notes application integrated into this interactive desktop portfolio.",
    body: "<div><strong>Welcome to Notes</strong></div><div><br></div><div>This is a macOS-style Notes application integrated into this interactive desktop portfolio.</div><div><br></div><div><strong>Features:</strong></div><ul><li>Add new notes using the compose button</li><li>Delete notes when they are no longer needed</li><li>Real-time search to quickly find what you're looking for</li><li>Automated persistence so your thoughts are saved locally!</li></ul>",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    folderId: "quick",
    title: "Idea Log",
    preview: "Build a fully functioning macOS desktop experience using React & Tailwind (Done!)",
    body: "<div><strong>Idea Log</strong></div><div><br></div><ul><li>Build a fully functioning macOS desktop experience using React &amp; Tailwind (Done!)</li><li>Add interactive apps like Notes, Safari, Calculator, Photos, and Terminal</li><li>Design a gorgeous Control Center and mobile responsive iOS shell</li></ul>",
    updatedAt: new Date().toISOString(),
  },
];

export default function useNotes() {
  const [folders, setFolders] = useState(() => {
    const saved = localStorage.getItem("macos_portfolio_note_folders");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return defaultFolders;
  });

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

  const [activeFolderId, setActiveFolderId] = useState("all");
  const [activeNoteId, setActiveNoteId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("macos_portfolio_note_folders", JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    localStorage.setItem("macos_portfolio_notes", JSON.stringify(notes));
  }, [notes]);

  const stripHtml = (html) => {
    if (!html) return "";
    const clean = html
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    // Decode common entities
    return clean
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ");
  };

  const parseNoteTitleAndBody = (html) => {
    if (!html) return { title: "New Note", preview: "No additional text" };

    // Replace common block tags with newlines to split correctly
    let text = html
      .replace(/<\/div>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/li>/gi, "\n")
      .replace(/<[^>]*>/g, ""); // Strip all tags

    // Decode entities
    text = text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ");

    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    const title = lines[0] || "New Note";
    const preview = lines.slice(1).join(" ").trim() || "No additional text";
    return { title, preview };
  };

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
            const { title, preview } = parseNoteTitleAndBody(value);
            updated.title = title;
            updated.preview = preview;
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
      folderId: activeFolderId === "all" ? "notes" : activeFolderId,
      title: "New Note",
      preview: "Start writing...",
      body: "<div><strong>New Note</strong></div><div>Start writing...</div>",
      updatedAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
  };

  const handleDeleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    if (activeNoteId === id) {
      const remainingFiltered = newNotes.filter(
        (n) => activeFolderId === "all" || n.folderId === activeFolderId,
      );
      setActiveNoteId(remainingFiltered[0]?.id || "");
    }
  };

  const handleCreateFolder = (name) => {
    if (!name.trim()) return;
    const newFolder = {
      id: Date.now().toString(),
      name: name.trim(),
    };
    setFolders((prev) => [...prev, newFolder]);
    setActiveFolderId(newFolder.id);
  };

  const handleDeleteFolder = (folderId) => {
    if (folderId === "all" || folderId === "notes" || folderId === "quick") return;
    setFolders((prev) => prev.filter((f) => f.id !== folderId));
    // Move notes in deleted folder to general "notes"
    setNotes((prev) =>
      prev.map((n) => (n.folderId === folderId ? { ...n, folderId: "notes" } : n)),
    );
    setActiveFolderId("all");
  };

  const getFilteredNotes = () => {
    let result = notes;
    if (activeFolderId !== "all") {
      result = notes.filter((n) => n.folderId === activeFolderId);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          stripHtml(note.body).toLowerCase().includes(query),
      );
    }
    return result;
  };

  const filteredNotes = getFilteredNotes();

  const formatDate = (isoStr) => {
    const date = new Date(isoStr);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  // Get counts for sidebar folder listing
  const getFolderCount = (folderId) => {
    if (folderId === "all") return notes.length;
    return notes.filter((n) => n.folderId === folderId).length;
  };

  return {
    notes,
    folders,
    activeFolderId,
    activeNote,
    activeNoteId,
    searchQuery,
    isSidebarOpen,
    setActiveFolderId,
    setActiveNoteId,
    setSearchQuery,
    setIsSidebarOpen,
    handleUpdateNote,
    handleCreateNote,
    handleDeleteNote,
    handleCreateFolder,
    handleDeleteFolder,
    filteredNotes,
    formatDate,
    getFolderCount,
    stripHtml,
  };
}
