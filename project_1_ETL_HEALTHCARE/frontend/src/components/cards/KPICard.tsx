import CountUp from "react-countup";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  trend: string;
};

export default function KPICard({
  title,
  value,
  icon: Icon,
  color,
  trend,
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
      className="rounded-3xl bg-[#12263A] p-6 shadow-2xl"
    >
      <div className="flex justify-between">

        <div>

          <p className="text-slate-400">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-bold text-white">

            <CountUp
              end={value}
              duration={2}
              separator=","
            />

          </h2>

          <p className="mt-4 text-sm text-green-400">
            ↑ {trend}
          </p>

        </div>

        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{
            background: color,
          }}
        >
          <Icon
            size={30}
            color="white"
          />
        </div>

      </div>
    </motion.div>
  );
}