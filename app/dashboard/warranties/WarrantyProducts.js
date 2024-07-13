import Link from "next/link";
import EditWarranty from "./EditWarranty";
import DeleteWarranty from "./DeleteWarranty";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

const WarrantyProducts = ({ data }) => {
  const warranties = data?.data;

  return (
    <div className="mt-10">
      {warranties.length === 0 ? (
        <h1 className="font-serif text-center text-xl">
          There is no warranties at that momment! Please add new Warranty
        </h1>
      ) : (
        <Table className="mt-10">
          <TableHeader className="font-serif">
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Dealer Name</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>View Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {warranties.map((data, i) => {
              return (
                <TableRow key={i + 1}>
                  <TableCell data-label="Order ID">{data.id}</TableCell>
                  <TableCell data-label="Dealer Name">
                    {data?.dealer?.firstname} {data?.dealer?.lastname}
                  </TableCell>
                  <TableCell data-label="Customer Name">
                    {data.firstname} {data.lastname}
                  </TableCell>
                  <TableCell data-label="Status">
                    {data.status === "approve" && (
                      <span className="btn-primary bg-green-400">
                        {data.status}
                      </span>
                    )}
                    {data.status === "active" && (
                      <span className="btn-primary bg-purple-400 text-white">
                        {data.status}
                      </span>
                    )}
                    {data.status === "pending" && (
                      <span className="btn-primary bg-yellow-400">
                        {data.status}
                      </span>
                    )}
                    {data.status === "decline" && (
                      <span className="btn-primary bg-red-400 text-white">
                        {data.status}
                      </span>
                    )}
                  </TableCell>
                  <TableCell data-label="Actions">
                    <div className="flex gap-2 flex-wrap justify-end xl:justify-normal">
                      <Link
                        className="btn-primary"
                        href={`/dashboard/warranties/${data.id}`}
                      >
                        View Details
                      </Link>
                      <EditWarranty warranty={data} />
                      <DeleteWarranty warrantyId={data.id} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
export default WarrantyProducts;
