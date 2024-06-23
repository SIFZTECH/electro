"use client";

import { TableCell, TableRow } from "@/app/components/ui/table";

import DeleteAttribute from "./DeleteAttribute";
import DeleteAttributeValue from "./DeleteAttributeValue";

const AttributesList = ({ attribute, attribute_value }) => {
  return (
    <TableRow>
      <TableCell>{attribute}</TableCell>
      <TableCell className="space-x-2 space-y-2">
        {attribute_value?.map((value, index) => (
          <small
            className="font-semibold font-serif text-[15px] inline-block"
            key={index}
            style={
              attribute.toLowerCase() === "color"
                ? {
                    backgroundColor: value.value,

                    display: "inline-block",
                    width: "24px",
                    height: "24px",

                    margin: "0 5px",
                  }
                : {}
            }
          >
            {attribute.toLowerCase() === "color" ? "" : `${value.value} |`}
          </small>
        ))}
      </TableCell>
      <TableCell className="max-w-6">
        <div className="flex gap-3">
          {/* <EditCategory attribute={attribute} />  */}
          <DeleteAttributeValue attribute={attribute_value} />
          <DeleteAttribute attribute={attribute} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default AttributesList;
