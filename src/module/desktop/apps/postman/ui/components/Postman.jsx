import WindowControls from "@components/WindowControls";
import windowWrapper from "@hoc/windowWrapper";
import PostmanSection from "../section/PostmanSection";
import usePostman from "../../hooks/usePostman";

const Postman = () => {
  const postmanProps = usePostman();

  return (
    <div className="flex flex-col h-full w-full bg-white text-gray-800 font-sans select-none rounded-xl overflow-hidden shadow-2xl border border-zinc-200/80">
      <div
        id="window-header"
        className="shrink-0 bg-[#f3f3f3] border-b border-zinc-200 px-4 py-2 flex items-center justify-between text-xs text-gray-600"
      >
        <div className="flex items-center gap-2">
          <WindowControls target="postman" />
          <span className="font-semibold pl-4 hidden md:inline">
            Postman Agent (Desktop client)
          </span>
        </div>
        <div className="flex-1 text-center font-medium text-[11px] truncate px-4">
          API Request Workspace
        </div>
        <div className="w-16 flex justify-end">
          <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded font-bold">
            POSTMAN
          </span>
        </div>
      </div>

      <PostmanSection {...postmanProps} />
    </div>
  );
};

const PostmanWindow = windowWrapper(Postman, "postman");
export default PostmanWindow;
