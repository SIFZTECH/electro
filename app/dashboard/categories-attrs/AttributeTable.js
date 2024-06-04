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
            <AttributesList attributes={attributes} />
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default AttributeTable;