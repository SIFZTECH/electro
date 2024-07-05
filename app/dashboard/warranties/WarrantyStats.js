import { useWarrantyStats } from "@/app/_features/warranties/useWarranties";
import Stat from "./WarrantyStat";

const Stats = () => {
  const { data, isLoading, isError, error } = useWarrantyStats();

  return (
    <>
      {!isLoading && !isError && !error && data && (
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-3 lg:gap-10">
          <Stat
            title="Month to Warranty Registration"
            value={data.data.last_month_count || 0}
          />
          <Stat
            title="Last 30 days Warranty Registration"
            value={data.data.last_30_days_count || 0}
          />
          <Stat
            title="Month to Warranty Registration"
            value={data?.data.last_12_months_count[0]?.count || 0}
          />
        </div>
      )}
    </>
  );
};

export default Stats;
