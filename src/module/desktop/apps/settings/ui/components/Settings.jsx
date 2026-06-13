import React, { useState, useEffect } from "react";
import windowWrapper from "@hoc/windowWrapper";
import useWindowsStore from "@store/window";
import useSettings from "./useSettings";
import SettingsSidebar from "./SettingsSidebar";
import SettingsPane from "./SettingsPane";
import SettingsAboutModal from "./SettingsAboutModal";

const Settings = () => {
  const { activeTab, setActiveTab, githubData, isLoading, isMobile, mobileView, setMobileView } =
    useSettings();
  const { windows, setWindowData } = useWindowsStore();
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    if (windows.settings?.data?.openAbout) {
      setShowAbout(true);
      setWindowData("settings", { ...windows.settings.data, openAbout: false });
    }
  }, [windows.settings?.data?.openAbout, windows.settings?.data, setWindowData]);

  return (
    <div className="@container w-full h-full">
      <div className="flex h-full w-full bg-[#f3f3f3]/95 backdrop-blur-3xl overflow-hidden rounded-lg font-sans select-none border border-black/10">
        <SettingsSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          githubData={githubData}
          isLoading={isLoading}
          isMobile={isMobile}
          mobileView={mobileView}
          setMobileView={setMobileView}
        />

        <div
          className={`${isMobile ? (mobileView !== "main" ? "flex w-full" : "hidden") : "flex-1 flex min-w-0"} flex-col bg-white`}
        >
          <SettingsPane
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            githubData={githubData}
            isLoading={isLoading}
            isMobile={isMobile}
            mobileView={mobileView}
            setMobileView={setMobileView}
          />
        </div>
      </div>
      <SettingsAboutModal show={showAbout} onClose={() => setShowAbout(false)} />
    </div>
  );
};

const SettingsWindow = windowWrapper(Settings, "settings");
export default SettingsWindow;
