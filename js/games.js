// ===== Access OS — Games Logic =====

// Games list - using sites that actually work
// Some games open in iframe, others open in new tab if iframe is blocked
const GAMES = [
  { name: '2048', cat: 'puzzle', icon: '🔢', url: 'https://play2048.co/', iframe: true },
  { name: 'Slope', cat: 'action', icon: '⛷️', url: 'https://slope-online.github.io/', iframe: true },
  { name: 'Retro Bowl', cat: 'sports', icon: '🏈', url: 'https://retrobowl.me/', iframe: true },
  { name: 'Cookie Clicker', cat: 'arcade', icon: '🍪', url: 'https://orteil.dashnet.org/cookieclicker/', iframe: true },
  { name: 'Tunnel Rush', cat: 'action', icon: '🚇', url: 'https://poki.com/en/g/tunnel-rush', iframe: false },
  { name: 'Flappy Bird', cat: 'arcade', icon: '🐦', url: 'https://flappybird.io/', iframe: true },
  { name: 'Chess', cat: 'puzzle', icon: '♟️', url: 'https://www.chess.com/play/computer', iframe: false },
  { name: 'Tetris', cat: 'puzzle', icon: '🟦', url: 'https://tetris.com/play-tetris', iframe: false },
  { name: 'Snake', cat: 'arcade', icon: '🐍', url: 'https://playsnake.org/', iframe: true },
  { name: 'Pac-Man', cat: 'arcade', icon: '👾', url: 'https://freepacman.org/', iframe: true },
  { name: 'Agar.io', cat: 'io', icon: '🟢', url: 'https://agar.io/', iframe: true },
  { name: 'Slither.io', cat: 'io', icon: '🐛', url: 'https://slither.io/', iframe: true },
  { name: 'Crossy Road', cat: 'arcade', icon: '🐔', url: 'https://poki.com/en/g/crossy-road', iframe: false },
  { name: 'Moto X3M', cat: 'action', icon: '🏍️', url: 'https://poki.com/en/g/moto-x3m', iframe: false },
  { name: 'Sudoku', cat: 'puzzle', icon: '🔢', url: 'https://sudoku.com/', iframe: true },
  { name: 'Paper.io 2', cat: 'io', icon: '📄', url: 'https://paper-io.com/', iframe: true },
  { name: 'Wordle', cat: 'puzzle', icon: '📝', url: 'https://www.nytimes.com/games/wordle/index.html', iframe: false },
  { name: 'Geometry Dash', cat: 'action', icon: '🔷', url: 'https://poki.com/en/g/geometry-dash', iframe: false },
  { name: 'Drift Boss', cat: 'action', icon: '🏎️', url: 'https://poki.com/en/g/drift-boss', iframe: false },
  { name: 'Basketball Stars', cat: 'sports', icon: '🏀', url: 'https://poki.com/en/g/basketball-stars', iframe: false },
  { name: 'Cut the Rope', cat: 'puzzle', icon: '✂️', url: 'https://poki.com/en/g/cut-the-rope', iframe: false },
  { name: 'Temple Run 2', cat: 'action', icon: '🏃', url: 'https://poki.com/en/g/temple-run-2', iframe: false },
  { name: 'Subway Surfers', cat: 'action', icon: '🛹', url: 'https://poki.com/en/g/subway-surfers', iframe: false },
  { name: 'Stick Merge', cat: 'arcade', icon: '🗡️', url: 'https://poki.com/en/g/stick-merge', iframe: false },
  // GN Math CDN Games (Githack Mirrors for correct HTML rendering)
  { name: 'Bowmasters', cat: 'arcade', icon: '🏹', url: 'https://raw.githack.com/freebuisness/html/main/0.html', iframe: true },
  { name: 'OvO', cat: 'action', icon: '🏃', url: 'https://raw.githack.com/freebuisness/html/main/1-fde.html', iframe: true },
  { name: 'OvO 2', cat: 'action', icon: '🏃', url: 'https://raw.githack.com/freebuisness/html/main/2e.html', iframe: true },
  { name: 'OvO 3D', cat: 'action', icon: '🏃', url: 'https://raw.githack.com/freebuisness/html/main/3.html', iframe: true },
  { name: 'Gladihoppers', cat: 'action', icon: '⚔️', url: 'https://raw.githack.com/freebuisness/html/main/4.html', iframe: true },
  { name: 'Ice Dodo', cat: 'action', icon: '🧊', url: 'https://raw.githack.com/freebuisness/html/main/5.html', iframe: true },
  { name: 'Block Blast', cat: 'puzzle', icon: '🧱', url: 'https://raw.githack.com/freebuisness/html/main/6.html', iframe: true },
  { name: 'Jetpack Joyride', cat: 'arcade', icon: '🚀', url: 'https://raw.githack.com/freebuisness/html/main/7.html', iframe: true },
  { name: 'Friday Night Funkin', cat: 'arcade', icon: '🎤', url: 'https://raw.githack.com/freebuisness/html/main/8-wow.html', iframe: true },
  { name: 'Sprunki', cat: 'arcade', icon: '🧟', url: 'https://raw.githack.com/freebuisness/html/main/9.html', iframe: true },
  // Advanced GN Math Games (Verified Mirrors)
  { name: 'Buckshot Roulette', cat: 'action', icon: '🔫', url: 'https://raw.githack.com/freebuisness/html/1c926d43eb0e46553f403bd899432167fd126c49/205-f.html', iframe: true },
  { name: 'R.E.P.O', cat: 'action', icon: '📦', url: 'https://raw.githack.com/freebuisness/html/1c926d43eb0e46553f403bd899432167fd126c49/195.html', iframe: true },
  { name: 'Half-Life', cat: 'action', icon: '☢️', url: 'https://raw.githack.com/freebuisness/html/1c926d43eb0e46553f403bd899432167fd126c49/262.html', iframe: true },
  { name: 'Cuphead', cat: 'arcade', icon: '☕', url: 'https://raw.githack.com/freebuisness/html/1c926d43eb0e46553f403bd899432167fd126c49/465-fix.html', iframe: true },
  { name: 'Kindergarten', cat: 'puzzle', icon: '🎒', url: 'https://raw.githack.com/freebuisness/html/1c926d43eb0e46553f403bd899432167fd126c49/445.html', iframe: true },
  { name: 'Hollow Knight', cat: 'action', icon: '⚔️', url: 'https://raw.githack.com/freebuisness/html/1c926d43eb0e46553f403bd899432167fd126c49/468-f.html', iframe: true },
  { name: 'Slime Rancher', cat: 'arcade', icon: '🧪', url: 'https://raw.githack.com/freebuisness/html/1c926d43eb0e46553f403bd899432167fd126c49/591-awe.html', iframe: true },
  { name: 'Silksong', cat: 'action', icon: '🕸️', url: 'https://raw.githack.com/freebuisness/html/1c926d43eb0e46553f403bd899432167fd126c49/771-z.html', iframe: true },
];

let currentCategory = 'all';

function renderGames(filter = '') {
  const grid = document.getElementById('gamesGrid');
  if (!grid) return;

  const filtered = GAMES.filter(g => {
    const matchCat = currentCategory === 'all' || g.cat === currentCategory;
    const matchSearch = g.name.toLowerCase().includes(filter.toLowerCase());
    return matchCat && matchSearch;
  });

  grid.innerHTML = filtered.map(g => `
    <div class="game-card" data-url="${g.url}" data-name="${g.name}" data-iframe="${g.iframe}" data-icon="${g.icon}">
      <div class="game-thumb">
        ${g.icon}
        <div class="play-overlay">
          <div class="play-btn">▶</div>
        </div>
      </div>
      <div class="game-info">
        <h3>${g.name}</h3>
        <span>${g.cat.charAt(0).toUpperCase() + g.cat.slice(1)}${g.iframe ? '' : ' • Opens in new tab'}</span>
      </div>
    </div>
  `).join('');

  if (filtered.length === 0) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:3rem;">No games found.</p>';
  }

  // Attach click handlers
  grid.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', () => {
      const canIframe = card.dataset.iframe === 'true';
      const url = card.dataset.url;
      const icon = card.dataset.icon;
      if (canIframe) {
        openGame(url, card.dataset.name, icon);
      } else {
        // Open in new tab for sites that block iframes (like Poki)
        window.open(url, '_blank', 'noopener');
      }
    });
  });
}

function openGame(url, name, icon = '🎮') {
  if (window !== window.top) {
    window.parent.postMessage({ type: 'openApp', appId: name, url: url, icon: icon }, '*');
    return;
  }

  const modal = document.getElementById('gameModal');
  const frame = document.getElementById('gameFrame');
  const title = document.getElementById('modalTitle');
  if (!modal || !frame || !title) return;

  title.textContent = name;
  frame.src = url;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeGame() {
  const modal = document.getElementById('gameModal');
  const frame = document.getElementById('gameFrame');
  if (!modal || !frame) return;

  modal.classList.remove('active');
  frame.src = '';
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  renderGames();

  // Category tabs
  document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.cat;
      const search = document.getElementById('gameSearch');
      renderGames(search ? search.value : '');
    });
  });

  // Search
  const searchInput = document.getElementById('gameSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderGames(searchInput.value);
    });
  }

  // Modal close
  const closeBtn = document.getElementById('modalClose');
  if (closeBtn) closeBtn.addEventListener('click', closeGame);

  const modal = document.getElementById('gameModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeGame();
    });
  }

  // Fullscreen
  const fsBtn = document.getElementById('fullscreenBtn');
  if (fsBtn) {
    fsBtn.addEventListener('click', () => {
      const frame = document.getElementById('gameFrame');
      if (frame) {
        if (frame.requestFullscreen) frame.requestFullscreen();
        else if (frame.webkitRequestFullscreen) frame.webkitRequestFullscreen();
      }
    });
  }

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeGame();
  });
});
