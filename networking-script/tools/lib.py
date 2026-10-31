"""Hilfsfunktionen + CSS für das Networking-Skript."""

CSS = """
@font-face{font-family:'Patrick Hand';src:url('fonts/patrick-hand.woff2') format('woff2');font-weight:400}
:root{
  --paper:#fbf8f1; --ink:#1f2b8f; --red:#c4262a; --green:#1f6b3a; --gold:#e8a317;
  --dark:#1b1b1b; --line:#d9d3c4; --blue:#2f6fd0;
}
@page{size:A4;margin:11mm 13mm 14mm 13mm}
*{box-sizing:border-box}
html{background:var(--paper)}
body{margin:0;font-family:'Inter','Liberation Sans',sans-serif;font-size:8.7pt;line-height:1.38;color:var(--ink);
     -webkit-print-color-adjust:exact;print-color-adjust:exact}
img{display:block;max-width:100%;height:auto}
b,strong{font-weight:600}
.r{color:var(--red);font-weight:600} .g{color:var(--green);font-weight:600} .k{color:var(--dark)}
code,.code{font-family:'JetBrains Mono',monospace;font-size:8.2pt}
code{background:#f1ece0;border-radius:3px;padding:0 3px;color:var(--red)}

/* ---------- Cover ---------- */
.cover{page-break-after:always;text-align:center;padding-top:10mm;height:262mm;position:relative}
.cover .handle{display:inline-block;background:#fff;border-radius:6px;padding:2px 16px;font:400 17pt 'Patrick Hand';color:var(--dark)}
.cover .rule{height:3px;background:var(--green);border-radius:3px;margin:8mm 14mm 0;position:relative}
.cover h1{font:400 66pt/1 'Patrick Hand';color:var(--gold);margin:8mm 0 2mm;letter-spacing:1px;
          -webkit-text-stroke:1.2px #cf8a0a}
.cover h2{font:400 40pt/1.05 'Patrick Hand';color:var(--dark);margin:0;
          border-bottom:4px solid var(--green);display:inline-block;padding:0 6mm 3mm;border-radius:0 0 50% 50%/0 0 14px 14px}
.cover .sub{font:400 19pt 'Patrick Hand';color:var(--green);margin:6mm 0 8mm}
.cover .netpic{width:165mm;margin:0 auto}
.cover .claim{display:inline-block;border:2.5px solid var(--gold);border-radius:10px;padding:2mm 12mm;margin-top:10mm;
              font:400 18pt 'Patrick Hand';color:var(--gold);letter-spacing:1px}
.cover .credit{position:absolute;bottom:0;left:0;right:0;font-size:8pt;color:#777}

/* ---------- TOC ---------- */
.toc{page-break-after:always}
.toc h1{font:400 34pt 'Patrick Hand';color:var(--dark);margin:0 0 6mm;border-bottom:4px double var(--red);display:inline-block;padding-right:10mm}
.toc ol{list-style:none;padding:0;margin:0;columns:2;column-gap:12mm}
.toc li{break-inside:avoid;margin:0 0 3.2mm;display:flex;align-items:center;gap:3mm;font:400 14pt 'Patrick Hand'}
.toc li a{color:var(--dark);text-decoration:none}
.toc .n{flex:0 0 8.5mm;height:8.5mm;border-radius:50%;border:2px solid var(--green);color:var(--green);
        display:flex;align-items:center;justify-content:center;font:400 12pt 'Patrick Hand'}
.toc p.note{margin-top:10mm;color:#555;font-size:8.5pt}

/* ---------- Kapitel ---------- */
.chapter{page-break-before:always}
.chapter:first-of-type{page-break-before:avoid}
.ch-head{text-align:center;margin-bottom:3.5mm;position:relative}
.ch-head .no{font:400 11pt 'Patrick Hand';color:var(--green);letter-spacing:2px;text-transform:uppercase}
.ch-head h1{font:400 29pt/1.1 'Patrick Hand';color:var(--dark);margin:0;display:inline-block;padding:0 6mm 1.5mm;
            border-bottom:3px solid var(--red);box-shadow:0 5px 0 -2px var(--paper),0 6.5px 0 -2px var(--red)}
.lead{text-align:center;color:var(--ink);margin:2mm 8mm 3.5mm;font-size:9.2pt}

.grid{display:grid;gap:3.5mm 6.5mm;align-items:start;margin-bottom:3mm}
.g2{grid-template-columns:1fr 1fr} .g3{grid-template-columns:1fr 1fr 1fr}
.g21{grid-template-columns:1.25fr 1fr} .g12{grid-template-columns:1fr 1.25fr}
.col{display:flex;flex-direction:column;gap:4mm}
.sec{break-inside:avoid;margin:0 0 3.2mm}
.sec>h2{font:400 14.5pt/1.15 'Patrick Hand';color:var(--dark);margin:0 0 2mm;display:flex;align-items:center;gap:2.5mm}
.sec>h2 .n{flex:0 0 7mm;height:7mm;border:2px solid var(--green);color:var(--green);border-radius:50%;
           display:flex;align-items:center;justify-content:center;font:400 12pt 'Patrick Hand'}
.sec>h2 small{font:400 11pt 'Patrick Hand';color:#555}
.sec.wide{grid-column:1/-1}
.sec h3{font:400 12.5pt 'Patrick Hand';color:var(--red);margin:2mm 0 1mm}
.sec h3.gr{color:var(--green)}
.row{display:flex;gap:3.5mm;align-items:flex-start}
.row>.ic{flex:0 0 22mm}
.row>.ic.w16{flex-basis:16mm} .row>.ic.w28{flex-basis:28mm} .row>.ic.w34{flex-basis:34mm}
.row>.tx{flex:1}
p{margin:0 0 2mm}
ul{margin:0 0 2mm;padding-left:4.3mm} li{margin:0 0 1mm}
ul.ck{list-style:none;padding-left:0} ul.ck li{padding-left:5.5mm;position:relative}
ul.ck li::before{content:'✓';position:absolute;left:0;color:var(--green);font-weight:700}
ul.nm{list-style:none;padding:0;counter-reset:n} ul.nm li{counter-increment:n;padding-left:6mm;position:relative}
ul.nm li::before{content:counter(n)'.';position:absolute;left:0;color:var(--red);font-weight:600}
ul.dot li::marker{color:var(--ink)}
.fig{margin:1mm auto 2mm}
.fig img{margin:0 auto}
.fig figcaption{text-align:center;font-size:8.2pt;color:var(--green);margin-top:1mm}
.fig.frame img{border-radius:6px}

/* Boxen */
.box{border:1.6px dashed var(--green);border-radius:9px;padding:2mm 3mm;break-inside:avoid;margin:0 0 3mm;position:relative;background:rgba(255,255,255,.35)}
.box .t{font:400 12.5pt 'Patrick Hand';color:var(--dark);display:flex;gap:2mm;align-items:center;margin-bottom:1mm}
.box .t u{text-decoration:underline;text-decoration-color:var(--dark)}
.box.tip{border-color:var(--gold)} .box.tip .t u{text-decoration-color:var(--gold)}
.box.rem{border-color:var(--green)}
.box.cmd{border-color:var(--red)}
.box.note{border-color:#6a8f6a}
.box p:last-child,.box ul:last-child{margin-bottom:0}
.box .code,.box pre{margin:0}
.boxes{display:grid;gap:4mm;margin-top:3mm}

/* Tabellen */
table{border-collapse:collapse;width:100%;font-size:8.1pt;margin:0 0 2mm;background:rgba(255,255,255,.35);break-inside:avoid}
th,td{border:1.2px solid #2b2b2b;padding:1.3mm 1.8mm;vertical-align:middle;text-align:center}
th{font:400 11pt 'Patrick Hand';color:var(--green);background:rgba(31,107,58,.06)}
th.r{color:var(--red)} td.l,th.l{text-align:left}
td.name{color:var(--red);font:400 11pt 'Patrick Hand'}
table.soft th,table.soft td{border-color:#8d8a80}
table.ics td img{margin:0 auto}
.ok{color:var(--green);font-weight:700} .no{color:var(--red);font-weight:700}
pre{font-family:'JetBrains Mono',monospace;font-size:7.4pt;line-height:1.5;background:#f3eee2;border-radius:6px;padding:2mm 3mm;color:var(--red);white-space:pre-wrap}
pre .c{color:#6b7280}
.chip{display:inline-flex;align-items:center;justify-content:center;width:7mm;height:7mm;border-radius:6px;color:#fff;font:400 12pt 'Patrick Hand'}
.pill{display:inline-block;border:1.4px solid var(--gold);border-radius:8px;padding:0 3mm;color:var(--gold);font:400 12pt 'Patrick Hand'}
.mn{columns:2;column-gap:6mm}
.mn div{break-inside:avoid}
.src{margin-top:8mm;font-size:7.5pt;color:#8a8577;text-align:center}
"""

def esc(s):
    return s

def fig(name, w='100%', cap=None, cls=''):
    c = f'<figcaption>{cap}</figcaption>' if cap else ''
    return f'<figure class="fig {cls}" style="width:{w};margin-left:auto;margin-right:auto"><img src="img/{name}.jpg" alt="{name}">{c}</figure>'

def icon(name, w='100%'):
    return f'<img src="img/{name}.jpg" style="width:{w}" alt="{name}">'

def sec(n, title, body, cls=''):
    num = f'<span class="n">{n}</span>' if n else ''
    return f'<section class="sec {cls}"><h2>{num}<span>{title}</span></h2>{body}</section>'

def ul(items, kind=''):
    cls = f' class="{kind}"' if kind else ''
    return f'<ul{cls}>' + ''.join(f'<li>{i}</li>' for i in items) + '</ul>'

def box(kind, title, body, ico=''):
    head = f'<div class="t">{ico.strip()}<u>{title}</u></div>' if title.strip() else ''
    return f'<div class="box {kind}">{head}{body}</div>'

def tip(body, title='Interview Tip'):
    return box('tip', title, body if body.startswith('<') else f'<p>{body}</p>', '⭐')

def rem(body, title='Remember'):
    return box('rem', title, body if body.startswith('<') else f'<p>{body}</p>', '💡')

def keyp(body, title='Key Point'):
    return box('rem', title, body if body.startswith('<') else f'<p>{body}</p>', '💡')

def cmds(lines, title='Common Commands'):
    return box('cmd', title, '<pre>' + '\n'.join(lines) + '</pre>', '🔧')

def table(head, rows, cls='', first_name=True, align=None):
    h = '<tr>' + ''.join(f'<th>{c}</th>' for c in head) + '</tr>'
    out = []
    for r in rows:
        cells = []
        for i, c in enumerate(r):
            k = ' class="name"' if (i == 0 and first_name) else ''
            cells.append(f'<td{k}>{c}</td>')
        out.append('<tr>' + ''.join(cells) + '</tr>')
    return f'<table class="{cls}">{h}{"".join(out)}</table>'

def chapter(no, title, body, lead=None, anchor=None):
    l = f'<p class="lead">{lead}</p>' if lead else ''
    return (f'<article class="chapter" id="{anchor or "c%d" % no}">'
            f'<header class="ch-head"><div class="no">Chapter {no:02d}</div><h1>{title}</h1></header>{l}{body}</article>')

def grid(cols, *items):
    return f'<div class="grid {cols}">' + ''.join(items) + '</div>'

def col(*items):
    return '<div class="col">' + ''.join(items) + '</div>'

OK = '<span class="ok">✓</span>'
NO = '<span class="no">✗</span>'
