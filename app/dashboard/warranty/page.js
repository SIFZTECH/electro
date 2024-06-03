"use client";

import Link from "next/link";
import WarrantyProducts from "./WarrantyProducts";
import Stats from "./WarrantyStats";
import Spinner from "@/app/components/ui/Spinner";
import { useWarranties } from "@/app/_features/warranties/useWarranties";

const WarrantyPage = () => {
  const { data, isLoading, error, isError } = useWarranties();

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
      <div className="w-full flex justify-end">
        <Link href="warranty/registration" className="btn-primary my-6 mb-14">
          Add New Warranty
        </Link>
      </div>

      {!isError && !error && <WarrantyProducts data={data} />}
      {isError && error && (
        <h1>
          {error?.response.data.message
            ? error.response.data.message
            : error.message}
        </h1>
      )}
    </div>
  );
};

export default WarrantyPage;
