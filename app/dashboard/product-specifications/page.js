"use client";

import { useProducts } from "@/app/_features/products/useProducts";
import FilterByProduct from "./FilterByProduct";
import ProductCategories from "./ProductCategories";
import Products from "./Products";
import Spinner from "@/app/components/ui/Spinner";
import { useUser } from "@/app/_features/authentication/useUser";

const Page = () => {
  const { isLoading: isLoading2, permissions } = useUser();

  const { products, isLoading } = useProducts();

  if (isLoading) return <Spinner />;
  const isPermission = permissions.some((per) => per.name === "product_add");

  return (
    <>
      {isPermission && <ProductCategories />}
      <div className="product-specifications">
        <h1 className="heading-h1 mb-10 mt-6">Product Specifications</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] 2xl:grid-cols-[.20fr_1fr] gap-6">
          <FilterByProduct />
          <Products products={products} />
        </div>
      </div>
    </>
  );
};

export default Page;
