import type { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  note: string;
  trend: string;
}

export function DashboardCard({ title, value, icon: Icon, note, trend }: DashboardCardProps) {
  return (
    <article className="glass-panel animate-panel-in rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/30">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{title}</p>
          <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-200">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full w-2/3 rounded-full bg-cyan-300 animate-soft-pulse" />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <p className="text-slate-400">{note}</p>
        <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-200">
          {trend}
        </span>
      </div>
    </article>
  );
}
