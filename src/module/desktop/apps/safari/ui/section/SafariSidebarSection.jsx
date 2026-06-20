import SafariSidebar from "../components/SafariSidebar";

const SafariSidebarSection = ({ showSidebar, projects }) => {
  return (
    <div
      className={`bg-white border-r border-[#d1d1d1] transition-all duration-300 ease-in-out overflow-hidden ${
        showSidebar ? "w-64 opacity-100" : "w-0 opacity-0"
      }`}
    >
      <SafariSidebar projects={projects} />
    </div>
  );
};

export default SafariSidebarSection;
