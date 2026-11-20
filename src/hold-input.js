const level = document.querySelector('#input-level');
const manual = document.querySelector(
  'input[name="input-source"][value="manual"]'
);

if (level && manual) {
  const excluded = [
    'a', 'button', 'input', 'select', 'textarea', 'label',
    'summary', '[contenteditable]:not([contenteditable="false"])',
    '[role="button"]', '[role="slider"]',
    'model-viewer', '.rotary-face'
  ].join(',');

  let pointer = null;
  let frame = null;
  let startTime = 0;
  let startValue = 0;

  function setLevel(value) {
    level.value = String(value);
    level.dispatchEvent(new Event('input', { bubbles: true }));
  }

  function stop() {
    if (pointer === null) return;
    pointer = null;
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    if (manual.checked && !level.disabled) setLevel(0);
  }

  function rise(now) {
    frame = null;
    if (pointer === null) return;

    if (!manual.checked || level.disabled) {
      stop();
      return;
    }

    const value = Math.min(
      1, startValue + (now - startTime) / 1200
    );

    setLevel(value);
    if (value < 1) frame = requestAnimationFrame(rise);
  }

  window.addEventListener('pointerdown', event => {
    if (
      event.defaultPrevented || !event.isPrimary ||
      event.button !== 0 || pointer !== null
    ) return;

    if (
      !manual.checked || level.disabled ||
      !(event.target instanceof Element)
    ) return;

    if (event.target.closest(excluded)) return;

    pointer = event.pointerId;
    startValue = Number(level.value) || 0;
    startTime = performance.now();
    frame = requestAnimationFrame(rise);
  });

  for (const name of ['pointerup', 'pointercancel']) {
    window.addEventListener(name, event => {
      if (event.pointerId === pointer) stop();
    });
  }

  window.addEventListener('blur', stop);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
  });
}
