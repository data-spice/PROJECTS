import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import { useAdmissions } from "../../hooks/useAdmissions";

export default function AdmissionsChart() {

    const data = useAdmissions();

    const chartData = data.map(item => ({

        month: new Date(
            item.year,
            item.month - 1
        ).toLocaleString("default", {

            month: "short"

        }),

        admissions: item.total_admissions

    }));

    return (

        <div className="rounded-3xl bg-slate-900 p-6 shadow-xl">

            <h2 className="mb-6 text-xl font-bold text-white">

                Monthly Admissions

            </h2>

            <ResponsiveContainer width="100%" height={350}>

                <LineChart data={chartData}>

                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis dataKey="month"/>

                    <YAxis/>

                    <Tooltip/>

                    <Line

                        dataKey="admissions"

                        stroke="#00E5FF"

                        strokeWidth={3}

                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}