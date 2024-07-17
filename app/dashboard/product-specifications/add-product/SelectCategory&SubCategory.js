"use client";
import { useCategoriesForSelect } from "@/app/_features/categories/useCategory";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CategoryOptions } from "../CategoryOptions";

const SelectCategoryFormComponent = ({
  control,
  watch,
  errors,
  setValue,
  id,
}) => {
  const { isLoading, isError, data } = useCategoriesForSelect();
  const [subcategories, setSubcategories] = useState([]);

  const categories = data?.data;

  const selectedCategory = watch("category_id");

  // Function to get subcategories by category ID
  function getSubcategoriesByCategoryId(categoryId) {
    // Find the category with the specified ID
    const category =
      categories && categories.find((category) => category.id === +categoryId);

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

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-8 col-span-2">
      <div className="flex-1">
        <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600 mb-1">
          Category
        </label>
        <CategoryOptions
          data={data}
          isLoading={isLoading}
          isError={isError}
          setValue={setValue}
          id={id}
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 mb-1">
          Sub-Category
        </label>
        <Controller
          name="subcategory_id"
          control={control}
          rules={{ required: "This is required field!" }}
          render={({ field }) => (
            <select
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
              {...field}
              disabled={!selectedCategory}
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          )}
        />
        {errors?.subcategory_id && (
          <span className="text-red-500 text-sm self-center">
            {errors.subcategory_id.message}
          </span>
        )}
      </div>
      {/* {errors?.day?.[index]?.day && (
        <span className="text-red-500 text-sm self-center">
          {errors.day[index].day.message}
        </span>
      )} */}
    </div>
  );
};

export default SelectCategoryFormComponent;
