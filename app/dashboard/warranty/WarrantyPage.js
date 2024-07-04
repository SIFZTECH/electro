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

  console.log(data, error);
  return (
    <div>
      <div className="flex items-center justify-between my-4 mb-8">
        <h1 className="heading-h1">SEB Customer Warranty Registration</h1>
        {isCreateWarrantyPermission && (
          <Link href="warranty/registration" className="btn-primary">
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
