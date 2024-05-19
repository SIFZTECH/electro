import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const Chart = ({ startData, title }) => {
  return (
    <div>
      <h1 className="text-xl font-semibold">{title}</h1>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={startData}
            dataKey="value"
            nameKey="name"
            cx="30%"
            cy="50%"
            outerRadius={140}
          >
            {startData.map((entry) => (
              <Cell fill={entry.color} stroke={entry.color} key={entry.name} />
            ))}
          </Pie>
          <Legend
            verticalAlign="top"
            align="bottom"
            layout="horizontal"
            iconSize={14}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
