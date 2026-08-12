# Beispieldaten

Zwei vollständige Datasets im kanonischen Modell aus `SPEC.md`.

Der Agent nutzt sie als:

1. **Format-Referenz** beim Ableiten eines Projektgraphen
2. **Fallback**, wenn das Zielrepo keinen brauchbaren Kontext hat

Keine App. Keine extra Dependencies. Beim Fallback alle fünf Dateien
als Datasets übernehmen (nicht neu erfinden, nicht kürzen).

| Datei | Sicht |
|---|---|
| `dependency-graph.json` | Software-Module und Abhängigkeiten |
| `team-graph.json` | Rollen und Zusammenarbeit |
| `domain-graph.json` | Fachliche Konzepte |
| `datamodel-graph.json` | Entitäten und Relationen |
| `pipeline-graph.json` | Verarbeitungsschritte |
