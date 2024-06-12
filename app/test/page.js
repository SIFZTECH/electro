"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const FormComponent = () => {
  const { handleSubmit, control, watch } = useForm();
  const [subcategories, setSubcategories] = useState([]);

  const categories = [
    { id: "1", name: "Fruits" },
    { id: "2", name: "Vegetables" },
    // Add more categories here
  ];

  const subcategoriesData = {
    1: [
      { id: "1-1", name: "Apple" },
      { id: "1-2", name: "Banana" },
      // Add more subcategories for Fruits here
    ],
    2: [
      { id: "2-1", name: "Carrot" },
      { id: "2-2", name: "Broccoli" },
      // Add more subcategories for Vegetables here
    ],
    // Add more category mappings here
  };

  const selectedCategory = watch("category");

  React.useEffect(() => {
    if (selectedCategory) {
      setSubcategories(subcategoriesData[selectedCategory] || []);
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="category">Category</label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <select {...field}>
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        />
      </div>

      <div>
        <label htmlFor="subcategory">Subcategory</label>
        <Controller
          name="subcategory"
          control={control}
          render={({ field }) => (
            <select {...field} disabled={!selectedCategory}>
              <option value="">Select Subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          )}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
