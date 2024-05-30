"use client";

import { useSubcategories } from "@/app/_features/subCategories/useSubcategories";

import Spinner from "@/app/components/ui/Spinner";
import SubcategoryTable from "./SubcategoryTable";

const SubCategories = () => {
  const { data, isLoading, isError } = useSubcategories();

  if (isLoading) return <Spinner />;

  return (
    <div>
      <h1 className="heading-h1 mb-5">All Sub-Categories</h1>

      <SubcategoryTable data={data} />
    </div>
  );
};

export default SubCategories;
