"use client";

import Search from "@/app/components/ui/Search";
import Orders from "./Orders";
import useCheckPermission from "@/app/_hooks/usePermission";
import NoPermission from "@/app/components/ui/NoPermission";
import Link from "next/link";

const ClickAndCollectPage = () => {
  const isClickAndCollectPermission = useCheckPermission("click_and_collect");

  if (!isClickAndCollectPermission) {
    return (
      <NoPermission message="You don't have permission to access this route" />
    );
  }
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center">
        <h1 className="heading-h1 mb-8 mt-4">Click and Collect</h1>
        <div className="flex justify-end px-3">
          <Link
            className="btn-primary"
            href="/dashboard/click-and-collect/create-order"
          >
            Create Order
          </Link>
        </div>
      </div>

      <Orders />
    </div>
  );
};

export default ClickAndCollectPage;
