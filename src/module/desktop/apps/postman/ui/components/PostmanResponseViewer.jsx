import { Copy } from "lucide-react";

const PostmanResponseViewer = ({
  loading,
  response,
  activeResponseTab,
  setActiveResponseTab,
  isNarrow,
}) => (
  <div className="flex-1 border border-zinc-200 rounded-lg flex flex-col bg-gray-50/50 min-h-[220px] font-sans">
    {/* Response Header Info & Tabs */}
    <div
      className={`bg-gray-100/60 px-4 py-2 border-b border-zinc-200 flex ${isNarrow ? "flex-col items-stretch" : "flex-row justify-between items-center"} text-xs shrink-0 select-none gap-2`}
    >
      <div className="flex items-center gap-4">
        <span className="font-bold text-gray-600">Response</span>
        {response && (
          <div className="flex items-center border border-zinc-200 bg-white rounded overflow-hidden text-[10px]">
            <button
              onClick={() => setActiveResponseTab("pretty")}
              className={`px-2 py-1 transition-colors cursor-pointer ${
                activeResponseTab === "pretty"
                  ? "bg-orange-500 text-white font-bold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Pretty
            </button>
            <button
              onClick={() => setActiveResponseTab("raw")}
              className={`px-2 py-1 transition-colors cursor-pointer border-l border-r border-zinc-200 ${
                activeResponseTab === "raw"
                  ? "bg-orange-500 text-white font-bold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Raw
            </button>
            <button
              onClick={() => setActiveResponseTab("headers")}
              className={`px-2 py-1 transition-colors cursor-pointer ${
                activeResponseTab === "headers"
                  ? "bg-orange-500 text-white font-bold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Headers
            </button>
          </div>
        )}
      </div>

      {response && (
        <div
          className={`flex items-center gap-3 text-[10px] font-semibold text-gray-500 ${isNarrow ? "justify-start mt-1" : "justify-end"}`}
        >
          <span
            className={`px-1.5 py-0.5 rounded font-bold text-white ${
              response.status >= 200 && response.status < 300 ? "bg-emerald-500" : "bg-rose-500"
            }`}
          >
            {response.status} {response.statusText}
          </span>
          <span>
            Time: <span className="text-gray-700 font-bold">{response.time}</span>
          </span>
          <span>
            Size: <span className="text-gray-700 font-bold">{response.size}</span>
          </span>
        </div>
      )}
    </div>

    {/* Response Body Area */}
    <div
      className="flex-1 p-4 font-mono text-xs overflow-auto select-text bg-white"
      onMouseDown={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400 select-none">
          <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs">Sending Request...</span>
        </div>
      ) : response ? (
        <>
          {activeResponseTab === "pretty" && (
            <pre className="text-emerald-700 leading-relaxed font-medium whitespace-pre-wrap">
              {response.body}
            </pre>
          )}

          {activeResponseTab === "raw" && (
            <pre className="text-gray-700 leading-normal whitespace-pre-wrap">{response.body}</pre>
          )}

          {activeResponseTab === "headers" && (
            <div className="space-y-1.5 text-[11px] text-gray-600 font-mono select-text">
              <div className="flex justify-between border-b pb-1 border-zinc-200/80 font-bold text-gray-500">
                <span>Header Key</span>
                <span>Header Value</span>
              </div>
              {Object.entries(response.headers || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-zinc-100 py-0.5">
                  <span className="font-semibold text-gray-700">{key}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          )}
        </>
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
