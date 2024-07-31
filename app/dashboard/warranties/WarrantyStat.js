import { IoMdArrowDropdown } from "react-icons/io";

const Stat = ({ title, value }) => {
  return (
    <div className="bg-gray-100 p-3 rounded-md cursor-pointer leading-5 hover:bg-color-primary_shade-4 hover:transition-all">
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 3L23 3L23 24L20 22L17 24L14 22L11 24L8 22L5 24L5 3Z"
          stroke="#3e78bc"
          strokeWidth="2.4"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M9 9L14 9"
          stroke="#3e78bc"
          strokeWidth="2.4"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M18 9H19"
          stroke="#3e78bc"
          strokeWidth="2.4"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M9 13L14 13"
          stroke="#3e78bc"
          strokeWidth="2.4"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M18 13H19"
          stroke="#3e78bc"
          strokeWidth="2.4"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M9 17H14"
          stroke="#3e78bc"
          strokeWidth="2.4"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M18 17H19"
          stroke="#3e78bc"
          strokeWidth="2.4"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
      </svg>
      <div className="flex items-center gap-8 xl:gap-10 justify-between mt-2">
        <h2>{title}</h2>
      </div>
      <div className="flex flex-col">
        <h2 className="font-serif text-3xl font-semibold">{value}</h2>
      </div>
    </div>
  );
};

export default Stat;
