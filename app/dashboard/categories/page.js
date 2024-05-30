"use client";

import { useCategories } from "@/app/_features/categories/useCategory";
import CategoryTable from "./CategoryTable";
import Spinner from "@/app/components/ui/Spinner";

const Categories = () => {
  const { data, isLoading, isError } = useCategories();

  if (isLoading) return <Spinner />;

  return (
    <div>
      <h1 className="heading-h1 mb-5">All Categories</h1>

      <CategoryTable data={data} />
    </div>
  );
};

export default Categories;
