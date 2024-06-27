"use client";

import React from "react";
import { useAttributes } from "@/app/_features/attributes/useAttributes";
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
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1 required-field">
                Attribute Name
              </label>
              <Controller
                name={`variants[${index}].attribute`}
                control={control}
                defaultValue={item.attribute}
                render={({ field }) => (
                  <select
                    className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"
                    {...field}
                  >
                    <option value="">Select Attribute</option>
                    {Object.keys(attributes).map((key) => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1">
                Attribute Value
              </label>
              <Controller
                name={`variants[${index}].attribute_value`}
                control={control}
                defaultValue={item.attribute_value}
                render={({ field }) => (
                  <select
                    className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"
                    {...field}
                  >
                    <option value="">Select Value</option>
                    {attributes[watchVariants[index]?.attribute]?.map(
                      (attr) => (
                        <option
                          key={attr.id}
                          value={attr.value}
                          style={
                            watchVariants[index]?.attribute === "Color"
                              ? {
                                  backgroundColor: attr.value,
                                  color: attr.value,
                                }
                              : {}
                          }
                        >
                          {attr.value}
                        </option>
                      )
                    )}
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
        ))}

        <span
          className="btn-primary font-serif text-sm"
          onClick={() => append({ attribute: "", attribute_value: "" })}
        >
          Add More Variants
        </span>
      </div>
    </>
  );
}

export default SelectAttribute;
