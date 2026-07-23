import { Activity, BarChart3, Filter, PieChart, RotateCcw, TrendingUp, WalletCards } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useExpenses } from "../hooks/useExpenses";
import type { Expense } from "../types/expense";

interface CategorySlice {
  category: string;
  total: number;
  percentage: number;
  color: string;
}

interface PeriodPoint {
  label: string;
  total: number;
  color: string;
}

interface CategoryComparisonRow {
  category: string;
  currentTotal: number;
  previousTotal: number;
  color: string;
}

const graphColors = ["#c084fc", "#f472b6", "#22d3ee", "#facc15", "#34d399", "#60a5fa", "#f97316", "#fb7185"];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function getMonthLabel(value: string): string {
  const date = new Date(`${value}-01T00:00:00`);
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "2-digit" }).format(date);
}

function getDayLabel(value: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(`${value}T00:00:00`));
}

function parseDateInput(value: string): Date {
  return new Date(`${value}T00:00:00`);
}

function formatDateInput(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function getPreviousRange(startDate: string, endDate: string): { previousStart: string; previousEnd: string } | null {
  if (!startDate || !endDate) {
    return null;
  }

  const start = parseDateInput(startDate);
  const end = parseDateInput(endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
    return null;
  }

  const dayMs = 24 * 60 * 60 * 1000;
  const rangeDays = Math.round((end.getTime() - start.getTime()) / dayMs) + 1;
  const previousEnd = new Date(start.getTime() - dayMs);
  const previousStart = new Date(previousEnd.getTime() - (rangeDays - 1) * dayMs);

  return {
    previousStart: formatDateInput(previousStart),
    previousEnd: formatDateInput(previousEnd),
  };
}

function getExpenseTotal(expenses: Expense[]): number {
  return expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
}

function getUniqueCategories(expenses: Expense[]): string[] {
  return Array.from(new Set(expenses.map((expense) => expense.category))).sort((a, b) => a.localeCompare(b));
}

function filterExpenses(expenses: Expense[], startDate: string, endDate: string, category: string): Expense[] {
  return expenses.filter((expense) => {
    const matchesStart = startDate ? expense.expense_date >= startDate : true;
    const matchesEnd = endDate ? expense.expense_date <= endDate : true;
    const matchesCategory = category ? expense.category === category : true;
    return matchesStart && matchesEnd && matchesCategory;
  });
}

function groupByCategory(expenses: Expense[], total: number): CategorySlice[] {
  const totals = expenses.reduce<Record<string, number>>((acc, expense) => {
    acc[expense.category] = (acc[expense.category] ?? 0) + Number(expense.amount);
    return acc;
  }, {});

  return Object.entries(totals)
    .map(([category, categoryTotal], index) => ({
      category,
      total: categoryTotal,
      percentage: total > 0 ? (categoryTotal / total) * 100 : 0,
      color: graphColors[index % graphColors.length],
    }))
    .sort((a, b) => b.total - a.total);
}

function groupByMonth(expenses: Expense[]): PeriodPoint[] {
  const totals = expenses.reduce<Record<string, number>>((acc, expense) => {
    const month = expense.expense_date.slice(0, 7);
    acc[month] = (acc[month] ?? 0) + Number(expense.amount);
    return acc;
  }, {});

  return Object.entries(totals)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, total], index) => ({ label: getMonthLabel(month), total, color: graphColors[index % graphColors.length] }));
}

function groupByRecentDays(expenses: Expense[]): PeriodPoint[] {
  const totals = expenses.reduce<Record<string, number>>((acc, expense) => {
    acc[expense.expense_date] = (acc[expense.expense_date] ?? 0) + Number(expense.amount);
    return acc;
  }, {});

  return Object.entries(totals)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-7)
    .map(([day, total], index) => ({ label: getDayLabel(day), total, color: graphColors[index % graphColors.length] }));
}

function getCategoryComparison(current: CategorySlice[], previousExpenses: Expense[]): CategoryComparisonRow[] {
  const previousTotals = previousExpenses.reduce<Record<string, number>>((acc, expense) => {
    acc[expense.category] = (acc[expense.category] ?? 0) + Number(expense.amount);
    return acc;
  }, {});

  const categories = Array.from(new Set([...current.map((item) => item.category), ...Object.keys(previousTotals)]));
  return categories
    .map((category, index) => ({
      category,
      currentTotal: current.find((item) => item.category === category)?.total ?? 0,
      previousTotal: previousTotals[category] ?? 0,
      color: current.find((item) => item.category === category)?.color ?? graphColors[index % graphColors.length],
    }))
    .sort((a, b) => b.currentTotal + b.previousTotal - (a.currentTotal + a.previousTotal));
}

function AnalyticsStat({ label, value, caption, icon: Icon }: {
  label: string;
  value: string;
  caption: string;
  icon: LucideIcon;
}) {
  return (
    <article className="glass-panel animate-panel-in rounded-2xl p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
          <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-fuchsia-300/20 bg-fuchsia-400/10 text-fuchsia-200">
          <Icon className="h-5 w-5 animate-soft-pulse" />
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-400">{caption}</p>
    </article>
  );
}

function BarGraph({ title, points }: { title: string; points: PeriodPoint[] }) {
  const max = Math.max(...points.map((point) => point.total), 1);

  return (
    <section className="glass-panel animate-panel-in rounded-2xl p-5">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-300">Trend Model</p>
          <h3 className="mt-2 text-lg font-semibold text-white">{title}</h3>
        </div>
        <BarChart3 className="h-6 w-6 text-fuchsia-300" />
      </div>
      <div className="flex h-64 items-end gap-3">
        {points.length > 0 ? (
          points.map((point) => (
            <div key={point.label} className="flex h-full flex-1 flex-col justify-end gap-3">
              <div className="relative flex flex-1 items-end overflow-hidden rounded-xl border border-cyan-300/10 bg-white/[0.03]">
                <div
                  className="w-full rounded-t-xl transition-all duration-700"
                  style={{
                    height: `${Math.max((point.total / max) * 100, 6)}%`,
                    background: `linear-gradient(180deg, ${point.color}, ${point.color}99)`,
                    boxShadow: `0 0 24px ${point.color}55`,
                  }}
                />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-slate-300">{formatCurrency(point.total)}</p>
                <p className="mt-1 text-xs text-slate-500">{point.label}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-1 items-center justify-center text-sm text-slate-400">No trend data available.</div>
        )}
      </div>
    </section>
  );
}

function CategoryAllocation({ categories }: { categories: CategorySlice[] }) {
  return (
    <section className="glass-panel animate-panel-in rounded-2xl p-5">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Allocation</p>
          <h3 className="mt-2 text-lg font-semibold text-white">Category Exposure</h3>
        </div>
        <PieChart className="h-6 w-6 text-cyan-300" />
      </div>
      <div className="space-y-4">
        {categories.length > 0 ? (
          categories.map((item) => (
            <div key={item.category}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-200">{item.category}</span>
                <span className="text-slate-400">{item.percentage.toFixed(1)}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.max(item.percentage, 3)}%`,
                    background: item.color,
                    boxShadow: `0 0 18px ${item.color}66`,
                  }}
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">{formatCurrency(item.total)}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400">No category data available.</p>
        )}
      </div>
    </section>
  );
}

function CategoryComparison({ rows, hasPreviousRange }: { rows: CategoryComparisonRow[]; hasPreviousRange: boolean }) {
  const max = Math.max(...rows.flatMap((item) => [item.currentTotal, item.previousTotal]), 1);

  return (
    <section className="glass-panel animate-panel-in rounded-2xl p-5">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-300">Comparison</p>
          <h3 className="mt-2 text-lg font-semibold text-white">Current vs Previous Category Spend</h3>
          <p className="mt-1 text-xs text-slate-500">
            {hasPreviousRange ? "Two plots compare selected range with the previous matching period." : "Select a start and end date to activate the second plot."}
          </p>
        </div>
        <Filter className="h-6 w-6 text-fuchsia-300" />
      </div>
      <div className="mb-5 flex gap-4 text-xs font-semibold text-slate-400">
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-fuchsia-300" /> Current</span>
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-cyan-300" /> Previous</span>
      </div>
      <div className="space-y-3">
        {rows.length > 0 ? (
          rows.map((item) => (
            <div key={item.category} className="grid grid-cols-[110px_1fr_90px] items-center gap-3 text-sm">
              <span className="truncate font-medium text-slate-300">{item.category}</span>
              <div className="space-y-1.5">
              <div className="h-3 overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
                <div
                  className="h-full rounded-lg transition-all duration-700"
                  style={{
                    width: `${Math.max((item.currentTotal / max) * 100, item.currentTotal > 0 ? 4 : 0)}%`,
                    background: `linear-gradient(90deg, ${item.color}, ${item.color}99)`,
                    boxShadow: `0 0 20px ${item.color}66`,
                  }}
                />
              </div>
              <div className="h-3 overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
                <div
                  className="h-full rounded-lg bg-cyan-300 transition-all duration-700"
                  style={{
                    width: `${Math.max((item.previousTotal / max) * 100, item.previousTotal > 0 ? 4 : 0)}%`,
                    boxShadow: "0 0 20px rgba(34, 211, 238, 0.4)",
                  }}
                />
              </div>
              </div>
              <span className="text-right text-xs font-semibold text-slate-200">{formatCurrency(item.currentTotal)}</span>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400">No comparison data for this filter.</p>
        )}
      </div>
    </section>
  );
}

function SpendVelocity({ points, previousPoints, hasPreviousRange }: { points: PeriodPoint[]; previousPoints: PeriodPoint[]; hasPreviousRange: boolean }) {
  const width = 520;
  const height = 220;
  const max = Math.max(...points.map((point) => point.total), ...previousPoints.map((point) => point.total), 1);
  const buildCoordinates = (items: PeriodPoint[]) => items.map((point, index) => {
    const x = items.length === 1 ? width / 2 : (index / (items.length - 1)) * width;
    const y = height - (point.total / max) * (height - 20) - 10;
    return `${x},${y}`;
  });
  const coordinates = buildCoordinates(points);
  const previousCoordinates = buildCoordinates(previousPoints);

  return (
    <section className="glass-panel scanline animate-panel-in rounded-2xl border-fuchsia-300/20 p-5 xl:col-span-2">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-300">Velocity</p>
          <h3 className="mt-2 text-lg font-semibold text-white">Current vs Previous Spend Pulse</h3>
          <div className="mt-3 flex gap-4 text-xs font-semibold text-slate-400">
            <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-fuchsia-300" /> Current</span>
            <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-cyan-300" /> Previous</span>
          </div>
        </div>
        <TrendingUp className="h-6 w-6 text-fuchsia-300" />
      </div>
      {points.length > 0 ? (
        <>
          <svg viewBox={`0 0 ${width} ${height}`} className="h-64 w-full overflow-visible">
            <defs>
              <linearGradient id="velocityGradient" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="35%" stopColor="#a78bfa" />
                <stop offset="70%" stopColor="#fb7185" />
                <stop offset="100%" stopColor="#facc15" />
              </linearGradient>
            </defs>
            {hasPreviousRange && previousCoordinates.length > 0 ? (
              <polyline
                points={previousCoordinates.join(" ")}
                fill="none"
                stroke="#22d3ee"
                strokeDasharray="8 8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                opacity="0.85"
              />
            ) : null}
            <polyline
              points={coordinates.join(" ")}
              fill="none"
              stroke="url(#velocityGradient)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            />
            {hasPreviousRange
              ? previousCoordinates.map((coordinate, index) => {
                  const [x, y] = coordinate.split(",").map(Number);
                  return <circle key={`previous-${previousPoints[index].label}`} cx={x} cy={y} r="4" fill="#07111f" stroke="#22d3ee" strokeWidth="2" />;
                })
              : null}
            {coordinates.map((coordinate, index) => {
              const [x, y] = coordinate.split(",").map(Number);
              return <circle key={points[index].label} cx={x} cy={y} r="5" fill="#07111f" stroke={points[index].color} strokeWidth="2.5" />;
            })}
          </svg>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {points.map((point) => (
              <div key={point.label} className="rounded-xl border border-cyan-300/10 bg-white/[0.03] px-3 py-2">
                <p className="text-xs text-slate-500">{point.label}</p>
                <p className="mt-1 text-sm font-semibold text-slate-100">{formatCurrency(point.total)}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex h-64 items-center justify-center text-sm text-slate-400">No velocity data available.</div>
      )}
    </section>
  );
}

export function Analytics() {
  const { expenses, stats, loading, error } = useExpenses("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");

  const categoryOptions = useMemo(() => getUniqueCategories(expenses), [expenses]);

  const analytics = useMemo(() => {
    const previousRange = getPreviousRange(startDate, endDate);
    const filteredExpenses = filterExpenses(expenses, startDate, endDate, category);
    const previousExpenses = previousRange
      ? filterExpenses(expenses, previousRange.previousStart, previousRange.previousEnd, category)
      : [];
    const filteredTotal = getExpenseTotal(filteredExpenses);
    const categoryData = groupByCategory(filteredExpenses, filteredTotal);
    const monthlyData = groupByMonth(filteredExpenses);
    const recentDayData = groupByRecentDays(filteredExpenses);
    const previousRecentDayData = groupByRecentDays(previousExpenses);
    const categoryComparison = getCategoryComparison(categoryData, previousExpenses);
    const largestCategory = categoryData[0];
    const averageExpense = filteredExpenses.length > 0 ? filteredTotal / filteredExpenses.length : 0;

    return {
      categoryData,
      categoryComparison,
      monthlyData,
      recentDayData,
      previousRecentDayData,
      largestCategory,
      averageExpense,
      filteredTotal,
      transactionCount: filteredExpenses.length,
      hasPreviousRange: Boolean(previousRange),
    };
  }, [category, endDate, expenses, startDate]);

  function resetFilters() {
    setStartDate("");
    setEndDate("");
    setCategory("");
  }

  return (
    <div className="space-y-6">
      <div className="glass-panel scanline animate-panel-in rounded-3xl border-fuchsia-300/20 bg-fuchsia-950/20 p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-fuchsia-300">Analytics Terminal</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Spend Analytics</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Category exposure, spending velocity, and monthly trend analysis from your live expense ledger.
            </p>
          </div>
          <div className="ticker-window max-w-lg overflow-hidden rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-100">
            <span className="ticker-track inline-block whitespace-nowrap">
              ANALYTICS ONLINE - CATEGORY SIGNALS - MONTHLY TREND - CASHFLOW PULSE - ANALYTICS ONLINE -
            </span>
          </div>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>
      ) : null}

      <section className="glass-panel animate-panel-in rounded-2xl border-fuchsia-300/15 bg-fuchsia-950/10 p-5">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-300">Comparison Controls</p>
            <h3 className="mt-2 text-lg font-semibold text-white">Filter by time range and category</h3>
          </div>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-500/30 px-4 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <label>
            <span className="mb-2 block text-sm font-medium text-slate-300">Start date</span>
            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="finance-input w-full rounded-xl px-4 py-3 text-sm outline-none transition focus:border-fuchsia-300/70 focus:ring-4 focus:ring-fuchsia-300/10"
            />
          </label>
          <label>
            <span className="mb-2 block text-sm font-medium text-slate-300">End date</span>
            <input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              className="finance-input w-full rounded-xl px-4 py-3 text-sm outline-none transition focus:border-fuchsia-300/70 focus:ring-4 focus:ring-fuchsia-300/10"
            />
          </label>
          <label>
            <span className="mb-2 block text-sm font-medium text-slate-300">Category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="finance-input w-full rounded-xl px-4 py-3 text-sm outline-none transition focus:border-fuchsia-300/70 focus:ring-4 focus:ring-fuchsia-300/10"
            >
              <option value="">All categories</option>
              {categoryOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AnalyticsStat label="Average Expense" value={formatCurrency(analytics.averageExpense)} caption="Mean transaction value" icon={Activity} />
        <AnalyticsStat label="Top Category" value={analytics.largestCategory?.category ?? "None"} caption={analytics.largestCategory ? formatCurrency(analytics.largestCategory.total) : "No category exposure"} icon={PieChart} />
        <AnalyticsStat label="Transactions" value={String(analytics.transactionCount)} caption={`Filtered from ${stats.count} rows`} icon={WalletCards} />
        <AnalyticsStat label="Filtered Outflow" value={formatCurrency(analytics.filteredTotal)} caption={loading ? "Loading live total" : "Selected comparison basis"} icon={TrendingUp} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <SpendVelocity
          points={analytics.recentDayData}
          previousPoints={analytics.previousRecentDayData}
          hasPreviousRange={analytics.hasPreviousRange}
        />
        <CategoryAllocation categories={analytics.categoryData} />
      </div>

      <CategoryComparison rows={analytics.categoryComparison} hasPreviousRange={analytics.hasPreviousRange} />
      <BarGraph title="Monthly Spending Trend" points={analytics.monthlyData} />
    </div>
  );
}
