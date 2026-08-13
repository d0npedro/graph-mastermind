# Abnahme — Lauf im Zielprojekt

Nach „Lies AGENT.md und baue für dieses Repo den Netzwerkgraphen.“
diese Liste durchgehen. Ein offenes Kästchen = Lauf nicht fertig.

## Herkunft

- [ ] Auf vorhandenen Stempel / vorhandene Runtime geprüft (Phase 0b)
- [ ] Keine zweite Graph-App angelegt
- [ ] Repo wurde gescannt (Baum, Manifeste, Docs, Domain-Typen)
- [ ] Hauptgraph stammt aus dem Projekt **oder** Fallback ist schriftlich begründet
- [ ] Fallback, falls genutzt, umfasst die fünf Datasets aus `examples/`
- [ ] Keine erfundenen Module, solange echter Kontext existierte
- [ ] Links zeigen nur auf existierende Node-IDs

## App

- [ ] Vollflächiger Canvas, Graph sofort sichtbar
- [ ] Canvas 2D + d3-force, kein SVG-Node-Schwarm
- [ ] Knoten ziehbar; Release unpinnt, außer Freeze
- [ ] Zoom-to-Cursor, Clamp etwa 0.15–6
- [ ] Pan auf leerem Canvas
- [ ] Kantenlabels sichtbar und abschaltbar
- [ ] Knotenlabels abschaltbar
- [ ] Suche dimmt Nicht-Treffer, hebt Treffer
- [ ] Klick öffnet Detailpanel (Meta + Nachbarn)
- [ ] Reheat / Freeze / Fit funktionieren
- [ ] Doppelklick Leere = Fit; Doppelklick Knoten = zentrieren
- [ ] Canvas hat `touch-none` / `touch-action: none`
- [ ] Mehrere Graphen: Wechsel leert Suche + Selection und startet Simulation neu

## Technik

- [ ] Kein React-State auf Simulation-Ticks
- [ ] rAF + dirty-flag
- [ ] `devicePixelRatio` geklemmt auf ≤ 2
- [ ] Simulation kühlt aus; Freeze ruft `stop()`
- [ ] `tsc --noEmit` grün
- [ ] Production-Build grün
- [ ] `npm run dev` (oder Repo-Äquivalent) startet ohne Extra-Dienst

## Design und Grenzen

- [ ] Dunkel, niedriges Chroma, Primary sparsam (`#7dd3c0` oder Token)
- [ ] Keine Emojis, keine Purple-Glows, keine Gradient-Blobs
- [ ] Kein Auth, kein Pflicht-Backend, kein Multiplayer
- [ ] Mensch wurde nicht nach Port oder Setup gefragt
- [ ] Bestehendes Produkt nicht überschrieben

## Übergabe

- [ ] Sicht(en), Knoten-/Kantenzahl, Quelle genannt — oder „Bereits angewendet“
- [ ] Startbefehl genannt
- [ ] Bedienung in wenigen Zeilen genannt (bei Erstlauf)
- [ ] `.graph-mastermind.json` liegt im App-Verzeichnis
