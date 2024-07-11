import Link from "next/link";
import EditWarranty from "@/app/dashboard/warranty/EditWarranty";
import { useDashboardStats } from "../_features/stats/useDashboardStats";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const RecentWarranties = ({ data }) => {
  const warranties = data?.data;

  return (
    <Table className="my-4">
      <TableHeader className="font-serif">
        <TableRow>
          <TableHead scope="col">Order ID</TableHead>
          <TableHead scope="col">Dealer Name</TableHead>
          <TableHead scope="col">Customer Name</TableHead>
          <TableHead scope="col">Status</TableHead>
          <TableHead scope="col">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {warranties?.map((data, i) => {
          return (
            <TableRow key={i + 1}>
              <TableCell data-label="Order ID">{data.id}</TableCell>
              <TableCell data-label="Dealer Name">
                {data.firstname} {data.lastname}
              </TableCell>
              <TableCell data-label="Customer Name">
                {data.company_name}
              </TableCell>
              <TableCell data-label="Status" className="capitalize">
                {data.status === "active" ? (
                  <span className="btn-primary bg-green-400">
                    {data.status}
                  </span>
                ) : (
                  <span className="btn-primary bg-yellow-400">
                    {data.status}
                  </span>
                )}
              </TableCell>
              <TableCell data-label="View Details" className="text-center">
                <div className="flex gap-2 items-center flex-wrap">
                  {data.status === "pending" && (
                    <EditWarranty warranty={data} />
                  )}
                  <Link
                    href={`/dashboard/warranty/${data.id}`}
                    className="btn-primary"
                  >
                    View
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
export default RecentWarranties;
