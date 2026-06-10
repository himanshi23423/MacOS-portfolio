export const IFRAME_COMPATIBLE_SITES = [
  "openstreetmap.org",
  "wttr.in",
  "example.com",
  "example.org",
  "newtube-ruddy.vercel.app",
  "snsta.vercel.app",
  "resume-ats-omega.vercel.app",
  "docs-editor-ashen.vercel.app"
];

export const DEFAULT_BOOKMARKS = [
  {
    id: 1,
    title: "Portfolio",
    url: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
    img: "/images/portfolio.png",
  },
  { id: 2, title: "NewTube", url: "https://newtube-ruddy.vercel.app/", img: "/images/youtube.png" },
  {
    id: 3,
    title: "Resume ATS",
    url: "https://resume-ats-omega.vercel.app/",
    img: "/images/resume-ats.png"
  },
  {
    id: 4,
    title: "Insta Downloader",
    url: "https://snsta.vercel.app/",
    img: "/images/insta-downloader.png"
  },
  { id: 5, title: "Wikipedia", url: "https://en.wikipedia.org", img: "https://en.wikipedia.org/favicon.ico" },
  { id: 6, title: "OpenStreetMap", url: "https://openstreetmap.org", img: "/images/openstreetmap.png" }
];

export const WALLPAPERS = [
  { id: "white_bg", name: "Pure White", value: "#ffffff" },
  { id: "sequoia", name: "macOS Sequoia", value: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 30%, #FFE066 60%, #4DABF7 100%)" },
  { id: "sonoma", name: "macOS Sonoma", value: "linear-gradient(135deg, #101116 0%, #172554 40%, #1e1b4b 70%, #311042 100%)" },
  { id: "ventura", name: "macOS Ventura", value: "linear-gradient(135deg, #f59e0b 0%, #d97706 20%, #b45309 40%, #7c2d12 70%, #451a03 100%)" },
  { id: "monterey", name: "macOS Monterey", value: "linear-gradient(135deg, #6366f1 0%, #4f46e5 30%, #4338ca 60%, #311042 100%)" },
  { id: "aurora", name: "Safari Aurora", value: "linear-gradient(135deg, #0284c7 0%, #0369a1 20%, #075985 45%, #1e1b4b 75%, #0f172a 100%)" },
  { id: "glass", name: "Frosted Glass", value: "linear-gradient(to right, #ece9e6, #ffffff)" }
];

export const TRACKERS = [
  { name: "doubleclick.net", category: "Advertising", count: 8 },
  { name: "google-analytics.com", category: "Analytics", count: 12 },
  { name: "ads.tiktok.com", category: "Advertising", count: 3 },
  { name: "connect.facebook.net", category: "Social / Tracker", count: 6 },
  { name: "adnxs.com", category: "Advertising", count: 4 },
  { name: "optimizely.com", category: "Analytics", count: 2 },
  { name: "hotjar.com", category: "Analytics", count: 5 },
  { name: "segment.io", category: "Data Manager", count: 3 },
  { name: "criteo.com", category: "Advertising", count: 7 },
  { name: "amazon-adsystem.com", category: "Advertising", count: 9 }
];

export const MOCK_HISTORY = [
  { title: "GitHub - kuldeeprajput-dev", url: "https://github.com/kuldeeprajput-dev", time: "10:14 AM" },
  { title: "LinkedIn Profile", url: "https://www.linkedin.com/in/kuldeepdotcom/", time: "09:45 AM" },
  { title: "React (JavaScript library) - Wikipedia", url: "https://en.wikipedia.org", time: "Yesterday, 4:20 PM" },
  { title: "Google Search: macOS Design Patterns", url: "https://www.google.com/search?q=macOS+Design+Patterns", time: "Yesterday, 2:15 PM" }
];
