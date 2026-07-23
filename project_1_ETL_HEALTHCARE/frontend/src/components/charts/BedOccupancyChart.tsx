import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Tooltip,
    Cell,
} from "recharts";

import { useBeds } from "../../hooks/useBeds";

const COLORS = [

"#00E5FF",
"#00C853",
"#7C4DFF",
"#FF5252",
"#FFC400"

];

export default function BedOccupancyChart(){

const data = useBeds();

const chartData=data.map(h=>({

name:h.hospital_name,

value:h.occupancy_rate

}));

return(

<div className="rounded-3xl bg-slate-900 p-6 shadow-xl">

<h2 className="mb-6 text-white text-xl font-bold">

Bed Utilization

</h2>

<ResponsiveContainer width="100%" height={350}>

<PieChart>

<Pie

data={chartData}

dataKey="value"

nameKey="name"

outerRadius={120}

>

{

chartData.map((_,index)=>(

<Cell

key={index}

fill={COLORS[index%COLORS.length]}

/>

))

}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

);

}