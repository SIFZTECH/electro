import Link from "next/link";

const WarrantyProducts = ({ data }) => {
  const warranties = data.data;

  return (
    <>
      {warranties.length === 0 ? (
        <h1 className="font-serif text-center text-xl">
          There is no warranties at that momment! Please add new Warranty
        </h1>
      ) : (
        <table className="mt-10 table_modify">
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
                  {/* <td data-label="View Details" className="text-center">
                    <Link
                      href={`/dashboard/warranties/${data.id}`}
                      className="btn-primary"
                    >
                      View
                    </Link>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
export default WarrantyProducts;
