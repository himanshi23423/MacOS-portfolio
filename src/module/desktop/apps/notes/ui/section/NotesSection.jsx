import { useState } from "react";
import WindowControls from "#components/WindowControls";
import { Plus, ChevronLeft } from "lucide-react";
import NotesSidebarSection from "./NotesSidebarSection";
import NotesEditorSection from "./NotesEditorSection";

const NotesSection = ({
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
  handleCreateFolder,
  handleDeleteFolder,
  folders,
  activeFolderId,
  setActiveFolderId,
  filteredNotes,
  formatDate,
  getFolderCount,
  stripHtml,
}) => {
  const wordCount = activeNote?.body
    ? stripHtml(activeNote.body).trim().split(/\s+/).filter(Boolean).length
    : 0;

  const handleSelectNote = (id) => {
    setActiveNoteId(id);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl overflow-hidden shadow-2xl border border-black/10 select-none text-gray-800">
      <div id="window-header" className="shrink-0 flex items-center justify-between !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2">
        <div className="flex items-center gap-4">
          <WindowControls target="notes" />
          <button
            onClick={handleToggleSidebar}
            className="md:hidden p-1 rounded hover:bg-gray-200"
            aria-label="Toggle Sidebar"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform ${isSidebarOpen ? "rotate-0" : "rotate-180"}`} />
          </button>
        </div>
        <div className="flex items-center gap-3 md:gap-5">
          <button
            onClick={handleCreateNote}
            className="p-1.5 rounded hover:bg-gray-200 active:scale-95 transition-all text-[#e4a52e] hover:text-[#d89216]"
            title="New Note"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex min-h-0 relative">
        <NotesSidebarSection
          folders={folders}
          activeFolderId={activeFolderId}
          onSelectFolder={setActiveFolderId}
          notes={filteredNotes}
          activeNoteId={activeNoteId}
          onSelectNote={handleSelectNote}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={handleToggleSidebar}
          formatDate={formatDate}
          getFolderCount={getFolderCount}
          handleCreateFolder={handleCreateFolder}
          handleDeleteFolder={handleDeleteFolder}
          stripHtml={stripHtml}
        />
        <NotesEditorSection
          activeNote={activeNote}
          onUpdateNote={handleUpdateNote}
          onDeleteNote={handleDeleteNote}
          wordCount={wordCount}
          onCreateNote={handleCreateNote}
        />
      </div>
    </div>
  );
};

export default NotesSection;
