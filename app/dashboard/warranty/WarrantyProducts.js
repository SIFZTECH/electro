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
        <Table className="mt-10">
          <TableHeader className="font-serif">
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Dealer Name</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            Tyd
            {warranties.map((data, i) => {
              return (
                <TableRow key={i + 1}>
                  <TableCell>{data.id}</TableCell>
                  <TableCell>
                    {data.firstname} {data.lastname}
                  </TableCell>
                  <TableCell>{data.company_name}</TableCell>
                  <TableCell className="capitalize">
                    {data.status === "active" ? (
                      <span className="btn-primary bg-green-400">
                        {data.status}
                      </span>
                    ) : (
                      <span className="btn-primary bg-yellow-400">
                        {data.status}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
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
