import axios from "axios";
import type { DashboardSummary } from "../types/dashboard";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const response = await api.get("/dashboard/summary");
  return response.data;
}