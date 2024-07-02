import { useWarrantyStats } from "@/app/_features/warranties/useWarranties";
import Stat from "./WarrantyStat";

const Stats = () => {
  const { data, isLoading, isError, error } = useWarrantyStats();

  console.log(data);
  return (
    <>
      {!isLoading && !isError && !error && data && (
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-3 lg:gap-10">
          <Stat
            title="Month to Warranty Registration"
            value={data.data.last_month_count}
          />
          <Stat
            title="Last 30 days Warranty Registration"
            value={data.data.last_30_days_count}
          />
          <Stat
            title="Month to Warranty Registration"
            value={data.data.last_12_months_count[0].count}
          />
        </div>
      )}
    </>
  );
};

export default Stats;
