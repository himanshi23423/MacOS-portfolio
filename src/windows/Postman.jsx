import { useState, useEffect } from "react";
import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/windowWrapper";
import { projects } from "#constants";
import { 
  Send, 
  Plus, 
  Trash2, 
  Folder, 
  FolderOpen, 
  FileCode, 
  Settings, 
  ChevronRight, 
  ChevronDown,
  Info,
  Layers,
  Copy
} from "lucide-react";

// Mock collection data
const MOCK_COLLECTIONS = [
  {
    name: "User API",
    requests: [
      { id: "req_profile", name: "Get Profile", method: "GET", url: "https://api.dev/v1/profile", body: "" },
      { id: "req_login", name: "User Login", method: "POST", url: "https://api.dev/v1/login", body: '{\n  "username": "guest",\n  "password": "password123"\n}' }
    ]
  },
  {
    name: "Portfolio API",
    requests: [
      { id: "req_projects", name: "List Projects", method: "GET", url: "https://api.dev/v1/projects", body: "" },
      { id: "req_contact", name: "Send Contact Message", method: "POST", url: "https://api.dev/v1/contact", body: '{\n  "name": "Anonymous Dev",\n  "email": "dev@example.com",\n  "message": "Love your macOS portfolio!"\n}' }
    ]
  }
];

const Postman = () => {
  const [activeTab, setActiveTab] = useState("params"); // 'params', 'auth', 'headers', 'body'
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://api.dev/v1/profile");
  const [reqBody, setReqBody] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState({ "User API": true, "Portfolio API": true });

  // Load a request from sidebar collection
  const loadRequest = (req) => {
    setMethod(req.method);
    setUrl(req.url);
    setReqBody(req.body);
    setResponse(null);
  };

  // Mock route resolver
  const handleSend = () => {
    setLoading(true);
    setResponse(null);

    // Simulate network delay
    setTimeout(() => {
      let status = 200;
      let statusText = "OK";
      let data = {};

      const cleanUrl = url.trim().replace(/\/$/, "");

      try {
        if (cleanUrl.endsWith("/v1/profile") && method === "GET") {
          data = {
            name: "Kuldeep Rajput",
            role: "Full Stack Developer",
            location: "Mumbai, India",
            github: "https://github.com/kuldeeprajput-dev",
            skills: ["React", "Node.js", "Bun", "Tailwind CSS", "GSAP"]
          };
        } else if (cleanUrl.endsWith("/v1/login") && method === "POST") {
          let parsed = {};
          if (reqBody.trim()) {
            parsed = JSON.parse(reqBody);
          }
          if (parsed.username === "guest" && parsed.password === "password123") {
            status = 200;
            data = {
              message: "Login successful!",
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockTokenForTesting",
              expiresIn: "24h"
            };
          } else {
            status = 401;
            statusText = "Unauthorized";
            data = {
              error: "Invalid credentials",
              message: "Please double check your request payload username and password values."
            };
          }
        } else if (cleanUrl.endsWith("/v1/projects") && method === "GET") {
          data = {
            count: projects.length,
            results: projects.map(p => ({
              id: p.id,
              title: p.title,
              description: p.description,
              demo_url: p.link,
              github_url: p.github
            }))
          };
        } else if (cleanUrl.endsWith("/v1/contact") && method === "POST") {
          let parsed = {};
          if (reqBody.trim()) {
            parsed = JSON.parse(reqBody);
          }
          if (parsed.name && parsed.email && parsed.message) {
            status = 201;
            statusText = "Created";
            data = {
              status: "success",
              received: parsed,
              timestamp: new Date().toISOString(),
              notification: "Thank you for getting in touch! Your message was received."
            };
          } else {
            status = 400;
            statusText = "Bad Request";
            data = {
              error: "Missing required fields",
              required: ["name", "email", "message"]
            };
          }
        } else {
          // Fallback 404 Route
          status = 404;
          statusText = "Not Found";
          data = {
            error: "Not Found",
            message: `Cannot ${method} ${url}`,
            hint: "Try loading one of the preconfigured requests in the sidebar collections!"
          };
        }
      } catch (err) {
        status = 400;
        statusText = "Bad Request";
        data = {
          error: "JSON Parsing Error",
          details: err.message,
          message: "Please ensure your Request Body is valid JSON format."
        };
      }

      setResponse({
        status,
        statusText,
        time: Math.floor(Math.random() * 80) + 40 + " ms",
        size: (JSON.stringify(data).length / 1000).toFixed(2) + " KB",
        body: JSON.stringify(data, null, 2)
      });
      setLoading(false);
    }, 600);
  };

  const getMethodColor = (m) => {
    switch (m) {
      case "GET": return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "POST": return "text-orange-600 bg-orange-50 border-orange-200";
      case "PUT": return "text-blue-600 bg-blue-50 border-blue-200";
      case "DELETE": return "text-rose-600 bg-rose-50 border-rose-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white text-gray-800 font-sans select-none rounded-xl overflow-hidden shadow-2xl border border-zinc-200/80">
      
      {/* Title Bar */}
      <div id="window-header" className="shrink-0 bg-[#f3f3f3] border-b border-zinc-200 px-4 py-2 flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <WindowControls target="postman" />
          <span className="font-semibold pl-4 hidden md:inline">Postman Agent (Desktop client)</span>
        </div>
        <div className="flex-1 text-center font-medium text-[11px] truncate px-4">
          API Request Workspace
        </div>
        <div className="w-16 flex justify-end">
          <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded font-bold">POSTMAN</span>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex min-h-0 relative">
        
        {/* Left Sidebar Collections */}
        <div className="w-56 bg-[#f8f9fa] border-r border-zinc-200 flex flex-col shrink-0 min-w-0">
          <div className="p-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center justify-between border-b border-zinc-200">
            <span className="flex items-center gap-1.5"><Layers size={12} className="text-orange-500" /> Collections</span>
            <Plus size={14} className="hover:text-gray-800 cursor-pointer" />
          </div>
          
          <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
            {MOCK_COLLECTIONS.map(folder => {
              const isExpanded = expandedFolders[folder.name];
              return (
                <div key={folder.name} className="space-y-0.5">
                  <div 
                    onClick={() => setExpandedFolders(p => ({ ...p, [folder.name]: !p[folder.name] }))}
                    className="flex items-center gap-1.5 py-1 px-2 hover:bg-gray-200/60 rounded cursor-pointer text-xs font-semibold text-gray-700"
                  >
                    {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                    {isExpanded ? <FolderOpen size={13} className="text-amber-500" /> : <Folder size={13} className="text-amber-500" />}
                    <span className="truncate">{folder.name}</span>
                  </div>
                  {isExpanded && (
                    <div className="pl-4 border-l border-zinc-200 ml-3.5 space-y-0.5">
                      {folder.requests.map(req => (
                        <div 
                          key={req.id}
                          onClick={() => loadRequest(req)}
                          className={`flex items-center gap-2 py-1 px-2 hover:bg-gray-200/60 rounded cursor-pointer text-[11px] font-medium transition-colors ${
                            url === req.url && method === req.method ? "bg-gray-200/80 text-gray-900 border-r-2 border-orange-500" : "text-gray-600"
                          }`}
                        >
                          <span className={`text-[8px] font-bold px-1 py-0.5 rounded border ${getMethodColor(req.method)}`}>
                            {req.method}
                          </span>
                          <span className="truncate">{req.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Request / Response workspace */}
        <div className="flex-1 flex flex-col min-w-0 bg-white p-4 gap-4 overflow-y-auto">
          
          {/* Request Header Bar */}
          <div className="flex gap-2 shrink-0">
            {/* Method Select */}
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
            
            {/* URL input */}
            <input 
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter Request URL (e.g. https://api.dev/v1/profile)"
              className="flex-1 bg-white border border-zinc-300 rounded-md px-3 py-2 text-xs text-gray-800 outline-none focus:border-orange-500 shadow-sm font-mono select-text"
            />

            {/* Send Button */}
            <button 
              onClick={handleSend}
              disabled={loading}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-98 transition-all disabled:opacity-50"
            >
              <span>{loading ? "Sending..." : "Send"}</span>
              <Send size={12} />
            </button>
          </div>

          {/* Request Details Tabs */}
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

          {/* Response Panel */}
          <div className="flex-1 border border-zinc-200 rounded-lg flex flex-col bg-gray-50/50 min-h-[220px]">
            {/* Header info */}
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

            {/* JSON Output Viewer */}
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

        </div>

      </div>

    </div>
  );
};

const PostmanWindow = windowWrapper(Postman, "postman");
export default PostmanWindow;
