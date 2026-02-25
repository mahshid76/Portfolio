import "./Footer.css";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer fade-up">
      <div className="container">
        <p>© 2024 Mahshid. All rights reserved.</p>

        <div className="socials">
          <a href="https://github.com/mahshid76" target="_blank">
            <FaGithub size={28} />
          </a>

          <a href="https://www.linkedin.com/in/mahshid-gholipour-8a470a215/" target="_blank">
            <FaLinkedin size={28} />
          </a>

          <a href="https://www.instagram.com/mahshidgholipour/" target="_blank">
            <FaInstagram size={28} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
