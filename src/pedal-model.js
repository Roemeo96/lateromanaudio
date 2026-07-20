/**
 * Begrenzt einen Wert auf einen festgelegten Bereich.
 *
 * @param {number} value
 * @param {number} minimum
 * @param {number} maximum
 * @returns {number}
 */
export function clamp(value, minimum, maximum) {
  return Math.min(
    maximum,
    Math.max(minimum, value),
  );
}

/**
 * Berechnet den noch nicht invertierten Ausgangswert.
 *
 * BASE verschiebt die Kennlinie vertikal.
 * SENSITIVITY bestimmt ihre Steigung.
 *
 * output = base + sensitivity × input
 *
 * @param {number} input
 * @param {object} settings
 * @returns {number}
 */
export function calculateRawOutput(input, settings) {
  const {
    base = 0,
    sensitivity = 1,
  } = settings;

  return (
    base
    + sensitivity * input
  );
}

/**
 * Berechnet den endgültigen Ausgangswert.
 *
 * Der Ausgang wird zunächst auf 0 bis 5 begrenzt.
 * Bei aktiviertem INVERT wird anschließend die
 * Expression-Position umgekehrt.
 *
 * @param {number} input
 * @param {object} settings
 * @returns {number}
 */
export function calculateOutput(input, settings) {
  const rawOutput =
    calculateRawOutput(
      input,
      settings,
    );

  const limitedOutput =
    clamp(
      rawOutput,
      0,
      5,
    );

  if (settings.invert) {
    return 5 - limitedOutput;
  }

  return limitedOutput;
}

/**
 * Erzeugt Punkte für die vollständige Kennlinie.
 *
 * @param {object} settings
 * @param {number} sampleCount
 * @returns {{ input: number, output: number }[]}
 */
export function createCurvePoints(
  settings,
  sampleCount = 200,
) {
  return Array.from(
    {
      length: sampleCount + 1,
    },
    (_, index) => {
      const input =
        index / sampleCount;

      return {
        input,
        output: calculateOutput(
          input,
          settings,
        ),
      };
    },
  );
}