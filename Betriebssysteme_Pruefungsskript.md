# Betriebssysteme – Prüfungsskript (Gruppe A)

Dieses Skript beantwortet alle 11 Prüfungsfragen so, wie man es in einer Vorlesung erklären würde: erst die Idee, dann die Details, dann Beispiele. Am Ende jeder Frage steht eine **Merkbox** mit den Punkten, die du in der Prüfung unbedingt nennen solltest.

---

## Frage 1 – Unix-Systemarchitektur (4 P.)

### Die Idee: Schichtenmodell
Ein Betriebssystem ist eine Vermittlungsschicht zwischen **Hardware** und **Anwendungen**. Unix ist in Schichten aufgebaut:

```
+--------------------------------------------------+
|  Benutzerprogramme (Shell, Editor, Browser, ...) |  User Space
+--------------------------------------------------+
|  Bibliotheken (libc) – Systemaufruf-Wrapper      |
+==================== Systemaufrufe ===============+  <- Grenze User/Kernel
|  KERNEL                                          |  Kernel Space
|   Prozessverwaltung | Speicherverwaltung         |
|   Dateisystem (VFS) | Netzwerk | IPC             |
|   ---------------------------------------------- |
|   Gerätetreiber (Treiber)                        |
+==================================================+
|  HARDWARE: CPU, RAM, Platten, Netzwerkkarte, ... |
+--------------------------------------------------+
```

### Die drei Rollen

**Geräte (Devices)**
Die physische Hardware (Festplatte, Tastatur, Netzwerkkarte, Drucker). Jedes Gerät hat eigene Register, eigene Protokolle und eigene Eigenheiten. Unix macht Geräte als **Dateien in `/dev`** sichtbar („Everything is a file"), z. B. `/dev/sda` (Platte), `/dev/tty` (Terminal). Man unterscheidet:
- *Blockgeräte* (Platte, SSD: Zugriff in Blöcken, wahlfrei)
- *Zeichengeräte* (Tastatur, serielle Schnittstelle: Datenstrom)

**Treiber (Drivers)**
Kernel-Module, die genau ein Gerät (bzw. eine Geräteklasse) kennen. Sie übersetzen die **einheitlichen Kernel-Anfragen** (`read`, `write`, `open`, `ioctl`) in die **gerätespezifischen Befehle** (Register schreiben, Interrupts behandeln, DMA starten). Der Treiber verbirgt also die Hardware-Details vor dem Rest des Systems.

**Kernel**
Der privilegierte Kern des Systems. Er läuft im **Kernel-Modus** (voller Hardwarezugriff) und bietet:
- Prozess-Scheduling und -Verwaltung
- Speicherverwaltung (virtueller Speicher, Paging)
- Dateisysteme (virtuelles Dateisystem VFS)
- Gerätezugriff über Treiber
- Netzwerk, Interprozesskommunikation
- Schutz und Zugriffsrechte

### Zusammenspiel (Beispiel `read()`)
1. Ein Programm im User Space ruft `read(fd, buf, n)` auf.
2. Der **Systemaufruf** (Trap/Syscall) wechselt in den Kernel-Modus.
3. Der Kernel prüft Rechte und findet über das Dateisystem heraus, welches Gerät gemeint ist.
4. Er ruft die passende Funktion des **Treibers** auf.
5. Der Treiber programmiert die **Hardware** (z. B. Plattencontroller).
6. Das Gerät meldet die Fertigstellung per **Interrupt**; der Treiber/Kernel kopiert die Daten in den Puffer des Prozesses.
7. Rückkehr in den User Mode, `read` liefert das Ergebnis.

> **Merkbox:** Schichten (Hardware – Treiber – Kernel – Syscalls – User Space), Geräte als Dateien in `/dev`, Treiber = Übersetzer Hardware↔Kernel, Kernel = Verwalter/Schützer der Ressourcen, Kommunikation über Systemaufrufe und Interrupts.

---

## Frage 2 – Linux-Dateirechte (4 P.)

> **Hinweis:** Die Rechte-Tabelle zu `exam1.dir` und `exam2.txt` ist auf dem Foto nicht zu sehen. Unten steht deshalb die **Methode** mit einem Beispiel. Schick mir die Tabelle/Teilfragen, dann rechne ich sie konkret durch.

### Grundlagen
Ausgabe von `ls -l`:

```
drwxr-x---  2 alice bob   4096 ... exam1.dir
-rw-rw-r--  1 bob   bob    120 ... exam2.txt
```

Aufbau: `Typ | Besitzer(u) | Gruppe(g) | Andere(o)`

| Zeichen | Bedeutung |
|---|---|
| `-` / `d` / `l` | Datei / Verzeichnis (directory) / Symlink |
| `r` (4) | lesen |
| `w` (2) | schreiben |
| `x` (1) | ausführen |

**Bei Dateien:** `r` = Inhalt lesen, `w` = Inhalt ändern, `x` = als Programm ausführen.
**Bei Verzeichnissen:** `r` = Inhalt auflisten (`ls`), `w` = Einträge anlegen/löschen/umbenennen (braucht `x` dazu), `x` = hinein wechseln (`cd`) und auf Einträge zugreifen.

### Auswertungsreihenfolge (wichtig!)
Der Kernel prüft **in dieser Reihenfolge und nimmt den ersten Treffer**:
1. Ist der Benutzer der **Besitzer**? → Besitzer-Rechte gelten (auch wenn die Gruppenrechte großzügiger wären).
2. Sonst: ist er **Mitglied der Gruppe**? → Gruppen-Rechte.
3. Sonst: **Andere**-Rechte.
(`root` umgeht die Prüfung.)

### Beispiel-Vorgehen
Angenommen `exam2.txt` hat `-rw-r-----` mit Besitzer `alice`, Gruppe `bob`:
- **alice** (Besitzer): `rw-` → lesen und schreiben ✔
- **bob** (Gruppenmitglied): `r--` → nur lesen ✔, schreiben ✘
- Ein Dritter: `---` → nichts.

Typische Zusatzfragen und Antworten:
- *Zahlen-Schreibweise:* `rw-r-----` = 640. `chmod 640 exam2.txt`.
- *Gruppe wechseln:* `chgrp bob exam2.txt` bzw. `chown alice:bob exam2.txt`.
- *Kann bob in `exam1.dir` eine Datei anlegen?* Nur wenn er (als Besitzer, Gruppe oder Andere) **`w` und `x`** auf dem Verzeichnis hat.
- *Kann alice nach `cd exam1.dir`?* Nur mit `x`.

> **Merkbox:** Reihenfolge Besitzer → Gruppe → Andere, bei Verzeichnissen bedeutet `x` „betreten", `w` „Einträge ändern". alice ist nur in Gruppe alice, bob nur in Gruppe bob – sie bekommen also nur dann Rechte über die Gruppe, wenn die Datei der jeweils eigenen Gruppe gehört.

---

## Frage 3 – Paging und Adressübersetzung (5 P.)

### Motivation
Jeder Prozess soll glauben, er habe einen eigenen, großen, zusammenhängenden Adressraum. Der physische Speicher ist aber begrenzt und fragmentiert. Lösung: **virtueller Speicher mit Paging**.

### Begriffe
- **Virtuelle Adresse:** Adresse, die das Programm benutzt.
- **Physische Adresse:** echte Adresse im RAM.
- **Seite (Page):** Block fester Größe im virtuellen Adressraum (typ. 4 KiB).
- **Seitenrahmen (Page Frame):** gleich großer Block im physischen Speicher.
- **Seitentabelle (Page Table):** pro Prozess; ordnet jede Seite einem Rahmen zu (oder markiert sie als „nicht im RAM").
- **MMU (Memory Management Unit):** Hardware in der CPU, die jede Adresse zur Laufzeit übersetzt.
- **TLB (Translation Lookaside Buffer):** kleiner, schneller Cache der letzten Übersetzungen.

### Übersetzung
Eine virtuelle Adresse wird geteilt:

```
virtuelle Adresse = [ Seitennummer p | Offset d ]

1. MMU nimmt p, schaut in die Seitentabelle: p -> Rahmennummer f
2. physische Adresse = [ f | d ]    (Offset bleibt gleich)
```

**Zahlenbeispiel:** Seitengröße 4 KiB (12 Bit Offset), virtuelle Adresse `0x00003A7C`.
- Offset = `0xA7C`, Seitennummer = `0x3`.
- Seitentabelle: Seite 3 → Rahmen 7.
- Physische Adresse = `0x7A7C`.

Ablauf mit TLB: Erst im TLB nachsehen (**TLB-Hit** → schnell). Sonst Seitentabelle im RAM lesen (**TLB-Miss**), Eintrag in den TLB laden.

### Seitenfehler (Page Fault)
Ist das **Present-Bit** im Eintrag 0 (Seite nicht im RAM), löst die MMU eine Ausnahme aus. Das Betriebssystem:
1. prüft, ob der Zugriff legal ist (sonst Segmentation Fault),
2. sucht einen freien Rahmen (ggf. wird ein Opfer per Ersetzungsstrategie – LRU, Clock – ausgelagert),
3. lädt die Seite von der Platte (Swap/Datei),
4. aktualisiert die Seitentabelle, setzt den Befehl fort.

Zusätzliche Bits im Eintrag: Present, Dirty (geändert), Referenced, Schutzbits (r/w/x), User/Supervisor.

### Vorteile
Isolation zwischen Prozessen, keine externe Fragmentierung, Programme dürfen größer als das RAM sein, gemeinsame Seiten (Shared Libraries), Schutz.

### Herausforderungen bei großen virtuellen Adressräumen
Beispiel 64 Bit: 2^64 B Adressraum, 4-KiB-Seiten → bis zu 2^52 Seiten. Eine **flache Seitentabelle** wäre riesig (Petabytes) und pro Prozess nicht tragbar. Lösungen:
- **Mehrstufige Seitentabellen** (z. B. 4 Ebenen bei x86-64): nur tatsächlich benutzte Teilbäume werden angelegt (der Adressraum ist dünn besiedelt).
- **Invertierte Seitentabelle** (eine Tabelle über alle Rahmen, Suche per Hash).
- **TLB** wichtig, weil mehrstufiges Nachschlagen mehrere Speicherzugriffe kostet. Eine Übersetzung ohne TLB bräuchte bei 4 Ebenen 4 zusätzliche Zugriffe.
- **Große Seiten (Huge Pages, 2 MiB/1 GiB)** verringern Tabellengröße und TLB-Druck.
- Weitere Probleme: interne Fragmentierung (letzte Seite nicht voll), Thrashing bei zu wenig RAM, Platzbedarf der Tabellen selbst.

> **Merkbox:** Seitennummer + Offset, Seitentabelle p→f, MMU in Hardware, TLB als Cache, Page Fault und Nachladen, mehrstufige/invertierte Tabellen gegen die Größe.

---

## Frage 4 – RAID (2 P.)

### Konzept
**RAID = Redundant Array of Independent Disks**: Mehrere physische Platten werden zu **einem logischen Laufwerk** zusammengefasst, um **Leistung** und/oder **Ausfallsicherheit** zu erhöhen. Zwei Grundtechniken: **Striping** (Daten verteilen) und **Spiegelung/Parität** (Redundanz).

### RAID 0 – Striping
- Daten werden in Blöcken abwechselnd auf alle Platten verteilt.
- **Kapazität:** Summe aller Platten (100 %).
- **Leistung:** sehr gut (paralleles Lesen/Schreiben).
- **Ausfallsicherheit: keine!** Fällt eine Platte aus, sind (praktisch) alle Daten verloren – das Ausfallrisiko steigt sogar mit der Plattenzahl.
- **Einsatz:** schnelle, aber unkritische/ersetzbare Daten: Videoschnitt-Scratchdisk, temporäre Dateien, Caches, Render-Zwischenergebnisse.

### RAID 1 – Mirroring
- Jeder Block wird **identisch auf zwei (oder mehr) Platten** geschrieben.
- **Kapazität:** nur die einer Platte (50 % bei 2 Platten).
- **Leistung:** Lesen schneller (von beiden Platten lesbar), Schreiben ≈ wie eine Platte.
- **Ausfallsicherheit:** eine Platte darf ausfallen, das System läuft weiter, Daten bleiben erhalten.
- **Einsatz:** wichtige Daten bei kleinem Umfang: Betriebssystem-/Boot-Platte, Datenbank-Logs, kleine Server, Buchhaltung.

| | RAID 0 | RAID 1 |
|---|---|---|
| Prinzip | Striping | Spiegelung |
| Min. Platten | 2 | 2 |
| Nutzbare Kapazität | 100 % | 50 % (bei 2) |
| Ausfalltoleranz | keine | 1 Platte |
| Hauptziel | Geschwindigkeit | Sicherheit |

> **Hinweis:** RAID ersetzt kein Backup (schützt nicht vor Löschen, Virus, Brand).

---

## Frage 5 – Dateisystem-Allokation (3 P.)

### Die drei Methoden im Vergleich

**1. Zusammenhängende Belegung (Contiguous)**
- Jede Datei belegt aufeinanderfolgende Blöcke. Verwaltung: Startblock + Länge.
- ✔ Sehr schneller sequenzieller und direkter Zugriff, minimale Suchzeit.
- ✘ **Externe Fragmentierung**, Dateigröße muss vorab bekannt sein, Wachsen schwierig (Umkopieren), Defragmentierung nötig.

**2. Verkettete Liste (Linked List)**
- Jeder Block enthält einen Zeiger auf den nächsten Block.
- ✔ Keine externe Fragmentierung, Dateien können wachsen.
- ✘ **Wahlfreier Zugriff sehr langsam** (Block n nur durch Durchlaufen von n−1 Zeigern), Zeiger belegen Nutzplatz, ein defekter Zeiger zerstört den Rest der Datei. (Variante FAT: Zeiger in einer zentralen Tabelle – besser, aber die Tabelle muss im RAM liegen und wird bei großen Platten riesig.)

**3. i-Node-basiert (Indexed)**
- Jede Datei hat einen **i-Node** mit Metadaten (Rechte, Besitzer, Größe, Zeiten) und einer Liste von Blockzeigern: z. B. 12 **direkte** Zeiger, 1 **einfach indirekter**, 1 **zweifach indirekter**, 1 **dreifach indirekter** Zeiger.
- ✔ Schneller direkter Zugriff auf jeden Block, keine externe Fragmentierung, Dateien wachsen flexibel, **kleine Dateien** (die meisten) brauchen nur direkte Zeiger → schnell. Der i-Node einer Datei muss nur geladen werden, **wenn die Datei offen ist** (spart RAM bei vielen Dateien).
- ✘ Etwas Mehraufwand für indirekte Blöcke bei sehr großen Dateien, feste Anzahl i-Nodes.

### Entscheidung
**Ich wähle i-Node-basierte Allokation.** Begründung für eine große Platte mit vielen Dateien:
- Viele Dateien mit unterschiedlicher Größe und ständigem Anlegen/Löschen/Wachsen → contiguous würde stark fragmentieren.
- Zufälliger Zugriff auf große Dateien wird gebraucht → linked list ist zu langsam.
- i-Nodes skalieren: Kleine Dateien über direkte Zeiger, große über Indirektionsstufen. Speicherbedarf im RAM ist proportional zur Zahl der *geöffneten* Dateien, nicht der Gesamtdateien.
- Bewährt in der Praxis (ext2/3/4, UFS).

**Rechenbeispiel** (Blockgröße 4 KiB, Zeiger 4 B → 1024 Zeiger/Block): direkt 12·4 KiB = 48 KiB; einfach indirekt +4 MiB; zweifach indirekt +4 GiB; dreifach indirekt +4 TiB.

---

## Frage 6 – Pfadnamen (2 P.)

Aktuelles Verzeichnis: `/home/student/assignments/os`

**a) Absoluter Pfad zu `../../resources/slides.pdf`**
- `..` → `/home/student/assignments`
- `../..` → `/home/student`
- dann `resources/slides.pdf`

**Absoluter Pfad: `/home/student/resources/slides.pdf`**

**b) Relativer Pfad zu `/home/student/projects/kernel/main.c`**
- Zwei Ebenen nach oben bis `/home/student` (`../..`), dann `projects/kernel/main.c`.

**Relativer Pfad: `../../projects/kernel/main.c`**

> **Regel:** Ein absoluter Pfad beginnt mit `/` (Wurzel). Ein relativer Pfad beginnt beim aktuellen Verzeichnis; `.` = hier, `..` = eine Ebene höher.
> (Das Baumdiagramm aus der Aufgabe ist auf dem Foto nicht lesbar; die Lösung stützt sich auf die genannten Pfade.)

---

## Frage 7 – Prozess, Thread, Speicherlayout (4 P.)

### Prozess
Ein **Prozess** ist ein **Programm in Ausführung**: das statische Programm (Datei auf Platte) plus dynamischer Zustand – eigener **Adressraum**, Registerinhalt (Programmzähler, Stackpointer), offene Dateien, Prozess-ID, Rechte, Zustand. Verwaltet wird er im **Process Control Block (PCB)**.

### Thread
Ein **Thread** („Faden") ist eine **Ausführungseinheit innerhalb eines Prozesses**. Mehrere Threads eines Prozesses **teilen** Adressraum (Code, Daten, Heap) und offene Dateien, haben aber **jeweils eigenen** Programmzähler, Registersatz und **Stack**. Vorteile: leichtgewichtiger Wechsel/Erzeugung, einfacher Datenaustausch, Parallelität auf Mehrkernsystemen. Nachteil: Synchronisation nötig (Race Conditions), ein Fehler kann den ganzen Prozess treffen.

### Speicherlayout eines Prozesses

```
hohe Adressen
+-----------------------+
|  Kernel-Bereich       |   (nur im Kernel-Modus)
+-----------------------+
|  Stack                |   wächst nach unten ↓
|          ↓            |
|                       |
|          ↑            |
|  Heap                 |   wächst nach oben ↑
+-----------------------+
|  BSS (uninitial. Daten)|
+-----------------------+
|  Data (init. Daten)   |
+-----------------------+
|  Text (Code)          |
+-----------------------+
niedrige Adressen
```

| Bereich | Zweck | Typischer Inhalt |
|---|---|---|
| **Text / Code** | Programmbefehle, schreibgeschützt, teilbar | Maschinencode, Konstanten |
| **Data** | initialisierte globale/statische Variablen | `int x = 5;` (global) |
| **BSS** | nicht initialisierte globale/statische Variablen, beim Start mit 0 gefüllt | `int arr[1000];` (global) |
| **Heap** | dynamisch zur Laufzeit angeforderter Speicher | `malloc`, `new` |
| **Stack** | Funktionsaufrufe: Rücksprungadresse, Parameter, lokale Variablen | Stack Frames |

> **Merkbox:** Prozess = eigener Adressraum + Ressourcen; Thread = eigener Ablauf mit eigenem Stack, aber gemeinsamer Adressraum. Layout: Text, Data, BSS, Heap ↑, Stack ↓.

---

## Frage 8 – Prozesszustände (4 P.)

### Zustände
- **New (Neu):** Prozess wird erzeugt.
- **Ready (Bereit):** wartet nur auf die CPU.
- **Running (Rechnend):** erhält gerade die CPU.
- **Blocked / Waiting (Blockiert):** wartet auf ein Ereignis (I/O, Semaphor, Signal).
- **Terminated (Beendet):** abgeschlossen, Ressourcen werden freigegeben.

### Zustandsdiagramm

```
            admit                 dispatch (Scheduler)
   New ───────────────► Ready ◄──────────────────────► Running ──── exit ───► Terminated
                          ▲   ──── (Zeitscheibe abgelaufen /  ◄──┐
                          │         Verdrängung) ────────────────┘
                          │                                      │
                          │ Ereignis eingetreten                 │ wartet auf I/O,
                          │ (I/O fertig)                         │ Ereignis
                          └────────────── Blocked ◄──────────────┘
```

### Übergänge
| Übergang | Auslöser |
|---|---|
| New → Ready | Prozess zugelassen/initialisiert |
| Ready → Running | **Dispatch:** Scheduler wählt den Prozess |
| Running → Ready | **Preemption:** Zeitscheibe abgelaufen oder höher priorisierter Prozess |
| Running → Blocked | Prozess wartet auf I/O oder Ereignis |
| Blocked → Ready | Ereignis eingetreten (z. B. I/O fertig, Interrupt) |
| Running → Terminated | `exit`, Fehler oder Abbruch |

**Wichtig:** Blocked → Running gibt es **nicht** direkt; ein blockierter Prozess muss erst wieder *ready* werden. Ebenso nicht Ready → Blocked.

### Wie viele Prozesse pro Zustand (Einkernsystem, n Prozesse)?
| Zustand | Maximal gleichzeitig |
|---|---|
| **Running** | **höchstens 1** (nur ein Kern) – also 0 oder 1 |
| **Ready** | bis zu **n** (bzw. n−1, wenn gerade einer läuft) |
| **Blocked** | bis zu **n** (alle können auf I/O warten) |
| New / Terminated | bis zu n |

Beispiel: Wartet jeder Prozess auf I/O, ist *Running* = 0, *Blocked* = n. Im anderen Extrem: 1 Running, n−1 Ready.

---

## Frage 9 – Multiprogramming (4 P.)

### Was ist das?
**Multiprogramming** bedeutet, dass **mehrere Programme gleichzeitig im Hauptspeicher** gehalten werden und sich die CPU **abwechseln**. Wird ein Programm blockiert (z. B. wartet auf die Platte), schaltet das Betriebssystem auf ein anderes bereites Programm um.

### Ziel
- **Maximale CPU-Auslastung:** Die CPU soll nicht untätig auf langsame I/O warten. (Faustformel: bei Wartezeitanteil p und n Programmen ist die Auslastung ≈ 1 − pⁿ. Bei p = 80 % und n = 4 etwa 59 %, bei n = 10 etwa 89 %.)
- Höherer **Durchsatz** (mehr Jobs pro Zeit) und bessere Ressourcennutzung.
- (Mit Zeitscheiben/Time-Sharing zusätzlich gute Antwortzeiten – das ist die Erweiterung zu Multitasking.)

Voraussetzungen: Speicherverwaltung/-schutz (jedes Programm in eigenem Bereich), Prozessverwaltung, Scheduler.

### Wer entscheidet, welches Programm als Nächstes läuft?
Der **Scheduler (CPU-Scheduler) des Betriebssystem-Kerns** – genauer der *Short-Term-Scheduler* – mit dem **Dispatcher**, der den Kontextwechsel durchführt. Die Wahl folgt einer **Scheduling-Strategie** (Round Robin, Prioritäten, FCFS, SJF …). Nicht die Programme selbst und nicht der Benutzer entscheiden.

---

## Frage 10 – Kommunikation und Synchronisation (4 P.)

### Interprozesskommunikation (IPC)
Prozesse haben getrennte Adressräume, brauchen daher vom Betriebssystem bereitgestellte Mittel:

| Mittel | Kurzbeschreibung |
|---|---|
| **Pipes** (anonym) / **FIFOs** (named) | Bytestrom zwischen Prozessen, z. B. `ls \| grep txt` |
| **Message Queues** | Nachrichten mit Typ/Priorität, vom Kernel verwaltet |
| **Shared Memory** | gemeinsamer Speicherbereich; schnellste Methode, benötigt aber Synchronisation |
| **Sockets** | Kommunikation lokal oder über das Netzwerk |
| **Signale** | kurze asynchrone Benachrichtigungen (`SIGTERM`, `SIGINT`) |
| **Dateien** | Austausch über das Dateisystem |

Zwei Modelle: **Message Passing** (Kernel kopiert Nachrichten, einfach, langsamer) und **Shared Memory** (direkter Zugriff, schnell, aber Programmierer muss Synchronisation selbst sicherstellen).

### Synchronisation / Schutz gemeinsamer Ressourcen
Problem: **Race Condition** – das Ergebnis hängt von der Ausführungsreihenfolge ab (z. B. zwei Threads erhöhen gleichzeitig denselben Zähler → Zählung geht verloren). Der Zugriffsabschnitt heißt **kritischer Abschnitt**; es soll **gegenseitiger Ausschluss (Mutual Exclusion)** gelten.

Mittel des Betriebssystems:
- **Mutex / Lock:** nur ein Prozess/Thread darf in den kritischen Abschnitt (`lock` … `unlock`).
- **Semaphor:** Zähler mit atomaren Operationen `wait`/P (herunterzählen, ggf. blockieren) und `signal`/V (hochzählen). *Binärer Semaphor* ≈ Mutex, *zählender Semaphor* für begrenzte Ressourcen (z. B. 5 Druckerplätze).
- **Monitor:** Sprachkonstrukt, das Daten und Zugriffsfunktionen kapselt, nur ein Thread aktiv; mit **Bedingungsvariablen** (`wait`/`notify`).
- **Atomare Operationen** (Test-and-Set, Compare-and-Swap) als Hardwarebasis.
- **Bedingungsvariablen, Barrieren, Read/Write-Locks.**

Typische Probleme: **Deadlock** (gegenseitiges Warten), **Starvation**, **Prioritätsinversion**.
Klassische Beispiele: Producer-Consumer, Readers-Writers, Philosophenproblem.

---

## Frage 11 – Preemptive / Non-Preemptive Resources (4 P.)

### Begriffe
- **Preemptive Resource (entziehbar):** Das System kann die Ressource einem Prozess **wegnehmen und später ohne Schaden zurückgeben**, weil sich der Zustand sichern und wiederherstellen lässt.
- **Non-Preemptive Resource (nicht entziehbar):** Entzieht man sie dem Besitzer **gewaltsam**, geht Arbeit verloren oder der Zustand wird inkonsistent; sie darf nur **freiwillig freigegeben** werden.

### Beispiel preemptive: Hauptspeicher (bzw. die CPU)
Ein Prozess hat Seiten im RAM. Wird der Speicher knapp, **lagert das OS Seiten auf die Platte aus** (Swapping/Paging) und gibt den Rahmen einem anderen Prozess. Beim nächsten Zugriff wird die Seite per Page Fault zurückgeholt – der Prozess merkt davon nichts, nichts geht verloren.
Ähnlich die **CPU**: Der Scheduler entzieht sie per Timer-Interrupt, sichert den Kontext (Register) und stellt ihn später wieder her.

### Beispiel non-preemptive: Drucker (oder CD-/DVD-Brenner, Sperre/Lock)
Druckt Prozess A gerade ein Dokument und das OS entzöge ihm den Drucker, um Prozess B drucken zu lassen, entstünde eine **Mischung aus beiden Ausdrucken** – unbrauchbar. Beim CD-Brenner gäbe es einen **fehlerhaften Rohling**. Ebenso darf ein **Mutex** innerhalb eines kritischen Abschnitts nicht einfach entzogen werden, sonst wird der Datenzustand inkonsistent.

### Warum ist das wichtig?
Nur bei **non-preemptive Ressourcen** kann ein **Deadlock** entstehen (eine der vier Bedingungen: *No Preemption*, neben Mutual Exclusion, Hold-and-Wait, Circular Wait). Bei entziehbaren Ressourcen kann das System Deadlocks durch Entzug auflösen.

---

## Schnellübersicht: Stichworte zum Auswendiglernen

| Frage | Kernpunkte |
|---|---|
| 1 | Schichten, Kernel, Treiber, Devices in `/dev`, Syscalls, Interrupts |
| 2 | Besitzer→Gruppe→Andere, `rwx`, bei Verzeichnissen `x` = betreten |
| 3 | Seitennummer+Offset, Seitentabelle, MMU, TLB, Page Fault, mehrstufige Tabellen |
| 4 | RAID 0 = Striping, schnell, ohne Redundanz; RAID 1 = Spiegel, sicher |
| 5 | i-Node: schnell, flexibel, skalierbar |
| 6 | `/home/student/resources/slides.pdf`, `../../projects/kernel/main.c` |
| 7 | Prozess = Programm in Ausführung; Thread teilt Adressraum; Text/Data/BSS/Heap/Stack |
| 8 | New, Ready, Running, Blocked, Terminated; Running ≤ 1, Ready/Blocked ≤ n |
| 9 | Mehrere Programme im RAM, CPU-Auslastung, Scheduler entscheidet |
| 10 | Pipes, Queues, Shared Memory, Sockets; Mutex, Semaphor, Monitor |
| 11 | CPU/RAM preemptive; Drucker/Brenner/Lock non-preemptive |
