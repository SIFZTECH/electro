"use client";

import { useProducts } from "@/app/_features/products/useProducts";
import FilterByProduct from "./FilterByProduct";
import ProductCategories from "./ProductCategories";
import Products from "./Products";
import Spinner from "@/app/components/ui/Spinner";

const Page = () => {
  const { products, isLoading } = useProducts();

  if (isLoading) return <Spinner />;

  return (
    <>
      <ProductCategories />
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
