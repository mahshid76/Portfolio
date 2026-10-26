import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { magnetic } from "../lib/motion";

const SOCIALS = [
  { href: "https://github.com/mahshid76", label: "github.com/mahshid76", Icon: FaGithub },
  { href: "https://www.linkedin.com/in/mahshid-gholipour-8a470a215/", label: "LinkedIn", Icon: FaLinkedin },
  { href: "https://www.instagram.com/mahshidgholipour/", label: "Instagram", Icon: FaInstagram },
];

function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    // Hidden honeypot field: bots fill it, people don't.
    if (form.current.company.value) return;
    setStatus("sending");

    emailjs
      .sendForm("service_rscld1h", "template_8rg8um7", form.current, "yGHmI3J_KnEvQCHiA")
      .then(
        () => {
          setStatus("success");
          form.current.reset();
        },
        (error) => {
          console.log(error);
          setStatus("error");
        }
      );
  };

  return (
    <section id="contact" className="sec">
      <div className="wrap">
        <div className="contact-box reveal">
          <div>
            <span className="sec-tag">// let's talk</span>
            <h2>Say hi <span className="wave">👋</span></h2>
            <p style={{ color: "var(--muted)", maxWidth: "40ch" }}>
              Have an idea, project or collaboration in mind? Let's build something meaningful.
            </p>
            <div className="links">
              {SOCIALS.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">
                  <s.Icon />{s.label}
                </a>
              ))}
            </div>
          </div>

          <form ref={form} onSubmit={sendEmail}>
            <input type="text" name="company" tabIndex="-1" autoComplete="off" aria-hidden="true" hidden />
            <div className="field">
              <input id="f-name" name="user_name" placeholder=" " required autoComplete="name" />
              <label htmlFor="f-name">Your name</label>
            </div>
            <div className="field">
              <input id="f-email" name="user_email" type="email" placeholder=" " required autoComplete="email" />
              <label htmlFor="f-email">Your email</label>
            </div>
            <div className="field">
              <textarea id="f-msg" name="message" placeholder=" " required></textarea>
              <label htmlFor="f-msg">Your message</label>
            </div>
            <button
              className={`btn btn-primary send ${status === "sending" || status === "success" ? "flying" : ""}`}
              type="submit"
              disabled={status === "sending"}
              {...magnetic}
            >
              {status === "sending" ? "Sending…" : status === "success" ? "Sent ✓" : "Send message"}
              <svg className="plane" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" /></svg>
            </button>
            <p className="form-note" aria-live="polite" style={status === "error" ? { color: "var(--pink)" } : undefined}>
              {status === "success" && "Thanks! Your message is on its way. I'll reply soon."}
              {status === "error" && "Your message didn't send. Check your connection and try again, or reach me on LinkedIn."}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
