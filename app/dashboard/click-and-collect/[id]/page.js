import DownloadDocket from "./Download-Docket";
import OrderDetails from "./OrderDetails";
import ProductOrders from "./ProductOrders";

const page = () => {
  return (
    <div>
      <h1 className="heading-h1 mb-8 mt-4">Click and Collect</h1>
      <OrderDetails />
      <ProductOrders />
      <DownloadDocket />
    </div>
  );
};

export default page;
