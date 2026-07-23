import axios from "axios";
import type { Expense, ExpensePayload, TotalResponse } from "../types/expense";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchExpenses(category?: string): Promise<Expense[]> {
  const normalizedCategory = category?.trim();
  const endpoint = normalizedCategory ? `/expenses/category/${encodeURIComponent(normalizedCategory)}` : "/expenses";
  const response = await apiClient.get<Expense[]>(endpoint);
  return response.data;
}

export async function fetchTotalExpenses(): Promise<number> {
  const response = await apiClient.get<TotalResponse>("/expenses/total");
  return Number(response.data.total);
}

export async function createExpense(payload: ExpensePayload): Promise<Expense> {
  const response = await apiClient.post<Expense>("/expenses", payload);
  return response.data;
}

export async function deleteExpense(id: number): Promise<void> {
  await apiClient.delete(`/expenses/${id}`);
}
