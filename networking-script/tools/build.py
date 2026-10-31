"""Baut networking-script.html und rendert es mit Playwright (Chromium) als PDF.
Aufruf:  python3 tools/build.py   (aus dem Ordner networking-script)"""
import os, sys, subprocess
sys.path.insert(0, os.path.dirname(__file__))
from lib import CSS
import ch_a, ch_b

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
chapters = [(1, 'Introduction to Computer Networking', ch_a.ch1), (2, 'Network Devices', ch_a.ch2), (3, 'OSI Model (7 Layers)', ch_a.ch3),
            (4, 'TCP/IP Model (4 Layers)', ch_a.ch4), (5, 'IP Addressing', ch_a.ch5), (6, 'Subnetting &amp; CIDR', ch_a.ch6), (7, 'MAC Address &amp; ARP', ch_a.ch7),
            (8, 'TCP vs UDP', ch_a.ch8), (9, 'Ports &amp; Common Protocols', ch_a.ch9), (10, 'DNS (Domain Name System)', ch_b.ch10), (11, 'HTTP &amp; HTTPS', ch_b.ch11),
            (12, 'Routing, NAT &amp; Gateway', ch_b.ch12), (13, 'Firewalls &amp; Network Security', ch_b.ch13), (14, 'Load Balancer &amp; Proxy', ch_b.ch14),
            (15, 'Docker Networking', ch_b.ch15), (16, 'Kubernetes Networking', ch_b.ch16), (17, 'Cloud Networking (AWS VPC)', ch_b.ch17), (18, 'Networking Cheat Sheet', ch_b.ch18)]

cover = '''<section class="cover">
<div class="rule"></div>
<h1>NETWORKING</h1>
<h2>COMPLETE NOTES</h2>
<div class="sub">(Beginner to Advanced)</div>
<img class="netpic" src="img/cover_net.jpg" alt="Network overview">
<div class="claim">LEARN · UNDERSTAND · APPLY</div>
<div class="credit">Notes by @qa_insights · cover artwork by @codyboy_1122 — layout rebuilt as a study script</div>
</section>'''

toc = '<section class="toc"><h1>Contents</h1><ol>' + ''.join(
    f'<li><span class="n">{n}</span><a href="#c{n}">{t}</a></li>' for n, t, _ in chapters) + '</ol></section>'

zoom = {3: .9, 8: .9, 11: .9, 12: .8, 13: .86, 14: .86}
body = ''.join(f().replace('<article class="chapter" id="c%d"' % n, '<article class="chapter" style="zoom:%s" id="c%d"' % (zoom[n], n)) if n in zoom else f() for n, _, f in chapters)
html = f'<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Networking – Complete Notes</title><style>{CSS}</style></head><body>{cover}{toc}{body}</body></html>'
out = os.path.join(ROOT, 'networking-script.html')
open(out, 'w', encoding='utf-8').write(html)
print('HTML', len(html)//1024, 'KB')

render = r'''
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + process.argv[2], { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: process.argv[3], format: 'A4', printBackground: true, displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: '<div style="width:100%;font-family:Helvetica,Arial,sans-serif;font-size:7.5px;color:#8a8577;display:flex;justify-content:space-between;padding:0 13mm"><span>Networking – Complete Notes</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
    margin: { top: '11mm', bottom: '14mm', left: '13mm', right: '13mm' }, preferCSSPageSize: false });
  await b.close();
})();
'''
open('/tmp/render.js', 'w').write(render)
pdf = os.path.join(ROOT, 'Networking_Script.pdf')
subprocess.run(['node', '/tmp/render.js', out, pdf], check=True, env={**os.environ, 'NODE_PATH': subprocess.check_output(['npm', 'root', '-g']).decode().strip()})
print('PDF', os.path.getsize(pdf)//1024, 'KB')
