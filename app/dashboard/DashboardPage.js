"use client";

import PieCharts from "@/app/components/ui/PieCharts";
import RecentOrder from "@/app/components/ui/RecentOrder";
import Stats from "@/app/components/ui/Stats";
import useCheckPermission from "../_hooks/usePermission";
import NotFoundData from "../components/ui/NotFoundData";
import NoPermission from "../components/ui/NoPermission";
import { useUser } from "../_features/authentication/useUser";
import DealerPortalChart from "../components/ui/DealerPortalChart";
import WarrantyProducts from "./warranties/WarrantyProducts";
import Spinner from "../components/ui/Spinner";
import { useWarranties } from "../_features/warranties/useWarranties";
import RecentWarranties from "./RecentWarranties";
import { useDashboardStats } from "../_features/stats/useDashboardStats";

const DashboardPage = () => {
  const { isAdmin, isDealer, user } = useUser();
  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
    error: error2,
  } = useDashboardStats();

  const { data, isLoading, error, isError } = useWarranties();

  if (isLoading || isLoading2) {
    return <Spinner />;
  }

  console.log(data2);
  if (isAdmin || isDealer) {
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
  } else {
    return (
      <>
        <h1 className="text-2xl font-medium font-serif">
          Welcome to Dashboard,{" "}
          <span className="font-semibold">
            {user?.firstname} {user?.lastname}
          </span>
          <span className="wave">👋</span>
        </h1>
        <div className="mt-12">
          <h1 className="text-xl font-medium mt-6 font-serif">
            Your Recent Warranty Registrations
          </h1>
          {!isLoading && !isError && !error && <RecentWarranties data={data} />}
        </div>
      </>
    );
  }
};

export default DashboardPage;
