(() => {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("theme");
  const theme = savedTheme === "light" ? "light" : "dark";

  root.dataset.theme = theme;
})();