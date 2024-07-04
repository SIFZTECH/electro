import { useOrders } from "@/app/_features/orders/useOrders";
import NotFoundData from "@/app/components/ui/NotFoundData";
import PaginationUI from "@/app/components/ui/PaginationUI";
import Spinner from "@/app/components/ui/Spinner";
import { PAGE_SIZE } from "@/app/lib/utils";
import Search from "@/app/components/ui/Search";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const AllOrders = () => {
  const params = useSearchParams();
  const page = params.get("page") ? +params.get("page") : 1;
  const query = params.get("query") && params.get("query");

  const { data, isError, isLoading, error } = useOrders(page, query);

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
              <Search navigateTo="click-and-collect" />
              <table className="!mt-8 table_modify">
                <thead>
                  <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Dealer Name</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">View Details</th>
                    <th scope="col">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((data, i) => {
                    return (
                      <tr key={i + 1}>
                        <td data-label="Order ID">{data.order_id}</td>
                        <td data-label="Dealer Name">
                          {data.user.firstname} {data.user.lastname}
                        </td>
                        <td data-label="Customer Name">{data.customer_name}</td>
                        <td data-label="Status" className="font-sans">
                          {data.status === "pending" && (
                            <span className="font-semibold text-[15px] text-yellow-400 capitalize">
                              {data.status}
                            </span>
                          )}
                          {data.status === "collected" && (
                            <span className="font-semibold text-[15px] text-green-400 capitalize">
                              {data.status}
                            </span>
                          )}
                          {data.status === "delivered" && (
                            <span className="font-semibold text-[15px] text-purple-400 capitalize">
                              {data.status}
                            </span>
                          )}
                          {data.status === "intransit" && (
                            <span className="font-semibold text-[15px] text-sky-400 capitalize">
                              {data.status}
                            </span>
                          )}
                        </td>
                        <td data-label="View Details" className="text-center">
                          <Link
                            href={`click-and-collect/${data.id}`}
                            className="btn-primary"
                          >
                            View
                          </Link>
                        </td>
                        <td data-label="Invoice" className="text-center">
                          <Link
                            href={`click-and-collect/invoice/${data.id}`}
                            className="btn-primary"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
export default AllOrders;
