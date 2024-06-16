"use client";

import { useProducts } from "@/app/_features/products/useProducts";
import FilterByProduct from "./FilterByProduct";
import ProductCategories from "./ProductCategories";
import Products from "./Products";
import Spinner from "@/app/components/ui/Spinner";
import useCheckPermission from "@/app/_hooks/usePermission";
import NotFoundData from "@/app/components/ui/NotFoundData";
import NoPermission from "@/app/components/ui/NoPermission";
import { useSearchParams } from "next/navigation";
import Pagination from "@/app/components/ui/pagination";
import { PRODUCT_PAGE_SIZE } from "@/app/lib/utils";
import PaginationUI from "@/app/components/ui/PaginationUI";

const ProductsPage = () => {
  const isPermission = useCheckPermission("product_add");
  const isProductListPermission = useCheckPermission("product_list");
  const params = useSearchParams();

  const page = params.get("page") || 1;
  const categoryId = params.get("category");
  const brandId = params.get("brand");

  const { products, isLoading, isError, error } = useProducts(
    categoryId,
    brandId,
    page
  );

  if (!isProductListPermission) {
    return (
      <NoPermission message="You don't have permission to access this route" />
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      {isPermission && <ProductCategories />}
      <div className="product-specifications">
        <h1 className="heading-h1 mb-10 mt-6">Product Specifications</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] 2xl:grid-cols-[.20fr_1fr] gap-6">
          <FilterByProduct />

          {/* {!isLoading && !isError && !error && <Products products={products} />} */}
          {!isLoading && !isError && products.data.data.length > 0 ? (
            <Products products={products} />
          ) : (
            <NotFoundData message="There is no products!" />
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
          navigation="product-specifications"
        />
      </div>
    </>
  );
};

export default ProductsPage;
