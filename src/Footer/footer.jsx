function Footer() {
  return (
    <footer>
      <div className="wrap">
        <span>© {new Date().getFullYear()} Mahshid Gholipour</span>
        <span className="mono">built with Go-level patience &amp; React</span>
      </div>
    </footer>
  );
}

export default Footer;
