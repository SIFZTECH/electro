"use client";

import { TableCell, TableRow } from "@/app/components/ui/table";

import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

const CategoriesList = ({ category, subCategories }) => {
  return (
    <TableRow>
      <TableCell data-label="Category ID">{category.id}</TableCell>
      <TableCell data-label="Category Name">{category.name}</TableCell>
      <TableCell data-label="Sub-Categories">
        {subCategories.map((item) => (
          <button key={item.id} className="btn-primary mr-3 bg-green-200">
            {item.name}
          </button>
        ))}
      </TableCell>
      <TableCell data-label="Actions">
        <div className="flex gap-2 flex-wrap justify-end xl:justify-normal">
          <EditCategory category={category} />
          <DeleteCategory category={category} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CategoriesList;
