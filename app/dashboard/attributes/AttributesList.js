"use client";

import { TableCell, TableRow } from "@/app/components/ui/table";

import EditCategory from "./EditAttribute";
import DeleteAttribute from "./DeleteAttribute";

const AttributesList = ({ attribute, attribute_value }) => {
  return (
    <TableRow>
      <TableCell>{attribute}</TableCell>
      <TableCell className="space-x-2">
        {attribute_value?.map((value, index) => (
          <small className="btn-primary bg-green-200" key={index}>
            {value.value}
          </small>
        ))}
      </TableCell>
      <TableCell className="w-6">
        <div className="flex gap-3">
          {/* <EditCategory attribute={attribute} />  */}
          <DeleteAttribute attribute={attribute} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default AttributesList;
