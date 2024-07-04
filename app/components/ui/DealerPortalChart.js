import React, { PureComponent } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Dealer A",
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: "Dealer B",
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: "Dealer C",
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: "Dealer D",
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: "Dealer E",
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: "Dealer F",
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
];

export default function DealerPortalChart({ title }) {
  return (
    <>
      <div className="col-span-2 flex items-center justify-center flex-col">
        <h1 className="text-xl font-semibold font-serif">{title}</h1>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart
            layout="vertical"
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" scale="band" />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" barSize={20} fill="#FFB500" />
            <Line dataKey="uv" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
