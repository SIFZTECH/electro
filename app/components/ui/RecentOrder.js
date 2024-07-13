import Link from "next/link";
import NotFoundData from "./NotFoundData";
import { useOrders } from "@/app/_features/orders/useOrders";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const RecentOrder = () => {
  const { data, isLoading, isError, error } = useOrders();

  return (
    <>
      {!isLoading && isError && error && (
        <NotFoundData message={error.response.data.message} />
      )}
      {!isLoading && !isError && !error && data && (
        <>
          <h2 className="text-xl font-serif mt-6">
            Recent clicks and Collect Orders
          </h2>
          <Table>
            <TableHeader>
              <TableRow className="font-serif">
                <TableHead>Order ID</TableHead>
                <TableHead>Dealer Name</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>View Details</TableHead>
                <TableHead>Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((data, i) => {
                return (
                  <TableRow key={i + 1}>
                    <TableCell data-label="Order ID">{data.order_id}</TableCell>
                    <TableCell data-label="Dealer Name">
                      {data.user.firstname} {data.user.lastname}
                    </TableCell>
                    <TableCell data-label="Customer Name">
                      {data.customer_name}
                    </TableCell>
                    <TableCell data-label="Status">
                      {data.status === "pending" && (
                        <span className="font-medium text-[15px] text-color-primary capitalize">
                          {data.status}
                        </span>
                      )}
                      {data.status === "collected" && (
                        <span className="font-medium text-[15px] text-green-400 capitalize">
                          {data.status}
                        </span>
                      )}
                      {data.status === "delivered" && (
                        <span className="font-semibold text-[15px] text-purple-400 capitalize">
                          {data.status}
                        </span>
                      )}
                      {data.status === "intransit" && (
                        <span className="font-medium text-[15px] text-sky-400 capitalize">
                          {data.status}
                        </span>
                      )}
                    </TableCell>
                    <TableCell
                      data-label="View Details"
                      className="text-center"
                    >
                      <Link
                        href={`/dashboard/click-and-collect/${data.id}`}
                        className="btn-primary"
                      >
                        View
                      </Link>
                    </TableCell>
                    <TableCell data-label="Invoice" className="text-center">
                      <Link
                        href={`dashboard/click-and-collect/invoice/${data.id}`}
                        className="btn-primary"
                      >
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
};
export default RecentOrder;
