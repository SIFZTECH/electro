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
import DashboardForNonCustomer from "./DashboardForNonCustomer";

const DashboardPage = () => {
  const { isAdmin, isDealer, user } = useUser();
  const { data, isLoading, error, isError } = useWarranties();

  if (isAdmin || isDealer) {
    return <DashboardForNonCustomer />;
  } else {
    return (
      <>
        <div className="bg-white shadow-sm rounded-lg py-4 flex items-center">
          <div className="ml-2">
            <h2 className="text-2xl font-semibold mt-3">
              Welcome to Dashboard{" "}
              <span className="text-color-primary">
                {user?.firstname} {user?.lastname}!
              </span>{" "}
              <span className="wave">👋🏾</span>
            </h2>
          </div>
        </div>
        {isLoading ? (
          <div className="mt-12">
            <SkeletonWarranty />
          </div>
        ) : (
          <div className="mt-12">
            <h1 className="text-xl font-medium mt-6 font-serif">
              Your Recent Warranty Registrations
            </h1>
            {!isLoading && isError && error && (
              <h1 className="mt-2 p-3 bg-white shadow-md inline-block border border-gray-100">
                {error?.response?.data?.message || error.message}
              </h1>
            )}
            {!isLoading && !isError && !error && data && (
              <RecentWarranties data={data} />
            )}
          </div>
        )}
      </>
    );
  }
};

export default DashboardPage;
