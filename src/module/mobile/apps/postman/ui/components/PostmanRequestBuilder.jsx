import { Send } from "lucide-react";

const PostmanRequestBuilder = ({
  method,
  setMethod,
  url,
  setUrl,
  handleSend,
  loading,
  activeTab,
  setActiveTab,
  reqBody,
  setReqBody,
}) => (
  <>
    <div className="flex gap-2 shrink-0">
      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-3 py-2 rounded-md outline-none border border-zinc-300 transition-colors"
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
      </select>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter Request URL (e.g. https://api.dev/v1/profile)"
        className="flex-1 bg-white border border-zinc-300 rounded-md px-3 py-2 text-xs text-gray-800 outline-none focus:border-orange-500 shadow-sm font-mono select-text"
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-98 transition-all disabled:opacity-50"
      >
        <span>{loading ? "Sending..." : "Send"}</span>
        <Send size={12} />
      </button>
    </div>

    <div className="border border-zinc-200 rounded-lg flex flex-col shrink-0 min-h-0 bg-gray-50/50">
      <div className="flex items-center border-b border-zinc-200 bg-gray-100/60 px-2 shrink-0 text-xs font-semibold text-gray-500">
        <button
          onClick={() => setActiveTab("params")}
          className={`py-2 px-4 border-b-2 transition-all ${activeTab === "params" ? "border-orange-500 text-gray-900 font-bold" : "border-transparent hover:text-gray-800"}`}
        >
          Params
        </button>
        <button
          onClick={() => setActiveTab("headers")}
          className={`py-2 px-4 border-b-2 transition-all ${activeTab === "headers" ? "border-orange-500 text-gray-900 font-bold" : "border-transparent hover:text-gray-800"}`}
        >
          Headers
        </button>
        <button
          onClick={() => setActiveTab("body")}
          className={`py-2 px-4 border-b-2 transition-all ${activeTab === "body" ? "border-orange-500 text-gray-900 font-bold" : "border-transparent hover:text-gray-800"}`}
        >
          Body (JSON)
        </button>
      </div>

      <div className="p-3 min-h-[100px] flex">
        {activeTab === "params" && (
          <div className="text-xs text-gray-400 italic flex items-center justify-center w-full">
            No Query Parameters configured. Click URL input to add.
          </div>
        )}
        {activeTab === "headers" && (
          <div className="w-full space-y-1.5 text-xs text-gray-600 font-mono">
            <div className="flex justify-between border-b pb-1 border-zinc-200/80 font-bold">
              <span>Key</span>
              <span>Value</span>
            </div>
            <div className="flex justify-between">
              <span>Content-Type</span>
              <span className="text-blue-600 font-semibold">application/json</span>
            </div>
            <div className="flex justify-between">
              <span>User-Agent</span>
              <span>PostmanRuntime/7.29.2</span>
            </div>
          </div>
        )}
        {activeTab === "body" && (
          <textarea
            value={reqBody}
            onChange={(e) => setReqBody(e.target.value)}
            placeholder="Enter JSON Request Body payload here..."
            className="w-full h-24 bg-white border border-zinc-300 rounded p-2 text-xs font-mono text-gray-800 outline-none focus:border-orange-500 resize-none select-text"
          />
        )}
      </div>
    </div>
  </>
);

export default PostmanRequestBuilder;
