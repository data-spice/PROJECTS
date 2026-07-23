import { Trash2, X } from "lucide-react";
import type { Expense } from "../types/expense";

interface DeleteConfirmDialogProps {
  expense: Expense | null;
  onCancel: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export function DeleteConfirmDialog({ expense, onCancel, onConfirm, loading }: DeleteConfirmDialogProps) {
  if (!expense) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
      <div className="glass-panel animate-panel-in w-full max-w-md rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-300/20 bg-red-500/10 text-red-300">
            <Trash2 className="h-5 w-5" />
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-slate-100"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <h2 className="mt-5 text-lg font-semibold text-white">Delete expense?</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          This will permanently remove <span className="font-medium text-slate-100">{expense.description}</span>.
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-500/30 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:bg-red-900"
          >
            <Trash2 className="h-4 w-4" />
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
