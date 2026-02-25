import "./about.css";
import { useEffect } from "react";

function About() {
  useEffect(() => {
    const section = document.querySelector(".about");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add("show");
          } else {
            section.classList.remove("show");
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about">
      <div className="about-wrapper">

        <span className="about-title">About Me</span>

        <h2 className="about-statement">
          I build systems that feel simple —
          <br />
          even when the architecture isn't.
        </h2>

        <p className="about-description">
          I'm Mahshid, a full-stack developer focused on clarity, performance,
          and thoughtful design. I enjoy working across the stack —
          balancing backend logic with clean user experiences —
          and creating products that are reliable, scalable, and intentional.
        </p>

        <div className="about-split">
          <div className="split-block">
            <h3>Logic</h3>
            <p>
              Clean architecture, scalable backend systems,
              and maintainable codebases that are built to last.
            </p>
          </div>

          <div className="split-block">
            <h3>Experience</h3>
            <p>
              Interfaces that feel smooth, intuitive,
              and thoughtfully designed for real users.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;