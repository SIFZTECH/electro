"use client";

import { useProducts } from "@/app/_features/products/useProducts";
import FilterByProduct from "./FilterByProduct";
import ProductCategories from "./ProductCategories";
import Products from "./Products";
import Spinner from "@/app/components/ui/Spinner";
import useCheckPermission from "@/app/_hooks/usePermission";

const Page = () => {
  const { products, isLoading, isError, error } = useProducts();
  const isPermission = useCheckPermission("product_add");
  if (isLoading) return <Spinner />;

  console.log(products, error);

  return (
    <>
      {isPermission && <ProductCategories />}
      <div className="product-specifications">
        <h1 className="heading-h1 mb-10 mt-6">Product Specifications</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] 2xl:grid-cols-[.20fr_1fr] gap-6">
          <FilterByProduct />
          {!isLoading && !isError && !error && <Products products={products} />}
          {!isLoading && isError && error && (
            <h1>
              {error?.response.data.message
                ? error.response.data.message
                : error.message}
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
