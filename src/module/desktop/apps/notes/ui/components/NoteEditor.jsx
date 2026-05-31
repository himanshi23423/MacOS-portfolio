import React, { useRef, useEffect } from "react";
import { FileText } from "lucide-react";

const NoteEditor = ({ activeNote, onUpdateNote, onCreateNote }) => {
  const editorRef = useRef(null);

  // Sync editor content only when activeNote.id changes to prevent cursor jumping
  useEffect(() => {
    if (editorRef.current && activeNote) {
      if (editorRef.current.innerHTML !== activeNote.body) {
        editorRef.current.innerHTML = activeNote.body || "";
      }
    }
  }, [activeNote]);

  const handleInput = () => {
    if (editorRef.current) {
      onUpdateNote("body", editorRef.current.innerHTML);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#fbfaf8] p-5 md:p-6 overflow-y-auto">
      {activeNote ? (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className="notes-content-area flex-1 w-full bg-transparent text-sm resize-none border-none outline-none focus:ring-0 focus:outline-none font-sans leading-relaxed text-gray-800 min-h-[300px]"
          data-placeholder="Start writing..."
        />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
          <FileText className="w-12 h-12 stroke-1 mb-2 opacity-50 text-[#e4a52e]" />
          <p className="text-sm">No Note Selected</p>
          <button
            onClick={onCreateNote}
            className="mt-4 px-4 py-2 bg-[#e4a52e] hover:bg-[#d89216] text-white rounded-lg text-sm font-semibold active:scale-95 transition-all shadow-md cursor-pointer"
          >
            Create a Note
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteEditor;
