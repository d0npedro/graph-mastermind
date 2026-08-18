import { useEffect, useMemo, useRef, useState } from "react";
import { datasetById, datasets } from "./data/graphs";
import { useGraphRuntime } from "./graph/use-graph-runtime";
import { DetailPanel } from "./ui/DetailPanel";
import { GraphCanvas } from "./ui/GraphCanvas";
import { Toolbar } from "./ui/Toolbar";

export function App() {
  const [datasetId, setDatasetId] = useState(datasets[0].id);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [frozen, setFrozen] = useState(false);
  const [nodeLabels, setNodeLabels] = useState(true);
  const [edgeLabels, setEdgeLabels] = useState(true);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const dataset = useMemo(() => datasetById(datasetId), [datasetId]);
  const selected =
    dataset.nodes.find((node) => node.id === selectedId) ?? null;

  const switchDataset = (id: string) => {
    setDatasetId(id);
    setSearch("");
    setSelectedId(null);
  };

  const { canvasRef, reheat, fit } = useGraphRuntime(
    dataset,
    { search, selectedId, nodeLabels, edgeLabels, frozen },
    setSelectedId,
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedId(null);
        searchRef.current?.blur();
      }
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex h-dvh flex-col bg-surface text-ink">
      <Toolbar
        datasets={datasets}
        datasetId={dataset.id}
        onDataset={switchDataset}
        search={search}
        onSearch={setSearch}
        searchRef={searchRef}
        frozen={frozen}
        onFrozen={setFrozen}
        onReheat={reheat}
        onFit={fit}
        nodeLabels={nodeLabels}
        edgeLabels={edgeLabels}
        onNodeLabels={setNodeLabels}
        onEdgeLabels={setEdgeLabels}
      />
      <main className="relative min-h-0 flex-1">
        <GraphCanvas canvasRef={canvasRef} />
        <DetailPanel dataset={dataset} node={selected} />
      </main>
    </div>
  );
}
