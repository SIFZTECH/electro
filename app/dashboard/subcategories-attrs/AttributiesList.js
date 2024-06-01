"use client";

import { TableCell, TableRow } from "@/app/components/ui/table";

import EditAttribute from "./EditAttribute";
import DeleteAtrribute from "./DeleteAttribute";

const AttributesList = ({ attribute }) => {
  return (
    <>
      <TableRow>
        <TableCell>{attribute.id}</TableCell>
        <TableCell>{attribute.attribute}</TableCell>
        <TableCell>{attribute.value}</TableCell>

        <TableCell className="w-6">
          <div className="flex gap-3">
            <EditAttribute attribute={attribute} />
            <DeleteAtrribute attribute={attribute} />
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default AttributesList;
