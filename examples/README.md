# Beispieldaten

Datasets im kanonischen Modell aus `SPEC.md`.

| Datei | Sicht | Rolle |
|---|---|---|
| `graph-mastermind.json` | Dieses Paket | Default der Referenz-App |
| `dependency-graph.json` | Software-Module | Fallback für fremde Repos |
| `team-graph.json` | Rollen und Zusammenarbeit | Fallback |
| `domain-graph.json` | Fachliche Konzepte | Fallback |
| `datamodel-graph.json` | Entitäten und Relationen | Fallback |
| `pipeline-graph.json` | Verarbeitungsschritte | Fallback |

Der Agent nutzt die fünf Fallback-Dateien als:

1. **Format-Referenz** beim Ableiten eines Projektgraphen
2. **Fallback**, wenn das Zielrepo keinen brauchbaren Kontext hat

`graph-mastermind.json` beschreibt **dieses** Repository. Nicht als
Fallback in ein fremdes Zielprojekt kopieren.

Keine App. Keine extra Dependencies. Beim Fallback alle fünf
`*-graph.json`-Samples übernehmen (nicht neu erfinden, nicht kürzen).
