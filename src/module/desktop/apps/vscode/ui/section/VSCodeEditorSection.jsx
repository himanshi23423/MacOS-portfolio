import VSCodeTabs from "../components/VSCodeTabs";
import VSCodeEditor from "../components/VSCodeEditor";

const VSCodeEditorSection = ({
  openFiles, activeFile, onSelectFile, onCloseFile,
  files, modifiedFiles, onContentChange,
  isNarrow,
}) => (
  <>
    <VSCodeTabs
      openTabs={openFiles}
      activeFile={activeFile}
      onSelectFile={onSelectFile}
      onCloseTab={onCloseFile}
    />
    <VSCodeEditor
      files={files}
      activeFile={activeFile}
      openTabs={openFiles}
      modifiedFiles={modifiedFiles}
      onContentChange={onContentChange}
      isNarrow={isNarrow}
    />
  </>
);

export default VSCodeEditorSection;
