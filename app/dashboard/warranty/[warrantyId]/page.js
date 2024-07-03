"use client";
import { useWarranty } from "@/app/_features/warranties/useWarranty";
import Spinner from "@/app/components/ui/Spinner";
import Image from "next/image";
import DeleteWarranty from "../DeleteWarranty";
import EditWarranty from "../EditWarranty";
import { BASE_URL_IMAGE } from "@/app/lib/utils";

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
          {warranty.status === "active" ? (
            <span className="btn-primary bg-green-300 capitalize">
              {warranty.status}
            </span>
          ) : (
            <span className="btn-primary bg-yellow-300 capitalize">
              {warranty.status}
            </span>
          )}

          <h1>
            Company Name:
            <span className="font-semibold font-serif">
              &nbsp;{warranty.company_name}
            </span>
          </h1>
          <h1 className="font-semibold font-serif">
            {warranty.firstname} {warranty.lastname}
          </h1>

          <p>
            ID: <span className="font-medium">{warranty.id}</span>
          </p>
          <p>
            Created At:
            <span className="font-medium">
              {" "}
              {new Date(warranty.created_at).toDateString()}
            </span>
          </p>

          <p>
            Address: <span className="font-medium">{warranty.address}</span>
          </p>
          <p>
            Email: <span className="font-medium">{warranty.email}</span>
          </p>
          <p>
            Phone No:<span className="font-medium"> {warranty.phone}</span>
          </p>
          <p>
            Purchase From:
            <span className="font-medium"> {warranty.purchase_from}</span>
          </p>
          <p>
            Purchase Date:
            <span className="font-medium"> {warranty.purchase_date}</span>
          </p>
          <p>
            Updated at:
            <span className="font-medium">
              {" "}
              {new Date(warranty.updated_at).toDateString()}
            </span>
          </p>

          <div className="flex gap-4 flex-wrap items-start !mt-6">
            {warranty.battery_serial_no_image && (
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
            )}
            {warranty.frame_serial_no_image && (
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
            )}
            {warranty.invoice_image && (
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
            )}
            {warranty.invoice_image && (
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
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default WarrantyPageInfo;
