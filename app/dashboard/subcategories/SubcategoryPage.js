"use client";

import Spinner from "@/app/components/ui/Spinner";
import CreateSubNewCategory from "./CreateNewSubCategory";
import { useSubcategories } from "@/app/_features/subCategories/useSubcategories";
import useCheckPermission from "@/app/_hooks/usePermission";
import { useSearchParams } from "next/navigation";
import SubCategoryTable from "./SubcategoryTable";

const SubCategoryPage = () => {
  const params = useSearchParams();
  const page = params.get("page") ? +params.get("page") : 1;
  const { data, isLoading, isError, error } = useSubcategories(page);
  const isSubcategoryCreatePermission = useCheckPermission("subcategory_add");

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="heading-h1 mb-5">All Sub-Categories</h1>
        {isSubcategoryCreatePermission && <CreateSubNewCategory />}
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

export default SubCategoryPage;
