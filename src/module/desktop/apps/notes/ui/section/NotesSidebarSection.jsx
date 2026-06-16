import React, { useState } from "react";
import { Folder, Search, FolderPlus, Trash2 } from "lucide-react";

const NotesSidebarSection = ({
  sidebarRef,
  folders,
  activeFolderId,
  onSelectFolder,
  notes,
  activeNoteId,
  onSelectNote,
  searchQuery,
  onSearchChange,
  isSidebarOpen,
  isLowWidth,
  onToggleSidebar,
  formatDate,
  getFolderCount,
  handleCreateFolder,
  handleDeleteFolder,
  _stripHtml,
}) => {
  const [newFolderName, setNewFolderName] = useState("");
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  const onSubmitFolder = (e) => {
    e.preventDefault();
    if (newFolderName.trim()) {
      handleCreateFolder(newFolderName);
      setNewFolderName("");
      setIsAddingFolder(false);
    }
  };

  return (
    <div
      ref={sidebarRef}
      className={`bg-[#f4f3ef] border-r border-[#d1d1d1] flex flex-col z-20 transition-transform duration-300 ${
        isLowWidth
          ? `absolute inset-y-0 left-0 w-64 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`
          : "relative translate-x-0 w-60 lg:w-64"
      }`}
    >
      {/* Mobile Header Toggle */}
      {isLowWidth && (
        <div className="flex items-center justify-between px-3 pt-3 pb-1 border-b border-gray-200">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Folders
          </span>
        </div>
      )}

      {/* Folders List */}
      <div className="px-2.5 pt-2.5 pb-0 flex-1 overflow-y-auto min-h-0 flex flex-col">
        <div className="flex items-center justify-between px-2.5 py-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Folders
          </span>
          <button
            onClick={() => setIsAddingFolder(!isAddingFolder)}
            className="text-[#e4a52e] hover:text-[#d89216] p-0.5 rounded hover:bg-gray-200 transition-colors"
            title="New Folder"
          >
            <FolderPlus className="w-4 h-4" />
          </button>
        </div>

        {isAddingFolder && (
          <form onSubmit={onSubmitFolder} className="px-2.5 py-1.5 flex gap-1">
            <input
              type="text"
              placeholder="Folder Name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="flex-1 text-xs px-2 py-1 border border-gray-300 rounded focus:border-[#e4a52e] outline-none bg-white text-gray-800"
              autoFocus
            />
            <button
              type="submit"
              className="text-xs font-bold text-white bg-[#e4a52e] hover:bg-[#d89216] px-2 py-1 rounded"
            >
              Add
            </button>
          </form>
        )}

        <div className="space-y-0.5 mt-1">
          {folders.map((folder) => {
            const isCustom = folder.id !== "all" && folder.id !== "notes" && folder.id !== "quick";
            const isActive = activeFolderId === folder.id;
            return (
              <div
                key={folder.id}
                className={`group flex items-center justify-between px-2.5 py-1.5 rounded-md text-sm transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#e4a52e]/20 text-[#be7c10] font-semibold"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => onSelectFolder(folder.id)}
              >
                <div className="flex items-center gap-2 truncate">
                  <Folder className="w-4 h-4 shrink-0 text-[#e4a52e]" />
                  <span className="truncate">{folder.name}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-xs text-gray-400 group-hover:hidden">
                    {getFolderCount(folder.id)}
                  </span>
                  {isCustom && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFolder(folder.id);
                      }}
                      className="hidden group-hover:block text-red-500 hover:text-red-700 transition-colors"
                      title="Delete Folder"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="my-2.5 border-t border-[#d1d1d1]" />

        {/* Search */}
        <div className="mb-2">
          <div className="relative flex items-center bg-gray-200/60 rounded-md px-2 py-1.5 border border-gray-300/30">
            <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-transparent text-sm focus:outline-none border-none outline-none text-gray-800"
            />
          </div>
        </div>

        {/* Notes List inside Sidebar */}
        <div className="flex-1 overflow-y-auto min-h-0 divide-y divide-gray-200">
          {notes.length === 0 ? (
            <div className="p-4 text-center text-xs text-gray-400 font-medium">No Notes</div>
          ) : (
            notes.map((note) => {
              const isSelected = activeNoteId === note.id;
              const preview = note.preview || "No additional text";
              return (
                <div
                  key={note.id}
                  onClick={() => onSelectNote(note.id)}
                  className={`p-3 cursor-pointer select-none transition-colors rounded-md mb-0.5 ${
                    isSelected
                      ? "bg-[#e5a93c]/15 text-[#be7c10] border-l-4 border-[#e4a52e]"
                      : "text-gray-700 hover:bg-gray-200/60"
                  }`}
                >
                  <h4 className="font-bold text-xs truncate text-gray-900">{note.title}</h4>
                  <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-gray-500">
                    <span className="shrink-0 font-bold text-[#e4a52e]">
                      {formatDate(note.updatedAt)}
                    </span>
                    <span className="truncate text-gray-400 font-medium">{preview}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesSidebarSection;
