export function updateRangeFill(input) {
  const min = Number(input.min) || 0;
  const max = Number(input.max) || 100;
  const value = Number(input.value) || 0;

  const percentage =
    ((value - min) / (max - min)) * 100;

  input.style.setProperty(
    "--range-percentage",
    `${percentage}%`,
  );
}

export function initializeRangeFills() {
  const rangeInputs =
    document.querySelectorAll(
      'input[type="range"]',
    );

  rangeInputs.forEach(input => {
    updateRangeFill(input);

    input.addEventListener(
      "input",
      () => {
        updateRangeFill(input);
      },
    );
  });
}