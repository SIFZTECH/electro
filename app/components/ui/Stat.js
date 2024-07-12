import { IoMdArrowDropdown } from "react-icons/io";

const Stat = ({ title, value, icon, percentage }) => {
  return (
    <div className="group bg-gray-100 p-3 rounded-xl cursor-pointer leading-5 hover:bg-color-primary_shade-4 hover:transition-all">
      <div className="flex items-center gap-8 xl:gap-10 justify-between">
        <h2>{title}</h2>
        <div className="stat__icon bg-slate-900 group-hover:bg-color-primary text-white p-2 rounded-full">
          {icon}
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="font-serif text-3xl font-semibold">{value}</h2>
        <div className="stat__percentage text-sm">
          <IoMdArrowDropdown />
          {percentage}%
        </div>
      </div>
    </div>
  );
};

export default Stat;
