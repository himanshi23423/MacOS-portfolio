import { locations } from "@constants";
import useLocationStore from "@store/location";
import useWindowsStore from "@store/window";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import HomeFolder from "./HomeFolder";

const projects = locations.work?.children ?? [];
const Home = () => {
  const { setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowsStore();
  const handleOpenProjectFinder = (project) => {
    setActiveLocation(project);
    openWindow("finder");
  };

  useGSAP(() => {
    Draggable.create(".folder", {
      bounds: "#folder-bounds",
    });
  }, []);
  return (
    <section id="home">
      <ul>
        {projects.map((project) => (
          <HomeFolder
            key={project.id}
            project={project}
            onClick={() => handleOpenProjectFinder(project)}
          />
        ))}
      </ul>
    </section>
  );
};

export default Home;
