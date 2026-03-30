/**
 * ═══════════════════════════════════════════════════
 * MOTION ENGINE v2 — Inspired by motionsites.ai
 * Reliable scroll reveals, magnetic effects,
 * animated counters, parallax & cursor glow.
 * ═══════════════════════════════════════════════════
 */
(function () {
  'use strict';


  /* ──────────────────────────────
     2. SCROLL REVEAL (data-motion)
     Uses IntersectionObserver for
     smooth entrance animations.
  ────────────────────────────── */
  function initScrollReveal() {
    var els = document.querySelectorAll('[data-motion]');
    if (!els.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ──────────────────────────────
     3. MAGNETIC TILT for SERVICE CARDS
  ────────────────────────────── */
  function initMagneticTilt() {
    if (window.innerWidth < 768) return;
    var cards = document.querySelectorAll('.service-card');
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var cx = rect.width / 2;
        var cy = rect.height / 2;
        var rotX = ((y - cy) / cy) * -6;
        var rotY = ((x - cx) / cx) * 6;
        card.style.transform =
          'perspective(800px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) translateY(-6px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ──────────────────────────────
     4. CURSOR GLOW (desktop only)
  ────────────────────────────── */
  function initCursorGlow() {
    if (window.innerWidth < 768) return;
    var glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    var mx = 0, my = 0, gx = 0, gy = 0;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
    });
    (function loop() {
      gx += (mx - gx) * 0.07;
      gy += (my - gy) * 0.07;
      glow.style.left = gx + 'px';
      glow.style.top  = gy + 'px';
      requestAnimationFrame(loop);
    })();
  }

  /* ──────────────────────────────
     5. ANIMATED COUNTERS (stats)
  ────────────────────────────── */
  function initCounters() {
    var statEls = document.querySelectorAll('.stat-number[data-target]');
    if (!statEls.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statEls.forEach(function (el) { observer.observe(el); });
  }

  function runCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    if (!target) return;
    var suffix = '+';
    var dur = 1800;
    var start = performance.now();

    (function tick(now) {
      var t = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      el.textContent = Math.round(eased * target) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  }

  /* ──────────────────────────────
     6. PARALLAX on hero image
  ────────────────────────────── */
  function initParallax() {
    var heroImg = document.querySelector('.hero-image-container');
    if (!heroImg || window.innerWidth < 768) return;

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var sy = window.scrollY;
          if (sy < window.innerHeight) {
            heroImg.style.transform = 'translateY(' + (sy * 0.25) + 'px)';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ──────────────────────────────
     7. SMOOTH NAV HIGHLIGHT
  ────────────────────────────── */
  function initNavHighlight() {
    var sections = document.querySelectorAll('section[id], footer[id]');
    var links = document.querySelectorAll('.navbar .nav-link');
    if (!sections.length || !links.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          links.forEach(function (lk) {
            lk.classList.toggle('active', lk.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.25, rootMargin: '-80px 0px -50% 0px' });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ──────────────────────────────
     7b. SMOOTH NAV SCROLL
     Intercept nav link clicks and
     smooth-scroll instead of instant jump.
  ────────────────────────────── */
  function initSmoothNavScroll() {
    var links = document.querySelectorAll('.navbar .nav-link[href^="#"]');
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = link.getAttribute('href').slice(1);
        var target = document.getElementById(targetId);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        var toggler = document.querySelector('.navbar-toggler');
        var collapse = document.querySelector('.navbar-collapse');
        if (collapse && collapse.classList.contains('show') && toggler) toggler.click();
      });
    });
  }


  /* ──────────────────────────────
     7c. AJAX PAGINATION
     Update sections dynamically
     without a full page reload.
  ────────────────────────────── */
  function initAjaxPagination() {
    document.addEventListener('click', function(e) {
      // Find closest pagination link
      var link = e.target.closest('.pagination .page-link');
      if (!link) return;

      var href = link.getAttribute('href');
      if (!href) return;

      // Determine which section to update based on the hash
      var targetId = '';
      if (href.includes('#portfolio')) targetId = 'portfolio';
      else if (href.includes('#certificate')) targetId = 'certificate';
      else return;

      e.preventDefault();

      var section = document.getElementById(targetId);
      if (!section) return;

      // Show loading state
      section.style.opacity = '0.5';
      section.style.pointerEvents = 'none';

      fetch(href)
        .then(function(res) { return res.text(); })
        .then(function(html) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(html, 'text/html');
          var newSection = doc.getElementById(targetId);
          
          if (newSection) {
            section.innerHTML = newSection.innerHTML;
            
            // Smoothly scroll to the top of the updated section
            var yOffset = -80; // offset for fixed header
            var y = section.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});

            // Re-initialize reveals and tilts for new content
            initScrollReveal();
            initMagneticTilt();
            initMagneticBtns();

            // Update URL
            window.history.pushState(null, '', href);
          }
        })
        .catch(function(err) {
          console.error('Pagination error:', err);
          window.location.href = href; // fallback
        })
        .finally(function() {
          section.style.opacity = '1';
          section.style.pointerEvents = 'auto';
        });
    });
  }


  /* ──────────────────────────────
     8. MAGNETIC BUTTONS
  ────────────────────────────── */
  function initMagneticBtns() {
    if (window.innerWidth < 768) return;
    var btns = document.querySelectorAll('.btn-primary, .btn-view-details');
    btns.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var dx = e.clientX - r.left - r.width / 2;
        var dy = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + (dx * .12) + 'px,' + (dy * .12) + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }

  /* ──────────────────────────────
     INIT
  ────────────────────────────── */
  function boot() {
    initScrollReveal();
    initMagneticTilt();
    initCursorGlow();
    initCounters();
    initParallax();
    initNavHighlight();
    initSmoothNavScroll();
    initAjaxPagination();
    initMagneticBtns();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
