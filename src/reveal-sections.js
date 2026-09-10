export function initializeRevealSections() {
  const sections =
    document.querySelectorAll('.reveal-section');

  const observer =
    new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            'is-visible',
          );

          observer.unobserve(
            entry.target,
          );
        });
      },
      {
        threshold: 0.15,
      },
    );

  sections.forEach(section => {
    observer.observe(section);
  });
}