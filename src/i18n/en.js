export default {
  lang: "en",

  seo: {
    title: "Late Roman Audio | {product.name} – Dynamics-Controlled Expression Pedal",
    description:
      "{product.name} uses your instrument’s dynamics to control compatible effects through their expression inputs.",
    productDescription:
      "Dynamics-controlled expression pedal by Late Roman Audio.",
  },

  header: {
    homeAriaLabel: "Late Roman Avdio – Home",
    openNavigationAriaLabel: "Open navigation",
    closeNavigationAriaLabel: "Close navigation",
    themeToggleAriaLabel: "Switch to light mode",
    themeToggleDarkAriaLabel: "Switch to dark mode",
    cartAriaLabel: "Open shopping cart",
    cart: "Cart",
    },

  nav: {
    skipToContent: "Skip to main content",
    ariaLabel: "Main navigation",
    pedal: "Pedal",
    features: "Features",
    demo: "Demo",
    simulation: "Simulation",
    specifications: "Specifications",
  },

  language: {
    ariaLabel: "Select language",
  },

  hero: {
    heading: "{product.name}: Dynamics-Controlled Expression Pedal",
    presents: "presents",
    tagline1: "The Dynamics You Lost After Compression",
    tagline2: "Reborn as Control",
    description1: {
      before: "{product.name} uses your instrument’s dynamics to control the",
      accent: "expression input of a compatible effect pedal",
      after:
        ".",
    },
    description2: "",
  },

  purchase: {
    gallery: {
      top: "{product.name}: Top view",
      front: "{product.name}: Front view",
      lowAngle: "{product.name}: Low-angle view",
    },
    imageAlt: "{product.name} pedal by Late Roman Audio",
    figcaption: "{product.name} by Late Roman Audio",
    status: { OutOfStock: "Coming soon" },
    quantity: "Quantity",
    addToCart: "Add to cart",
    
description: "Dynamics-controlled expression pedal by Late Roman Audio. Includes {product.cables.count} × {product.cables.lengthCm} cm {product.cables.connector} cables.",
cablesIncluded: "Includes {product.cables.count} {product.cables.connector} cables, {product.cables.lengthCm} cm each.",
cablesDescription: "",

  },

why: {
  heading: "Why {product.name}?",
  principle:
    "Make a parameter on a compatible pedal follow your picking dynamics, or use a separate signal to control it.",
  benefit:
    "",
  effects: {
    modulation: "Dynamic Modulation",
    swell: "Auto-Swell",
    filters: "Envelope Filters",
    dirt: "Dynamic Dirt",
    delayReverb: "Dynamic Delay &amp; Reverb",
    ducking: "Sidechain Ducking",
  },
  effectDescriptions: {
    modulation: "Let tremolo rate or depth follow your picking dynamics.",
    swell: "Use level control to fade in each note.",
    filters: "Sweep an EQ band’s frequency with your playing dynamics.",
    dirt: "Use your attack to control the mix of an overdrive or fuzz pedal.",
    delayReverb: "Let delay repeats linger longer or make reverb recede while you play.",
    ducking: "Use a separate signal to duck an effect in another signal path.",
  },
  manual: {
    title: "{product.name} Manual",
    description: "Signal routing, controls and example setups.",
    action: "Open manual",
  },
},

  model: {
    actions: {
      label: "3D model controls",
      rotate: "Rotate model",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      motion: "Background motion",
    },
    kicker: "{product.uppercaseName} / INTERACTIVE 3D",
    heading: "Explore the pedal.",
    description:
      "Inspect the controls, switches and connections.",
    interactiveLabel: "INTERACTIVE MODEL",
    alt: "{product.name} expression control pedal",
    instructions: "DRAG TO ROTATE · SCROLL TO ZOOM",
    meta: {
      controls: "CONTROLS",
      switches: "SWITCHES",
      levelDisplay: "LEVEL DISPLAY",
      expressionControl: "EXPRESSION CONTROL",
    },
  },

  features: {
    heading: "{product.name} Features",
    base: {
      label: "Base",
      description:
        "Sets the expression position at low input levels.",
    },
    sensitivity: {
      label: "Sensitivity",
      description:
        "Sets how much the expression position moves as the input level changes.",
    },
    rise: {
      label: "Rise",
      description:
        "Sets the response speed as the input level rises.",
    },
    fall: {
      label: "Fall",
      description:
        "Sets the response speed as the input level falls.",
    },
    invert: {
      label: "Invert",
      description:
        "Reverses the direction of expression movement as the input level changes.",
    },
  },

  demo: {
    eyebrow: "",
    heading: "{product.name} Demos",
    previousAriaLabel: "Previous demo",
    nextAriaLabel: "Next demo",
    video1: {
      label: "Video 01",
      heading: "Dual Expression",
      description:
        "EXP1 controls tremolo. EXP2 controls the delay mix with an inverted response.",
    },
    video2: {
      label: "Video 02",
      heading: "Sidechain",
      description:
        "A separate input signal controls an effect parameter in another signal path.",
    },
  },

  simulation: {
    heading: "Pedal Simulation",
    description: {
      before:
        "{product.name} emulates an expression-pedal potentiometer by ",
      accent: "varying the resistance seen by a compatible expression input",
      after:
        ". Set the input level manually or select Live Audio to use your microphone. Adjust the controls and watch the simulated expression position change.",
    },
    panelHeading: "Interactive {product.name} simulation",
    pedal: {
      heelDown: "HEEL-DOWN",
      toeDown: "TOE-DOWN",
    },
    controls: {
      sensitivity: "Sensitivity",
      base: "Base",
      rise: "Rise",
      fall: "Fall",
      invert: "Invert",
    },
    invertAriaLabel: "Invert expression direction",
    visualization: {
      eyebrow: "Expression Mapping",
      heading: "From Dynamics to Expression",
    },
    input: {
        source: "Input Source",
        manual: "Manual",
        liveAudio: "Live Audio",
        listening: "Listening…",
        privacy: "Processed locally in your browser. Not uploaded.",
        level: "Input Level",

        requesting: "Requesting audio access…",
        accessDenied: "Audio input access denied.",
        noDevice: "No audio input device found.",
        startFailed: "Audio input could not be started.",
        },
    values: {
      input: "Input",
      output: "Output",
    },
  },


  specifications: {
    approximate: "approx.",
    heading: "Specifications",
    input: {
      label: "Input",
      value: "{product.connections.input.count}× {product.connections.input.connector} input jack",
    },
    expression: {
      label: "Expression outputs",
      value: "{product.connections.expression.count}× {product.connections.expression.connector} expression output jacks",
    },
    output: {
      label: "Output",
      value: "{product.connections.output.count}× {product.connections.output.connector} output jack",
    },
    outputImpedance: {
      label: "Output impedance",
    },
    powerSupply: {
      label: "Power supply",
      polarity: { centerNegative: "center-negative" },
    },
    currentDraw: {
      label: "Current draw",
    },
    bypass: {
      label: "Bypass",
    },
    dimensions: {
      label: "Dimensions",
    },
    weight: {
      label: "Weight",
    },
    compatibility: {
  heading: "Compatibility Notice",
  description:
    "Linearity and constant total resistance are not guaranteed across the full emulated travel. Use {product.name} only with devices that do not require a specific potentiometer resistance. The expression output is not a true CV signal. Compatibility varies by device.",
},
  },

  footer: {
    ariaLabel: "Footer navigation",
    imprint: "Imprint",
    privacy: "Privacy Policy",
    contact: "Contact",
    instagramAriaLabel: "Late Roman Audio on Instagram",
  },
};
