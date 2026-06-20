import FinderFileList from "../components/FinderFileList";

const FinderFileListSection = ({ openItem, filteredChildren }) => (
  <div className="flex-1 flex flex-col min-h-0 bg-white">
    <FinderFileList filteredChildren={filteredChildren} openItem={openItem} />
    <div className="shrink-0 bg-gray-50 border-t border-zinc-200 px-4 py-1 text-[10px] text-gray-500 text-center font-medium select-none">
      {filteredChildren.length} {filteredChildren.length === 1 ? "item" : "items"}, 84.5 GB
      available
    </div>
  </div>
);

export default FinderFileListSection;
