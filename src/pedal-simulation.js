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

  const liveAudio =
    createLiveAudioInput({
      onInput(smoothedInput) {
        if (state.inputSource !== 'live') {
          return;
        }

        state.input =
          smoothedInput;

        render();

        updateRangeFill(
          inputLevelInput,
        );
      },
    });

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

  function showLiveAudioInfo(
    message = '',
  ) {
    liveAudioInfo.hidden = false;

    if (message) {
      liveAudioStatus.textContent = message;
      liveAudioStatus.hidden = false;
    } else {
      liveAudioStatus.hidden = true;
    }
  }

  function hideLiveAudioInfo() {
    liveAudioInfo.hidden = true;
  }

  inputSourceInputs.forEach(input => {
    input.addEventListener(
      'change',
      async event => {
        if (!event.target.checked) {
          return;
        }

        const selectedSource =
          event.target.value;

        if (selectedSource === 'manual') {
          state.inputSource = 'manual';

          inputLevelInput.disabled = false;

          hideLiveAudioInfo();

          await liveAudio.stop();

          state.input =
            state.manualInput;

          render();

          updateRangeFill(
            inputLevelInput,
          );

          return;
        }

        if (selectedSource !== 'live') {
          return;
        }

        try {
          showLiveAudioInfo(
            'Requesting audio access…',
          );

          await liveAudio.start();

          state.inputSource = 'live';

          inputLevelInput.disabled = true;

          showLiveAudioInfo();
        } catch (error) {
          console.error(
            'Live audio could not be started:',
            error,
          );

          state.inputSource = 'manual';

          inputLevelInput.disabled = false;

          state.input =
            state.manualInput;

          const manualInput =
            document.querySelector(
              'input[name="input-source"][value="manual"]',
            );

          if (manualInput) {
            manualInput.checked = true;
          }

          if (error.name === 'NotAllowedError') {
            showLiveAudioInfo(
              'Audio input access denied.',
            );
          } else if (error.name === 'NotFoundError') {
            showLiveAudioInfo(
              'No audio input device found.',
            );
          } else {
            showLiveAudioInfo(
              'Audio input could not be started.',
            );
          }

          render();

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
      if (state.inputSource !== 'manual') {
        return;
      }

      const newValue =
        Number(event.target.value);

      if (!Number.isFinite(newValue)) {
        return;
      }

      state.manualInput = newValue;
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