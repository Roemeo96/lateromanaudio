export default {
  lang: "de",

  seo: {
    canonical: "https://lateromanaudio.de/de/",
    title: "Late Roman Audio | {product.name}: Dynamikgesteuertes Expression-Pedal",
    description:
      "{product.name} nutzt die Dynamik deines Instruments, um kompatible Effekte über ihren Expression-Eingang zu steuern.",
    productDescription:
      "Dynamikgesteuertes Expression-Pedal von Late Roman Audio.",
  },

  links: {
    home: "/de/",
  },

  header: {
    homeAriaLabel: "Late Roman Audio – Startseite",
    openNavigationAriaLabel: "Navigation öffnen",
    closeNavigationAriaLabel: "Navigation schließen",
    themeToggleAriaLabel: "Zum hellen Modus wechseln",
    themeToggleDarkAriaLabel: "Zum dunklen Modus wechseln",
    cartAriaLabel: "Warenkorb öffnen",
    cart: "Warenkorb",
    },

  nav: {
    ariaLabel: "Hauptnavigation",
    pedal: "Effektpedal",
    features: "Funktionen",
    demo: "Demo",
    simulation: "Simulation",
    specifications: "Technische Daten",
  },

  language: {
    ariaLabel: "Sprache auswählen",
  },

  hero: {
    heading: "{product.name}: Dynamikgesteuertes Expression-Pedal",
    presents: "präsentiert",
    tagline1: "Die Dynamik, die der Kompressor nimmt",
    tagline2: "Wird zur Steuerung",
    description1: {
      before: "{product.name} nutzt die Dynamik deines Instruments",
      accent: "zur Steuerung des Expression-Eingangs eines kompatiblen Effektpedals",
      after:
        ".",
    },
    description2: "",
  },

purchase: {
  gallery: {
    top: "{product.name}: Draufsicht",
    front: "{product.name}: Vorderansicht",
    lowAngle: "{product.name}: Ansicht aus tiefer Perspektive",
  },
  imageAlt: "{product.name}, Expression-Pedal von Late Roman Audio",
  figcaption: "{product.name} von Late Roman Audio",
  status: { OutOfStock: "Demnächst verfügbar" },
  quantity: "Anzahl",
  addToCart: "In den Warenkorb",
  description: "Dynamikgesteuertes Expression-Pedal von Late Roman Audio. Inklusive 2 × 60 cm TRS-Kabel.",
  cablesIncluded: "Im Lieferumfang: {product.cables.count} {product.cables.connector}-Kabel, je {product.cables.lengthCm} cm.",
  cablesDescription: "",
},

why: {
  heading: "Warum {product.name}?",
  principle:
    "Steuere einen Parameter eines kompatiblen Pedals über deine Anschlagdynamik.",
  benefit:
    "Derselbe Parameter lässt sich auch über ein separates Signal steuern.",
  effects: {
    modulation: "Dynamische Modulation",
    swell: "Auto-Swell",
    filters: "Envelope-Filter",
    dirt: "Dynamische Verzerrung",
    delayReverb: "Dynamisches Delay &amp; Reverb",
    ducking: "Sidechain-Ducking",
  },
  effectDescriptions: {
    modulation: "Lass Geschwindigkeit oder Tiefe eines Tremolos deinem Anschlag folgen.",
    swell: "Blende jede Note über den Pegel ein.",
    filters: "Verschiebe die Frequenz eines EQ-Bands mit deiner Spieldynamik.",
    dirt: "Steuere den Mix eines Overdrives oder Fuzz-Pedals mit deinem Anschlag.",
    delayReverb: "Lass Delay-Wiederholungen länger nachklingen oder Hall beim Spielen zurücktreten.",
    ducking: "Senke mit einem separaten Signal den Effektanteil in einem anderen Signalweg ab.",
  },
  manual: {
    title: "{product.name}-Handbuch",
    description: "Signalführung, Regler und Beispiel-Setups.",
    action: "Handbuch öffnen (EN)",
  },
},

  model: {
    kicker: "{product.uppercaseName} / INTERAKTIVES 3D-MODELL",
    heading: "Entdecke das Pedal",
    description:
      "Sieh dir Regler, Schalter und Anschlüsse an.",
    interactiveLabel: "INTERAKTIVES MODELL",
    alt: "{product.name}, dynamikgesteuertes Expression-Pedal",
    instructions: "ZIEHEN ZUM DREHEN · SCROLLEN ZUM ZOOMEN",
    meta: {
      controls: "Bedienelemente",
      switches: "Schalter",
      levelDisplay: "PEGELANZEIGE",
      expressionControl: "EXPRESSION-STEUERUNG",
    },
  },

  features: {
    heading: "{product.name} Funktionen",
    base: {
      label: "Base",
      description:
        "Legt die Expression-Position bei niedrigem Eingangspegel fest.",
    },
    sensitivity: {
      label: "Sensitivity",
      description:
        "Bestimmt, wie stark sich die Expression-Position bei Pegeländerungen bewegt.",
    },
    rise: {
      label: "Rise",
      description:
        "Bestimmt, wie schnell die Expression-Steuerung auf einen steigenden Eingangspegel reagiert.",
    },
    fall: {
      label: "Fall",
      description:
        "Bestimmt, wie schnell die Expression-Steuerung auf einen fallenden Eingangspegel reagiert.",
    },
    invert: {
      label: "Invert",
      description:
        "Kehrt die Bewegungsrichtung der Expression-Steuerung um.",
    },
  },

  demo: {
    eyebrow: "",
    heading: "{product.name}-Demos",
    previousAriaLabel: "Vorherige Demo",
    nextAriaLabel: "Nächste Demo",
    video1: {
      label: "Video 01",
      heading: "Zwei Expression-Ausgänge",
      description:
        "EXP 1 steuert das Tremolo. EXP 2 regelt den Delay-Anteil mit umgekehrter Reaktion. Am Ende sind beide aktiv.",
    },
    video2: {
      label: "Video 02",
      heading: "Sidechain",
      description:
        "Ein separates Eingangssignal steuert den Expression-Parameter eines Effekts in einem anderen Signalweg.",
    },
  },

  simulation: {
    heading: "Pedal-Simulation",
    description: {
      before:
        "{product.name} verändert den Widerstand am kompatiblen Expression-Eingang ",
      accent: "wie ein herkömmliches Expression-Pedal",
      after:
        ". Stell den Eingangspegel von Hand ein oder wähle „Live-Audio“, um dein Mikrofon zu nutzen. Verändere die Regler und beobachte die simulierte Expression-Position.",
    },
    panelHeading: "Interaktive {product.name}-Simulation",
    pedal: {
      heelDown: "Ferse unten",
      toeDown: "Spitze unten",
    },
    controls: {
      sensitivity: "Sensitivity",
      base: "Base",
      rise: "Rise",
      fall: "Fall",
      invert: "Invert",
    },
    invertAriaLabel: "Expression-Richtung umkehren",
    visualization: {
      eyebrow: "Expression-Position",
      heading: "Von der Dynamik zur Expression",
    },
    input: {
        source: "Eingangsquelle",
        manual: "Manuell",
        liveAudio: "Live-Audio",
        listening: "Hört zu…",
        privacy: "Im Browser verarbeitet. Es werden keine Audiodaten übertragen.",
        level: "Eingangspegel",

        requesting: "Audiozugriff wird angefordert…",
        accessDenied: "Zugriff auf den Audioeingang wurde verweigert.",
        noDevice: "Kein Audioeingabegerät gefunden.",
        startFailed: "Audioeingang konnte nicht gestartet werden.",
        },
    values: {
      input: "Eingang",
      output: "Ausgang",
    },
  },


specifications: {
  heading: "Technische Daten",
  input: {
    label: "Eingang",
    value: "{product.connections.input.count}× {product.connections.input.connector}-Eingangsbuchse",
  },
  expression: {
    label: "Expression-Ausgänge",
    value: "{product.connections.expression.count}× {product.connections.expression.connector}-Expression-Ausgangsbuchsen",
  },
  output: {
    label: "Ausgang",
    value: "{product.connections.output.count}× {product.connections.output.connector}-Ausgangsbuchse",
  },
  outputImpedance: {
    label: "Ausgangsimpedanz",
    value: "ca. 2 kΩ",
  },
  powerSupply: {
    label: "Stromversorgung",
    polarity: { centerNegative: "innen negativ" },
  },
  currentDraw: {
    label: "Stromaufnahme",
  },
  bypass: {
    label: "Bypass",
  },
  dimensions: {
    label: "Abmessungen (L × B × H)",
    value: "ca. 120 mm × 90 mm × 60 mm",
  },
    weight: {
      label: "Gewicht",
    },
    compatibility: {
      heading: "Kompatibilitätshinweis",
      description:
        "Die simulierte Kennlinie ist nicht garantiert linear. Auch ein konstanter Gesamtwiderstand über den gesamten nachgebildeten Regelweg ist nicht garantiert. Verwende {product.name} nur mit Geräten, die keinen bestimmten Potentiometerwiderstand voraussetzen. Der Expression-Ausgang liefert kein echtes CV-Signal. Die Kompatibilität hängt vom angeschlossenen Gerät ab.",
    },
  },

  footer: {
    ariaLabel: "Footer-Navigation",
    imprint: "Impressum",
    privacy: "Datenschutzerklärung",
    contact: "Kontakt",
    instagramAriaLabel: "Late Roman Audio auf Instagram",
  },
};
