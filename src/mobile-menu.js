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

      if (!navigationItem || navigationItem.matches('.site-header-theme-toggle, .site-header-motion-toggle')) {
        return;
      }

      const section = navigationItem.hash
        ? document.getElementById(navigationItem.hash.slice(1))
        : null;
      const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
      setMenuOpen(false);
      if (section && wasOpen && event.detail === 0) {
        section.setAttribute('tabindex', '-1');
        section.focus({ preventScroll: true });
      }
    },
  );

  document.addEventListener(
    'keydown',
    event => {
      if (event.key !== 'Escape' || toggle.getAttribute('aria-expanded') !== 'true') {
        return;
      }

      setMenuOpen(false);
      if (header.contains(document.activeElement)) toggle.focus();
    },
  );

  const mobileBreakpoint =
    window.matchMedia(
      '(max-width: 1360px)',
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
