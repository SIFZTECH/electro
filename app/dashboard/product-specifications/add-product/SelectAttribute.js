"use client";

import {
  useAttributeNames,
  useAttributes,
} from "@/app/_features/attributes/useAttributes";
import React, { useState } from "react";
import { useFieldArray, Controller } from "react-hook-form";
import { IoMdClose } from "react-icons/io";

function SelectAttribute({ control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const { data, isLoading } = useAttributes();

  const attributes = !isLoading && data?.attributes;

  return (
    <>
      <div className="flex flex-col col-span-2 items-start gap-4 md:basis-[100%] flex-wrap">
        {fields.map((item, index) => (
          <div className="flex gap-8 items-center w-full" key={item.id}>
            <div className="flex-1">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1">
                Attribute Value
              </label>
              <Controller
                render={({ field }) => (
                  <select
                    className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"
                    {...field}
                  >
                    <option value="">Select Attribute Value</option>
                    {Object.keys(attributes).map((key) => {
                      return attributes[key].map((item) => (
                        <option key={item.id} value={item.id}>
                          {key} - {item.value}
                        </option>
                      ));
                    })}
                  </select>
                )}
                name={`variants[${index}].attribute_value_id`}
                control={control}
                defaultValue={item.attribute_value_id} // Make sure to set up
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1">
                Price
              </label>
              <Controller
                render={({ field }) => (
                  <input
                    className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:text-gray-500"
                    type="number"
                    {...field}
                  />
                )}
                name={`variants[${index}].price`}
                control={control}
                defaultValue={item.price} // Make sure to set up defaultValue
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
