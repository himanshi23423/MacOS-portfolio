import { FileText } from "lucide-react";

const FinderFileList = ({ activeLocation, openItem }) => (
  <ul className="flex-1 p-6 bg-white overflow-y-auto flex flex-wrap content-start gap-6">
    {activeLocation?.children.map((item) => (
      <li
        key={item.id}
        className="flex flex-col items-center gap-2 cursor-pointer group w-20"
        onClick={() => openItem(item)}
      >
        <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-105">
          <img src={item.icon} alt={item.name} className="max-w-full max-h-full object-contain" />
        </div>
        <p className="text-xs font-medium text-center text-gray-800 line-clamp-2 break-words w-full px-1">
          {item.name}
        </p>
      </li>
    ))}
  </ul>
);

export default FinderFileList;
