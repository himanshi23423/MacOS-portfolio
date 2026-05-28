const SafariSidebar = ({ projects }) => {
  return (
    <div className="p-4 w-64">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
        Quick Access
      </h3>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="flex gap-3 cursor-pointer group">
            <div className="w-12 h-12 rounded bg-gray-200 flex-shrink-0 overflow-hidden">
              <img src={project.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                {project.title}
              </p>
              <p className="text-[10px] text-gray-500 mt-1 uppercase">Project</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafariSidebar;
