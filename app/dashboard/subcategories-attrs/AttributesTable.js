"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

import AttributesList from "./AttributiesList";
import CreateNewSubCategory from "./CreateNewAttribute";

const AttributesTable = ({ data }) => {
  const attributes = data.attributes;

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
          {attributes.map((attribute) => (
            <AttributesList key={attribute.id} attribute={attribute} />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AttributesTable;
