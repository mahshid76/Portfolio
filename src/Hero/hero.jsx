import { useEffect, useRef, useState } from "react";
import { FaReact, FaDocker } from "react-icons/fa";
import { magnetic, canHover, prefersReducedMotion } from "../lib/motion";

const PHRASES = [
  "building APIs in Go",
  "designing React interfaces",
  "shipping with Docker",
  "modelling data in Postgres",
  "booking seat 07 to London",
];

// [className, text] segments of the Go snippet typed in the hero.
const CODE = [
  ["c", "// API Server\n"], ["k", "func "], ["f", "main"], ["", "() {\n"],
  ["", "  app := fiber."], ["f", "New"], ["", "()\n"],
  ["", "  app."], ["f", "Get"], ["", "("], ["s", '"/tickets"'], ["", ", list)\n"],
  ["", "  app."], ["f", "Post"], ["", "("], ["s", '"/reserve"'], ["", ", reserve)\n"],
  ["", "  app."], ["f", "Listen"], ["", "("], ["s", '":8080"'], ["", ")\n"], ["", "}"],
];
const CODE_LENGTH = CODE.reduce((n, [, t]) => n + t.length, 0);

const TICKETS = [
  { cls: "t1", title: "Concert Ticket", sub: "Status: Available", seat: "A4" },
  { cls: "t2", title: "Flight Ticket", sub: "Status: Confirmed", seat: "12C" },
  { cls: "t3", title: "Bus Ticket", sub: "Leeds → London", seat: "07" },
];

function renderCode(count) {
  const out = [];
  let left = count;
  for (let i = 0; i < CODE.length && left > 0; i++) {
    const [cls, text] = CODE[i];
    const part = text.slice(0, left);
    left -= part.length;
    out.push(cls ? <span key={i} className={cls}>{part}</span> : part);
  }
  return out;
}

function Hero() {
  const reduce = prefersReducedMotion();
  const [phrase, setPhrase] = useState(PHRASES[0]);
  const [typed, setTyped] = useState(reduce ? CODE_LENGTH : 0);
  const [stage, setStage] = useState(reduce ? 3 : 0); // 0 typing, 1 run, 2 server up, 3 connected
  const [cvSaved, setCvSaved] = useState(false);
  const sceneRef = useRef(null);
  const packetRef = useRef(null);

  // Rotating "currently …" line: delete, then type the next phrase.
  useEffect(() => {
    if (reduce) return;
    let i = 1, text = PHRASES[0], timer;
    const del = () => {
      text = text.slice(0, -1);
      setPhrase(text);
      timer = setTimeout(text ? del : add, text ? 28 : 55);
    };
    const add = () => {
      const target = PHRASES[i % PHRASES.length];
      text = target.slice(0, text.length + 1);
      setPhrase(text);
      if (text === target) {
        i++;
        timer = setTimeout(del, 2200);
      } else timer = setTimeout(add, 55);
    };
    timer = setTimeout(del, 2200);
    return () => clearTimeout(timer);
  }, [reduce]);

  // Type the Go server, start it, send a packet to the frontend, show tickets.
  useEffect(() => {
    if (reduce) return;
    if (typed < CODE_LENGTH) {
      const t = setTimeout(() => setTyped(typed + 1), 22);
      return () => clearTimeout(t);
    }
    const timers = [
      setTimeout(() => setStage(1), 300),
      setTimeout(() => setStage(2), 800),
      setTimeout(() => {
        packetRef.current?.animate?.(
          [
            { opacity: 0, left: "42%", top: "62%" },
            { opacity: 1, offset: 0.2 },
            { opacity: 1, left: "70%", top: "30%" },
            { opacity: 0, left: "74%", top: "26%" },
          ],
          { duration: 900, easing: "cubic-bezier(.5,0,.3,1)" }
        );
      }, 1200),
      setTimeout(() => setStage(3), 2000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [typed, reduce]);

  const onSceneMove = (e) => {
    if (!canHover()) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    sceneRef.current.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 16}deg)`;
  };

  return (
    <section id="home" className="hero">
      <div className="wrap">
        <div className="hero-copy">
          <span className="eyebrow"><span className="dot"></span>Open to work</span>
          <h1>
            Hi, I'm <span className="name">Mahshid</span>.<br />
            I turn ideas into working systems.
          </h1>
          <div className="rotator" aria-live="polite">
            &gt; currently <b>{phrase}</b><span className="cur"></span>
          </div>
          <p className="lead">
            Full-stack developer who writes maintainable backend code and builds
            frontends that feel smooth to use. Go and Fiber on the server, React
            and Next.js in the browser.
          </p>
          <div className="btns">
            <a href="#projects" className="btn btn-primary" {...magnetic}>
              View projects
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <a href="#contact" className="btn btn-ghost" {...magnetic}>Contact me</a>
            <a
              href="/Mahshid_CV.pdf"
              download
              className="btn btn-ghost"
              onClick={() => { setCvSaved(true); setTimeout(() => setCvSaved(false), 2000); }}
              {...magnetic}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>
              {cvSaved ? "CV ✓" : "CV"}
            </a>
          </div>
        </div>

        <div
          className="scene-wrap"
          onPointerMove={onSceneMove}
          onPointerLeave={() => (sceneRef.current.style.transform = "")}
        >
          <div className="scene" ref={sceneRef}>
            <div className="orb"></div>

            <div className="win code">
              <div className="win-bar"><i></i><i></i><i></i><span className="t">backend / server.go</span></div>
              <pre aria-label="Go server code">
                {renderCode(typed)}
                {typed < CODE_LENGTH && <span style={{ borderLeft: "2px solid var(--cyan)" }}></span>}
              </pre>
              <div className="term">
                {stage === 0 ? "$" : stage === 1 ? "$ go run ." : "$ go run . → Server running on :8080 ✓"}
              </div>
            </div>

            <div className="win ui">
              <div className="win-bar">
                <i></i><i></i><i></i><span className="t">frontend / app.jsx</span>
                <span className={`badge ${stage === 3 ? "ok" : ""}`}>{stage === 3 ? "Connected ✓" : "waiting…"}</span>
              </div>
              <div className="tickets">
                {TICKETS.map((t, i) => (
                  <div
                    key={t.title}
                    className={`ticket ${t.cls} ${stage === 3 ? "in" : ""}`}
                    style={{ transitionDelay: `${i * 220}ms` }}
                  >
                    <b>{t.title}</b><small>{t.sub}</small><span className="seat">{t.seat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="packet" ref={packetRef}></div>

            <div className="chip" style={{ left: "30%", top: "-2%", animationDelay: "-1s", color: "#00add8" }} title="Go">GO</div>
            <div className="chip" style={{ right: "-3%", bottom: "16%", animationDelay: "-2.5s", color: "#61dafb" }} title="React"><FaReact /></div>
            <div className="chip" style={{ left: "14%", bottom: 0, animationDelay: "-.5s", color: "#336791" }} title="PostgreSQL">PG</div>
            <div className="chip" style={{ left: "44%", bottom: "-2%", animationDelay: "-3.2s", color: "#f7df1e" }} title="JavaScript">JS</div>
            <div className="chip" style={{ right: "-3%", top: "-6%", animationDelay: "-4s", color: "#2496ed" }} title="Docker"><FaDocker /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
