import PostmanSidebarSection from "./PostmanSidebarSection";
import PostmanRequestSection from "./PostmanRequestSection";
import PostmanResponseSection from "./PostmanResponseSection";

const PostmanSection = (props) => (
  <div className="flex-1 flex min-h-0 relative">
    {props.isNarrow && props.isSidebarOpen && (
      <div
        className="absolute inset-0 bg-black/10 z-10 transition-opacity duration-300 cursor-pointer"
        onClick={() => props.onToggleSidebar(false)}
      />
    )}
    <PostmanSidebarSection {...props} />

    <div className="flex-1 flex flex-col min-w-0 bg-white p-4 gap-4 overflow-y-auto">
      <PostmanRequestSection {...props} />
      <PostmanResponseSection {...props} />
    </div>
  </div>
);

export default PostmanSection;
