import PieCharts from "@/app/components/ui/PieCharts";
import RecentOrder from "@/app/components/ui/RecentOrder";
import Stats from "@/app/components/ui/Stats";

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
