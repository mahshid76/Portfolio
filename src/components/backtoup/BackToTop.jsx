function BackToTop({ show }) {
  return (
    <button
      className={`top ${show ? "show" : ""}`}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
    </button>
  );
}

export default BackToTop;
