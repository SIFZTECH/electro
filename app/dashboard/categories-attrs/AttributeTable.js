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
  console.log(attributes);

  return (
    <>
      <Table className="">
        <TableHeader>
          <TableRow className="font-serif font-bold text-gray-900 text-lg">
            <TableHead>ID</TableHead>
            <TableHead>Attribute Name</TableHead>
            <TableHead>Attribute Value</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {attributesName.map((_, i) => (
            <AttributesList
              key={i + 1}
              attributesName={attributesName}
              attributesValues={attributesValues}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AttributeTable;
