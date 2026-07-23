import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full sm:max-w-sm">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-300" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="finance-input w-full rounded-xl py-3 pl-10 pr-10 text-sm outline-none transition focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10"
        placeholder="Search by category"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-cyan-200"
          aria-label="Clear category search"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
