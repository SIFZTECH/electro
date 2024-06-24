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

  return (
    <>
      {subcategories.length === 0 ? (
        "There is no sub-categories. Please add new sub-category!"
      ) : (
        <Table className="">
          <TableHeader>
            <TableRow className="font-serif font-bold text-gray-900 text-lg">
              <TableHead>SN</TableHead>
              <TableHead>Sub-Category Name</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {subcategories.map((subcategory, i) => (
              <SubCategoriesList
                key={subcategory.id}
                index={i}
                subcategory={subcategory}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default SubCategoryTable;
