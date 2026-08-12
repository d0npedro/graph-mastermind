# Graph-Mastermind

Wiederverwendbarer Agent: aus einem beliebigen Repository einen
**vollflächigen Force-Directed Netzwerkgraphen** bauen — demo-fertig,
ohne Nachfragen zu Ports oder Setup.

Dieses Paket ist der Agent, nicht der Graph. Den Graphen erzeugt ein
AI-Agent (oder du) **im Zielprojekt**, nachdem er `AGENT.md` gelesen hat.

## Nutzung

```text
1. Dieses Agent-Paket in dein Projekt klonen/kopieren
2. Agent starten mit:
   „Lies AGENT.md und baue für dieses Repo den Netzwerkgraphen.“
3. Ergebnis: lauffähiger Force-Graph für genau dieses Projekt
```

### Klonen

Neben das Zielprojekt oder hinein:

```bash
git clone <dieses-repo> graph-mastermind
```

Nur die Instruktionen reichen: `AGENT.md`, `SPEC.md`, `examples/`, `CHECKLIST.md`.
Skripte muss niemand installieren.

### Starten

Arbeitsverzeichnis = **Wurzel des Zielprojekts**. Dem lokalen AI-Agenten
genau diesen Satz geben:

```text
Lies graph-mastermind/AGENT.md und baue für dieses Repo den Netzwerkgraphen.
```

Liegt das Paket anders: Pfad anpassen. Der Agent folgt `AGENT.md` 1:1.

## Was im Zielprojekt entsteht

Eine startbare SPA (integriert oder als `graph-explorer/`):

- Canvas-2D + d3-force, ziehbare Knoten, Zoom-to-Cursor, Pan
- Kantenlabels, Suche (Highlight/Dim), Detailpanel
- Aufheizen / Einfrieren / Einpassen, Labels an/aus
- Graph aus **diesem** Repo — oder 3–5 Fallback-Samples, wenn nichts da ist

Start der fertigen App (typisch):

```bash
cd graph-explorer
npm install
npm run dev
```

Kein Login. Kein Backend. Keine Port-Frage.

## Inhalt dieses Pakets

| Datei | Rolle |
|---|---|
| `AGENT.md` | Arbeitsanweisung — allein genug, um den Auftrag auszuführen |
| `SPEC.md` | Muss-Features, Datenmodell, Interaktion, Performance, Design, Stack |
| `CHECKLIST.md` | Abnahme nach dem Lauf im Zielprojekt |
| `examples/` | Mini-Datensätze (Dependency, Team) als Format + Fallback |

## Regeln in einem Satz

Projektkontext vor Samples. Klarer Graph vor dekorativem Chaos.
Bestehenden Stack respektieren, sonst React + Vite + Tailwind v4.
Keine halben Scaffolds.
