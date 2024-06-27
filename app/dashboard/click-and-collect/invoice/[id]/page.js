import OrderDetailsPage from "./OrderDetailsPage";

const page = ({ params: { id } }) => {
  return <OrderDetailsPage id={id} />;
};

export default page;
