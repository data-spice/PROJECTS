import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", tests: 1200 },
  { month: "Feb", tests: 1400 },
  { month: "Mar", tests: 1700 },
  { month: "Apr", tests: 1600 },
  { month: "May", tests: 2000 },
  { month: "Jun", tests: 2150 },
];

export default function LabWorkloadChart() {
  return (
    <div className="rounded-3xl bg-[#12263A] p-6 shadow-xl">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Laboratory Workload
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid stroke="#23384F" />
          <XAxis dataKey="month" stroke="#CBD5E1" />
          <YAxis stroke="#CBD5E1" />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="tests"
            stroke="#10B981"
            fill="#10B981"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}