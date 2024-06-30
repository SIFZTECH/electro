"use client";

import PieCharts from "@/app/components/ui/PieCharts";
import RecentOrder from "@/app/components/ui/RecentOrder";
import Stats from "@/app/components/ui/Stats";
import useCheckPermission from "../_hooks/usePermission";
import NotFoundData from "../components/ui/NotFoundData";
import NoPermission from "../components/ui/NoPermission";
import { useUser } from "../_features/authentication/useUser";
import DealerPortalChart from "../components/ui/DealerPortalChart";

const DashboardPage = () => {
  const isPermission = useCheckPermission("dashboard");

  if (isPermission) {
    return (
      <div>
        <Stats />

        <PieCharts />

        <RecentOrder />
      </div>
    );
  } else {
    return (
      <NoPermission message="You don't have permission to access that route!" />
    );
  }
};

export default DashboardPage;
