import { useProducts } from "@/app/_features/products/useProducts";
import { useMedia } from "@/app/_features/social_media/useMedia";
import Spinner from "@/app/components/ui/Spinner";
import { Controller, useFieldArray, useWatch } from "react-hook-form";

const SpecificationForm = ({ control }) => {
  const { products, isError, isLoading, error } = useProducts();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const watchProductIds = useWatch({
    control,
    name: "products",
  });

  const seletedProductIds = watchProductIds.map((item) => Number(item.id));

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col col-span-2 items-start gap-4 md:basis-[100%] flex-wrap">
      <h1 className="block font-semibold font-serif text-gray-900 my-3">
        Specifications
      </h1>
      {fields.map((item, index) => (
        <div className="w-full" key={item.id}>
          <div className="flex gap-8 items-center w-full">
            <div className="flex-1">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1">
                Select Product
              </label>
              <Controller
                name={`products[${index}].id`}
                control={control}
                defaultValue={item.id}
                render={({ field }) => (
                  <select
                    className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:text-gray-500"
                    {...field}
                  >
                    <option value="">--Please select a Product--</option>
                    {products.data.data
                      .filter((product) => {
                        return (
                          !seletedProductIds.includes(product.id) ||
                          product.id === field.value
                        );
                      })
                      .map((product) => (
                        <option
                          className="capitalize"
                          key={product.id}
                          value={product.id}
                        >
                          {product.name}
                        </option>
                      ))}
                    {/* {products.data.data.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))} */}
                  </select>
                )}
              />
            </div>
            <span
              className="btn-primary texl-sm bg-gray-200 py-[9px] self-end cursor-pointer"
              onClick={() => remove(index)}
            >
              Remove
            </span>
          </div>
        </div>
      ))}

      <span
        className="btn-primary font-serif text-sm cursor-pointer"
        onClick={() => append({ product: "" })}
      >
        Select More Product
      </span>
    </div>
  );
};

export default SpecificationForm;
