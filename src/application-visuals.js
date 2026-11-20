import './styles/application-visuals.css';

const host = document.querySelector('[data-application-visual]');

if (host) {
  const scenes = {
    modulation: `
      <path class="visual-wave"
        d="M65 140 C95 60 125 60 155 140
           S215 220 245 140 S305 60 335 140
           S395 220 425 140 S485 60 535 140"/>
    `,
    swell: `
      <path class="visual-trace" pathLength="1"
        d="M65 215 C145 215 180 205 225 180
           S310 90 360 75 S460 65 535 65"/>
    `,
    filters: `
      <g class="visual-filter">
        <rect x="250" y="45" width="70" height="180"
          class="visual-band"/>
        <path d="M100 210 C200 210 235 205 255 130
                 S285 45 305 130 S360 210 470 210"/>
      </g>
    `,
    dirt: `
      <path class="visual-clean"
        d="M65 140 C115 45 155 45 205 140
           S295 235 345 140 S435 45 485 140 L535 205"/>
      <path class="visual-dirt"
        d="M65 140 L90 65 H170 L205 140 L235 215
           H315 L345 140 L375 65 H455 L485 140
           L515 215 H535"/>
    `,
    delayReverb: [190, 145, 110, 80, 55, 35]
      .map((height, index) => `
        <path class="visual-echo"
          style="animation-delay:${index * .22}s"
          d="M${90 + index * 84} 225 V${225 - height}"/>
      `).join(''),
    ducking: `
      <path class="visual-trigger"
        d="M65 90 H225 L255 45 L285 90 H535"/>
      <path class="visual-duck"
        d="M65 160 H215 C240 160 240 225 275 225
           C330 225 340 160 410 160 H535"/>
    `,
  };

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.querySelector('[data-particle-motion]');
  let visible = false;

  function synchronize() {
    const paused = !visible || reduced.matches
      || toggle?.getAttribute('aria-pressed') === 'false';
    host.classList.toggle('is-paused', paused);
  }

  function show(scene) {
    if (!scenes[scene]) return;
    host.innerHTML = `
      <svg viewBox="0 0 600 280" focusable="false">
        <circle class="visual-orbit" cx="490" cy="55" r="110"/>
        <path class="visual-guide" d="M55 40 V235 H550"/>
        <g class="visual-signal">${scenes[scene]}</g>
      </svg>`;
    synchronize();
  }

  document.querySelectorAll('[data-scene]').forEach(button => {
    button.addEventListener('click', () => show(button.dataset.scene));
  });

  reduced.addEventListener('change', synchronize);
  toggle?.addEventListener('click', () => {
    requestAnimationFrame(synchronize);
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      synchronize();
    }).observe(host);
  } else {
    visible = true;
  }

  show(document.querySelector(
    '[data-scene][aria-pressed="true"]'
  )?.dataset.scene || 'modulation');
}
