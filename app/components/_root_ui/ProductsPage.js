"use client";
import { useSearchParams } from "next/navigation";
import FilterByProduct from "./FilterByProduct";
import PaginationRoot from "./Pagination";
import Products from "./Products";
import { PRODUCT_PAGE_SIZE } from "@/app/lib/utils";

const ProductsPage = ({
  products,
  isLoading,
  isError,
  error,
  page,
  compareList,
  toggleCompare,
}) => {
  return (
    <>
      <div className="product-specifications">
        <h1 className="heading-h1 mb-10 mt-6">E Bikes</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] 2xl:grid-cols-[.20fr_1fr] gap-6">
          <FilterByProduct />

          <Products
            isLoading={isLoading}
            isError={isError}
            error={error}
            products={products}
            compareList={compareList}
            toggleCompare={toggleCompare}
          />
        </div>
        <PaginationRoot
          data={products?.data}
          page={+page}
          page_size={PRODUCT_PAGE_SIZE}
        />
      </div>
    </>
  );
};

export default ProductsPage;
