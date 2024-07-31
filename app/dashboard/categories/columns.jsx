import { MdMoreHoriz } from "react-icons/md";
import useCheckPermission from "@/app/_hooks/usePermission";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";
import { Checkbox } from "@/app/components/ui/checkbox";

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "index",
    header: "SN",
    cell: ({ row }) => <div>{row.original.index}</div>,
  },
  {
    accessorKey: "name",
    header: "Category Name",
  },
  {
    accessorKey: "subcategories",
    header: "Sub-Categories Name",
    cell: ({ row }) => (
      <div>
        {row.original.subcategories.map((item) => (
          <button
            key={item.id}
            className="font-semibold text-color-primary mr-3"
          >
            {item.name}
          </button>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "neto_status",
    header: "Neto Status",
    cell: ({ row }) => (
      <span
        className={
          row.original.neto_status === "Active"
            ? "bg-green-400 text-white text-sm px-2 py-1 rounded-sm"
            : "bg-[#ced4da] text-color-primary text-sm px-2 py-1 rounded-sm"
        }
      >
        {row.original.neto_status}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={
          row.original.status === "Active"
            ? "bg-green-400 text-white text-sm px-2 py-1 rounded-sm"
            : "bg-[#ced4da] text-color-primary text-sm px-2 py-1 rounded-sm"
        }
      >
        {row.original.status}
      </span>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="flex gap-2 flex-wrap justify-end xl:justify-normal">
          {isCategoryUpdatePermission && <EditCategory category={category} />}
          {isCategoryDeletePermission && <DeleteCategory category={category} />}
        </div>
      );
    },
  },
];
