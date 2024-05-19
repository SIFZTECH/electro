import { Pie, PieChart, ResponsiveContainer } from "recharts";
import Stats from "./ui/Stats";
import PieCharts from "./ui/PieCharts";
import RecentOrder from "./ui/RecentOrder";

const page = () => {
  return (
    <div>
      <Stats />

      <PieCharts />
      <RecentOrder />
    </div>
  );
};

export default page;
