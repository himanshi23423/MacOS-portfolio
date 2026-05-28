import { Folder, FileText, Globe, Image as ImageIcon } from "lucide-react";

export const fileIconMap = {
  folder: <Folder size={28} className="text-blue-500" />,
  txt: <FileText size={28} className="text-gray-500" />,
  url: <Globe size={28} className="text-blue-500" />,
  img: <ImageIcon size={28} className="text-green-500" />,
  fig: <Globe size={28} className="text-gray-700" />,
  pdf: <FileText size={28} className="text-red-500" />,
};
