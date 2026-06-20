import React from "react";
import { Globe } from "lucide-react";

const ChromeBookmarkBar = ({ showBookmarks, bookmarks, navigateTabTo, themeClasses }) => {
  if (!showBookmarks) return null;

  return (
    <div
      className={`shrink-0 px-4 py-1 border-b flex items-center gap-4 text-[10px] font-medium select-none ${themeClasses.bookmarksBg}`}
    >
      {bookmarks.map((bookmark, idx) => (
        <button
          key={idx}
          onClick={() => navigateTabTo(bookmark.url)}
          className={`flex items-center gap-1 px-2 py-0.5 rounded cursor-pointer transition-colors ${themeClasses.bookmarksText}`}
        >
          <Globe className="w-3 h-3 text-sky-600" /> {bookmark.title}
        </button>
      ))}
    </div>
  );
};

export default ChromeBookmarkBar;
