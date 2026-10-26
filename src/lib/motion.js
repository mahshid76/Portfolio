// Shared helpers for pointer effects. All effects switch off on touch
// devices and when the user prefers reduced motion.
export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const canHover = () =>
  window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion();

// Buttons that lean towards the cursor.
export const magnetic = {
  onPointerMove(e) {
    if (!canHover()) return;
    const b = e.currentTarget;
    const r = b.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.18;
    const y = (e.clientY - r.top - r.height / 2) * 0.3;
    b.style.transform = `translate(${x}px, ${y}px)`;
  },
  onPointerLeave(e) {
    e.currentTarget.style.transform = "";
  },
};

// Cards that tilt in 3D and move a light spot with the cursor.
export const tilt = {
  onPointerMove(e) {
    if (!canHover()) return;
    const c = e.currentTarget;
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    c.style.transform = `perspective(900px) rotateY(${(x - 0.5) * 8}deg) rotateX(${(0.5 - y) * 8}deg)`;
    c.style.setProperty("--mx", `${x * 100}%`);
    c.style.setProperty("--my", `${y * 100}%`);
  },
  onPointerLeave(e) {
    e.currentTarget.style.transform = "";
  },
};
