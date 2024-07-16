"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

import SubCategoriesList from "@/app/dashboard/subcategories/SubcategoriesList";
import { CATAGORY_PAGE_SIZE } from "@/app/lib/utils";
import { useSearchParams } from "next/navigation";

const SubCategoryTable = ({ data, page }) => {
  const params = useSearchParams();

  const currentPage = params.get("page") || 1;
  const startIndex = (currentPage - 1) * CATAGORY_PAGE_SIZE;
  const subcategories = data.data;

  return (
    <>
      {subcategories.length === 0 ? (
        "There is no sub-categories. Please add new sub-category!"
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="font-serif font-bold text-gray-900 text-lg">
              <TableHead>SN</TableHead>
              <TableHead>Sub-Category Name</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subcategories.map((subcategory, i) => (
              <SubCategoriesList
                key={subcategory.id}
                index={startIndex + i}
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
