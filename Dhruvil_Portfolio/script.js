/* ==========================================================================
   EDITABLE PORTFOLIO CONFIGURATION
   Update your personal info, social URLs, CV path, or project links here.
   ========================================================================== */
const PORTFOLIO_DATA = {
  fullName: "Dhruvil Ujjeniya",
  title: "AI & Technology Enthusiast | Aspiring Developer",
  rollNumber: "2603842047",
  division: "DD",
  location: "Gujarat, India",
  social: {
    github: "https://github.com/ujjeniyadhruvil8-star",
    linkedin: "https://www.linkedin.com/in/dhruvil-ujjeniya-a60389356",
    email: "ujjeniyadhruvil8@gmail.com"
  },
  documents: {
    cvUrl: "" // e.g. "documents/Dhruvil_Ujjeniya_CV.pdf"
  },
  projects: {
    chemai: {
      title: "ChemAI by Dhruvil",
      category: "Artificial Intelligence / Educational Technology",
      description:
        "ChemAI is an AI-powered chemistry learning platform concept that I envisioned to make chemistry education more interactive, accessible and technology-driven. The project represents my interest in combining Artificial Intelligence, Chemistry and computational technologies. My vision is to develop a platform that helps learners understand complex chemical concepts through intelligent and interactive learning experiences.",
      meta: {
        "Project Name": "ChemAI",
        Creator: "Dhruvil Ujjeniya",
        Status: "Personal project in development",
        Focus: "Chemistry education and AI"
      },
      features: [
        "Interactive concept exploration for chemistry learners",
        "AI-assisted explanations tailored to student curiosity",
        "Bridges chemical engineering fundamentals with computational tech"
      ],
      pageUrl: "projects/chemai.html"
    },
    hangman: {
      title: "Interactive Hangman Game",
      category: "Python Programming Project",
      description:
        "An interactive word-guessing game developed using Python programming fundamentals. The game allows users to guess a hidden word through individual letter inputs. It demonstrates the practical use of variables, conditional statements, loops and user interaction.",
      meta: {
        "Project Name": "Interactive Hangman Game",
        Creator: "Dhruvil Ujjeniya",
        Technology: "Python",
        Status: "Completed Core Logic"
      },
      features: [
        "Random or predefined word selection",
        "Letter input validation",
        "Correct and incorrect guess tracking",
        "Remaining attempts counter",
        "Win and lose conditions",
        "Interactive gameplay loop",
        "Replay functionality"
      ],
      pageUrl: "projects/hangman.html"
    }
  }
};

/* ==========================================================================
   DOM INITIALIZATION & INTERACTIVE FEATURES
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  initTheme();
  initNavigation();
  initScrollSpy();
  initRevealAnimations(prefersReducedMotion);
  initBackgroundCanvas(prefersReducedMotion);
  initProjectFilters();
  initProjectModal();
  initSocialLinks();
  initDownloadCV();
  initContactForm();
  initBackToTop();
});

/* 1. Light / Dark Theme Toggle (White Background Default) */
function initTheme() {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");
  let savedTheme = "light";

  try {
    savedTheme = localStorage.getItem("portfolio-theme-v2") || "light";
  } catch (err) {
    savedTheme = "light";
  }

  root.setAttribute("data-theme", savedTheme);

  if (!toggleBtn) return;
  toggleBtn.addEventListener("click", () => {
    const nextTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", nextTheme);
    try {
      localStorage.setItem("portfolio-theme-v2", nextTheme);
    } catch (err) {
      // Storage unavailable in restricted environments
    }
  });
}

/* 2. Responsive Mobile Navigation & Smooth Scrolling */
function initNavigation() {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  if (!menuToggle || !navLinks) return;

  const closeMenu = () => {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

/* 3. Active Navigation Section Detection (Scroll Spy) */
function initScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const navItems = document.querySelectorAll(".nav-link");
  if (!sections.length || !navItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navItems.forEach((item) => {
          item.classList.toggle("active", item.getAttribute("data-section") === id);
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

/* 4. Scroll-Triggered Content Animations */
function initRevealAnimations(prefersReducedMotion) {
  const items = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  items.forEach((el) => observer.observe(el));
}

/* 5. Colorful Geometric Node Background Canvas */
function initBackgroundCanvas(prefersReducedMotion) {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas || prefersReducedMotion) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const palette = ["#4f46e5", "#0891b2", "#e11d48", "#059669", "#d97706"];
  let nodes = [];
  let animId = null;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const count = Math.min(26, Math.max(12, Math.floor(window.innerWidth / 60)));
    nodes = Array.from({ length: count }, (_, idx) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 2.5 + (idx % 3),
      color: palette[idx % palette.length]
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isLight = document.documentElement.getAttribute("data-theme") === "light";

    for (let i = 0; i < nodes.length; i += 1) {
      const p = nodes[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.globalAlpha = isLight ? 0.22 : 0.3;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < nodes.length; j += 1) {
        const q = nodes[j];
        const dist = Math.hypot(p.x - q.x, p.y - q.y);
        if (dist < 150) {
          ctx.globalAlpha = isLight ? 0.08 : 0.12;
          ctx.strokeStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    animId = requestAnimationFrame(draw);
  };

  resize();
  draw();
  window.addEventListener("resize", () => {
    if (animId) cancelAnimationFrame(animId);
    resize();
    draw();
  });
}

/* 6. Interactive Project Filters */
function initProjectFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      cards.forEach((card) => {
        const match = filter === "all" || card.getAttribute("data-category") === filter;
        card.classList.toggle("is-hidden", !match);
      });
    });
  });
}

/* 7. Project Detail Modal */
function initProjectModal() {
  const modal = document.getElementById("project-modal");
  const backdrop = document.getElementById("modal-backdrop");
  const closeBtn = document.getElementById("modal-close");
  const doneBtn = document.getElementById("modal-done-btn");
  const openBtns = document.querySelectorAll(".view-project-btn");
  if (!modal || !openBtns.length) return;

  const closeModal = () => {
    modal.hidden = true;
    document.body.style.overflow = "";
  };

  openBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-project-id");
      const data = PORTFOLIO_DATA.projects[id];
      if (!data) return;

      document.getElementById("modal-category").textContent = data.category;
      document.getElementById("modal-title").textContent = data.title;
      document.getElementById("modal-description").textContent = data.description;

      const detailsEl = document.getElementById("modal-details");
      detailsEl.innerHTML = Object.entries(data.meta)
        .map(([k, v]) => `<div><strong>${k}:</strong> ${v}</div>`)
        .join("");

      const featuresWrap = document.getElementById("modal-features-wrap");
      const featuresList = document.getElementById("modal-features");
      if (data.features && data.features.length) {
        featuresWrap.hidden = false;
        featuresList.innerHTML = data.features.map((f) => `<li>${f}</li>`).join("");
      } else {
        featuresWrap.hidden = true;
      }

      const repoLink = document.getElementById("modal-repo-link");
      repoLink.setAttribute("href", data.pageUrl || "#projects");

      modal.hidden = false;
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    });
  });

  [backdrop, closeBtn, doneBtn].forEach((el) => {
    if (el) el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });
}

/* 8. Editable Social Links */
function initSocialLinks() {
  const { github, linkedin, email } = PORTFOLIO_DATA.social;

  document.querySelectorAll("[data-social]").forEach((el) => {
    const type = el.getAttribute("data-social");
    if (type === "github" && github) {
      el.setAttribute("href", github);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
      if (el.id === "github-link") el.textContent = github;
    } else if (type === "linkedin" && linkedin) {
      el.setAttribute("href", linkedin);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
      if (el.id === "linkedin-link") el.textContent = linkedin;
    } else if (type === "email" && email) {
      el.setAttribute("href", `mailto:${email}`);
      if (el.id === "email-link") el.textContent = email;
    } else {
      el.addEventListener("click", (event) => {
        event.preventDefault();
        showToast(`Add your ${type} URL in PORTFOLIO_DATA inside script.js to activate this link.`);
      });
    }
  });
}

/* 9. Download CV Button */
function initDownloadCV() {
  const btn = document.getElementById("download-cv-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const cvUrl = PORTFOLIO_DATA.documents.cvUrl;
    if (!cvUrl) {
      showToast("CV not attached yet: place your PDF in documents/ and set documents.cvUrl in script.js.");
      return;
    }
    const anchor = document.createElement("a");
    anchor.href = cvUrl;
    anchor.download = "Dhruvil_Ujjeniya_CV.pdf";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  });
}

/* 10. Contact Form Front-End Validation */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");
  if (!form || !statusEl) return;

  const fields = {
    fullName: document.getElementById("full-name"),
    email: document.getElementById("email-address"),
    subject: document.getElementById("subject"),
    message: document.getElementById("message")
  };

  const errors = {
    fullName: document.getElementById("error-full-name"),
    email: document.getElementById("error-email-address"),
    subject: document.getElementById("error-subject"),
    message: document.getElementById("error-message")
  };

  const setFieldError = (key, msg) => {
    errors[key].textContent = msg;
    fields[key].classList.toggle("is-invalid", Boolean(msg));
  };

  const validateField = (key) => {
    const val = fields[key].value.trim();
    if (key === "fullName" && val.length < 2) {
      setFieldError(key, "Please enter your full name (at least 2 characters).");
      return false;
    }
    if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setFieldError(key, "Please enter a valid email address.");
      return false;
    }
    if (key === "subject" && val.length < 3) {
      setFieldError(key, "Please enter a subject (at least 3 characters).");
      return false;
    }
    if (key === "message" && val.length < 10) {
      setFieldError(key, "Please write a message of at least 10 characters.");
      return false;
    }
    setFieldError(key, "");
    return true;
  };

  Object.keys(fields).forEach((key) => {
    fields[key].addEventListener("input", () => validateField(key));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const allValid = Object.keys(fields).every((key) => validateField(key));
    statusEl.className = "form-status";

    if (!allValid) {
      statusEl.classList.add("is-error");
      statusEl.textContent = "Please fix the highlighted fields before submitting.";
      return;
    }

    statusEl.classList.add("is-success");
    statusEl.textContent =
      "Form validated! No backend server is configured on this static site yet—connect a form service (such as Formspree) or add your email in script.js to receive messages.";
    form.reset();
  });
}

/* 11. Back to Top Button */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("is-visible", window.scrollY > 350);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* Toast Utility */
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 4200);
}
