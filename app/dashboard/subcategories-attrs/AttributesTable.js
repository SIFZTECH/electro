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

  const transformedData = attributes.reduce((acc, item) => {
    const attributeKey = item.attribute.toLowerCase();
    if (!acc[attributeKey]) {
      acc[attributeKey] = [];
    }
    acc[attributeKey].push(item.value.toLowerCase());
    return acc;
  }, {});

  const formattedData = Object.keys(transformedData).map((key) => ({
    [key]: transformedData[key],
  }));

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
          {formattedData.map((attribute) => {
            console.log(attribute);
            <AttributesList key={attribute.id} attribute={attribute} />;
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default AttributesTable;
