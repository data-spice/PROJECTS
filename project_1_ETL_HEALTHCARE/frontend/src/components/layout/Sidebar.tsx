import {
  LayoutDashboard,
  Building2,
  Users,
  UserRound,
  FlaskConical,
  Pill,
  BarChart3,
  FileText,
  Settings,
  HeartPulse,
} from "lucide-react";

const items = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Building2, label: "Hospitals" },
  { icon: Users, label: "Patients" },
  { icon: UserRound, label: "Doctors" },
  { icon: FlaskConical, label: "Laboratory" },
  { icon: Pill, label: "Pharmacy" },
  { icon: BarChart3, label: "Analytics" },
  { icon: FileText, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col bg-slate-950 text-white">

      <div className="flex items-center gap-3 border-b border-slate-800 p-6">

        <HeartPulse className="h-10 w-10 text-cyan-400" />

        <div>
          <h1 className="text-xl font-bold">
            HealthDW
          </h1>

          <p className="text-sm text-slate-400">
            Analytics Platform
          </p>
        </div>

      </div>

      <nav className="mt-6 flex-1">

        {items.map((item) => {

          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className="flex w-full items-center gap-4 px-6 py-4 text-slate-300 transition hover:bg-cyan-500/10 hover:text-cyan-400"
            >
              <Icon size={22} />
              {item.label}
            </button>
          );

        })}

      </nav>

    </aside>
  );
}