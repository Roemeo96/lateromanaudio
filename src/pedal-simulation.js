import {
  updateRangeFill,
} from './range-fill.js';

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

  let liveAudioStream = null;
  let liveAudioContext = null;
  let liveAudioSource = null;
  let liveAudioAnalyser = null;
  let liveAudioSamples = null;
  let liveAudioAnimationFrame = null;

  let lastAudioLevelLogTime = 0;
  let smoothedLiveInput = 0;
  let previousAudioFrameTime = null;

  function normalizeLiveAudioLevel(rms) {
    const minimumDb = -40;
    const maximumDb = -18;

    const safeRms =
      Math.max(
        rms,
        0.000001,
      );

    const db =
      20 * Math.log10(
        safeRms,
      );

    const normalized =
      (
        db
        - minimumDb
      )
      / (
        maximumDb
        - minimumDb
      );

    return {
      rms,
      db,
      normalized:
        Math.min(
          1,
          Math.max(
            0,
            normalized,
          ),
        ),
    };
  }



  function smoothLiveAudioLevel(
    target,
    frameTime,
  ) {
    if (previousAudioFrameTime === null) {
      previousAudioFrameTime = frameTime;
      smoothedLiveInput = target;

      return target;
    }

    const elapsedMs = Math.min(
      frameTime - previousAudioFrameTime,
      50,
    );

    previousAudioFrameTime = frameTime;

    const smoothingMs =
      target > smoothedLiveInput
        ? 100
        : 300;

    const alpha =
      1 - Math.exp(
        -elapsedMs / smoothingMs,
      );

    smoothedLiveInput +=
      (target - smoothedLiveInput)
      * alpha;

    return smoothedLiveInput;
  }




  function measureLiveAudioLevel(frameTime) {
    if (
      !liveAudioAnalyser
      || !liveAudioSamples
    ) {
      return;
    }

    liveAudioAnalyser.getFloatTimeDomainData(
      liveAudioSamples,
    );

    let sumOfSquares = 0;

    for (
      let index = 0;
      index < liveAudioSamples.length;
      index += 1
    ) {
      const sample =
        liveAudioSamples[index];

      sumOfSquares +=
        sample * sample;
    }

    const rms =
      Math.sqrt(
        sumOfSquares
        / liveAudioSamples.length,
      );

      const audioLevel =
        normalizeLiveAudioLevel(
          rms,
        );

      const smoothedInput =
        smoothLiveAudioLevel(
          audioLevel.normalized,
          frameTime,
        );

      if (state.inputSource === 'live') {
        state.input =
          smoothedInput;

        render();

        updateRangeFill(
          inputLevelInput,
        );
      }

    console.log(
      'Live audio:',
      {
        rms:
          audioLevel.rms.toFixed(5),

        db:
          audioLevel.db.toFixed(1),

        normalized:
          audioLevel.normalized.toFixed(2),
      },
    );
    /*
     * Nur etwa 10x pro Sekunde loggen,
     * damit die Console nicht zugespammt wird.
     */
    if (
      frameTime - lastAudioLevelLogTime
      >= 100
    ) {

      lastAudioLevelLogTime =
        frameTime;
    }

    liveAudioAnimationFrame =
      requestAnimationFrame(
        measureLiveAudioLevel,
      );
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

  async function startLiveAudio() {
    if (
      !navigator.mediaDevices
      || !navigator.mediaDevices.getUserMedia
    ) {
      throw new Error(
        'Audio input is not supported by this browser.',
      );
    }

    liveAudioStream =
      await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });

    liveAudioContext =
      new AudioContext();

    if (
      liveAudioContext.state
      === 'suspended'
    ) {
      await liveAudioContext.resume();
    }

    liveAudioSource =
      liveAudioContext.createMediaStreamSource(
        liveAudioStream,
      );

    liveAudioAnalyser =
      liveAudioContext.createAnalyser();

    liveAudioAnalyser.fftSize =
      2048;

    liveAudioSamples =
      new Float32Array(
        liveAudioAnalyser.fftSize,
      );

    liveAudioSource.connect(
      liveAudioAnalyser,
    );

    console.log(
      'Live audio stream opened:',
      liveAudioStream,
    );

    liveAudioAnimationFrame =
      requestAnimationFrame(
        measureLiveAudioLevel,
      );
  }

  async function stopLiveAudio() {
    smoothedLiveInput = 0;
    previousAudioFrameTime = null;

    if (liveAudioAnimationFrame) {
      cancelAnimationFrame(
        liveAudioAnimationFrame,
      );

      liveAudioAnimationFrame =
        null;
    }

    if (liveAudioSource) {
      liveAudioSource.disconnect();

      liveAudioSource =
        null;
    }

    liveAudioAnalyser =
      null;

    liveAudioSamples =
      null;

    if (liveAudioContext) {
      await liveAudioContext.close();

      liveAudioContext =
        null;
    }

    if (liveAudioStream) {
      liveAudioStream
        .getTracks()
        .forEach(track => {
          track.stop();
        });

      liveAudioStream =
        null;
    }

    console.log(
      'Live audio stream stopped.',
    );
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

          await stopLiveAudio();

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

          await startLiveAudio();

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