// Fake loading sequence, then send the user to the right page
var msgs = ['Loading candidate data', 'Preparing skill weights', 'Almost ready'];
var fill = document.getElementById('fill');
var note = document.getElementById('loadMsg');
var pct = 0;

var timer = setInterval(function () {
  pct += 2;
  fill.style.width = pct + '%';
  note.textContent = msgs[Math.min(2, Math.floor(pct / 34))];
  if (pct >= 100) {
    clearInterval(timer);
    var loggedIn = sessionStorage.getItem('sl_session');
    window.location.href = loggedIn ? 'dashboard.html' : 'login.html';
  }
}, 45);
