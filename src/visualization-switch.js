export function initializeVisualizationSwitch() {
  const buttons =
    Array.from(
      document.querySelectorAll(
        '[data-visualization-view]',
      ),
    );

  const transferCurveView =
    document.querySelector(
      '#transfer-curve-view',
    );

  const signalPathView =
    document.querySelector(
      '#signal-path-view',
    );

  if (
    buttons.length === 0
    || !transferCurveView
    || !signalPathView
  ) {
    return;
  }

  const views = {
    'transfer-curve':
      transferCurveView,

    'signal-path':
      signalPathView,
  };

  function activateView(
    viewName,
    focusButton = false,
  ) {
    const activeView =
      views[viewName];

    if (!activeView) {
      return;
    }

    Object.entries(views)
      .forEach(
        ([name, view]) => {
          const isActive =
            name === viewName;

          view.hidden =
            !isActive;

          view.classList.toggle(
            'is-active',
            isActive,
          );
        },
      );

    buttons.forEach(button => {
      const isActive =
        button.dataset
          .visualizationView
        === viewName;

      button.classList.toggle(
        'is-active',
        isActive,
      );

      button.setAttribute(
        'aria-selected',
        String(isActive),
      );

      button.tabIndex =
        isActive
          ? 0
          : -1;

      if (
        isActive
        && focusButton
      ) {
        button.focus();
      }
    });
  }

  buttons.forEach(
    (button, index) => {
      button.addEventListener(
        'click',
        () => {
          activateView(
            button.dataset
              .visualizationView,
          );
        },
      );

      button.addEventListener(
        'keydown',
        event => {
          let nextIndex = null;

          if (
            event.key
            === 'ArrowRight'
          ) {
            nextIndex =
              (index + 1)
              % buttons.length;
          }

          if (
            event.key
            === 'ArrowLeft'
          ) {
            nextIndex =
              (
                index
                - 1
                + buttons.length
              )
              % buttons.length;
          }

          if (
            event.key
            === 'Home'
          ) {
            nextIndex = 0;
          }

          if (
            event.key
            === 'End'
          ) {
            nextIndex =
              buttons.length - 1;
          }

          if (nextIndex === null) {
            return;
          }

          event.preventDefault();

          const nextButton =
            buttons[nextIndex];

          activateView(
            nextButton.dataset
              .visualizationView,
            true,
          );
        },
      );
    },
  );

  const initialButton =
    buttons.find(
      button =>
        button.getAttribute(
          'aria-selected',
        ) === 'true',
    )
    || buttons[0];

  activateView(
    initialButton.dataset
      .visualizationView,
  );
}