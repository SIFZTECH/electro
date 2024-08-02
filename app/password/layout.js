import Header from "../components/ui/Header";

const layout = ({ children }) => {
  return (
    <div className="w-full flex flex-col">
      <Header />
      {children}
    </div>
  );
};

export default layout;
