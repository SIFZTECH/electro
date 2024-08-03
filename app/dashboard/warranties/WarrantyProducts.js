/* eslint-disable react-hooks/rules-of-hooks */
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
import { ArrowDown01, LucideChevronDown } from "lucide-react";
import Link from "next/link";
import EditWarrantyStatus from "./EditWarrantyStatus";
import DeleteWarranty from "./DeleteWarranty";
import DateRangePicker from "./DateRangePicker";
import useCheckPermission from "@/app/_hooks/usePermission";
import EditWarranty from "./EditWarranty";
import EditWarrantyStatusForBulk from "./EditWarrantyStatusForBulk";
import DeleteWarranties from "./DeleteWarranties";

const WarrantyProducts = ({ data }) => {
  const warranties = React.useMemo(
    () =>
      data.data.map((warranty, index) => ({
        ...warranty,
        index: index + 1,
      })),
    [data.data]
  );

  const totalWarranties = warranties ? warranties.length : 0;

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [selectedRange, setSelectedRange] = React.useState({
    from: undefined,
    to: undefined,
  });
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedStatuses, setSelectedStatuses] = React.useState([]);

  React.useEffect(() => {
    const newFilters = [];
    if (selectedRange?.from && selectedRange?.to) {
      const fromDate = new Date(selectedRange.from);
      const toDate = new Date(selectedRange.to);
      newFilters.push({
        id: "purchase_date",
        value: { from: fromDate, to: toDate },
      });
    }
    if (selectedStatuses.length > 0) {
      newFilters.push({
        id: "status",
        value: selectedStatuses,
      });
    }
    setColumnFilters(newFilters);
  }, [selectedRange, selectedStatuses]);

  const purchaseDateFilterFn = (row, columnId, filterValue) => {
    const purchaseDate = new Date(row.original.purchase_date);
    const fromDate = filterValue.from;
    const toDate = filterValue.to;

    return purchaseDate >= fromDate && purchaseDate <= toDate;
  };

  const dealerFilterFn = (row, columnId, filterValue) => {
    const dealer = row.original.dealer;
    if (!dealer) return false;
    const fullName = `${dealer.firstname} ${dealer.lastname}`;
    return fullName.toLowerCase().includes(filterValue.toLowerCase());
  };

  const statusFilterFn = (row, columnId, filterValue) => {
    return filterValue.includes(row.original.status);
  };

  const columns = React.useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            {...{
              checked: row.getIsSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
      {
        accessorKey: "index",
        header: ({ column }) => (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span>SN</span>
            <ArrowDown01 className="ml-1 h-4 w-4" />
          </button>
        ),
      },
      {
        accessorKey: "id",
        header: "Order ID",
      },
      {
        accessorKey: "dealer",
        header: "Dealer Name",
        cell: ({ row }) => (
          <div>
            {row.original.dealer?.firstname} {row.original.dealer?.lastname}
          </div>
        ),
        filterFn: dealerFilterFn,
      },
      {
        accessorKey: "customer",
        header: "Customer Name",
        cell: ({ row }) => (
          <div>
            {row.original.firstname} {row.original.lastname}
          </div>
        ),
      },
      {
        accessorKey: "purchase_date",
        header: ({ column }) => (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span>Purchase Date</span>
            <ArrowDown01 className="ml-1 h-4 w-4" />
          </button>
        ),
        cell: ({ row }) => (
          <div>{new Date(row.original.purchase_date).toLocaleDateString()}</div>
        ),
        filterFn: purchaseDateFilterFn,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          const statusStyles = {
            approve: "bg-green-400",

            pending: "bg-yellow-400",
            decline: "bg-red-400 text-white",
          };
          return (
            <span className={`btn-primary ${statusStyles[status]}`}>
              {status}
            </span>
          );
        },
        filterFn: statusFilterFn,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const isEditWarrantyPermission = useCheckPermission("edit_warranty");
          const warranty = row.original;
          return (
            <div className="flex gap-2 flex-wrap justify-end xl:justify-normal">
              <Link
                className="btn-primary"
                href={`/dashboard/warranties/${warranty.id}`}
              >
                View Details
              </Link>
              <EditWarrantyStatus warranty={warranty} />
              {isEditWarrantyPermission && <EditWarranty warranty={warranty} />}
              <DeleteWarranty warrantyId={warranty.id} />
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: warranties,
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

  const selectedRows = table.getSelectedRowModel().rows;
  const warranty_ids = selectedRows?.map((item) => item?.original?.id);

  return (
    <div className="w-full mt-10">
      {warranties.length === 0 ? (
        <h1 className="font-serif text-center text-xl">
          There are no warranties at the moment! Please add a new Warranty.
        </h1>
      ) : (
        <>
          <div className="flex items-center py-4">
            <div className="sm:basis-[35%] flex flex-wrap sm:flex-nowrap items-center gap-2">
              <Input
                placeholder="Search by Dealer name..."
                value={table.getColumn("dealer")?.getFilterValue() ?? ""}
                onChange={(event) =>
                  table.getColumn("dealer")?.setFilterValue(event.target.value)
                }
                className="sm:max-w-sm"
              />
              <DateRangePicker
                selectedRange={selectedRange}
                setSelectedRange={setSelectedRange}
              />
              <DropdownMenu className="sm:basis-[60%]">
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Filter by Status
                    <LucideChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {["approve", "pending", "decline"].map((status) => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      className="capitalize"
                      checked={selectedStatuses.includes(status)}
                      onCheckedChange={(value) =>
                        setSelectedStatuses((prev) =>
                          value
                            ? [...prev, status]
                            : prev.filter((s) => s !== status)
                        )
                      }
                    >
                      {status}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
          <div className="flex sm:flex-nowrap flex-wrap items-center justify-between py-4">
            {Object.keys(rowSelection).length > 0 && (
              <div className="space-x-2">
                <EditWarrantyStatusForBulk warranty_ids={warranty_ids} />
                <DeleteWarranties warranty_ids={warranty_ids} />
              </div>
            )}

            <div className="text-center text-sm font-medium">
              Total Warranties: {totalWarranties}
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
        </>
      )}
    </div>
  );
};

export default WarrantyProducts;
