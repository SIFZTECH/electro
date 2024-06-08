import Link from "next/link";
import EditWarranty from "./EditWarranty";
import DeleteWarranty from "./DeleteWarranty";

const WarrantyProducts = ({ data }) => {
  const warranties = data.data;

  return (
    <div className="mt-10">
      {warranties.length === 0 ? (
        <h1 className="font-serif text-center text-xl">
          There is no warranties at that momment! Please add new Warranty
        </h1>
      ) : (
        <table className="mt-10 table_modify">
          <thead className="font-serif">
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
                  <td data-label="Status">
                    {data.status === "active" ? (
                      <span className="btn-primary bg-emerald-200">
                        {data.status}
                      </span>
                    ) : (
                      <span className="btn-primary bg-yellow-200">
                        {data.status}
                      </span>
                    )}
                  </td>
                  <td data-label="Actions">
                    <div className="flex gap-2">
                      <EditWarranty warranty={data} />
                      <DeleteWarranty warrantyId={data.id} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default WarrantyProducts;
