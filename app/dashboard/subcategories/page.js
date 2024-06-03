"use client";

import SubCategoryTable from "./SubCategoryTable";
import Spinner from "@/app/components/ui/Spinner";
import CreateSubNewCategory from "./CreateNewSubCategory";
import { useSubcategories } from "@/app/_features/subCategories/useSubcategories";

const Categories = () => {
  const { data, isLoading, isError, error } = useSubcategories();

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="heading-h1 mb-5">All Sub-Categories</h1>
        <CreateSubNewCategory />
      </div>

      {!isError && !error && <SubCategoryTable data={data} />}
      {isError && error && (
        <h1>
          {error?.response.data.message
            ? error.response.data.message
            : error.message}
        </h1>
      )}
    </div>
  );
};

export default Categories;
