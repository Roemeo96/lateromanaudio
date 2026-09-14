export function initializeMobileMenu() {
  const header =
    document.querySelector(
      '.site-header',
    );

  const toggle =
    header?.querySelector(
      '.site-header-menu-toggle',
    );

  const navigation =
    header?.querySelector(
      '#site-header-navigation',
    );

  if (
    !header
    || !toggle
    || !navigation
  ) {
    return;
  }

  const openLabel =
    toggle.dataset.labelOpen
    || 'Open navigation';

  const closeLabel =
    toggle.dataset.labelClose
    || 'Close navigation';

  header.classList.add(
    'has-mobile-menu',
  );

  toggle.hidden = false;

  function setMenuOpen(isOpen) {
    header.classList.toggle(
      'is-menu-open',
      isOpen,
    );

    toggle.setAttribute(
      'aria-expanded',
      String(isOpen),
    );

    toggle.setAttribute(
      'aria-label',
      isOpen
        ? closeLabel
        : openLabel,
    );
  }

  setMenuOpen(false);

  toggle.addEventListener(
    'click',
    () => {
      const isOpen =
        toggle.getAttribute(
          'aria-expanded',
        ) === 'true';

      setMenuOpen(!isOpen);
    },
  );

  navigation.addEventListener(
    'click',
    event => {
      const navigationItem =
        event.target.closest(
          'a, button',
        );

      if (!navigationItem) {
        return;
      }

      setMenuOpen(false);
    },
  );

  document.addEventListener(
    'keydown',
    event => {
      if (
        event.key !== 'Escape'
      ) {
        return;
      }

      setMenuOpen(false);
    },
  );

  const mobileBreakpoint =
    window.matchMedia(
      '(max-width: 900px)',
    );

  mobileBreakpoint.addEventListener(
    'change',
    event => {
      if (!event.matches) {
        setMenuOpen(false);
      }
    },
  );
}