"use client";

import Link from "next/link";
import WarrantyProducts from "./WarrantyProducts";
import Stats from "./WarrantyStats";
import Spinner from "@/app/components/ui/Spinner";
import { useWarrantiesForAdmin } from "@/app/_features/warranties/useWarranties";
import NotFoundData from "@/app/components/ui/NotFoundData";

const WarrantiesPage = () => {
  const { data, isLoading, error, isError } = useWarrantiesForAdmin();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="heading-h1 my-6">SEB Customer Warranty Registration</h1>
      <Stats
        title="Month to Warranty Registrations"
        value={452}
        percentage={0.03}
      />

      {!isLoading && !isError && !error && <WarrantyProducts data={data} />}
      {!isLoading && isError && error && (
        <NotFoundData
          message={
            error?.response.data.message
              ? error.response.data.message
              : error.message
          }
        />
      )}
    </div>
  );
};

export default WarrantiesPage;
