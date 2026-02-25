import "./Contact.css";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("");

  /* ===== Scroll Animation ===== */
  useEffect(() => {
    const section = document.querySelector(".contact");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add("show");
          } else {
            section.classList.remove("show");
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /* ===== Send Email ===== */
  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(
        "service_rscld1h",   // ← Service ID (تو داری)
        "template_8rg8um7",   // ← Template ID بذار اینجا
        form.current,
        "yGHmI3J_KnEvQCHiA"      // ← Public Key بذار اینجا
      )
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
    <section id="contact" className="contact">
      <div className="contact-wrapper">

        <h2 className="contact-title">Contact Me</h2>

        <p className="contact-subtitle">
          Have an idea, project, or collaboration in mind?  
          Let’s build something meaningful.
        </p>

        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
          />

          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
          />

          <button type="submit" className="contact-btn">
            {status === "sending"
              ? "Sending..."
              : status === "success"
              ? "Sent ✓"
              : "Send Message"}
          </button>

          {status === "error" && (
            <p style={{ color: "red", marginTop: "10px" }}>
              Something went wrong. Please try again.
            </p>
          )}
        </form>

      </div>
    </section>
  );
}

export default Contact;