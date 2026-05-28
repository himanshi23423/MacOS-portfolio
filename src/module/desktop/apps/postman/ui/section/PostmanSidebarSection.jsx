import PostmanSidebar from "../components/PostmanSidebar";

const PostmanSidebarSection = ({ expandedFolders, setExpandedFolders, loadRequest, url, method }) => (
  <PostmanSidebar
    expandedFolders={expandedFolders}
    setExpandedFolders={setExpandedFolders}
    loadRequest={loadRequest}
    url={url}
    method={method}
  />
);

export default PostmanSidebarSection;
