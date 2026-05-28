import { Bold, Italic, Underline, Trash2, Type } from "lucide-react";
import NoteEditor from "../components/NoteEditor";

const NotesEditorSection = ({ activeNote, onUpdateNote, onDeleteNote, wordCount }) => (
  <div className="flex-1 flex flex-col min-w-0">
    <div className="shrink-0 flex items-center justify-between px-4 py-2 border-b border-[#d1d1d1] bg-gray-50/50">
      <div className="flex items-center gap-1">
        <button
          className="p-1.5 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          className="p-1.5 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          className="p-1.5 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </button>
        <div className="mx-2 w-px h-5 bg-gray-300" />
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <Type className="w-3.5 h-3.5" />
          {wordCount} {wordCount === 1 ? "word" : "words"}
        </span>
      </div>
      <button
        onClick={() => activeNote && onDeleteNote(activeNote.id)}
        disabled={!activeNote}
        className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-30 disabled:pointer-events-none text-red-500 transition-colors"
        title="Delete Note"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
    <NoteEditor activeNote={activeNote} onUpdateNote={onUpdateNote} />
  </div>
);

export default NotesEditorSection;
