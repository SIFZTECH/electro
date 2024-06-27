import { useOrders } from "@/app/_features/orders/useOrders";
import Spinner from "@/app/components/ui/Spinner";
import Link from "next/link";

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
  const { data, isError, isLoading, error } = useOrders();

  if (isLoading) {
    return <Spinner />;
  }

  return (
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
                <td data-label="Dealer Name">{data.dealer_name || "-"}</td>
                <td data-label="Customer Name">{data.customer_name}</td>
                <td data-label="Status">{data.status}</td>
                <td data-label="View Details" className="text-center">
                  <Link
                    href={`click-and-collect/${data.id}`}
                    className="btn-primary"
                  >
                    View
                  </Link>
                </td>
                <td data-label="Invoice" className="text-center">
                  <a href="#" className="btn-primary">
                    View
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
