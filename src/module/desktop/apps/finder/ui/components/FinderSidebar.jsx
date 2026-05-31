import { locations } from "@constants";
import clsx from "clsx";

const FinderSidebar = ({ activeLocation, setActiveLocation }) => (
  <div className="sidebar">
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
