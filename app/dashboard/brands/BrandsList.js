"use client";

import { TableCell, TableRow } from "@/app/components/ui/table";

import EditBrand from "./EditBrand";
import DeleteCategory from "./DeleteBrand";

const BrandsList = ({ brand }) => {
  return (
    <TableRow>
      <TableCell data-label="Brand Id">{brand.id}</TableCell>
      <TableCell data-label="Brand Name">{brand.name}</TableCell>
      <TableCell>-</TableCell>
      <TableCell data-label="Actions">
        <div className="flex gap-1 flex-wrap justify-end xl:justify-normal">
          <EditBrand brand={brand} />
          <DeleteCategory brand={brand} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default BrandsList;
