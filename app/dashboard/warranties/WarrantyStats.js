import { useWarrantyStats } from "@/app/_features/warranties/useWarranties";
import Stat from "./WarrantyStat";

const Stats = () => {
  const { data, isLoading, isError, error } = useWarrantyStats();

  return (
    <>
      {!isLoading && !isError && !error && data && (
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-4">
          <Stat
            title="Weekly Warranties"
            value={data?.data?.weekly_warranties || 0}
          />
          <Stat
            title="Last 30 Days Warranties"
            value={data?.data?.last_30_days_count || 0}
          />
          <Stat
            title="Year to Date Warranties"
            value={data?.data?.year_to_date_warranties || 0}
          />
          <Stat
            title="Total Warranties"
            value={data?.data?.total_warranties || 0}
          />
        </div>
      )}
    </>
  );
};

export default Stats;
