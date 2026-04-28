/* Shared chrome injector — runs on all pages. Renders header + footer +
   celebration modal once so the page HTML stays short. */
(function () {
  function relRoot() {
    const path = location.pathname;
    if (/\/week\//.test(path)) return '../';
    return '';
  }
  // Official seal of the Islamic Republic of Mauritania. Image asset, not
  // a redrawn SVG — path resolved against page depth.
  const SEAL_SVG = `<img src="${relRoot()}assets/seal.png" alt="Sceau de la République Islamique de Mauritanie" class="seal-img">`;

  const ICON_MOON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`;
  const ICON_SUN  = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`;
  const ICON_CHECK= `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l5 5L20 7"/></svg>`;

  function relRoot() {
    // Pages live at root and in week/. Compute prefix.
    const path = location.pathname;
    if (/\/week\//.test(path)) return '../';
    return '';
  }

  function buildHeader(opts = {}) {
    const root = relRoot();
    return `
<header class="header" role="banner">
  <div class="header-inner">
    <a class="brand" href="${root}index.html" aria-label="Retour à l'accueil">
      <span class="brand-seal" aria-hidden="true">${SEAL_SVG}</span>
      <span class="brand-text">
        <span class="brand-line-1">MTNMA · Équipe UX</span>
        <span class="brand-line-2">Parcours d'intégration</span>
      </span>
    </a>
    <div class="header-actions">
      <div class="pill-group" role="group" aria-label="Thème">
        <button type="button" data-theme-set="light" aria-label="Mode clair">${ICON_SUN}</button>
        <button type="button" data-theme-set="dark" aria-label="Mode sombre">${ICON_MOON}</button>
      </div>
    </div>
  </div>
</header>`;
  }

  function buildFooter() {
    return `
<footer class="footer" role="contentinfo">
  <div class="footer-inner">
    <div class="footer-brand">
      <span style="width:48px;height:48px;flex:0 0 auto;">${SEAL_SVG}</span>
      <div class="footer-meta">
        <div style="font-weight:600;color:var(--text);margin-bottom:4px;">Ministère de la Transformation Numérique et de la Modernisation de l'Administration</div>
        <div>République Islamique de Mauritanie</div>
      </div>
    </div>
    <div class="footer-meta">
      <div style="margin-bottom:6px;">Guide d'intégration pour la première promotion de designers UX de la fonction publique mauritanienne.</div>
      <div>Construit avec la bibliothèque <a href="https://www.figma.com/community" target="_blank" rel="noopener">Ijitil</a> · <button class="btn-ghost btn-sm" data-reset-progress style="border:0;background:transparent;padding:0;color:var(--text);text-decoration:underline;cursor:pointer;font:inherit;">Réinitialiser la progression</button></div>
    </div>
  </div>
</footer>`;
  }

  function buildCelebration() {
    return `
<div class="celebration" id="celebration-modal" role="dialog" aria-modal="true" aria-labelledby="celebration-title">
  <div class="celebration-panel">
    <div class="celebration-confetti" aria-hidden="true"></div>
    <div class="celebration-seal">${SEAL_SVG}</div>
    <h2 id="celebration-title">Bravo !</h2>
    <p><span data-celebration-week>Semaine</span> terminée. Une étape de plus vers votre prise de poste. Prenez un moment, puis enchaînez avec la suite.</p>
    <div class="celebration-actions">
      <button type="button" class="btn" data-close>Continuer</button>
    </div>
  </div>
</div>`;
  }

  // Inject chrome as early as possible.
  function mount() {
    // Header
    const h = document.querySelector('[data-mount="header"]');
    if (h) h.outerHTML = buildHeader();
    // Footer
    const f = document.querySelector('[data-mount="footer"]');
    if (f) f.outerHTML = buildFooter();
    // Celebration
    if (!document.getElementById('celebration-modal')) {
      document.body.insertAdjacentHTML('beforeend', buildCelebration());
    }
    // Fill all [data-seal] placeholders
    document.querySelectorAll('[data-seal]').forEach(el => el.innerHTML = SEAL_SVG);
    document.querySelectorAll('[data-icon-check]').forEach(el => el.innerHTML = ICON_CHECK);

    // Theme pill wiring (two-segment)
    const pills = document.querySelectorAll('[data-theme-set]');
    function syncPills() {
      const t = (window.MTNMA && MTNMA.getTheme) ? MTNMA.getTheme() : (document.documentElement.getAttribute('data-theme') || 'light');
      pills.forEach(b => b.classList.toggle('is-active', b.dataset.themeSet === t));
    }
    pills.forEach(b => {
      b.addEventListener('click', () => {
        if (window.MTNMA) MTNMA.setTheme(b.dataset.themeSet);
        syncPills();
      });
    });
    syncPills();
    document.addEventListener('mtnma:theme', syncPills);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
