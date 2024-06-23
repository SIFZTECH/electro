import { BiLoaderAlt } from "react-icons/bi";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-dvh w-full">
      <BiLoaderAlt className="animate-spin text-color-primary" size={100} />
    </div>
  );
};

export default Spinner;
