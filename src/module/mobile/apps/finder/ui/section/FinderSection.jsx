import FinderToolbarSection from "./FinderToolbarSection";
import FinderSidebarSection from "./FinderSidebarSection";
import FinderFileListSection from "./FinderFileListSection";

const FinderSection = ({ activeLocation, setActiveLocation, openItem, ...props }) => (
  <div className="flex flex-col h-full w-full @container bg-white rounded-xl overflow-hidden">
    <FinderToolbarSection />
    <div className="bg-white flex h-full finder-main">
      <FinderSidebarSection activeLocation={activeLocation} setActiveLocation={setActiveLocation} />
      <FinderFileListSection activeLocation={activeLocation} openItem={openItem} {...props} />
    </div>
  </div>
);

export default FinderSection;
