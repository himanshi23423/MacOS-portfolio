import React, { useState, useEffect } from "react";
import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/windowWrapper";
import useWindowsStore from "#store/window";
import { Trash2, Plus, Search, ChevronLeft, FileText } from "lucide-react";

const Notes = () => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("macos_portfolio_notes");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
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
      }
    ];
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

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl overflow-hidden shadow-2xl border border-black/10 select-none text-gray-800">
      {/* Header / Title Bar */}
      <div id="window-header" className="shrink-0 flex items-center justify-between !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2">
        <div className="flex items-center gap-4">
          <WindowControls target="notes" />
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-1 rounded hover:bg-gray-200"
            aria-label="Toggle Sidebar"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform ${isSidebarOpen ? "rotate-0" : "rotate-180"}`} />
          </button>
        </div>
        
        {/* Toolbar */}
        <div className="flex items-center gap-3 md:gap-5">
          <button 
            onClick={handleCreateNote}
            className="p-1.5 rounded hover:bg-gray-200 active:scale-95 transition-all text-blue-500"
            title="New Note"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button 
            onClick={() => activeNote && handleDeleteNote(activeNote.id)}
            disabled={!activeNote}
            className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-30 disabled:pointer-events-none text-red-500"
            title="Delete Note"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Sidebar */}
        <div className={`
          absolute md:relative inset-y-0 left-0 w-64 md:w-60 lg:w-64 bg-gray-50 border-r border-[#d1d1d1] flex flex-col z-20 transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
          {/* Search */}
          <div className="p-2.5">
            <div className="relative flex items-center bg-gray-200/60 rounded-md px-2 py-1.5">
              <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm focus:outline-none border-none outline-none text-gray-800"
              />
            </div>
          </div>

          {/* Notes List */}
          <div className="flex-1 overflow-y-auto min-h-0 divide-y divide-gray-200">
            {filteredNotes.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-400">
                No Notes
              </div>
            ) : (
              filteredNotes.map((note) => {
                const isSelected = activeNote?.id === note.id;
                const lines = note.body.split("\n");
                const preview = lines.slice(1).join(" ").trim() || "No additional text";
                
                return (
                  <div
                    key={note.id}
                    onClick={() => {
                      setActiveNoteId(note.id);
                      if (window.innerWidth < 768) {
                        setIsSidebarOpen(false);
                      }
                    }}
                    className={`p-3.5 cursor-pointer select-none transition-colors ${
                      isSelected 
                        ? "bg-blue-100 text-blue-700 border-l-4 border-blue-500" 
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <h4 className="font-semibold text-sm truncate text-gray-900">{note.title}</h4>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span className="shrink-0 font-medium text-blue-600">{formatDate(note.updatedAt)}</span>
                      <span className="truncate text-gray-500">{preview}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col bg-white p-5 md:p-6 overflow-y-auto">
          {activeNote ? (
            <textarea
              value={activeNote.body}
              onChange={(e) => handleUpdateNote("body", e.target.value)}
              placeholder="Start writing..."
              className="flex-1 w-full bg-transparent text-base resize-none border-none outline-none focus:ring-0 focus:outline-none font-sans leading-relaxed text-gray-800"
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <FileText className="w-12 h-12 stroke-1 mb-2 opacity-50" />
              <p className="text-sm">No Note Selected</p>
              <button 
                onClick={handleCreateNote} 
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold active:scale-95 transition-all shadow-md"
              >
                Create a Note
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NotesWindow = windowWrapper(Notes, "notes");
export default NotesWindow;
