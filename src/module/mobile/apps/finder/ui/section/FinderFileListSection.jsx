import FinderFileList from "../components/FinderFileList";
import FinderFileContextMenu from "../components/FinderFileContextMenu";

const FinderFileListSection = ({
  activeLocation,
  openItem,
  files,
  viewMode,
  selectedFile,
  onSelectFile,
  onDoubleClickFile,
  onContextMenu,
  contextMenu,
}) => (
  <>
    <FinderFileList activeLocation={activeLocation} openItem={openItem} />
    <FinderFileContextMenu />
  </>
);

export default FinderFileListSection;
