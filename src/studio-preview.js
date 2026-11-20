// Application selection for the first layout preview. This does not play audio
// or change the independent expression simulation.
const choices = [...document.querySelectorAll('[data-scene]')];
const copy = document.querySelector('.studio-scene-copy');
choices.forEach((button, index) => {
  button.addEventListener('click', () => {
    const template = document.querySelector(`[data-scene-copy="${button.dataset.scene}"]`);
    if (!template || !copy) return;
    choices.forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
    copy.replaceChildren(template.content.cloneNode(true));
    document.querySelector('[data-scene-number]').textContent = `0${index + 1} / 06`;
  });
});
