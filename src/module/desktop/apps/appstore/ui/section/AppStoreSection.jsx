import { useState, useEffect } from "react";
import { AppWindow } from "lucide-react";
import useWindowsStore from "@store/window";
import { STORE_APPS } from "../components/appStoreData";
import AppStoreNavSection from "./AppStoreNavSection";
import AppStoreSidebarSection from "./AppStoreSidebarSection";
import AppStoreContentSection from "./AppStoreContentSection";
import ProfileOverlay from "../../../appletv/ui/components/ProfileOverlay";

const AppStoreSection = () => {
  const { openWindow, closeWindow } = useWindowsStore();
  const [activeTab, setActiveTab] = useState("discover");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [githubProfile, setGithubProfile] = useState(null);
  
  useEffect(() => {
    fetch("https://api.github.com/users/kuldeeprajput-dev")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.message) {
          setGithubProfile(data);
        }
      })
      .catch((err) => console.error("Error fetching avatar in desktop AppStoreSection:", err));
  }, []);

  const [installStates, setInstallStates] = useState(() => {
    const initial = {};
    STORE_APPS.forEach((app) => {
      initial[app.id] = app.native ? "open" : "get";
    });
    return initial;
  });
  const [activeDownloadId, setActiveDownloadId] = useState(null);
  const [alertApp, setAlertApp] = useState(null);
  const [updatingAll, setUpdatingAll] = useState(false);
  const [updateProgresses, setUpdateProgresses] = useState({});

  const startDownload = (appId) => {
    setInstallStates((prev) => ({
      ...prev,
      [appId]: { status: "downloading", progress: 0 },
    }));
    setActiveDownloadId(appId);
  };

  useEffect(() => {
    if (!activeDownloadId) return;
    const interval = setInterval(() => {
      setInstallStates((prev) => {
        const appState = prev[activeDownloadId];
        if (appState && appState.status === "downloading") {
          const nextProgress = appState.progress + 10;
          if (nextProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => setActiveDownloadId(null), 100);
            return { ...prev, [activeDownloadId]: "open" };
          }
          return {
            ...prev,
            [activeDownloadId]: { ...appState, progress: nextProgress },
          };
        }
        return prev;
      });
    }, 250);
    return () => clearInterval(interval);
  }, [activeDownloadId]);

  const handleOpenApp = (app) => {
    if (app.native) {
      closeWindow("appstore");
      openWindow(app.id);
    } else {
      setAlertApp(app);
    }
  };

  const handleUpdateAll = () => {
    if (updatingAll) return;
    setUpdatingAll(true);
    const appsToUpdate = ["figma", "vscode", "slack"];
    const initialProgress = {};
    appsToUpdate.forEach((id) => {
      initialProgress[id] = 0;
    });
    setUpdateProgresses(initialProgress);
    const interval = setInterval(() => {
      setUpdateProgresses((prev) => {
        let allDone = true;
        const next = { ...prev };
        appsToUpdate.forEach((id) => {
          if (next[id] < 100) {
            next[id] += Math.floor(Math.random() * 15) + 5;
            if (next[id] > 100) next[id] = 100;
            if (next[id] < 100) allDone = false;
          }
        });
        if (allDone) {
          clearInterval(interval);
          setUpdatingAll(false);
        }
        return next;
      });
    }, 300);
  };

  const handleSingleUpdate = (id) => {
    if (updatingAll) return;
    setUpdateProgresses((p) => ({ ...p, [id]: 0 }));
    const updateInterval = setInterval(() => {
      setUpdateProgresses((prev) => {
        const current = prev[id];
        if (current < 100) {
          const nextVal = current + 20;
          if (nextVal >= 100) {
            clearInterval(updateInterval);
            return { ...prev, [id]: 100 };
          }
          return { ...prev, [id]: nextVal };
        }
        return prev;
      });
    }, 200);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl overflow-hidden shadow-2xl border border-black/10 select-none text-gray-800 relative">
      <AppStoreNavSection
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex min-h-0 relative">
        <AppStoreSidebarSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isSidebarOpen={isSidebarOpen}
          onCloseSidebar={() => setIsSidebarOpen(false)}
          githubProfile={githubProfile}
          onProfileClick={() => setShowProfile(true)}
        />

        <AppStoreContentSection
          activeTab={activeTab}
          searchQuery={searchQuery}
          installStates={installStates}
          onStartDownload={startDownload}
          onOpenApp={handleOpenApp}
          handleUpdateAll={handleUpdateAll}
          handleSingleUpdate={handleSingleUpdate}
          updateProgresses={updateProgresses}
          updatingAll={updatingAll}
        />
      </div>

      <ProfileOverlay isOpen={showProfile} onClose={() => setShowProfile(false)} appName="appstore" />

      {alertApp && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-[320px] bg-white rounded-2xl shadow-2xl border border-black/10 p-5 text-center flex flex-col items-center gap-4 animate-fade-in">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <AppWindow className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-gray-800">{alertApp.name} Installed</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {alertApp.name} is successfully installed on your desktop! You can now access and
                run it via custom command simulations inside the Terminal application.
              </p>
            </div>
            <button
              onClick={() => setAlertApp(null)}
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all active:scale-98 shadow-md"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppStoreSection;
