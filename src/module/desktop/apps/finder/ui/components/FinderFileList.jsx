const FinderFileList = ({ filteredChildren = [], openItem }) => (
  <ul className="flex-1 p-6 bg-white overflow-y-auto flex flex-wrap content-start gap-6">
    {filteredChildren.map((item) => (
      <li
        key={item.id}
        className="flex flex-col items-center gap-2 cursor-pointer group w-20"
        onClick={() => openItem(item)}
      >
        <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-105">
          <img src={item.icon} alt={item.name} className="max-w-full max-h-full object-contain" />
        </div>
        <p className="text-xs font-medium text-center text-gray-800 line-clamp-2 wrap-break-word w-full px-1">
          {item.name}
        </p>
      </li>
    ))}
    {filteredChildren.length === 0 && (
      <div className="w-full flex flex-col items-center justify-center py-20 text-zinc-400 text-xs italic">
        No items found
      </div>
    )}
  </ul>
);

export default FinderFileList;
