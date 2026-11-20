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

import { initializeProductGallery } from './product-gallery.js';
import { initializeModelControls } from './model-controls.js';
import { initializeRotaryControls } from './rotary-controls.js';

initializeDemoCarousel();
initializeProductGallery();
initializeModelControls();

initializeMobileMenu();

initializeThemeToggle();

initializePurchaseControls();

const pedalSimulation =
  createPedalSimulation();

initializeRevealSections();

pedalSimulation.render();

initializeRangeFills();
initializeRotaryControls();

import './studio-preview.js';

initializeSectionParticles()
  .then(() => updateParticleWobble(pedalSimulation.getCurrentOutput()))
  .catch(error => console.error('Particle initialization failed:', error));
import './editorial-motion.js';

import './application-visuals.js';

import './hold-input.js';
