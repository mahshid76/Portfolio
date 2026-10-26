import { useEffect, useState } from "react";

const LINKS = ["home", "skills", "projects", "about", "contact"];

function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "dark"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage can be blocked; the toggle still works for this visit */
    }
  }, [theme]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav>
      <div className="wrap">
        <a className="logo" href="#home" aria-label="Mahshid, home">
          <span className="logo-main">
            <span className="br">&lt;</span>
            <span className="nm">
              {"Mahshid".split("").map((ch, i) => (
                <span key={i} style={{ transitionDelay: `${i * 30}ms` }}>{ch}</span>
              ))}
            </span>
            <span className="sl">/&gt;</span>
            <span className="caret"></span>
          </span>
          <span className="logo-sub">FULL-STACK DEVELOPER</span>
        </a>

        <div className="nav-right">
          <ul className={`nav-links ${open ? "open" : ""}`} id="navLinks">
            {LINKS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={active === id ? "active" : ""}
                  onClick={() => setOpen(false)}
                >
                  {id[0].toUpperCase() + id.slice(1)}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="toggle"
            aria-label="Switch dark or light theme"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <span>🌙</span>
            <span>☀️</span>
          </button>

          <button
            className="burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="navLinks"
            onClick={() => setOpen(!open)}
          >
            <i></i>
            <i></i>
            <i></i>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
