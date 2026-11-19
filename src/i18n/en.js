export default {
  lang: "en",

  seo: {
    canonical: "https://lateromanaudio.de/en/",
    title: "Late Roman Audio | {product.name} – Dynamics-Controlled Expression Pedal",
    description:
      "{product.name} transforms your instrument's playing dynamics into expression-pedal control, letting you control compatible effects directly through your performance.",
    productDescription:
      "Dynamics-controlled expression pedal by Late Roman Audio.",
  },

  links: {
    home: "/en/",
  },

  header: {
    homeAriaLabel: "Late Roman Audio – Home",
    openNavigationAriaLabel: "Open navigation",
    closeNavigationAriaLabel: "Close navigation",
    themeToggleAriaLabel: "Switch to light mode",
    themeToggleDarkAriaLabel: "Switch to dark mode",
    cartAriaLabel: "Open shopping cart",
    cart: "Cart",
    },

  nav: {
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
    heading: "{product.name} – An Expression Pedal Controlled by Your Playing Dynamics",
    presents: "presents",
    tagline1: "The Dynamics You Lost After Compression",
    tagline2: "Reborn as Control",
    description1: {
      before: "{product.name} turns your instrument's ",
      accent: "playing dynamics into expression control",
      after:
        ". Instead of moving a conventional expression pedal with your foot, you can control compatible effects directly through how softly or aggressively you play.",
    },
    description2: "Control a modulation pedal’s depth or rate with your picking dynamics. Sweep an EQ band’s frequency as you play to create an envelope filter, or control the level for auto-swell. Feed {product.name} a separate sidechain signal to create ducking. Make reverb recede while you play and come back in the gaps, or use your picking dynamics to make delay repeats linger or fade faster.",
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
cablesIncluded: "{product.cables.count} × {product.cables.connector} cables ({product.cables.lengthCm} cm each) included",
cablesDescription: "{product.cables.count} basic {product.cables.connector} cables are included so you can connect {product.name} right out of the box. Since cable length, color, and connector type depend on your pedalboard, they're intended as a practical starting point rather than a one-size-fits-all solution.",

  },

why: {
  heading: "Why {product.name}?",
  principle:
    "{product.name} emulates the potentiometer inside a traditional expression pedal. As you play, it changes the resistance seen by a compatible expression input, moving the assigned parameter in real time.",
  benefit:
    "That lets the pedals you already own respond to your playing dynamics, even if they have no built-in dynamic control. Here are a few things you can do with it.",
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
    swell: "Control the level to make notes fade in smoothly.",
    filters: "Sweep an EQ band’s frequency with your playing dynamics.",
    dirt: "Use your attack to control the mix of an overdrive or fuzz pedal.",
    delayReverb: "Let delay repeats linger longer or make reverb recede while you play.",
    ducking: "Use a separate signal to turn down an effect in another signal path.",
  },
  manual: {
    title: "{product.name} Manual",
    description: "Signal routing, controls and example setups.",
    action: "Open manual",
  },
},

  model: {
    kicker: "{product.uppercaseName} / INTERACTIVE 3D",
    heading: "Explore the pedal.",
    description:
      "Get a closer look at the controls, switches and physical layout of {product.name}.",
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
        "Sets the expression position used when the input signal is quiet.",
    },
    sensitivity: {
      label: "Sensitivity",
      description:
        "Adjusts how strongly the expression output responds to changes in input level.",
    },
    rise: {
      label: "Rise",
      description:
        "Controls how quickly the pedal responds as the input level increases.",
    },
    fall: {
      label: "Fall",
      description:
        "Controls how quickly the pedal responds as the input level decreases.",
    },
    invert: {
      label: "Invert",
      description:
        "Reverses the response so louder playing moves the expression position in the opposite direction.",
    },
  },

  demo: {
    eyebrow: "See it in action",
    heading: "{product.name} in Motion",
    previousAriaLabel: "Previous demo",
    nextAriaLabel: "Next demo",
    video1: {
      label: "Video 01",
      heading: "Dual Expression",
      description:
        "EXP1 drives tremolo. EXP2 controls an inverted delay mix. Then both come alive together.",
    },
    video2: {
      label: "Video 02",
      heading: "Sidechain",
      description:
        "An external signal drives the expression response, turning dynamics into control across another signal path.",
    },
  },

  simulation: {
    heading: "Pedal Simulation",
    description: {
      before:
        "Try the interactive simulation below to explore how {product.name} translates ",
      accent: "playing dynamics into expression control",
      after:
        ". Set the input level by hand or use your microphone as a live input. Adjust the pedal controls and watch how the simulated expression signal responds.",
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
    heading: "Specifications",
    input: {
      label: "Input",
      value: "{product.connections.input.count}× {product.connections.input.connector} input jack",
    },
    expression: {
      label: "Expression",
      value: "{product.connections.expression.count}× {product.connections.expression.connector} expression output jacks",
    },
    output: {
      label: "Output",
      value: "{product.connections.output.count}× {product.connections.output.connector} output jack",
    },
    outputImpedance: {
      label: "Output impedance",
      value: "100 Ω",
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
      value: "145 mm × 100 mm × 100 mm",
    },
    weight: {
      label: "Weight",
    },
    compatibility: {
  heading: "Compatibility Notice",
  description:
    "The pedal emulates the behavior of an expression-pedal potentiometer, but neither a perfectly linear transfer characteristic nor a constant total resistance across the emulated travel is guaranteed. Use it only with devices that do not require a specific potentiometer resistance. The output is not a true CV signal and may not be compatible with all devices.",
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
