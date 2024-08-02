/* eslint-disable react-hooks/rules-of-hooks */
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
import useCheckPermission from "@/app/_hooks/usePermission";
import EditProduct from "./[slug]/UpdateProduct";
import DeleteProduct from "./[slug]/DeleteProduct";
import { useProductsForStocks } from "@/app/_features/products/useProducts";
import Loading from "@/app/loading";

const ProductsTable = () => {
  const { products: data, isLoading, isError, error } = useProductsForStocks();

  const products = React.useMemo(
    () =>
      data?.data?.data?.map((product, index) => ({
        ...product,
        index: index + 1,
      })),
    [data?.data]
  );

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "index",
        cell: ({ row }) => <div>{row.original.index}</div>,
        header: ({ column }) => {
          return (
            <button
              className="flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <span>SN</span>
              <ArrowDown01 className="ml-1 h-4 w-4" />
            </button>
          );
        },
      },
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <button
              className="flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <span>Product Name</span>
              <ArrowDownAz className="ml-1 h-4 w-4" />
            </button>
          );
        },
      },
      {
        accessorKey: "model_name",
        header: ({ column }) => {
          return (
            <button
              className="flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <span>Model Name</span>
              <ArrowDownAz className="ml-1 h-4 w-4" />
            </button>
          );
        },
      },
      {
        accessorKey: "price",
        header: ({ column }) => {
          return (
            <button
              className="flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <span>Price</span>
              <ArrowDown01 className="ml-1 h-4 w-4" />
            </button>
          );
        },
      },
      {
        accessorKey: "stock",
        header: ({ column }) => {
          return (
            <button
              className="flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <span>Stock</span>
              <ArrowDown01 className="ml-1 h-4 w-4" />
            </button>
          );
        },
      },

      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <div>
            {row.original?.status === "Active" && (
              <p className="bg-green-500 text-white text-sm font-medium rounded-full px-2 py-1 text-center">
                {row.original.status}
              </p>
            )}
            {row.original?.status === "Inactive" && (
              <p className="bg-gray-400 text-gray-800 text-sm font-medium rounded-full px-2 py-1 text-center">
                {row.original.status}
              </p>
            )}
            {row.original?.status === "Pending" && (
              <p className="bg-yellow-400 text-yellow-800 text-sm font-medium rounded-full px-2 py-1 text-center">
                {row.original.status}
              </p>
            )}
            {row.original?.status === "Out of Stock" && (
              <p className="bg-red-500 text-white text-sm font-medium rounded-full px-2 py-1 text-center">
                {row.original.status}
              </p>
            )}
            {row.original?.status === "Discontinued" && (
              <p className="bg-gray-600 text-white text-sm font-medium rounded-full px-2 py-1 text-center">
                {row.original.status}
              </p>
            )}
            {row.original?.status === "Draft" && (
              <p className="bg-blue-400 text-white text-sm font-medium rounded-full px-2 py-1 text-center">
                {row.original.status}
              </p>
            )}
            {row.original?.status === "Pre-order" && (
              <p className="bg-purple-400 text-white text-sm font-medium rounded-full px-2 py-1 text-center">
                {row.original.status}
              </p>
            )}
            {row.original?.status === "Backorder" && (
              <p className="bg-yellow-500 text-white text-sm font-medium rounded-full px-2 py-1 text-center">
                {row.original.status}
              </p>
            )}
            {row.original?.status === "On Hold" && (
              <p className="bg-orange-400 text-white text-sm font-medium rounded-full px-2 py-1 text-center">
                {row.original.status}
              </p>
            )}
            {row.original?.status === "Featured" && (
              <p className="bg-pink-400 text-white text-sm font-medium rounded-full px-2 py-1 text-center">
                {row.original.status}
              </p>
            )}
            {row.original?.status === "Custom" && (
              <p className="bg-teal-400 text-white text-sm font-medium rounded-full px-2 py-1 text-center">
                {row.original.status}
              </p>
            )}
          </div>
        ),
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const product = row.original;
          const isProductUpdatePermission =
            useCheckPermission("product_update");
          const isProductDeletePermission =
            useCheckPermission("product_delete");

          return (
            <div className="flex gap-2 flex-wrap justify-end xl:justify-normal">
              {isProductUpdatePermission && <EditProduct product={product} />}
              {isProductDeletePermission && (
                <DeleteProduct productId={product.id} />
              )}
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
    data: products,
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
          placeholder="Filter by Product name..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
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
      {isLoading && <Loading />}
      {!isLoading && !isError && !error && (
        <>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-center space-x-2 py-4">
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
        </>
      )}

      {/* Pagination Controls */}
    </div>
  );
};

export default ProductsTable;
