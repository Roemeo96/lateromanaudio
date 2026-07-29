import './style.css';

import {
  calculateOutput,
  createCurvePoints,
} from './pedal-model.js';

import {
  createTransferChart,
} from './transfer-chart.js';

import {
  initializeSectionParticles,
  updateParticleWobble,
} from "./hero-particles.js";



const quantityInput = document.querySelector(
  "#weltgeist-quantity",
);

const addToCartButton = document.querySelector(
  "#weltgeist-add-to-cart",
);

if (quantityInput && addToCartButton) {
  const updateCartQuantity = () => {
    const minimum = Number(quantityInput.min) || 1;
    const maximum = Number(quantityInput.max) || Infinity;
    const enteredQuantity = Number.parseInt(
      quantityInput.value,
      10,
    );

    const validQuantity = Number.isFinite(enteredQuantity)
      ? Math.min(
          maximum,
          Math.max(minimum, enteredQuantity),
        )
      : minimum;

    quantityInput.value = String(validQuantity);

    addToCartButton.dataset.itemQuantity =
      String(validQuantity);
  };

  quantityInput.addEventListener(
    "input",
    updateCartQuantity,
  );

  quantityInput.addEventListener(
    "change",
    updateCartQuantity,
  );

  updateCartQuantity();
}



const state = {
  base: 0,
  sensitivity: 6.5,
  input: 0,
  attackMs: 250,
  releaseMs: 3750,
  invert: false,

  currentOutput: 0,
  targetOutput: 0,
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

state.targetOutput = calculateOutput(
  state.input,
  getSettings(),
);

state.currentOutput =
  state.targetOutput;

function render() {
  const settings =
    getSettings();

  const points =
    createCurvePoints(settings);

  state.targetOutput =
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
    state.currentOutput.toFixed(2);

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
    currentOutput: state.currentOutput,
  });
}


let previousFrameTime = null;

function animateOutput(frameTime) {
  requestAnimationFrame(
    animateOutput,
  );

  if (previousFrameTime === null) {
    previousFrameTime = frameTime;
  }

  const elapsedMs = Math.min(
    frameTime - previousFrameTime,
    50,
  );

  previousFrameTime = frameTime;

  const difference =
    state.targetOutput
    - state.currentOutput;

  if (Math.abs(difference) <= 0.0001) {
    return;
  }

  const durationMs =
    difference > 0
      ? state.attackMs
      : state.releaseMs;

  if (durationMs <= 0) {
    state.currentOutput =
      state.targetOutput;
  } else {
    const maximumChange =
      (5 / durationMs) * elapsedMs;

    if (Math.abs(difference) <= maximumChange) {
      state.currentOutput =
        state.targetOutput;
    } else {
      state.currentOutput +=
        Math.sign(difference)
        * maximumChange;
    }
  }

  render();

  try {
    updateParticleWobble(
      state.currentOutput,
    );
  } catch (error) {
    console.error(
      "Particle wobble could not be updated:",
      error,
    );
  }
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
      threshold: 0.15,
    },
  );

sections.forEach(section => {
  observer.observe(section);
});

render();

initializeSectionParticles()
  .then(() => {
    updateParticleWobble(
      state.currentOutput,
    );
  })
  .catch((error) => {
    console.error(
      "Section particles could not be initialized:",
      error,
    );
  });

requestAnimationFrame(
  animateOutput,
);


const rangeInputs = document.querySelectorAll(
  'input[type="range"]',
);

const updateRangeFill = (input) => {
  const min = Number(input.min) || 0;
  const max = Number(input.max) || 100;
  const value = Number(input.value) || 0;

  const percentage =
    ((value - min) / (max - min)) * 100;

  input.style.setProperty(
    "--range-percentage",
    `${percentage}%`,
  );
};

rangeInputs.forEach((input) => {
  updateRangeFill(input);

  input.addEventListener("input", () => {
    updateRangeFill(input);
  });
});