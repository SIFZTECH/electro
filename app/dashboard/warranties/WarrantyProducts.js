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
import EditWarranty from "./EditWarranty";
import DeleteWarranty from "./DeleteWarranty";
import "react-day-picker/dist/style.css";
import DateRangePicker from "./DateRangePicker";

const WarrantyProducts = ({ data }) => {
  const warranties = React.useMemo(
    () =>
      data.data.map((warranty, index) => ({
        ...warranty,
        index: index + 1,
      })),
    [data.data]
  );

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [selectedRange, setSelectedRange] = React.useState({
    from: undefined,
    to: undefined,
  });
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    if (selectedRange?.from && selectedRange?.to) {
      const fromDate = new Date(selectedRange.from);
      const toDate = new Date(selectedRange.to);
      setColumnFilters([
        {
          id: "purchase_date",
          value: { from: fromDate, to: toDate },
        },
      ]);
    } else {
      setColumnFilters([]);
    }
  }, [selectedRange]);

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

  const columns = React.useMemo(
    () => [
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
        header: "Purchase Date",
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
            active: "bg-purple-400 text-white",
            pending: "bg-yellow-400",
            decline: "bg-red-400 text-white",
          };
          return (
            <span className={`btn-primary ${statusStyles[status]}`}>
              {status}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const warranty = row.original;
          return (
            <div className="flex gap-2 flex-wrap justify-end xl:justify-normal">
              <Link
                className="btn-primary"
                href={`/dashboard/warranties/${warranty.id}`}
              >
                View Details
              </Link>
              <EditWarranty warranty={warranty} />
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

  return (
    <div className="w-full mt-10">
      {warranties.length === 0 ? (
        <h1 className="font-serif text-center text-xl">
          There are no warranties at the moment! Please add a new Warranty.
        </h1>
      ) : (
        <>
          <div className="flex items-center py-4">
            <div className="basis-[40%] flex items-center gap-2">
              <Input
                placeholder="Search by Dealer name..."
                value={table.getColumn("dealer")?.getFilterValue() ?? ""}
                onChange={(event) => {
                  console.log(table.getColumn("dealer"));
                  return table
                    .getColumn("dealer")
                    ?.setFilterValue(event.target.value);
                }}
                className="max-w-sm"
              />
              <DateRangePicker
                selectedRange={selectedRange}
                setSelectedRange={setSelectedRange}
              />
            </div>
            <DropdownMenu className="basis-[60%]">
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
                  .map((column) => (
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
                  ))}
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
        </>
      )}
    </div>
  );
};

export default WarrantyProducts;
