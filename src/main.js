import './style.css';

import {
  calculateOutput,
  createCurvePoints,
} from './pedal-model.js';

import {
  createTransferChart,
} from './transfer-chart.js';

const state = {
  base: 1,
  sensitivity: 6.5,
  input: 0.3,
  attackMs: 250,
  releaseMs: 3750,
  invert: false,
};

const baseInput =
  document.querySelector('#base');

const baseValue =
  document.querySelector('#base-value');

const sensitivityInput =
  document.querySelector('#sensitivity');

const sensitivityValue =
  document.querySelector('#sensitivity-value');

const inputLevelInput =
  document.querySelector('#input-level');

const inputLevelValue =
  document.querySelector('#input-level-value');

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

const currentInputValue =
  document.querySelector('#current-input');

const currentOutputValue =
  document.querySelector('#current-output');

const chartElement =
  document.querySelector('#transfer-chart');

if (
  !baseInput
  || !baseValue
  || !sensitivityInput
  || !sensitivityValue
  || !inputLevelInput
  || !inputLevelValue
  || !attackInput
  || !attackValue
  || !releaseInput
  || !releaseValue
  || !invertInput
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
    base: state.base,
    sensitivity: state.sensitivity,
    invert: state.invert,
  };
}

function render() {
  const settings =
    getSettings();

  const points =
    createCurvePoints(settings);

  const output =
    calculateOutput(
      state.input,
      settings,
    );

  baseValue.textContent =
    state.base.toFixed(2);

  sensitivityValue.textContent =
    state.sensitivity.toFixed(1);

  inputLevelValue.textContent =
    state.input.toFixed(2);

  attackValue.textContent =
    `${state.attackMs} ms`;

  releaseValue.textContent =
    `${state.releaseMs} ms`;

  currentInputValue.textContent =
    state.input.toFixed(2);

  currentOutputValue.textContent =
    output.toFixed(2);

  baseInput.value =
    String(state.base);

  sensitivityInput.value =
    String(state.sensitivity);

  inputLevelInput.value =
    String(state.input);

  attackInput.value =
    String(state.attackMs);

  releaseInput.value =
    String(state.releaseMs);

  invertInput.checked =
    state.invert;

  chart.update({
    points,
    currentInput: state.input,
    currentOutput: output,
    attackMs: state.attackMs,
    releaseMs: state.releaseMs,
  });
}

baseInput.addEventListener(
  'input',
  event => {
    const newValue =
      Number(event.target.value);

    if (!Number.isFinite(newValue)) {
      return;
    }

    state.base = newValue;
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

invertInput.addEventListener(
  'change',
  event => {
    state.invert =
      event.target.checked;

    render();
  },
);

const sections =
  document.querySelectorAll('.reveal-section');

const observer =
  new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add(
          'is-visible',
        );

        observer.unobserve(
          entry.target,
        );
      });
    },
    {
      threshold: 0.25,
    },
  );

sections.forEach(section => {
  observer.observe(section);
});

render();