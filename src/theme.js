const THEME_STORAGE_KEY = "theme";

function getCurrentTheme() {
  return document.documentElement.dataset.theme ===
    "light"
    ? "light"
    : "dark";
}

function setTheme(theme, persist = true) {
  document.documentElement.dataset.theme =
    theme;

  if (persist) {
    try {
      localStorage.setItem(
        THEME_STORAGE_KEY,
        theme,
      );
    } catch {
      // Theme still works without persistent storage.
    }
  }

  updateThemeToggle();
}

function updateThemeToggle() {
  const toggle =
    document.querySelector(
      ".site-header-theme-toggle",
    );

  if (!toggle) {
    return;
  }

  const currentTheme =
    getCurrentTheme();

  toggle.setAttribute(
    "aria-label",
    currentTheme === "dark"
      ? "Switch to light mode"
      : "Switch to dark mode",
  );
}

export function initializeThemeToggle() {
  const toggle =
    document.querySelector(
      ".site-header-theme-toggle",
    );

  if (!toggle) {
    return;
  }

  updateThemeToggle();

  toggle.addEventListener(
    "click",
    () => {
      const currentTheme =
        getCurrentTheme();

      setTheme(
        currentTheme === "dark"
          ? "light"
          : "dark",
      );
    },
  );

  const systemTheme =
    window.matchMedia(
      "(prefers-color-scheme: light)",
    );

  systemTheme.addEventListener(
    "change",
    event => {
      let storedTheme = null;

      try {
        storedTheme =
          localStorage.getItem(
            THEME_STORAGE_KEY,
          );
      } catch {
        // Follow system theme if storage is unavailable.
      }

      if (
        storedTheme === "light"
        || storedTheme === "dark"
      ) {
        return;
      }

      setTheme(
        event.matches
          ? "light"
          : "dark",
        false,
      );
    },
  );
}