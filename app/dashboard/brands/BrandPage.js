"use client";

import BrandTable from "./BrandTable";
import Spinner from "@/app/components/ui/Spinner";
import CreateNewBrand from "./CreateNewBrand";
import { useBrands } from "@/app/_features/brands/useBrands";
import useCheckPermission from "@/app/_hooks/usePermission";
import NoPermission from "@/app/components/ui/NoPermission";
import PaginationUI from "@/app/components/ui/PaginationUI";
import { useSearchParams } from "next/navigation";
import { TABLE_PAGE_SIZE } from "@/app/lib/utils";

const BrandPage = () => {
  const params = useSearchParams();
  const page = params.get("page") ? +params.get("page") : 1;
  const { data, isLoading, isError, error } = useBrands(page);
  const isCreateBrandPermission = useCheckPermission("brand_add");
  const isBrandListPermission = useCheckPermission("brand_list");

  if (!isBrandListPermission) {
    return (
      <NoPermission message="You don't have permission to access this route" />
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="heading-h1 mb-5">All Brands</h1>
        {isCreateBrandPermission && <CreateNewBrand />}
      </div>

      {!isLoading && !isError && !error && <BrandTable data={data} />}
      {!isLoading && isError && error && (
        <h1>
          {error?.response.data.message
            ? error.response.data.message
            : error.message}
        </h1>
      )}
      <PaginationUI
        data={data}
        page={page}
        page_size={TABLE_PAGE_SIZE}
        navigation="brands"
      />
    </div>
  );
};

export default BrandPage;
