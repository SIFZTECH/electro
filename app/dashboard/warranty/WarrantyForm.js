import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const WarrantyForm = ({ register, errors, handleSubmit }) => {
  return (
    <form className="md:py-8 p-2 md:px-6" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="flex items-center  gap-2 justify-center my-3 mb-6">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 3L23 3L23 24L20 22L17 24L14 22L11 24L8 22L5 24L5 3Z"
            stroke="#FFB500"
            strokeWidth="2.4"
            strokeMiterlimit="10"
            strokeLinecap="square"
          />
          <path
            d="M9 9L14 9"
            stroke="#FFB500"
            strokeWidth="2.4"
            strokeMiterlimit="10"
            strokeLinecap="square"
          />
          <path
            d="M18 9H19"
            stroke="#FFB500"
            strokeWidth="2.4"
            strokeMiterlimit="10"
            strokeLinecap="square"
          />
          <path
            d="M9 13L14 13"
            stroke="#FFB500"
            strokeWidth="2.4"
            strokeMiterlimit="10"
            strokeLinecap="square"
          />
          <path
            d="M18 13H19"
            stroke="#FFB500"
            strokeWidth="2.4"
            strokeMiterlimit="10"
            strokeLinecap="square"
          />
          <path
            d="M9 17H14"
            stroke="#FFB500"
            strokeWidth="2.4"
            strokeMiterlimit="10"
            strokeLinecap="square"
          />
          <path
            d="M18 17H19"
            stroke="#FFB500"
            strokeWidth="2.4"
            strokeMiterlimit="10"
            strokeLinecap="square"
          />
        </svg>
        <span className="font-semibold font-serif">Register your Warranty</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-9 gap-y-3">
        <div className="">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
            First Name
          </label>
          <div className="mt-1">
            <input
              {...register("firstname", {
                required: "This field is required",
              })}
              type="text"
              placeholder="First Name"
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            {errors?.firstname && (
              <span className="text-red-500 text-sm">
                {errors.firstname.message}
              </span>
            )}
          </div>
        </div>
        <div className="">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
            Last Name
          </label>
          <div className="mt-1">
            <input
              {...register("lastname", {
                required: "This field is required",
              })}
              id="lastName"
              type="text"
              placeholder="Last Name"
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            {errors?.lastname && (
              <span className="text-red-500 text-sm">
                {errors.lastname.message}
              </span>
            )}
          </div>
        </div>
        <div className="">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
            Email
          </label>
          <div className="mt-1">
            <input
              {...register("email", {
                required: "This field is required",
              })}
              type="email"
              placeholder="Your Email Address"
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            {errors?.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        <div className="">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
            Phone Number
          </label>
          <div className="mt-1">
            <input
              {...register("phone", {
                required: "This field is required",
              })}
              type="tel"
              placeholder="Phone Number"
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            {errors?.phone && (
              <span className="text-red-500 text-sm">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>

        <div className="">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
            Company Name
          </label>
          <div className="mt-1">
            <input
              {...register("company_name", {
                required: "This field is required",
              })}
              type="text"
              placeholder="Company Name"
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            {errors?.company_name && (
              <span className="text-red-500 text-sm">
                {errors.company_name.message}
              </span>
            )}
          </div>
        </div>
        <div className="">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
            Address
          </label>
          <div className="mt-1">
            <input
              {...register("address", {
                required: "This field is required",
              })}
              type="text"
              placeholder="Street Address"
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            {errors?.address && (
              <span className="text-red-500 text-sm">
                {errors.address.message}
              </span>
            )}
          </div>
        </div>

        <div className="">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
            Purchase From
          </label>
          <input
            {...register("purchase_from", {
              required: "This field is required",
            })}
            type="date"
            placeholder="Purchase from"
            className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
          {errors?.purchase_from && (
            <span className="text-red-500 text-sm">
              {errors.purchase_from.message}
            </span>
          )}
        </div>
        <div className="">
          <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
            Purchase Date
          </label>
          <input
            {...register("purchase_date", {
              required: "This field is required",
            })}
            type="date"
            placeholder="Purchase Date"
            className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
          {errors?.purchase_date && (
            <span className="text-red-500 text-sm">
              {errors.purchase_date.message}
            </span>
          )}
        </div>

        <div className="border-[1.5px] border-gray-300 p-3 shadow-sm flex flex-col gap-3 rounded-md">
          <div className="">
            <label className="flex items-center gap-1 text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              <span>Invoice Number</span>
              <AiOutlineExclamationCircle size={18} />
            </label>
            <div className="mt-1">
              <input
                {...register("invoice_number", {
                  required: "This field is required",
                })}
                type="text"
                placeholder="Invoice Number"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.invoice_number && (
                <span className="text-red-500 text-sm">
                  {errors.invoice_number.message}
                </span>
              )}
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
              Upload your Invoice
            </label>
            <div className="mt-1">
              <small className="text-sm mb-1">
                Your photo should be PNG or JPG format
              </small>
              <input
                {...register("invoice_image")}
                type="file"
                placeholder="Upload your Invoice"
                accept=".png,.jpg,.jpeg"
                className="block w-full rounded-md py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6 file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold file:ring-1
                file:ring-color-primary file:text-color-primary
                file:hover:ring-2 file:bg-transparent"
              />
            </div>
          </div>
        </div>
        <div className="border-[1.5px] border-gray-300 p-3 shadow-sm flex flex-col gap-3 rounded-md">
          <div className="">
            <label className="flex items-center gap-1 text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              <span>Bike Frame Serial Number</span>
              <AiOutlineExclamationCircle size={18} />
            </label>
            <div className="mt-1">
              <input
                {...register("bike_frame_serial_no", {
                  required: "This field is required",
                })}
                type="text"
                placeholder="Bike Frame Serial Number"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.bike_frame_serial_no && (
                <span className="text-red-500 text-sm">
                  {errors.bike_frame_serial_no.message}
                </span>
              )}
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
              Upload your Bike Frame Serial Number
            </label>
            <div className="mt-1">
              <small className="text-sm mb-1">
                Your photo should be PNG or JPG format
              </small>
              <input
                {...register("frame_serial_no_image")}
                type="file"
                accept=".png,.jpg,.jpeg"
                placeholder="Upload your Invoice"
                className="block w-full rounded-md py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6 file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold file:ring-1
                file:ring-color-primary file:text-color-primary
                file:hover:ring-2 file:bg-transparent"
              />
            </div>
          </div>
        </div>
        <div className="border-[1.5px] border-gray-300 p-3 shadow-sm flex flex-col gap-3 rounded-md">
          <div className="">
            <label className="flex items-center gap-1 text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              <span>Bike Battary Serial Number </span>
              <AiOutlineExclamationCircle size={18} />
            </label>
            <div className="mt-1">
              <input
                {...register("bike_battery_serial_no", {
                  required: "This field is required",
                })}
                type="text"
                placeholder="Bike Battary Serial Number"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.bike_battery_serial_no && (
                <span className="text-red-500 text-sm">
                  {errors.bike_battery_serial_no.message}
                </span>
              )}
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
              Upload your Bike Battary Serial Number
            </label>
            <div className="mt-1">
              <small className="text-sm mb-1">
                Your photo should be PNG or JPG format
              </small>
              <input
                {...register("battery_serial_no_image")}
                type="file"
                accept=".png,.jpg,.jpeg"
                className="block w-full rounded-md py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6 file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold file:ring-1
                file:ring-color-primary file:text-color-primary
                file:hover:ring-2 file:bg-transparent"
              />
            </div>
          </div>
        </div>
        <div className="border-[1.5px] border-gray-300 p-3 shadow-sm flex flex-col gap-3 rounded-md">
          <div className="">
            <label className="flex items-center gap-1 text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
              <span>Bike Motor Serial Number</span>
              <AiOutlineExclamationCircle size={18} />
            </label>
            <div className="mt-1">
              <input
                type="text"
                {...register("bike_motor_serial_no", {
                  required: "This field is required",
                })}
                placeholder="Bike Motor Serial Number"
                className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.bike_motor_serial_no && (
                <span className="text-red-500 text-sm">
                  {errors.bike_motor_serial_no.message}
                </span>
              )}
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
              Upload your Bike Motor Serial Number
            </label>
            <div className="mt-1">
              <small className="text-sm mb-1">
                Your photo should be PNG or JPG format
              </small>
              <input
                {...register("motor_serial_no_image")}
                type="file"
                accept=".png,.jpg,.jpeg"
                className="block w-full rounded-md py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6 file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold file:ring-1
                file:ring-color-primary file:text-color-primary
                file:hover:ring-2 file:bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="btn-primary mt-5 font-semibold rounded-sm px-6 py-2"
      >
        {isSubmitting ? <SpinnerMini /> : "Save"}
      </button>
    </form>
  );
};

export default WarrantyForm;