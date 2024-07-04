"use client";

import PieCharts from "@/app/components/ui/PieCharts";
import RecentOrder from "@/app/components/ui/RecentOrder";
import Stats from "@/app/components/ui/Stats";

import { useUser } from "../_features/authentication/useUser";

import Spinner from "../components/ui/Spinner";
import { useWarranties } from "../_features/warranties/useWarranties";
import RecentWarranties from "./RecentWarranties";
import { useDashboardStats } from "../_features/stats/useDashboardStats";
import Image from "next/image";
import { BASE_URL_IMAGE } from "../lib/utils";
import { SkeletonFiler } from "../components/ui/SkeletonFilter";
import { SkeletonWarranty } from "../components/ui/SkeletonWarranty";

const DashboardPage = () => {
  const { isAdmin, isDealer, user } = useUser();
  const { data, isLoading, error, isError } = useWarranties();

  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
    error: error2,
  } = useDashboardStats();

  if (isLoading) {
    return <Spinner />;
  }

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
        <div className="bg-white shadow-sm rounded-lg py-4 flex items-center">
          <div className="ml-2">
            <Image src="/banner.jpeg" height={100} width={200} alt="Banner" />
            <h2 className="text-2xl font-semibold mt-3">
              Welcome to Dashboard{" "}
              <span className="text-color-primary">
                {user?.firstname} {user?.lastname}!
              </span>{" "}
              <span className="wave">👋🏾</span>
            </h2>
          </div>
        </div>
        {isLoading2 ? (
          <div className="mt-12">
            <SkeletonWarranty />
          </div>
        ) : (
          <div className="mt-12">
            <h1 className="text-xl font-medium mt-6 font-serif">
              Your Recent Warranty Registrations
            </h1>
            {!isLoading && !isError && !error && (
              <RecentWarranties data={data} />
            )}
          </div>
        )}
      </>
    );
  }
};

export default DashboardPage;
