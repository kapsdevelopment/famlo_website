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
