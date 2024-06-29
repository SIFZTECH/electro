import Image from "next/image";
import ProductSpecifications from "./ProductSpecifications";

const CompareProducts = ({ compareList }) => {
  return (
    <div className="compare-products">
      <h1 className="heading-h1 mb-10 mt-6">Compare Bikes</h1>

      <ProductSpecifications specification={compareList} />
    </div>
  );
};

export default CompareProducts;
