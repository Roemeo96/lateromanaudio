import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { loadWobbleUpdater } from "@tsparticles/updater-wobble";

const PARTICLE_CONTAINER_IDS = [
  "hero-particles",
  "features-particles",
  "specifications-particles",
  "simulation-showcase-particles",
];

const particleContainers = [];
const particleWobbleFactors =
  new WeakMap();

let particlesEngineReady = false;
let themeObserver = null;
let lastKnownOutput = 0;

function getParticleColor() {
  const rootStyles =
    getComputedStyle(
      document.documentElement,
    );

  const particleColor =
    rootStyles
      .getPropertyValue(
        "--particle-color",
      )
      .trim();

  if (particleColor) {
    return particleColor;
  }

  return "#eee8d5";
}

function createParticleOptions() {
  return {
    fullScreen: {
      enable: false,
    },

    background: {
      color: {
        value: "transparent",
      },
    },

    fpsLimit: 60,

    detectRetina: true,

    interactivity: {
      detectsOn: "window",

      events: {
        onClick: {
          enable: false,
        },

        onHover: {
          enable: true,
          mode: "repulse",
        },

        resize: {
          enable: true,
        },
      },

      modes: {
        repulse: {
          distance: 200,
          duration: 0.2,
          speed: 0.05,
        },
      },
    },

    particles: {
      paint: {
        fill: {
          enable: true,

          color: {
            value: getParticleColor(),
          },
        },
      },

      links: {
        enable: false,
      },

      move: {
        enable: true,
        direction: "top",

        speed: {
          min: 0.1,
          max: 0.3,
        },

        random: true,
        straight: false,

        outModes: {
          default: "out",
        },
      },

      wobble: {
        enable: true,

        distance: {
          min: 0,
          max: 0,
        },

        speed: {
          angle: 300,
          move: 0,
        },
      },

      number: {
        value: 45,

        density: {
          enable: true,
          width: 1000,
          height: 600,
        },
      },

      opacity: {
        value: {
          min: 0.1,
          max: 0.6,
        },

        animation: {
          enable: true,
          speed: 0.2,
          sync: false,
        },
      },

      shape: {
        type: "circle",
      },

      size: {
        value: {
          min: 1.5,
          max: 4,
        },
      },
    },

    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
  };
}

function clearParticleContainers() {
  particleContainers.forEach(
    container => {
      container.destroy();
    },
  );

  particleContainers.length = 0;
}

/**
 * Initialisiert einen einzelnen Partikel-Container.
 *
 * @param {string} containerId
 */
async function initializeParticles(containerId) {
  const particleContainer =
    document.getElementById(containerId);

  if (!particleContainer) {
    return;
  }

  const container =
    await tsParticles.load({
      id: containerId,
      options: createParticleOptions(),
    });

  if (container) {
    particleContainers.push(container);
  }
}
async function initializeAllParticleContainers() {
  clearParticleContainers();

  await Promise.all(
    PARTICLE_CONTAINER_IDS.map(
      containerId =>
        initializeParticles(containerId),
    ),
  );

  updateParticleWobble(lastKnownOutput);
}

function initializeThemeObserver() {
  if (themeObserver) {
    return;
  }

  themeObserver =
    new MutationObserver(() => {
      refreshSectionParticles()
        .catch(error => {
          console.error(
            "Section particles could not be refreshed:",
            error,
          );
        });
    });

  themeObserver.observe(
    document.documentElement,
    {
      attributes: true,
      attributeFilter: [
        "data-theme",
      ],
    },
  );
}

/**
 * Initialisiert die dekorativen Staubpartikel
 * in allen vorgesehenen Bereichen.
 */
export async function initializeSectionParticles() {
  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

  if (prefersReducedMotion) {
    return;
  }

  if (!particlesEngineReady) {
    await loadSlim(tsParticles);
    await loadWobbleUpdater(tsParticles);

    particlesEngineReady = true;
  }

  initializeThemeObserver();

  await initializeAllParticleContainers();
}

export async function refreshSectionParticles() {
  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

  if (prefersReducedMotion) {
    return;
  }

  if (!particlesEngineReady) {
    return;
  }

  await initializeAllParticleContainers();
}

export function updateParticleWobble(currentOutput) {
  lastKnownOutput =
    currentOutput;

  const normalizedPosition = Math.min(
    1,
    Math.max(0, currentOutput / 5),
  );

  const minimumDistance =
    normalizedPosition * 15;

  const maximumDistance =
    normalizedPosition * 30;

  const moveSpeed =
    normalizedPosition * 1.5;

  const minimumOpacity =
    0.3 + normalizedPosition * 0.25;

  const maximumOpacity =
    0.7 + normalizedPosition * 0.25;

  particleContainers.forEach(
    container => {
      const particles =
        container.particles;

      for (
        let index = 0;
        index < particles.count;
        index += 1
      ) {
        const particle =
          particles.get(index);

        if (!particle) {
          continue;
        }

        let factor =
          particleWobbleFactors.get(
            particle,
          );

        if (factor === undefined) {
          factor = Math.random();

          particleWobbleFactors.set(
            particle,
            factor,
          );
        }

        const distance =
          minimumDistance
          + (
            maximumDistance
            - minimumDistance
          )
          * factor;

        const opacity =
          minimumOpacity
          + (
            maximumOpacity
            - minimumOpacity
          )
          * factor;

        if (particle.retina) {
          particle.retina.wobbleDistance =
            distance;
        }

        if (particle.wobble) {
          particle.wobble.moveSpeed =
            moveSpeed;
        }

        if (particle.opacity) {
          particle.opacity.value =
            opacity;
        }
      }
    },
  );
}