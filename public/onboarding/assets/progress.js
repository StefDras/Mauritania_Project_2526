/* MTNMA UX Onboarding — progress + theme + RTL.
   Shared across all pages. */
(function () {
  'use strict';

  const STORAGE_KEY = 'mtnma_onboarding_v1';
  const THEME_KEY   = 'mtnma_theme_v1';
  const DIR_KEY     = 'mtnma_dir_v1';

  // Canonical task catalog — keep in sync with content/tasks-*.js -----------
  // Each task has a stable id (week + index). Source of truth for counting.
  const CATALOG = {
    1: [
      'w1-t1', 'w1-t2', 'w1-t3'
    ],
    2: [
      'w2-t1', 'w2-t2', 'w2-t3'
    ],
    3: [
      'w3-t1'
    ],
    4: [
      'w4-t1', 'w4-t2'
    ],
    5: [
      'w5-t1', 'w5-t2'
    ],
    6: [
      'w6-t1', 'w6-t2'
    ],
  };

  const ALL_IDS = Object.values(CATALOG).flat();

  // --- Storage ---
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      return JSON.parse(raw) || {};
    } catch (_) { return {}; }
  }
  function saveState(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
  }

  function isDone(id) { return !!loadState()[id]; }
  function setDone(id, done) {
    const s = loadState();
    if (done) s[id] = Date.now();
    else delete s[id];
    saveState(s);
    announce();
  }
  function resetAll() {
    saveState({});
    announce();
  }

  function weekCount(week) {
    const ids = CATALOG[week] || [];
    const s = loadState();
    const done = ids.filter(id => s[id]).length;
    return { done, total: ids.length };
  }
  function totalCount() {
    const s = loadState();
    const done = ALL_IDS.filter(id => s[id]).length;
    return { done, total: ALL_IDS.length };
  }

  // --- Announce to all listeners ---
  const listeners = new Set();
  function announce() { listeners.forEach(fn => { try { fn(); } catch(_){} }); }
  function onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }

  // --- Theme ---
  function getTheme() {
    try {
      return localStorage.getItem(THEME_KEY) || 'light';
    } catch (_) { return 'light'; }
  }
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem(THEME_KEY, t); } catch (_) {}
    document.dispatchEvent(new CustomEvent('mtnma:theme', { detail: t }));
  }
  function applySavedTheme() {
    const t = getTheme();
    document.documentElement.setAttribute('data-theme', t);
  }

  // --- Direction ---
  function getDir() {
    try { return localStorage.getItem(DIR_KEY) || 'ltr'; } catch (_) { return 'ltr'; }
  }
  function setDir(d) {
    document.body.setAttribute('dir', d);
    document.documentElement.lang = d === 'rtl' ? 'ar' : 'fr';
    try { localStorage.setItem(DIR_KEY, d); } catch (_) {}
    document.dispatchEvent(new CustomEvent('mtnma:dir', { detail: d }));
  }
  function applySavedDir() {
    const d = getDir();
    document.body.setAttribute('dir', d);
    document.documentElement.lang = d === 'rtl' ? 'ar' : 'fr';
  }

  // Apply theme EARLY (before paint) to avoid flash. Direction needs body,
  // so that happens on DOMContentLoaded below.
  applySavedTheme();

  document.addEventListener('DOMContentLoaded', () => {
    applySavedDir();

    // Wire up any ?reset in URL for quick demo resets
    if (new URLSearchParams(location.search).get('reset') === '1') {
      resetAll();
    }

    // Hydrate any task elements on page: <li class="task" data-task-id="w1-t1">
    document.querySelectorAll('.task[data-task-id]').forEach(el => {
      const id = el.dataset.taskId;
      const applyVisual = () => {
        el.classList.toggle('is-done', isDone(id));
        el.setAttribute('aria-checked', isDone(id) ? 'true' : 'false');
      };
      el.setAttribute('role', 'checkbox');
      el.setAttribute('tabindex', '0');
      applyVisual();

      const toggle = () => {
        const next = !isDone(id);
        setDone(id, next);
        applyVisual();
        // Celebrate if this flips the whole week to done
        const w = Number(el.dataset.week || el.closest('[data-week]')?.dataset.week || 0);
        if (next && w) {
          const c = weekCount(w);
          if (c.done === c.total) celebrate(w);
        }
      };
      el.addEventListener('click', toggle);
      el.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); }
      });

      onChange(applyVisual);
    });

    // Hydrate progress UI elements
    hydrateProgressUI();
    // Theme toggle buttons
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      const sync = () => {
        const t = getTheme();
        btn.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
        btn.dataset.theme = t;
      };
      sync();
      btn.addEventListener('click', () => {
        setTheme(getTheme() === 'dark' ? 'light' : 'dark');
        sync();
      });
    });
    // Direction toggle buttons
    document.querySelectorAll('[data-dir-toggle]').forEach(btn => {
      const sync = () => {
        const d = getDir();
        btn.setAttribute('aria-pressed', d === 'rtl' ? 'true' : 'false');
        btn.dataset.dir = d;
        btn.textContent = d === 'rtl' ? 'FR' : 'عر';
      };
      sync();
      btn.addEventListener('click', () => {
        setDir(getDir() === 'rtl' ? 'ltr' : 'rtl');
        sync();
      });
    });
    // Reset button
    document.querySelectorAll('[data-reset-progress]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm("Réinitialiser votre progression ? Toutes les tâches cochées seront décochées.")) {
          resetAll();
        }
      });
    });
  });

  function hydrateProgressUI() {
    const render = () => {
      // Overall bar + count
      document.querySelectorAll('[data-progress="overall"]').forEach(el => {
        const { done, total } = totalCount();
        const pct = total ? Math.round((done / total) * 100) : 0;
        const bar = el.querySelector('.progress-bar-fill');
        const count = el.querySelector('[data-progress-count]');
        const pctEl = el.querySelector('[data-progress-pct]');
        if (bar) bar.style.width = pct + '%';
        if (count) count.textContent = `${done} / ${total}`;
        if (pctEl) pctEl.textContent = pct + '%';
        el.setAttribute('aria-valuenow', pct);
      });
      // Per-week
      document.querySelectorAll('[data-progress-week]').forEach(el => {
        const w = Number(el.dataset.progressWeek);
        const { done, total } = weekCount(w);
        const pct = total ? Math.round((done / total) * 100) : 0;
        const bar = el.querySelector('.progress-bar-fill');
        const count = el.querySelector('[data-progress-count]');
        const pctEl = el.querySelector('[data-progress-pct]');
        if (bar) bar.style.width = pct + '%';
        if (count) count.textContent = `${done} / ${total}`;
        if (pctEl) pctEl.textContent = pct + '%';
        el.classList.toggle('is-complete', total > 0 && done === total);
      });
    };
    render();
    onChange(render);
  }

  // --- Celebration on week complete ---
  let celebrationPending = null;
  function celebrate(week) {
    if (celebrationPending === week) return;
    celebrationPending = week;
    const modal = document.getElementById('celebration-modal');
    if (!modal) return;
    const weekName = modal.querySelector('[data-celebration-week]');
    if (weekName) weekName.textContent = 'Semaine ' + week;
    modal.classList.add('is-open');
    // Confetti
    spawnConfetti(modal.querySelector('.celebration-confetti'));
    const close = () => {
      modal.classList.remove('is-open');
      celebrationPending = null;
    };
    modal.querySelectorAll('[data-close]').forEach(b => {
      b.onclick = close;
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    }, { once: true });
  }

  function spawnConfetti(container) {
    if (!container) return;
    container.innerHTML = '';
    const colors = ['#FAD606', '#900B09', '#26AB4D', '#1E1E1E'];
    const n = 36;
    for (let i = 0; i < n; i++) {
      const el = document.createElement('span');
      el.className = 'confetti-piece';
      el.style.background = colors[i % colors.length];
      el.style.left = (Math.random() * 100) + '%';
      el.style.animationDelay = (Math.random() * 0.3) + 's';
      el.style.animationDuration = (1.6 + Math.random() * 1.2) + 's';
      el.style.transform = `rotate(${Math.random() * 360}deg)`;
      container.appendChild(el);
    }
  }

  // Expose a tiny API on window for HTML pages to query
  window.MTNMA = {
    catalog: CATALOG,
    isDone, setDone, resetAll,
    weekCount, totalCount,
    onChange,
    setTheme, getTheme,
    setDir, getDir,
    celebrate
  };
})();
