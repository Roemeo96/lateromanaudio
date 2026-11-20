// Native ranges provide keyboard, screen-reader and touch-slider operation.
// The circular face additionally supports relative drag, like a hardware knob.
export function initializeRotaryControls() {
  const controls = [...document.querySelectorAll('[data-rotary]')];
  function paint() {
    controls.forEach(control => {
      const range = control.querySelector('input[type="range"]');
      const fraction = (Number(range.value) - Number(range.min)) / (Number(range.max) - Number(range.min));
      control.style.setProperty('--dial-angle', `${-135 + fraction * 270}deg`);
      control.style.setProperty('--dial-sweep', `${fraction * 270}deg`);
    });
  }
  controls.forEach(control => {
    const range = control.querySelector('input[type="range"]');
    const face = control.querySelector('.rotary-face');
    let drag = null;
    face.addEventListener('pointerdown', event => {
      if (event.button !== 0 || drag) return;
      event.preventDefault();
      drag = { pointer: event.pointerId, x: event.clientX, y: event.clientY, value: Number(range.value) };
      face.setPointerCapture(event.pointerId);
      range.focus({ preventScroll: true });
    });
    face.addEventListener('pointermove', event => {
      if (!drag || drag.pointer !== event.pointerId) return;
      const min = Number(range.min), max = Number(range.max), step = Number(range.step) || 1;
      const change = (event.clientX - drag.x + drag.y - event.clientY) / 180 * (max - min);
      const value = Math.max(min, Math.min(max, min + Math.round((drag.value + change - min) / step) * step));
      range.value = String(value);
      range.dispatchEvent(new Event('input', { bubbles: true }));
    });
    function end(event) {
      if (!drag || event.pointerId !== drag.pointer) return;
      drag = null;
    }
    face.addEventListener('pointerup', end);
    face.addEventListener('pointercancel', end);
    face.addEventListener('lostpointercapture', end);
    range.addEventListener('input', paint);
  });
  paint();
}
