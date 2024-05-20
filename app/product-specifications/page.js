import FilterByProduct from "./FilterByProduct";
import Products from "./Products";

const page = () => {
  return (
    <div className="product-specification">
      <h1 className="heading-h1 mb-10">Product Specification</h1>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] 2xl:grid-cols-[.20fr_1fr] gap-6">
        <FilterByProduct />
        <Products />
      </div>
    </div>
  );
};

export default page;
