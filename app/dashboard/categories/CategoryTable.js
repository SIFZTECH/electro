"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

import CategoriesList from "./CategoriesList";

const CategoryTable = ({ data }) => {
  const categories = data.data;

  return (
    <>
      {categories.length === 0 ? (
        <h1>There is no category. Please add new Category!</h1>
      ) : (
        <Table className="">
          <TableHeader>
            <TableRow className="font-serif font-bold text-gray-900 text-lg">
              <TableHead>ID</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead>Sub-Categories Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {categories.map((category) => (
              <CategoriesList
                key={category.id}
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