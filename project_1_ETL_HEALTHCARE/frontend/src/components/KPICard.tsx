type Props = {
  title: string;
  value: number | string;
};

export default function KPICard({ title, value }: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h3 className="text-sm text-gray-500">{title}</h3>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}