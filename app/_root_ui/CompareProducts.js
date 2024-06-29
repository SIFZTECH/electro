import ProductSpecifications from "./ProductSpecifications";
import SpecificationForm from "./SpecificationForm";

const CompareProducts = () => {
  return (
    <div>
      <h1 className="heading-h1 mb-10 mt-6">Compare Products By Model</h1>
      <SpecificationForm />
      <ProductSpecifications />
    </div>
  );
};

export default CompareProducts;
