"use client";

import { TableCell, TableRow } from "@/app/components/ui/table";

import EditSubCategory from "./EditSubCategory";
import DeleteSubCategory from "./DeleteSubCategory";

const SubCategoriesList = ({ subcategory }) => {
  const isSubcategoryUpdatePermission =
    useCheckPermission("subcategory_update");
  const isSubcategoryDeletePermission =
    useCheckPermission("subcategory_delete");

  return (
    <>
      <TableRow>
        <TableCell data-label="Sub-Category Id">{subcategory.id}</TableCell>
        <TableCell data-label="Sub-Category Name">{subcategory.name}</TableCell>
        <TableCell data-label="Category Name">
          <span className="btn-primary bg-transparent mr-3 bg-green-200">
            {subcategory.category.name}
          </span>
        </TableCell>
        <TableCell data-label="Actions">
          <div className="flex gap-1 flex-wrap justify-end xl:justify-normal">
            {isSubcategoryUpdatePermission && (
              <EditSubCategory subcategory={subcategory} />
            )}
            {isSubcategoryDeletePermission && (
              <DeleteSubCategory subcategory={subcategory} />
            )}
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default SubCategoriesList;
