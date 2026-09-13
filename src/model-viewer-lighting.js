const viewer = document.querySelector(".weltgeist-model");

viewer?.addEventListener("load", () => {
  viewer.resetTurntableRotation(Math.PI / 3);
});