// Basic login / register using localStorage. Demo only, not real security.
function getUsers() {
  try { return JSON.parse(localStorage.getItem('sl_users')) || []; }
  catch (e) { return []; }
}

function showMsg(text, good) {
  var m = document.getElementById('msg');
  m.textContent = text;
  m.className = 'msg' + (good ? ' ok' : '');
}

// ---- register ----
var regForm = document.getElementById('regForm');
if (regForm) {
  regForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim().toLowerCase();
    var pass = document.getElementById('pass').value;
    var pass2 = document.getElementById('pass2').value;
    var role = document.getElementById('role').value;

    if (!name || !email || !pass) return showMsg('Fill in all the fields.');
    if (email.indexOf('@') < 1) return showMsg('Enter a valid email address.');
    if (pass.length < 6) return showMsg('Password needs at least 6 characters.');
    if (pass !== pass2) return showMsg('The two passwords do not match.');

    var users = getUsers();
    if (users.some(function (u) { return u.email === email; }))
      return showMsg('This email is already registered. Sign in instead.');

    users.push({ name: name, email: email, pass: pass, role: role });
    localStorage.setItem('sl_users', JSON.stringify(users));
    showMsg('Account created. Taking you to sign in...', true);
    setTimeout(function () { window.location.href = 'login.html'; }, 900);
  });
}

// ---- login ----
var loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = document.getElementById('email').value.trim().toLowerCase();
    var pass = document.getElementById('pass').value;
    var user = getUsers().filter(function (u) { return u.email === email && u.pass === pass; })[0];

    if (!user) return showMsg('Email or password is wrong. Check them or create an account.');
    sessionStorage.setItem('sl_session', JSON.stringify({ name: user.name, role: user.role }));
    window.location.href = 'dashboard.html';
  });

  document.getElementById('eye').addEventListener('click', function () {
    var p = document.getElementById('pass');
    var show = p.type === 'password';
    p.type = show ? 'text' : 'password';
    this.innerHTML = '<i class="bi bi-eye' + (show ? '-slash' : '') + '"></i>';
  });
}

// ---- protected pages ----
if (document.querySelector('.shell')) {
  var session = JSON.parse(sessionStorage.getItem('sl_session') || 'null');
  if (!session) {
    window.location.href = 'login.html';
  } else {
    document.getElementById('userName').textContent = session.name;
    document.getElementById('userRole').textContent = session.role;
  }
  document.getElementById('logout').addEventListener('click', function (e) {
    e.preventDefault();
    sessionStorage.removeItem('sl_session');
    window.location.href = 'login.html';
  });
}
