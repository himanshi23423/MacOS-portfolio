import React, { useState, useEffect, useRef } from "react";
import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/windowWrapper";
import { 
  Search, Send, Info, ChevronLeft, Smile, Menu,
  Check, CheckCheck, Users, Megaphone, User,
  Paperclip, ShieldAlert, Heart, ExternalLink, X,
  Bookmark, Phone, Settings as SettingsIcon, Moon, Sun,
  Lock, Bell, Monitor, ArrowLeft, Camera, Edit2
} from "lucide-react";

// Pre-defined Telegram conversations
const INITIAL_CHATS = [
  {
    id: "bot",
    name: "Telegram Assistant Bot",
    type: "bot",
    avatarColor: "bg-gradient-to-tr from-cyan-400 to-sky-600",
    initials: "TB",
    status: "bot",
    username: "@MacOSTelegramBot",
    bio: "The official helper bot for this macOS Portfolio. Ask me anything!",
    phone: "None",
    messages: [
      { id: 1, text: "Welcome to the Telegram macOS Simulator! ✈️", sender: "them", time: "12:00 PM", status: "read" },
      { id: 2, text: "I can help you navigate this portfolio. Try sending: \n• /start - Reset helper\n• /projects - Browse developer projects\n• /skills - View tech stack\n• /contact - Get contact details", sender: "them", time: "12:01 PM", status: "read" }
    ]
  },
  {
    id: "kuldeep",
    name: "Kuldeep (Developer)",
    type: "user",
    avatarColor: "bg-gradient-to-tr from-blue-500 to-indigo-600",
    initials: "K",
    status: "online",
    username: "@kuldeeprajput_dev",
    bio: "Full Stack Engineer | React, Next.js, Node.js & TypeScript enthusiast.",
    phone: "+91 ••••• •••••",
    messages: [
      { id: 1, text: "Hey! Glad you opened Telegram. Let me know if you have any questions or want to collaborate.", sender: "them", time: "10:30 AM", status: "read" }
    ]
  },
  {
    id: "react_group",
    name: "React Community India",
    type: "group",
    avatarColor: "bg-gradient-to-tr from-teal-400 to-emerald-600",
    initials: "RC",
    status: "142,504 members",
    username: "@react_india",
    bio: "India's largest community for React & Next.js developers.",
    phone: "None",
    messages: [
      { id: 1, text: "Vite 6 is extremely fast! Has anyone migrated their Next.js project yet?", sender: "amit", time: "09:15 AM", status: "read", senderName: "Amit" },
      { id: 2, text: "Vite is primarily for SPAs. For Next.js, you'd use Turbopack.", sender: "sneha", time: "09:18 AM", status: "read", senderName: "Sneha" },
      { id: 3, text: "Ah, right! Thanks for the clarification.", sender: "amit", time: "09:20 AM", status: "read", senderName: "Amit" }
    ]
  },
  {
    id: "portfolio_channel",
    name: "Portfolio Updates",
    type: "channel",
    avatarColor: "bg-gradient-to-tr from-purple-500 to-pink-600",
    initials: "PU",
    status: "1,240 subscribers",
    username: "@kuldeep_updates",
    bio: "Official channel for release logs, new features, and design updates on this macOS portfolio project.",
    phone: "None",
    messages: [
      { id: 1, text: "Release v1.2: Added fully functional light-themed Maps app, Postman client, and interactive Launchpad overlay! 🎉", sender: "channel", time: "Yesterday", status: "read" },
      { id: 2, text: "Release v1.3: Brand new Telegram client interface now live! Open it from the Dock to chat with custom bots and explore channels.", sender: "channel", time: "11:00 AM", status: "read" }
    ]
  }
];

const Telegram = () => {
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("macos_portfolio_telegram");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_CHATS;
  });

  const [activeChatId, setActiveChatId] = useState("bot");
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);

  // Night Mode / Theme styling state
  const [nightMode, setNightMode] = useState(false);

  // Sidebar Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerSection, setDrawerSection] = useState("menu"); // "menu" | "settings" | "profile" | "contacts" | "calls" | "new_group" | "new_channel"

  // User Settings state
  const [userProfile, setUserProfile] = useState({
    name: "Purav Rajput",
    username: "@purav_rajput",
    bio: "Student & Developer | Crafting beautiful macOS desktop portfolios.",
    phone: "+91 98765 43210"
  });

  // Dynamic creation inputs
  const [newGroupName, setNewGroupName] = useState("");
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelBio, setNewChannelBio] = useState("");

  // Chat Bubble Color Selection
  const [chatThemeColor, setChatThemeColor] = useState("blue"); // "blue" | "green" | "purple" | "orange"

  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("macos_portfolio_telegram", JSON.stringify(chats));
  }, [chats]);

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessageText = inputText;
    const timeString = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    
    const userMsgObj = {
      id: Date.now(),
      text: userMessageText,
      sender: "me",
      time: timeString,
      status: "sent"
    };

    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChat.id
          ? { ...c, messages: [...c.messages, userMsgObj] }
          : c
      )
    );
    setInputText("");

    setTimeout(() => {
      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChat.id
            ? {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === userMsgObj.id ? { ...m, status: "read" } : m
                )
              }
            : c
        )
      );
    }, 800);

    // Bot Response logic
    if (activeChat.id === "bot") {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        let reply = "I'm not sure how to process that command. Type `/help` to see what I can do!";
        const cmd = userMessageText.toLowerCase().trim();

        if (cmd.includes("/start")) {
          reply = "Hello! I am your Telegram assistant. Type `/projects`, `/skills`, or `/contact` to browse Kuldeep's portfolio.";
        } else if (cmd.includes("/project")) {
          reply = "Here are some top projects:\n1. **NewTube**: Video platform built with Next.js, Mux & PostgreSQL.\n2. **Free Course Finder**: Learning finder powered by AI.\n3. **Resume ATS Scanner**: ATS CV scoring app.\n4. **Docs Editor**: Live rich-text document collaboration.";
        } else if (cmd.includes("/skill") || cmd.includes("/tech")) {
          reply = "Core Stack:\n• **Frontend**: React, Next.js, TypeScript\n• **Styling**: CSS, Sass, Tailwind CSS\n• **Backend**: Node.js, Express, Bun, tRPC\n• **Databases**: PostgreSQL, MongoDB\n• **Tools**: Git, GitHub, Docker";
        } else if (cmd.includes("/contact")) {
          reply = "Get in touch:\n• Email: kuldeeprajput.dev@gmail.com\n• Twitter: @kuldeepdotcom\n• LinkedIn: /in/kuldeepdotcom";
        } else if (cmd.includes("/help")) {
          reply = "Available Commands:\n• `/start` - Start the helper\n• `/projects` - List developer projects\n• `/skills` - View technical skill list\n• `/contact` - Get direct emails/socials";
        }

        setChats((prev) =>
          prev.map((c) =>
            c.id === "bot"
              ? {
                  ...c,
                  messages: [
                    ...c.messages,
                    {
                      id: Date.now() + 1,
                      text: reply,
                      sender: "them",
                      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                      status: "read"
                    }
                  ]
                }
              : c
          )
        );
      }, 1500);
    } else if (activeChat.id === "kuldeep") {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        let reply = "Awesome! Thanks for reaching out. I'll get back to you as soon as I'm back at my workstation. 💻";
        const normalized = userMessageText.toLowerCase();

        if (normalized.includes("hello") || normalized.includes("hi") || normalized.includes("hey")) {
          reply = "Hey! Hope you are enjoying the macOS portfolio. How's everything going?";
        } else if (normalized.includes("hiring") || normalized.includes("job") || normalized.includes("work")) {
          reply = "I'm currently open to new roles and freelancing opportunities! Let's schedule a call. Drop me a line at kuldeeprajput.dev@gmail.com.";
        }

        setChats((prev) =>
          prev.map((c) =>
            c.id === "kuldeep"
              ? {
                  ...c,
                  messages: [
                    ...c.messages,
                    {
                      id: Date.now() + 2,
                      text: reply,
                      sender: "them",
                      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                      status: "read"
                    }
                  ]
                }
              : c
          )
        );
      }, 1800);
    }
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;
    const newChatObj = {
      id: `group_${Date.now()}`,
      name: newGroupName,
      type: "group",
      avatarColor: "bg-gradient-to-tr from-yellow-500 to-amber-600",
      initials: newGroupName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2),
      status: "1 member",
      username: `@${newGroupName.toLowerCase().replace(/ /g, "_")}`,
      bio: "A custom group created by user.",
      phone: "None",
      messages: [
        { id: 1, text: `Group "${newGroupName}" has been successfully created.`, sender: "them", time: "Just now", status: "read", senderName: "System" }
      ]
    };
    setChats(prev => [newChatObj, ...prev]);
    setActiveChatId(newChatObj.id);
    setNewGroupName("");
    setIsDrawerOpen(false);
  };

  const handleCreateChannel = () => {
    if (!newChannelName.trim()) return;
    const newChatObj = {
      id: `channel_${Date.now()}`,
      name: newChannelName,
      type: "channel",
      avatarColor: "bg-gradient-to-tr from-rose-500 to-red-600",
      initials: newChannelName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2),
      status: "0 subscribers",
      username: `@${newChannelName.toLowerCase().replace(/ /g, "_")}`,
      bio: newChannelBio || "A custom broadcast channel created by user.",
      phone: "None",
      messages: [
        { id: 1, text: `Channel "${newChannelName}" broadcast stream created.`, sender: "channel", time: "Just now", status: "read" }
      ]
    };
    setChats(prev => [newChatObj, ...prev]);
    setActiveChatId(newChatObj.id);
    setNewChannelName("");
    setNewChannelBio("");
    setIsDrawerOpen(false);
  };

  const openSavedMessages = () => {
    // Check if Saved Messages chat is already in chats list
    const hasSaved = chats.some(c => c.id === "saved");
    if (!hasSaved) {
      const savedChat = {
        id: "saved",
        name: "Saved Messages",
        type: "user",
        avatarColor: "bg-gradient-to-tr from-blue-600 to-sky-700",
        initials: "🔖",
        status: "personal cloud storage",
        username: "@my_cloud",
        bio: "Forward messages here to save them. Send media files or notes to store them.",
        phone: "None",
        messages: [
          { id: 1, text: "Welcome to your personal cloud chat! Write ideas, copy logs, or save clips here.", sender: "them", time: "Just now", status: "read" }
        ]
      };
      setChats(prev => [savedChat, ...prev]);
    }
    setActiveChatId("saved");
    setIsDrawerOpen(false);
  };

  const filteredChats = chats.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.messages.some((m) => m.text.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Theme colors styles mapping
  const getThemeClass = (isMe) => {
    if (!isMe) {
      return nightMode 
        ? "bg-zinc-800 text-zinc-100 border border-zinc-700/80" 
        : "bg-white text-gray-800 border border-zinc-200/50";
    }
    switch(chatThemeColor) {
      case "green":
        return "bg-emerald-500 text-white border border-emerald-600";
      case "purple":
        return "bg-purple-500 text-white border border-purple-600";
      case "orange":
        return "bg-orange-500 text-white border border-orange-600";
      case "blue":
      default:
        return nightMode
          ? "bg-sky-950 text-white border border-sky-900"
          : "bg-[#eef5fd] text-gray-900 border border-blue-100";
    }
  };

  return (
    <div className={`flex flex-col h-full w-full rounded-xl overflow-hidden shadow-2xl border transition-colors select-none ${
      nightMode 
        ? "bg-zinc-950 text-zinc-100 border-zinc-800/80" 
        : "bg-white text-gray-800 border-zinc-200"
    }`}>
      
      {/* Telegram Window Title Bar */}
      <div id="window-header" className={`shrink-0 border-b px-4 py-2 flex items-center justify-between text-xs transition-colors ${
        nightMode 
          ? "bg-zinc-900 border-zinc-800 text-zinc-400" 
          : "bg-[#f6f6f6] border-zinc-200 text-gray-600"
      }`}>
        <div className="flex items-center gap-4">
          <WindowControls target="telegram" />
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`md:hidden p-1.5 rounded transition-colors ${
              nightMode ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-200 text-gray-700"
            }`}
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${isSidebarOpen ? "rotate-0" : "rotate-180"}`} />
          </button>
        </div>
        <div className={`flex-1 text-center font-bold hidden md:block ${
          nightMode ? "text-zinc-200" : "text-gray-700"
        }`}>
          Telegram
        </div>
        <div className="w-14" />
      </div>

      {/* Main Body */}
      <div className="flex-1 flex min-h-0 relative">
        
        {/* Chats Sidebar */}
        <div className={`
          absolute md:relative inset-y-0 left-0 w-64 md:w-60 lg:w-64 border-r flex flex-col z-20 transition-all duration-300
          ${nightMode ? "bg-zinc-900 border-zinc-850" : "bg-[#f1f1f3] border-zinc-200"}
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
          {/* Header Search bar + Hamburger */}
          <div className="p-3 flex items-center gap-2.5">
            <button 
              onClick={() => {
                setDrawerSection("menu");
                setIsDrawerOpen(!isDrawerOpen);
              }}
              className={`p-1.5 rounded-lg transition-colors ${
                nightMode ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-200 text-gray-600"
              }`}
              title="Menu Drawer"
            >
              <Menu className="w-4.5 h-4.5" />
            </button>
            <div className={`relative flex items-center flex-1 rounded-lg px-2.5 py-1.5 ${
              nightMode ? "bg-zinc-800" : "bg-zinc-200/80"
            }`}>
              <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-transparent text-xs focus:outline-none border-none outline-none placeholder-gray-400 select-text ${
                  nightMode ? "text-white" : "text-gray-800"
                }`}
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto space-y-0.5 px-2">
            {filteredChats.map((chat) => {
              const isSelected = activeChat.id === chat.id;
              const lastMsg = chat.messages[chat.messages.length - 1];

              return (
                <div
                  key={chat.id}
                  onClick={() => {
                    setActiveChatId(chat.id);
                    if (window.innerWidth < 768) {
                      setIsSidebarOpen(false);
                    }
                  }}
                  className={`p-2.5 flex items-center gap-3 cursor-pointer rounded-lg transition-colors ${
                    isSelected 
                      ? "bg-[#3390ec] text-white" 
                      : nightMode ? "hover:bg-zinc-800/80 text-zinc-300" : "hover:bg-zinc-200/60 text-gray-800"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0 shadow-sm ${chat.avatarColor}`}>
                    {chat.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-semibold text-xs truncate ${isSelected ? "text-white" : nightMode ? "text-zinc-100" : "text-gray-900"}`}>
                        {chat.name}
                      </h4>
                      <span className={`text-[10px] shrink-0 font-medium ${isSelected ? "text-sky-100" : "text-gray-400"}`}>
                        {lastMsg?.time}
                      </span>
                    </div>
                    <p className={`text-[11px] truncate mt-0.5 ${
                      isSelected ? "text-sky-100" : nightMode ? "text-zinc-400" : "text-gray-500"
                    }`}>
                      {chat.type === "channel" ? "📢 " : ""}
                      {lastMsg?.senderName ? `${lastMsg.senderName}: ` : ""}
                      {lastMsg?.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= LEFT SLIDE DRAWER ================= */}
          {isDrawerOpen && (
            <div className={`absolute inset-0 z-30 flex flex-col transition-all duration-300 ${
              nightMode ? "bg-[#181818] border-r border-zinc-800" : "bg-white border-r border-zinc-200"
            }`}>
              
              {/* Back to main view / Drawer header */}
              <div className="p-3 border-b flex items-center gap-3 shrink-0 dark:border-zinc-800">
                <button 
                  onClick={() => {
                    if (drawerSection === "menu") {
                      setIsDrawerOpen(false);
                    } else {
                      setDrawerSection("menu");
                    }
                  }}
                  className={`p-1.5 rounded-lg transition-colors ${
                    nightMode ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-100 text-gray-600"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                 <span className={`font-bold text-xs capitalize ${
                   nightMode ? "text-zinc-200" : "text-gray-700"
                 }`}>
                  {drawerSection === "menu" ? "Back" : drawerSection.replace("_", " ")}
                </span>
              </div>

              {/* Drawer Content Switcher */}
              <div className="flex-1 overflow-y-auto min-h-0">
                {drawerSection === "menu" && (
                  <div className="flex flex-col h-full">
                    {/* User profile details header */}
                    <div className="p-5 text-left flex flex-col items-start gap-3 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-cyan-500/10 shrink-0">
                      <div className="w-14 h-14 rounded-full bg-orange-500 text-white font-bold text-lg flex items-center justify-center shadow-md">
                        P
                      </div>
                      <div>
                        <h4 className={`font-bold text-sm flex items-center gap-1 ${
                          nightMode ? "text-white" : "text-gray-900"
                        }`}>
                          {userProfile.name}
                        </h4>
                        <span className={`text-[10px] ${
                          nightMode ? "text-zinc-400" : "text-gray-500"
                        }`}>Set Emoji Status</span>
                      </div>
                    </div>

                    {/* Navigation Menu Links */}
                    <div className="p-2 space-y-0.5 text-xs text-left">
                      <button 
                        onClick={() => setDrawerSection("profile")}
                        className="w-full p-2.5 rounded-lg flex items-center gap-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-850"
                      >
                        <User className="w-4.5 h-4.5 text-gray-400" />
                        <span>My Profile</span>
                      </button>

                      <button 
                        onClick={() => setDrawerSection("new_group")}
                        className="w-full p-2.5 rounded-lg flex items-center gap-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-850"
                      >
                        <Users className="w-4.5 h-4.5 text-gray-400" />
                        <span>New Group</span>
                      </button>

                      <button 
                        onClick={() => setDrawerSection("new_channel")}
                        className="w-full p-2.5 rounded-lg flex items-center gap-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-850"
                      >
                        <Megaphone className="w-4.5 h-4.5 text-gray-400" />
                        <span>New Channel</span>
                      </button>

                      <button 
                        onClick={() => setDrawerSection("contacts")}
                        className="w-full p-2.5 rounded-lg flex items-center gap-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-850"
                      >
                        <User className="w-4.5 h-4.5 text-gray-400" />
                        <span>Contacts</span>
                      </button>

                      <button 
                        onClick={() => setDrawerSection("calls")}
                        className="w-full p-2.5 rounded-lg flex items-center gap-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-850"
                      >
                        <Phone className="w-4.5 h-4.5 text-gray-400" />
                        <span>Calls</span>
                      </button>

                      <button 
                        onClick={openSavedMessages}
                        className="w-full p-2.5 rounded-lg flex items-center gap-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-850"
                      >
                        <Bookmark className="w-4.5 h-4.5 text-gray-400" />
                        <span>Saved Messages</span>
                      </button>

                      <button 
                        onClick={() => setDrawerSection("settings")}
                        className="w-full p-2.5 rounded-lg flex items-center gap-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-850"
                      >
                        <SettingsIcon className="w-4.5 h-4.5 text-gray-400" />
                        <span>Settings</span>
                      </button>

                      {/* Night Mode Theme Toggle */}
                      <div className="p-2.5 flex items-center justify-between text-xs border-t border-zinc-100 dark:border-zinc-800 mt-2">
                        <div className="flex items-center gap-3">
                          <Moon className="w-4.5 h-4.5 text-gray-400" />
                          <span>Night Mode</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={nightMode}
                            onChange={() => setNightMode(!nightMode)}
                            className="sr-only peer" 
                          />
                          <div className="w-8 h-4.5 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                      </div>
                    </div>

                    <div className="mt-auto p-4 text-[10px] text-gray-400 text-center select-none border-t dark:border-zinc-800">
                      Telegram Desktop<br />Version 6.8.2 – About
                    </div>
                  </div>
                )}

                {/* MY PROFILE EDITING SECTION */}
                {drawerSection === "profile" && (
                  <div className="p-4 space-y-4 text-xs text-left">
                    <div className="flex flex-col items-center gap-2.5 py-4 border-b dark:border-zinc-800">
                      <div className="w-18 h-18 rounded-full bg-orange-500 text-white font-bold text-2xl flex items-center justify-center relative shadow group">
                        P
                        <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                          <Camera className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <span className="text-[10px] text-blue-500 font-bold hover:underline cursor-pointer">Change Profile Photo</span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Display Name</label>
                        <input 
                          type="text" 
                          value={userProfile.name}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-zinc-100 dark:bg-zinc-800 dark:text-white border-none rounded px-3 py-1.5 mt-1 outline-none text-xs focus:ring-1 focus:ring-blue-500 select-text"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Username</label>
                        <input 
                          type="text" 
                          value={userProfile.username}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, username: e.target.value }))}
                          className="w-full bg-zinc-100 dark:bg-zinc-800 dark:text-white border-none rounded px-3 py-1.5 mt-1 outline-none text-xs focus:ring-1 focus:ring-blue-500 select-text"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Phone Number</label>
                        <input 
                          type="text" 
                          value={userProfile.phone}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full bg-zinc-100 dark:bg-zinc-800 dark:text-white border-none rounded px-3 py-1.5 mt-1 outline-none text-xs focus:ring-1 focus:ring-blue-500 select-text"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Bio</label>
                        <textarea 
                          rows="3"
                          value={userProfile.bio}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
                          className="w-full bg-zinc-100 dark:bg-zinc-800 dark:text-white border-none rounded px-3 py-1.5 mt-1 outline-none text-xs resize-none focus:ring-1 focus:ring-blue-500 select-text"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* NEW GROUP CREATOR */}
                {drawerSection === "new_group" && (
                  <div className="p-4 space-y-4 text-xs text-left">
                    <span className="text-[10px] text-gray-400 font-bold block uppercase">Create Group Chat</span>
                    <div>
                      <label className="text-[10px] text-gray-400 font-medium">Group Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Next.js Developers"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        className="w-full bg-zinc-100 dark:bg-zinc-800 dark:text-white border border-zinc-200 dark:border-zinc-700 rounded px-3 py-1.5 mt-1 outline-none focus:border-blue-500 select-text"
                      />
                    </div>
                    <button 
                      onClick={handleCreateGroup}
                      className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors cursor-pointer text-center"
                    >
                      Create Group
                    </button>
                  </div>
                )}

                {/* NEW CHANNEL CREATOR */}
                {drawerSection === "new_channel" && (
                  <div className="p-4 space-y-4 text-xs text-left">
                    <span className="text-[10px] text-gray-400 font-bold block uppercase">Create Broadcast Channel</span>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] text-gray-400 font-medium">Channel Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Daily Tech Bytes"
                          value={newChannelName}
                          onChange={(e) => setNewChannelName(e.target.value)}
                          className="w-full bg-zinc-100 dark:bg-zinc-800 dark:text-white border border-zinc-200 dark:border-zinc-700 rounded px-3 py-1.5 mt-1 outline-none focus:border-blue-500 select-text"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 font-medium">Description</label>
                        <textarea 
                          placeholder="What is this channel about?"
                          rows="3"
                          value={newChannelBio}
                          onChange={(e) => setNewChannelBio(e.target.value)}
                          className="w-full bg-zinc-100 dark:bg-zinc-800 dark:text-white border border-zinc-200 dark:border-zinc-700 rounded px-3 py-1.5 mt-1 outline-none focus:border-blue-500 select-text"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={handleCreateChannel}
                      className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors cursor-pointer text-center"
                    >
                      Create Channel
                    </button>
                  </div>
                )}

                {/* CONTACTS PANEL */}
                {drawerSection === "contacts" && (
                  <div className="p-2 space-y-1 text-xs text-left">
                    <span className="text-[10px] text-gray-400 font-bold px-2.5 block uppercase tracking-wider mb-2">My Contacts</span>
                    {[
                      { name: "Kuldeep (Developer)", role: "@kuldeeprajput_dev", color: "bg-blue-500", initial: "K", id: "kuldeep" },
                      { name: "Amit Kumar", role: "@amit_kumar", color: "bg-teal-500", initial: "A", id: "react_group" },
                      { name: "Sneha Reddy", role: "@sneha_dev", color: "bg-emerald-500", initial: "S", id: "react_group" }
                    ].map(cont => (
                      <div 
                        key={cont.name}
                        onClick={() => {
                          setActiveChatId(cont.id);
                          setIsDrawerOpen(false);
                        }}
                        className="p-2 flex items-center gap-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-850 cursor-pointer"
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${cont.color}`}>
                          {cont.initial}
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900 dark:text-white">{cont.name}</h5>
                          <span className="text-[10px] text-gray-400 block">{cont.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CALLS HISTORY */}
                {drawerSection === "calls" && (
                  <div className="p-3 space-y-2.5 text-xs text-left">
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider mb-1">Recent Call Logs</span>
                    {[
                      { name: "Kuldeep (Developer)", time: "Today, 10:35 AM", type: "Outgoing" },
                      { name: "Kuldeep (Developer)", time: "Yesterday, 2:40 PM", type: "Missed" },
                      { name: "System Assistant", time: "May 25, 4:10 PM", type: "Incoming" }
                    ].map((call, idx) => (
                      <div key={idx} className="border-b dark:border-zinc-800 pb-2 flex justify-between items-center">
                        <div>
                          <h5 className="font-semibold text-gray-900 dark:text-white">{call.name}</h5>
                          <span className="text-[10px] text-gray-400 block">{call.time}</span>
                        </div>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                          call.type === "Missed" ? "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-300" : "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                        }`}>{call.type}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* SETTINGS SUB SECTIONS */}
                {drawerSection === "settings" && (
                  <div className="p-3 text-xs text-left space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Select Chat Theme</span>
                      <div className="flex gap-2.5">
                        {["blue", "green", "purple", "orange"].map(col => (
                          <button 
                            key={col}
                            onClick={() => setChatThemeColor(col)}
                            className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                              col === "blue" ? "bg-blue-500" :
                              col === "green" ? "bg-emerald-500" :
                              col === "purple" ? "bg-purple-500" :
                              "bg-orange-500"
                            } ${chatThemeColor === col ? "border-black scale-110 shadow-md ring-1 ring-blue-400" : "border-transparent hover:scale-105"}`}
                            title={`${col} theme`}
                          />
                        ))}
                      </div>
                    </div>

                    <hr className="border-zinc-100 dark:border-zinc-800" />

                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Privacy & Security</span>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-gray-400" />
                          <span>Passcode Lock</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-8 h-4.5 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-gray-400" />
                          <span>Push Notifications</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-8 h-4.5 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                      </div>
                    </div>

                    <hr className="border-zinc-100 dark:border-zinc-800" />

                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Active Devices</span>
                      <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center gap-2">
                        <Monitor className="w-4 h-4 text-blue-500 shrink-0" />
                        <div>
                          <h6 className="font-bold text-[10px] text-gray-800 dark:text-white">macOS M2 Max</h6>
                          <span className="text-[8px] text-gray-400 block">Safari Browser • Active Now</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col min-w-0 relative transition-colors ${
          nightMode ? "bg-zinc-900" : "bg-[#f4f4f5]"
        }`}>
          
          {/* Chat Pane Header */}
          <div className={`px-5 py-2.5 border-b flex justify-between items-center shrink-0 transition-colors ${
            nightMode ? "bg-zinc-950 border-zinc-850" : "bg-white border-zinc-200"
          }`}>
            <div>
              <h3 className="font-bold text-xs leading-none">{activeChat.name}</h3>
              <span className={`text-[10px] font-medium block mt-1 ${
                activeChat.status === "online" || activeChat.status.includes("cloud") ? "text-[#3390ec]" : "text-gray-400"
              }`}>
                {activeChat.status}
              </span>
            </div>
            
            <button 
              onClick={() => setShowProfileDrawer(!showProfileDrawer)}
              className={`p-2 rounded-lg transition-colors ${
                nightMode 
                  ? `hover:bg-zinc-800 ${showProfileDrawer ? "text-[#3390ec]" : "text-zinc-400"}` 
                  : `hover:bg-zinc-100 ${showProfileDrawer ? "text-[#3390ec]" : "text-gray-500"}`
              }`}
              title="Toggle Info"
            >
              <Info className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Chat Split View */}
          <div className="flex-1 flex min-h-0 overflow-hidden relative">
            
            {/* Messages Body */}
            <div className="flex-1 flex flex-col min-w-0 relative">
              
              {/* Message List */}
              <div className={`flex-1 overflow-y-auto p-4 space-y-3 min-h-0 transition-colors ${
                nightMode ? "bg-[#0c0d14]" : "bg-[#e7ebf0]"
              }`}>
                {activeChat.messages.map((msg) => {
                  const isMe = msg.sender === "me";
                  
                  return (
                    <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[75%] rounded-lg px-3 py-1.5 text-xs shadow-sm relative ${getThemeClass(isMe)}`}>
                        
                        {/* Group Sender Name */}
                        {!isMe && msg.senderName && (
                          <span className="font-bold text-[#3390ec] block mb-0.5 text-[10px]">
                            {msg.senderName}
                          </span>
                        )}

                        <span className="whitespace-pre-wrap leading-relaxed select-text">{msg.text}</span>
                        
                        {/* Meta information row (time + read status) */}
                        <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-gray-400 text-right leading-none select-none">
                          <span>{msg.time}</span>
                          {isMe && (
                            msg.status === "read" ? (
                              <CheckCheck className="w-3 h-3 text-[#3390ec]" />
                            ) : (
                              <Check className="w-3 h-3 text-gray-400" />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className={`rounded-lg px-3.5 py-2 text-xs flex items-center gap-1 ${
                      nightMode ? "bg-zinc-800 text-white" : "bg-white text-gray-700"
                    }`}>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <div className={`p-3 border-t shrink-0 transition-colors ${
                nightMode ? "bg-zinc-950 border-zinc-850" : "bg-white border-zinc-200"
              }`}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2"
                >
                  <button 
                    type="button" 
                    className={`p-1.5 rounded text-gray-450 shrink-0 transition-colors ${
                      nightMode ? "hover:bg-zinc-800 hover:text-zinc-200" : "hover:bg-zinc-200/50 hover:text-gray-700"
                    }`}
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={activeChat.type === "channel" ? "Muted (Channel Broadcast only)" : "Write a message..."}
                    disabled={activeChat.type === "channel"}
                    className={`flex-1 rounded-lg px-3.5 py-2 text-xs focus:outline-none border border-transparent outline-none disabled:opacity-50 select-text ${
                      nightMode 
                        ? "bg-zinc-800 text-white focus:border-zinc-700" 
                        : "bg-zinc-100 text-gray-800 focus:border-zinc-200"
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || activeChat.type === "channel"}
                    className="p-2 bg-[#3390ec] hover:bg-[#2b7bc9] disabled:opacity-45 disabled:pointer-events-none text-white rounded-lg transition-all shrink-0 active:scale-95 flex items-center justify-center cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

            </div>

            {/* Profile detail sidebar */}
            {showProfileDrawer && (
              <div className={`w-64 border-l p-5 overflow-y-auto flex flex-col items-center shrink-0 z-10 text-center relative select-none transition-colors ${
                nightMode ? "bg-[#181818] border-zinc-800" : "bg-[#f8f9fa] border-zinc-200"
              }`}>
                
                <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl text-white shadow-sm mt-3 ${activeChat.avatarColor}`}>
                  {activeChat.initials}
                </div>
                
                <h3 className={`font-bold text-sm mt-3 leading-tight ${
                  nightMode ? "text-white" : "text-gray-900"
                }`}>{activeChat.name}</h3>
                <span className="text-[10px] text-gray-400 block mt-1">{activeChat.username}</span>

                <hr className={`w-full my-4 ${
                  nightMode ? "border-zinc-800" : "border-zinc-200"
                }`} />

                <div className="w-full text-left space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Bio</span>
                    <span className={`text-xs mt-1 block select-text leading-relaxed ${
                      nightMode ? "text-zinc-300" : "text-gray-800"
                    }`}>{activeChat.bio}</span>
                  </div>

                  {activeChat.phone !== "None" && (
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Phone</span>
                      <span className={`text-xs mt-1 block select-text font-mono ${
                        nightMode ? "text-zinc-300" : "text-gray-800"
                      }`}>{activeChat.phone}</span>
                    </div>
                  )}

                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Type</span>
                    <span className={`text-xs mt-1 block capitalize font-medium ${
                      nightMode ? "text-zinc-300" : "text-gray-800"
                    }`}>{activeChat.type}</span>
                  </div>
                </div>

                <hr className={`w-full my-4 ${
                  nightMode ? "border-zinc-800" : "border-zinc-200"
                }`} />

                <div className="w-full text-left">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Shared Information</span>
                  <div className="space-y-1.5">
                    <a
                      href="https://github.com/kuldeeprajput-dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between p-2 border rounded-md text-[11px] text-[#3390ec] transition-colors w-full font-medium ${
                        nightMode ? "bg-zinc-850 border-zinc-750 hover:bg-zinc-800" : "bg-white border-zinc-200 hover:bg-zinc-50"
                      }`}
                    >
                      <span className="truncate">GitHub Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

const TelegramWindow = windowWrapper(Telegram, "telegram");
export default TelegramWindow;
