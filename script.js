/* ════════════════════════════
   SCROLL REVEAL + NAV HIGHLIGHT
════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  sections.forEach(section => revealObserver.observe(section));

  const highlightSection = () => {
    let current = "";
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const top = section.offsetTop - 160;
      if (scrollY >= top && scrollY < top + section.offsetHeight) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) link.classList.add("active");
    });
  };

  window.addEventListener("scroll", highlightSection);
  highlightSection();
  initAllGalleries();

  /* ─────────────────────────────────────
     TYPING ANIMATION
  ───────────────────────────────────── */
  const roles = [
    { text: "resilient systems", pill: "DevOps Engineer" },
    { text: "intelligent pipelines", pill: "Automation Engineer" },
    { text: "modern experiences", pill: "Web Developer" },
    { text: "scalable infrastructure", pill: "Cloud Engineer" },
  ];

  const typingEl = document.getElementById("typingText");
  const pillEl = document.getElementById("rolePill");

  if (typingEl && pillEl) {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPausing = false;

    const TYPE_SPEED = 55;
    const DELETE_SPEED = 30;
    const PAUSE_AFTER = 4000;
    const PAUSE_BEFORE = 400;

    function tick() {
      const current = roles[roleIndex];
      const fullText = current.text;

      if (isPausing) return;

      if (!isDeleting) {
        charIndex++;
        typingEl.textContent = fullText.slice(0, charIndex);

        if (charIndex === fullText.length) {
          isPausing = true;
          setTimeout(() => {
            isPausing = false;
            isDeleting = true;
            scheduleNext();
          }, PAUSE_AFTER);
          return;
        }
      } else {
        charIndex--;
        typingEl.textContent = fullText.slice(0, charIndex);

        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;

          pillEl.style.opacity = "0";
          pillEl.style.transform = "translateY(6px)";
          setTimeout(() => {
            pillEl.textContent = roles[roleIndex].pill;
            pillEl.style.transition = "all 0.4s ease";
            pillEl.style.opacity = "1";
            pillEl.style.transform = "translateY(0)";
          }, 300);

          isPausing = true;
          setTimeout(() => {
            isPausing = false;
            scheduleNext();
          }, PAUSE_BEFORE);
          return;
        }
      }

      scheduleNext();
    }

    function scheduleNext() {
      setTimeout(tick, isDeleting ? DELETE_SPEED : TYPE_SPEED);
    }

    setTimeout(tick, 800);
  }

  /* ─────────────────────────────────────
     DARK / LIGHT MODE TOGGLE
  ───────────────────────────────────── */
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;

  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  html.setAttribute("data-theme", savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
      html.setAttribute("data-theme", next);
      localStorage.setItem("portfolio-theme", next);
    });
  }

  /* ─────────────────────────────────────
     HAMBURGER / MOBILE NAV
  ───────────────────────────────────── */
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  const mobileNavOverlay = document.getElementById("mobileNavOverlay");
  const mobileNavClose = document.getElementById("mobileNavClose");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  function openMobileNav() {
    hamburger.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    mobileNav.classList.add("open");
    mobileNavOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeMobileNav() {
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("open");
    mobileNavOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (hamburger) hamburger.addEventListener("click", openMobileNav);
  if (mobileNavClose) mobileNavClose.addEventListener("click", closeMobileNav);
  if (mobileNavOverlay) mobileNavOverlay.addEventListener("click", closeMobileNav);
  mobileLinks.forEach(link => link.addEventListener("click", closeMobileNav));

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeMobileNav();
  });

});

/* ════════════════════════════
   SCROLL TO TOP
════════════════════════════ */
const scrollBtn = document.getElementById("scrollToTopBtn");
window.addEventListener("scroll", () => {
  if (scrollBtn) scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
if (scrollBtn) {
  scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ════════════════════════════
   LOADER
════════════════════════════ */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.add("fade-out");
    setTimeout(() => loader.style.display = "none", 1000);
  }
  drawMatrixLines();
});

/* ════════════════════════════
   MODAL CONTROLS
════════════════════════════ */
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
  const trackEl = modal.querySelector(".gallery-track");
  if (trackEl) goToSlide(trackEl.id, 0);
}

function openExpModal(id) {
  openModal(id);
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.style.display = "none";
  document.body.style.overflow = "";
}

window.addEventListener("click", e => {
  document.querySelectorAll(".modal").forEach(modal => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  });
});

window.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal").forEach(modal => {
      if (modal.style.display === "flex") {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  }
});

/* ════════════════════════════
   GALLERY SLIDER
════════════════════════════ */
const galleryState = {};

function initAllGalleries() {
  document.querySelectorAll(".gallery-track").forEach(track => {
    const id = track.id;
    const slides = track.querySelectorAll(".gallery-slide");
    galleryState[id] = { index: 0, total: slides.length };

    const dotsContainer = document.getElementById(`dots-${id}`);
    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.classList.add("gallery-dot");
        if (i === 0) dot.classList.add("active");
        dot.setAttribute("aria-label", `Slide ${i + 1}`);
        dot.addEventListener("click", () => goToSlide(id, i));
        dotsContainer.appendChild(dot);
      });
    }

    let startX = 0;
    track.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) slideGallery(id, diff > 0 ? 1 : -1);
    });
  });
}

function goToSlide(galleryId, index) {
  const state = galleryState[galleryId];
  if (!state) return;
  state.index = ((index % state.total) + state.total) % state.total;

  const track = document.getElementById(galleryId);
  if (track) track.style.transform = `translateX(-${state.index * 100}%)`;

  const dotsContainer = document.getElementById(`dots-${galleryId}`);
  if (dotsContainer) {
    dotsContainer.querySelectorAll(".gallery-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === state.index);
    });
  }
}

function slideGallery(galleryId, direction) {
  const state = galleryState[galleryId];
  if (!state) return;
  goToSlide(galleryId, state.index + direction);
}

/* ════════════════════════════
   CONNECTION LINES (projects)
════════════════════════════ */
function drawMatrixLines() {
  const svg = document.getElementById("connection-lines");
  if (!svg) return;
  svg.innerHTML = "";

  const ids = ["proj1", "proj2", "proj3", "proj4", "proj5", "proj6"];
  const elements = ids.map(id => document.getElementById(id)).filter(Boolean);
  const svgRect = svg.getBoundingClientRect();

  function center(el) {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2 - svgRect.left, y: r.top + r.height / 2 - svgRect.top };
  }

  function makeLine(a, b) {
    const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
    l.setAttribute("x1", a.x); l.setAttribute("y1", a.y);
    l.setAttribute("x2", b.x); l.setAttribute("y2", b.y);
    l.setAttribute("stroke", "#00d8ff");
    l.setAttribute("stroke-width", "1.5");
    l.setAttribute("stroke-opacity", "0.1");
    svg.appendChild(l);
  }

  for (let i = 0; i < elements.length - 1; i++) {
    makeLine(center(elements[i]), center(elements[i + 1]));
  }
}

window.addEventListener("resize", drawMatrixLines);