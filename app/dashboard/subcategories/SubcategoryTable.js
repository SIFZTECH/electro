"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import SubcategoriesList from "./SubcategoriesList";

const SubcategoryTable = ({ data }) => {
  return (
    <>
      <Table className="">
        <TableHeader>
          <TableRow className="font-serif font-bold text-gray-900 text-lg">
            <TableHead>Sub-Category ID</TableHead>
            <TableHead>Sub-Category Name</TableHead>
            <TableHead>Category Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {data.data.map((subcategory) => (
            <SubcategoriesList
              key={subcategory.id}
              subcategory={subcategory}
              category={subcategory.category}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default SubcategoryTable;
