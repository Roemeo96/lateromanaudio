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
  const routingDiagram =
    document.querySelector(
      ".routing-diagram",
    );

  if (!routingDiagram) {
    return;
  }

  const normalizedInput =
    clamp(currentInput, 0, 1);

  const normalizedOutput =
    clamp(currentOutput / 5, 0, 1);

  routingDiagram.style.setProperty(
    "--routing-input",
    normalizedInput.toFixed(3),
  );

  routingDiagram.style.setProperty(
    "--routing-output",
    normalizedOutput.toFixed(3),
  );
}