"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  useAttributeNames,
  useAttributes,
} from "../_features/attributes/useAttributes";

const DynamicForm = () => {
  const { isLoading, data: attributesData } = useAttributes();
  const { isLoading: isLoading2, data: attributeNamesData } =
    useAttributeNames();

  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      attributes: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  // Simulate fetching attribute values based on attribute name
  const fetchAttributeValues = (attributeName) => {
    const attributes = attributesData?.attributes || {};
    return attributes[attributeName] || [];
  };

  // Watch all attributes
  const watchAttributes = watch("attributes");

  useEffect(() => {
    watchAttributes.forEach((attribute, index) => {
      if (attribute.attributeName) {
        const values = fetchAttributeValues(attribute.attributeName);
        if (
          attribute.attributeValue &&
          !values.includes(attribute.attributeValue)
        ) {
          setValue(`attributes[${index}].attributeValue`, ""); // Reset attributeValue if not valid
          setValue(`attributes[${index}].price`, ""); // Reset price when attributeName changes
        }
      }
    });
  }, [watchAttributes, setValue, attributesData]);

  const onSubmit = (data) => {
    console.log(data);
  };

  if (isLoading || isLoading2) {
    return <div>Loading...</div>;
  }

  if (!attributesData || !attributeNamesData) {
    return <div>Error loading data</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <div>
            <label htmlFor={`attributes[${index}].attributeName`}>
              Attribute Name
            </label>
            <Controller
              name={`attributes[${index}].attributeName`}
              control={control}
              defaultValue={field.attributeName || ""}
              render={({ field }) => (
                <select {...field}>
                  <option value="">Select Attribute</option>
                  {attributeNamesData.data.map((attribute) => (
                    <option key={attribute.name} value={attribute.name}>
                      {attribute.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          <div>
            <label htmlFor={`attributes[${index}].attributeValue`}>
              Attribute Value
            </label>
            <Controller
              name={`attributes[${index}].attributeValue`}
              control={control}
              defaultValue={field.attributeValue || ""}
              render={({ field }) => (
                <select
                  {...field}
                  disabled={!watchAttributes[index]?.attributeName}
                >
                  <option value="">Select Value</option>
                  {fetchAttributeValues(
                    watchAttributes[index]?.attributeName
                  ).map((value, idx) => (
                    <option key={idx} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          <div>
            <label htmlFor={`attributes[${index}].price`}>Price</label>
            <Controller
              name={`attributes[${index}].price`}
              control={control}
              defaultValue={field.price || ""}
              render={({ field }) => <input type="number" {...field} />}
            />
          </div>

          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({ attributeName: "", attributeValue: "", price: "" })
        }
      >
        Add Attribute
      </button>

      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
