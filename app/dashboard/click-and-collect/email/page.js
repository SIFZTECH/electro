const page = () => {
  return (
    <div>
      <h1 className="heading-h1">Email: 18INV34570</h1>
      <div className="mt-4 space-y-5">
        <div className="flex items-center gap-6">
          <label className="text-sm font-semibold font-serif leading-6 text-gray-900">
            To:
          </label>
          <input
            placeholder="example@email.com"
            className="w-2/4 rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            type="email"
          />
        </div>
        <div className="flex items-center gap-6">
          <label className="text-sm font-semibold font-serif leading-6 text-gray-900">
            CC:
          </label>
          <input
            placeholder="Your cc"
            className="w-2/4 rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            type="text"
          />
        </div>
        <div className="flex items-center gap-6">
          <label className="text-sm font-semibold font-serif leading-6 text-gray-900">
            Subject:
          </label>
          <input
            placeholder="Enter your subject"
            className="w-2/4 rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            type="text"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold font-serif leading-6 text-gray-900">
            Send SMS:
          </label>
          <input type="checkbox" />
        </div>
        <div className="flex mx-3">
          <textarea
            placeholder="Message...."
            className="w-[60%] rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            rows={15}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
