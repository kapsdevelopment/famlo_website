const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -30px 0px",
    },
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

(function setupShowcaseCarousel() {
  const root = document.querySelector("[data-showcase-carousel]");

  if (!root) {
    return;
  }

  const language = (document.documentElement.lang || "nb").split("-")[0];
  const localize = (value) => {
    if (typeof value === "string") {
      return value;
    }

    return value?.[language] || value?.nb || "";
  };
  const carouselLabels = {
    nb: {
      previous: "Vis forrige skjermbilde",
      next: "Vis neste skjermbilde",
    },
    en: {
      previous: "Show previous screenshot",
      next: "Show next screenshot",
    },
    fi: {
      previous: "Näytä edellinen kuva",
      next: "Näytä seuraava kuva",
    },
  };
  const labels = carouselLabels[language] || carouselLabels.nb;

  const slides = [
    {
      title: {
        nb: "Dashboard",
        en: "Dashboard",
        fi: "Kojelauta",
      },
      tone: "paper",
      image: {
        nb: "/assets/images/screenshot-dashboard-oslo.png",
        en: "/assets/images/carousel-dashboard-en.png",
        fi: "/assets/images/carousel-dashboard-fi.png",
      },
      placeholder: {
        kicker: {
          nb: "Oversikt",
          en: "Overview",
          fi: "Yleiskuva",
        },
        status: {
          nb: "Nå",
          en: "Now",
          fi: "Nyt",
        },
        headline: {
          nb: "Morgenklar",
          en: "Ready for the morning",
          fi: "Valmis aamuun",
        },
        subtitle: {
          nb: "Vær og neste avganger side om side.",
          en: "Weather and next departures side by side.",
          fi: "Sää ja seuraavat lähdöt vierekkäin.",
        },
        panels: [
          {
            title: { nb: "Vær", en: "Weather", fi: "Sää" },
            detail: "Oslo",
          },
          {
            title: { nb: "Kollektiv", en: "Transit", fi: "Joukkoliikenne" },
            detail: "Majorstuen",
          },
        ],
      },
    },
    {
      title: {
        nb: "Vær",
        en: "Weather",
        fi: "Sää",
      },
      tone: "sky",
      image: {
        nb: "/assets/images/screenshot-weather-oslo.png",
        en: "/assets/images/carousel-weather-en.png",
        fi: "/assets/images/carousel-weather-fi.png",
      },
      placeholder: {
        kicker: {
          nb: "Vær",
          en: "Weather",
          fi: "Sää",
        },
        status: {
          nb: "Detalj",
          en: "Details",
          fi: "Tiedot",
        },
        headline: {
          nb: "Tre dager frem",
          en: "Three days ahead",
          fi: "Kolme päivää eteenpäin",
        },
        subtitle: {
          nb: "En stor flate som gjør det lett å sammenligne været time for time.",
          en: "A large view that makes it easy to compare the weather hour by hour.",
          fi: "Suuri näkymä tekee säästä helpon verrata tunti tunnilta.",
        },
        panels: [
          {
            title: { nb: "Nå", en: "Now", fi: "Nyt" },
            detail: "Oslo",
          },
          {
            title: { nb: "Vind", en: "Wind", fi: "Tuuli" },
            detail: "Live",
          },
        ],
      },
    },
    {
      title: {
        nb: "Neste 5 dager",
        en: "Next 5 days",
        fi: "Seuraavat 5 päivää",
      },
      tone: "paper",
      image: {
        nb: "/assets/images/screenshot3.png",
        en: "/assets/images/carousel-5days-en.png",
        fi: "/assets/images/carousel-5days-fi.png",
      },
      placeholder: {
        kicker: {
          nb: "Kalender",
          en: "Calendar",
          fi: "Kalenteri",
        },
        status: {
          nb: "5 dager",
          en: "5 days",
          fi: "5 päivää",
        },
        headline: {
          nb: "Dagens flyt",
          en: "The flow of the day",
          fi: "Päivän kulku",
        },
        subtitle: {
          nb: "Den nære planleggingen blir tydelig uten å miste roen i layouten.",
          en: "Near-term planning stays clear without making the layout noisy.",
          fi: "Lähiajan suunnittelu pysyy selkeänä ilman levotonta asettelua.",
        },
        panels: [
          {
            title: { nb: "Mandag", en: "Monday", fi: "Maanantai" },
            detail: {
              nb: "3 aktiviteter",
              en: "3 activities",
              fi: "3 menoa",
            },
          },
          {
            title: { nb: "Neste", en: "Next", fi: "Seuraava" },
            detail: { nb: "Fredag", en: "Friday", fi: "Perjantai" },
          },
        ],
      },
    },
    {
      title: {
        nb: "Måned",
        en: "Month",
        fi: "Kuukausi",
      },
      tone: "paper",
      image: {
        nb: "/assets/images/screenshot5.png",
        en: "/assets/images/carousel-month-en.png",
        fi: "/assets/images/carousel-month-fi.png",
      },
      placeholder: {
        kicker: {
          nb: "Kalender",
          en: "Calendar",
          fi: "Kalenteri",
        },
        status: {
          nb: "Måned",
          en: "Month",
          fi: "Kuukausi",
        },
        headline: {
          nb: "Hele april",
          en: "All of April",
          fi: "Koko huhtikuu",
        },
        subtitle: {
          nb: "Store ruter gjør det mulig å se både rytme og detaljer samtidig.",
          en: "Large cells make it possible to see rhythm and details at the same time.",
          fi: "Suuret ruudut näyttävät sekä rytmin että yksityiskohdat samalla kertaa.",
        },
        panels: [
          {
            title: { nb: "Måneden", en: "Month", fi: "Kuukausi" },
            detail: { nb: "30 dager", en: "30 days", fi: "30 päivää" },
          },
          {
            title: { nb: "Aktiviteter", en: "Activities", fi: "Menot" },
            detail: { nb: "4 planlagt", en: "4 planned", fi: "4 suunniteltu" },
          },
        ],
      },
    },
    {
      title: {
        nb: "År",
        en: "Year",
        fi: "Vuosi",
      },
      tone: "paper",
      image: {
        nb: "/assets/images/screenshot4.png",
        en: "/assets/images/carousel-year-en.png",
        fi: "/assets/images/carousel-year-fi.png",
      },
      placeholder: {
        kicker: {
          nb: "Kalender",
          en: "Calendar",
          fi: "Kalenteri",
        },
        status: {
          nb: "År",
          en: "Year",
          fi: "Vuosi",
        },
        headline: {
          nb: "Hele 2026",
          en: "All of 2026",
          fi: "Koko 2026",
        },
        subtitle: {
          nb: "Et rolig årsoverblikk for planlegging på lang sikt.",
          en: "A calm year view for long-term planning.",
          fi: "Rauhallinen vuosinäkymä pitkän aikavälin suunnitteluun.",
        },
        panels: [
          {
            title: { nb: "Året", en: "Year", fi: "Vuosi" },
            detail: { nb: "365 dager", en: "365 days", fi: "365 päivää" },
          },
          {
            title: { nb: "Aktiviteter", en: "Activities", fi: "Menot" },
            detail: {
              nb: "8 registrert",
              en: "8 registered",
              fi: "8 tallennettu",
            },
          },
        ],
      },
    },
  ];

  let currentIndex = 0;

  const prevScreen = root.querySelector('[data-showcase-screen="prev"]');
  const currentScreen = root.querySelector('[data-showcase-screen="current"]');
  const nextScreen = root.querySelector('[data-showcase-screen="next"]');
  const dots = root.querySelector("[data-showcase-dots]");
  const buttons = root.querySelectorAll("[data-showcase-shift]");

  function normalizedIndex(index) {
    return (index + slides.length) % slides.length;
  }

  function renderScreen(target, slide) {
    if (!target) {
      return;
    }

    const image = localize(slide.image);

    if (image) {
      target.innerHTML = `
        <img
          class="showcase-screen-image"
          src="${image}"
          alt="${localize(slide.title)}"
          loading="lazy"
        />
      `;
      return;
    }

    const { kicker, status, headline, subtitle, panels } = slide.placeholder;
    const panelsMarkup = panels
      .map(
        (panel) => `
          <div class="showcase-screen-panel">
            <strong>${localize(panel.title)}</strong>
            <span>${localize(panel.detail)}</span>
          </div>
        `,
      )
      .join("");

    target.innerHTML = `
      <div class="showcase-screen-placeholder showcase-tone-${slide.tone}">
        <div class="showcase-screen-top">
          <span class="showcase-screen-kicker">${localize(kicker)}</span>
          <span class="showcase-screen-status">${localize(status)}</span>
        </div>
        <div class="showcase-screen-body">
          <div class="showcase-screen-title">${localize(headline)}</div>
          <div class="showcase-screen-subtitle">${localize(subtitle)}</div>
        </div>
        <div class="showcase-screen-panels">
          ${panelsMarkup}
        </div>
      </div>
    `;
  }

  function renderDots() {
    if (!dots) {
      return;
    }

    dots.innerHTML = slides
      .map(
        (_, index) =>
          `<span class="showcase-dot${index === currentIndex ? " is-active" : ""}"></span>`,
      )
      .join("");
  }

  function render() {
    const prevIndex = normalizedIndex(currentIndex - 1);
    const nextIndex = normalizedIndex(currentIndex + 1);
    const current = slides[currentIndex];
    const prev = slides[prevIndex];
    const next = slides[nextIndex];

    renderScreen(prevScreen, prev);
    renderScreen(currentScreen, current);
    renderScreen(nextScreen, next);

    root
      .querySelector(".showcase-side-button-prev")
      ?.setAttribute("aria-label", `${labels.previous}: ${localize(prev.title)}`);
    root
      .querySelector(".showcase-side-button-next")
      ?.setAttribute("aria-label", `${labels.next}: ${localize(next.title)}`);

    renderDots();
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const shift = Number(button.getAttribute("data-showcase-shift") || "0");
      currentIndex = normalizedIndex(currentIndex + shift);
      render();
    });
  });

  render();
})();

(function setupSupportForm() {
  const form = document.getElementById("support-form");
  const iframe = document.getElementById("support-form-iframe");
  const statusBox = document.getElementById("form-status");
  const nextField = document.getElementById("nextField");

  if (!form || !iframe || !statusBox) {
    return;
  }

  form.target = iframe.name;
  const product = document.getElementById("product");
  if (product) {
    const selectKids = () => {
      product.querySelector('option[value="Famlo kids"]').defaultSelected = true;
      product.value = "Famlo kids";
    };
    if (new URLSearchParams(location.search).get("app") === "kids" || location.hash === "#famlo-kids") {
      selectKids();
    }
    window.addEventListener("hashchange", () => {
      if (location.hash === "#famlo-kids") selectKids();
    });
  }

  if (nextField) {
    nextField.value = `${window.location.origin}${window.location.pathname}?submitted=1#contact`;
  }

  const language = (document.documentElement.lang || "nb").split("-")[0];
  const messages = {
    nb: {
      success: "Takk! Meldingen er sendt. Vi følger opp så fort vi kan.",
      pending: "Sender meldingen din...",
      error:
        "Kunne ikke bekrefte innsendingen akkurat nå. Prøv igjen, eller send e-post til contact@kapsdevelopment.com.",
    },
    en: {
      success: "Thank you! Your message has been sent. We will follow up as soon as we can.",
      pending: "Sending your message...",
      error:
        "We could not confirm the submission right now. Please try again, or email contact@kapsdevelopment.com.",
    },
    fi: {
      success: "Kiitos! Viestisi on lähetetty. Palaamme asiaan mahdollisimman pian.",
      pending: "Lähetetään viestiäsi...",
      error:
        "Lähetystä ei voitu vahvistaa juuri nyt. Yritä uudelleen tai lähetä sähköposti osoitteeseen contact@kapsdevelopment.com.",
    },
  };
  const copy = messages[language] || messages.nb;

  const setStatus = (message, state) => {
    statusBox.textContent = message;
    statusBox.className = `form-status is-visible ${state}`;
  };

  const params = new URLSearchParams(window.location.search);
  if (params.get("submitted") === "1") {
    setStatus(copy.success, "is-success");

    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete("submitted");
    window.history.replaceState({}, "", cleanUrl.toString());
  }

  let pending = false;
  let timer = null;

  form.addEventListener("submit", () => {
    pending = true;
    setStatus(copy.pending, "is-pending");

    if (timer) {
      clearTimeout(timer);
    }

    timer = window.setTimeout(() => {
      if (!pending) {
        return;
      }

      pending = false;
      setStatus(copy.error, "is-error");
    }, 9000);
  });

  iframe.addEventListener("load", () => {
    if (!pending) {
      return;
    }

    pending = false;

    if (timer) {
      clearTimeout(timer);
    }

    setStatus(copy.success, "is-success");
    window.setTimeout(() => form.reset(), 60);
  });
})();
