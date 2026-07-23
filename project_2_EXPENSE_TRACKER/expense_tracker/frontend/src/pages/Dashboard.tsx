import { useState } from "react";
import { CalendarDays, CreditCard, LineChart, ReceiptText, Wallet } from "lucide-react";
import { DashboardCard } from "../components/DashboardCard";
import { DeleteConfirmDialog } from "../components/DeleteConfirmDialog";
import { ExpenseForm } from "../components/ExpenseForm";
import { ExpenseTable } from "../components/ExpenseTable";
import { SearchBar } from "../components/SearchBar";
import { useExpenses } from "../hooks/useExpenses";
import type { Expense } from "../types/expense";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function Dashboard() {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
  const { expenses, stats, loading, mutating, error, successMessage, addExpense, removeExpense } =
    useExpenses(categoryFilter);

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
        <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Portfolio spending command</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Expense Intelligence</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Real-time ledger controls with category filtering, spend velocity, and transaction-level actions.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-2xl border border-emerald-300/15 bg-emerald-400/10 px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                <LineChart className="h-4 w-4" />
                Cashflow
              </div>
              <p className="mt-2 text-2xl font-semibold text-white">{formatCurrency(stats.monthlyTotal)}</p>
            </div>
            <SearchBar value={categoryFilter} onChange={setCategoryFilter} />
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

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Total Expenses" value={formatCurrency(stats.total)} icon={Wallet} note="All recorded spending" trend="Ledger" />
        <DashboardCard title="Today's Expenses" value={formatCurrency(stats.todayTotal)} icon={CalendarDays} note="Current day spending" trend="Today" />
        <DashboardCard title="Monthly Expenses" value={formatCurrency(stats.monthlyTotal)} icon={CreditCard} note="Current month spending" trend="MTD" />
        <DashboardCard title="Number of Expenses" value={String(stats.count)} icon={ReceiptText} note="Visible transactions" trend="Rows" />
      </div>

      <ExpenseForm onSubmit={addExpense} disabled={mutating} />
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
