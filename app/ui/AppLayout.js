import Sidebar from "./Sidebar";

const AppLayout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 mt-24 lg:mt-0">{children}</main>
    </>
  );
};

export default AppLayout;
