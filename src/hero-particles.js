import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

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
        max: 0.4,
        },
      random: true,
      straight: false,

      outModes: {
        default: "out",
      },
    },

    number: {
      value: 55,

      density: {
        enable: true,
        width: 1000,
        height: 600,
      },
    },

    opacity: {
      value: {
        min: 0.1,
        max: 0.5,
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

  await tsParticles.load({
    id: containerId,
    options: particleOptions,
  });
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

  await Promise.all([
    initializeParticles("hero-particles"),
    initializeParticles("features-particles"),
    initializeParticles("specifications-particles"),
  ]);
}