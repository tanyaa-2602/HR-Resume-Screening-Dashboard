// Weighting engine + ranking + breakdown
var DEFAULT_W = { 'HTML/CSS': 6, 'JavaScript': 8, 'React': 8, 'Python': 2, 'SQL': 2, 'Communication': 5, 'Teamwork': 4 };
var weights = Object.assign({}, DEFAULT_W);
var selectedId = null;

function maxPoints() {
  return SKILLS.reduce(function (t, s) { return t + weights[s] * 10; }, 0);
}

// score = sum(weight x level) / sum(weight x 10) x 100
function scoreOf(c) {
  var max = maxPoints();
  if (!max) return 0;
  var tot = SKILLS.reduce(function (t, s) { return t + weights[s] * c.skills[s]; }, 0);
  return Math.round(tot / max * 1000) / 10;
}

function buildSliders() {
  var box = document.getElementById('weights');
  box.innerHTML = SKILLS.map(function (s, i) {
    return '<div class="w-row"><label for="w' + i + '">' + s +
      '<output id="o' + i + '">' + weights[s] + '</output></label>' +
      '<input type="range" min="0" max="10" id="w' + i + '" value="' + weights[s] + '" data-skill="' + s + '"></div>';
  }).join('');

  box.querySelectorAll('input').forEach(function (el, i) {
    el.addEventListener('input', function () {
      weights[el.dataset.skill] = Number(el.value);
      document.getElementById('o' + i).textContent = el.value;
      render();
    });
  });
}

function render() {
  var q = document.getElementById('search').value.trim().toLowerCase();
  var all = CANDIDATES.map(function (c) { return { c: c, s: scoreOf(c) }; })
    .sort(function (a, b) { return b.s - a.s; });

  // figures use everyone, table uses the search filter
  var scores = all.map(function (x) { return x.s; });
  document.getElementById('fCount').textContent = all.length;
  document.getElementById('fTop').textContent = scores[0].toFixed(1);
  document.getElementById('fAvg').textContent =
    (scores.reduce(function (a, b) { return a + b; }, 0) / scores.length).toFixed(1);
  document.getElementById('fLead').textContent = all[0].c.name;

  var rows = all.map(function (x, i) { x.rank = i + 1; return x; })
    .filter(function (x) { return x.c.name.toLowerCase().indexOf(q) > -1; });

  var body = document.getElementById('rankBody');
  if (!rows.length) {
    body.innerHTML = '<tr><td colspan="3" class="empty">No candidate matches "' + q + '".</td></tr>';
  } else {
    body.innerHTML = rows.map(function (x) {
      return '<tr data-id="' + x.c.id + '" class="' + (x.c.id === selectedId ? 'sel' : '') + '">' +
        '<td class="no">' + x.rank + '</td>' +
        '<td class="nm"><b>' + x.c.name + '</b><small>' + x.c.exp + ' yr &middot; ' + x.c.edu + '</small></td>' +
        '<td><div class="sc"><div class="bar"><i style="width:' + x.s + '%"></i></div><b>' + x.s.toFixed(1) + '</b></div></td></tr>';
    }).join('');
    body.querySelectorAll('tr').forEach(function (tr) {
      tr.addEventListener('click', function () {
        selectedId = Number(tr.dataset.id);
        render();
      });
    });
  }
  showBreakdown();
}

function showBreakdown() {
  var box = document.getElementById('breakdown');
  var c = CANDIDATES.filter(function (x) { return x.id === selectedId; })[0];
  if (!c) return;

  var max = maxPoints();
  var html = '<h4 class="h6 mb-0">' + c.name + '</h4>' +
    '<p class="text-secondary small mb-3">' + c.city + ' &middot; ' + c.edu + '</p>';

  html += SKILLS.map(function (s) {
    var pts = max ? weights[s] * c.skills[s] / max * 100 : 0;
    return '<div class="bd-row"><span>' + s + '</span>' +
      '<div class="bar" title="Level ' + c.skills[s] + ' of 10, weight ' + weights[s] + '"><i data-w="' + (c.skills[s] * 10) + '"></i></div>' +
      '<em>+' + pts.toFixed(1) + '</em></div>';
  }).join('');

  html += '<hr><div class="d-flex justify-content-between"><span>Total match</span><b>' + scoreOf(c).toFixed(1) + ' / 100</b></div>' +
    '<p class="small text-secondary mt-2 mb-0">Bar length is the skill level. The number is the points it adds after weighting.</p>';

  box.innerHTML = html;
  // set widths after paint so the bars grow
  requestAnimationFrame(function () {
    box.querySelectorAll('.bar i').forEach(function (b) { b.style.width = b.dataset.w + '%'; });
  });
}

document.getElementById('search').addEventListener('input', render);
document.getElementById('reset').addEventListener('click', function () {
  weights = Object.assign({}, DEFAULT_W);
  buildSliders();
  render();
});

buildSliders();
render();
