import "./skills.css";
import { useEffect } from "react";


import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaLinux
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiPostgresql,
  SiGo
} from "react-icons/si";

import { VscCode } from "react-icons/vsc";

const skillsData = [
  
  {
    title: "Frontend",
    theme: "frontend",
    items: [
      { name: "React", icon: <FaReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> }
    ]
  },
  {
    title: "Backend",
    theme: "backend",
    items: [
      { name: "Go (Golang)", icon: <SiGo /> },
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "Next.js", icon: <SiNextdotjs />},
    ]
  },
  {
    title: "Tools & DevOps",
    theme: "tools",
    items: [
      { name: "Git & GitHub", icon: <FaGitAlt /> },
      { name: "Docker", icon: <FaDocker /> },
      { name: "VSCode", icon: <VscCode /> }
    ]
  }
];

function Skills() {
  useEffect(() => {
  const cards = document.querySelectorAll(".skill-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show"); // 👈 این باعث ریست میشه
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  cards.forEach((card) => observer.observe(card));

  return () => observer.disconnect();
}, []);
  return (
    <section id="skills" className="skills">
      <h2 className="skills-title">Skills & Technologies</h2>

      <div className="skills-grid">
        {skillsData.map((category, index) => (
          <div
            key={index}
            className={`skill-card ${category.theme}`}
          >
            <h3>{category.title}</h3>
            <ul>
              {category.items.map((skill, i) => (
                <li key={i}>
                  {skill.icon}
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;