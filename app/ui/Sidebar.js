import Logo from "./Logo";
import Navigation from "./Navigation";
import User from "./User";

const Sidebar = () => {
  return (
    <aside className="sidebar flex-initial lg:min-h-dvh text-white bg-slate-900 py-6 px-4 flex flex-col justify-between">
      <div>
        <Logo />
        <Navigation />
      </div>

      <User />
    </aside>
  );
};

export default Sidebar;
