import { useState, useEffect, useRef } from "react";
import WindowControls from "@components/WindowControls";
import windowWrapper from "@hoc/windowWrapper";
import useWindowsStore from "@store/window";
import PostmanSection from "../section/PostmanSection";
import usePostman from "../../hooks/usePostman";
import PostmanAboutModal from "./PostmanAboutModal";
import { PanelLeft } from "lucide-react";

const Postman = () => {
  const { windows, setWindowData } = useWindowsStore();
  const [showAbout, setShowAbout] = useState(false);
  const postmanProps = usePostman();

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(800);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const isNarrow = containerWidth < 680;
  const isVeryNarrow = containerWidth < 500;

  useEffect(() => {
    if (isNarrow) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isNarrow]);

  useEffect(() => {
    if (windows.postman?.data?.openAbout) {
      setShowAbout(true);
      setWindowData("postman", { ...windows.postman.data, openAbout: false });
    }
  }, [windows.postman?.data?.openAbout, windows.postman?.data, setWindowData]);

  return (
    <>
      <div
        ref={containerRef}
        className="flex flex-col h-full w-full bg-white text-gray-800 font-sans select-none rounded-xl overflow-hidden shadow-2xl border border-zinc-200/80 relative @container"
      >
        <div
          id="window-header"
          className="shrink-0 bg-[#f3f3f3] border-b border-zinc-200 px-4 py-2 flex items-center justify-between text-xs text-gray-600"
        >
          <div className="flex items-center gap-2">
            <WindowControls target="postman" />
            {isNarrow && (
              <button
                onClick={() => setIsSidebarOpen((prev) => !prev)}
                className="p-1 rounded hover:bg-zinc-200 transition-colors ml-1 cursor-pointer text-gray-700 flex items-center justify-center active:scale-95"
                title="Toggle Sidebar"
              >
                <PanelLeft className="w-4 h-4" />
              </button>
            )}
            {!isNarrow && (
              <span className="font-semibold pl-4">Postman Agent (Desktop client)</span>
            )}
          </div>
          {!isVeryNarrow && (
            <div className="flex-1 text-center font-medium text-[11px] truncate px-4">
              API Request Workspace
            </div>
          )}
          <div className="w-16 flex justify-end">
            <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded font-bold">
              POSTMAN
            </span>
          </div>
        </div>

        <PostmanSection
          {...postmanProps}
          isNarrow={isNarrow}
          isVeryNarrow={isVeryNarrow}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={setIsSidebarOpen}
        />
      </div>

      <PostmanAboutModal show={showAbout} onClose={() => setShowAbout(false)} />
    </>
  );
};

const PostmanWindow = windowWrapper(Postman, "postman");
export default PostmanWindow;
