export function initializeDemoCarousel() {
  const carousel =
    document.querySelector(
      '.demo-carousel',
    );

  if (!carousel) {
    return;
  }

  const viewport =
    carousel.querySelector(
      '.demo-carousel-viewport',
    );

  const cards =
    Array.from(
      carousel.querySelectorAll(
        '.demo-card',
      ),
    );

  const status = carousel.querySelector('.demo-carousel-status');

  const previousButton =
    carousel.querySelector(
      '.demo-carousel-previous',
    );

  const nextButton =
    carousel.querySelector(
      '.demo-carousel-next',
    );

  if (
    !viewport
    || cards.length === 0
    || !previousButton
    || !nextButton
  ) {
    return;
  }

  const indicators = cards.map(() => document.createElement('span'));
  status?.replaceChildren(...indicators);

  let activeIndex = 0;

  function getCardScrollPosition(card) {
    return (
      card.offsetLeft
      - cards[0].offsetLeft
    );
  }

  function pauseInactiveVideos() {
    cards.forEach(
      (card, index) => {
        if (index === activeIndex) {
          return;
        }

        const video =
          card.querySelector('video');

        if (video) {
          video.pause();
        }
      },
    );
  }

  function updateControls() {
    cards.forEach((card, index) => {
      card.classList.toggle('is-active', index === activeIndex);
      card.classList.toggle('is-before-active', index < activeIndex);
    });

    indicators.forEach(
      (indicator, index) => {
        indicator.classList.toggle(
          'is-active',
          index === activeIndex,
        );
      },
    );

    previousButton.setAttribute('aria-disabled', String(activeIndex === 0));

    nextButton.setAttribute('aria-disabled', String(activeIndex === cards.length - 1));

    pauseInactiveVideos();
  }

  function goToSlide(index) {
    const newIndex =
      Math.max(
        0,
        Math.min(
          cards.length - 1,
          index,
        ),
      );

    activeIndex =
      newIndex;

    viewport.scrollTo({
      left:
        getCardScrollPosition(
          cards[newIndex],
        ),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });

    updateControls();
  }

  previousButton.addEventListener(
    'click',
    () => {
      if (activeIndex === 0) return;
      goToSlide(
        activeIndex - 1,
      );
    },
  );

  nextButton.addEventListener(
    'click',
    () => {
      if (activeIndex === cards.length - 1) return;
      goToSlide(
        activeIndex + 1,
      );
    },
  );

  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      if (index !== activeIndex) {
        goToSlide(index);
      }
    });
  });

  let scrollFrame = null;

  viewport.addEventListener(
    'scroll',
    () => {
      if (scrollFrame !== null) {
        cancelAnimationFrame(
          scrollFrame,
        );
      }

      scrollFrame =
        requestAnimationFrame(
          () => {
            let closestIndex = 0;
            let closestDistance =
              Infinity;

            cards.forEach(
              (card, index) => {
                const cardPosition =
                  getCardScrollPosition(
                    card,
                  );

                const distance =
                  Math.abs(
                    viewport.scrollLeft
                    - cardPosition,
                  );

                if (
                  distance
                  < closestDistance
                ) {
                  closestDistance =
                    distance;

                  closestIndex =
                    index;
                }
              },
            );

            if (
              closestIndex
              !== activeIndex
            ) {
              activeIndex =
                closestIndex;

              updateControls();
            }

            scrollFrame = null;
          },
        );
    },
    {
      passive: true,
    },
  );

  updateControls();
}
