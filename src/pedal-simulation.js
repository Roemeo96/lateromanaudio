import {
  updateRangeFill,
} from './range-fill.js';

import {
  createLiveAudioInput,
} from './live-audio.js';

import {
  calculateOutput,
  createCurvePoints,
} from './pedal-model.js';

import {
  createTransferChart,
} from './transfer-chart.js';

import {
  updateParticleWobble,
} from './hero-particles.js';

import {
  updateRoutingVisualization,
} from './routing-visualization.js';

export function createPedalSimulation() {
  const state = {
    base: 0,
    sensitivity: 6.5,

    input: 0,
    manualInput: 0,
    inputSource: 'manual',

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

  const inputSourceInputs =
    document.querySelectorAll(
      'input[name="input-source"]',
    );

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

  const liveAudioInfo =
    document.querySelector(
      '#live-audio-info',
    );

  const liveAudioStatus =
    document.querySelector(
      '#live-audio-status',
    );

  if (
    !baseInput
    || !baseValue
    || !sensitivityInput
    || !sensitivityValue
    || !inputLevelInput
    || !inputLevelValue
    || inputSourceInputs.length === 0
    || !attackInput
    || !attackValue
    || !releaseInput
    || !releaseValue
    || !invertInput
    || !currentInputValue
    || !currentOutputValue
    || !chartElement
    || !liveAudioInfo
    || !liveAudioStatus
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

  let curvePoints =
    createCurvePoints(
      getSettings(),
    );

  chart.updateCurve(
    curvePoints,
  );

  function updateCurvePoints() {
    curvePoints =
      createCurvePoints(
        getSettings(),
      );

    chart.updateCurve(
      curvePoints,
    );
  }

  function updateTargetOutput() {
    state.targetOutput =
      calculateOutput(
        state.input,
        getSettings(),
      );
  }

  updateTargetOutput();

  state.currentOutput =
    state.targetOutput;

  function renderControls() {
    baseValue.textContent =
      state.base.toFixed(2);

    sensitivityValue.textContent =
      state.sensitivity.toFixed(1);

    attackValue.textContent =
      `${state.attackMs} ms`;

    releaseValue.textContent =
      `${state.releaseMs} ms`;

    baseInput.value =
      String(state.base);

    sensitivityInput.value =
      String(state.sensitivity);

    attackInput.value =
      String(state.attackMs);

    releaseInput.value =
      String(state.releaseMs);

    invertInput.checked =
      state.invert;
  }

  function renderInput() {
    inputLevelValue.textContent =
      state.input.toFixed(2);

    currentInputValue.textContent =
      state.input.toFixed(2);

    inputLevelInput.value =
      String(state.input);
  }

  function renderOutput() {
    currentOutputValue.textContent =
      state.currentOutput.toFixed(2);
  }

  function renderChartPosition() {
    chart.updateCurrentPosition({
      currentInput: state.input,
      currentOutput: state.currentOutput,
    });
  }

  function renderRoutingVisualization() {
  updateRoutingVisualization({
    currentInput: state.input,
    currentOutput: state.currentOutput,
  });
}

function render() {
  updateTargetOutput();
  renderControls();
  renderInput();
  renderOutput();
  renderChartPosition();
  renderRoutingVisualization();
}

  const liveAudio =
    createLiveAudioInput({
      onInput(smoothedInput) {
        if (state.inputSource !== 'live') {
          return;
        }

        state.input =
          smoothedInput;

        updateTargetOutput();
        renderInput();
        renderChartPosition();
        renderRoutingVisualization();

        updateRangeFill(
        inputLevelInput,
        );
      },
    });

  let inputSourceRequestId = 0;

  let liveAudioOperation =
    Promise.resolve();

  function runLiveAudioOperation(operation) {
    const operationPromise =
      liveAudioOperation.then(
        operation,
        operation,
      );

    liveAudioOperation =
      operationPromise.catch(() => {});

    return operationPromise;
  }

  let previousFrameTime = null;

  function animateOutput(frameTime) {
    requestAnimationFrame(
      animateOutput,
    );

    if (previousFrameTime === null) {
      previousFrameTime = frameTime;
    }

    const elapsedMs =
      Math.min(
        frameTime - previousFrameTime,
        50,
      );

    previousFrameTime =
      frameTime;

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
        (5 / durationMs)
        * elapsedMs;

      if (
        Math.abs(difference)
        <= maximumChange
      ) {
        state.currentOutput =
          state.targetOutput;
      } else {
        state.currentOutput +=
          Math.sign(difference)
          * maximumChange;
      }
    }

    renderOutput();
    renderChartPosition();
    renderRoutingVisualization();

    try {
    updateParticleWobble(
        state.currentOutput,
    );
    } catch (error) {
      console.error(
        'Particle wobble could not be updated:',
        error,
      );
    }
  }

  function showLiveAudioInfo(
    message = '',
  ) {
    liveAudioInfo.hidden =
      false;

    if (message) {
      liveAudioStatus.textContent =
        message;

      liveAudioStatus.hidden =
        false;
    } else {
      liveAudioStatus.hidden =
        true;
    }
  }

  function hideLiveAudioInfo() {
    liveAudioInfo.hidden =
      true;
  }

  inputSourceInputs.forEach(input => {
    input.addEventListener(
      'change',
      async event => {
        if (!event.target.checked) {
          return;
        }

        const requestId =
          ++inputSourceRequestId;

        const selectedSource =
          event.target.value;

        if (
          selectedSource
          === 'manual'
        ) {
          state.inputSource =
            'manual';

          inputLevelInput.disabled =
            false;

          hideLiveAudioInfo();

          await runLiveAudioOperation(
            () => liveAudio.stop(),
          );

          if (
            requestId
            !== inputSourceRequestId
          ) {
            return;
          }

          state.input =
            state.manualInput;

          updateTargetOutput();
            renderInput();
            renderChartPosition();
            renderRoutingVisualization();

          updateRangeFill(
            inputLevelInput,
          );

          return;
        }

        if (
          selectedSource
          !== 'live'
        ) {
          return;
        }

        try {
          showLiveAudioInfo(
            'Requesting audio access…',
          );

          await runLiveAudioOperation(
            () => liveAudio.start(),
          );

          if (
            requestId
            !== inputSourceRequestId
          ) {
            return;
          }

          state.inputSource =
            'live';

          inputLevelInput.disabled =
            true;

          showLiveAudioInfo();
        } catch (error) {
          if (
            requestId
            !== inputSourceRequestId
          ) {
            return;
          }

          console.error(
            'Live audio could not be started:',
            error,
          );

          state.inputSource =
            'manual';

          inputLevelInput.disabled =
            false;

          state.input =
            state.manualInput;

          const manualInput =
            document.querySelector(
              'input[name="input-source"][value="manual"]',
            );

          if (manualInput) {
            manualInput.checked =
              true;
          }

          if (
            error.name
            === 'NotAllowedError'
          ) {
            showLiveAudioInfo(
              'Audio input access denied.',
            );
          } else if (
            error.name
            === 'NotFoundError'
          ) {
            showLiveAudioInfo(
              'No audio input device found.',
            );
          } else {
            showLiveAudioInfo(
              'Audio input could not be started.',
            );
          }

          updateTargetOutput();
            renderInput();
            renderChartPosition();
            renderRoutingVisualization();

          updateRangeFill(
            inputLevelInput,
          );
        }
      },
    );
  });

  baseInput.addEventListener(
    'input',
    event => {
      const newValue =
        Number(
          event.target.value,
        );

      if (
        !Number.isFinite(newValue)
      ) {
        return;
      }

      state.base =
        newValue;

      updateCurvePoints();
      updateTargetOutput();
      renderControls();
    },
  );

  sensitivityInput.addEventListener(
    'input',
    event => {
      const newValue =
        Number(
          event.target.value,
        );

      if (
        !Number.isFinite(newValue)
      ) {
        return;
      }

      state.sensitivity =
        newValue;

      updateCurvePoints();
      updateTargetOutput();
      renderControls();
    },
  );

  inputLevelInput.addEventListener(
    'input',
    event => {
      if (
        state.inputSource
        !== 'manual'
      ) {
        return;
      }

      const newValue =
        Number(
          event.target.value,
        );

      if (
        !Number.isFinite(newValue)
      ) {
        return;
      }

      state.manualInput =
        newValue;

      state.input =
        newValue;

      updateTargetOutput();
        renderInput();
        renderChartPosition();
        renderRoutingVisualization();
    },
  );

  attackInput.addEventListener(
    'input',
    event => {
      const newValue =
        Number(
          event.target.value,
        );

      if (
        !Number.isFinite(newValue)
      ) {
        return;
      }

      state.attackMs =
        newValue;

      renderControls();
    },
  );

  releaseInput.addEventListener(
    'input',
    event => {
      const newValue =
        Number(
          event.target.value,
        );

      if (
        !Number.isFinite(newValue)
      ) {
        return;
      }

      state.releaseMs =
        newValue;

      renderControls();
    },
  );

  invertInput.addEventListener(
    'change',
    event => {
      state.invert =
        event.target.checked;

      updateCurvePoints();
      updateTargetOutput();
      renderControls();
    },
  );

  return {
    render,

    start() {
      requestAnimationFrame(
        animateOutput,
      );
    },

    getCurrentOutput() {
      return state.currentOutput;
    },
  };
}