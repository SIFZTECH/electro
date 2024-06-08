"use client";

import { TableCell, TableRow } from "@/app/components/ui/table";

import EditSubCategory from "./EditSubCategory";
import DeleteSubCategory from "./DeleteSubCategory";

const SubCategoriesList = ({ subcategory }) => {
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
            <EditSubCategory subcategory={subcategory} />
            <DeleteSubCategory subcategory={subcategory} />
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default SubCategoriesList;
