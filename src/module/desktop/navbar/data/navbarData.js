const appNames = {
  finder: "Finder",
  safari: "Safari",
  photos: "Photos",
  imgfile: "Photos",
  contact: "Contact",
  terminal: "Terminal",
  settings: "Settings",
  calculator: "Calculator",
  notes: "Notes",
  messages: "Messages",
  appletv: "Apple TV",
  call: "FaceTime",
  appstore: "App Store",
  calendar: "Calendar",
  weather: "Weather",
  vscode: "VS Code",
  postman: "Postman",
  map: "Maps",
  font: "Font Book",
  telegram: "Telegram",
  music: "Music",
  launchpad: "Launchpad",
  resume: "Resume",
};

const getAppMenus = (appId) => {
  const defaultMenus = ["File", "Edit", "View", "Window", "Help"];
  switch (appId) {
    case "finder":
      return ["File", "Edit", "View", "Go", "Window", "Help"];
    case "safari":
      return ["File", "Edit", "View", "History", "Bookmarks", "Window", "Help"];
    case "vscode":
      return ["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Window", "Help"];
    case "music":
      return ["File", "Edit", "Song", "View", "Controls", "Window", "Help"];
    case "photos":
    case "imgfile":
      return ["File", "Edit", "Image", "View", "Window", "Help"];
    case "terminal":
      return ["Shell", "Edit", "View", "Window", "Help"];
    default:
      return defaultMenus;
  }
};

export { appNames, getAppMenus };
