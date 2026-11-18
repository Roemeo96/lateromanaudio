(() => {
  let theme = "light";

  try {
    if (localStorage.getItem("theme") === "dark") {
      theme = "dark";
    }
  } catch {
    // Use light mode when theme storage is unavailable.
  }

  document.documentElement.dataset.theme = theme;
})();