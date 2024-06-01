"use client";

import { TableCell, TableRow } from "@/app/components/ui/table";

import EditBrand from "./EditBrand";
import DeleteCategory from "./DeleteBrand";

const BrandsList = ({ brand }) => {
  return (
    <TableRow>
      <TableCell>{brand.id}</TableCell>
      <TableCell>{brand.name}</TableCell>
      <TableCell>-</TableCell>
      <TableCell className="w-6">
        <div className="flex gap-3">
          <EditBrand brand={brand} />
          <DeleteCategory brand={brand} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default BrandsList;
