"use client";

import { TableCell, TableRow } from "@/app/components/ui/table";

import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

const AttributesList = ({ attributes }) => {
  console.log(attributes);

  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell className="w-6">
        <div className="flex gap-3">
          {/* <EditCategory attribute={attribute} />
          <DeleteCategory attribute={attribute} /> */}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default AttributesList;
