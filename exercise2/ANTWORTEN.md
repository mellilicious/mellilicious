# Exercise 2 – Notizen & Antworten

## Befehle (SERVER)

```bash
mkdir -p ~/exercise2 && cd ~/exercise2
python3.13t -VV
env PYTHON_GIL=0 python3.13t -c "import sys; print(sys._is_gil_enabled())"   # muss False ausgeben
time env PYTHON_GIL=1 python3.13t prime_count.py
time env PYTHON_GIL=1 python3.13t prime_count_threads.py
time env PYTHON_GIL=0 python3.13t prime_count.py
time env PYTHON_GIL=0 python3.13t prime_count_threads.py
./run_benchmarks.sh        # alles 3x, Ausgabe in results.txt
```

Zweite SSH-Sitzung währenddessen: `top`, dann `H` drücken (Threads anzeigen).
Mit GIL: Python-Prozess ~100 % CPU (nur ein Kern). Ohne GIL, 2 Threads: ~200 %.

## Messergebnisse (selbst eintragen, Median aus 3 Läufen)

| Programm | GIL | Worker | Primzahlen | Zählzeit (Median) | `time` real | CPU in top |
|---|---|---|---|---|---|---|
| prime_count.py | 1 | 1 | 66468 | | | |
| prime_count_threads.py | 1 | 2 | 66468 | | | |
| prime_count_improved.py | 1 | n | 66468 | | | |
| prime_count.py | 0 | 1 | 66468 | | | |
| prime_count_threads.py | 0 | 2 | 66468 | | | |
| prime_count_improved.py | 0 | n | 66468 | | | |

(Seed 42 → 66468 Primzahlen, muss bei allen Versionen gleich sein.)

Erwartung: Mit GIL bringen Threads keinen Gewinn (nur ein Thread führt Bytecode aus,
evtl. sogar etwas langsamer durch Thread-Wechsel). Ohne GIL laufen die Threads
parallel auf mehreren Kernen → ca. halbe Zählzeit mit 2 Threads.

## Fragen

**1. Was ist ein Prozess?**
Ein Programm in Ausführung. Ein Prozess hat einen eigenen, geschützten Adressraum
(Code, Daten, Heap, Stack), eigene Ressourcen (offene Dateien, Sockets) und
mindestens einen Thread. Das Betriebssystem verwaltet ihn über einen
Process Control Block (PID, Zustand, Register, Speicherinfos).

**2. Was ist ein Thread?**
Ein Ausführungsstrang innerhalb eines Prozesses. Jeder Thread hat eigenen
Befehlszähler, Register und Stack, teilt aber Adressraum und Ressourcen mit den
anderen Threads desselben Prozesses. Er ist die Einheit, die der Scheduler auf
einen CPU-Kern legt.

**3. Was ist ein User-Level-Thread?**
Ein Thread, der vollständig von einer Bibliothek im Benutzermodus verwaltet wird.
Der Kernel kennt ihn nicht, er sieht nur den Prozess. Erzeugen und Umschalten sind
schnell (kein Systemaufruf), aber ein blockierender Systemaufruf blockiert alle
Threads des Prozesses, und sie können nicht parallel auf mehreren Kernen laufen.

**4. Was ist ein Kernel-Level-Thread?**
Ein Thread, den das Betriebssystem selbst kennt, verwaltet und einplant.
Der Kernel kann ihn auf beliebige Kerne verteilen; blockiert einer, laufen die
anderen weiter. Erzeugen und Umschalten sind teurer (Systemaufruf, Moduswechsel).
Python-`threading`-Threads unter Linux sind Kernel-Threads (pthreads).

**5. Unterschied Kernel-Level- vs. User-Level-Thread?**
- Verwaltung: Kernel vs. Bibliothek im User Space
- Sichtbarkeit: Kernel kennt KLTs, ULTs nicht
- Parallelität: KLTs echt parallel auf mehreren Kernen, ULTs nicht
- Blockieren: bei KLTs blockiert nur der eine Thread, bei ULTs der ganze Prozess
- Kosten: ULT-Wechsel billig, KLT-Wechsel teurer

**6. Unterschied Prozess vs. Thread?**
Prozesse haben getrennte Adressräume und sind voneinander isoliert (Absturz
betrifft nur den einen Prozess); Erzeugen und Wechseln ist teuer, Kommunikation
braucht IPC. Threads teilen sich den Speicher des Prozesses, sind leichtgewichtig
und können direkt über gemeinsame Daten kommunizieren, brauchen dafür aber
Synchronisation; ein Fehler in einem Thread kann den ganzen Prozess beenden.

**7. Wie kommunizieren Threads miteinander?**
Über gemeinsamen Speicher (globale Variablen, gemeinsame Objekte – in unserem
Programm die Liste `results`). Zur Koordination: Locks/Mutexe, Semaphoren,
Condition Variables, Events, Barrieren, thread-sichere Queues (`queue.Queue`).

**8. Wie kommunizieren Prozesse miteinander?**
Über Interprozesskommunikation (IPC): Pipes und Named Pipes (FIFOs),
Message Queues, Shared Memory (mit Semaphoren), Sockets, Signale, Dateien,
Memory-mapped Files. In Python z. B. `multiprocessing.Queue`, `Pipe`,
`shared_memory`.

**9. Wie kann man die Anwendung schneller machen?**
In `prime_count_improved.py`:
1. **Mehr Worker:** so viele Threads wie CPU-Kerne (`os.cpu_count()`). Bringt nur
   ohne GIL etwas – dann skaliert die Zählzeit ungefähr mit der Kernanzahl.
2. **Schnelleres `is_prime`:** Grenze `math.isqrt(n)` einmal berechnen statt
   `i * i` in jeder Schleifenrunde.
3. **Weniger Python-Bytecode:** `sum(map(is_prime, ...))` statt for-Schleife mit `count += 1`.
4. **Gerade Zahlen vorher aussortieren:** ~50 % der Werte erreichen `is_prime` gar nicht.

Die Primzahlanzahl bleibt gleich (66468). Lokal mit normalem Python (GIL an,
4 Kerne) gemessen: sequentiell 3,40 s, 2 Threads 3,20 s, verbessert 2,98 s –
mit GIL kommt der Gewinn nur von den Code-Optimierungen, nicht von den Threads.
→ Hier die eigenen Server-Messungen eintragen und vergleichen.

Weitere Möglichkeiten: `multiprocessing` (eigene Prozesse → kein gemeinsamer GIL,
funktioniert auch im normalen Python), Sieb des Eratosthenes bis 10.000.000
(dann ist jeder Test nur noch ein Nachschlagen), NumPy oder eine kompilierte
Sprache (C).
