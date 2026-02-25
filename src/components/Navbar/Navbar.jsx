import "./Navbar.css";
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState("🌙");

  // Add scroll shadow
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 10) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// Active section highlight
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
  return (
    <>
      <nav>
        <div className="container">

          {/* LEFT: Logo */}
          {/* Logo */}
          <div className="nav-left">
            <h1 className="logo">
              <svg width="260" height="60" viewBox="0 0 360 100">
                <text x="0" y="45" className="logo-bracket">{"<"}</text>
                <text x="20" y="45" className="logo-name">Mahshid</text>
                <text x="165" y="45" className="logo-slash">{"/>"}</text>
                <text x="2" y="75" className="logo-sub">FULL-STACK DEVELOPER</text>
              </svg>
            </h1>
          </div>

          {/* CENTER: Theme Toggle */}
          <div className="nav-center">
            <div className="theme-toggle">

              {/* Moon */}
              <span
                className={`theme-icon ${icon === "🌙" ? "active" : ""}`}
                onClick={() => {
                  document.body.classList.remove("light-mode");
                  setIcon("🌙");
                }}
              >
                🌙
              </span>

              {/* Slash */}
              <span className="theme-slash">/</span>

              {/* Sun */}
              <span
                className={`theme-icon ${icon === "☀️" ? "active" : ""}`}
                onClick={() => {
                  document.body.classList.add("light-mode");
                  setIcon("☀️");
                }}
              >
                ☀️
              </span>

            </div>
          </div>

          {/* RIGHT: Menu + Hamburger */}
          <div className="nav-right">

            <ul className={open ? "active" : ""}>
              <li><a href="#home" onClick={() => setOpen(false)}>Home</a></li>
              <li><a href="#skills" onClick={() => setOpen(false)}>Skills</a></li>
              <li><a href="#projects" onClick={() => setOpen(false)}>Projects</a></li>
              <li><a href="#about" onClick={() => setOpen(false)}>About</a></li>
              <li><a href="#contact" onClick={() => setOpen(false)}>Contact</a></li>
            </ul>

            <div
              className={`hamburger ${open ? "open" : ""}`}
              onClick={() => setOpen(!open)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>

          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      ></div>
    </>
  );
}

export default Navbar;