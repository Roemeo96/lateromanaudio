
  (() => {
    const paletteByWeekday = {
      monday: "oxblood",
      tuesday: "electric-byzantium",
      wednesday: "oxidized-machine",
      thursday: "plum-acid",
      friday: "cobalt-apricot",
      saturday: "black-mass",
      sunday: "infrared-xerox",
    };

    const availablePalettes =
      Object.values(
        paletteByWeekday,
      );

    let storedTheme = null;

    try {
      storedTheme =
        localStorage.getItem("theme");
    } catch {
      // Use system preference if storage is unavailable.
    }

    const systemTheme =
      window.matchMedia(
        "(prefers-color-scheme: light)",
      ).matches
        ? "light"
        : "dark";

    const theme =
      storedTheme === "light"
      || storedTheme === "dark"
        ? storedTheme
        : systemTheme;


    /*
     * Determine weekday in German local time.
     */

    const weekday =
      new Intl.DateTimeFormat(
        "en-US",
        {
          timeZone: "Europe/Berlin",
          weekday: "long",
        },
      )
        .format(new Date())
        .toLowerCase();


    /*
     * Optional development override:
     *
     * ?palette=oxblood
     * ?palette=plum-acid
     * etc.
     */

    const requestedPalette =
      new URLSearchParams(
        window.location.search,
      ).get("palette");

    const palette =
      availablePalettes.includes(
        requestedPalette,
      )
        ? requestedPalette
        : paletteByWeekday[weekday];


    document.documentElement.dataset.theme =
      theme;

    document.documentElement.dataset.palette =
      palette;
  })();
