// ===== Access OS — Shared Script =====

// ---- Theme System ----
const THEMES = [
  { id: 'default', name: 'Amethyst', colors: ['#6c5ce7', '#a29bfe', '#74b9ff'] },
  { id: 'ocean',   name: 'Ocean',    colors: ['#0984e3', '#74b9ff', '#00cec9'] },
  { id: 'sunset',  name: 'Sunset',   colors: ['#e17055', '#fab1a0', '#fdcb6e'] },
  { id: 'forest',  name: 'Forest',   colors: ['#00b894', '#55efc4', '#81ecec'] },
  { id: 'cherry',  name: 'Cherry',   colors: ['#d63031', '#ff7675', '#fd79a8'] },
  { id: 'midnight',name: 'Midnight', colors: ['#2d3436', '#636e72', '#b2bec3'] },
];

function applyTheme(themeId) {
  if (themeId === 'default') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', themeId);
  }
  localStorage.setItem('accessos-theme', themeId);
  // Update active swatch
  document.querySelectorAll('.theme-swatch').forEach(s => {
    s.classList.toggle('active', s.dataset.theme === themeId);
  });
}

function loadSavedTheme() {
  const saved = localStorage.getItem('accessos-theme');
  if (saved) applyTheme(saved);
}

// ---- Custom Panel System ----
function getPanelItems() {
  try {
    return JSON.parse(localStorage.getItem('accessos-panel') || '[]');
  } catch { return []; }
}

function savePanelItems(items) {
  localStorage.setItem('accessos-panel', JSON.stringify(items));
}

function renderPanel() {
  const grid = document.getElementById('panelGrid');
  if (!grid) return;

  const items = getPanelItems();
  grid.innerHTML = '';

  items.forEach((item, idx) => {
    const card = document.createElement('a');
    card.href = item.url;
    card.target = '_blank';
    card.rel = 'noopener';
    card.className = 'panel-shortcut';
    card.innerHTML = `
      <button class="shortcut-delete" data-idx="${idx}" title="Remove">&times;</button>
      <div class="shortcut-icon">${item.icon}</div>
      <span class="shortcut-name">${item.name}</span>
    `;
    grid.appendChild(card);
  });

  // Delete handlers
  grid.querySelectorAll('.shortcut-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const i = parseInt(btn.dataset.idx);
      const arr = getPanelItems();
      arr.splice(i, 1);
      savePanelItems(arr);
      renderPanel();
    });
  });

  // Add card
  const addCard = document.createElement('div');
  addCard.className = 'panel-add-card';
  addCard.id = 'panelAddBtn';
  addCard.innerHTML = `<div class="add-icon">+</div><span>Add Shortcut</span>`;
  addCard.addEventListener('click', () => {
    const modal = document.getElementById('panelModal');
    if (modal) modal.classList.add('active');
  });
  grid.appendChild(addCard);
}

function addPanelItem(name, url, icon) {
  const items = getPanelItems();
  items.push({ name, url, icon });
  savePanelItems(items);
  renderPanel();
}

// ---- DOM Ready ----
document.addEventListener('DOMContentLoaded', () => {
  // Load saved theme
  loadSavedTheme();

  // Mobile nav toggle
  const toggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      toggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks) navLinks.classList.remove('open');
      if (toggle) toggle.textContent = '☰';
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.background = window.scrollY > 20
        ? 'rgba(10, 10, 15, 0.95)'
        : 'rgba(10, 10, 15, 0.8)';
    });
  }

  // Settings drawer
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsOverlay = document.getElementById('settingsOverlay');
  const settingsDrawer = document.getElementById('settingsDrawer');
  const settingsClose = document.getElementById('settingsClose');

  function openSettings() {
    if (settingsOverlay) settingsOverlay.classList.add('active');
    if (settingsDrawer) settingsDrawer.classList.add('active');
  }
  function closeSettings() {
    if (settingsOverlay) settingsOverlay.classList.remove('active');
    if (settingsDrawer) settingsDrawer.classList.remove('active');
  }

  if (settingsBtn) settingsBtn.addEventListener('click', openSettings);
  if (settingsOverlay) settingsOverlay.addEventListener('click', closeSettings);
  if (settingsClose) settingsClose.addEventListener('click', closeSettings);

  // Theme swatches
  document.querySelectorAll('.theme-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      applyTheme(swatch.dataset.theme);
    });
  });

  // Mark current theme swatch as active on load
  const currentTheme = localStorage.getItem('accessos-theme') || 'default';
  document.querySelectorAll('.theme-swatch').forEach(s => {
    s.classList.toggle('active', s.dataset.theme === currentTheme);
  });

  // Custom panel
  renderPanel();

  // Panel modal
  const panelModal = document.getElementById('panelModal');
  const panelCancel = document.getElementById('panelCancel');
  const panelSave = document.getElementById('panelSave');

  if (panelCancel) {
    panelCancel.addEventListener('click', () => {
      panelModal.classList.remove('active');
    });
  }

  if (panelModal) {
    panelModal.addEventListener('click', (e) => {
      if (e.target === panelModal) panelModal.classList.remove('active');
    });
  }

  // Emoji picker
  let selectedEmoji = '🔗';
  document.querySelectorAll('.emoji-picker-row button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.emoji-picker-row button').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedEmoji = btn.textContent;
    });
  });

  if (panelSave) {
    panelSave.addEventListener('click', () => {
      const nameInput = document.getElementById('panelName');
      const urlInput = document.getElementById('panelUrl');
      const name = nameInput ? nameInput.value.trim() : '';
      let url = urlInput ? urlInput.value.trim() : '';

      if (!name || !url) return;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }

      addPanelItem(name, url, selectedEmoji);

      // Reset form
      if (nameInput) nameInput.value = '';
      if (urlInput) urlInput.value = '';
      selectedEmoji = '🔗';
      document.querySelectorAll('.emoji-picker-row button').forEach(b => b.classList.remove('selected'));
      const defaultBtn = document.querySelector('.emoji-picker-row button');
      if (defaultBtn) defaultBtn.classList.add('selected');

      panelModal.classList.remove('active');
    });
  }
});
