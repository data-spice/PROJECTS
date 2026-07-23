import {
  Building2,
  Users,
  UserRound,
  Activity,
} from "lucide-react";

import KPICard from "./KPICard";
import type { DashboardSummary } from "../../types/dashboard";

type Props = {
  data: DashboardSummary;
};

export default function KPIGrid({ data }: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-4">

      <KPICard
        title="Hospitals"
        value={data.hospitals}
        icon={Building2}
        color="#06B6D4"
        trend="12% this month"
      />

      <KPICard
        title="Patients"
        value={data.patients}
        icon={Users}
        color="#3B82F6"
        trend="8% increase"
      />

      <KPICard
        title="Doctors"
        value={data.doctors}
        icon={UserRound}
        color="#10B981"
        trend="5% increase"
      />

      <KPICard
        title="Admissions"
        value={data.admissions}
        icon={Activity}
        color="#8B5CF6"
        trend="18% increase"
      />

    </div>
  );
}