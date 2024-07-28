"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

import BrandsList from "./BrandsList";
import { useSearchParams } from "next/navigation";
import { CATAGORY_PAGE_SIZE } from "@/app/lib/utils";

const BrandTable = ({ data }) => {
  const brands = data?.data;

  const params = useSearchParams();

  const currentPage = params.get("page") || 1;
  const startIndex = (currentPage - 1) * CATAGORY_PAGE_SIZE;

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
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {brands.map((brand, i) => (
              <BrandsList key={brand.id} index={startIndex + i} brand={brand} />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default BrandTable;
