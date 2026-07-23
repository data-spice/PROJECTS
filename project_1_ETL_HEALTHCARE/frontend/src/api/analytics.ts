import axios from "axios";

import type {
  MonthlyAdmission,
  BedUtilization,
  DiseaseTrend,
  LabWorkload,
} from "../types/analytics";

const API = "http://127.0.0.1:8000";

export async function getMonthlyAdmissions(): Promise<MonthlyAdmission[]> {
  const res = await axios.get(`${API}/analytics/monthly-admissions`);
  return res.data;
}

export async function getBedUtilization(): Promise<BedUtilization[]> {
  const res = await axios.get(`${API}/analytics/bed-utilization`);
  return res.data;
}

export async function getDiseaseTrends(): Promise<DiseaseTrend[]> {
  const res = await axios.get(`${API}/analytics/disease-trends`);
  return res.data;
}

export async function getLabWorkload(): Promise<LabWorkload[]> {
  const res = await axios.get(`${API}/analytics/lab-workload`);
  return res.data;
}