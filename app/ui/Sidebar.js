import Logo from "./Logo";
import Navigation from "./Navigation";
import SideNav from "./Navigation";
import User from "./User";

const Sidebar = () => {
  return (
    <aside className="sidebar flex-initial min-h-dvh text-white bg-slate-900 p-5 flex flex-col justify-between">
      <div>
        <Logo />
        <Navigation />
      </div>

      <User />
    </aside>
  );
};

export default Sidebar;
