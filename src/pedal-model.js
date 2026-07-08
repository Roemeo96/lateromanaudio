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
 * Berechnet zunächst den noch nicht durch MIN und MAX
 * begrenzten Ausgangswert.
 *
 * Vor dem Threshold gilt:
 *
 * output = effectiveSlope × input
 *
 * Hinter dem Threshold gilt:
 *
 * output =
 * thresholdOutput
 * + effectiveSlope × ratio × (input - threshold)
 *
 * @param {number} input
 * @param {object} settings
 * @returns {number}
 */
export function calculateRawOutput(input, settings) {
  const {
    baseSlope = 1,
    sensitivity = 1,
    threshold = 2.5,
    ratio = 1,
  } = settings;

  const effectiveSlope =
    baseSlope * sensitivity;

  const linearOutput =
    effectiveSlope * input;

  /*
   * Solange die ursprüngliche lineare Kennlinie
   * den Threshold noch nicht erreicht hat,
   * bleibt die Steigung unverändert.
   */
  if (linearOutput <= threshold) {
    return linearOutput;
  }

  /*
   * Oberhalb des Thresholds wird nur noch die
   * Differenz zum Threshold mit Ratio skaliert.
   */
  const amountAboveThreshold =
    linearOutput - threshold;

  return (
    threshold
    + ratio * amountAboveThreshold
  );
}

/**
 * Berechnet den endgültigen Ausgangswert einschließlich
 * MIN- und MAX-Begrenzung.
 *
 * @param {number} input
 * @param {object} settings
 * @returns {number}
 */
export function calculateOutput(input, settings) {
  const {
    minOutput = 0,
    maxOutput = 5,
  } = settings;

  if (minOutput > maxOutput) {
    throw new RangeError(
      'minOutput darf nicht größer als maxOutput sein.',
    );
  }

  const rawOutput =
    calculateRawOutput(input, settings);

  return clamp(
    rawOutput,
    minOutput,
    maxOutput,
  );
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
    { length: sampleCount + 1 },
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



export function calculateThresholdInput(settings) {
  const {
    baseSlope = 1,
    sensitivity = 1,
    threshold = 2.5,
  } = settings;

  const effectiveSlope =
    baseSlope * sensitivity;

  if (effectiveSlope <= 0) {
    return null;
  }

  return threshold / effectiveSlope;
}