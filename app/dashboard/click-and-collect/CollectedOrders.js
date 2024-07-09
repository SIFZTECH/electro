import { useOrders } from "@/app/_features/orders/useOrders";
import NotFoundData from "@/app/components/ui/NotFoundData";
import PaginationUI from "@/app/components/ui/PaginationUI";
import Spinner from "@/app/components/ui/Spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { PAGE_SIZE } from "@/app/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CollectedOrders = () => {
  const params = useSearchParams();
  const page = params.get("page") ? +params.get("page") : 1;
  const query = params.get("query") && params.get("query");

  const { data, isError, isLoading, error } = useOrders(
    page,
    query,
    "collected"
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {isError && error && (
        <NotFoundData message={error.response.data.message} />
      )}
      {!isError && !error && (
        <>
          {data?.data?.length === 0 ? (
            <NotFoundData message="There is no order!" />
          ) : (
            <>
              <Table className="mt-10 table_modify">
                <TableHeader>
                  <TableRow>
                    <TableHead scope="col">Order ID</TableHead>
                    <TableHead scope="col">Dealer Name</TableHead>
                    <TableHead scope="col">Customer Name</TableHead>
                    <TableHead scope="col">Status</TableHead>
                    <TableHead scope="col">View Details</TableHead>
                    <TableHead scope="col">Invoice</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.data.map((data, i) => {
                    return (
                      <TableRow key={i + 1}>
                        <TableCell data-label="Order ID">
                          {data.order_id}
                        </TableCell>
                        <TableCell data-label="Dealer Name">
                          {data.user.firstname} {data.user.lastname}
                        </TableCell>
                        <TableCell data-label="Customer Name">
                          {data.customer_name}
                        </TableCell>
                        <TableCell data-label="Status">
                          {data.status === "pending" && (
                            <span className="font-semibold text-[#FFB500] capitalize">
                              {data.status}
                            </span>
                          )}
                          {data.status === "collected" && (
                            <span className="font-semibold text-green-400 capitalize">
                              {data.status}
                            </span>
                          )}
                          {data.status === "delivered" && (
                            <span className="font-semibold text-purple-400 capitalize">
                              {data.status}
                            </span>
                          )}
                          {data.status === "intransit" && (
                            <span className="font-semibold text-sky-400 capitalize">
                              {data.status}
                            </span>
                          )}
                        </TableCell>
                        <TableCell
                          data-label="View Details"
                          className="text-center"
                        >
                          <Link
                            href={`click-and-collect/${data.id}`}
                            className="btn-primary"
                          >
                            View
                          </Link>
                        </TableCell>
                        <TableCell data-label="Invoice" className="text-center">
                          <Link
                            href={`click-and-collect/invoice/${data.id}`}
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
              <PaginationUI
                data={data}
                page={page}
                page_size={PAGE_SIZE}
                navigation="click-and-collect"
              />
            </>
          )}
        </>
      )}
     
    </>
  );
};
export default CollectedOrders;
