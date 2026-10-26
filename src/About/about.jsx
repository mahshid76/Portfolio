import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../lib/motion";

const GLYPHS = "!<>-_\\/[]{}=+*^?#";
const WORD = "isn't";

function CountUp({ to }) {
  const ref = useRef(null);
  const [value, setValue] = useState(prefersReducedMotion() ? to : 0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let timer;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      let v = 0;
      timer = setInterval(() => {
        setValue(++v);
        if (v >= to) clearInterval(timer);
      }, 70);
    }, { threshold: 0.6 });
    io.observe(ref.current);
    return () => { io.disconnect(); clearInterval(timer); };
  }, [to]);

  return <b ref={ref}>{value}</b>;
}

function About() {
  const wordRef = useRef(null);
  const [word, setWord] = useState(WORD);
  const timer = useRef(null);

  const scramble = () => {
    if (prefersReducedMotion()) return;
    clearInterval(timer.current);
    let f = 0;
    timer.current = setInterval(() => {
      setWord(WORD.split("").map((ch, i) => (i < f / 3 ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join(""));
      if (++f > WORD.length * 3) {
        clearInterval(timer.current);
        setWord(WORD);
      }
    }, 45);
  };

  // Play the scramble once when the statement comes into view.
  useEffect(() => {
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) { scramble(); io.disconnect(); }
    }, { threshold: 0.6 });
    io.observe(wordRef.current);
    return () => { io.disconnect(); clearInterval(timer.current); };
  }, []);

  return (
    <section id="about" className="sec">
      <div className="wrap about">
        <div className="reveal">
          <span className="sec-tag">// about me</span>
          <p className="statement" onPointerEnter={scramble}>
            I build systems that feel <span className="hl">simple</span>, even when the architecture{" "}
            <span className="scr" ref={wordRef}>{word}</span>.
          </p>
          <p>
            I'm Mahshid, a full-stack developer focused on clarity, performance and thoughtful
            design. I like working across the whole stack, balancing backend logic with clean
            user experiences, and making products that are reliable, scalable and intentional.
          </p>
          <div className="facts">
            <div className="fact"><CountUp to={2} /><span>featured projects</span></div>
            <div className="fact"><CountUp to={12} /><span>technologies</span></div>
            <div className="fact"><b>:8080</b><span>favourite port</span></div>
          </div>
        </div>

        <div className="duo">
          <div className="duo-card reveal">
            <h3 style={{ color: "var(--violet)" }}>{"{ }"} Logic</h3>
            <p>Clean architecture, scalable backend systems and maintainable codebases built to last.</p>
            <div className="meter"><i style={{ "--w": "88%" }}></i></div>
          </div>
          <div className="duo-card reveal">
            <h3 style={{ color: "var(--cyan)" }}>◎ Experience</h3>
            <p>Interfaces that feel smooth, intuitive and thoughtfully designed for real users.</p>
            <div className="meter"><i style={{ "--w": "82%" }}></i></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
