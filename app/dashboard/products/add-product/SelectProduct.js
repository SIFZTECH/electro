import { useProductsForStocks } from "@/app/_features/products/useProducts";
import MultipleSelector from "@/app/components/ui/multi-selector";
import { BASE_URL_IMAGE } from "@/app/lib/utils";
import React from "react";
import { Controller } from "react-hook-form";

const SelectProduct = ({ control, existingProducts }) => {
  const { products, isLoading, isError } = useProductsForStocks();

  const productOptions =
    !isLoading &&
    !isError &&
    products?.data?.data?.map((product) => {
      return {
        label: `${product?.name}`,
        value: product.id,
        image:
          product?.images.length > 0
            ? `${product.images[0].image_path}`
            : "/default.jpg",
      };
    });

  if (isLoading) return;

  return (
    <Controller
      name="product_ids"
      control={control}
      render={({ field }) => (
        <MultipleSelector
          {...field}
          defaultOptions={productOptions}
          placeholder="Select product..."
          emptyIndicator={<p className="text-center">no results found.</p>}
        />
      )}
    />
  );
};

export default SelectProduct;
