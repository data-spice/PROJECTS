export default function Sidebar() {
  return (
    <aside className="min-h-screen w-64 bg-slate-900 p-6 text-white">

      <h2 className="mb-8 text-2xl font-bold">
        Dashboard
      </h2>

      <nav className="space-y-4">

        <p>Overview</p>

        <p>Hospitals</p>

        <p>Admissions</p>

        <p>Doctors</p>

        <p>Laboratory</p>

        <p>Inventory</p>

      </nav>

    </aside>
  );
}