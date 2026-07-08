import './style.css';

import {
  calculateOutput,
  calculateThresholdInput,
  createCurvePoints,
} from './pedal-model.js';

import {
  createTransferChart,
} from './transfer-chart.js';

const state = {
  baseSlope: 1,
  sensitivity: 5,
  input: 0.5,
  minOutput: 0,
  maxOutput: 5,
  threshold: 2.5,
  ratio: 1,
  attackMs: 250,
  releaseMs: 2000,
};

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

/*
 * Es muss immer gelten:
 *
 * MIN <= Threshold <= MAX
 */
minOutputInput.max =
  String(state.threshold);

thresholdInput.min =
  String(state.minOutput);

thresholdInput.max =
  String(state.maxOutput);

maxOutputInput.min =
  String(state.threshold);

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

    state.minOutput = Math.min(
      newValue,
      state.threshold,
    );

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

    state.maxOutput = Math.max(
      newValue,
      state.threshold,
    );

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

    state.threshold = Math.min(
      state.maxOutput,
      Math.max(
        state.minOutput,
        newValue,
      ),
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
