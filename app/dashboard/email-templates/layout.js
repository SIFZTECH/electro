import Link from "next/link";
import Nav from "./Nav";

const layout = ({ children }) => {
  return (
    <div className="flex gap-6">
      <Nav />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default layout;
