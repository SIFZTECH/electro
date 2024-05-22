const page = () => {
  return (
    <form className="md:py-8 p-2 md:px-6 ">
      <div className="flex flex-wrap flex-col md:flex-row gap-x-9 gap-y-6">
        <div className="md:basis-[45%]">
          <label
            htmlFor="firstName"
            className="block text-sm font-semibold font-serif leading-6 text-gray-900"
          >
            First Name
          </label>
          <div className="mt-1">
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              required
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="md:basis-[45%]">
          <label
            htmlFor="lastName"
            className="block text-sm font-semibold font-serif leading-6 text-gray-900"
          >
            Last Name
          </label>
          <div className="mt-1">
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              required
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="md:basis-[45%]">
          <label
            htmlFor="email"
            className="block text-sm font-semibold font-serif leading-6 text-gray-900"
          >
            Email
          </label>
          <div className="mt-1">
            <input
              id="firstName"
              name="text"
              type="email"
              placeholder="Your Email"
              required
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="md:basis-[45%]">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-semibold font-serif leading-6 text-gray-900"
          >
            Phone Number
          </label>
          <div className="mt-1">
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="Phone Number"
              required
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="md:basis-[45%]">
          <label
            htmlFor="companyName"
            className="block text-sm font-semibold font-serif leading-6 text-gray-900"
          >
            Company Name
          </label>
          <div className="mt-1">
            <input
              id="companyName"
              name="companyName"
              type="text"
              placeholder="Company Name"
              required
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="md:basis-[45%]">
          <label
            htmlFor="webUrl"
            className="block text-sm font-semibold font-serif leading-6 text-gray-900"
          >
            Web Url
          </label>
          <div className="mt-1">
            <input
              id="webUrl"
              name="webUrl"
              type="url"
              placeholder="Web Url"
              required
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="md:basis-[45%]">
          <label
            htmlFor="abn-select"
            className="block text-sm font-semibold font-serif leading-6 text-gray-900"
          >
            ABN
          </label>
          <select
            name="abn"
            id="abn-select"
            className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
          >
            <option value="">--Please choose an option--</option>
            <option value="abn">ABN</option>
            <option value="abn">TV5</option>
          </select>
        </div>
        <div className="md:basis-[45%]">
          <label
            htmlFor="date-select"
            className="block text-sm font-semibold font-serif leading-6 text-gray-900"
          >
            Purchase Date
          </label>
          <select
            name="purchaseDate"
            id="date-select"
            className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
          >
            <option value="">--Please choose an option--</option>
            <option value="abn">ABN</option>
            <option value="abn">TV5</option>
          </select>
        </div>
        <div className="md:basis-[45%]">
          <label
            htmlFor="invoiceNumber"
            className="block text-sm font-semibold font-serif leading-6 text-gray-900"
          >
            Invoice Number
          </label>
          <div className="mt-1">
            <input
              id="invoiceNumber"
              name="invoiceNumber"
              type="number"
              placeholder="Invoice Number"
              required
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="md:basis-[45%]">
          <label
            htmlFor="description"
            className="block text-sm font-semibold font-serif leading-6 text-gray-900"
          >
            Description
          </label>
          <div className="mt-1">
            <textarea
              id="description"
              name="description"
              type="text"
              cols="45"
              placeholder="Description"
              required
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="md:basis-[45%]">
          <label
            htmlFor="streetAddress"
            className="block text-sm font-semibold font-serif leading-6 text-gray-900"
          >
            Street Address
          </label>
          <div className="mt-1">
            <input
              id="streetAddress"
              name="streetAddress"
              type="text"
              placeholder="Street Address"
              required
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="md:basis-[45%]">
          <label
            htmlFor="postalCode"
            className="block text-sm font-semibold font-serif leading-6 text-gray-900"
          >
            Postal Code
          </label>
          <div className="mt-1">
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              placeholder="Postal Code"
              required
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="md:basis-[45%]">
          <label
            htmlFor="state"
            className="block text-sm font-semibold font-serif leading-6 text-gray-900"
          >
            State
          </label>
          <div className="mt-1">
            <input
              id="state"
              name="state"
              type="text"
              placeholder="State"
              required
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="md:basis-[45%]">
          <label
            htmlFor="logo"
            className="block text-sm font-semibold font-serif leading-6 text-gray-900"
          >
            Upload your logo
          </label>
          <div className="mt-1">
            <input
              id="logo"
              name="logo"
              type="file"
              placeholder="Upload"
              required
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-color-primary/20 file:text-color-gray-200
              hover:file:bg-color-primary/30"
            />
          </div>
        </div>
        <div className="md:basis-[45%]">
          <label
            htmlFor="stockin"
            className="block text-sm font-semibold font-serif leading-6 text-gray-900"
          >
            Stock in Stock feed url
          </label>
          <div className="mt-1">
            <input
              id="stockin"
              name="stockinFeed"
              type="url"
              placeholder="State"
              required
              className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="btn-primary mt-5 font-semibold rounded-sm px-6 py-2"
      >
        Save
      </button>
    </form>
  );
};

export default page;
