"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useCategories } from "../_features/categories/useCategory";

const FormComponent = () => {
  const { isLoading, isError, data } = useCategories();
  const { handleSubmit, control, watch } = useForm();
  const [subcategories, setSubcategories] = useState([]);

  const categories = data?.data;

  const selectedCategory = watch("category");

  // Function to get subcategories by category ID
  function getSubcategoriesByCategoryId(categoryId) {
    // Find the category with the specified ID
    const category = categories.find((category) => category.id === +categoryId);

    // If the category exists, return its subcategories; otherwise, return an empty array
    return category ? category.subcategories : [];
  }

  const subcategoriess = getSubcategoriesByCategoryId(selectedCategory);

  React.useEffect(() => {
    if (selectedCategory) {
      setSubcategories(subcategoriess || []);
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory]);

  console.log(subcategories);

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
              {!isLoading &&
                categories?.map((category) => (
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
                <option key={subcategory.id} value={subcategory.name}>
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
