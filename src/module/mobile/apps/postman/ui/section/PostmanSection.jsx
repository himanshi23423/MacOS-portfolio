import PostmanSidebarSection from "./PostmanSidebarSection";
import PostmanRequestSection from "./PostmanRequestSection";
import PostmanResponseSection from "./PostmanResponseSection";

const PostmanSection = (props) => (
  <div className="flex-1 flex min-h-0 relative">
    <PostmanSidebarSection {...props} />

    <div className="flex-1 flex flex-col min-w-0 bg-white p-4 gap-4 overflow-y-auto">
      <PostmanRequestSection {...props} />
      <PostmanResponseSection {...props} />
    </div>
  </div>
);

export default PostmanSection;
