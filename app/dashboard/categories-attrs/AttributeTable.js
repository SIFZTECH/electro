"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

import AttributesList from "./AttributesList";

const AttributeTable = ({ attributes }) => {
  const attribute_keys = Object.keys(attributes);

  return (
    <>
      {attributes.length === 0 ? (
        "There is no attributes. Please add new attribute!"
      ) : (
        <Table className="">
          <TableHeader>
            <TableRow className="font-serif font-bold text-gray-900 text-lg">
              <TableHead>Attribute Name</TableHead>
              <TableHead>Attribute Value</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {attribute_keys.map((attr, index) => (
              <AttributesList
                key={index}
                attribute={attr}
                attribute_value={attributes[attr]}
              ></AttributesList>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default AttributeTable;
