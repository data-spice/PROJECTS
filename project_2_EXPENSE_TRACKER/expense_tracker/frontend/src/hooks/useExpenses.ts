import { useCallback, useEffect, useMemo, useState } from "react";
import { createExpense, deleteExpense, fetchExpenses, fetchTotalExpenses } from "../services/api";
import type { Expense, ExpensePayload } from "../types/expense";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

export function useExpenses(categoryFilter = "") {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadExpenses = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [expenseData, totalData] = await Promise.all([
        fetchExpenses(categoryFilter),
        fetchTotalExpenses(),
      ]);
      setExpenses(expenseData);
      setTotal(totalData);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [categoryFilter]);

  useEffect(() => {
    void loadExpenses();
  }, [loadExpenses]);

  useEffect(() => {
    if (!successMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => setSuccessMessage(""), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [successMessage]);

  const addExpense = useCallback(
    async (payload: ExpensePayload) => {
      setMutating(true);
      setError("");

      try {
        await createExpense(payload);
        setSuccessMessage("Expense added successfully.");
        await loadExpenses();
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setMutating(false);
      }
    },
    [loadExpenses],
  );

  const removeExpense = useCallback(
    async (id: number) => {
      setMutating(true);
      setError("");

      try {
        await deleteExpense(id);
        setSuccessMessage("Expense deleted successfully.");
        await loadExpenses();
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setMutating(false);
      }
    },
    [loadExpenses],
  );

  const stats = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const monthPrefix = today.slice(0, 7);

    const todayTotal = expenses
      .filter((expense) => expense.expense_date === today)
      .reduce((sum, expense) => sum + Number(expense.amount), 0);

    const monthlyTotal = expenses
      .filter((expense) => expense.expense_date.startsWith(monthPrefix))
      .reduce((sum, expense) => sum + Number(expense.amount), 0);

    return {
      total,
      todayTotal,
      monthlyTotal,
      count: expenses.length,
    };
  }, [expenses, total]);

  return {
    expenses,
    stats,
    loading,
    mutating,
    error,
    successMessage,
    addExpense,
    removeExpense,
    refresh: loadExpenses,
  };
}
