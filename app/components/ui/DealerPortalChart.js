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

export default function DealerPortalChart({ title, engagements }) {
  return (
    <>
      <div className="2xl:col-span-2 flex items-center justify-center flex-col">
        <h1 className="text-xl font-semibold font-serif">{title}</h1>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart
            layout="vertical"
            width={500}
            height={400}
            data={engagements}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis type="number" />
            <YAxis dataKey="user" type="category" scale="band" />
            <Tooltip />
            <Legend />
            <Bar dataKey="engagements" barSize={20} fill="#334155" />
            <Line dataKey="user" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
