"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

import CategoriesList from "./CategoriesList";
import { useSearchParams } from "next/navigation";
import { CATAGORY_PAGE_SIZE } from "@/app/lib/utils";

const CategoryTable = ({ data }) => {
  const categories = data.data;
  const params = useSearchParams();

  const currentPage = params.get("page") || 1;
  const startIndex = (currentPage - 1) * CATAGORY_PAGE_SIZE;

  return (
    <>
      {categories.length === 0 ? (
        <h1>There is no category. Please add new Category!</h1>
      ) : (
        <Table className="">
          <TableHeader>
            <TableRow className="font-serif font-bold text-gray-900 text-lg">
              <TableHead data-label="SN">SN</TableHead>
              <TableHead data-label="Category Name">Category Name</TableHead>
              <TableHead data-label="Sub-Category Name">
                Sub-Categories Name
              </TableHead>
              <TableHead data-label="Actions">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {categories.map((category, i) => (
              <CategoriesList
                key={category.id}
                index={startIndex + i + 1}
                category={category}
                subCategories={category.subcategories}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default CategoryTable;
