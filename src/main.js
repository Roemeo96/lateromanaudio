import './style.css';

import {
  clamp,
  calculateOutput,
  calculateThresholdInput,
  createCurvePoints,
} from './pedal-model.js';

import {
  createTransferChart,
} from './transfer-chart.js';

const OUTPUT_MINIMUM = 0;
const OUTPUT_MAXIMUM = 5;

const state = {
  baseSlope: 1,
  sensitivity: 6.5,
  input: 0.3,
  minOutput: 1,
  maxOutput: 4.75,
  threshold: 3.75,
  ratio: 0.5,
  attackMs: 250,
  releaseMs: 3750,
  invert: false
};

let minRelativePosition =
  state.threshold > OUTPUT_MINIMUM
    ? (
        state.minOutput - OUTPUT_MINIMUM
      ) / (
        state.threshold - OUTPUT_MINIMUM
      )
    : 0;

let maxRelativePosition =
  state.threshold < OUTPUT_MAXIMUM
    ? (
        state.maxOutput - state.threshold
      ) / (
        OUTPUT_MAXIMUM - state.threshold
      )
    : 1;

const sensitivityInput =
  document.querySelector('#sensitivity');

const sensitivityValue =
  document.querySelector('#sensitivity-value');

const inputLevelInput =
  document.querySelector('#input-level');

const inputLevelValue =
  document.querySelector('#input-level-value');

const minOutputInput =
  document.querySelector('#min-output');

const minOutputValue =
  document.querySelector('#min-output-value');

const maxOutputInput =
  document.querySelector('#max-output');

const maxOutputValue =
  document.querySelector('#max-output-value');

const thresholdInput =
  document.querySelector('#threshold');

const thresholdValue =
  document.querySelector('#threshold-value');

const ratioInput =
  document.querySelector('#ratio');

const ratioValue =
  document.querySelector('#ratio-value');

const currentInputValue =
  document.querySelector('#current-input');

const currentOutputValue =
  document.querySelector('#current-output');

const chartElement =
  document.querySelector('#transfer-chart');

const attackInput =
  document.querySelector('#attack');

const attackValue =
  document.querySelector('#attack-value');

const releaseInput =
  document.querySelector('#release');

const releaseValue =
  document.querySelector('#release-value');

const invertInput =
  document.querySelector('#invert');

if (
  !sensitivityInput
  || !sensitivityValue
  || !inputLevelInput
  || !inputLevelValue
  || !minOutputInput
  || !minOutputValue
  || !maxOutputInput
  || !maxOutputValue
  || !thresholdInput
  || !thresholdValue
  || !ratioInput
  || !ratioValue
  || !attackInput
  || !attackValue
  || !releaseInput
  || !releaseValue
  || !currentInputValue
  || !currentOutputValue
  || !chartElement
  || !invertInput
) {
  throw new Error(
    'Ein oder mehrere benötigte HTML-Elemente fehlen.',
  );
}

const chart =
  createTransferChart(chartElement);

function getSettings() {
  return {
    baseSlope: state.baseSlope,
    sensitivity: state.sensitivity,
    minOutput: state.minOutput,
    maxOutput: state.maxOutput,
    threshold: state.threshold,
    ratio: state.ratio,
    invert: state.invert,
  };
}

function render() {
  const settings = getSettings();

  const thresholdInputPosition =
    calculateThresholdInput(settings);

  const points =
    createCurvePoints(settings);

  const output =
    calculateOutput(
      state.input,
      settings,
    );

    attackValue.textContent =
  `${state.attackMs} ms`;

  releaseValue.textContent =
  `${state.releaseMs} ms`;

  sensitivityValue.textContent =
    state.sensitivity.toFixed(1);

  inputLevelValue.textContent =
    state.input.toFixed(2);

  minOutputValue.textContent =
    state.minOutput.toFixed(2);

  maxOutputValue.textContent =
    state.maxOutput.toFixed(2);

  thresholdValue.textContent =
    state.threshold.toFixed(2);

  ratioValue.textContent =
    state.ratio.toFixed(2);

  currentInputValue.textContent =
    state.input.toFixed(2);

  currentOutputValue.textContent =
    output.toFixed(2);

  invertInput.checked =
    state.invert;


minOutputInput.min =
  String(OUTPUT_MINIMUM);

minOutputInput.max =
  String(state.threshold);

thresholdInput.min =
  String(OUTPUT_MINIMUM);

thresholdInput.max =
  String(OUTPUT_MAXIMUM);

maxOutputInput.min =
  String(state.threshold);

maxOutputInput.max =
  String(OUTPUT_MAXIMUM);

minOutputInput.value =
  String(state.minOutput);

thresholdInput.value =
  String(state.threshold);

maxOutputInput.value =
  String(state.maxOutput);

chart.update({
  points,
  currentInput: state.input,
  currentOutput: output,
  thresholdInput: thresholdInputPosition,
  attackMs: state.attackMs,
  releaseMs: state.releaseMs,
});
}

invertInput.addEventListener(
  'change',
  event => {
    state.invert =
      event.target.checked;

    render();
  },
);


attackInput.addEventListener(
  'input',
  event => {
    const newValue =
      Number(event.target.value);

    if (!Number.isFinite(newValue)) {
      return;
    }

    state.attackMs = newValue;
    render();
  },
);

releaseInput.addEventListener(
  'input',
  event => {
    const newValue =
      Number(event.target.value);

    if (!Number.isFinite(newValue)) {
      return;
    }

    state.releaseMs = newValue;
    render();
  },
);



sensitivityInput.addEventListener(
  'input',
  event => {
    const newValue =
      Number(event.target.value);

    if (!Number.isFinite(newValue)) {
      return;
    }

    state.sensitivity = newValue;
    render();
  },
);

inputLevelInput.addEventListener(
  'input',
  event => {
    const newValue =
      Number(event.target.value);

    if (!Number.isFinite(newValue)) {
      return;
    }

    state.input = newValue;
    render();
  },
);

minOutputInput.addEventListener(
  'input',
  event => {
    const newValue =
      Number(event.target.value);

    if (!Number.isFinite(newValue)) {
      return;
    }

    state.minOutput = clamp(
      newValue,
      OUTPUT_MINIMUM,
      state.threshold,
    );

    minRelativePosition =
      state.threshold > OUTPUT_MINIMUM
        ? (
            state.minOutput - OUTPUT_MINIMUM
          ) / (
            state.threshold - OUTPUT_MINIMUM
          )
        : 0;

    render();
  },
);

maxOutputInput.addEventListener(
  'input',
  event => {
    const newValue =
      Number(event.target.value);

    if (!Number.isFinite(newValue)) {
      return;
    }

    state.maxOutput = clamp(
      newValue,
      state.threshold,
      OUTPUT_MAXIMUM,
    );

    maxRelativePosition =
      state.threshold < OUTPUT_MAXIMUM
        ? (
            state.maxOutput - state.threshold
          ) / (
            OUTPUT_MAXIMUM - state.threshold
          )
        : 1;

    render();
  },
);

thresholdInput.addEventListener(
  'input',
  event => {
    const newValue =
      Number(event.target.value);

    if (!Number.isFinite(newValue)) {
      return;
    }

    const newThreshold = clamp(
      newValue,
      OUTPUT_MINIMUM,
      OUTPUT_MAXIMUM,
    );

    state.threshold =
      newThreshold;

    state.minOutput =
      OUTPUT_MINIMUM
      + minRelativePosition
        * (
          newThreshold
          - OUTPUT_MINIMUM
        );

    state.maxOutput =
      newThreshold
      + maxRelativePosition
        * (
          OUTPUT_MAXIMUM
          - newThreshold
        );

    render();
  },
);

ratioInput.addEventListener(
  'input',
  event => {
    const newValue =
      Number(event.target.value);

    if (!Number.isFinite(newValue)) {
      return;
    }

    state.ratio = newValue;
    render();
  },
);

render();
