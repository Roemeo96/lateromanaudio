function clamp(value, minimum, maximum) {
  return Math.min(
    maximum,
    Math.max(minimum, value),
  );
}

export function updateRoutingVisualization({
  currentInput,
  currentOutput,
}) {
  const routingDiagrams =
    document.querySelectorAll(
      ".routing-diagram",
    );

  if (routingDiagrams.length === 0) {
    return;
  }

  const normalizedInput =
    clamp(currentInput, 0, 1);

  const normalizedOutput =
    clamp(currentOutput / 5, 0, 1);

  routingDiagrams.forEach((routingDiagram) => {
    routingDiagram.style.setProperty(
      "--routing-input",
      normalizedInput.toFixed(3),
    );

    routingDiagram.style.setProperty(
      "--routing-output",
      normalizedOutput.toFixed(3),
    );

    const inputLeds =
      routingDiagram.querySelectorAll(
        ".routing-input-led",
      );

    inputLeds.forEach((led) => {
      const threshold =
        Number(
          led.dataset.threshold,
        );

      led.classList.toggle(
        "is-active",
        normalizedInput >= threshold,
      );
    });
  });
}