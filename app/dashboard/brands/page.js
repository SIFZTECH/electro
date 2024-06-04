"use client";

import BrandTable from "./BrandTable";
import Spinner from "@/app/components/ui/Spinner";
import CreateNewBrand from "./CreateNewBrand";
import { useBrands } from "@/app/_features/brands/useBrands";

const Categories = () => {
  const { data, isLoading, isError, error } = useBrands();

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="heading-h1 mb-5">All Brands</h1>
        <CreateNewBrand />
      </div>

      {!isLoading && !isError && !error && <BrandTable data={data} />}
      {!isLoading && isError && error && (
        <h1>
          {error?.response.data.message
            ? error.response.data.message
            : error.message}
        </h1>
      )}
    </div>
  );
};

export default Categories;