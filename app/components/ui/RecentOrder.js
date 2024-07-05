import Link from "next/link";
import NotFoundData from "./NotFoundData";
import { useOrders } from "@/app/_features/orders/useOrders";

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
  const { data, isLoading, isError, error } = useOrders();

  return (
    <>
      {isError && error && (
        <NotFoundData message={error.response.data.message} />
      )}
      {!isError && !error && data && (
        <>
          {data?.data?.length === 0 ? (
            <>
              <h2 className="text-xl font-serif">
                Recent clicks and Collect Orders
              </h2>
              <div className="p-3 border border-gray-200 shadow-md inline-block mt-4">
                There is no order!
              </div>
            </>
          ) : (
            <>
              <table className="!mt-8 table_modify">
                <caption className="heading-h1">
                  Recent clicks and Collect Orders
                </caption>

                <thead>
                  <tr className="font-serif">
                    <th scope="col">Order ID</th>
                    <th scope="col">Dealer Name</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">View Details</th>
                    <th scope="col">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((data, i) => {
                    return (
                      <tr key={i + 1}>
                        <td data-label="Order ID">{data.order_id}</td>
                        <td data-label="Dealer Name">
                          {data.user.firstname} {data.user.lastname}
                        </td>
                        <td data-label="Customer Name">{data.customer_name}</td>
                        <td data-label="Status">
                          {data.status === "pending" && (
                            <span className="font-medium text-[15px] text-[#FFB500] capitalize">
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
                        </td>
                        <td data-label="View Details" className="text-center">
                          <Link
                            href={`/dashboard/click-and-collect/${data.id}`}
                            className="btn-primary"
                          >
                            View
                          </Link>
                        </td>
                        <td data-label="Invoice" className="text-center">
                          <Link
                            href={`dashboard/click-and-collect/invoice/${data.id}`}
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
            </>
          )}
        </>
      )}
    </>
  );
};
export default RecentOrder;
