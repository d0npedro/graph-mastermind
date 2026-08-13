import { SearchField } from "./SearchField";
import type { GraphDataset } from "../graph/types";

type Props = {
  datasets: GraphDataset[];
  datasetId: string;
  onDataset: (id: string) => void;
  search: string;
  onSearch: (value: string) => void;
  searchRef: React.RefObject<HTMLInputElement | null>;
  frozen: boolean;
  onFrozen: (value: boolean) => void;
  onReheat: () => void;
  onFit: () => void;
  nodeLabels: boolean;
  edgeLabels: boolean;
  onNodeLabels: (value: boolean) => void;
  onEdgeLabels: (value: boolean) => void;
};

export function Toolbar({
  datasets,
  datasetId,
  onDataset,
  search,
  onSearch,
  searchRef,
  frozen,
  onFrozen,
  onReheat,
  onFit,
  nodeLabels,
  edgeLabels,
  onNodeLabels,
  onEdgeLabels,
}: Props) {
  const btn =
    "rounded-sm border border-line bg-raised px-2 py-1 text-sm text-ink hover:border-muted";
  const on =
    "rounded-sm border border-primary bg-raised px-2 py-1 text-sm text-primary";

  return (
    <header className="flex flex-wrap items-center gap-2 border-b border-line bg-raised px-3 py-2">
      <select
        data-testid="graph-select"
        aria-label="Graph"
        value={datasetId}
        onChange={(event) => onDataset(event.target.value)}
        className="rounded-sm border border-line bg-surface px-2 py-1 text-sm text-ink"
      >
        {datasets.map((dataset) => (
          <option key={dataset.id} value={dataset.id}>
            {dataset.title}
          </option>
        ))}
      </select>
      <SearchField value={search} onChange={onSearch} inputRef={searchRef} />
      <button type="button" className={btn} onClick={onReheat}>
        Aufheizen
      </button>
      <button
        type="button"
        className={frozen ? on : btn}
        aria-pressed={frozen}
        onClick={() => onFrozen(!frozen)}
      >
        {frozen ? "Eingefroren" : "Einfrieren"}
      </button>
      <button type="button" className={btn} onClick={onFit}>
        Einpassen
      </button>
      <button
        type="button"
        className={nodeLabels ? on : btn}
        aria-pressed={nodeLabels}
        onClick={() => onNodeLabels(!nodeLabels)}
      >
        Knotenlabels
      </button>
      <button
        type="button"
        className={edgeLabels ? on : btn}
        aria-pressed={edgeLabels}
        onClick={() => onEdgeLabels(!edgeLabels)}
      >
        Kantenlabels
      </button>
    </header>
  );
}
