import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { loadWobbleUpdater } from "@tsparticles/updater-wobble";

const particleContainers = [];

const particleWobbleFactors =
  new WeakMap();

const particleOptions = {
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
      color: {
        value: "#eee8d5",
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
        min: 0.2,
        max: 0.7,
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

  const container = await tsParticles.load({
    id: containerId,
    options: particleOptions,
  });

  if (container) {
    particleContainers.push(container);
  }
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

  await loadSlim(tsParticles);

  await loadWobbleUpdater(tsParticles);

  await Promise.all([
    initializeParticles("hero-particles"),
    initializeParticles("features-particles"),
    initializeParticles("specifications-particles"),

    initializeParticles("simulation-showcase-particles"),
  ]);
}

export function updateParticleWobble(currentOutput) {
  const normalizedPosition = Math.min(
    1,
    Math.max(0, currentOutput / 5),
  );

  const minimumDistance =
    normalizedPosition * 20;

  const maximumDistance =
    normalizedPosition * 40;

  const moveSpeed =
    normalizedPosition * 1.5;

  const minimumOpacity =
    0.3 + normalizedPosition * 0.2;

  const maximumOpacity =
    0.7 + normalizedPosition * 0.25;

  particleContainers.forEach((container) => {
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
        particleWobbleFactors.get(particle);

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
  });
}
