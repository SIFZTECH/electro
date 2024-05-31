"use client";

import { TableCell, TableRow } from "@/app/components/ui/table";

import SubCategoryMenu from "./SubCategoryMenu";

const SubcategoriesList = ({ subcategory, category }) => {
  return (
    <TableRow>
      <TableCell>{subcategory.id}</TableCell>
      <TableCell>{subcategory.name}</TableCell>
      <TableCell>{category?.name}</TableCell>
      <TableCell className="w-6">
        <SubCategoryMenu subcategory={subcategory} category={category} />
      </TableCell>
    </TableRow>
  );
};

export default SubcategoriesList;
