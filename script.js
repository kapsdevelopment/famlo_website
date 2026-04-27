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

  // Bytt `image` til faktiske skjermbildefiler når appskuddene er klare.
  const slides = [
    {
      badge: "Dashboard",
      title: "Stor oversikt for travel morgen",
      copy: "Dashboardet samler vær, kollektiv, kalender og Famlo-hjelp i én stor flate som fungerer godt på kjøkkenbordet eller veggen.",
      shortLabel: "Dashboard",
      tone: "paper",
      image: "./assets/images/screenshot1.png",
      placeholder: {
        kicker: "Oversikt",
        status: "Nå",
        headline: "Morgenklar",
        subtitle: "Vær og neste avganger side om side.",
        panels: [
          { title: "Vær", detail: "Lambertseter" },
          { title: "Kollektiv", detail: "Karlsrud → Jernbanetorget" },
        ],
      },
    },
    {
      badge: "Vær",
      title: "Detaljert vær når det faktisk trengs",
      copy: "På stor iPad får man time for time-visning med god luft, tydelige kort og plass til å sammenligne dagene raskt.",
      shortLabel: "Vær",
      tone: "sky",
      image: "./assets/images/screenshot2.png",
      placeholder: {
        kicker: "Vær",
        status: "Detalj",
        headline: "Tre dager frem",
        subtitle: "En stor flate som gjør det lett å sammenligne været time for time.",
        panels: [
          { title: "Nå", detail: "Lambertseter" },
          { title: "Vind", detail: "Live" },
        ],
      },
    },
    {
      badge: "5 dager",
      title: "De nærmeste dagene er raske å lese",
      copy: "Femdagersvisningen fungerer spesielt fint på iPad fordi hver dag får nok plass til å være nyttig uten å føles tung.",
      shortLabel: "5 dager",
      tone: "paper",
      image: "./assets/images/screenshot3.png",
      placeholder: {
        kicker: "Kalender",
        status: "5 dager",
        headline: "Dagens flyt",
        subtitle: "Den nære planleggingen blir tydelig uten å miste roen i layouten.",
        panels: [
          { title: "Mandag", detail: "3 aktiviteter" },
          { title: "Neste", detail: "Fredag" },
        ],
      },
    },
    {
      badge: "Måned",
      title: "Månedsvisningen gir familien overblikk",
      copy: "Når hele måneden ligger åpent på en stor skjerm, blir det lettere å snakke sammen om hva som faktisk skjer og hva som mangler.",
      shortLabel: "Måned",
      tone: "paper",
      image: "./assets/images/screenshot5.png",
      placeholder: {
        kicker: "Kalender",
        status: "Måned",
        headline: "Hele april",
        subtitle: "Store ruter gjør det mulig å se både rytme og detaljer samtidig.",
        panels: [
          { title: "Måneden", detail: "30 dager" },
          { title: "Aktiviteter", detail: "4 planlagt" },
        ],
      },
    },
    {
      badge: "År",
      title: "Årsvisningen gjør det lett å se rytmen",
      copy: "Når man zoomer ut til året, får man en tydelig følelse av ferier, helligdager og hvor tetthet og ro faktisk ligger.",
      shortLabel: "År",
      tone: "paper",
      image: "./assets/images/screenshot4.png",
      placeholder: {
        kicker: "Kalender",
        status: "År",
        headline: "Hele 2026",
        subtitle: "Et rolig årsoverblikk for planlegging på lang sikt.",
        panels: [
          { title: "Året", detail: "365 dager" },
          { title: "Aktiviteter", detail: "8 registrert" },
        ],
      },
    },
  ];

  let currentIndex = 0;

  const prevScreen = root.querySelector('[data-showcase-screen="prev"]');
  const currentScreen = root.querySelector('[data-showcase-screen="current"]');
  const nextScreen = root.querySelector('[data-showcase-screen="next"]');
  const badge = root.querySelector("[data-showcase-badge]");
  const title = root.querySelector("[data-showcase-title]");
  const copy = root.querySelector("[data-showcase-copy]");
  const dots = root.querySelector("[data-showcase-dots]");
  const buttons = root.querySelectorAll("[data-showcase-shift]");

  function normalizedIndex(index) {
    return (index + slides.length) % slides.length;
  }

  function renderScreen(target, slide) {
    if (!target) {
      return;
    }

    if (slide.image) {
      target.innerHTML = `
        <img
          class="showcase-screen-image"
          src="${slide.image}"
          alt="${slide.title}"
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
            <strong>${panel.title}</strong>
            <span>${panel.detail}</span>
          </div>
        `,
      )
      .join("");

    target.innerHTML = `
      <div class="showcase-screen-placeholder showcase-tone-${slide.tone}">
        <div class="showcase-screen-top">
          <span class="showcase-screen-kicker">${kicker}</span>
          <span class="showcase-screen-status">${status}</span>
        </div>
        <div class="showcase-screen-body">
          <div class="showcase-screen-title">${headline}</div>
          <div class="showcase-screen-subtitle">${subtitle}</div>
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

    if (badge) {
      badge.textContent = current.badge;
    }

    if (title) {
      title.textContent = current.title;
    }

    if (copy) {
      copy.textContent = current.copy;
    }

    root
      .querySelector(".showcase-side-button-prev")
      ?.setAttribute("aria-label", `Vis forrige skjermbilde: ${prev.title}`);
    root
      .querySelector(".showcase-side-button-next")
      ?.setAttribute("aria-label", `Vis neste skjermbilde: ${next.title}`);

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

  if (nextField) {
    nextField.value = `${window.location.origin}${window.location.pathname}?submitted=1#contact`;
  }

  const setStatus = (message, state) => {
    statusBox.textContent = message;
    statusBox.className = `form-status is-visible ${state}`;
  };

  const params = new URLSearchParams(window.location.search);
  if (params.get("submitted") === "1") {
    setStatus("Takk! Meldingen er sendt. Vi følger opp så fort vi kan.", "is-success");

    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete("submitted");
    window.history.replaceState({}, "", cleanUrl.toString());
  }

  let pending = false;
  let timer = null;

  form.addEventListener("submit", () => {
    pending = true;
    setStatus("Sender meldingen din...", "is-pending");

    if (timer) {
      clearTimeout(timer);
    }

    timer = window.setTimeout(() => {
      if (!pending) {
        return;
      }

      pending = false;
      setStatus(
        "Kunne ikke bekrefte innsendingen akkurat nå. Prøv igjen, eller send e-post til contact@kapsdevelopment.com.",
        "is-error",
      );
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

    setStatus("Takk! Meldingen er sendt. Vi følger opp så fort vi kan.", "is-success");
    window.setTimeout(() => form.reset(), 60);
  });
})();
