import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import KPIGrid from "../components/cards/KPIGrid";
import Charts from "../components/Charts";

import { getDashboardSummary } from "../api/dashboard";
import type { DashboardSummary } from "../types/dashboard";

export default function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    getDashboardSummary().then(setSummary);
  }, []);

  return (
    <Layout>
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">
          🏥 Healthcare Analytics Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Monitor hospital performance in real time
        </p>
      </div>

      {summary && <KPIGrid data={summary} />}

      <div className="mt-10">
        <Charts />
      </div>
    </Layout>
  );
}