"use client";

import Link from "next/link";
import WarrantyProducts from "./WarrantyProducts";
import Stats from "./WarrantyStats";
import Spinner from "@/app/components/ui/Spinner";
import { useWarranties } from "@/app/_features/warranties/useWarranties";
import useCheckPermission from "@/app/_hooks/usePermission";
import NoPermission from "@/app/components/ui/NoPermission";

const WarrantyPage = () => {
  const { data, isLoading, error, isError } = useWarranties();
  const isCreateWarrantyPermission = useCheckPermission("create_warranty");
  const isWarrantyListPermission = useCheckPermission("warranty");

  if (!isWarrantyListPermission) {
    return (
      <NoPermission message="You don't have permission to access this route" />
    );
  }

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
        {isCreateWarrantyPermission && (
          <Link href="warranty/registration" className="btn-primary my-6 mb-14">
            Add New Warranty
          </Link>
        )}
      </div>
      {!isLoading && isError && error && (
        <NoPermission className="font-serif text-center text-xl mt-6">
          {error?.response.data.message
            ? error.response.data.message
            : error.message}
        </NoPermission>
      )}
      {!isLoading && !isError && !error && <WarrantyProducts data={data} />}
    </div>
  );
};

export default WarrantyPage;
