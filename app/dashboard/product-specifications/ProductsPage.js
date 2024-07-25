"use client";

import FilterByProduct from "./FilterByProduct";
import Products from "./Products";
import { PRODUCT_PAGE_SIZE } from "@/app/lib/utils";
import PaginationUI from "@/app/components/ui/PaginationUI";
import PaginationForProducts from "@/app/components/ui/PaginationForProducts";

const ProductsPage = ({
  products,
  isLoading,
  isError,
  error,
  page,
  compareList,
  toggleCompare,
  setValue,
}) => {
  return (
    <>
      <div className="product-specifications">
        <h1 className="px-2 heading-h1 mb-10 mt-6">E Bikes</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] 2xl:grid-cols-[.20fr_1fr] gap-6">
          <FilterByProduct />

          <Products
            isLoading={isLoading}
            isError={isError}
            error={error}
            products={products}
            compareList={compareList}
            toggleCompare={toggleCompare}
            setValue={setValue}
          />
        </div>
        <PaginationForProducts
          data={products?.data}
          page={+page}
          page_size={PRODUCT_PAGE_SIZE}
          navigation="product-specifications"
        />
      </div>
    </>
  );
};

export default ProductsPage;
