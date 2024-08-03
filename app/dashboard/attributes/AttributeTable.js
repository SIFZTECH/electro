/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

import { Input } from "@/app/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

import { ArrowDown01, ArrowDownAz, LucideChevronDown } from "lucide-react";
import DeleteAttribute from "./DeleteAttribute";
import DeleteAttributeValue from "./DeleteAttributeValue";

const AttributeTable = ({ attributes }) => {
  const attributeKeys = Object.keys(attributes);

  const attributeData = React.useMemo(
    () =>
      attributeKeys.map((key) => ({
        attribute: key,
        attribute_value: attributes[key],
      })),
    [attributes]
  );

  const totalAttributes = attributeData ? attributeData.length : 0;

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "attribute",
        header: "Attribute Name",
      },
      {
        accessorKey: "attribute_value",
        header: "Attribute Value",
        cell: ({ row }) => (
          <div className="space-x-2 space-y-2">
            {row.original.attribute_value.map((value, index) => (
              <small
                className="font-semibold text-color-primary font-serif text-base inline-block"
                key={index}
                style={
                  row.original.attribute.toLowerCase() === "color"
                    ? {
                        backgroundColor: value.value,
                        display: "inline-block",
                        width: "24px",
                        height: "24px",
                        margin: "0 5px",
                      }
                    : {}
                }
              >
                {row.original.attribute.toLowerCase() === "color"
                  ? ""
                  : `${value.value} |`}
              </small>
            ))}
          </div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const attribute = row.original.attribute;
          const attributeValue = row.original.attribute_value;

          return (
            <div className="flex gap-3">
              <DeleteAttributeValue attribute={attributeValue} />
              <DeleteAttribute attribute={attribute} />
            </div>
          );
        },
      },
    ],
    []
  );

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: attributeData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by attribute name..."
          value={table.getColumn("attribute")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("attribute")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
              <LucideChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex sm:justify-between flex-wrap items-center">
        <div className="text-center text-sm font-medium">
          Total Attributes: {totalAttributes}
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AttributeTable;
