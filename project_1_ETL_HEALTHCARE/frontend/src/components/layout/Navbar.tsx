import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

      <div className="relative">

        <Search
          className="absolute left-3 top-3 text-slate-400"
          size={18}
        />

        <input
          placeholder="Search..."
          className="w-80 rounded-xl border bg-slate-100 py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-cyan-400"
        />

      </div>

      <div className="flex items-center gap-6">

        <Bell className="cursor-pointer" />

        <div className="text-right">

          <h3 className="font-semibold">
            Vic
          </h3>

          <p className="text-sm text-slate-500">
            Administrator
          </p>

        </div>

      </div>

    </header>
  );
}