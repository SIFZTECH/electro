import Link from "next/link";
import EditWarranty from "./EditWarranty";
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
    <>
      {warranties.lengTableHead === 0 ? (
        <h1 className="font-serif text-center text-xl">
          There is no warranties at that momment! Please add new Warranty
        </h1>
      ) : (
        <Table className="mt-10 table_modify">
          <TableHeader className="font-serif">
            <TableRow>
              <TableHead scope="col">Order ID</TableHead>
              <TableHead scope="col">Dealer Name</TableHead>
              <TableHead scope="col">Customer Name</TableHead>
              <TableHead scope="col">Status</TableHead>
              <TableHead scope="col">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {warranties.map((data, i) => {
              return (
                <TableRow key={i + 1}>
                  <TableCell data-label="Order ID">{data.id}</TableCell>
                  <TableCell data-label="Dealer Name">
                    {data.firstname} {data.lastname}
                  </TableCell>
                  <TableCell data-label="Customer Name">
                    {data.company_name}
                  </TableCell>
                  <TableCell data-label="Status" className="capitalize">
                    {data.status === "active" ? (
                      <span className="btn-primary bg-green-300">
                        {data.status}
                      </span>
                    ) : (
                      <span className="btn-primary bg-yellow-300">
                        {data.status}
                      </span>
                    )}
                  </TableCell>
                  <TableCell data-label="View Details" className="text-center">
                    <div className="flex gap-2 items-center flex-wrap">
                      {data.status === "pending" && (
                        <EditWarranty warranty={data} />
                      )}
                      <Link
                        href={`/dashboard/warranty/${data.id}`}
                        className="btn-primary"
                      >
                        View
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
};
export default WarrantyProducts;
