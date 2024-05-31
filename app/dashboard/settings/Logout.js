import { GrLogout } from "react-icons/gr";

const Logout = ({ handleLogout }) => {
  return (
    <div className="flex items-center mt-1 w-full">
      <button
        onClick={handleLogout}
        className="btn-primary flex items-center gap-2 text-lg py-2 px-4 cursor-pointer"
      >
        <GrLogout />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Logout;
