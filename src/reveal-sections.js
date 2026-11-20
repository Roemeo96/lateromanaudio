export function initializeRevealSections() {
  const sections =
    document.querySelectorAll('.reveal-section');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
    section.classList.add('reveal-pending');
    observer.observe(section);
  });
}
