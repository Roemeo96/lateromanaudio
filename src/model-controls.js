export function initializeModelControls() {
  const model = document.querySelector('.weltgeist-model');
  const actions = document.querySelector('.weltgeist-model-actions');
  if (!model || !actions) return;
  const stage = model.closest('.weltgeist-model-stage');
  const fallback = stage?.querySelector('.model-static-fallback');
  const instructions = stage?.querySelector('[data-model-fallback-message]');
  const buttons = [...actions.querySelectorAll('button')];
  buttons.forEach(button => { button.disabled = true; });
  function showFallback() {
    model.hidden = true;
    if (fallback) fallback.hidden = false;
    if (instructions) instructions.textContent = instructions.dataset.modelFallbackMessage;
    buttons.forEach(button => { button.disabled = true; });
  }
  model.addEventListener('load', () => {
    if (fallback) fallback.hidden = true;
    buttons.forEach(button => { button.disabled = false; });
  });
  model.addEventListener('error', showFallback);
  async function loadViewer() {
    // Leave the product visible on devices without a usable 3D context.
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!context) { showFallback(); return; }
      context.getExtension('WEBGL_lose_context')?.loseContext();
      await import('@google/model-viewer');
    } catch (error) {
      showFallback();
      console.warn('Showing the product photo because 3D could not load.', error);
    }
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      loadViewer();
    }, { rootMargin: '800px 0px' });
    observer.observe(model);
  } else {
    loadViewer();
  }
  actions.addEventListener('click', async event => {
    const action = event.target.closest('[data-model-action]')?.dataset.modelAction;
    if (!action || !model.loaded) return;
    if (action === 'rotate') {
      const { theta, phi, radius } = model.getCameraOrbit();
      model.cameraOrbit = `${theta + Math.PI / 4}rad ${phi}rad ${radius}m`;
      await model.updateComplete;
    } else {
      model.zoom(action === 'zoom-in' ? 3 : -3);
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) model.jumpCameraToGoal();
  });
}
