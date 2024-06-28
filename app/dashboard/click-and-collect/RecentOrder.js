import { useOrders } from "@/app/_features/orders/useOrders";
import NotFoundData from "@/app/components/ui/NotFoundData";
import PaginationUI from "@/app/components/ui/PaginationUI";
import Spinner from "@/app/components/ui/Spinner";
import { PAGE_SIZE } from "@/app/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const dummyData = [
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 1",
    customerName: "Jane Smith",
    status: "New",
    deatils: "test",
    invoice: "test",
  },
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 2",
    customerName: "Jane Smith",
    status: "Prev",
    deatils: "test",
    invoice: "test",
  },
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 3",
    customerName: "Jane Smith 2",
    status: "Instrasit",
    deatils: "test",
    invoice: "test",
  },
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 4",
    customerName: "Jane Smith",
    status: "New",
    deatils: "#",
    invoice: "#",
  },
];

const RecentOrder = () => {
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
              <table className="mt-10 table_modify">
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
                        <td data-label="Status">
                          {data.status === "pending" && (
                            <span className="font-semibold text-yellow-400 capitalize">
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
      <div className="flex justify-end mt-8 px-3">
        <Link
          className="btn-primary"
          href="/dashboard/click-and-collect/create-order"
        >
          Create Order
        </Link>
      </div>
    </>
  );
};
export default RecentOrder;
