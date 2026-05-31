import WindowControls from "@components/WindowControls";
import { Search } from "lucide-react";

const FinderToolbar = ({ _title }) => (
  <div id="window-header" className="!bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2 shrink-0">
    <WindowControls target={"finder"} />
    <Search className="icon" />
  </div>
);

export default FinderToolbar;
