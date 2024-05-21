import PieCharts from "../ui/PieCharts";
import RecentOrder from "../ui/RecentOrder";
import Stats from "../ui/Stats";

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
