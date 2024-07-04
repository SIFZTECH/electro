"use client";
import { useWarranty } from "@/app/_features/warranties/useWarranty";
import Spinner from "@/app/components/ui/Spinner";
import Image from "next/image";
import DeleteWarranty from "../DeleteWarranty";
import EditWarranty from "../EditWarranty";
import { BASE_URL_IMAGE } from "@/app/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";

const WarrantyPageInfo = ({ params }) => {
  const { warrantyId } = params;
  const { data, isLoading, isError, error } = useWarranty(warrantyId);

  console.log(data);

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
          <table className="table-fixed w-full">
            <tbody>
              <tr>
                <td className="font-semibold">Status:</td>
                <td>
                  {warranty.status === "active" ? (
                    <span className="btn-primary bg-green-300 capitalize">
                      {warranty.status}
                    </span>
                  ) : (
                    <span className="btn-primary bg-yellow-300 capitalize">
                      {warranty.status}
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Company Name:</td>
                <td className="font-semibold">{warranty.company_name}</td>
              </tr>
              <tr>
                <td className="font-semibold">Name:</td>
                <td className="font-semibold">
                  {warranty.firstname} {warranty.lastname}
                </td>
              </tr>
              <tr>
                <td className="font-semibold">ID:</td>
                <td>{warranty.id}</td>
              </tr>
              <tr>
                <td className="font-semibold">Created At:</td>
                <td>{new Date(warranty.created_at).toDateString()}</td>
              </tr>
              <tr>
                <td className="font-semibold">Address:</td>
                <td>{warranty.address}</td>
              </tr>
              <tr>
                <td className="font-semibold">Email:</td>
                <td>{warranty.email}</td>
              </tr>
              <tr>
                <td className="font-semibold">Phone No:</td>
                <td>{warranty.phone}</td>
              </tr>
              <tr>
                <td className="font-semibold">Purchase From:</td>
                <td>{warranty.purchase_from}</td>
              </tr>
              <tr>
                <td className="font-semibold">Purchase Date:</td>
                <td>{warranty.purchase_date}</td>
              </tr>
              <tr>
                <td className="font-semibold">Updated at:</td>
                <td>{new Date(warranty.updated_at).toDateString()}</td>
              </tr>
              <tr>
                <td className="font-semibold">Bike Battary Serial No:</td>
                <td>{warranty.bike_battery_serial_no}</td>
              </tr>
              <tr>
                <td className="font-semibold">Bike Frame Serial No:</td>
                <td>{warranty.bike_frame_serial_no}</td>
              </tr>
              <tr>
                <td className="font-semibold">Bike Motor Serial No:</td>
                <td>{warranty.bike_motor_serial_no}</td>
              </tr>
              <tr>
                <td className="font-semibold">Invoice No:</td>
                <td>{warranty.invoice_number}</td>
              </tr>
            </tbody>
          </table>

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
