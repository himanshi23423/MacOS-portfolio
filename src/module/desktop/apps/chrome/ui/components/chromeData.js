export const IFRAME_COMPATIBLE_SITES = [
  "openstreetmap.org",
  "example.com",
  "example.org",
  "wttr.in"
];

export const DEFAULT_BOOKMARKS = [
  { title: "Portfolio", url: window.location.origin },
  { title: "GitHub", url: "https://github.com/kuldeeprajput-dev" },
  { title: "LinkedIn", url: "https://www.linkedin.com/in/kuldeepdotcom/" },
  { title: "Twitter", url: "https://x.com/kuldeepdotcom" },
  { title: "Wikipedia", url: "https://en.wikipedia.org" },
  { title: "OpenStreetMap", url: "https://openstreetmap.org" }
];

export const DEFAULT_TABS = [
  {
    id: "tab-1",
    title: "New Tab",
    url: "chrome://newtab",
    history: ["chrome://newtab"],
    historyIndex: 0
  }
];

export const DEFAULT_DOWNLOADS = [
  { name: "Kunal_Resume.pdf", size: "2.4 MB", progress: "Complete", type: "PDF", date: "Today" },
  { name: "Project_Portfolio_Source.zip", size: "14.8 MB", progress: "Complete", type: "ZIP", date: "Yesterday" }
];

export const DEFAULT_PASSWORDS = [
  { id: 1, site: "github.com", username: "kunal-github", password: "githubsecret123", show: false },
  { id: 2, site: "netflix.com", username: "kunal@gmail.com", password: "netfl1xPassword", show: false },
  { id: 3, site: "google.com", username: "kunal.dev", password: "mygooglepwd!", show: false }
];

export const DEFAULT_CARDS = [
  { id: 1, type: "Visa", number: "•••• •••• •••• 4242", holder: "Kunal", expiry: "12/28" },
  { id: 2, type: "Mastercard", number: "•••• •••• •••• 9876", holder: "Kunal", expiry: "08/29" }
];

export const DEFAULT_ADDRESSES = [
  { id: 1, label: "Home", name: "Kunal", street: "123 macOS Lane", city: "Cupertino", state: "CA", zip: "95014" }
];
