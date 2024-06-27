"use client";
import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

const FormComponent = () => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      attributes: [
        { id: 1, name: "Size", value: "L" },
        { id: 2, name: "Color", value: "#344183" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const watchColor = watch("attributes.1.value"); // Watching the color attribute value

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <label>{field.name}</label>
          <Controller
            name={`attributes.${index}.value`}
            control={control}
            defaultValue={field.value}
            render={({ field }) => <input {...field} />}
          />
        </div>
      ))}

      {watchColor && (
        <div>
          <h3>Attributes based on color {watchColor}</h3>
          {/* Display attributes based on the selected color */}
          {/* This is just an example. Replace it with the actual logic */}
          {watchColor === "#344183" && (
            <div>
              <label>Color Dependent Attribute</label>
              <input placeholder="Enter value for color dependent attribute" />
            </div>
          )}
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
