import { FileText } from "lucide-react";

const NoteEditor = ({ activeNote, onUpdateNote, onCreateNote }) => (
  <div className="flex-1 flex flex-col bg-white p-5 md:p-6 overflow-y-auto">
    {activeNote ? (
      <textarea
        value={activeNote.body}
        onChange={(e) => onUpdateNote("body", e.target.value)}
        placeholder="Start writing..."
        className="flex-1 w-full bg-transparent text-base resize-none border-none outline-none focus:ring-0 focus:outline-none font-sans leading-relaxed text-gray-800"
      />
    ) : (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
        <FileText className="w-12 h-12 stroke-1 mb-2 opacity-50" />
        <p className="text-sm">No Note Selected</p>
        <button
          onClick={onCreateNote}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold active:scale-95 transition-all shadow-md"
        >
          Create a Note
        </button>
      </div>
    )}
  </div>
);

export default NoteEditor;
