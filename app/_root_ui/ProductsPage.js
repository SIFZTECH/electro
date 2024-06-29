"use client";
import {
  useProducts,
  useProductsForPublic,
} from "@/app/_features/products/useProducts";
import FilterByProduct from "./FilterByProduct";
import Products from "./Products";
import Spinner from "@/app/components/ui/Spinner";
import NotFoundData from "@/app/components/ui/NotFoundData";
import { useSearchParams } from "next/navigation";
import { PRODUCT_PAGE_SIZE } from "@/app/lib/utils";
import PaginationUI from "@/app/components/ui/PaginationUI";
import SearchProduct from "./SearchProduct";

const ProductsPage = ({
  products,
  isLoading,
  isError,
  error,
  page,
  addToCompare,
}) => {
  return (
    <>
      <div className="product-specifications">
        <h1 className="heading-h1 mb-10 mt-6">E Bikes</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] 2xl:grid-cols-[.20fr_1fr] gap-6">
          <FilterByProduct />

          {isLoading && <Spinner />}
          {!isLoading && !isError && products.data.data.length > 0 ? (
            <>
              <Products products={products} addToCompare={addToCompare} />
            </>
          ) : (
            <div>
              <SearchProduct />
              <NotFoundData message="There is no products!" />
            </div>
          )}
          {!isLoading && isError && error && (
            <h1>
              {error?.response.data.message
                ? error.response.data.message
                : error.message}
            </h1>
          )}
        </div>
        <PaginationUI
          data={products?.data}
          page={+page}
          page_size={PRODUCT_PAGE_SIZE}
          navigation="test"
        />
      </div>
    </>
  );
};

export default ProductsPage;
