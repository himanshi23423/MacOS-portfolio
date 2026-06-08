import { useState, useEffect, useRef } from "react";

const NavbarAppMenu = ({ activeAppName, openWindow }) => {
  const [openDropdown, setOpenDropdown] = useState(null); // 'portfolio' | 'projects' | 'contact' | 'resume' | null
  const containerRef = useRef(null);

  const toggleDropdown = (name, e) => {
    e.stopPropagation();
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleAction = (callback) => {
    setOpenDropdown(null);
    if (callback) callback();
  };

  const dropdowns = {
    portfolio: [
      [
        {
          label: `About ${activeAppName}`,
          onClick: () => openWindow("settings", { tab: "General" }),
        },
      ],
      [
        {
          label: "Preferences...",
          meta: "⌘,",
          onClick: () => openWindow("settings"),
        },
        {
          label: "Services",
          meta: "›",
          disabled: true,
        },
      ],
      [
        {
          label: `Hide ${activeAppName}`,
          meta: "⌘H",
          disabled: true,
        },
        {
          label: "Hide Others",
          meta: "⌥⌘H",
          disabled: true,
        },
        {
          label: "Show All",
          disabled: true,
        },
      ],
    ],
    projects: [
      [
        {
          label: "Open Projects Explorer",
          meta: "⌘F",
          onClick: () => openWindow("finder"),
        },
        {
          label: "Developer Workspace",
          meta: "⌥⌘T",
          onClick: () => openWindow("vscode"),
        },
      ],
      [
        {
          label: "View Featured Project",
          onClick: () => openWindow("safari", { url: "https://docs-editor-ashen.vercel.app/" }),
        },
        {
          label: "Launchpad Overview",
          meta: "⇧⌘L",
          onClick: () => openWindow("launchpad"),
        },
      ],
      [
        {
          label: "GitHub Repositories",
          onClick: () => openWindow("safari", { url: "https://github.com/kuldeeprajput-dev" }),
        },
      ],
    ],
    contact: [
      [
        {
          label: "Open Contact Window",
          meta: "⌘C",
          onClick: () => openWindow("contact"),
        },
      ],
      [
        {
          label: "Email Me Directly",
          onClick: () => {
            const mailtoLink = document.createElement("a");
            mailtoLink.href = "mailto:rajputkuldeep23345@gmail.com";
            mailtoLink.click();
          },
        },
      ],
      [
        {
          label: "Connect on LinkedIn",
          onClick: () =>
            openWindow("safari", { url: "https://www.linkedin.com/in/kuldeepdotcom/" }),
        },
        {
          label: "Follow on Twitter / X",
          onClick: () => openWindow("safari", { url: "https://x.com/kuldeepdotcom" }),
        },
      ],
    ],
    resume: [
      [
        {
          label: "Open Resume Viewer",
          meta: "⌘R",
          onClick: () => openWindow("resume"),
        },
      ],
      [
        {
          label: "Download PDF Resume",
          onClick: () => {
            const link = document.createElement("a");
            link.href = "/resume.pdf";
            link.download = "Kuldeep_Rajput_Resume.pdf";
            link.click();
          },
        },
      ],
      [
        {
          label: "Interactive ATS System",
          onClick: () => openWindow("safari", { url: "https://resume-ats-omega.vercel.app/" }),
        },
      ],
    ],
  };

  const renderDropdown = (name) => {
    if (openDropdown !== name) return null;
    const sections = dropdowns[name];

    return (
      <div className="mac-dropdown" role="menu">
        {sections.map((section, sectionIndex) => (
          <div className="apple-menu-section" key={sectionIndex}>
            {section.map((item) => (
              <button
                type="button"
                className="apple-menu-item"
                disabled={item.disabled}
                key={item.label}
                onClick={() => handleAction(item.onClick)}
                role="menuitem"
              >
                <span>{item.label}</span>
                {item.meta && <span className="apple-menu-meta">{item.meta}</span>}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <ul className="nav-links max-sm:hidden" ref={containerRef}>
      <li
        className={`font-bold min-w-[80px] shrink-0 relative rounded select-none ${
          openDropdown === "portfolio" ? "bg-white/15" : "hover:bg-white/10"
        }`}
        onClick={(e) => toggleDropdown("portfolio", e)}
      >
        {activeAppName}
        {renderDropdown("portfolio")}
      </li>
      <li
        className={`relative rounded select-none ${
          openDropdown === "projects" ? "bg-white/15" : "hover:bg-white/10"
        }`}
        onClick={(e) => toggleDropdown("projects", e)}
      >
        Projects
        {renderDropdown("projects")}
      </li>
      <li
        className={`relative rounded select-none ${
          openDropdown === "contact" ? "bg-white/15" : "hover:bg-white/10"
        }`}
        onClick={(e) => toggleDropdown("contact", e)}
      >
        Contact
        {renderDropdown("contact")}
      </li>
      <li
        className={`relative rounded select-none ${
          openDropdown === "resume" ? "bg-white/15" : "hover:bg-white/10"
        }`}
        onClick={(e) => toggleDropdown("resume", e)}
      >
        Resume
        {renderDropdown("resume")}
      </li>
    </ul>
  );
};

export default NavbarAppMenu;
