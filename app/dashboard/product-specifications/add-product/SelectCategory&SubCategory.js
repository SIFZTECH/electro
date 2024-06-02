"use client";

import {
  useCategories,
  useCategory,
} from "@/app/_features/categories/useCategory";

const SelectCategory_SubCategory = ({ watchCategoryId, register }) => {
  const { isLoading, data, isError } = useCategories();

  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
    error: error2,
  } = useCategory(watchCategoryId);

  return (
    <div className="flex items-center gap-8 md:basis-[100%]">
      <div className="flex-1">
        <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
          Category
        </label>
        <div className="mt-1">
          <select
            className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
            {...register("category_id")}
          >
            <option value="0">--Please choose an option--</option>
            {!isLoading &&
              data.data.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
          {errors?.category_id && (
            <span className="text-red-500 text-sm">
              {errors.category_id.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex-1">
        <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
          Sub-Category
        </label>
        <select
          className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
          {...register("subcategory_id")}
        >
          <option value="">--Please choose an option--</option>
          {!isLoading2 &&
            data2?.data?.subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
        </select>
        {errors?.subcategory_id && (
          <span className="text-red-500 text-sm">
            {errors.subcategory_id.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default SelectCategory_SubCategory;
