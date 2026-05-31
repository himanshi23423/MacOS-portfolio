import { useState, useEffect } from "react";
import { projects, socials } from "@constants";
import { SafariMobileHeader } from "../components/SafariToolbar";
import SafariToolbarSection from "./SafariToolbarSection";
import SafariSidebarSection from "./SafariSidebarSection";
import SafariContentSection from "./SafariContentSection";

const SafariSection = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return <SafariMobileHeader socials={socials} projects={projects} />;
  }

  return (
    <div className="flex flex-col h-full w-full @container bg-white select-none overflow-hidden rounded-xl">
      <SafariToolbarSection
        showSidebar={showSidebar}
        onToggleSidebar={() => setShowSidebar(!showSidebar)}
      />
      <div className="flex-1 flex min-h-0">
        <SafariSidebarSection showSidebar={showSidebar} projects={projects} />
        <SafariContentSection socials={socials} projects={projects} />
      </div>
    </div>
  );
};

export default SafariSection;
