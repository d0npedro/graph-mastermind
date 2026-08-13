import { neighborsOf } from "../graph/search";
import type { GraphDataset, GraphNode } from "../graph/types";

type Props = {
  dataset: GraphDataset;
  node: GraphNode | null;
};

export function DetailPanel({ dataset, node }: Props) {
  if (!node) {
    return (
      <aside
        data-testid="graph-panel"
        className="pointer-events-none absolute top-3 right-3 w-72 rounded-sm border border-line bg-raised/95 p-3 text-sm text-muted"
      >
        Knoten wählen
      </aside>
    );
  }

  const neighbors = neighborsOf(node.id, dataset.nodes, dataset.links);
  const meta = node.meta ? Object.entries(node.meta) : [];

  return (
    <aside
      data-testid="graph-panel"
      className="absolute top-3 right-3 max-h-[70%] w-72 overflow-auto rounded-sm border border-line bg-raised/95 p-3 text-sm"
    >
      <p className="text-xs tracking-wide text-muted uppercase">{node.group}</p>
      <h2 className="mt-1 text-base text-ink">{node.label}</h2>
      {node.description ? (
        <p className="mt-2 text-muted">{node.description}</p>
      ) : null}
      {meta.length > 0 ? (
        <dl className="mt-3 space-y-1">
          {meta.map(([key, value]) => (
            <div key={key} className="flex justify-between gap-3">
              <dt className="text-muted">{key}</dt>
              <dd className="text-ink">{String(value)}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      <h3 className="mt-3 text-xs tracking-wide text-muted uppercase">
        Nachbarn
      </h3>
      {neighbors.length === 0 ? (
        <p className="mt-1 text-muted">Keine</p>
      ) : (
        <ul className="mt-1 space-y-1">
          {neighbors.map((neighbor) => (
            <li key={`${neighbor.direction}-${neighbor.id}`} className="text-ink">
              <span className="text-muted">
                {neighbor.direction === "out" ? "zu" : "von"}
              </span>{" "}
              {neighbor.label}
              {neighbor.linkLabel ? (
                <span className="text-muted"> · {neighbor.linkLabel}</span>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
