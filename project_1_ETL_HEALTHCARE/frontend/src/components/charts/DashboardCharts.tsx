import AdmissionsChart from "./AdmissionsChart";
import BedOccupancyChart from "./BedOccupancyChart";
import DiseaseChart from "./DiseaseChart";
import LabWorkloadChart from "./LabWorkloadChart";

export default function DashboardCharts() {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <AdmissionsChart />

      <BedOccupancyChart />

      <DiseaseChart />

      <LabWorkloadChart />
    </div>
  );
}