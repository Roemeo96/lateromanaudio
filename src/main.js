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

initializePurchaseControls();

const pedalSimulation =
  createPedalSimulation();

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