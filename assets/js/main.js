(function () {
  'use strict';

  /* ---- theme ---- */
  var root = document.documentElement;
  var KEY = 'pa-theme';
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);
  } catch (e) { /* storage blocked */ }

  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      if (!current) {
        current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) { /* ignore */ }
    });
  }

  /* ---- BibTeX toggle + copy ---- */
  document.querySelectorAll('.bib-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var pre = document.getElementById('bib-' + btn.dataset.bib);
      if (!pre) return;
      var opening = pre.hidden;
      pre.hidden = !opening;
      btn.classList.toggle('open', opening);
      if (opening) {
        btn.textContent = 'Hide BibTeX';
        if (navigator.clipboard) {
          navigator.clipboard.writeText(pre.textContent).then(function () {
            btn.textContent = 'Copied ✓';
            setTimeout(function () { if (btn.classList.contains('open')) btn.textContent = 'Hide BibTeX'; }, 1400);
          }).catch(function () { /* clipboard denied — the block is visible anyway */ });
        }
      } else {
        btn.textContent = 'BibTeX';
      }
    });
  });

  /* ---- sticky nav border ---- */
  var nav = document.querySelector('.nav');
  var onScroll = function () {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- active section in nav ---- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---- reveal on scroll ---- */
  var targets = document.querySelectorAll('.card, .pub, .prose p, .contact-list, .hero-card');
  if ('IntersectionObserver' in window) {
    targets.forEach(function (el) { el.classList.add('reveal'); });
    var reveal = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        setTimeout(function () { entry.target.classList.add('in'); }, i * 60);
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    targets.forEach(function (el) { reveal.observe(el); });
  }

  /* ---- footer year ---- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
