"use client";

import React from "react";

import { useFieldArray, Controller, useWatch } from "react-hook-form";
import { useProductsForStocks } from "@/app/_features/products/useProducts";

function SelectProductVariants({ control, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const { products, isLoading, isError } = useProductsForStocks();

  const data = products?.data?.data;

  const watchVariants = useWatch({
    control,
    name: "product_variants",
  });

  const selectedVariantValues = watchVariants.map((item) =>
    Number(item.product_id)
  );

  return (
    <>
      {/* <div className="flex flex-col col-span-2 items-start gap-4 md:basis-[100%] flex-wrap">
        {fields.map((item, index) => (
          <div className="w-full" key={item.id}>
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8 w-full">
              <div className="flex-1">
                <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1 required-field">
                  Select Product
                </label>
                <Controller
                  name={`product_variants[${index}].product_id`}
                  control={control}
                  defaultValue={item.product_id}
                  rules={{ required: "This is required field!" }}
                  render={({ field }) => (
                    <select
                      className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"
                      {...field}
                    >
                      <option value="">Select Attribute Value</option>
                      {attributes &&
                        da.map((key) => {
                          return attributes[key]
                            .filter((attr) => {
                              return (
                                !selectedVariantValues.includes(attr.id) ||
                                attr.id === Number(field.value)
                              );
                            })
                            .map((item) => (
                              <option
                                key={item.id}
                                value={item.id}
                                style={
                                  key === "Color"
                                    ? {
                                        backgroundColor: item.value,
                                        color: item.value,
                                      }
                                    : {}
                                }
                              >
                                {key} - {item.value}
                              </option>
                            ));
                        })}
                    </select>
                  )}
                />
              </div>
            </div>
            <span
              className="inline-block my-2 btn-primary bg-red-400 texl-sm cursor-pointer text-gray-50"
              onClick={() => remove(index)}
            >
              Remove
            </span>
            {errors?.product_variants?.[index]?.product_id && (
              <p className="text-red-500 text-sm self-center">
                {errors.product_variants[index].product_id.message}
              </p>
            )}
          </div>
        ))}

        <span
          className="btn-primary font-serif text-sm"
          onClick={() => append({ product_id: "" })}
        >
          Add More Product Variants
        </span>
      </div> */}
    </>
  );
}

export default SelectProductVariants;
