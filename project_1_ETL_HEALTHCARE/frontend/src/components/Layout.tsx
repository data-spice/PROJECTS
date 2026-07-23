import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100">

        <Navbar />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}