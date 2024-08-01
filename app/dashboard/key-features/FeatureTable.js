"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

import FeaturesList from "./FeaturesList";
import { useSearchParams } from "next/navigation";
import { TABLE_PAGE_SIZE } from "@/app/lib/utils";

const FeatureTable = ({ data }) => {
  const features = data;

  const params = useSearchParams();

  const currentPage = params.get("page") || 1;
  const startIndex = (currentPage - 1) * TABLE_PAGE_SIZE;

  return (
    <>
      {features?.length === 0 ? (
        "There is no features. Please add new feature!"
      ) : (
        <Table className="">
          <TableHeader>
            <TableRow className="font-serif font-bold text-gray-900 text-lg">
              <TableHead>SN</TableHead>
              <TableHead>Feature Name</TableHead>
              <TableHead>Feature Icon</TableHead>

              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {features?.map((ft, i) => (
              <FeaturesList key={ft.id} index={startIndex + i} feature={ft} />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default FeatureTable;
