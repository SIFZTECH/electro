"use client";

import { TableCell, TableRow } from "@/app/components/ui/table";

import EditSubCategory from "./EditSubCategory";
import DeleteSubCategory from "./DeleteSubCategory";

const SubCategoriesList = ({ subcategory }) => {
  return (
    <>
      <TableRow>
        <TableCell>{subcategory.id}</TableCell>
        <TableCell>{subcategory.name}</TableCell>
        <TableCell>
          <span className="btn-primary bg-transparent mr-3 bg-green-200">
            {subcategory.category.name}
          </span>
        </TableCell>
        <TableCell className="w-6">
          <div className="flex gap-3">
            <EditSubCategory subcategory={subcategory} />
            <DeleteSubCategory subcategory={subcategory} />
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default SubCategoriesList;
