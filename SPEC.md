# Graph-Mastermind — Spezifikation

Operativ. Der ausführende Agent weicht hiervon nicht ab.
Ergänzt `AGENT.md`, ersetzt sie nicht.

---

## 1. Muss-Features

| Feature | Verhalten |
|---|---|
| Canvas 2D + d3-force | Knoten und Kanten werden auf `<canvas>` gezeichnet. Layout über `d3-force`. Kein SVG-Schwarm aus DOM-Knoten. |
| Ziehen | Pointer auf Knoten greift den Knoten. |
| Zoom | Mausrad / Trackpad: Zoom zur Cursorposition. Clamp 0.15–6. |
| Pan | Drag auf leerem Canvas verschiebt die Kamera. |
| Kantenlabels | Text an der Kantenmitte, abschaltbar, bei kleinem Zoom ausgeblendet. |
| Suche | Teilstring, case-insensitive, gegen `label`, `id`, `group`, `description`. Treffer normal, Rest gedimmt. |
| Detailpanel | Bei Selection: Label, Gruppe, Description, Meta, Nachbarn (id + Kantenlabel). |
| Aufheizen | `simulation.alphaTarget(0.3).restart()`, danach Target wieder 0. |
| Einfrieren | Simulation stoppen; gezogene Knoten bleiben gepinnt, solange freeze an ist. |
| Einpassen | Alle Knoten in den Viewport mit Padding. |
| Labels an/aus | Getrennte Schalter: Knotenlabels, Kantenlabels. |
| Graph-Wechsel | Anderes Dataset: Suche leeren, Selection löschen, Simulation neu aufbauen und anschieben. |

Kein Feature aus dieser Tabelle ist optional.

---

## 2. Datenmodell

```ts
export type GraphNode = {
  id: string
  label: string
  group: string
  description?: string
  meta?: Record<string, string | number | boolean>
}

export type GraphLink = {
  source: string
  target: string
  label?: string
  weight?: number
}

export type GraphDataset = {
  id: string
  title: string
  description: string
  nodes: GraphNode[]
  links: GraphLink[]
}
```

Invarianten:

- `id` eindeutig innerhalb eines Datasets, stabil, ohne Leerzeichen.
- `source` / `target` müssen eine Node-`id` desselben Datasets sein.
- `group` steuert Farbe. Palette aus Tokens, nicht zufällig pro Render.
- `weight` optional; wenn gesetzt: positive Zahl, mappt auf Kantendicke
  in einem engen Bereich (z. B. 1–3 CSS-Pixel vor DPR).
- Datasets liegen als TypeScript-Module im Bundle. Kein Pflicht-Fetch.

Beispiel-Dateien (alle fünf Fallback-Datasets):

- `examples/dependency-graph.json`
- `examples/team-graph.json`
- `examples/domain-graph.json`
- `examples/datamodel-graph.json`
- `examples/pipeline-graph.json`

---

## 3. Interaktion

| Geste | Wirkung |
|---|---|
| Pointer down auf Knoten + move | Node-Drag. Setzt `fx`/`fy`. |
| Pointer up nach Node-Drag | `fx`/`fy` löschen, **wenn nicht frozen**. |
| Wheel über Canvas | Zoom-to-Cursor. Weltpunkt unter dem Cursor bleibt. `k ∈ [0.15, 6]`. |
| Pointer drag auf Leere | Pan (`x`/`y` der Kamera). |
| Klick auf Knoten | Selection + Panel. Kein Drag, wenn die Bewegung unter einer kleinen Schwelle bleibt. |
| Klick auf Leere | Selection aufheben, Panel leer. |
| Doppelklick Leere | `fitView`. |
| Doppelklick Knoten | Diesen Knoten zentrieren. Zoom beibehalten oder nur leicht anheben, nie hart auf 1 springen. |
| Touch | Dieselben Gesten über Pointer Events. Canvas: `touch-action: none` (`touch-none`). |

Hit-Test in Weltkoordinaten: Distanz zum Knotenmittelpunkt ≤ Radius
(+ kleiner Toleranzsaum). Oberster / nächster Knoten gewinnt.

Tastatur, soweit ohne Extra-UI machbar:

- `Escape` hebt Selection und Suchfokus-Falle auf
- `/` fokussiert die Suche

---

## 4. Performance

Verbindlich:

1. **rAF + dirty-flag.** `tick` setzt `dirty`. Der Frame zeichnet nur bei
   `dirty` oder laufender Interaktion (Drag, Zoom, Resize).
2. **Kein React-State pro Tick.** Keine Positionen in `useState`.
   Kamera, Nodes, Simulation, dirty leben in Refs / Modulen.
3. **`devicePixelRatio` ≤ 2.** `dpr = min(window.devicePixelRatio || 1, 2)`.
4. **Simulation kühlt aus.** Standard-`alphaDecay` / `alphaMin` von d3
   (leicht anpassbar, nicht dauerheizen). Nach Freeze: `stop()`.
5. **Ziel:** ~120 Knoten + vergleichbare Kantenzahl flüssig
   (kein Drop auf sichtbares Ruckeln im Idle nach dem Auskühlen).

Weitere harte Kanten:

- Kein Layout im DOM für Knoten.
- Kein Shadow-Blur als Default (teuer auf Canvas).
- Labels: bei vielen Knoten und Zoom < ~0.7 nur Selection + Suchtreffer
  beschriften, wenn „Knotenlabels an“.
- `fitView` und Resize dürfen ein Frame lang neu messen, nicht jeden Tick.

---

## 5. Design

Dunkel, niedriges Chroma, ruhig.

| Token-Rolle | Vorgabe |
|---|---|
| Fläche | Fast-schwarz / tiefes Grau, kein Blau-Violett-Verlauf |
| Fläche angehoben (Toolbar, Panel) | Eine Stufe heller, dünne Border, wenig Kontrast |
| Text | Hellgrau, nicht reines Weiß auf großen Flächen |
| Text gedimmt | Für Meta, Kantenlabels, unpassende Suchknoten |
| Primary | `#7dd3c0` — sparsam: Fokusring, aktiver Schalter, Selection-Ring |
| Gruppenfarben | Gedämpfte, unterscheidbare Töne, ähnliche Helligkeit, kein Neon |
| Gefahr / Freeze aktiv | Ein ruhiges Bernstein oder kühles Rot, kein Alarm-Gradient |

Untersagt:

- Emojis
- Purple-Glows, äußeres Leuchten in mehreren Lagen
- Gradient-Blobs, Mesh-Backgrounds, „AI aesthetic“
- Verspielte Illustrationen hinter dem Graphen
- Abgerundete Marketing-Cards, die den Canvas zur Kachel machen

Typo: system-ui / vorhandenes Projekt-Sans. Kein Display-Font für UI.

Abstände: Toolbar kompakt. Panel schmal (~280–360px). Canvas nimmt den Rest.

Tailwind v4: Farben und Radien als `@theme`-Tokens in CSS, keine
willkürlichen Hex-Werte in zehn Komponenten. Primary als Token
(`--color-primary: #7dd3c0`).

---

## 6. Stack und Fallbacks

### Default (neues Verzeichnis)

- React + TypeScript + Vite
- Tailwind CSS v4, CSS-first, `@theme`
- `d3-force`
- `lucide-react`
- UI-Sprache: Deutsch

Node: aktuelle LTS, die Vite akzeptiert. Nicht nach der Version fragen;
`package.json` mit einer vernünftigen `engines`-Angabe setzen, wenn du
das Paket selbst anlegst.

### Fallback, wenn das Zielrepo schon etwas ist

| Vorhanden | Tun |
|---|---|
| Vite + React + TS | Dort integrieren; fehlende Libs ergänzen |
| Next.js / anderes React | Client-Seite, dieselbe Canvas-Runtime |
| Anderes Framework, kein React | `graph-explorer/` mit Default-Stack daneben |
| Kein Frontend / leeres Repo | `graph-explorer/` + Fallback-Datasets |

Paketmanager: was das Repo schon nutzt (`npm` / `pnpm` / `yarn` / `bun`).
Lockfile nicht ohne Grund wechseln. Ohne Lockfile: `npm`.

### Nicht tun

- Neues Backend, Auth-Provider, Datenbank
- Den Menschen um Port, Theme oder Framework bitten
- Production-Code der Fachdomäne umbauen, nur damit der Graph „besser“ wird
- `node_modules` als Graph ausschütten

---

## 7. Datei- und Startvertrag

Nach dem Lauf muss gelten:

```bash
cd <graph-app-dir>
npm install          # oder der vorhandene Package-Manager
npx tsc --noEmit
npm run build
npm run dev          # sichtbarer Graph, kein Extra-Setup
```

`index.html` (oder Framework-Äquivalent) lädt die App vollflächig.
Kein „open another terminal and start the API“.
