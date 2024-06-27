import { useProducts } from "@/app/_features/products/useProducts";
import { SkeletonFiler } from "@/app/components/ui/SkeletonFilter";
import { Controller, useFieldArray, useWatch } from "react-hook-form";

const SelectProduct = ({ register, products, isLoading, isError }) => {
  return (
    <div className="flex flex-col col-span-2 items-start gap-4 md:basis-[100%] flex-wrap">
      <div className="w-full">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8 w-full">
          <div className="flex-1">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1 required-field">
              Select Product
            </label>

            <select
              {...register("product_id")}
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:text-gray-500"
            >
              <option value="">--Please select a Product--</option>
              {isLoading ? (
                <SkeletonFiler />
              ) : (
                !isError &&
                products.data.data.map((product) => (
                  <option
                    className="capitalize"
                    key={product.id}
                    value={product.id}
                  >
                    {product.name}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectProduct;
