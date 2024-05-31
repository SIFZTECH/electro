"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

import SubCategoriesList from "./SubCategoriesList";
import CreateNewSubCategory from "./CreateNewSubCategory";

const SubCategoryTable = ({ data }) => {
  const subcategories = data.data;
  console.log(subcategories);

  return (
    <>
      <Table className="">
        <TableHeader>
          <TableRow className="font-serif font-bold text-gray-900 text-lg">
            <TableHead>ID</TableHead>
            <TableHead>Sub-Category Name</TableHead>
            <TableHead>Category Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {subcategories.map((subcategory) => (
            <SubCategoriesList key={subcategory.id} subcategory={subcategory} />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default SubCategoryTable;
