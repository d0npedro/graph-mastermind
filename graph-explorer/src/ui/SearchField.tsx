type Props = {
  value: string;
  onChange: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

export function SearchField({ value, onChange, inputRef }: Props) {
  return (
    <label className="flex min-w-40 flex-1 items-center gap-2 text-sm text-muted">
      <span className="sr-only">Suche</span>
      <input
        ref={inputRef}
        data-testid="graph-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Suche"
        className="w-full rounded-sm border border-line bg-surface px-2 py-1 text-ink placeholder:text-muted"
      />
    </label>
  );
}
