"use client";

import React from "react";
import { useAttributes } from "@/app/_features/attributes/useAttributes";
import { Controller, useWatch } from "react-hook-form";

function SelectAttribute({ control }) {
  const { data, isLoading } = useAttributes();
  const attributes = !isLoading && data?.attributes;

  const watchVariant = useWatch({
    control,
    name: "variant",
  });

  return (
    <div className="flex flex-col col-span-2 items-start gap-4 md:basis-[100%] flex-wrap">
      <div className="w-full flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
        <div className="flex-1">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1 required-field">
            Attribute Name
          </label>
          <Controller
            name="variant.attribute"
            control={control}
            defaultValue={watchVariant?.attribute || ""}
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
            name="variant.attribute_value"
            control={control}
            defaultValue={watchVariant?.attribute_value || ""}
            render={({ field }) => (
              <select
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"
                {...field}
              >
                <option value="">Select Value</option>
                {attributes[watchVariant?.attribute]?.map((attr) => (
                  <option
                    key={attr.id}
                    value={attr.value}
                    style={
                      watchVariant.attribute === "Color"
                        ? {
                            backgroundColor: attr.value,
                            color: attr.value,
                          }
                        : {}
                    }
                  >
                    {attr.value}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default SelectAttribute;
