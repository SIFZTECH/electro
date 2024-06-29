import Image from "next/image";
import ProductSpecifications from "./ProductSpecifications";
import NotFoundData from "../components/ui/NotFoundData";

const CompareProducts = ({ compareList }) => {
  if (compareList.length === 0) {
    return <NotFoundData message="There is no products in compare!" />;
  }
  return (
    <div className="compare-products">
      <h1 className="heading-h1 mb-10 mt-6">Compare Bikes</h1>

      <ProductSpecifications specification={compareList} />
    </div>
  );
};

export default CompareProducts;
