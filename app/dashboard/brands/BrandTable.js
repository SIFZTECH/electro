"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

import BrandsList from "./BrandsList";

const BrandTable = ({ data }) => {
  const brands = data?.data;

  return (
    <>
      {brands?.length === 0 ? (
        "There is no brand. Please add new brand!"
      ) : (
        <Table className="">
          <TableHeader>
            <TableRow className="font-serif font-bold text-gray-900 text-lg">
              <TableHead>SN</TableHead>
              <TableHead>Brand Name</TableHead>
              <TableHead>-</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {brands.map((brand, i) => (
              <BrandsList key={brand.id} index={i} brand={brand} />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default BrandTable;
