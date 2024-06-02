"use client";

import { IoMdClose } from "react-icons/io";

import { useAttributes } from "@/app/_features/attributes/useAttributes";
import { useFieldArray } from "react-hook-form";

const SelectAttribute = ({ register, control }) => {
  const { fields, append, remove } = useFieldArray({
    name: "variants",
    control,
  });
  const { isLoading, data } = useAttributes();

  <button
    type="button"
    className="btn-primary"
    onClick={() => append({ attributeName: "", attributeValue: "" })}
  >
    Add Variants
  </button>;

  return (
    <div className="flex flex-col items-start gap-4 md:basis-[100%] flex-wrap">
      {fields.map((field, index) => (
        <div className="flex w-full items-end gap-8" key={field.id}>
          <div className="flex-1">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Variants
            </label>

            <select
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
              {...register(`attribute_name_${index}`, {
                required: "This field is requied",
              })}
            >
              <option value="">--Please choose an option--</option>
              {!isLoading &&
                data.attributes.map((attribute) => (
                  <option key={attribute.id} value={attribute.id}>
                    {attribute.attribute}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              Value
            </label>
            <select
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
              {...register(`attribute_value_${index}`, {
                required: "This field is requied",
              })}
            >
              <option value="">--Please choose an option--</option>
              {!isLoading &&
                data.attributes.map((attribute) => (
                  <option key={attribute.id} value={attribute.value}>
                    {attribute.value}
                  </option>
                ))}
            </select>
          </div>
          <button
            className="rounded-md border bg-gray-100 border-gray-300 py-2.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
            type="button"
            onClick={() => remove(index)}
          >
            <IoMdClose />
          </button>
        </div>
      ))}
      <button
        className="btn-primary"
        type="button"
        onClick={() => append({ attributeName: "", attributeValue: "" })}
      >
        Add Variants
      </button>
    </div>
  );
};

export default SelectAttribute;
