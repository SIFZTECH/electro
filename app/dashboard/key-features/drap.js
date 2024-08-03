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
import {
  ArrowDown01,
  ArrowDownAz,
  LucideAlignJustify,
  LucideChevronDown,
} from "lucide-react";
import EditFeature from "./EditFeature";
import DeleteFeature from "./DeleteFeature";
import Image from "next/image";
import { BASE_URL_IMAGE } from "@/app/lib/utils";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const FeatureTable = ({ data }) => {
  const [features, setFeatures] = React.useState(
    data.map((feature, index) => ({
      ...feature,
      index: index + 1,
    }))
  );

  const totalFeatures = features ? features.length : 0;

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
        accessorKey: "key",
        header: ({ column }) => {
          return (
            <button
              className="flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <span>Feature Name</span>
              <ArrowDownAz className="ml-1 h-4 w-4" />
            </button>
          );
        },
      },
      {
        accessorKey: "icon",
        header: "Feature Icon",
        cell: ({ row }) => (
          <Image
            src={`${BASE_URL_IMAGE}${row.original.icon}`}
            height={40}
            width={40}
            alt=""
          />
        ),
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const feature = row.original;

          return (
            <div className="flex gap-2 flex-wrap justify-end xl:justify-normal">
              <EditFeature feature={feature} />
              <DeleteFeature feature={feature} />
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
  const [showAll, setShowAll] = React.useState(false);

  const table = useReactTable({
    data: features,
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
      pagination: {
        pageIndex: 0,
        pageSize: showAll ? features.length : 10, // Set pageSize to the total number of features when showing all
      },
    },
  });

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedFeatures = Array.from(features);
    const [movedFeature] = reorderedFeatures.splice(result.source.index, 1);
    reorderedFeatures.splice(result.destination.index, 0, movedFeature);

    setFeatures(
      reorderedFeatures.map((feature, index) => ({
        ...feature,
        index: index + 1,
      }))
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter by feature name..."
            value={table.getColumn("key")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("key")?.setFilterValue(event.target.value)
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
          <Button variant="outline" className="ml-2" onClick={handleShowAll}>
            <LucideAlignJustify className="h-4 w-4" />
          </Button>
        </div>

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
          <Droppable droppableId="features">
            {(provided) => (
              <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, index) => (
                    <Draggable key={row.id} draggableId={row.id} index={index}>
                      {(provided) => (
                        <TableRow
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
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
                      )}
                    </Draggable>
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
                {provided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </Table>

        {/* Pagination Controls */}
        <div className="flex sm:justify-between flex-wrap items-center">
          <div className="text-center text-sm font-medium">
            Total Features: {totalFeatures}
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
    </DragDropContext>
  );
};

export default FeatureTable;
