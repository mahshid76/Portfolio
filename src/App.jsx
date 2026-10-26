import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./Hero/hero";
import Skills from "./Skills/skills";
import Projects from "./Projects/projects";
import About from "./About/about";
import Contact from "./Contact/contact";
import Footer from "./Footer/footer";
import BackToTop from "./components/backtoup/BackToTop";
import { canHover, prefersReducedMotion } from "./lib/motion";

function App() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [spot, setSpot] = useState({ x: "70%", y: "20%" });

  // One throttled scroll listener for progress bar, back-to-top and active link.
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setScrolled(window.scrollY > 500);
      let current = "home";
      document.querySelectorAll("main section").forEach((s) => {
        if (window.scrollY >= s.offsetTop - 140) current = s.id;
      });
      setActive(current);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cursor spotlight.
  useEffect(() => {
    if (!canHover()) return;
    const onMove = (e) => setSpot({ x: `${e.clientX}px`, y: `${e.clientY}px` });
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Reveal sections once as they scroll into view. Anything already on
  // screen stays visible, so the first frame is never empty.
  useEffect(() => {
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.remove("pre");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el, i) => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add("pre");
        el.style.transitionDelay = `${(i % 3) * 90}ms`;
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className="grid-bg" aria-hidden="true"></div>
      <div className="spot" aria-hidden="true" style={{ left: spot.x, top: spot.y }}></div>
      <div id="progress" aria-hidden="true" style={{ width: `${progress}%` }}></div>

      <Navbar active={active} />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
      <BackToTop show={scrolled} />
    </>
  );
}

export default App;
