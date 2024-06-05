"use client";

import { TableCell, TableRow } from "@/app/components/ui/table";

import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

const AttributesList = ({ attribute, attribute_value }) => {
  console.log(attribute_value);
  const attributeValues = Object.values(attribute_value);
  console.log(attributeValues);
  return (
    <TableRow>
      <TableCell>{attribute}</TableCell>
      <TableCell>
        {attributeValues.map((value, index) => (
          <small className="mx-1 border p-1 border-cyan-600" key={index}>
            {value.value}
          </small>
        ))}
      </TableCell>
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
