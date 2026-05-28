import { Copy } from "lucide-react";

const PostmanResponseViewer = ({ loading, response }) => (
  <div className="flex-1 border border-zinc-200 rounded-lg flex flex-col bg-gray-50/50 min-h-[220px]">
    <div className="bg-gray-100/60 px-4 py-2 border-b border-zinc-200 flex justify-between items-center text-xs shrink-0 select-none">
      <span className="font-bold text-gray-600">Response</span>
      {response && (
        <div className="flex items-center gap-4 text-[11px] font-semibold text-gray-500">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white ${
            response.status >= 200 && response.status < 300 ? "bg-emerald-500" : "bg-rose-500"
          }`}>
            {response.status} {response.statusText}
          </span>
          <span>Time: <span className="text-gray-800 font-bold">{response.time}</span></span>
          <span>Size: <span className="text-gray-800 font-bold">{response.size}</span></span>
        </div>
      )}
    </div>

    <div className="flex-1 p-4 font-mono text-xs overflow-auto select-text bg-white">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400">
          <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs">Sending Request...</span>
        </div>
      ) : response ? (
        <pre className="text-emerald-700 leading-relaxed">{response.body}</pre>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2 select-none">
          <Copy size={24} className="stroke-1 opacity-60" />
          <span>Send a request to see the response output</span>
        </div>
      )}
    </div>
  </div>
);

export default PostmanResponseViewer;
