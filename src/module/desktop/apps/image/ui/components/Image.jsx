import WindowControls from "@components/WindowControls";
import windowWrapper from "@hoc/windowWrapper";
import useWindowsStore from "@store/window";
import { useState, useEffect } from "react";
import ImageToolbar from "./ImageToolbar";
import ImageViewer from "./ImageViewer";

const Image = () => {
  const { windows } = useWindowsStore();
  const data = windows.imgfile?.data;
  const { name = "Image", imageMobUrl = "", imageUrl = "", id } = data || {};
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <>
        <div
          id="window-header"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 16px",
            background: "#f2f2f7",
            borderBottom: "1px solid #e5e5ea",
            minHeight: 52,
            gap: 10,
            flexShrink: 0,
          }}
        >
          <WindowControls target="imgfile" />
          <p
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: "#000",
              flex: 1,
              textAlign: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </p>
          <div style={{ width: 60 }} />
        </div>
        <ImageViewer
          imageUrl={imageUrl}
          imageMobUrl={imageMobUrl}
          name={name}
          id={id}
          isMobile={true}
        />
      </>
    );
  }

  return (
    <div className="flex flex-col h-full w-full @container bg-white rounded-xl overflow-hidden">
      <ImageToolbar name={name} />
      <ImageViewer
        imageUrl={imageUrl}
        imageMobUrl={imageMobUrl}
        name={name}
        id={id}
        isMobile={false}
      />
    </div>
  );
};

const ImageWindow = windowWrapper(Image, "imgfile");
export default ImageWindow;
