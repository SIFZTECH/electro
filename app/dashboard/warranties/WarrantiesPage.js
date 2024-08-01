"use client";

import Link from "next/link";
import WarrantyProducts from "./WarrantyProducts";
import Stats from "./WarrantyStats";
import Spinner from "@/app/components/ui/Spinner";
import { useWarrantiesForAdmin } from "@/app/_features/warranties/useWarranties";
import NotFoundData from "@/app/components/ui/NotFoundData";
import PaginationUI from "@/app/components/ui/PaginationUI";
import { useSearchParams } from "next/navigation";
import { WARRANTY_PAGE_SIZE } from "@/app/lib/utils";
import useCheckPermission from "@/app/_hooks/usePermission";

const WarrantiesPage = () => {
  const params = useSearchParams();
  const page = params.get("page") ? +params.get("page") : 1;
  const { data, isLoading, error, isError } = useWarrantiesForAdmin(page);
  const isCreateWarrantyPermission = useCheckPermission("create_warranty");

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="heading-h1 my-6">Customer Warranty Registration</h1>
      <Stats />
      <div className="w-full flex justify-end">
        {isCreateWarrantyPermission && (
          <Link href="warranty/registration" className="btn-primary my-6">
            Add New Warranty
          </Link>
        )}
      </div>

      {!isLoading && !isError && !error && (
        <WarrantyProducts data={data?.warranties} />
      )}
      {!isLoading && isError && error && (
        <NotFoundData
          message={
            error?.response.data.message
              ? error.response.data.message
              : error.message
          }
        />
      )}
      {/* <PaginationUI
        data={data?.warranties}
        page={page}
        page_size={WARRANTY_PAGE_SIZE}
        navigation="warranties"
      /> */}
    </div>
  );
};

export default WarrantiesPage;
