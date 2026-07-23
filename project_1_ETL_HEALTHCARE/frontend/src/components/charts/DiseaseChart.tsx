import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { disease: "Flu", cases: 350 },
  { disease: "Malaria", cases: 620 },
  { disease: "COVID", cases: 180 },
  { disease: "Diabetes", cases: 220 },
];

export default function DiseaseChart() {
  return (
    <div className="rounded-3xl bg-[#12263A] p-6 shadow-xl">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Disease Trends
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="disease" stroke="#CBD5E1" />
          <Tooltip />
          <Bar dataKey="cases" fill="#3B82F6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}