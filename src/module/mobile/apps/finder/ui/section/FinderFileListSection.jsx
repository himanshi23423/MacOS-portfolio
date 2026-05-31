import FinderFileList from "../components/FinderFileList";
import FinderFileContextMenu from "../components/FinderFileContextMenu";

const FinderFileListSection = ({
  activeLocation,
  openItem,
  _files,
  _viewMode,
  _selectedFile,
  _onSelectFile,
  _onDoubleClickFile,
  _onContextMenu,
  _contextMenu,
}) => (
  <>
    <FinderFileList activeLocation={activeLocation} openItem={openItem} />
    <FinderFileContextMenu />
  </>
);

export default FinderFileListSection;
