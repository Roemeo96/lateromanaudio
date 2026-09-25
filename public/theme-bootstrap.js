(() => {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("theme");

  // Dark ist Standard.
  // Nur eine explizit gespeicherte Light-Auswahl überschreibt ihn.
  const theme = savedTheme === "light" ? "light" : "dark";

  root.dataset.theme = theme;
})();