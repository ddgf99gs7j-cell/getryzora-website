// getryzora.com — sticky nav, mobile menu, reveal on scroll. No tracking, no third-party code.
document.documentElement.classList.remove("no-js");
const nav = document.querySelector(".nav");
const onScroll = () => nav && nav.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
const btn = document.querySelector(".menu-btn"), links = document.querySelector(".links");
// mobile menu: one place sets the state, so label ("Menu" / "Close"), aria-expanded, aria-label and the opaque header stay in step
const setMenu = open => {
  links.classList.toggle("open", open); if (nav) nav.classList.toggle("menu-open", open);
  btn.setAttribute("aria-expanded", String(open));
  const d = btn.dataset, label = open ? d.labelClose : d.labelOpen, aria = open ? d.ariaClose : d.ariaOpen;
  if (label) btn.textContent = label; if (aria) btn.setAttribute("aria-label", aria);
};
if (btn && links) {
  btn.addEventListener("click", () => setMenu(!links.classList.contains("open")));
  // close after choosing a link (same-page links such as #guided-sleep would otherwise leave it open)
  links.addEventListener("click", ev => { if (ev.target.closest("a")) setMenu(false); });
  // a tap outside the panel and the button only closes the menu (it does not also follow a link underneath)
  document.addEventListener("click", ev => {
    if (links.classList.contains("open") && !links.contains(ev.target) && !btn.contains(ev.target)) {
      ev.preventDefault(); ev.stopPropagation(); setMenu(false);
    }
  }, true);
  // close on Escape and return focus to the button
  document.addEventListener("keydown", ev => {
    if (ev.key === "Escape" && links.classList.contains("open")) { setMenu(false); btn.focus(); }
  });
}
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const items = document.querySelectorAll(".reveal");
if (reduce || !("IntersectionObserver" in window)) items.forEach(e => e.classList.add("in"));
else {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
                                      { rootMargin: "0px 0px -8% 0px" });
  items.forEach(e => io.observe(e));
}
