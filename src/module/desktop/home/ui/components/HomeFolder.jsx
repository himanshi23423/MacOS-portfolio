import clsx from "clsx";

const HomeFolder = ({ project, onClick }) => {
  const displayName = project.name === "Resume Ats Scanner" ? "Resume ATS" : project.name;
  return (
    <li className={clsx("group folder", project.windowPosition)} onClick={onClick}>
      <img
        src="/images/folder.png"
        alt={displayName}
        className="w-16 h-16 object-contain p-1 rounded-md transition-all duration-200 group-hover:scale-105 pointer-events-none"
      />
      <p>{displayName}</p>
    </li>
  );
};

export default HomeFolder;
