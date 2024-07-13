"use client";
import { useWarranty } from "@/app/_features/warranties/useWarranty";
import Spinner from "@/app/components/ui/Spinner";
import Image from "next/image";
import { BASE_URL_IMAGE } from "@/app/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/app/components/ui/table";

const WarrantyPageInfo = ({ params }) => {
  const { warrantyId } = params;
  const { data, isLoading, isError, error } = useWarranty(warrantyId);

  if (isLoading) return <Spinner />;

  const warranty = data.data;

  return (
    <>
      {isError && error && (
        <h1 className="font-serif text-center text-xl">
          There is no warranty with that id
        </h1>
      )}
      {!isLoading && !isError && !error && (
        <div className="space-y-2">
          <Table className="border border-gray-200 bg-gray-100">
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Status:</TableCell>
                <TableCell>
                  {warranty.status === "active" ? (
                    <span className="btn-primary bg-green-400 capitalize">
                      {warranty.status}
                    </span>
                  ) : (
                    <span className="btn-primary bg-yellow-400 capitalize">
                      {warranty.status}
                    </span>
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-semibold">Name:</TableCell>
                <TableCell className="font-semibold">
                  {warranty.firstname} {warranty.lastname}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">ID:</TableCell>
                <TableCell>{warranty.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Created At:</TableCell>
                <TableCell>
                  {new Date(warranty.created_at).toDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Address Line</TableCell>
                <TableCell>{warranty.address_line}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Address Line 1</TableCell>
                <TableCell>{warranty.address_line1}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">State</TableCell>
                <TableCell>{warranty.state}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Country</TableCell>
                <TableCell>{warranty.country}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Email:</TableCell>
                <TableCell>{warranty.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Phone No:</TableCell>
                <TableCell>{warranty.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Purchase From:</TableCell>
                <TableCell>{warranty.purchase_from}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Purchase Date:</TableCell>
                <TableCell>{warranty.purchase_date}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Updated at:</TableCell>
                <TableCell>
                  {new Date(warranty.updated_at).toDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">
                  Bike Battary Serial No:
                </TableCell>
                <TableCell>{warranty.bike_battery_serial_no}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">
                  Bike Frame Serial No:
                </TableCell>
                <TableCell>{warranty.bike_frame_serial_no}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">
                  Bike Motor Serial No:
                </TableCell>
                <TableCell>{warranty.bike_motor_serial_no}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Invoice No:</TableCell>
                <TableCell>{warranty.invoice_number}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="flex gap-4 flex-wrap items-start !mt-6">
            {warranty.battery_serial_no_image && (
              <Dialog>
                <DialogTrigger>
                  <div className="border border-gray-100 shadow-sm rounded-sm w-fit p-3">
                    <p>
                      Bike Battary serial no:
                      <span className="font-medium">
                        {warranty.bike_battery_serial_no}
                      </span>
                    </p>
                    <Image
                      src={`${BASE_URL_IMAGE}${warranty.battery_serial_no_image}`}
                      width={400}
                      height={320}
                      alt={`${warranty.company_name}`}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <Image
                    src={`${BASE_URL_IMAGE}${warranty.battery_serial_no_image}`}
                    width={1200}
                    height={820}
                    alt={`${warranty.company_name}`}
                  />
                </DialogContent>
              </Dialog>
            )}
            {warranty.frame_serial_no_image && (
              <Dialog>
                <DialogTrigger>
                  <div className="border border-gray-100 shadow-sm rounded-sm w-fit p-3">
                    <p>
                      Bike Frame serial no:
                      <span className="font-medium">
                        &nbsp;{warranty.bike_frame_serial_no}
                      </span>
                    </p>
                    <Image
                      src={`${BASE_URL_IMAGE}${warranty.frame_serial_no_image}`}
                      width={400}
                      height={320}
                      alt={warranty.company_name}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <Image
                    src={`${BASE_URL_IMAGE}${warranty.frame_serial_no_image}`}
                    width={1200}
                    height={820}
                    alt={warranty.company_name}
                  />
                </DialogContent>
              </Dialog>
            )}
            {warranty.invoice_image && (
              <Dialog>
                <DialogTrigger>
                  <div className="border border-gray-100 shadow-sm rounded-sm w-fit p-3">
                    <p>
                      Bike Motor serial no:
                      <span className="font-medium">
                        &nbsp;{warranty.bike_motor_serial_no}
                      </span>
                    </p>
                    <Image
                      src={`${BASE_URL_IMAGE}${warranty.motor_serial_no_image}`}
                      width={400}
                      height={320}
                      alt={warranty.company_name}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <Image
                    src={`${BASE_URL_IMAGE}${warranty.motor_serial_no_image}`}
                    width={1200}
                    height={820}
                    alt={warranty.company_name}
                  />
                </DialogContent>
              </Dialog>
            )}
            {warranty.invoice_image && (
              <Dialog>
                <DialogTrigger>
                  <div className="border border-gray-100 shadow-sm rounded-sm w-fit p-3">
                    <p>
                      Invoice no:
                      <span className="font-medium">
                        &nbsp;{warranty.invoice_number}
                      </span>
                    </p>
                    <Image
                      src={`${BASE_URL_IMAGE}${warranty.invoice_image}`}
                      width={400}
                      height={320}
                      alt={warranty.company_name}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <Image
                    src={`${BASE_URL_IMAGE}${warranty.invoice_image}`}
                    width={1200}
                    height={820}
                    alt={warranty.company_name}
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default WarrantyPageInfo;
