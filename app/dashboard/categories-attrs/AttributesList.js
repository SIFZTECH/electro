"use client";

import { TableCell, TableRow } from "@/app/components/ui/table";

import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

const AttributesList = ({ attributesName, attributesValue }) => {
  console.log(attributesName, attributesValue);

  return (
    <TableRow>
      {attributesName.map((name) => (
        <TableCell key={name}>{name}</TableCell>
      ))}

      <TableCell>
        {/* {subCategories.map((item) => (
          <button key={item.id} className="btn-primary mr-3 bg-green-200">
            {item.name}
          </button>
        ))} */}
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
