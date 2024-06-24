"use client";

import { TableCell, TableRow } from "@/app/components/ui/table";

import EditBrand from "./EditBrand";
import DeleteCategory from "./DeleteBrand";
import useCheckPermission from "@/app/_hooks/usePermission";

const BrandsList = ({ index, brand }) => {
  const isUpdateBrandPermission = useCheckPermission("brand_update");
  const isDeleteBrandPermission = useCheckPermission("brand_delete");

  return (
    <TableRow>
      <TableCell data-label="SN">{index + 1}</TableCell>
      <TableCell data-label="Brand Name">{brand.name}</TableCell>
      <TableCell>-</TableCell>
      <TableCell data-label="Actions">
        <div className="flex gap-1 flex-wrap justify-end xl:justify-normal">
          {isUpdateBrandPermission && <EditBrand brand={brand} />}
          {isDeleteBrandPermission && <DeleteCategory brand={brand} />}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default BrandsList;
