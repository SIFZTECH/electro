import { BASE_URL_IMAGE } from "@/app/lib/utils";
import Image from "next/image";


const ProductOrders = ({ data }) => {
  return (
    <div className="mt-12">
      <h1 className="heading-h1 mb-2 text-lg mt-4">Product On Order</h1>
      <table className="mt-10 table_modify">
        <thead>
          <tr className="font-serif">
            <th scope="col">Product Image</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            {/* <th scope="col">Commission</th> */}
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr key={data.id}>
            <td data-label="Product Image" className="w-40">
              <Image
                height={100}
                width={100}
                src={`${BASE_URL_IMAGE}${data?.product_image}`}
                alt={data?.product_name}
              />
            </td>
            <td className="text-color-primary" data-label="Name">
              {data.product_name}
            </td>
            <td data-label="Quantity">{data.quantity}</td>
            {/* <td data-label="Commission">{data.commission}</td> */}
            <td data-label="Amount">{data.total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default ProductOrders;
