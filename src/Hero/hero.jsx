import "./hero.css";
import { useRef } from "react";

import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt
} from "react-icons/fa";

import {
  SiJavascript,
  SiPostgresql,
  SiGo
} from "react-icons/si";

function Hero() {
  const sceneRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = sceneRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 15;
    const rotateX = (y / rect.height - 0.5) * -15;

    sceneRef.current.style.transform =
      `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  };

  const handleMouseLeave = () => {
    sceneRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  /* ===== Scroll Function ===== */
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-left">
        <h1 className="hero-title">
          Full-Stack Developer in Progress
          <span className="highlight">
            Turning Ideas into Working Systems
          </span>
        </h1>

        <p className="hero-subtitle">
          Focused on writing maintainable backend code and building intuitive
          frontend interfaces.
        </p>

        <div className="hero-buttons">
          <button
            className="primary-btn"
            onClick={() => scrollToSection("projects")}
          >
            View Projects
          </button>

          <button
            className="secondary-btn"
            onClick={() => scrollToSection("contact")}
          >
            Contact Me
          </button>
        </div>

        <a href="/Mahshid_CV.pdf" download className="cv-btn">
          ↓ Download CV (PDF)
        </a>
      </div>

      <div className="hero-right">
        <div
          className="dev-scene"
          ref={sceneRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* CORE */}
          <div className="core-wrapper">
            <div className="core frontend-core"></div>
            <div className="core backend-core"></div>
            <div className="core-divider"></div>
          </div>

          {/* FRONTEND ORBIT */}
          <div className="orbit-left">
            <FaReact className="icon fe1" />
            <SiJavascript className="icon fe2" />
            <FaHtml5 className="icon fe3" />
            <FaCss3Alt className="icon fe4" />
          </div>

          {/* BACKEND ORBIT */}
          <div className="orbit-right">
            <SiGo className="icon be1" />
            <FaNodeJs className="icon be2" />
            <SiPostgresql className="icon be3" />
            <FaGitAlt className="icon be4" />
          </div>

          {/* BACKEND WINDOW */}
          <div className="window code-window">
            <div className="window-header">
              <span className="window-title">backend / server.go</span>
            </div>

            <div className="code-lines">
              <span className="line comment">// API Server</span>
              <span className="line">func main() {"{"}</span>
              <span className="line indent">app := fiber.New()</span>
              <span className="line indent">
                app.Get("/tickets", GetTickets)
              </span>
              <span className="line success">
                Server running on :8080 ✓
              </span>
              <span className="line">{"}"}</span>
              <span className="cursor">|</span>
            </div>
          </div>

          {/* FRONTEND WINDOW */}
          <div className="window ui-window">
            <div className="window-header">
              <span className="window-title">frontend / app.jsx</span>
            </div>

            <div className="ui-preview">
              <div className="status-badge">Connected ✓</div>

              <div className="ticket-card">
                <h4>Concert Ticket</h4>
                <p>Status: Available</p>
              </div>

              <div className="ticket-card small">
                <h4>Flight Ticket</h4>
                <p>Status: Confirmed</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;