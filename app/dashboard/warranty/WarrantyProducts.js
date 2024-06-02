import Link from "next/link";

const dummyData = [
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 1",
    customerName: "Jane Smith",
  },
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 2",
    customerName: "Jane Smith",
  },
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 3",
    customerName: "Jane Smith 2",
  },
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 4",
    customerName: "Jane Smith",
  },
];

const WarrantyProducts = ({ data }) => {
  const warranties = data.data;

  return (
    <table className="mt-10 recentOrders">
      <thead>
        <tr>
          <th scope="col">Order ID</th>
          <th scope="col">Dealer Name</th>
          <th scope="col">Customer Name</th>
          <th scope="col">Status</th>
          <th scope="col">View Details</th>
        </tr>
      </thead>
      <tbody>
        {warranties.map((data, i) => {
          return (
            <tr key={i + 1}>
              <td data-label="Order ID">{data.id}</td>
              <td data-label="Dealer Name">
                {data.firstname} {data.lastname}
              </td>
              <td data-label="Customer Name">{data.company_name}</td>
              <td data-label="Status">{data.status}</td>
              <td data-label="View Details" className="text-center">
                <Link
                  href={`/dashboard/warranty/${data.id}`}
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
  );
};
export default WarrantyProducts;
