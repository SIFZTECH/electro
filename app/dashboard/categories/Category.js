"use client";

import { useCategories } from "@/app/_features/categories/useCategory";
import CategoryTable from "./CategoryTable";
import Spinner from "@/app/components/ui/Spinner";
import CreateNewCategory from "./CreateNewCategory";
import { useRoles } from "@/app/_features/roles/useRoles";
import useCheckPermission from "@/app/_hooks/usePermission";
import NoPermission from "@/app/components/ui/NoPermission";

const Category = () => {
  const isPermission = useCheckPermission("category_add");
  const isCategoryListPermission = useCheckPermission("category_list");

  const { data, isLoading, isError, error } = useCategories();

  if (!isCategoryListPermission) {
    return (
      <NoPermission message="You don't have permission to access this route" />
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="heading-h1 mb-5">All Categories</h1>
        {isPermission && <CreateNewCategory />}
      </div>

      {!isError && !error && <CategoryTable data={data} />}
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

export default Category;
