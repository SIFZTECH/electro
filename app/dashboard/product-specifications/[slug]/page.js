import ProductDetailsPage from "./ProductDetailsPage";

export const metadata = {
  title: "Leon Cycle | Product Details",
};

const page = ({ params }) => {
  return <ProductDetailsPage params={params} />;
};

export default page;
