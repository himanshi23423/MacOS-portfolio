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
