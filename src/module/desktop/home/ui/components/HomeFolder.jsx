import clsx from "clsx";

const HomeFolder = ({ project, onClick }) => (
  <li
    className={clsx("group folder", project.windowPosition)}
    onClick={onClick}
  >
    <img src="/images/folder.png" alt={project.name} />
    <p>{project.name}</p>
  </li>
);

export default HomeFolder;
