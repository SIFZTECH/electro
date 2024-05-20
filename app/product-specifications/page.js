import FilterByProduct from "./FilterByProduct";
import ProductCategories from "./ProductCategories";
import Products from "./Products";

const page = () => {
  return (
    <>
      <ProductCategories />
      <div className="product-specification">
        <h1 className="heading-h1 mb-10 mt-6">Product Specification</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] 2xl:grid-cols-[.20fr_1fr] gap-6">
          <FilterByProduct />
          <Products />
        </div>
      </div>
    </>
  );
};

export default page;
