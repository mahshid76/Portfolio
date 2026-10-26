import { useState } from "react";
import { tilt } from "../lib/motion";

const TAKEN = new Set([2, 5, 6, 11, 14, 17]);
const pad = (n) => String(n).padStart(2, "0");

// Little seat map that answers like the real reservation API would.
function SeatPicker() {
  const [picked, setPicked] = useState(null);
  const [log, setLog] = useState(<>POST /api/reservations · pick a seat</>);

  const cells = [];
  let n = 0;
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (c === 2) {
        cells.push(<span key={`a${r}`} className="aisle"></span>);
        continue;
      }
      const id = ++n;
      const taken = TAKEN.has(id);
      cells.push(
        <button
          key={id}
          type="button"
          className={`seatb ${taken ? "taken" : ""} ${picked === id ? "pick" : ""}`}
          aria-label={`Seat ${pad(id)}${taken ? ", taken" : ""}`}
          onClick={() => {
            if (taken) return setLog(<>409 Conflict · seat {pad(id)} is taken</>);
            setPicked(id);
            setLog(<>POST /api/reservations {`{seat:${pad(id)}}`} → <b>201 Created</b></>);
          }}
        />
      );
    }
  }

  return (
    <div className="bus">
      <div className="bus-body" role="group" aria-label="Pick a seat">{cells}</div>
      <div className="bus-log" aria-live="polite">{log}</div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="sec">
      <div className="wrap">
        <div className="sec-head reveal">
          <div><span className="sec-tag">// selected work</span><h2>My projects</h2></div>
          <p>One live client site, one backend system in progress. Try booking a seat on the bus.</p>
        </div>

        <div className="projects">
          <article className="card reveal" {...tilt}>
            <div className="media">
              <img
                src="/metalgate-leeds.webp"
                alt="Metal Gate Leeds homepage with a welder at work and a WhatsApp call to action"
                loading="lazy"
              />
              <span className="status"><i></i>Live</span>
            </div>
            <div className="card-body">
              <h3>Metal Gate Leeds</h3>
              <p>A fully responsive business website built with React and Next.js, showing services and past work through a fast, clean interface.</p>
              <div className="tags">
                {["Next.js", "React", "Responsive", "SEO"].map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="btns">
                <a className="btn btn-primary" href="https://www.metalgateleeds.co.uk/" target="_blank" rel="noopener noreferrer">Visit site ↗</a>
              </div>
            </div>
            <span className="shine"></span>
          </article>

          <article className="card reveal" {...tilt}>
            <div className="media">
              <SeatPicker />
              <span className="status dev"><i></i>In development</span>
            </div>
            <div className="card-body">
              <h3>Bus Ticket Platform</h3>
              <p>End-to-end reservation system: a Go backend with RESTful APIs, seat booking, Docker deployment and clean architecture.</p>
              <div className="tags">
                {["Go", "Fiber", "PostgreSQL", "Docker"].map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="btns">
                <a className="btn btn-ghost" href="https://github.com/mahshid76" target="_blank" rel="noopener noreferrer">Follow on GitHub ↗</a>
              </div>
            </div>
            <span className="shine"></span>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Projects;
