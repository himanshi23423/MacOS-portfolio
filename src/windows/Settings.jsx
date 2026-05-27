import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/windowWrapper";
import useWindowsStore from "#store/window";
import { useState, useEffect } from "react";
import { 
  Settings as SettingsIcon, Monitor, Wifi, Bluetooth, 
  Battery, Info, Search, Bell, Volume2, Moon, Hourglass,
  Accessibility, LayoutDashboard, Globe, Lock,
  ChevronLeft, ChevronRight, ExternalLink, Check, ToggleRight, ToggleLeft,
  Shield, Volume1, VolumeX, Eye, Ear, Hand, PlusCircle, AppWindow
} from "lucide-react";

const GithubIcon = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const BookMarkedIcon = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const SidebarItem = ({ icon, label, color, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-2.5 px-2 py-1 rounded-md cursor-pointer transition-colors ${
      active 
        ? "bg-blue-500 text-white" 
        : "hover:bg-black/5 text-gray-800"
    }`}
  >
    <div className={`flex items-center justify-center w-[20px] h-[20px] rounded-[4px] shadow-sm text-white ${color}`}>
      {icon}
    </div>
    <span className="text-[13px] font-medium truncate">{label}</span>
  </div>
);

const Settings = () => {
  const githubApiBase = import.meta.env.VITE_GITHUB_API_URL || "https://api.github.com";
  const { windows } = useWindowsStore();
  const windowData = windows.settings?.data;

  const [activeTab, setActiveTab] = useState("Apple ID");
  const [githubData, setGithubData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (windowData?.tab) {
      setActiveTab(windowData.tab);
    }
  }, [windowData]);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [mobileView, setMobileView] = useState("main");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    Promise.all([
      fetch(`${githubApiBase}/users/kuldeeprajput-dev`).then(res => res.json()),
      fetch(`${githubApiBase}/users/kuldeeprajput-dev/repos?sort=updated&per_page=3`).then(res => res.json())
    ])
    .then(([profile, repos]) => {
      setGithubData({ profile, repos });
      setIsLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching web details:", err);
      setIsLoading(false);
    });
  }, []);

  const SIDEBAR_GROUPS = [
    [
      { id: "Wi-Fi", icon: <Wifi size={13} />, color: "bg-blue-500" },
      { id: "Bluetooth", icon: <Bluetooth size={13} />, color: "bg-blue-500" },
      { id: "Network", icon: <Globe size={13} />, color: "bg-blue-500" },
    ],
    [
      { id: "Notifications", icon: <Bell size={13} />, color: "bg-red-500" },
      { id: "Sound", icon: <Volume2 size={13} />, color: "bg-pink-500" },
      { id: "Focus", icon: <Moon size={13} />, color: "bg-indigo-500" },
      { id: "Screen Time", icon: <Hourglass size={13} />, color: "bg-purple-500" },
    ],
    [
      { id: "General", icon: <SettingsIcon size={13} />, color: "bg-gray-400" },
      { id: "Appearance", icon: <Monitor size={13} />, color: "bg-gray-800" },
      { id: "Accessibility", icon: <Accessibility size={13} />, color: "bg-blue-500" },
      { id: "Control Center", icon: <LayoutDashboard size={13} />, color: "bg-gray-400" },
    ]
  ];

  return (
    <div className="@container w-full h-full">
      <div className="flex h-full w-full bg-[#f3f3f3]/95 backdrop-blur-3xl overflow-hidden rounded-lg font-sans select-none border border-black/10">
      
      {/* Mobile iOS-Style Sidebar */}
      {isMobile ? (
        <div className={`${mobileView === "main" ? "flex" : "hidden"} flex-col h-full w-full bg-[#f2f2f7]`}>
          <div className="flex flex-col shrink-0 bg-[#f2f2f7] border-b border-gray-300">
            <div className="px-4 py-3 pb-2 flex items-center justify-between">
              <WindowControls target="settings" />
            </div>
            <h1 className="text-[28px] font-bold text-black px-4 pb-2">Settings</h1>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 thin-scrollbar">
            <div 
              className="bg-white rounded-xl shadow-sm flex items-center gap-4 p-4 cursor-pointer active:bg-gray-50 transition-colors"
              onClick={() => { setActiveTab("Apple ID"); setMobileView("Apple ID"); }}
            >
              {isLoading ? (
                <div className="w-[60px] h-[60px] rounded-full bg-gray-200 animate-pulse shrink-0" />
              ) : githubData ? (
                <img src={githubData.profile.avatar_url} className="w-[60px] h-[60px] rounded-full shrink-0 border border-gray-200" alt="Avatar" />
              ) : (
                <div className="w-[60px] h-[60px] rounded-full bg-gray-200 shrink-0" />
              )}
              <div className="flex-1 overflow-hidden">
                <h2 className="text-[17px] font-semibold text-black truncate leading-tight">
                  {githubData?.profile?.name || githubData?.profile?.login || "Loading..."}
                </h2>
                <p className="text-[13px] text-gray-500 truncate mt-0.5">Apple ID, iCloud, Media</p>
              </div>
              <ChevronRight size={18} className="text-gray-400 shrink-0" />
            </div>

            {SIDEBAR_GROUPS.map((group, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                {group.map((item, j) => (
                  <div 
                    key={item.id}
                    className={`flex items-center gap-3 p-3 pl-4 cursor-pointer active:bg-gray-50 transition-colors ${j < group.length - 1 ? 'border-b border-gray-100' : ''}`}
                    onClick={() => { setActiveTab(item.id); setMobileView(item.id); }}
                  >
                    <div className={`flex items-center justify-center w-[28px] h-[28px] rounded-md shadow-sm text-white ${item.color}`}>
                      {item.icon}
                    </div>
                    <span className="flex-1 text-[16px] font-medium text-black">{item.id}</span>
                    <ChevronRight size={18} className="text-gray-400 shrink-0" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Desktop Sidebar - Strictly Light Theme */
        <div className="hidden @md:flex w-[240px] h-full shrink-0 bg-[#e8e8e8]/50 border-r border-black/10 flex-col">
          <div className="window-header h-[52px] shrink-0 flex items-center px-4 cursor-default">
            <WindowControls target="settings" />
          </div>
          
          <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-4 thin-scrollbar">
            
            <div 
              className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors border border-transparent ${activeTab === "Apple ID" ? "bg-black/5 border-black/5" : "hover:bg-black/5"}`}
              onClick={() => setActiveTab("Apple ID")}
            >
              {isLoading ? (
                <>
                  <div className="w-[42px] h-[42px] rounded-full bg-gray-300 animate-pulse shrink-0"></div>
                  <div className="flex-1 flex flex-col gap-1.5 justify-center">
                    <div className="h-3 w-20 bg-gray-300 animate-pulse rounded"></div>
                    <div className="h-2 w-28 bg-gray-300 animate-pulse rounded"></div>
                  </div>
                </>
              ) : githubData ? (
                <>
                  <img 
                    src={githubData.profile.avatar_url} 
                    alt="Avatar" 
                    className="w-[42px] h-[42px] rounded-full border border-gray-300 shadow-sm shrink-0"
                    draggable="false" 
                  />
                  <div className="flex-1 overflow-hidden">
                    <h3 className="font-semibold text-[13px] text-gray-900 truncate leading-tight">
                      {githubData.profile.name || githubData.profile.login}
                    </h3>
                    <p className="text-[11px] text-gray-500 truncate leading-tight mt-0.5">
                      Apple ID, iCloud, Media
                    </p>
                  </div>
                </>
              ) : null}
            </div>

            <div className="space-y-4">
              {SIDEBAR_GROUPS.map((group, i) => (
                <div key={i} className="space-y-[2px]">
                  {group.map((item) => (
                    <SidebarItem 
                      key={item.id}
                      icon={item.icon}
                      label={item.id}
                      color={item.color}
                      active={activeTab === item.id}
                      onClick={() => setActiveTab(item.id)}
                    />
                  ))}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
      
      {/* Main Content Area */}
      <div className={`${isMobile ? (mobileView !== "main" ? "flex w-full" : "hidden") : "flex-1 flex"} flex-col bg-white`}>
        {isMobile ? (
          <div className="flex items-center justify-between shrink-0 bg-[#f2f2f7] border-b border-gray-300 px-2 py-3">
            <div 
              className="flex items-center gap-1 text-blue-500 cursor-pointer w-1/3"
              onClick={() => setMobileView("main")}
            >
              <ChevronLeft size={22} />
              <span className="text-[16px]">Settings</span>
            </div>
            <h2 className="text-[16px] font-semibold text-black text-center w-1/3 truncate">{activeTab}</h2>
            <div className="w-1/3"></div>
          </div>
        ) : (
          <div className="window-header h-[52px] shrink-0 flex items-center px-6 border-b border-gray-200">
            <h2 className="text-[15px] font-semibold text-gray-800">{activeTab}</h2>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto thin-scrollbar">
          {activeTab === "Wi-Fi" ? (
            <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between bg-gray-50 rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <Wifi size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Wi-Fi</h3>
                    <p className="text-[12px] text-gray-500">Home Network</p>
                  </div>
                </div>
                <ToggleRight size={36} className="text-blue-500 cursor-pointer" />
              </div>
              <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider ml-2 mb-2">Known Networks</h3>
              <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Wifi size={16} className="text-gray-800"/> 
                    <span className="text-[13px] font-medium text-gray-900">Home Network</span>
                  </div>
                  <Check size={16} className="text-blue-500" />
                </div>
                <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Wifi size={16} className="text-gray-800"/> 
                    <span className="text-[13px] text-gray-700">Coffee Shop 5G</span>
                  </div>
                  <Lock size={14} className="text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-3 px-4">
                  <div className="flex items-center gap-2">
                    <Wifi size={16} className="text-gray-800"/> 
                    <span className="text-[13px] text-gray-700">iPhone (Kuldeep)</span>
                  </div>
                  <Lock size={14} className="text-gray-400" />
                </div>
              </div>
            </div>
          ) : activeTab === "Bluetooth" ? (
            <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between bg-gray-50 rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <Bluetooth size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Bluetooth</h3>
                    <p className="text-[12px] text-gray-500">Discoverable as "MacBook Pro"</p>
                  </div>
                </div>
                <ToggleRight size={36} className="text-blue-500 cursor-pointer" />
              </div>
              <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider ml-2 mb-2">My Devices</h3>
              <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
                  <span className="text-[13px] font-medium text-gray-900">AirPods Pro</span>
                  <span className="text-[13px] text-blue-500">Connected</span>
                </div>
                <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
                  <span className="text-[13px] text-gray-700">Magic Keyboard</span>
                  <span className="text-[13px] text-gray-500">Not Connected</span>
                </div>
                <div className="flex items-center justify-between p-3 px-4">
                  <span className="text-[13px] text-gray-700">Magic Mouse</span>
                  <span className="text-[13px] text-gray-500">Not Connected</span>
                </div>
              </div>
            </div>
          ) : activeTab === "Network" ? (
            <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-6">
                <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-[13px] font-medium text-gray-900">Wi-Fi</span>
                  </div>
                  <span className="text-[13px] text-gray-500">Connected</span>
                </div>
                <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <span className="text-[13px] text-gray-700">Thunderbolt Bridge</span>
                  </div>
                  <span className="text-[13px] text-gray-500">Not Connected</span>
                </div>
                <div className="flex items-center justify-between p-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <span className="text-[13px] text-gray-700">VPN</span>
                  </div>
                  <span className="text-[13px] text-gray-500">Not Configured</span>
                </div>
              </div>
              <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="flex items-center justify-between p-3 px-4">
                  <div className="flex items-center gap-2 text-gray-900">
                    <Shield size={16} /> <span className="text-[13px]">Firewall</span>
                  </div>
                  <span className="text-[13px] text-gray-500">Active</span>
                </div>
              </div>
            </div>
          ) : activeTab === "Notifications" ? (
            <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider ml-2 mb-2">Notification Style</h3>
              <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <img src="/images/safari.png" className="w-6 h-6 object-contain" />
                    <span className="text-[13px] font-medium text-gray-900">Safari</span>
                  </div>
                  <span className="text-[12px] text-gray-500">Banners, Sounds, Badges</span>
                </div>
                <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <img src="/images/finder.png" className="w-6 h-6 object-contain" />
                    <span className="text-[13px] font-medium text-gray-900">Finder</span>
                  </div>
                  <span className="text-[12px] text-gray-500">Badges</span>
                </div>
                <div className="flex items-center justify-between p-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded text-white flex items-center justify-center"><Bell size={12}/></div>
                    <span className="text-[13px] font-medium text-gray-900">System Messages</span>
                  </div>
                  <span className="text-[12px] text-gray-500">Banners, Sounds</span>
                </div>
              </div>
            </div>
          ) : activeTab === "Sound" ? (
            <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider ml-2 mb-2">Output</h3>
              <div className="w-full bg-gray-50 rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <Volume1 size={20} className="text-gray-500 shrink-0" />
                  <input type="range" className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500" defaultValue={65} />
                  <Volume2 size={20} className="text-gray-500 shrink-0" />
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-gray-900 font-medium">MacBook Pro Speakers</span>
                  <span className="text-gray-500">Built-in</span>
                </div>
              </div>
              <div className="w-full bg-gray-50 rounded-xl border border-gray-200 p-4 shadow-sm flex items-center justify-between">
                <span className="text-[13px] text-gray-900">Play user interface sound effects</span>
                <ToggleRight size={32} className="text-blue-500 cursor-pointer" />
              </div>
            </div>
          ) : activeTab === "Focus" ? (
            <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between bg-gray-50 rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                    <Moon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Do Not Disturb</h3>
                    <p className="text-[12px] text-gray-500">Silences notifications</p>
                  </div>
                </div>
                <ToggleLeft size={36} className="text-gray-300 cursor-pointer" />
              </div>
              <div className="w-full border border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
                <PlusCircle size={16} className="text-gray-500" />
                <span className="text-[13px] font-medium text-gray-600">Add Focus</span>
              </div>
            </div>
          ) : activeTab === "Screen Time" ? (
            <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="w-full bg-gray-50 rounded-xl border border-gray-200 p-6 shadow-sm mb-6 flex flex-col items-center">
                <h2 className="text-[28px] font-light text-gray-900 mb-1">6h 24m</h2>
                <p className="text-[12px] text-gray-500 mb-6">Daily Average</p>
                
                <div className="w-full flex h-8 bg-gray-200 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-blue-500 w-[55%]"></div>
                  <div className="h-full bg-indigo-400 w-[25%]"></div>
                  <div className="h-full bg-cyan-400 w-[20%]"></div>
                </div>
                
                <div className="w-full flex justify-between px-2 text-[12px]">
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-blue-500"></div><span className="text-gray-700">Development</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-indigo-400"></div><span className="text-gray-700">Productivity</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-cyan-400"></div><span className="text-gray-700">Other</span></div>
                </div>
              </div>
            </div>
          ) : activeTab === "Accessibility" ? (
            <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider ml-2 mb-2">Vision</h3>
              <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-6">
                <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
                  <div className="flex items-center gap-2"><Eye size={16} className="text-blue-500"/> <span className="text-[13px] text-gray-900">VoiceOver</span></div>
                  <span className="text-[13px] text-gray-500">Off</span>
                </div>
                <div className="flex items-center justify-between p-3 px-4">
                  <div className="flex items-center gap-2"><Search size={16} className="text-blue-500"/> <span className="text-[13px] text-gray-900">Zoom</span></div>
                  <span className="text-[13px] text-gray-500">Off</span>
                </div>
              </div>
              <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider ml-2 mb-2">Hearing</h3>
              <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
                  <div className="flex items-center gap-2"><Ear size={16} className="text-blue-500"/> <span className="text-[13px] text-gray-900">Audio</span></div>
                </div>
                <div className="flex items-center justify-between p-3 px-4">
                  <div className="flex items-center gap-2"><Hand size={16} className="text-blue-500"/> <span className="text-[13px] text-gray-900">Subtitles</span></div>
                </div>
              </div>
            </div>
          ) : activeTab === "Control Center" ? (
            <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider ml-2 mb-2">Control Center Modules</h3>
              <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <Wifi size={16} className="text-blue-500" />
                    <span className="text-[13px] font-medium text-gray-900">Wi-Fi</span>
                  </div>
                  <span className="text-[12px] text-gray-500">Show in Menu Bar</span>
                </div>
                <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <Bluetooth size={16} className="text-blue-500" />
                    <span className="text-[13px] font-medium text-gray-900">Bluetooth</span>
                  </div>
                  <span className="text-[12px] text-gray-500">Show in Menu Bar</span>
                </div>
                <div className="flex items-center justify-between p-3 px-4">
                  <div className="flex items-center gap-3">
                    <AppWindow size={16} className="text-blue-500" />
                    <span className="text-[13px] font-medium text-gray-900">Stage Manager</span>
                  </div>
                  <span className="text-[12px] text-gray-500">Don't Show in Menu Bar</span>
                </div>
              </div>
            </div>
          ) : activeTab === "Appearance" ? (
            <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider ml-1 mb-4">Appearance</h3>
              <div className="flex gap-8 mb-8">
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                  <div className="w-24 h-16 rounded-md bg-gray-100 border-2 border-blue-500 shadow-sm overflow-hidden flex flex-col">
                    <div className="h-4 bg-white border-b border-gray-200"></div>
                    <div className="flex-1 bg-gray-100 p-1"><div className="w-full h-full bg-white rounded-sm shadow-sm"></div></div>
                  </div>
                  <span className="text-[12px] font-medium text-gray-900">Light</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                  <div className="w-24 h-16 rounded-md bg-gray-800 border-2 border-transparent shadow-sm overflow-hidden flex flex-col">
                    <div className="h-4 bg-[#2c2c2e] border-b border-black"></div>
                    <div className="flex-1 bg-[#1e1e1e] p-1"><div className="w-full h-full bg-[#2c2c2e] rounded-sm shadow-sm"></div></div>
                  </div>
                  <span className="text-[12px] font-medium text-gray-600">Dark</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                  <div className="w-24 h-16 rounded-md bg-gradient-to-r from-gray-100 to-gray-800 border-2 border-transparent shadow-sm overflow-hidden flex flex-col">
                    <div className="h-4 flex"><div className="flex-1 bg-white border-b border-gray-200"></div><div className="flex-1 bg-[#2c2c2e] border-b border-black"></div></div>
                    <div className="flex-1 flex"><div className="flex-1 bg-gray-100 p-1"><div className="w-full h-full bg-white rounded-sm shadow-sm"></div></div><div className="flex-1 bg-[#1e1e1e] p-1"><div className="w-full h-full bg-[#2c2c2e] rounded-sm shadow-sm"></div></div></div>
                  </div>
                  <span className="text-[12px] font-medium text-gray-600">Auto</span>
                </div>
              </div>
              <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="flex items-center justify-between p-3 px-4">
                  <span className="text-[13px] text-gray-900">Allow wallpaper tinting in windows</span>
                  <ToggleRight size={24} className="text-blue-500" />
                </div>
              </div>
            </div>
          ) : activeTab === "Apple ID" && githubData ? (
             <div className="w-full max-w-2xl mx-auto p-4 @sm:p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex flex-col items-center mb-6 @sm:mb-8 text-center px-2 overflow-hidden">
                  <img src={githubData.profile.avatar_url} className="w-20 h-20 @sm:w-28 @sm:h-28 rounded-full mb-3 @sm:mb-4 shadow-lg border-2 border-white shrink-0" alt="Avatar" />
                  <h2 className="text-[22px] @sm:text-[26px] font-semibold text-gray-900 tracking-tight break-words max-w-full">{githubData.profile.name || githubData.profile.login}</h2>
                  <p className="text-[12px] @sm:text-[14px] text-gray-500 mt-1 break-all @sm:break-words max-w-full px-2">{githubData.profile.email || `${githubData.profile.login}@users.noreply.github.com`}</p>
                </div>
                
                <div className="space-y-6">
                  <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-gray-200">
                      <p className="text-[13px] text-gray-600 leading-relaxed whitespace-pre-wrap break-words">
                        {githubData.profile.bio || "No bio available."}
                      </p>
                    </div>
                    <div className="flex items-center justify-between p-3 px-4 hover:bg-black/5 cursor-pointer transition-colors" onClick={() => window.open(githubData.profile.html_url, '_blank')}>
                      <div className="flex items-center gap-3">
                        <GithubIcon size={16} className="text-gray-700" />
                        <span className="text-[13px] font-medium text-gray-900">GitHub Profile</span>
                      </div>
                      <ExternalLink size={14} className="text-gray-400" />
                    </div>
                  </div>

                  <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200 gap-4">
                      <span className="text-[13px] text-gray-700 shrink-0">Location</span>
                      <span className="text-[13px] font-medium text-gray-900 text-right break-words">{githubData.profile.location || "Earth"}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200 gap-4">
                      <span className="text-[13px] text-gray-700 shrink-0">Public Repositories</span>
                      <span className="text-[13px] font-medium text-gray-900 text-right">{githubData.profile.public_repos}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 px-4 gap-4">
                      <span className="text-[13px] text-gray-700 shrink-0">Followers</span>
                      <span className="text-[13px] font-medium text-gray-900 text-right">{githubData.profile.followers}</span>
                    </div>
                  </div>

                  <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider ml-1 mt-8 mb-2">Recent Repositories</h3>
                  <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    {githubData.repos.length > 0 ? githubData.repos.map((repo, i) => (
                      <div 
                        key={repo.id} 
                        className={`flex items-center justify-between p-3 px-4 cursor-pointer hover:bg-black/5 transition-colors ${i < githubData.repos.length - 1 ? 'border-b border-gray-200' : ''}`}
                        onClick={() => window.open(repo.html_url, '_blank')}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <BookMarkedIcon size={16} className="text-blue-500 shrink-0" />
                          <div className="truncate">
                            <h4 className="text-[13px] font-medium text-gray-900 truncate">{repo.name}</h4>
                            <p className="text-[11px] text-gray-500 truncate">{repo.description || "No description"}</p>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-400 shrink-0" />
                      </div>
                    )) : (
                      <div className="p-4 text-center text-[13px] text-gray-500">No recent repositories.</div>
                    )}
                  </div>
                </div>
             </div>
          ) : activeTab === "General" ? (
            <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex flex-col items-center mb-8">
                  <Monitor size={64} className="text-blue-500 mb-4 drop-shadow-md" />
                  <h2 className="text-[26px] font-semibold text-gray-900 tracking-tight">macOS Ventura</h2>
                  <p className="text-[14px] text-gray-500 mt-1">Version 13.5.2</p>
              </div>

              <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
                  <span className="text-[13px] text-gray-700">MacBook Pro</span>
                  <span className="text-[13px] font-medium text-gray-900">14-inch, 2023</span>
                </div>
                <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
                  <span className="text-[13px] text-gray-700">Chip</span>
                  <span className="text-[13px] font-medium text-gray-900">Apple M2 Pro</span>
                </div>
                <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
                  <span className="text-[13px] text-gray-700">Memory</span>
                  <span className="text-[13px] font-medium text-gray-900">16 GB</span>
                </div>
                <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
                  <span className="text-[13px] text-gray-700">Startup Disk</span>
                  <span className="text-[13px] font-medium text-gray-900">Macintosh HD</span>
                </div>
                <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
                  <span className="text-[13px] text-gray-700">Serial Number</span>
                  <span className="text-[13px] font-medium text-gray-900">C02X20YZJHD3</span>
                </div>
                <div className="flex items-center justify-between p-3 px-4">
                  <span className="text-[13px] text-gray-700">macOS</span>
                  <span className="text-[13px] font-medium text-gray-900">13.5.2 (22G91)</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 animate-in fade-in duration-300">
               <SettingsIcon size={48} className="mb-4 opacity-20" />
               <p className="text-[14px] font-medium text-gray-500">Settings for {activeTab} are not available yet.</p>
            </div>
          )}

        </div>
      </div>
      
    </div>
    </div>
  );
};

const SettingsWindow = windowWrapper(Settings, "settings");
export default SettingsWindow;
