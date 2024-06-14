"use client";

import {
  useAttributeNames,
  useAttributes,
} from "@/app/_features/attributes/useAttributes";
import React, { useState } from "react";
import { useFieldArray, Controller, useWatch } from "react-hook-form";
import { IoMdClose } from "react-icons/io";

function SelectKeyFeatures({ control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "keyFeatures",
  });

  const keyFeatures = useWatch({
    control,
    name: "keyFeatures",
  });

  console.log(keyFeatures);

  return (
    <>
      <div className="flex flex-col col-span-2 items-start gap-4 md:basis-[100%] flex-wrap">
        {fields.map((item, index) => (
          <div className="flex gap-8 items-center w-full" key={index + 1}>
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
                    <option value="motor">Motor</option>
                    <option value="bettary">Bettary</option>
                    <option value="charger">Charger</option>
                  </select>
                )}
                name={`keyFeatures[${index}].key`}
                control={control}
                defaultValue={item.key} // Make sure to set up
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
                name={`keyFeatures[${index}].feature`}
                control={control}
                defaultValue={item.feature} // Make sure to set up defaultValue
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
          onClick={() => append({ key: "", feature: "" })}
        >
          Add More Features
        </span>
      </div>
    </>
  );
}

export default SelectKeyFeatures;
