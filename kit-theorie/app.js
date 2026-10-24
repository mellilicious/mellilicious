const TOPICS = COURSE.themen;
const CHAPTERS = [...new Set(TOPICS.map(t => t.kapitel))];
const BY_ID = Object.fromEntries(TOPICS.map(t => [t.id, t]));
const $ = id => document.getElementById(id);

function el(tag, attrs = {}, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') e.className = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v);
  }
  kids.flat().forEach(c => e.append(c instanceof Node ? c : document.createTextNode(c)));
  return e;
}
function html(s) { const d = el('div'); d.innerHTML = s; return d; }
const plain = s => html(s).textContent;

let current = location.hash.slice(1);
if (!BY_ID[current]) current = TOPICS[0].id;
let query = '';

const matches = t => !query || query.split(/\s+/).every(w =>
  (t.titel + ' ' + plain(t.erklaerung) + ' ' + t.lernziele.join(' ')).toLowerCase().includes(w));

function select(id) {
  current = id;
  history.replaceState(null, '', '#' + id);
  drawToc(); drawTopic();
  window.scrollTo(0, 0);
}
const link = id => el('button', { onclick: () => select(id) }, BY_ID[id].titel);

function drawToc() {
  const toc = $('toc'); toc.innerHTML = '';
  CHAPTERS.forEach(k => {
    const ts = TOPICS.filter(t => t.kapitel === k && matches(t));
    if (!ts.length) return;
    toc.append(el('h3', {}, k));
    ts.forEach(t => toc.append(el('button', { 'aria-current': String(t.id === current), onclick: () => select(t.id) }, t.titel)));
  });
  if (!toc.children.length) toc.append(el('p', { class: 'empty' }, 'Nichts gefunden.'));
}

function drawTopic() {
  const t = BY_ID[current], i = TOPICS.indexOf(t), m = $('main');
  m.innerHTML = '';
  m.append(el('div', { class: 'meta' }, t.kapitel, el('span', { class: 'badge rel-' + t.relevanz }, 'Relevanz ' + t.relevanz), 'Quelle: ' + t.quelle));
  m.append(el('h2', {}, t.titel));
  const used = TOPICS.filter(x => x.abhaengigVon.includes(t.id)).map(x => x.id);
  if (t.abhaengigVon.length) m.append(el('p', { class: 'links' }, 'Baut auf: ', t.abhaengigVon.map(link)));
  if (used.length) m.append(el('p', { class: 'links' }, 'Wird gebraucht in: ', used.map(link)));
  m.append(el('details', { open: '' }, el('summary', {}, 'Lernziele'), el('ul', {}, t.lernziele.map(l => el('li', {}, l)))));
  m.append(html(t.erklaerung));
  m.append(el('div', { class: 'warn' }, el('b', {}, 'Typische Fehler'), el('ul', {}, t.typischeFehler.map(f => el('li', {}, f)))));
  m.append(el('details', {}, el('summary', {}, 'Profi-Level: Hintergründe und Prüfernachfragen'), html(t.profLevel)));
  m.append(el('div', { class: 'nav' },
    i > 0 ? el('button', { onclick: () => select(TOPICS[i - 1].id) }, '← ' + TOPICS[i - 1].titel) : el('span'),
    i < TOPICS.length - 1 ? el('button', { onclick: () => select(TOPICS[i + 1].id) }, TOPICS[i + 1].titel + ' →') : el('span')));
}

$('fach').textContent = COURSE.meta.fach;
$('search').addEventListener('input', e => { query = e.target.value.trim().toLowerCase(); drawToc(); });
window.addEventListener('hashchange', () => { const id = location.hash.slice(1); if (BY_ID[id] && id !== current) select(id); });
drawToc(); drawTopic();
