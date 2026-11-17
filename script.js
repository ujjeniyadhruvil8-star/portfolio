/**
 * DHRUVIL UJJENIYA | PORTFOLIO CORE SCRIPT ENGINE
 * System Architect & AI Developer (2nd-Year B.Tech, Div DD, Roll No: 267547)
 * Zero external frameworks — 100% Vanilla ES6+
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. WIREFRAME-TO-UI ASSEMBLY & SCROLL REVEAL (CAD BLUEPRINT EFFECT)
     ========================================================================== */
  const wireframeElements = document.querySelectorAll('.wireframe-reveal');

  const revealWireframe = (element) => {
    if (element.dataset.revealed === 'true') return;
    element.dataset.revealed = 'true';

    // Calculate live bounding dimensions
    const rect = element.getBoundingClientRect();
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);

    // Apply active CAD outline state
    element.classList.add('wireframe-active');

    // Create dimension badge (e.g. 384 × 520 px)
    const badge = document.createElement('span');
    badge.className = 'wireframe-dimension-badge';
    badge.textContent = `${width} × ${height} px`;
    element.appendChild(badge);

    // After ~450ms, smoothly transition to the final dark Obsidian/Crimson UI
    setTimeout(() => {
      element.classList.remove('wireframe-active');
      element.classList.add('wireframe-settled');
      
      // Fade out badge cleanly
      badge.style.opacity = '0';
      badge.style.transition = 'opacity 0.25s ease';
      setTimeout(() => {
        if (badge.parentNode === element) {
          element.removeChild(badge);
        }
      }, 250);
    }, 450);
  };

  if ('IntersectionObserver' in window) {
    const wireframeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          revealWireframe(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    wireframeElements.forEach(el => wireframeObserver.observe(el));
  } else {
    // Fallback for environments without IntersectionObserver
    wireframeElements.forEach(el => revealWireframe(el));
  }


  /* ==========================================================================
     2. FLOATING MULTI-CURSOR COLLABORATIVE SWARM & TOGGLE
     ========================================================================== */
  const swarmContainer = document.getElementById('cursor-swarm-container');
  const cursorToggleBtn = document.getElementById('cursor-toggle');
  const cursorStatusText = document.getElementById('cursor-status-text');

  let cursorsEnabled = true;
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 3;
  let hasUserMovedMouse = false;

  // 6 Collaborative Agent Cursors: Color & Identity Specs
  const swarmBots = [
    { name: 'Dhruvil (Architect)', color: '#FFFFFF', bg: '#1E1E24', x: mouseX - 60, y: mouseY - 40, targetX: mouseX, targetY: mouseY, speed: 0.14, angle: 0, radius: 45, phaseSpeed: 0.02 },
    { name: 'AI Agent Alpha', color: '#38BDF8', bg: '#08253B', x: mouseX + 70, y: mouseY - 60, targetX: mouseX, targetY: mouseY, speed: 0.10, angle: 1.1, radius: 75, phaseSpeed: 0.015 },
    { name: 'Kernel Bot', color: '#10B981', bg: '#062B1D', x: mouseX + 90, y: mouseY + 50, targetX: mouseX, targetY: mouseY, speed: 0.08, angle: 2.2, radius: 95, phaseSpeed: 0.018 },
    { name: 'Compiler', color: '#F59E0B', bg: '#332005', x: mouseX - 80, y: mouseY + 70, targetX: mouseX, targetY: mouseY, speed: 0.12, angle: 3.3, radius: 60, phaseSpeed: 0.022 },
    { name: 'Synthesizer', color: '#F43F5E', bg: '#330812', x: mouseX - 110, y: mouseY - 20, targetX: mouseX, targetY: mouseY, speed: 0.09, angle: 4.4, radius: 110, phaseSpeed: 0.014 },
    { name: 'Vector Engine', color: '#A855F7', bg: '#220838', x: mouseX + 50, y: mouseY + 100, targetX: mouseX, targetY: mouseY, speed: 0.07, angle: 5.5, radius: 130, phaseSpeed: 0.012 }
  ];

  // SVG Cursor Arrow Generator
  const createCursorSvg = (color) => {
    return `
      <svg class="swarm-svg-arrow" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.5 0.5L6.5 15.5L9.5 9.5L15.5 6.5L0.5 0.5Z" fill="${color}" stroke="#070709" stroke-width="1.2" stroke-linejoin="round"/>
      </svg>
    `;
  };

  // Build cursor DOM elements
  const botElements = swarmBots.map(bot => {
    const el = document.createElement('div');
    el.className = 'swarm-pointer';
    el.innerHTML = `
      ${createCursorSvg(bot.color)}
      <span class="swarm-label" style="background-color: ${bot.bg}; color: ${bot.color}; border-color: ${bot.color};">
        ${bot.name}
      </span>
    `;
    swarmContainer.appendChild(el);
    return el;
  });

  // Track real mouse position
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    hasUserMovedMouse = true;
  }, { passive: true });

  // Animation Loop for Smooth Swarm Orbit
  let animationFrameId;
  let tick = 0;

  const renderSwarm = () => {
    if (cursorsEnabled) {
      tick += 1;
      
      // If mouse hasn't moved yet, create a gentle ambient figure-eight movement
      if (!hasUserMovedMouse) {
        mouseX = (window.innerWidth / 2) + Math.sin(tick * 0.015) * 120;
        mouseY = (window.innerHeight / 2.8) + Math.cos(tick * 0.02) * 80;
      }

      swarmBots.forEach((bot, i) => {
        bot.angle += bot.phaseSpeed;
        
        // Calculate dynamic orbiting target around primary user pointer
        const offsetX = Math.cos(bot.angle) * bot.radius;
        const offsetY = Math.sin(bot.angle) * (bot.radius * 0.7);

        bot.targetX = mouseX + offsetX;
        bot.targetY = mouseY + offsetY;

        // Damped interpolation (lerp)
        bot.x += (bot.targetX - bot.x) * bot.speed;
        bot.y += (bot.targetY - bot.y) * bot.speed;

        botElements[i].style.transform = `translate3d(${bot.x.toFixed(1)}px, ${bot.y.toFixed(1)}px, 0)`;
      });
    }

    animationFrameId = requestAnimationFrame(renderSwarm);
  };

  // Start Swarm animation loop
  renderSwarm();

  // Cursor Toggle Button
  if (cursorToggleBtn && cursorStatusText) {
    cursorToggleBtn.addEventListener('click', () => {
      cursorsEnabled = !cursorsEnabled;
      cursorStatusText.textContent = cursorsEnabled ? 'ON' : 'OFF';
      cursorToggleBtn.setAttribute('aria-pressed', cursorsEnabled ? 'true' : 'false');
      
      if (cursorsEnabled) {
        swarmContainer.style.display = 'block';
      } else {
        swarmContainer.style.display = 'none';
      }
    });
  }


  /* ==========================================================================
     3. INTERACTIVE 7-LAYER ARCHITECTURE TABS (FLAGSHIP PROJECT)
     ========================================================================== */
  const layerTabs = document.querySelectorAll('.layer-tab');
  const layerDetailId = document.getElementById('layer-detail-id');
  const layerDetailTag = document.getElementById('layer-detail-tag');
  const layerDetailTitle = document.getElementById('layer-detail-title');
  const layerDetailBody = document.getElementById('layer-detail-body');
  const layerDetailBox = document.getElementById('layer-detail-box');

  const layerData = {
    0: {
      id: 'LAYER 00 // L0',
      tag: 'HARDWARE & ACCELERATION',
      title: 'Hardware & Computational Execution Substrate',
      body: 'Low-level vectorized operations utilizing GPU-accelerated tensor computation for molecular orbital calculations and continuous thermodynamic state caching.',
      specs: [
        { label: 'Throughput', val: '4.8 GFLOPS' },
        { label: 'Memory Model', val: 'Zero-Copy Buffer' },
        { label: 'Kernel', val: 'Native C++/Python' }
      ]
    },
    1: {
      id: 'LAYER 01 // L1',
      tag: 'KNOWLEDGE BASE & VECTORS',
      title: 'Molecular Knowledge Graph & Chemical Vector Index',
      body: 'High-dimensional vector embeddings indexing 470+ verified chemical reactions, IUPAC nomenclature, stoichiometry equations, and molecular weight tables.',
      specs: [
        { label: 'Index Size', val: '470+ Entities' },
        { label: 'Search Engine', val: 'HNSW Vector Search' },
        { label: 'Query Latency', val: '< 8ms' }
      ]
    },
    2: {
      id: 'LAYER 02 // L2',
      tag: 'REASONING & SYNTHESIS',
      title: 'Deterministic Reaction Reasoning & Retrosynthesis Planner',
      body: 'Rule-based algorithmic tree search paired with chemical valence verification to predict multi-step retrosynthesis paths and catalyst interactions.',
      specs: [
        { label: 'Search Depth', val: '12 Steps' },
        { label: 'Accuracy', val: '99.4%' },
        { label: 'Logic', val: 'First-Principles Tree' }
      ]
    },
    3: {
      id: 'LAYER 03 // L3',
      tag: 'SAFETY & COMPLIANCE',
      title: 'Automated SDS & Hazard Compliance Guardrails',
      body: 'Deterministic safety interceptor inspecting exothermic risk factors, toxic by-product potentials, OSHA thresholds, and SDS hazard code containment.',
      specs: [
        { label: 'SDS Coverage', val: '100% Guaranteed' },
        { label: 'Risk Engine', val: 'Real-time Hazard Matrix' },
        { label: 'Interception', val: 'Pre-Execution Hook' }
      ]
    },
    4: {
      id: 'LAYER 04 // L4',
      tag: 'MULTI-AGENT CONSENSUS',
      title: 'Coordinated Multi-Agent Synthesis Orchestrator',
      body: 'Decentralized agent consensus pipeline where specialist agents (Thermodynamicist, Safety Officer, Kinetics Analyzer) critique and refine reaction hypotheses.',
      specs: [
        { label: 'Agent Pool', val: '4 Specialized Nodes' },
        { label: 'Consensus', val: 'Deterministic Quorum' },
        { label: 'Sync State', val: 'Async Event Loop' }
      ]
    },
    5: {
      id: 'LAYER 05 // L5',
      tag: 'SIMULATION & KINETICS',
      title: 'Thermodynamic State & Reaction Kinetic Simulator',
      body: 'Kinetic Monte Carlo simulation computing Arrhenius reaction rates, activation energies, entropy balance, and yield optimization curves.',
      specs: [
        { label: 'Kinetics Engine', val: 'Arrhenius Integration' },
        { label: 'Yield Variance', val: '± 1.2%' },
        { label: 'Time Step', val: 'Microsecond Scale' }
      ]
    },
    6: {
      id: 'LAYER 06 // L6',
      tag: 'AUTONOMOUS INTERFACE',
      title: 'Real-Time Telemetry & Autonomous Dispatch Interface',
      body: 'Low-latency client portal visualizing real-time reaction graphs, molecular bonds, telemetry streams, and manual parameter override controls.',
      specs: [
        { label: 'Frame Rate', val: '60 FPS Native' },
        { label: 'Stream', val: 'Zero-Lag WebSockets' },
        { label: 'Rendering', val: 'Optimized SVG/Canvas' }
      ]
    }
  };

  layerTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const layerIndex = tab.getAttribute('data-layer');
      const data = layerData[layerIndex];

      if (!data) return;

      // Update Active Tab State
      layerTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Update Detail Content with Smooth Fade
      if (layerDetailBox) {
        layerDetailBox.style.opacity = '0.4';
        layerDetailBox.style.transform = 'translateY(2px)';
        
        setTimeout(() => {
          if (layerDetailId) layerDetailId.textContent = data.id;
          if (layerDetailTag) layerDetailTag.textContent = data.tag;
          if (layerDetailTitle) layerDetailTitle.textContent = data.title;
          if (layerDetailBody) layerDetailBody.textContent = data.body;

          const specsContainer = layerDetailBox.querySelector('.detail-specs');
          if (specsContainer && data.specs) {
            specsContainer.innerHTML = data.specs.map(s => 
              `<span class="spec-item"><strong>${s.label}:</strong> ${s.val}</span>`
            ).join('');
          }

          layerDetailBox.style.opacity = '1';
          layerDetailBox.style.transform = 'translateY(0)';
        }, 120);
      }
    });
  });


  /* ==========================================================================
     4. SYSTEMS MATRIX LIVE FILTER
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter skill cards
      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('filtered-out');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.transition = 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.classList.add('filtered-out');
        }
      });
    });
  });


  /* ==========================================================================
     5. MOBILE NAVIGATION MENU & ACTIVE NAV LINK SPY
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('nav-menu-open');
      mobileMenuBtn.classList.toggle('is-active');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('nav-menu-open');
        mobileMenuBtn.classList.remove('is-active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scrollspy: Highlight Active Nav Link
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });


  /* ==========================================================================
     6. CONTACT FORM VALIDATION & INLINE FEEDBACK
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const showError = (inputEl, errorEl, message) => {
    inputEl.classList.add('input-invalid');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  };

  const clearError = (inputEl, errorEl) => {
    inputEl.classList.remove('input-invalid');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
  };

  // Real-time input listeners to clear errors upon correction
  if (nameInput) nameInput.addEventListener('input', () => clearError(nameInput, nameError));
  if (emailInput) emailInput.addEventListener('input', () => clearError(emailInput, emailError));
  if (messageInput) messageInput.addEventListener('input', () => clearError(messageInput, messageError));

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // 1. Validate Name
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal || nameVal.length < 2) {
        showError(nameInput, nameError, 'Please enter your full name (minimum 2 characters).');
        isValid = false;
      } else {
        clearError(nameInput, nameError);
      }

      // 2. Validate Email
      const emailVal = emailInput ? emailInput.value.trim() : '';
      if (!emailVal || !emailRegex.test(emailVal)) {
        showError(emailInput, emailError, 'Please enter a valid email address (e.g., name@domain.com).');
        isValid = false;
      } else {
        clearError(emailInput, emailError);
      }

      // 3. Validate Message
      const messageVal = messageInput ? messageInput.value.trim() : '';
      if (!messageVal || messageVal.length < 10) {
        showError(messageInput, messageError, 'Please enter a transmission message of at least 10 characters.');
        isValid = false;
      } else {
        clearError(messageInput, messageError);
      }

      // If invalid, stop
      if (!isValid) {
        if (formFeedback) {
          formFeedback.className = 'form-feedback error';
          formFeedback.textContent = 'Please correct the highlighted errors above before dispatching.';
        }
        return;
      }

      // Success State
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Transmitting...</span>';
      }

      setTimeout(() => {
        if (formFeedback) {
          formFeedback.className = 'form-feedback success';
          formFeedback.innerHTML = `
            <strong>&#10003; Transmission Verified &amp; Dispatched!</strong><br>
            Thank you, ${nameVal}. Your inquiry has been routed to Dhruvil Ujjeniya. Response turnaround: &lt; 24h.
          `;
        }

        contactForm.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Send Transmission &rarr;</span>';
        }

        // Auto clear feedback after 6 seconds
        setTimeout(() => {
          if (formFeedback) {
            formFeedback.className = 'form-feedback';
            formFeedback.innerHTML = '';
          }
        }, 6000);
      }, 500);
    });
  }

});
