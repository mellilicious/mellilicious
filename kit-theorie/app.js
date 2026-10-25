(function () {
  'use strict';

  /* ================= Storage & State ================= */
  const STORE_KEY = 'kit-theorie-v1';
  const storage = {
    load() { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } },
    save(s) { try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch (e) { /* ohne Speicher weiter */ } }
  };
  const DEFAULT_STATE = { exam: COURSE.meta.pruefungsdatum, check: {}, quiz: {}, tasks: {}, hints: {}, exams: [], topic: 'z1', taskFilter: 'fix' };
  let state = Object.assign({}, DEFAULT_STATE, storage.load());
  const persist = () => storage.save(state);

  /* ================= Daten-Helfer ================= */
  const TOPICS = COURSE.themen;
  const TOPIC = Object.fromEntries(TOPICS.map(t => [t.id, t]));
  const CHAPTERS = [...new Set(TOPICS.map(t => t.kapitel))];
  const ALL_Q = TOPICS.flatMap(t => t.fragen.map(q => Object.assign({ topic: t.id }, q)));
  const lzId = (tid, i) => tid + '-l' + i;
  const NIVEAUS = ['erinnern', 'verstehen', 'anwenden', 'analysieren'];
  const SCHW = { leicht: 'leicht', mittel: 'mittel', pruefung: 'Prüfungsniveau', schwer: 'schwerer als Prüfung' };

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => [...(root || document).querySelectorAll(sel)];
  const h = (tag, attrs, ...kids) => {
    const el = document.createElement(tag);
    for (const k in attrs || {}) {
      if (k === 'html') el.innerHTML = attrs[k];
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== false && attrs[k] != null) el.setAttribute(k, attrs[k] === true ? '' : attrs[k]);
    }
    kids.flat().forEach(c => c != null && el.append(c.nodeType ? c : document.createTextNode(c)));
    return el;
  };
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const normalize = s => String(s).toLowerCase().replace(/\s+/g, '').replace(/−/g, '-');
  const stripTags = s => s.replace(/<[^>]+>/g, ' ');

  /* ================= Datum ================= */
  const parseDate = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const isoDate = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const todayIso = () => isoDate(new Date());
  const daysBetween = (a, b) => Math.round((parseDate(b) - parseDate(a)) / 86400000);
  const fmtDay = s => parseDate(s).toLocaleDateString('de-AT', { weekday: 'short', day: 'numeric', month: 'numeric' });

  /* ================= Fortschritt ================= */
  const lzValue = id => [0, 0.5, 1][state.check[id] || 0];
  function topicProgress(t) { return t.lernziele.reduce((s, _, i) => s + lzValue(lzId(t.id, i)), 0) / t.lernziele.length; }
  function chapterProgress(k) { const ts = TOPICS.filter(t => t.kapitel === k); return ts.reduce((s, t) => s + topicProgress(t), 0) / ts.length; }
  function quizStats(tid) {
    let r = 0, w = 0;
    TOPIC[tid].fragen.forEach(q => { const s = state.quiz[q.id]; if (s) { r += s.r; w += s.w; } });
    return { r, w, n: r + w, quote: r + w ? r / (r + w) : null };
  }
  function weakTopics() {
    return TOPICS.map(t => Object.assign({ t }, quizStats(t.id))).filter(x => x.n >= 2 && x.quote < 0.6).sort((a, b) => a.quote - b.quote);
  }
  function recordAnswer(qid, ok) {
    const s = state.quiz[qid] || { r: 0, w: 0 };
    ok ? s.r++ : s.w++;
    s.last = ok ? 1 : 0;
    state.quiz[qid] = s; persist();
  }

  /* ================= Lernplan ================= */
  function buildPlan(startIso, examIso, blocks) {
    const start = daysBetween(todayIso(), startIso) > 0 ? todayIso() : startIso;
    const total = Math.max(1, daysBetween(start, examIso));
    const days = Array.from({ length: total }, (_, i) => ({ datum: isoDate(addDays(parseDate(start), i)), neu: [], wdh: [], extra: '' }));
    const learnDays = total >= 3 ? total - 1 : total;
    blocks.forEach((b, i) => {
      const d = Math.min(learnDays - 1, Math.floor(i * learnDays / blocks.length));
      days[d].neu.push(...b);
      [1, 3, 7].forEach(off => { if (d + off < total) days[d + off].wdh.push(...b); });
    });
    if (total >= 3) days[total - 1].extra = 'Probeklausur unter Zeitdruck · danach Schwachstellen wiederholen';
    days.forEach(d => { d.wdh = [...new Set(d.wdh)].filter(x => !d.neu.includes(x)); });
    days.push({ datum: examIso, neu: [], wdh: [], extra: 'Prüfung · vorher nur kurz die Checkliste durchgehen', exam: true });
    return days;
  }

  /* ================= Zeitdiagramm-Widget ================= */
  function drawWaves(root) {
    $$('svg#wave', root).forEach(svg => {
      if (svg.childNodes.length) return;
      const C = [0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,1,0,0], D = [0,1,1,1,0,0,1,1,1,0,1,0,0,1,1,1,0,0,0,1];
      const n = C.length, x0 = 90, w = 27, NS = 'http://www.w3.org/2000/svg';
      const latch = [], ff = []; let ql = null, qf = null;
      for (let t = 0; t < n; t++) { if (C[t]) ql = D[t]; if (C[t] && !(t > 0 && C[t - 1])) qf = D[t]; latch.push(ql); ff.push(qf); }
      const el = (tag, a, txt) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); if (txt) e.textContent = txt; svg.appendChild(e); return e; };
      const pid = 'hatch' + Math.random().toString(36).slice(2, 7);
      const defs = el('defs', {}); const pat = document.createElementNS(NS, 'pattern');
      [['id', pid], ['width', '6'], ['height', '6'], ['patternUnits', 'userSpaceOnUse'], ['patternTransform', 'rotate(45)']].forEach(([k, v]) => pat.setAttribute(k, v));
      const pl = document.createElementNS(NS, 'line'); [['x1', 0], ['y1', 0], ['x2', 0], ['y2', 6], ['stroke', 'var(--hatch)'], ['stroke-width', 3]].forEach(([k, v]) => pl.setAttribute(k, v));
      pat.appendChild(pl); defs.appendChild(pat);
      for (let t = 1; t < n; t++) if (C[t] && !C[t - 1]) el('line', { x1: x0 + t * w, y1: 10, x2: x0 + t * w, y2: 290, stroke: 'var(--v)', 'stroke-dasharray': '4 4', 'stroke-width': 1.2, opacity: .7 });
      [['D', D, 'var(--ink)'], ['C', C, 'var(--p)'], ['Q Latch', latch, 'var(--g)'], ['Q D-FF', ff, 'var(--v)']].forEach((r, i) => {
        const yHi = 30 + i * 70, yLo = yHi + 34; let d = '', started = false;
        el('text', { x: 4, y: yLo - 8, style: 'font-size:15px;fill:' + r[2] }, r[0]);
        r[1].forEach((v, t) => {
          const xa = x0 + t * w, xb = xa + w;
          if (v === null) { el('rect', { x: xa, y: yHi, width: w, height: yLo - yHi, fill: 'url(#' + pid + ')' }); started = false; return; }
          const y = v ? yHi : yLo; d += (started ? ' L' : 'M') + xa + ' ' + y + ' L' + xb + ' ' + y; started = true;
        });
        el('path', { d, fill: 'none', stroke: r[2], 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
      });
      el('text', { x: x0 + 10 * w + 2, y: 20, style: 'font-size:12px;fill:var(--muted)' }, 'kurzer D-Impuls bei C = 0');
      el('text', { x: x0 + 15 * w + 2, y: 20, style: 'font-size:12px;fill:var(--muted)' }, 'D fällt während C = 1');
    });
  }
  const richHtml = html => { const d = h('div', { html }); drawWaves(d); return d; };

  /* ================= Navigation ================= */
  const VIEWS = [
    ['dashboard', 'Übersicht', renderDashboard], ['plan', 'Lernplan', renderPlan], ['checkliste', 'Checkliste', renderChecklist],
    ['theorie', 'Theorie', renderTheory], ['quiz', 'Quiz', renderQuiz], ['aufgaben', 'Aufgaben', renderTasks],
    ['klausur', 'Probeklausur', renderExam], ['karten', 'Karteikarten', renderCards], ['umrechner', 'Umrechner', renderConverter], ['quellen', 'Quellen', renderSources]
  ];
  let current = 'dashboard';
  function renderTabs() {
    const nav = $('#tabs'); nav.innerHTML = '';
    VIEWS.forEach(([id, label]) => nav.append(h('a', { href: '#' + id, 'aria-current': id === current ? 'page' : false, onclick: e => { e.preventDefault(); go(id); } }, label)));
  }
  function go(id, opts) {
    if (examTimer && id !== 'klausur') { /* laufende Klausur nicht still abbrechen */ }
    current = VIEWS.some(v => v[0] === id) ? id : 'dashboard';
    try { history.replaceState(null, '', '#' + current); } catch (e) { }
    renderTabs();
    const view = $('#view'); view.innerHTML = '';
    VIEWS.find(v => v[0] === current)[2](view, opts || {});
    window.scrollTo(0, 0);
  }
  const topicChip = tid => h('button', { class: 'chip', onclick: () => { state.topic = tid; persist(); go('theorie'); } }, TOPIC[tid].titel);
  const relBadge = r => h('span', { class: 'badge rel-' + r }, 'Relevanz ' + r);

  /* ================= Übersicht ================= */
  function renderDashboard(view) {
    const left = daysBetween(todayIso(), state.exam);
    const overall = TOPICS.reduce((s, t) => s + topicProgress(t), 0) / TOPICS.length;
    const answered = Object.values(state.quiz).reduce((s, q) => s + q.r + q.w, 0);
    const right = Object.values(state.quiz).reduce((s, q) => s + q.r, 0);
    const dateInput = h('input', { type: 'date', id: 'exam-date', value: state.exam, onchange: e => { if (e.target.value) { state.exam = e.target.value; persist(); go('dashboard'); } } });
    view.append(
      h('div', { class: 'grid-k' },
        h('div', { class: 'panel' }, h('div', { class: 'label' }, 'Bis zur Prüfung'), h('div', { class: 'big' }, left > 0 ? left + (left === 1 ? ' Tag' : ' Tage') : left === 0 ? 'Heute!' : 'vorbei'),
          h('label', { class: 'row', for: 'exam-date', style: 'margin-top:6px' }, 'Prüfungsdatum ', dateInput)),
        h('div', { class: 'panel' }, h('div', { class: 'label' }, 'Lernziele erledigt'), h('div', { class: 'big' }, Math.round(overall * 100) + ' %'),
          h('div', { class: 'bar', role: 'progressbar', 'aria-valuenow': Math.round(overall * 100), 'aria-valuemin': 0, 'aria-valuemax': 100 }, h('i', { style: 'width:' + overall * 100 + '%' }))),
        h('div', { class: 'panel' }, h('div', { class: 'label' }, 'Quiz-Antworten'), h('div', { class: 'big' }, String(answered)),
          h('div', { class: 'sub' }, answered ? Math.round(right / answered * 100) + ' % richtig' : 'noch keine – starte im Reiter Quiz'))
      ));
    const chap = h('div', { class: 'panel' }, h('h3', {}, 'Fortschritt pro Modul'));
    CHAPTERS.forEach(k => { const p = chapterProgress(k); chap.append(h('p', {}, k + ' · ' + Math.round(p * 100) + ' %'), h('div', { class: 'bar' }, h('i', { style: 'width:' + p * 100 + '%' }))); });
    view.append(chap);

    const plan = buildPlan(COURSE.meta.start, state.exam, COURSE.lernplanBloecke);
    const today = plan.find(d => d.datum === todayIso());
    const todayBox = h('div', { class: 'panel' }, h('h3', {}, 'Heute dran'));
    if (today) {
      if (today.neu.length) todayBox.append(h('p', {}, h('b', {}, 'Neu: ')), h('div', {}, today.neu.map(topicChip)));
      if (today.wdh.length) todayBox.append(h('p', {}, h('b', {}, 'Wiederholen: ')), h('div', {}, today.wdh.map(topicChip)));
      if (today.extra) todayBox.append(h('p', {}, today.extra));
    } else todayBox.append(h('p', { class: 'empty' }, 'Heute steht nichts im Plan.'));
    view.append(todayBox);

    const weak = weakTopics();
    const wb = h('div', { class: 'panel' }, h('h3', {}, 'Schwachstellen'));
    if (weak.length) weak.forEach(x => wb.append(h('div', { class: 'row' }, topicChip(x.t.id), h('span', { class: 'c-r' }, Math.round(x.quote * 100) + ' % richtig (' + x.n + ' Antworten)'),
      h('button', { onclick: () => go('quiz', { topic: x.t.id }) }, 'Gezielt üben'))));
    else wb.append(h('p', { class: 'empty' }, 'Noch keine – ein Thema landet hier, wenn du darin unter 60 % richtig hast (ab 2 Antworten).'));
    view.append(wb);

    const fixBox = h('div', { class: 'panel' }, h('h3', {}, 'Kommt fix: Übungen aus Blatt 2 und Ü4'),
      h('p', {}, 'Diese Aufgaben hast du als prüfungsrelevant genannt. Sie sind im Reiter Aufgaben mit „kommt fix“ markiert.'),
      h('button', { class: 'primary', onclick: () => { state.taskFilter = 'fix'; persist(); go('aufgaben'); } }, 'Zu den fixen Aufgaben'));
    view.append(fixBox);
    view.append(h('details', {}, h('summary', {}, 'Annahmen'), h('ul', {}, COURSE.meta.annahmen.map(a => h('li', {}, a)))));
  }

  /* ================= Lernplan ================= */
  function renderPlan(view) {
    const plan = buildPlan(COURSE.meta.start, state.exam, COURSE.lernplanBloecke);
    view.append(h('h2', {}, 'Lernplan bis ' + fmtDay(state.exam)),
      h('p', { class: 'sub' }, 'Neuer Stoff in Blöcken, Wiederholung nach 1, 3 und 7 Tagen (wenn noch vor der Prüfung). Der vorletzte Tag ist für die Probeklausur reserviert. Ändere das Datum in der Übersicht, dann rechnet sich der Plan neu.'));
    const list = h('div', { class: 'panel' });
    plan.forEach(d => {
      const isToday = d.datum === todayIso();
      list.append(h('div', { class: 'day' + (isToday ? ' today' : '') + (d.exam ? ' exam' : '') },
        h('div', {}, h('b', {}, fmtDay(d.datum)), isToday ? h('div', { class: 'label' }, 'heute') : null),
        h('div', {},
          d.neu.length ? h('div', {}, h('span', { class: 'label' }, 'Neu '), d.neu.map(topicChip)) : null,
          d.wdh.length ? h('div', {}, h('span', { class: 'label' }, 'Wiederholen '), d.wdh.map(topicChip)) : null,
          d.extra ? h('div', { class: d.exam ? 'c-r' : '' }, d.extra) : null)));
    });
    view.append(list);
  }

  /* ================= Checkliste ================= */
  function statusControl(id) {
    const wrap = h('span', { class: 'status3', role: 'group', 'aria-label': 'Status' });
    ['offen', 'verstanden', 'sitzt sicher'].forEach((lbl, v) => wrap.append(h('button', { 'aria-pressed': String((state.check[id] || 0) === v), onclick: () => { state.check[id] = v; persist(); $$('button', wrap).forEach((b, i) => b.setAttribute('aria-pressed', String(i === v))); } }, lbl)));
    return wrap;
  }
  function renderChecklist(view) {
    view.append(h('h2', {}, 'Checkliste'), h('p', { class: 'sub' }, 'Jedes Lernziel als „Ich kann …“. Erst „sitzt sicher“ wählen, wenn du es ohne Unterlagen erklären oder rechnen kannst.'));
    CHAPTERS.forEach(k => {
      const box = h('div', { class: 'panel' }, h('h3', {}, k));
      TOPICS.filter(t => t.kapitel === k).forEach(t => {
        box.append(h('h4', { class: 'row' }, h('button', { class: 'chip', onclick: () => { state.topic = t.id; persist(); go('theorie'); } }, t.titel), relBadge(t.relevanz)));
        t.lernziele.forEach((lz, i) => box.append(h('div', { class: 'lz' }, h('span', { class: 't' }, lz), statusControl(lzId(t.id, i)))));
      });
      view.append(box);
    });
  }

  /* ================= Theorie ================= */
  function topicMatches(t, q) { if (!q) return true; const hay = (t.titel + ' ' + stripTags(t.erklaerung) + ' ' + t.lernziele.join(' ')).toLowerCase(); return q.toLowerCase().split(/\s+/).every(w => hay.includes(w)); }
  function renderTopicBody(t) {
    const body = h('article', {});
    body.append(h('div', { class: 'row' }, h('span', { class: 'label' }, t.kapitel), relBadge(t.relevanz), h('span', { class: 'sub' }, 'Quelle: ' + t.quelle)));
    body.append(h('h2', {}, t.titel));
    if (t.abhaengigVon.length) body.append(h('p', {}, h('span', { class: 'label' }, 'Baut auf '), t.abhaengigVon.map(topicChip)));
    const usedBy = TOPICS.filter(x => x.abhaengigVon.includes(t.id)).map(x => x.id);
    if (usedBy.length) body.append(h('p', {}, h('span', { class: 'label' }, 'Wird gebraucht in '), usedBy.map(topicChip)));
    body.append(h('details', { open: true }, h('summary', {}, 'Lernziele'), h('ul', {}, t.lernziele.map(l => h('li', {}, l)))));
    body.append(richHtml(t.erklaerung));
    body.append(h('div', { class: 'warn' }, h('b', {}, 'Typische Fehler'), h('ul', {}, t.typischeFehler.map(f => h('li', {}, f)))));
    body.append(h('details', {}, h('summary', {}, 'Profi-Level: Hintergründe und Prüfernachfragen'), richHtml(t.profLevel)));
    body.append(h('div', { class: 'row no-print' },
      h('button', { class: 'primary', onclick: () => go('quiz', { topic: t.id }) }, 'Quiz zu diesem Thema (' + t.fragen.length + ')'),
      h('button', { onclick: () => { state.taskFilter = t.id; persist(); go('aufgaben'); } }, 'Aufgaben (' + t.aufgaben.length + ')')));
    return body;
  }
  function renderTheory(view) {
    let query = '', all = false;
    const side = h('aside', { class: 'side' });
    const main = h('div', {});
    const search = h('input', { type: 'search', id: 'theory-search', placeholder: 'Suchen …', 'aria-label': 'Theorie durchsuchen', style: 'width:100%' });
    const allBtn = h('button', { 'aria-pressed': 'false', style: 'margin-top:8px;width:100%', onclick: () => { all = !all; allBtn.setAttribute('aria-pressed', String(all)); drawMain(); } }, 'Skript-Ansicht: alle Themen');
    function drawSide() {
      side.innerHTML = ''; side.append(search, allBtn);
      CHAPTERS.forEach(k => {
        const ts = TOPICS.filter(t => t.kapitel === k && topicMatches(t, query));
        if (!ts.length) return;
        side.append(h('h4', {}, k));
        ts.forEach(t => side.append(h('button', { class: 'topic', 'aria-current': String(!all && t.id === state.topic), onclick: () => { all = false; allBtn.setAttribute('aria-pressed', 'false'); state.topic = t.id; persist(); drawSide(); drawMain(); } }, t.titel)));
      });
    }
    function drawMain() {
      main.innerHTML = '';
      if (all) TOPICS.filter(t => topicMatches(t, query)).forEach(t => main.append(renderTopicBody(t), h('hr', {})));
      else main.append(renderTopicBody(TOPIC[state.topic] || TOPICS[0]));
    }
    search.addEventListener('input', () => { query = search.value.trim(); drawSide(); });
    view.append(h('div', { class: 'layout' }, side, main));
    drawSide(); drawMain();
  }

  /* ================= Quiz ================= */
  function renderQuestion(q, onDone) {
    const box = h('div', { class: 'panel' });
    box.append(h('div', { class: 'row' }, h('span', { class: 'label' }, TOPIC[q.topic] ? TOPIC[q.topic].titel : ''), h('span', { class: 'badge' }, q.niveau)));
    box.append(h('p', { class: 'qtext' }, q.frage));
    const fb = h('div', {});
    const finish = (ok, extra) => {
      fb.className = 'fb ' + (ok ? 'ok' : 'bad');
      fb.innerHTML = '';
      fb.append(h('b', { class: 'v' }, ok ? 'Richtig.' : 'Nicht ganz.'), ' ', extra || '', h('div', {}, q.erklaerung || ''));
      onDone(ok);
    };
    if (q.typ === 'mc' || q.typ === 'wahrfalsch') {
      const order = q.typ === 'mc' ? shuffle(q.optionen.map((_, i) => i)) : [0, 1];
      const btns = order.map(i => h('button', { class: 'opt', onclick: () => {
        btns.forEach(b => b.disabled = true);
        const ok = i === q.richtig;
        btns.forEach((b, k) => { if (order[k] === q.richtig) b.classList.add('ok'); else if (order[k] === i) b.classList.add('bad'); });
        finish(ok, ok ? '' : 'Richtig ist: ' + q.optionen[q.richtig] + '.');
      } }, q.optionen[i]));
      box.append(...btns);
    } else if (q.typ === 'eingabe') {
      const inp = h('input', { type: 'text', id: 'in-' + q.id, 'aria-label': 'Antwort', autocomplete: 'off', style: 'min-width:220px' });
      const btn = h('button', { class: 'primary', onclick: check }, 'Prüfen');
      function check() {
        if (!inp.value.trim()) return;
        inp.disabled = btn.disabled = true;
        const ok = q.akzeptiert.map(normalize).includes(normalize(inp.value));
        finish(ok, ok ? '' : 'Musterantwort: ' + q.antwort + '.');
      }
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
      box.append(h('div', { class: 'row' }, inp, btn));
    } else {
      const reveal = h('button', { class: 'primary', onclick: () => {
        reveal.remove();
        box.append(h('div', { class: 'fb' }, h('b', {}, 'Musterantwort: '), q.antwort),
          h('div', { class: 'row', style: 'margin-top:8px' }, 'Wusstest du es?',
            h('button', { onclick: e => { onDone(true); e.target.parentNode.remove(); } }, 'Ja'),
            h('button', { onclick: e => { onDone(false); e.target.parentNode.remove(); } }, 'Nein')));
      } }, 'Antwort zeigen');
      box.append(reveal);
    }
    box.append(fb);
    return box;
  }
  function renderQuiz(view, opts) {
    let fTopic = opts.topic || 'alle', fNiv = 'alle', queue = [], idx = 0, right = 0, done = 0;
    const tSel = h('select', { id: 'quiz-topic', 'aria-label': 'Thema' }, h('option', { value: 'alle' }, 'Alle Themen'), h('option', { value: 'schwach' }, 'Nur Schwachstellen / falsch beantwortete'),
      CHAPTERS.map(k => h('optgroup', { label: k }, TOPICS.filter(t => t.kapitel === k).map(t => h('option', { value: t.id }, t.titel)))));
    const nSel = h('select', { id: 'quiz-niveau', 'aria-label': 'Niveau' }, h('option', { value: 'alle' }, 'Alle Niveaus'), NIVEAUS.map(n => h('option', { value: n }, n)));
    tSel.value = fTopic;
    const stage = h('div', {});
    const status = h('p', { class: 'sub' });
    function pool() {
      return ALL_Q.filter(q => {
        if (fNiv !== 'alle' && q.niveau !== fNiv) return false;
        if (fTopic === 'schwach') { const s = state.quiz[q.id]; return s && s.last === 0; }
        return fTopic === 'alle' || q.topic === fTopic;
      });
    }
    function start() { queue = shuffle(pool()); idx = 0; right = 0; done = 0; next(); }
    function next() {
      stage.innerHTML = '';
      if (idx >= queue.length) {
        status.textContent = '';
        stage.append(h('div', { class: 'panel' }, queue.length ? h('h3', {}, 'Runde fertig: ' + right + ' von ' + done + ' richtig') : h('p', { class: 'empty' }, 'Für diese Auswahl gibt es keine Fragen. Bei „Schwachstellen“ landen nur Fragen, die du zuletzt falsch hattest.'),
          h('button', { class: 'primary', onclick: start }, 'Neue Runde')));
        return;
      }
      const q = queue[idx];
      status.textContent = 'Frage ' + (idx + 1) + ' von ' + queue.length + ' · ' + right + ' richtig';
      let answered = false;
      const nextBtn = h('button', { class: 'primary', disabled: true, onclick: () => { idx++; next(); } }, 'Weiter');
      stage.append(renderQuestion(q, ok => {
        if (answered) return; answered = true;
        done++; if (ok) right++;
        recordAnswer(q.id, ok);
        if (!ok) { const pos = Math.min(queue.length, idx + 4); queue.splice(pos, 0, q); }
        status.textContent = 'Frage ' + (idx + 1) + ' von ' + queue.length + ' · ' + right + ' richtig' + (ok ? '' : ' · diese Frage kommt gleich nochmal');
        nextBtn.disabled = false; nextBtn.focus();
      }), h('div', { class: 'row' }, nextBtn));
    }
    tSel.addEventListener('change', () => { fTopic = tSel.value; start(); });
    nSel.addEventListener('change', () => { fNiv = nSel.value; start(); });
    view.append(h('h2', {}, 'Quiz'), h('p', { class: 'sub' }, 'Wie im Moodle-Test: Multiple Choice, Wahr/Falsch und Eingabefragen (Zahl oder Bitmuster eintippen, Leerzeichen egal). Falsche Fragen kommen ein paar Fragen später wieder.'),
      h('div', { class: 'row' }, tSel, nSel), status, stage);
    start();
  }

  /* ================= Aufgaben ================= */
  function renderTask(t, tk) {
    const box = h('section', { class: 'task' });
    box.append(h('header', {}, h('b', {}, tk.id.toUpperCase()), h('span', { class: 'badge' }, SCHW[tk.schwierigkeit]), tk.fix ? h('span', { class: 'badge fix' }, 'kommt fix') : null,
      h('span', { class: 'sub' }, t.titel)));
    box.append(h('p', { class: 'qtext' }, tk.angabe));
    const hintBox = h('div', {});
    const shown = state.hints[tk.id] || 0;
    const hintBtn = h('button', { onclick: () => { const n = (state.hints[tk.id] || 0) + 1; state.hints[tk.id] = n; persist(); drawHints(n); } });
    function drawHints(n) {
      hintBox.innerHTML = '';
      tk.hinweise.slice(0, n).forEach((x, i) => hintBox.append(h('div', { class: 'hint' }, h('b', {}, 'Hinweis ' + (i + 1) + ': '), x)));
      hintBtn.textContent = n >= tk.hinweise.length ? 'Alle Hinweise offen' : 'Hinweis ' + (n + 1) + ' zeigen';
      hintBtn.disabled = n >= tk.hinweise.length;
    }
    drawHints(shown);
    const solBox = h('div', {});
    const solBtn = h('button', { class: 'primary', onclick: () => {
      solBtn.remove();
      solBox.append(h('div', { class: 'sol' }, h('h4', {}, 'Musterlösung'), richHtml(tk.loesung),
        tk.fehler.length ? h('div', { class: 'warn' }, h('b', {}, 'Häufige Fehler'), h('ul', {}, tk.fehler.map(f => h('li', {}, f)))) : null));
      solBox.append(assess());
    } }, 'Lösung zeigen');
    function assess() {
      const wrap = h('div', { class: 'row', style: 'margin-top:8px' }, h('span', {}, 'Wie lief es?'));
      [['geloest', 'gelöst'], ['hinweis', 'mit Hinweis'], ['nicht', 'nicht gelöst']].forEach(([k, l]) =>
        wrap.append(h('button', { 'aria-pressed': String(state.tasks[tk.id] === k), onclick: e => { state.tasks[tk.id] = k; persist(); $$('button', wrap).forEach(b => b.setAttribute('aria-pressed', String(b === e.target))); } }, l)));
      return wrap;
    }
    box.append(hintBox, h('div', { class: 'row' }, hintBtn, solBtn), solBox);
    const st = state.tasks[tk.id];
    if (st) box.querySelector('header').append(h('span', { class: 'badge ' + (st === 'geloest' ? 'c-g' : st === 'hinweis' ? 'c-o' : 'c-r') }, { geloest: 'gelöst', hinweis: 'mit Hinweis', nicht: 'nicht gelöst' }[st]));
    return box;
  }
  function renderTasks(view) {
    const sel = h('select', { id: 'task-filter', 'aria-label': 'Aufgaben filtern' }, h('option', { value: 'fix' }, 'Kommt fix (Blatt 2 + Ü4)'), h('option', { value: 'offen' }, 'Noch nicht gelöst'),
      CHAPTERS.map(k => h('optgroup', { label: k }, TOPICS.filter(t => t.kapitel === k).map(t => h('option', { value: t.id }, t.titel + ' (' + t.aufgaben.length + ')')))));
    sel.value = state.taskFilter || 'fix';
    const list = h('div', {});
    function draw() {
      list.innerHTML = '';
      const f = sel.value;
      const items = TOPICS.flatMap(t => t.aufgaben.map(a => [t, a])).filter(([t, a]) => f === 'fix' ? a.fix : f === 'offen' ? state.tasks[a.id] !== 'geloest' : t.id === f);
      if (!items.length) list.append(h('p', { class: 'empty' }, 'Keine Aufgaben in dieser Auswahl.'));
      items.forEach(([t, a]) => list.append(renderTask(t, a)));
    }
    sel.addEventListener('change', () => { state.taskFilter = sel.value; persist(); draw(); });
    const solved = Object.values(state.tasks).filter(v => v === 'geloest').length;
    const total = TOPICS.reduce((s, t) => s + t.aufgaben.length, 0);
    view.append(h('h2', {}, 'Aufgaben'), h('p', { class: 'sub' }, solved + ' von ' + total + ' gelöst. Erst selbst rechnen, dann Hinweise einzeln aufdecken, zuletzt die Lösung.'), h('div', { class: 'row' }, sel), list);
    draw();
  }

  /* ================= Probeklausur ================= */
  let examTimer = null;
  function renderExam(view) {
    const pk = COURSE.probeklausur;
    const max = pk.fragen.length * pk.punkteProFrage;
    view.append(h('h2', {}, 'Probeklausur'));
    const intro = h('div', { class: 'panel' },
      h('p', {}, pk.fragen.length + ' Fragen · ' + pk.dauerMin + ' Minuten · ' + max + ' Punkte. Fragen sind neu (nicht aus dem Quiz). Wie bei Moodle: alles auf einer Seite, am Ende abgeben. Läuft die Zeit ab, wird automatisch abgegeben.'),
      h('button', { class: 'primary', onclick: startExam }, 'Klausur starten'));
    view.append(intro);
    if (state.exams.length) view.append(h('div', { class: 'panel' }, h('h3', {}, 'Bisherige Versuche'),
      h('ul', {}, state.exams.slice(-5).reverse().map(e => h('li', {}, e.datum + ': ' + e.punkte + ' / ' + e.max + ' Punkte (' + Math.round(e.punkte / e.max * 100) + ' %)')))));

    function startExam() {
      intro.remove();
      const answers = {};
      const end = Date.now() + pk.dauerMin * 60000;
      const timer = h('span', { class: 'timer', role: 'timer', 'aria-live': 'off' });
      const bar = h('div', { class: 'panel row', style: 'position:sticky;top:calc(env(safe-area-inset-top,0px) + 50px);z-index:4;justify-content:space-between' }, h('span', {}, 'Restzeit ', timer), h('button', { class: 'primary', onclick: () => submit() }, 'Abgeben'));
      const list = h('div', { class: 'panel' });
      pk.fragen.forEach((q, n) => {
        const box = h('div', { class: 'examq', id: 'eq-' + q.id }, h('p', {}, h('b', {}, (n + 1) + '. '), q.frage, h('span', { class: 'sub' }, ' (' + pk.punkteProFrage + ' P.)')));
        if (q.typ === 'eingabe') box.append(h('input', { type: 'text', 'aria-label': 'Antwort Frage ' + (n + 1), oninput: e => { answers[q.id] = e.target.value; } }));
        else shuffle(q.optionen.map((_, i) => i)).forEach(i => box.append(h('label', {}, h('input', { type: 'radio', name: 'r-' + q.id, onchange: () => { answers[q.id] = i; } }), ' ', q.optionen[i])));
        list.append(box);
      });
      view.append(bar, list);
      const tick = () => {
        const ms = end - Date.now();
        if (ms <= 0) { submit(); return; }
        const m = Math.floor(ms / 60000), s = Math.floor(ms / 1000) % 60;
        timer.textContent = m + ':' + String(s).padStart(2, '0');
        timer.classList.toggle('low', ms < 5 * 60000);
      };
      tick(); examTimer = setInterval(tick, 1000);
      function submit() {
        clearInterval(examTimer); examTimer = null;
        let pts = 0;
        list.innerHTML = '';
        pk.fragen.forEach((q, n) => {
          const a = answers[q.id];
          const ok = q.typ === 'eingabe' ? a != null && q.akzeptiert.map(normalize).includes(normalize(a)) : a === q.richtig;
          if (ok) pts += pk.punkteProFrage;
          const given = a == null || a === '' ? '— keine Antwort —' : q.typ === 'eingabe' ? a : q.optionen[a];
          const correct = q.typ === 'eingabe' ? q.antwort : q.optionen[q.richtig];
          list.append(h('div', { class: 'examq' }, h('p', {}, h('b', {}, (n + 1) + '. '), q.frage),
            h('div', { class: 'fb ' + (ok ? 'ok' : 'bad') }, h('b', { class: 'v' }, ok ? 'Richtig.' : 'Falsch.'), ' Deine Antwort: ', given, ok ? '' : ' · Richtig: ' + correct, h('div', {}, q.erklaerung))));
        });
        state.exams.push({ datum: todayIso(), punkte: pts, max }); persist();
        bar.replaceWith(h('div', { class: 'panel' }, h('div', { class: 'label' }, 'Ergebnis'), h('div', { class: 'big' }, pts + ' / ' + max),
          h('p', {}, pts / max >= 0.875 ? 'Sehr gut – das sitzt.' : pts / max >= 0.5 ? 'Bestanden-Niveau. Schau dir die falschen Fragen unten an und wiederhole die Themen dazu.' : 'Noch nicht sicher. Arbeite die Themen der falschen Fragen im Reiter Theorie und Quiz durch.'),
          h('button', { onclick: () => go('klausur') }, 'Nochmal')));
        window.scrollTo(0, 0);
      }
    }
  }

  /* ================= Karteikarten ================= */
  function cardDeck(filter) {
    return ALL_Q.filter(q => filter === 'alle' || q.topic === filter).filter(q => q.typ === 'offen' || q.typ === 'eingabe' || ((q.typ === 'mc' || q.typ === 'wahrfalsch') && (q.niveau === 'erinnern' || q.niveau === 'verstehen')))
      .map(q => ({ id: q.id, topic: q.topic, front: q.frage, back: q.typ === 'offen' ? q.antwort : q.typ === 'eingabe' ? q.antwort + ' — ' + q.erklaerung : q.optionen[q.richtig] + ' — ' + q.erklaerung }));
  }
  function renderCards(view) {
    let filter = 'alle', deck = [], i = 0, flipped = false;
    const sel = h('select', { id: 'card-topic', 'aria-label': 'Thema' }, h('option', { value: 'alle' }, 'Alle Themen'), TOPICS.map(t => h('option', { value: t.id }, t.titel)));
    const card = h('div', { class: 'card-flip', tabindex: '0', role: 'button', 'aria-label': 'Karte umdrehen' });
    const pos = h('span', { class: 'sub' });
    function draw() {
      if (!deck.length) { card.innerHTML = '<p class="empty">Keine Karten.</p>'; pos.textContent = ''; return; }
      const c = deck[i];
      card.innerHTML = '';
      card.append(h('div', { class: 'side-l' }, (flipped ? 'Antwort' : 'Frage') + ' · ' + TOPIC[c.topic].titel), h('div', { class: 'face' }, flipped ? c.back : c.front));
      pos.textContent = 'Karte ' + (i + 1) + ' von ' + deck.length + ' · Klick oder Leertaste zum Umdrehen';
    }
    const flip = () => { flipped = !flipped; draw(); };
    card.addEventListener('click', flip);
    card.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); } if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); });
    const step = d => { if (!deck.length) return; i = (i + d + deck.length) % deck.length; flipped = false; draw(); };
    const load = () => { deck = shuffle(cardDeck(filter)); i = 0; flipped = false; draw(); };
    sel.addEventListener('change', () => { filter = sel.value; load(); });
    view.append(h('h2', {}, 'Karteikarten'), h('div', { class: 'row' }, sel, h('button', { onclick: load }, 'Mischen')), card,
      h('div', { class: 'row', style: 'margin-top:10px' }, h('button', { onclick: () => step(-1) }, '← Zurück'), h('button', { onclick: () => step(1) }, 'Weiter →'), pos));
    load();
  }

  /* ================= Umrechner ================= */
  function renderConverter(view) {
    let n = 8, pat = 0n, mode = 'dez';
    const mask = () => (1n << BigInt(n)) - 1n;
    const signed = p => (p >> BigInt(n - 1)) & 1n ? p - (1n << BigInt(n)) : p;
    const group = (s, k) => s.replace(new RegExp('(.{' + k + '})(?=.)', 'g'), '$1 ');
    const bin = p => group(p.toString(2).padStart(n, '0'), 4);
    const hex = p => p.toString(16).toUpperCase().padStart(Math.ceil(n / 4), '0');
    const widthSel = h('select', { id: 'conv-width', 'aria-label': 'Bitbreite' }, [4, 8, 16, 32].map(b => h('option', { value: b }, b + ' Bit')));
    widthSel.value = String(n);
    const modeSel = h('select', { id: 'conv-mode', 'aria-label': 'Eingabe als' }, [['dez', 'Dezimal'], ['bin', 'Binär'], ['hex', 'Hexadezimal']].map(([v, l]) => h('option', { value: v }, l)));
    const input = h('input', { type: 'text', id: 'conv-in', autocomplete: 'off', 'aria-label': 'Zahl eingeben', value: '0', style: 'min-width:220px' });
    const msg = h('p', { class: 'sub', id: 'conv-msg' });
    const out = h('div', { class: 'panel' });
    const bitsBox = h('div', { class: 'panel' });

    function parse(raw) {
      const s = raw.replace(/[\s_]/g, '').replace(/−/g, '-');
      if (!s) return { err: 'Gib eine Zahl ein.' };
      let v;
      if (mode === 'dez') {
        if (!/^-?\d+$/.test(s)) return { err: 'Dezimal: nur Ziffern, vorne optional ein Minus.' };
        v = BigInt(s);
        const min = -(1n << BigInt(n - 1)), max = mask();
        if (v < min || v > max) return { err: v + ' passt nicht in ' + n + ' Bit. Zweierkomplement: ' + min + ' bis ' + ((1n << BigInt(n - 1)) - 1n) + ', vorzeichenlos: 0 bis ' + max + '.' };
        return { pat: v & mask() };
      }
      if (mode === 'bin') {
        if (!/^[01]+$/.test(s)) return { err: 'Binär: nur 0 und 1.' };
        v = BigInt('0b' + s);
      } else {
        const t = s.replace(/^0x/i, '').replace(/h$/i, '');
        if (!/^[0-9a-f]+$/i.test(t)) return { err: 'Hex: Ziffern 0–9 und A–F.' };
        v = BigInt('0x' + t);
      }
      if (v > mask()) return { err: 'Das sind mehr als ' + n + ' Bit.' };
      return { pat: v };
    }
    function sumText() {
      const parts = [];
      for (let i = n - 1; i >= 0; i--) if ((pat >> BigInt(i)) & 1n) parts.push(i === n - 1 ? '−' + (1n << BigInt(i)) : String(1n << BigInt(i)));
      if (!parts.length) return '0';
      const unsignedParts = parts.map((p, k) => k === 0 && p.startsWith('−') ? p.slice(1) : p);
      return { twos: parts.join(' + ').replace(/\+ −/g, '− '), uns: unsignedParts.join(' + ') };
    }
    function draw() {
      out.innerHTML = '';
      const sv = signed(pat), msb = (pat >> BigInt(n - 1)) & 1n;
      const rows = [['Binär', bin(pat), true], ['Hex', hex(pat) + 'h', true], ['Vorzeichenlos', String(pat)], ['Zweierkomplement', String(sv)]];
      const t = h('table', { class: 't' });
      rows.forEach(([k, v, mono]) => t.append(h('tr', {}, h('th', { class: 'l' }, k), h('td', { class: 'l' + (mono ? ' mono' : '') }, v))));
      out.append(h('div', { class: 'scroll' }, t));
      const s = sumText();
      if (typeof s !== 'string') out.append(h('p', { class: 'sub' }, 'Vorzeichenlos: ' + s.uns + ' = ' + pat), h('p', { class: 'sub' }, 'Zweierkomplement: ' + s.twos + ' = ' + sv + (msb ? ' (MSB = 1, daher negativ)' : '')));
      else out.append(h('p', { class: 'sub' }, 'Alle Bits sind 0.'));

      bitsBox.innerHTML = '';
      bitsBox.append(h('div', { class: 'row' }, h('b', {}, 'Bits (anklicken zum Umschalten)')));
      const grid = h('div', { class: 'bitgrid' });
      for (let g = n - 1; g >= 0; g -= 4) {
        const grp = h('div', { class: 'bitgroup' });
        for (let i = g; i > g - 4 && i >= 0; i--) {
          const on = ((pat >> BigInt(i)) & 1n) === 1n;
          const w = i === n - 1 ? '−2' + sup(i) : '2' + sup(i);
          grp.append(h('button', { class: 'bitcell', 'aria-pressed': String(on), 'aria-label': 'Bit ' + i + ' = ' + (on ? 1 : 0), onclick: () => { pat ^= 1n << BigInt(i); syncInput(); draw(); } },
            h('span', { class: 'bw' }, w), h('span', { class: 'bv' }, on ? '1' : '0'), h('span', { class: 'bn' }, i === n - 1 ? 'MSB' : i === 0 ? 'LSB' : ' ')));
        }
        grid.append(grp);
      }
      bitsBox.append(grid, h('div', { class: 'row', style: 'margin-top:12px' },
        h('button', { onclick: () => { pat = ~pat & mask(); syncInput(); draw(); } }, 'Alle Bits invertieren'),
        h('button', { onclick: () => { pat = (pat + 1n) & mask(); syncInput(); draw(); } }, '+ 1'),
        h('button', { onclick: () => { pat = (~pat + 1n) & mask(); syncInput(); draw(); } }, 'Zweierkomplement bilden (invertieren + 1)'),
        h('button', { onclick: () => { pat = 0n; syncInput(); draw(); } }, 'Alles 0')));
    }
    function sup(i) { return String(i).split('').map(c => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).join(''); }
    function syncInput() {
      input.value = mode === 'dez' ? String(pat) : mode === 'bin' ? bin(pat) : hex(pat);
      msg.textContent = '';
    }
    input.addEventListener('input', () => {
      const r = parse(input.value);
      if (r.err) { msg.textContent = r.err; msg.className = 'sub c-r'; return; }
      msg.textContent = ''; msg.className = 'sub'; pat = r.pat; draw();
    });
    modeSel.addEventListener('change', () => { mode = modeSel.value; syncInput(); });
    widthSel.addEventListener('change', () => { n = Number(widthSel.value); pat &= mask(); syncInput(); draw(); });
    view.append(h('h2', {}, 'Umrechner'),
      h('p', { class: 'sub' }, 'Gib eine Zahl ein oder klicke Bits an. Negative Dezimalzahlen werden im Zweierkomplement dargestellt. Zum Üben: erst von Hand rechnen, dann hier kontrollieren.'),
      h('div', { class: 'row' }, h('label', { for: 'conv-mode' }, 'Eingabe '), modeSel, input, h('label', { for: 'conv-width' }, 'Breite '), widthSel), msg, out, bitsBox);
    draw();
  }

  /* ================= Quellen ================= */
  function renderSources(view) {
    view.append(h('h2', {}, 'Quellen'), h('p', { class: 'sub' }, 'Für die Prüfung gilt das Skript. Webquellen ergänzen nur (z. B. Mealy/Moore, Statusregister, Binärpräfixe).'));
    view.append(h('div', { class: 'panel' }, h('ul', {}, COURSE.meta.quellen.map(q => h('li', {}, q.url ? h('a', { href: q.url, target: '_blank', rel: 'noopener' }, q.titel) : q.titel)))));
    const n = ALL_Q.length, a = TOPICS.reduce((s, t) => s + t.aufgaben.length, 0);
    view.append(h('p', { class: 'sub' }, TOPICS.length + ' Themen · ' + n + ' Quizfragen · ' + a + ' Aufgaben · ' + COURSE.probeklausur.fragen.length + ' Probeklausur-Fragen'));
  }

  /* ================= Start ================= */
  function init() {
    $('#hdr-sub').textContent = COURSE.meta.fach;
    const fromHash = (location.hash || '').slice(1);
    go(VIEWS.some(v => v[0] === fromHash) ? fromHash : 'dashboard');
  }
  init();
})();
