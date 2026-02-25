import "./projects.css";
import { useEffect } from "react";

function Projects() {

  useEffect(() => {
    const cards = document.querySelectorAll(".project-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="projects-title">My Projects</h2>

        <div className="projects-container">

          <div className="project-card">
            <div className="project-image-wrapper">
              <div className="metalgate-img"></div>
              <div className="metalgate-img2"></div>
            </div>

            <h3>Metal Gate Leeds – Portfolio Website</h3>
            <p>
              A fully responsive portfolio website built with React and Next.js,
              designed to showcase services and projects through a clean,
              performance-focused interface.
            </p>

            <a
              href="https://www.metalgateleeds.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="project-btn"
            >
              View Project
            </a>
          </div>

          <div className="project-card in-progress">
            <span className="badge">In Progress</span>

            <div className="project-image-wrapper">
              <div className="busproj-img"></div>
              <div className="busproj-logo"></div>
            </div>

            <h3>Bus Ticket Platform – Go / Fiber / Docker</h3>
            <p>
              End-to-end reservation system built with scalable Go backend,
              RESTful APIs, containerized deployment, and clean architectural
              principles.
            </p>

            <button className="project-btn disabled">
              In Development
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Projects;