const MARQUEE = ["Go", "React", "Next.js", "PostgreSQL", "Docker", "TypeScript", "Fiber", "Tailwind", "Node.js", "Git"];

const LAYERS = [
  { color: "var(--cyan)", tag: "01 · frontend", title: "What people touch",
    items: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "HTML & CSS"] },
  { color: "var(--violet)", tag: "02 · backend", title: "What keeps it running",
    items: ["Go (Golang)", "Fiber", "Node.js", "PostgreSQL", "REST APIs"] },
  { color: "var(--pink)", tag: "03 · tools & devops", title: "How it ships",
    items: ["Git & GitHub", "Docker", "VS Code", "Vercel"] },
];

function Skills() {
  return (
    <section id="skills" className="sec">
      <div className="wrap">
        <div className="sec-head reveal">
          <div><span className="sec-tag">// the stack</span><h2>Skills &amp; technologies</h2></div>
          <p>Three layers of one system. Hover around, things move.</p>
        </div>
      </div>

      <div className="marquee reveal" aria-hidden="true">
        <div className="track">
          {[...MARQUEE, ...MARQUEE].map((w, i) => (
            <span key={i} style={{ display: "contents" }}><span>{w}</span><em>✦</em></span>
          ))}
        </div>
      </div>

      <div className="wrap">
        <div className="stack">
          {LAYERS.map((l) => (
            <div key={l.tag} className="layer reveal" style={{ "--c": l.color }}>
              <h3>{l.tag}</h3>
              <p className="big">{l.title}</p>
              <div className="pills">
                {l.items.map((s) => <span key={s} className="pill">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
