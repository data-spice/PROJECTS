import KPICard from "./KPICard";
import type { DashboardSummary } from "../types/dashboard";

type Props = {
  data: DashboardSummary;
};

export default function StatGrid({ data }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

      <KPICard
        title="Hospitals"
        value={data.hospitals}
      />

      <KPICard
        title="Patients"
        value={data.patients}
      />

      <KPICard
        title="Doctors"
        value={data.doctors}
      />

      <KPICard
        title="Admissions"
        value={data.admissions}
      />

    </div>
  );
}