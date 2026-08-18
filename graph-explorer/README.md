# graph-explorer

Referenz-SPA für Graph-Mastermind. Marker: `.graph-mastermind.json`.
Kein zweites `graph-explorer` in demselben Repo aufsetzen.

Canvas 2D + d3-force. Default ist der Graph dieses Pakets. Die fünf
Fallback-Datasets aus `examples/` sind umschaltbar.

```bash
npm install
npm run dev
npm test
npm run typecheck
npm run build
```

Runtime unter `src/graph/` kopieren, Datasets ersetzen.
Canvas, Simulation und Zoom-to-Cursor nicht neu erfinden.
