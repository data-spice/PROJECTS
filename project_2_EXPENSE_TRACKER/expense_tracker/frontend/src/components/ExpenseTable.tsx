import { ArrowDownRight, Trash2 } from "lucide-react";
import type { Expense } from "../types/expense";

interface ExpenseTableProps {
  expenses: Expense[];
  loading: boolean;
  onDelete: (expense: Expense) => void;
}

function formatCurrency(value: string | number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value));
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export function ExpenseTable({ expenses, loading, onDelete }: ExpenseTableProps) {
  return (
    <section className="glass-panel animate-panel-in overflow-hidden rounded-2xl">
      <div className="flex flex-col justify-between gap-3 border-b border-cyan-300/10 px-5 py-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Ledger Stream</p>
          <h2 className="mt-1 text-lg font-semibold text-white">Expenses</h2>
        </div>
        <div className="ticker-window hidden max-w-sm overflow-hidden rounded-full border border-emerald-300/15 bg-emerald-400/10 px-3 py-2 text-xs font-medium text-emerald-200 sm:block">
          <span className="ticker-track inline-block whitespace-nowrap">
            FOOD - UTILITIES - TRANSPORT - HEALTH - SHOPPING - ENTERTAINMENT - HOUSING -
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-cyan-300/10">
          <thead className="bg-white/[0.03]">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Description</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Category</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Amount</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Date</th>
              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-300/10">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-400">
                  Loading expenses...
                </td>
              </tr>
            ) : expenses.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-400">
                  No expenses found.
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr key={expense.id} className="animate-row-in transition hover:bg-cyan-300/[0.04]">
                  <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-100">
                    {expense.description}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-300">
                    <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
                      {expense.category}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-red-200">
                    <span className="inline-flex items-center gap-2">
                      <ArrowDownRight className="h-4 w-4 text-red-300" />
                      {formatCurrency(expense.amount)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-400">{formatDate(expense.expense_date)}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => onDelete(expense)}
                      className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-300"
                      aria-label={`Delete ${expense.description}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
