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
      <TableCell>{index}</TableCell>
      <TableCell>{category.name}</TableCell>
      <TableCell>
        {subCategories.map((item) => (
          <button
            key={item.id}
            className="font-semibold text-color-primary mr-3"
          >
            {item.name}
          </button>
        ))}
      </TableCell>
      <TableCell>
        {category?.neto_status === "Active" ? (
          <span className="bg-green-400 text-white text-sm px-2 py-1 rounded-sm">
            {category?.neto_status}
          </span>
        ) : (
          <span className="bg-[#ced4da] text-color-primary text-sm px-2 py-1 rounded-sm">
            {category?.neto_status}
          </span>
        )}
      </TableCell>
      <TableCell>
        {category?.status === "Active" ? (
          <span className="bg-green-400 text-white text-sm px-2 py-1 rounded-sm">
            {category?.status}
          </span>
        ) : (
          <span className="bg-[#ced4da] text-color-primary text-sm px-2 py-1 rounded-sm">
            {category?.status}
          </span>
        )}
      </TableCell>
      <TableCell>
        <div className="flex gap-2 flex-wrap justify-end xl:justify-normal">
          {isCategoryUpdatePermission && <EditCategory category={category} />}
          {isCategoryDeletePermission && <DeleteCategory category={category} />}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CategoriesList;
