import { useDashboardStats } from "../_features/stats/useDashboardStats";
import PieCharts from "../components/ui/PieCharts";
import RecentOrder from "../components/ui/RecentOrder";
import Stats from "../components/ui/Stats";

const DashboardForNonCustomer = () => {
  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
    error: error2,
  } = useDashboardStats();

  return (
    <div>
      <Stats
        isError={isError2}
        isLoading={isLoading2}
        error={error2}
        data={data2}
      />

      <PieCharts data={data2?.data} />
      <RecentOrder />
    </div>
  );
};

export default DashboardForNonCustomer;
