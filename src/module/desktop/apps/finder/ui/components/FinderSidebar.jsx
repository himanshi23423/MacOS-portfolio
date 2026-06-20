import { locations } from "@constants";
import clsx from "clsx";

const FinderSidebar = ({ activeLocation, setActiveLocation, isSidebarOpen, isNarrow }) => (
  <div
    className={clsx(
      "sidebar transition-all duration-300 h-full z-20 shrink-0 overflow-y-auto",
      isNarrow ? "absolute bg-gray-50/95 shadow-lg border-r border-gray-200" : "relative",
      isNarrow && !isSidebarOpen
        ? "-translate-x-full w-0 overflow-hidden opacity-0"
        : "translate-x-0 w-48",
    )}
  >
    <div>
      <h3>Favorites</h3>
      <ul>
        {Object.values(locations).map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(item.id === activeLocation.id ? "active" : "not-active")}
          >
            <img src={item.icon} alt={item.name} className="w-4" />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
    <div>
      <h3>Work</h3>
      <ul>
        {locations.work.children.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(item.id === activeLocation.id ? "active" : "not-active")}
          >
            <img src={item.icon} alt={item.name} className="w-4" />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default FinderSidebar;
