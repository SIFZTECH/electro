import {
  useAttributeNames,
  useAttributes,
} from "@/app/_features/attributes/useAttributes";
import React, { useState } from "react";
import { useFieldArray, Controller, useWatch, useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";

function SelectKeyFeatures({ register, control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "keyFeatures",
  });

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      keyFeatures: fields.map((item) => ({
        key: item.key,
        feature: item.feature,
      })),
    },
  });

  const keyFeatures = useWatch({
    control,
    name: "keyFeatures",
  });

  const featureKeys = keyFeatures.map((item) => item.key);

  // Custom validation to check if feature key is duplicated
  const validateFeatureKey = (value) => {
    const count = featureKeys.filter((key) => key === value).length;
    return count > 1 ? "Feature Key must be unique" : true;
  };

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
                    <option value="battery">Battery</option>
                    <option value="charger">Charger</option>
                  </select>
                )}
                name={`keyFeatures[${index}].key`}
                control={control}
                defaultValue={item.key} // Make sure to set up
                rules={{ validate: validateFeatureKey }} // Apply validation rule
              />
              {errors.keyFeatures && errors.keyFeatures[index]?.key && (
                <span className="text-red-500 text-sm">
                  Duplicate feature key
                </span>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1">
                Feature Text
              </label>
              <Controller
                render={({ field }) => (
                  <input
                    className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3 placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:text-gray-500"
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
