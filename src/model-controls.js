export function initializeModelControls() {
  const model = document.querySelector('.weltgeist-model');
  const actions = document.querySelector('.weltgeist-model-actions');
  if (!model || !actions) return;

  const loadViewer = () => import('@google/model-viewer').catch(error => {
    console.error('The 3D viewer could not be loaded:', error);
  });

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

  actions.addEventListener('click', async (event) => {
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
