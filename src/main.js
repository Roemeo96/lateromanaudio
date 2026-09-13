import './styles/main.css';

import {
  initializeRevealSections,
} from './reveal-sections.js';

import {
  initializeRangeFills,
} from './range-fill.js';

import {
  initializePurchaseControls,
} from './purchase.js';

import {
  initializeSectionParticles,
  updateParticleWobble,
} from './hero-particles.js';

import {
  createPedalSimulation,
} from './pedal-simulation.js';

import {
  initializeMobileMenu,
} from './mobile-menu.js';

import {
  initializeDemoCarousel,
} from './demo-carousel.js';

import {
  initializeThemeToggle,
} from "./theme.js";

import {
  initializeVisualizationSwitch,
} from './visualization-switch.js';

import "@google/model-viewer";

initializeDemoCarousel();

initializeMobileMenu();

initializeThemeToggle();

initializePurchaseControls();

const pedalSimulation =
  createPedalSimulation();

initializeVisualizationSwitch();

initializeRevealSections();

pedalSimulation.render();

initializeSectionParticles()
  .then(() => {
    updateParticleWobble(
      pedalSimulation.getCurrentOutput(),
    );
  })
  .catch((error) => {
    console.error(
      "Section particles could not be initialized:",
      error,
    );
  });

pedalSimulation.start();

initializeRangeFills();
