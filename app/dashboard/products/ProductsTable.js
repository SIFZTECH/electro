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
import Image from "next/image";
import { BASE_URL_IMAGE } from "@/app/lib/utils";

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

  const totalProducts = products ? products.length : 0;

  const statusFilterFn = (row, columnId, filterValue) => {
    return filterValue.includes(row.original.status);
  };

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
        accessorKey: "images",
        header: () => <div className="text-center">Product Image</div>,

        cell: ({ row }) => {
          const imagePath = row.original.images[0]?.image_path;
          if (imagePath) {
            return (
              <div className="flex items-center justify-center">
                <Image
                  height={40}
                  width={40}
                  src={`${imagePath}`}
                  alt="Product Image"
                  className="object-contain"
                />
              </div>
            );
          }
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
        cell: ({ row }) => {
          const status = row.original?.status;
          const statusClasses = {
            Active: "bg-green-500 text-white",
            Inactive: "bg-gray-400 text-gray-800",
            Pending: "bg-yellow-400 text-yellow-800",
            "Out of Stock": "bg-red-500 text-white",
            Discontinued: "bg-gray-600 text-white",
            Draft: "bg-blue-400 text-white",
            "Pre-order": "bg-purple-400 text-white",
            Backorder: "bg-yellow-500 text-white",
            "On Hold": "bg-orange-400 text-white",
            Featured: "bg-pink-400 text-white",
            Custom: "bg-teal-400 text-white",
          };

          return (
            <p
              className={`${statusClasses[status]} text-sm font-medium rounded-full px-2 py-1 text-center`}
            >
              {status}
            </p>
          );
        },
        filterFn: statusFilterFn,
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
  const [selectedStatuses, setSelectedStatuses] = React.useState([]);

  React.useEffect(() => {
    const newFilters = [];

    if (selectedStatuses.length > 0) {
      newFilters.push({
        id: "status",
        value: selectedStatuses,
      });
    }
    setColumnFilters(newFilters);
  }, [selectedStatuses]);

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
      <div className="sm:basis-[35%] flex flex-wrap sm:flex-nowrap gap-2 items-center py-4">
        <Input
          placeholder="Filter by Product name..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm focus-visible:ring-offset-0 focus-visible:ring-0"
        />
        <DropdownMenu className="sm:basis-[60%]">
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Filter by Status
              <LucideChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {[
              "Active",
              "Inactive",
              "Pending",
              "Out of Stock",
              "Discontinued",
              "Draft",
              "Pre-order",
              "Backorder",
              "On Hold",
              "Featured",
              "Custom",
            ].map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                className="capitalize"
                checked={selectedStatuses.includes(status)}
                onCheckedChange={(value) =>
                  setSelectedStatuses((prev) =>
                    value ? [...prev, status] : prev.filter((s) => s !== status)
                  )
                }
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
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
          <div className="text-center">Total Products: {totalProducts}</div>
        </>
      )}
    </div>
  );
};

export default ProductsTable;
