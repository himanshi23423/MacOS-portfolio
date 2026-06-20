import { Send } from "lucide-react";

const KeyValueTable = ({ list, onChange, onRemove, onAdd }) => (
  <div className="w-full flex flex-col gap-1 overflow-x-hidden font-mono text-[11px] text-gray-700 select-text">
    <div className="flex border-b border-zinc-200 pb-1.5 font-semibold text-gray-500 text-[10px]">
      <span className="w-8 text-center shrink-0">Use</span>
      <span className="flex-1 px-2">Key</span>
      <span className="flex-1 px-2">Value</span>
      <span className="w-10 text-center shrink-0"></span>
    </div>
    <div className="max-h-[140px] overflow-y-auto space-y-1 mt-1.5 pr-1 select-text">
      {list.map((item, idx) => (
        <div key={idx} className="flex items-center gap-1">
          <div className="w-8 flex justify-center shrink-0">
            <input
              type="checkbox"
              checked={item.enabled}
              onChange={(e) => onChange(idx, "enabled", e.target.checked)}
              className="cursor-pointer"
              onMouseDown={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
            />
          </div>
          <input
            type="text"
            placeholder="Key"
            value={item.key}
            onChange={(e) => {
              onChange(idx, "key", e.target.value);
              if (idx === list.length - 1 && e.target.value.trim() !== "") {
                onAdd();
              }
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            className="flex-1 min-w-0 border border-zinc-200 hover:border-zinc-300 focus:border-orange-500 rounded px-2 py-1 outline-none text-xs bg-white text-gray-800"
          />
          <input
            type="text"
            placeholder="Value"
            value={item.value}
            onChange={(e) => {
              onChange(idx, "value", e.target.value);
              if (idx === list.length - 1 && e.target.value.trim() !== "") {
                onAdd();
              }
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            className="flex-1 min-w-0 border border-zinc-200 hover:border-zinc-300 focus:border-orange-500 rounded px-2 py-1 outline-none text-xs bg-white text-gray-800"
          />
          <button
            onClick={() => onRemove(idx)}
            disabled={list.length === 1 && idx === 0}
            className="w-10 text-rose-500 hover:bg-rose-50 active:bg-rose-100 py-1 rounded transition-colors shrink-0 disabled:opacity-30 cursor-pointer text-sm font-bold"
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  </div>
);

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
  environment,
  handleEnvironmentChange,
  queryParams,
  setQueryParams,
  headers,
  setHeaders,
  isNarrow,
  isVeryNarrow,
}) => {
  // Helpers for Query Params
  const handleParamChange = (index, field, value) => {
    const copy = [...queryParams];
    copy[index][field] = value;
    setQueryParams(copy);
  };

  const handleParamRemove = (index) => {
    const copy = queryParams.filter((_, idx) => idx !== index);
    setQueryParams(copy.length ? copy : [{ key: "", value: "", enabled: true }]);
  };

  const handleParamAdd = () => {
    setQueryParams([...queryParams, { key: "", value: "", enabled: true }]);
  };

  // Helpers for Headers
  const handleHeaderChange = (index, field, value) => {
    const copy = [...headers];
    copy[index][field] = value;
    setHeaders(copy);
  };

  const handleHeaderRemove = (index) => {
    const copy = headers.filter((_, idx) => idx !== index);
    setHeaders(copy.length ? copy : [{ key: "", value: "", enabled: true }]);
  };

  const handleHeaderAdd = () => {
    setHeaders([...headers, { key: "", value: "", enabled: true }]);
  };

  return (
    <div className="flex flex-col gap-3 font-sans shrink-0">
      {/* Method + URL Input + Environment Dropdown */}
      <div
        className={`flex gap-2.5 ${isNarrow ? "flex-col items-stretch" : "flex-row items-center"}`}
      >
        <div className="flex gap-1.5 flex-1 min-w-0">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-2 py-2 rounded-md outline-none border border-zinc-300 transition-colors cursor-pointer shrink-0"
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
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            placeholder="Enter Request URL"
            className="flex-1 min-w-0 bg-white border border-zinc-300 rounded-md px-3 py-2 text-xs text-gray-800 outline-none focus:border-orange-500 shadow-sm font-mono select-text"
          />
        </div>

        <div
          className={`flex gap-2 items-center ${isNarrow ? "w-full justify-between" : "w-auto"}`}
        >
          <select
            value={environment}
            onChange={(e) => handleEnvironmentChange(e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            className="flex-1 md:flex-initial bg-gray-50 hover:bg-gray-100 border border-zinc-300 rounded-md px-2 py-2 text-xs text-gray-700 outline-none cursor-pointer min-w-0 truncate"
          >
            <option value="dev">
              {isVeryNarrow ? "Dev (api.dev)" : "Dev Environment (api.dev)"}
            </option>
            <option value="prod">
              {isVeryNarrow ? "Prod (api.prod)" : "Prod Environment (api.prod)"}
            </option>
            <option value="none">{isVeryNarrow ? "Local" : "No Environment (localhost)"}</option>
          </select>

          <button
            onClick={handleSend}
            disabled={loading}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-98 transition-all disabled:opacity-50 cursor-pointer shrink-0"
          >
            <span>{loading ? "Sending..." : "Send"}</span>
            <Send size={12} />
          </button>
        </div>
      </div>

      {/* Tabs builder for Request Settings */}
      <div className="border border-zinc-200 rounded-lg flex flex-col shrink-0 min-h-0 bg-gray-50/50">
        <div className="flex items-center border-b border-zinc-200 bg-gray-100/60 px-2 shrink-0 text-xs font-semibold text-gray-500">
          <button
            onClick={() => setActiveTab("params")}
            className={`py-2 px-4 border-b-2 transition-all cursor-pointer ${
              activeTab === "params"
                ? "border-orange-500 text-gray-900 font-bold"
                : "border-transparent hover:text-gray-800"
            }`}
          >
            Params
          </button>
          <button
            onClick={() => setActiveTab("headers")}
            className={`py-2 px-4 border-b-2 transition-all cursor-pointer ${
              activeTab === "headers"
                ? "border-orange-500 text-gray-900 font-bold"
                : "border-transparent hover:text-gray-800"
            }`}
          >
            Headers
          </button>
          <button
            onClick={() => setActiveTab("body")}
            className={`py-2 px-4 border-b-2 transition-all cursor-pointer ${
              activeTab === "body"
                ? "border-orange-500 text-gray-900 font-bold"
                : "border-transparent hover:text-gray-800"
            }`}
          >
            Body (JSON)
          </button>
        </div>

        <div className="p-3 min-h-[120px] flex">
          {activeTab === "params" && (
            <KeyValueTable
              list={queryParams}
              onChange={handleParamChange}
              onRemove={handleParamRemove}
              onAdd={handleParamAdd}
            />
          )}

          {activeTab === "headers" && (
            <KeyValueTable
              list={headers}
              onChange={handleHeaderChange}
              onRemove={handleHeaderRemove}
              onAdd={handleHeaderAdd}
            />
          )}

          {activeTab === "body" && (
            <textarea
              value={reqBody}
              onChange={(e) => setReqBody(e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              placeholder="Enter JSON Request Body payload here..."
              className="w-full h-24 bg-white border border-zinc-300 rounded p-2 text-xs font-mono text-gray-800 outline-none focus:border-orange-500 resize-none select-text"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostmanRequestBuilder;
