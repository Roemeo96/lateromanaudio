/**
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