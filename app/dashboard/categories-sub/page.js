"use client";

import { useCategories } from "@/app/_features/categories/useCategory";
import CategoryTable from "./CategoryTable";
import Spinner from "@/app/components/ui/Spinner";
import CreateNewCategory from "./CreateNewCategory";

const Categories = () => {
  const { data, isLoading, isError } = useCategories();

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="heading-h1 mb-5">All Categories</h1>
        <CreateNewCategory />
      </div>

      <CategoryTable data={data} />
    </div>
  );
};

export default Categories;
