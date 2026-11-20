// Decorative layers move gently; content and controls never move with them.
const layers = [...document.querySelectorAll('[data-parallax]')];
const preference = matchMedia('(prefers-reduced-motion: reduce)');
const toggle = document.querySelector('[data-particle-motion]');
let frame = null;
function paint() {
  frame = null;
  const enabled = !preference.matches && toggle?.getAttribute('aria-pressed') !== 'false';
  for (const layer of layers) {
    const parent = layer.parentElement.getBoundingClientRect();
    const distance = (innerHeight / 2 - (parent.top + parent.height / 2)) * Number(layer.dataset.parallax);
    layer.style.setProperty('--parallax-y', `${enabled ? Math.max(-44, Math.min(44, distance)) : 0}px`);
  }
}
function schedule() {
  if (frame === null) frame = requestAnimationFrame(paint);
}
addEventListener('scroll', schedule, { passive: true });
addEventListener('resize', schedule, { passive: true });
preference.addEventListener('change', schedule);
toggle?.addEventListener('click', schedule);
schedule();
