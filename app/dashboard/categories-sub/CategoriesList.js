"use client";

import { TableCell, TableRow } from "@/app/components/ui/table";

import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

const CategoriesList = ({ category, subCategories }) => {
  return (
    <TableRow>
      <TableCell>{category.id}</TableCell>
      <TableCell>{category.name}</TableCell>
      <TableCell>
        {subCategories.map((item) => (
          <button
            key={item.id}
            className="btn-primary bg-transparent underline"
          >
            {item.name}
          </button>
        ))}
      </TableCell>
      <TableCell className="w-6">
        <div className="flex gap-3">
          <EditCategory category={category} />
          <DeleteCategory category={category} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CategoriesList;
