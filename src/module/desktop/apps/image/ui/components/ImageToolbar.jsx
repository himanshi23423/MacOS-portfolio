import WindowControls from "@components/WindowControls";

const ImageToolbar = ({ name }) => (
  <div
    id="window-header"
    className="shrink-0 !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2 flex items-center justify-between"
  >
    <WindowControls target={"imgfile"} />
    <h2 className="flex-1 text-center font-bold text-gray-500">{name}</h2>
  </div>
);

export default ImageToolbar;
