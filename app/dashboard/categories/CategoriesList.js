"use client";

import { TableCell, TableRow } from "@/app/components/ui/table";

import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";
import useCheckPermission from "@/app/_hooks/usePermission";

const CategoriesList = ({ index, category, subCategories }) => {
  const isCategoryUpdatePermission = useCheckPermission("category_update");
  const isCategoryDeletePermission = useCheckPermission("category_delete");

  return (
    <TableRow>
      <TableCell data-label="SN">{index + 1}</TableCell>
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
          {isCategoryUpdatePermission && <EditCategory category={category} />}
          {isCategoryDeletePermission && <DeleteCategory category={category} />}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CategoriesList;
