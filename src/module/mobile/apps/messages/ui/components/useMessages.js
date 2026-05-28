import { useState, useEffect, useRef, useCallback } from "react";
import { INITIAL_CONVERSATIONS } from "./messagesData";

const useMessages = () => {
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem("macos_portfolio_messages");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_CONVERSATIONS;
  });

  const [activeChatId, setActiveChatId] = useState("kuldeep");
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [mutedChats, setMutedChats] = useState({});
  const [callState, setCallState] = useState({
    isOpen: false, type: "audio", status: "ringing",
    micMuted: false, cameraOff: false,
  });
  const [callDuration, setCallDuration] = useState(0);
  const messagesEndRef = useRef(null);

  const activeChat = conversations.find((c) => c.id === activeChatId) || conversations[0];

  useEffect(() => {
    localStorage.setItem("macos_portfolio_messages", JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages, isTyping]);

  useEffect(() => {
    if (activeChat?.unread) {
      setConversations((prev) =>
        prev.map((c) => (c.id === activeChat.id ? { ...c, unread: false } : c))
      );
    }
  }, [activeChatId]);

  useEffect(() => {
    let ringTimer;
    if (callState.isOpen && callState.status === "ringing") {
      ringTimer = setTimeout(() => {
        setCallState((prev) => ({ ...prev, status: "connected" }));
      }, 2500);
    }
    return () => clearTimeout(ringTimer);
  }, [callState.isOpen, callState.status]);

  useEffect(() => {
    let callTimer;
    if (callState.isOpen && callState.status === "connected") {
      callTimer = setInterval(() => { setCallDuration((prev) => prev + 1); }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(callTimer);
  }, [callState.isOpen, callState.status]);

  const triggerCall = useCallback((type) => {
    setCallState({ isOpen: true, type, status: "ringing", micMuted: false, cameraOff: false });
  }, []);

  const endCall = useCallback(() => {
    setCallState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const handleSend = useCallback(() => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeChat.id
          ? { ...c, messages: [...c.messages, newMessage] }
          : c
      )
    );

    const userMsg = inputText.toLowerCase();
    setInputText("");

    if (activeChat.id === "kuldeep") {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        let replyText = "That's cool! Feel free to explore other apps in the dock too.";
        if (userMsg.includes("project")) {
          replyText = "I have built several cool projects! You can check them out in the 'Portfolio' Finder app, or view 'NewTube', 'Snsta', and 'Docs Editor'.";
        } else if (userMsg.includes("skill") || userMsg.includes("tech") || userMsg.includes("stack")) {
          replyText = "My primary tech stack includes React, Next.js, TypeScript, Node.js, Express, Bun, Tailwind CSS, PostgreSQL, and MongoDB. Open the 'Skills' Terminal app to see the complete list!";
        } else if (userMsg.includes("contact") || userMsg.includes("mail") || userMsg.includes("hire")) {
          replyText = "You can contact me via email at kuldeeprajput.dev@gmail.com, or check out my socials (Github, LinkedIn) in the Safari app!";
        } else if (userMsg.includes("hello") || userMsg.includes("hi") || userMsg.includes("hey")) {
          replyText = "Hey there! Hope you are enjoying the macOS portfolio. How can I help you today?";
        }

        const replyMessage = {
          id: Date.now() + 1,
          text: replyText,
          sender: "them",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setConversations((prev) =>
          prev.map((c) =>
            c.id === "kuldeep"
              ? { ...c, messages: [...c.messages, replyMessage] }
              : c
          )
        );
      }, 1200);
    }
  }, [inputText, activeChat]);

  const filteredConversations = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.messages.some((m) => m.text.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatCallTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return {
    conversations,
    activeChat, activeChatId, setActiveChatId,
    inputText, setInputText,
    searchQuery, setSearchQuery,
    isSidebarOpen, setIsSidebarOpen,
    isTyping,
    showInfo, setShowInfo,
    mutedChats, setMutedChats,
    callState, callDuration,
    messagesEndRef,
    triggerCall, endCall,
    handleSend,
    filteredConversations,
    formatCallTime,
    setCallState,
  };
};

export default useMessages;
