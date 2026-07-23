import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { DeleteConfirmDialog } from "../components/DeleteConfirmDialog";
import { ExpenseTable } from "../components/ExpenseTable";
import { SearchBar } from "../components/SearchBar";
import { useExpenses } from "../hooks/useExpenses";
import type { Expense } from "../types/expense";

export function Expenses() {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
  const { expenses, loading, mutating, error, successMessage, removeExpense, refresh } = useExpenses(categoryFilter);

  async function confirmDelete() {
    if (!expenseToDelete) {
      return;
    }

    await removeExpense(expenseToDelete.id);
    setExpenseToDelete(null);
  }

  return (
    <div className="space-y-6">
      <div className="glass-panel scanline animate-panel-in rounded-3xl p-5 sm:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Transactions</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Expense Ledger</h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <SearchBar value={categoryFilter} onChange={setCategoryFilter} />
          <button
            type="button"
            onClick={() => void refresh()}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/15"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>
      ) : null}
      {successMessage ? (
        <div className="rounded-xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          {successMessage}
        </div>
      ) : null}

      <ExpenseTable expenses={expenses} loading={loading} onDelete={setExpenseToDelete} />
      <DeleteConfirmDialog
        expense={expenseToDelete}
        onCancel={() => setExpenseToDelete(null)}
        onConfirm={confirmDelete}
        loading={mutating}
      />
    </div>
  );
}
