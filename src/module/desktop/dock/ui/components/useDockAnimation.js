import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const useDockAnimation = () => {
  const dockRef = useRef(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const animateIcons = (mouseX) => {
      const icons = dock.querySelectorAll(".dock-icon");
      const { left } = dock.getBoundingClientRect();
      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);
        const intensity = Math.exp(-(distance ** 2.2) / 12000);

        gsap.to(icon, {
          scale: 1 + 0.48 * intensity,
          y: -34 * intensity,
          duration: 0.24,
          ease: "power2.out",
        });
      });
    };

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();
      animateIcons(e.clientX - left);
    };
    const resetIcons = () => {
      const icons = dock.querySelectorAll(".dock-icon");
      icons.forEach((icon) =>
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.34,
          ease: "elastic.out(1, 0.72)",
        }),
      );
    };
    const handlePointerDown = (e) => {
      const icon = e.target.closest(".dock-icon");
      if (!icon || icon.disabled) return;
      gsap.fromTo(
        icon,
        { y: -4 },
        { y: -22, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out" },
      );
    };

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);
    dock.addEventListener("pointerdown", handlePointerDown);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
      dock.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return dockRef;
};

export default useDockAnimation;
