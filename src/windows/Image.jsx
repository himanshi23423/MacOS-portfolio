import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/windowWrapper";
import useWindowsStore from "#store/window";
import { useState, useEffect } from "react";

const Image = () => {
  const { windows } = useWindowsStore();
  const data = windows.imgfile?.data;
  console.log(data);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { name = "Image", imageMobUrl = "", imageUrl = "" } = data || {};

  if (isMobile) {
    return (
      <>
        <div
          id="window-header"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 16px",
            background: "red",
            borderBottom: "none",
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
              color: "#fff",
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

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
            overflow: "hidden",
          }}
        >
          {imageUrl ? (
            <img
              src={imageMobUrl ? imageMobUrl : imageUrl}
              alt={name}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          ) : null}
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col h-full w-full @container bg-white rounded-xl overflow-hidden">
      <div id="window-header" className="shrink-0 !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2 flex items-center justify-between">
        <WindowControls target={"imgfile"} />
        <h2 className="flex-1 text-center font-bold text-gray-500">{name}</h2>
      </div>

      <div className="flex-1 overflow-hidden flex items-center justify-center bg-gray-50 p-2 @sm:p-4">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-contain drop-shadow-md rounded-md"
          />
        ) : null}
      </div>
    </div>
  );
};

const ImageWindow = windowWrapper(Image, "imgfile");
export default ImageWindow;
