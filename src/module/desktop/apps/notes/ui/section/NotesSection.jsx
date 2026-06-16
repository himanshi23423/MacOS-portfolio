import React, { useState, useEffect, useRef } from "react";
import WindowControls from "@components/WindowControls";
import { Plus, PanelLeft } from "lucide-react";
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
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(800);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const isLowWidth = containerWidth < 520;
  const sidebarRef = useRef(null);
  const toggleBtnRef = useRef(null);

  useEffect(() => {
    if (isLowWidth) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isLowWidth, setIsSidebarOpen]);

  useEffect(() => {
    if (!isLowWidth || !isSidebarOpen) return;

    const handleClickOutside = (event) => {
      if (
        sidebarRef.current?.contains(event.target) ||
        toggleBtnRef.current?.contains(event.target)
      ) {
        return;
      }
      setIsSidebarOpen(false);
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [isLowWidth, isSidebarOpen, setIsSidebarOpen]);

  const wordCount = activeNote?.body
    ? stripHtml(activeNote.body).trim().split(/\s+/).filter(Boolean).length
    : 0;

  const handleSelectNote = (id) => {
    setActiveNoteId(id);
    if (isLowWidth) {
      setIsSidebarOpen(false);
    }
  };

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full w-full bg-white rounded-xl overflow-hidden shadow-2xl border border-black/10 select-none text-gray-800"
    >
      <div
        id="window-header"
        className="shrink-0 flex items-center justify-between !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2"
      >
        <div className="flex items-center gap-4">
          <WindowControls target="notes" />
          {isLowWidth && (
            <button
              ref={toggleBtnRef}
              onClick={handleToggleSidebar}
              className="p-1 rounded hover:bg-zinc-200 transition-colors ml-1 cursor-pointer text-gray-700"
              aria-label="Toggle Sidebar"
            >
              <PanelLeft className="w-4 h-4" />
            </button>
          )}
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
          sidebarRef={sidebarRef}
          folders={folders}
          activeFolderId={activeFolderId}
          onSelectFolder={setActiveFolderId}
          notes={filteredNotes}
          activeNoteId={activeNoteId}
          onSelectNote={handleSelectNote}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isSidebarOpen={isSidebarOpen}
          isLowWidth={isLowWidth}
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
          isLowWidth={isLowWidth}
        />
      </div>
    </div>
  );
};

export default NotesSection;
