"use client";

import React from "react";
import {
  useAttributeNames,
  useAttributes,
} from "@/app/_features/attributes/useAttributes";
import { useFieldArray, Controller, useWatch } from "react-hook-form";

function SelectAttribute({ control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const { data, isLoading } = useAttributes();
  const attributes = !isLoading && data?.attributes;

  const watchVariants = useWatch({
    control,
    name: "variants",
  });

  const selectedVariantValues = watchVariants.map((item) =>
    Number(item.attribute_value_id)
  );

  return (
    <>
      <div className="flex flex-col col-span-2 items-start gap-4 md:basis-[100%] flex-wrap">
        {fields.map((item, index) => (
          <div
            className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8 w-full"
            key={item.id}
          >
            <div className="flex-1">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1">
                Attribute Value
              </label>
              <Controller
                name={`variants[${index}].attribute_value_id`}
                control={control}
                defaultValue={item.attribute_value_id}
                render={({ field }) => (
                  <select
                    className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"
                    {...field}
                  >
                    <option value="">Select Attribute Value</option>
                    {Object.keys(attributes).map((key) => {
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
            <div className="flex-1">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1">
                Price
              </label>
              <Controller
                name={`variants[${index}].price`}
                control={control}
                defaultValue={item.price}
                render={({ field }) => (
                  <input
                    className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:text-gray-500"
                    type="number"
                    {...field}
                  />
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
        ))}

        <span
          className="btn-primary font-serif text-sm"
          onClick={() => append({ attribute_value_id: "", price: 0 })}
        >
          Add More Variants
        </span>
      </div>
    </>
  );
}

export default SelectAttribute;
