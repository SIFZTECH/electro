"use client";

import {
  useAttributeNames,
  useAttributes,
} from "@/app/_features/attributes/useAttributes";
import React, { useState } from "react";
import { useFieldArray, Controller } from "react-hook-form";
import { IoMdClose } from "react-icons/io";

function SelectAttribute({ watch, control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const [attributeValues, setAttributeValues] = useState([]);

  const { data, isLoading } = useAttributeNames();
  const { data: data2, isLoading: isLoading2 } = useAttributes();

  console.log(data2);

  const selectedAttribute = watch("attribute_name");

  const attributes = data?.data;

  React.useEffect(() => {
    if (selectedAttribute) {
      setAttributeValues(data2?.attributes[selectedAttribute] || []);
    } else {
      setAttributeValues([]);
    }
  }, [selectedAttribute]);

  return (
    <>
      <div className="col-span-2">
        <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600 mb-1">
          Attribute Name
        </label>
        <Controller
          name="attribute_name"
          control={control}
          render={({ field }) => (
            <select
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
              {...field}
            >
              <option value="">Select Attribute Name</option>
              {!isLoading &&
                attributes?.map((attribute) => (
                  <option key={attribute.id} value={attribute.name}>
                    {attribute.name}
                  </option>
                ))}
            </select>
          )}
        />
      </div>
      <div className="flex flex-col col-span-2 items-start gap-4 md:basis-[100%] flex-wrap">
        {fields.map((item, index) => (
          <>
            <div className="flex gap-8 items-center w-full" key={index + 1}>
              <div className="flex-1">
                <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600 mb-1">
                  Attribute Value
                </label>
                <Controller
                  render={({ field }) => (
                    <select
                      className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"
                      {...field}
                      disabled={!selectedAttribute}
                    >
                      <option value="">Select Attribute Value</option>
                      {!isLoading &&
                        attributeValues?.map((attribute) => (
                          <option key={attribute.id} value={attribute.id}>
                            {attribute.value}
                          </option>
                        ))}
                    </select>
                  )}
                  name={`variants[${index}].attribute_value_id`}
                  control={control}
                  defaultValue={item.attribute_value_id} // Make sure to set up defaultValue
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600 mb-1">
                  Price
                </label>
                <Controller
                  render={({ field }) => (
                    <input
                      className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:text-gray-500"
                      type="number"
                      {...field}
                      disabled={!selectedAttribute}
                    />
                  )}
                  name={`variants[${index}].price`}
                  control={control}
                  defaultValue={item.price} // Make sure to set up defaultValue
                />
              </div>
            </div>
            <button
              type="button"
              className="btn-primary texl-sm bg-gray-200"
              onClick={() => remove(index)}
            >
              Remove
            </button>
          </>
        ))}
        <button
          className="btn-primary font-serif text-sm"
          type="button"
          onClick={() => append({ attribute_value_id: "", price: 0 })}
        >
          Add More Variants
        </button>
      </div>
    </>
  );
}

export default SelectAttribute;
