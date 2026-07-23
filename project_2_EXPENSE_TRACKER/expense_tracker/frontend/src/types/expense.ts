export interface Expense {
  id: number;
  description: string;
  category: string;
  amount: string;
  expense_date: string;
  created_at: string;
}

export interface ExpensePayload {
  description: string;
  category: string;
  amount: number;
  expense_date: string;
}

export interface TotalResponse {
  total: string;
}
