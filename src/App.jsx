import About from "./About/about";
import Navbar from "./components/Navbar/Navbar";
import Contact from "./Contact/contact";
import Hero from "./Hero/hero";
import Projects from "./Projects/projects";
import Skills from "./Skills/skills";
import BackToTop from "./components/backtoup/BackToTop";
import Footer from "./Footer/footer";
import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const nav = document.querySelector("nav");

    // --- Navbar Shadow + Shrink ---
    const handleNavScroll = () => {
      if (window.scrollY > 50) {
        nav.classList.add("shadow");
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("shadow");
        nav.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleNavScroll);

    // --- Active Link Highlight ---
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    const handleActiveLink = () => {
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
    };
    window.addEventListener("scroll", handleActiveLink);

    // --- Scroll Progress Bar ---
    const progress = document.getElementById("scroll-progress");
    const handleProgress = () => {
      const scrollTop = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      const percent = (scrollTop / height) * 100;
      progress.style.width = percent + "%";
    };
    window.addEventListener("scroll", handleProgress);

    // --- Fade-up Animation ---
    const fadeElements = document.querySelectorAll(".fade-up");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");

            const staggerItems = entry.target.querySelectorAll(".stagger");
            staggerItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("show");
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 },
    );
    <section id="home" className="hero">
  <div className="hero-content">
    <h1 className="hero-title">Hi, I'm <span>Mahshid</span></h1>
    <h2 className="hero-subtitle">Full‑Stack Developer</h2>

    <p className="hero-text">
      I build modern, fast and beautiful web applications.
    </p>

    <a href="#projects" className="hero-btn">View My Work</a>
  </div>
</section>
// Scroll to contact from hero button
const contactBtn = document.getElementById("contact-btn");

if (contactBtn) {
  contactBtn.addEventListener("click", () => {
    const target = document.getElementById("contact");
    const navHeight = document.querySelector("nav").offsetHeight;

    const position = target.offsetTop - navHeight - 10;

    window.scrollTo({
      top: position,
      behavior: "smooth"
    });
  });
}

    fadeElements.forEach((el) => observer.observe(el));

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleNavScroll);
      window.removeEventListener("scroll", handleActiveLink);
      window.removeEventListener("scroll", handleProgress);
    };
  }, []);

  return (
    <>
      <div id="scroll-progress"></div>

      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <About />
      <Contact />
      <BackToTop />
      <Footer />
    </>
  );
}

export default App;
