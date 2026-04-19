import WindowControls from "#components/WindowControls";
import { projects, socials } from "#constants";
import windowWrapper from "#hoc/windowWrapper";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layout,
  Plus,
  Search,
  Share,
  ShieldHalf,
  PanelLeft,
} from "lucide-react";
import { useState } from "react";

const Safari = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white select-none overflow-hidden rounded-xl">
      {/* Safari Header / Address Bar Area */}
      <div
        id="window-header"
        className="!bg-[#f1f1f1] !border-b-[#d1d1d1] !px-4 !py-2"
      >
        <div className="flex items-center gap-4 w-full">
          <div className="flex items-center gap-2">
            <WindowControls target={"safari"} />
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className={`p-1 rounded hover:bg-black/5 transition-colors ${showSidebar ? "bg-black/5" : ""}`}
            >
              <PanelLeft size={16} className="text-gray-600" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <ChevronLeft
              size={20}
              className="text-gray-400 cursor-not-allowed"
            />
            <ChevronRight
              size={20}
              className="text-gray-400 cursor-not-allowed"
            />
          </div>

          <div className="flex-1 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 bg-white/80 border border-black/5 rounded-lg px-3 py-1 text-sm text-gray-600 shadow-sm backdrop-blur-sm">
              <ShieldHalf size={14} className="text-green-600" />
              <div className="flex-1 flex items-center justify-center gap-1 overflow-hidden">
                <Search size={12} className="text-gray-400" />
                <span className="truncate">kuldeep.dev — Projects</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Share
              size={18}
              className="text-gray-600 cursor-pointer hover:text-black"
            />
            <Plus
              size={18}
              className="text-gray-600 cursor-pointer hover:text-black"
            />
            <Layout
              size={18}
              className="text-gray-600 cursor-pointer hover:text-black"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Optional Sidebar */}
        <div
          className={`bg-[#f9f9f9] border-r border-[#d1d1d1] transition-all duration-300 ease-in-out ${
            showSidebar ? "w-64 opacity-100" : "w-0 opacity-0"
          }`}
        >
          <div className="p-4 w-64">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
              Quick Access
            </h3>
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex gap-3 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded bg-gray-200 flex-shrink-0 overflow-hidden">
                    <img
                      src={project.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase">
                      Project
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Start Page Content */}
        <div className="flex-1 overflow-y-auto relative safari-start-page">
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <img
              src="/images/safari-bg.png"
              className="w-full h-full object-cover"
              alt=""
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-8 py-16">
            {/* Favorites Section */}
            <section className="mb-12">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Favorites
              </h2>
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8">
                {socials.map((favorite) => (
                  <a
                    key={favorite.id}
                    href={favorite.id === 2 ? "https://www.youtube.com" : favorite.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center transition-transform group-hover:scale-105 group-hover:shadow-lg">
                      <img
                        src={favorite.img}
                        alt={favorite.text}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600 group-hover:text-black">
                      {favorite.id === 1
                        ? "Github"
                        : favorite.id === 2
                          ? "Youtube"
                          : favorite.id === 3
                            ? "Twitter/X"
                            : favorite.id === 4
                              ? "LinkedIn"
                              : ""}
                    </span>
                  </a>
                ))}
              </div>
            </section>

            {/* Privacy Report Section */}
            <section className="mb-12">
              <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/40">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <ShieldHalf className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Privacy Report
                      </h3>
                      <p className="text-sm text-gray-500">
                        Safari has protected your projects from 14 trackers this
                        week.
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Featured Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-4">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </a>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-black transition-colors"
                        >
                          {/* <Github size={16} /> */}
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
      </div>
    </div>
  );
};

const SafariWindow = windowWrapper(Safari, "safari");
export default SafariWindow;
