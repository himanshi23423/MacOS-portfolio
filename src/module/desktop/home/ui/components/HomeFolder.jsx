import clsx from "clsx";

const HomeFolder = ({ project, onClick }) => {
  const displayName = project.name === "Resume Ats Scanner" ? "Resume ATS" : project.name;
  return (
    <li className={clsx("group folder", project.windowPosition)} onClick={onClick}>
      <img src="/images/folder.png" alt={displayName} />
      <p>{displayName}</p>
    </li>
  );
};

export default HomeFolder;
