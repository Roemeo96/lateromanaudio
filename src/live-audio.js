export function createLiveAudioInput({
  onInput,
}) {
  if (typeof onInput !== 'function') {
    throw new TypeError(
      'createLiveAudioInput requires an onInput callback.',
    );
  }

  let liveAudioStream = null;
  let liveAudioContext = null;
  let liveAudioSource = null;
  let liveAudioAnalyser = null;
  let liveAudioSamples = null;
  let liveAudioAnimationFrame = null;

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

    onInput(smoothedInput);


    liveAudioAnimationFrame =
      requestAnimationFrame(
        measureLiveAudioLevel,
      );
  }

  async function start() {
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

  async function stop() {
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

  return {
    start,
    stop,
  };
}