"use client";

import SubCategoryTable from "./SubCategoryTable";
import Spinner from "@/app/components/ui/Spinner";
import CreateSubNewCategory from "./CreateNewSubCategory";
import { useSubcategories } from "@/app/_features/subCategories/useSubcategories";

const Categories = () => {
  const { data, isLoading, isError } = useSubcategories();

  console.log(data);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="heading-h1 mb-5">All Categories</h1>
        <CreateSubNewCategory />
      </div>

      <SubCategoryTable data={data} />
    </div>
  );
};

export default Categories;
