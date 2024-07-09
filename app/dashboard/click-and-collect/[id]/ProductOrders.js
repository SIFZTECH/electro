import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { BASE_URL_IMAGE } from "@/app/lib/utils";
import Image from "next/image";

const ProductOrders = ({ data }) => {
  return (
    <div className="mt-12">
      <h1 className="heading-h1 mb-2 text-lg mt-4">Product On Order</h1>
      <Table className="mt-10 ">
        <TableHeader>
          <TableRow className="font-serif">
            <TableHead scope="col">Product Image</TableHead>
            <TableHead scope="col">Name</TableHead>
            <TableHead scope="col">Quantity</TableHead>
            {/* <TableHead scope="col">Commission</TableHead> */}
            <TableHead scope="col">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow key={data.id}>
            <TableCell data-label="Product Image" className="w-40">
              <Image
                height={100}
                width={100}
                src={`${BASE_URL_IMAGE}${data?.product_image}`}
                alt={data?.product_name}
              />
            </TableCell>
            <TableCell className="text-color-primary" data-label="Name">
              {data.product_name}
            </TableCell>
            <TableCell data-label="Quantity">{data.quantity}</TableCell>
            {/* <TableCell data-label="Commission">{data.commission}</TableCell> */}
            <TableCell data-label="Amount">{data.total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
export default ProductOrders;
