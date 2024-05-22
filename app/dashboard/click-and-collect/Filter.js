const Filter = () => {
  return (
    <div className="font-serif my-6 mb-7">
      <ul className="flex gap-4 items-center">
        <li>
          <button className="btn-active text-sm font-semibold leading-7">
            All Orders{" "}
            <span className="bg-red-500 rounded-full text-white text-[12px] p-1">
              99+
            </span>
          </button>
        </li>
        <li>
          <button className="text-sm font-semibold leading-7">
            Collected Orders{" "}
            <span className="bg-red-500 rounded-full text-white text-[12px] p-[0.9px_3.9px]">
              9
            </span>
          </button>
        </li>
        <li>
          <button className="text-sm font-semibold leading-7">
            Intransit Orders
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Filter;
