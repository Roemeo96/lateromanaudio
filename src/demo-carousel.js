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

  const indicators =
    Array.from(
      carousel.querySelectorAll(
        '.demo-carousel-status span',
      ),
    );

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
    indicators.forEach(
      (indicator, index) => {
        indicator.classList.toggle(
          'is-active',
          index === activeIndex,
        );
      },
    );

    previousButton.disabled =
      activeIndex === 0;

    nextButton.disabled =
      activeIndex === cards.length - 1;

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
      behavior: 'smooth',
    });

    updateControls();
  }

  previousButton.addEventListener(
    'click',
    () => {
      goToSlide(
        activeIndex - 1,
      );
    },
  );

  nextButton.addEventListener(
    'click',
    () => {
      goToSlide(
        activeIndex + 1,
      );
    },
  );

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