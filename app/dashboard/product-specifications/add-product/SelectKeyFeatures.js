"use client";

import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import featuresWithKeyAndIcon from "@/app/lib/features.json";

function SelectKeyFeatures({ control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "key_features",
  });

  return (
    <>
      <div className="flex flex-col col-span-2 items-start gap-4 md:basis-[100%] flex-wrap">
        {fields.map((item, index) => (
          <div className="flex gap-8 items-center w-full" key={item.id}>
            <div className="flex-1">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1">
                Features Key
              </label>
              <Controller
                render={({ field }) => (
                  <select
                    className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"
                    {...field}
                  >
                    <option value="">Select Feature Key</option>
                    {featuresWithKeyAndIcon.map((feature) => (
                      <option
                        className="capitalize"
                        key={feature.id}
                        value={feature.key}
                      >
                        {feature.key}
                      </option>
                    ))}
                  </select>
                )}
                name={`key_features[${index}].key`}
                control={control}
                defaultValue={item.key} // Make sure to set up defaultValue
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1">
                Feature Text
              </label>
              <Controller
                render={({ field }) => (
                  <input
                    className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:text-gray-500"
                    placeholder="Feature text"
                    {...field}
                  />
                )}
                name={`key_features[${index}].value`}
                control={control}
                defaultValue={item.value} // Corrected: should match the data structure
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
          onClick={() => append({ key: "", value: "" })} // Corrected: field names should match the data structure
        >
          Add More Features
        </span>
      </div>
    </>
  );
}

export default SelectKeyFeatures;
