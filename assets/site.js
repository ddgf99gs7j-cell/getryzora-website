// getryzora.com — sticky nav, mobile menu, reveal on scroll. No tracking, no third-party code.
document.documentElement.classList.remove("no-js");
const nav = document.querySelector(".nav");
const onScroll = () => nav && nav.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
const btn = document.querySelector(".menu-btn"), links = document.querySelector(".links");
if (btn && links) btn.addEventListener("click", () => {
  const open = links.classList.toggle("open"); btn.setAttribute("aria-expanded", String(open));
});
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const items = document.querySelectorAll(".reveal");
if (reduce || !("IntersectionObserver" in window)) items.forEach(e => e.classList.add("in"));
else {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
                                      { rootMargin: "0px 0px -8% 0px" });
  items.forEach(e => io.observe(e));
}
