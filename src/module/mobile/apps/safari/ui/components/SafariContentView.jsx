import { ChevronRight, ExternalLink, ShieldHalf } from "lucide-react";

const SafariContentView = ({ socials, projects }) => {
  return (
    <div className="flex-1 overflow-y-auto relative safari-start-page bg-white">
      <div className="relative z-10 max-w-4xl mx-auto px-8 py-16">
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Favorites</h2>
          <div className="grid grid-cols-3 @md:grid-cols-4 @lg:grid-cols-6 @xl:grid-cols-8 gap-6 @md:gap-8">
            {socials.map((favorite) => (
              <a
                key={favorite.id}
                href={favorite.id === 2 ? "https://www.youtube.com" : favorite.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center transition-transform group-hover:scale-105 group-hover:shadow-lg">
                  <img src={favorite.img} alt={favorite.text} className="w-8 h-8 object-contain" />
                </div>
                <span className="text-xs font-medium text-gray-600 group-hover:text-black">
                  {favorite.id === 1
                    ? "Github"
                    : favorite.id === 2
                      ? "Youtube"
                      : favorite.id === 3
                        ? "Twitter/X"
                        : "LinkedIn"}
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/40">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShieldHalf className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Privacy Report</h3>
                  <p className="text-sm text-gray-500">
                    Safari has protected your projects from 14 trackers this week.
                  </p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Featured Projects</h2>
          <div className="grid grid-cols-1 @md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm border border-white/40 transition-transform hover:translate-y-[-4px]"
              >
                <div className="h-48 bg-gray-200">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex items-center gap-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-black transition-colors"
                    >
                      Source
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SafariContentView;
