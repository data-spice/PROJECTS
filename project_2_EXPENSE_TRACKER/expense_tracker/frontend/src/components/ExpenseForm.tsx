import { FormEvent, useState } from "react";
import { CircuitBoard, Plus } from "lucide-react";
import type { ExpensePayload } from "../types/expense";

const categories = ["Food", "Transport", "Utilities", "Housing", "Health", "Entertainment", "Shopping", "Other"];

interface ExpenseFormProps {
  onSubmit: (payload: ExpensePayload) => Promise<void>;
  disabled: boolean;
}

const today = new Date().toISOString().slice(0, 10);

export function ExpenseForm({ onSubmit, disabled }: ExpenseFormProps) {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [amount, setAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState(today);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await onSubmit({
      description: description.trim(),
      category,
      amount: Number(amount),
      expense_date: expenseDate,
    });

    setDescription("");
    setCategory(categories[0]);
    setAmount("");
    setExpenseDate(today);
  }

  return (
    <section className="glass-panel animate-panel-in rounded-2xl p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Transaction Input</p>
          <h2 className="mt-2 text-lg font-semibold text-white">Add Expense</h2>
          <p className="mt-1 text-sm text-slate-400">Record a new ledger entry.</p>
        </div>
        <div className="hidden h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-200 sm:flex">
          <CircuitBoard className="h-5 w-5 animate-soft-pulse" />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <label className="xl:col-span-2">
          <span className="mb-2 block text-sm font-medium text-slate-300">Description</span>
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            maxLength={255}
            className="finance-input w-full rounded-xl px-4 py-3 text-sm outline-none transition focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10"
            placeholder="Terminal subscription"
          />
        </label>
        <label>
          <span className="mb-2 block text-sm font-medium text-slate-300">Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="finance-input w-full rounded-xl px-4 py-3 text-sm outline-none transition focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-2 block text-sm font-medium text-slate-300">Amount</span>
          <input
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            required
            min="0.01"
            step="0.01"
            type="number"
            className="finance-input w-full rounded-xl px-4 py-3 text-sm outline-none transition focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10"
            placeholder="125.50"
          />
        </label>
        <label>
          <span className="mb-2 block text-sm font-medium text-slate-300">Date</span>
          <input
            value={expenseDate}
            onChange={(event) => setExpenseDate(event.target.value)}
            required
            type="date"
            className="finance-input w-full rounded-xl px-4 py-3 text-sm outline-none transition focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10"
          />
        </label>
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.22)] transition hover:-translate-y-0.5 hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-cyan-800 disabled:text-cyan-200 md:self-end"
        >
          <Plus className={`h-4 w-4 ${disabled ? "animate-spin" : ""}`} />
          {disabled ? "Saving..." : "Add Expense"}
        </button>
      </form>
    </section>
  );
}
