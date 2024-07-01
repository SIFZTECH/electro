"use client";
//comments
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

import SubCategoriesList from "@/app/dashboard/subcategories/SubcategoriesList";
import { useSearchParams } from "next/navigation";
import PaginationUI from "@/app/components/ui/PaginationUI";

const SubCategoryTable = ({ data, page }) => {
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
