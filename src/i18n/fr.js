export default {
  lang: "fr",

  seo: {
    title: "Late Roman Audio | {product.name} : pédale d’expression pilotée par la dynamique de jeu",
    description:
      "{product.name} exploite la dynamique de votre instrument pour piloter des effets compatibles via leur entrée d’expression.",
    productDescription:
      "Pédale d'expression contrôlée par la dynamique de Late Roman Audio.",
  },

  header: {
    homeAriaLabel: "Late Roman Avdio – Accueil",
    openNavigationAriaLabel: "Ouvrir la navigation",
    closeNavigationAriaLabel: "Fermer la navigation",
    themeToggleAriaLabel: "Passer au mode clair",
    themeToggleDarkAriaLabel: "Passer au mode sombre",
    cartAriaLabel: "Ouvrir le panier",
    cart: "Panier",
  },

  nav: {
    skipToContent: "Aller au contenu principal",
    ariaLabel: "Navigation principale",
    pedal: "Pédale",
    features: "Fonctions",
    demo: "Démos",
    simulation: "Simulation",
    specifications: "Caractéristiques techniques",
  },

  language: {
    ariaLabel: "Sélectionner la langue",
  },

  hero: {
    heading: "{product.name} : pédale d’expression pilotée par la dynamique de jeu",
    presents: "présente",
    tagline1: "La dynamique perdue à la compression",
    tagline2: "Devient un signal de commande",
    description1: {
      before: "{product.name} exploite la dynamique de votre instrument",
      accent: "pour piloter l’entrée d’expression d’une pédale d’effet compatible",
      after:
        ".",
    },
    description2: "",
  },

  purchase: {
    gallery: {
      top: "{product.name}: Vue de dessus",
      front: "{product.name}: Vue de face",
      lowAngle: "{product.name}: Vue en contre-plongée",
    },
    imageAlt: "Pédale {product.name} de Late Roman Audio",
    figcaption: "{product.name} de Late Roman Audio",
    status: { OutOfStock: "Bientôt disponible" },
    quantity: "Quantité",
    addToCart: "Ajouter au panier",
    
description: "Pédale d’expression contrôlée par la dynamique de jeu, conçue par Late Roman Audio. Livrée avec {product.cables.count} câbles {product.cables.connector} de {product.cables.lengthCm} cm.",
cablesIncluded: "{product.cables.count} câbles {product.cables.connector} de {product.cables.lengthCm} cm chacun sont fournis.",
cablesDescription: "",

  },

why: {
  heading: "Pourquoi {product.name} ?",
  principle:
    "Pilotez un paramètre d’une pédale compatible par la dynamique de votre jeu.",
  benefit:
    "Vous pouvez aussi piloter ce paramètre avec un signal séparé.",
  effects: {
    modulation: "Modulation dynamique",
    swell: "Auto-Swell",
    filters: "Filtres d’enveloppe",
    dirt: "Saturation dynamique",
    delayReverb: "Delay et réverbération dynamiques",
    ducking: "Ducking en sidechain",
  },
  effectDescriptions: {
    modulation: "Faites varier la vitesse ou la profondeur d’un trémolo selon la dynamique de votre attaque.",
    swell: "Agissez sur le niveau pour faire monter chaque note progressivement.",
    filters: "Faites varier la fréquence d’une bande d’égalisation selon votre dynamique de jeu.",
    dirt: "Dosez la proportion d’overdrive ou de fuzz selon votre attaque.",
    delayReverb: "Prolongez les répétitions du delay ou faites reculer la réverbération quand vous jouez.",
    ducking: "Utilisez un signal séparé pour atténuer un effet dans une autre chaîne audio.",
  },
  manual: {
    title: "Manuel {product.name}",
    description: "Routage du signal, réglages et exemples de configuration.",
    action: "Ouvrir le manuel (en anglais)",
  },
},

  model: {
    actions: {
      label: "Commandes du modèle 3D",
      rotate: "Faire pivoter",
      zoomIn: "Agrandir",
      zoomOut: "Réduire",
      motion: "Animation d’arrière-plan",
    },
    kicker: "{product.uppercaseName} / MODÈLE 3D INTERACTIF",
    heading: "Explorez la pédale",
    description:
      "Examinez les réglages, les commutateurs et les connecteurs.",
    interactiveLabel: "MODÈLE INTERACTIF",
    alt: "{product.name}, pédale d’expression pilotée par la dynamique",
    instructions:
      "FAIRE GLISSER POUR TOURNER · FAIRE DÉFILER POUR ZOOMER",
    meta: {
      controls: "RÉGLAGES",
      switches: "COMMUTATEURS",
      levelDisplay: "AFFICHAGE DU NIVEAU",
      expressionControl: "COMMANDE D’EXPRESSION",
    },
  },

  features: {
    heading: "Réglages de {product.name}",
    base: {
      label: "Base",
      description:
        "Définit la position d’expression lorsque le niveau d’entrée est faible.",
    },
    sensitivity: {
      label: "Sensitivity",
      description:
        "Détermine de combien la position d’expression se déplace quand le niveau d’entrée varie.",
    },
    rise: {
      label: "Rise",
      description:
        "Règle la vitesse de réaction quand le niveau d’entrée monte.",
    },
    fall: {
      label: "Fall",
      description:
        "Règle la vitesse de réaction quand le niveau d’entrée baisse.",
    },
    invert: {
      label: "Invert",
      description:
        "Inverse le sens du mouvement d’expression lorsque le niveau d’entrée varie.",
    },
  },

  demo: {
    eyebrow: "",
    heading: "Démos de {product.name}",
    previousAriaLabel: "Démo précédente",
    nextAriaLabel: "Démo suivante",
    video1: {
      label: "Vidéo 01",
      heading: "Deux sorties d’expression",
      description:
        "EXP 1 pilote le trémolo. EXP 2 règle la proportion de delay avec une réponse inversée.",
    },
    video2: {
      label: "Vidéo 02",
      heading: "Sidechain",
      description:
        "Un signal d’entrée séparé pilote un paramètre d’effet dans une autre chaîne audio.",
    },
  },

  simulation: {
    heading: "Simulation de la pédale",
    description: {
      before:
        "{product.name} reproduit le comportement du potentiomètre d’une pédale d’expression en ",
      accent:
        "faisant varier la résistance présentée à une entrée d’expression compatible",
      after:
        ". Réglez le niveau d’entrée manuellement ou sélectionnez « Audio en direct » pour utiliser votre micro. Modifiez les réglages et observez la position d’expression simulée.",
    },
    panelHeading: "Simulation interactive de {product.name}",
    pedal: {
      heelDown: "Talon en bas",
      toeDown: "Pointe en bas",
    },
    controls: {
      sensitivity: "Sensitivity",
      base: "Base",
      rise: "Rise",
      fall: "Fall",
      invert: "Invert",
    },
    invertAriaLabel: "Inverser le sens de la commande d’expression",
    visualization: {
      eyebrow: "Position d’expression",
      heading: "De la dynamique à l’expression",
    },
    input: {
      source: "Source d'entrée",
      manual: "Manuel",
      liveAudio: "Audio en direct",
      listening: "Micro actif",
      privacy:
        "Le traitement s’effectue dans votre navigateur. Aucune donnée audio n’est envoyée.",
      level: "Niveau d’entrée",

      requesting:
        "Demande d'accès à l'audio…",
      accessDenied:
        "L'accès à l'entrée audio a été refusé.",
      noDevice:
        "Aucun périphérique d'entrée audio trouvé.",
      startFailed:
        "Impossible de démarrer l'entrée audio.",
    },
    values: {
      input: "Entrée",
      output: "Sortie",
    },
  },


  specifications: {
    approximate: "env.",
    heading: "Caractéristiques techniques",
    input: {
      label: "Entrée",
      value: "{product.connections.input.count}× entrée {product.connections.input.connector}",
    },
    expression: {
      label: "Sorties d’expression",
      value: "{product.connections.expression.count}× sorties {product.connections.expression.connector} Expression",
    },
    output: {
      label: "Sortie",
      value: "{product.connections.output.count}× sortie {product.connections.output.connector}",
    },
    outputImpedance: {
      label: "Impédance de sortie",
    },
    powerSupply: {
      label: "Alimentation",
      polarity: { centerNegative: "centre négatif" },
    },
    currentDraw: {
      label: "Consom\u00admation",
    },
    bypass: {
      label: "Bypass",
    },
    dimensions: {
      label: "Dimensions",
    },
    weight: {
      label: "Poids",
    },
compatibility: {
  heading: "Compatibilité",
  description:
    "La linéarité de la réponse et la constance de la résistance totale sur toute la course émulée ne sont pas garanties. Utilisez {product.name} uniquement avec des appareils qui n’exigent pas de valeur précise de résistance du potentiomètre. La sortie d’expression ne fournit pas de véritable signal CV. La compatibilité dépend de l’appareil.",
},
  },

  footer: {
    ariaLabel: "Navigation du pied de page",
    imprint: "Impressum",
    privacy: "Politique de confidentialité",
    contact: "Contact",
    instagramAriaLabel:
      "Late Roman Audio sur Instagram",
  },
};
