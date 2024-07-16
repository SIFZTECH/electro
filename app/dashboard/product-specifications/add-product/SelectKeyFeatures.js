"use client";

import React from "react";
import { useFieldArray, Controller, useWatch } from "react-hook-form";
import featuresWithKeyAndIcon from "@/app/lib/features.json";

function SelectKeyFeatures({ control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "key_features",
  });

  const watchFeatures = useWatch({
    control,
    name: "key_features",
  });

  const selectedFeatureKeys = watchFeatures?.map((item) => item.key);

  return (
    <>
      <div className="flex flex-col col-span-2 items-start gap-4 md:basis-[100%] flex-wrap">
        {fields.map((item, index) => (
          <div className="w-full" key={item.id}>
            <div className="flex flex-col md:flex-row gap-3 md:gap-8 md:items-center ">
              <div className="flex-1">
                <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1">
                  Features Key
                </label>
                <Controller
                  name={`key_features[${index}].key`}
                  control={control}
                  defaultValue={item.key}
                  render={({ field }) => (
                    <select
                      className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"
                      {...field}
                    >
                      <option value="">Select Feature Key</option>
                      {featuresWithKeyAndIcon
                        .filter(
                          (feature) =>
                            !selectedFeatureKeys?.includes(feature.key) ||
                            feature.key === field.value
                        )
                        .map((feature) => (
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
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1">
                  Feature Text
                </label>
                <Controller
                  name={`key_features[${index}].value`}
                  control={control}
                  defaultValue={item.value}
                  render={({ field }) => (
                    <input
                      className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:text-gray-500"
                      placeholder="Feature text"
                      {...field}
                    />
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
          </div>
        ))}

        <span
          className="btn-primary font-serif text-sm"
          onClick={() => append({ key: "", value: "" })}
        >
          Add More Features
        </span>
      </div>
    </>
  );
}

export default SelectKeyFeatures;
